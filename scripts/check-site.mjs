#!/usr/bin/env node
// Validate the static output without a server or third-party dependencies.
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const options = { site: '_site', baseurl: '' };
for (let i = 2; i < process.argv.length; i++) {
  const option = process.argv[i];
  if (option === '--help') {
    console.log('Usage: node scripts/check-site.mjs [--site _site] [--baseurl /WowPage]');
    process.exit(0);
  }
  if (!['--site', '--baseurl'].includes(option) || process.argv[i + 1] === undefined) {
    console.error(`Unknown or incomplete option: ${option}`);
    process.exit(1);
  }
  options[option.slice(2)] = process.argv[++i];
}
const baseurl = options.baseurl.replace(/\/$/, '');
if (baseurl && (!baseurl.startsWith('/') || /[?#\\]/.test(baseurl))) {
  console.error('--baseurl must be an absolute URL path such as /WowPage.');
  process.exit(1);
}

const root = path.resolve(options.site);
const files = new Map();
const errors = [];
let references = 0;
async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) await collect(absolute);
    else if (entry.isFile()) files.set(path.relative(root, absolute).split(path.sep).join('/'), absolute);
    else errors.push(`${path.relative(root, absolute)}: unsupported symbolic link in static output`);
  }
}
try {
  await collect(root);
} catch (error) {
  console.error(`Cannot read ${options.site}: ${error.message}. Build the site first.`);
  process.exit(1);
}
if (!files.has('index.html')) errors.push('index.html: homepage is missing');

const sourceDirectories = new Set(['.git', '.github', '.bundle', 'node_modules', 'vendor', 'local', 'scripts', 'docs', 'tools', 'examples', '_data', '_includes', '_layouts', '_sass', '_pages', '_posts']);
for (const file of files.keys()) {
  if (sourceDirectories.has(file.split('/')[0]) || /(?:^|\/)(?:Gemfile(?:\.lock)?|package(?:-lock)?\.json|README(?:\.md)?|CHANGELOG(?:\.md)?|LICENSE|\.gitignore)$/.test(file) || /\.(?:scss|sass|rb|py|ya?ml|md)$/.test(file)) {
    errors.push(`${file}: source or development file leaked into the build`);
  }
}

function decodeEntities(value) {
  return value.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt);/gi, (match, entity) => {
    if (entity[0] === '#') {
      const number = entity[1].toLowerCase() === 'x' ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10);
      return number > 0 && number <= 0x10ffff ? String.fromCodePoint(number) : match;
    }
    return { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>' }[entity.toLowerCase()];
  });
}

// Tokenize start tags while respecting quoted > characters. Script bodies and
// comments are excluded so example markup and JavaScript strings are not links.
function tags(html) {
  const markup = html.replace(/<!--[\s\S]*?-->/g, '').replace(/(<(?:script|style)\b[^>]*>)[\s\S]*?(<\/(?:script|style)\s*>)/gi, '$1$2');
  return [...markup.matchAll(/<([a-z][\w:-]*)\b((?:[^'">]|"[^"]*"|'[^']*')*)>/gi)].map((match) => {
    const attributes = new Map();
    for (const attr of match[2].matchAll(/([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g)) {
      attributes.set(attr[1].toLowerCase(), decodeEntities(attr[2] ?? attr[3] ?? attr[4] ?? ''));
    }
    return { name: match[1].toLowerCase(), attributes };
  });
}

const documents = new Map();
for (const [file, absolute] of files) {
  if (!/\.html?$/i.test(file)) continue;
  const elements = tags(await readFile(absolute, 'utf8'));
  const anchors = new Set();
  for (const element of elements) {
    if (element.attributes.has('id')) anchors.add(element.attributes.get('id'));
    if (element.name === 'a' && element.attributes.has('name')) anchors.add(element.attributes.get('name'));
  }
  documents.set(file, { elements, anchors });
}

function check(reference, source) {
  const raw = reference.trim();
  // Absolute URLs (including localhost canonical/SEO URLs), protocol-relative
  // URLs, mailto:, data:, and other schemes are not checked over the network.
  if (!raw || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(raw)) return;
  references++;
  let url;
  let pathname;
  try {
    url = new URL(raw, `https://static.invalid${baseurl}/${source}`);
    pathname = decodeURIComponent(url.pathname);
  } catch {
    errors.push(`${source}: invalid URL ${JSON.stringify(raw)}`);
    return;
  }
  if (baseurl && pathname !== baseurl && !pathname.startsWith(`${baseurl}/`)) {
    errors.push(`${source}: ${JSON.stringify(raw)} bypasses baseurl ${baseurl}`);
    return;
  }
  const relative = pathname.slice(baseurl.length).replace(/^\/+|\/+$/g, '');
  const destination = [relative, relative ? `${relative}/index.html` : 'index.html'].find((candidate) => files.has(candidate));
  if (!destination) {
    errors.push(`${source}: missing local resource ${JSON.stringify(raw)}`);
    return;
  }
  if (url.hash && documents.has(destination)) {
    let anchor;
    try { anchor = decodeURIComponent(url.hash.slice(1)); } catch { anchor = url.hash.slice(1); }
    if (anchor && anchor.toLowerCase() !== 'top' && !anchor.startsWith(':~:text=') && !documents.get(destination).anchors.has(anchor)) {
      errors.push(`${source}: missing anchor ${JSON.stringify(raw)} in ${destination}`);
    }
  }
}

for (const [file, { elements }] of documents) {
  for (const { attributes } of elements) {
    for (const attribute of ['href', 'src', 'poster']) {
      if (attributes.has(attribute)) check(attributes.get(attribute), file);
    }
    if (attributes.has('style')) checkCss(attributes.get('style'), file);
  }
}
function checkCss(css, source) {
  const content = css.replace(/\/\*[\s\S]*?\*\//g, '');
  for (const match of content.matchAll(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^\s)]*))\s*\)/gi)) {
    check(match[1] ?? match[2] ?? match[3], source);
  }
}
for (const [file, absolute] of files) {
  if (file.endsWith('.css')) checkCss(await readFile(absolute, 'utf8'), file);
}

if (errors.length) {
  console.error(`Static site check failed (${errors.length} problems):\n${[...new Set(errors)].map((error) => `- ${error}`).join('\n')}`);
  process.exitCode = 1;
} else {
  console.log(`Static site check passed: ${documents.size} HTML pages, ${references} local references, baseurl=${baseurl || '/'}.`);
}
