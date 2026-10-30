# 自定义指南

## 身份与路径

`_config.yml` 顶层 `name` 使用 YAML anchor 与 `author.name` 共用，页面和书封自动读取它。简介、描述和论文作者列表是独立内容，需要一并替换。可选社交字段留空（不填值）即可隐藏。头像路径相对 `images/`，例如 `avatar: profile/avatar.jpg`。

默认 `url`、`baseurl` 和 `repository` 不填值，由 GitHub Pages 自动推断。本地根路径预览也可直接运行。若部署到其他服务或需固定路径，填写以下配置；显式的 `baseurl: ""` 表示根路径：

```yaml
url: "https://your-username.github.io"
baseurl: "" # 仓库名为 your-username.github.io；项目站点填 /your-repository
repository: "your-username/your-repository"
```

JSON 中本地图片、文件、文章链接使用以 `/` 开头的站点路径，组件会加上 `baseurl`。外链填写完整 `https://...`。示例外链使用 `https://example.com`，应改为你的真实资源或移除对应链接项。

## 首页内容

- `education.json`：学校、学位、起止日期、说明。
- `experience.json`：机构、职位、起止日期、简短的 `description`。
- `publications.json`：题名、作者、venue、图片、摘要、资源链接；`featured` 控制首页卡片。
- `projects.json`、`awards.json`、`services.json`：项目、奖项与服务。
- 日期使用 `MM/YYYY` 或 `Present`，新闻等自由显示日期使用普通字符串。

带 `_html` 的字段与新闻 `text` 可包含你自行编写的 HTML。其余文字字段按普通文本显示。数据按文件内顺序展示，通常将最新记录放在最前。

保持全部导航锚点存在的方法是只清空不需要的栏目数组。若要完全隐藏一个栏目，从 `_pages/about.md` 删除相应 include，同时从 `_data/navigation.yml` 删除对应导航。

## 论文

```json
{
  "id": "your-paper",
  "title": "Your Paper Title",
  "title_url": "https://example.com",
  "authors_html": "<strong>Your Name</strong>, A Collaborator",
  "venue": "Your Conference, 2026",
  "year": 2026,
  "featured": true,
  "image": "/images/papers/your-paper.png",
  "image_alt": "Description of your research figure",
  "description": "One or two sentences about your contribution.",
  "links": [{"label": "Paper", "url": "https://example.com"}]
}
```

`title_url` 可省略，`links` 可为空数组。仅需完整列表时，将所有论文的 `featured` 设为 false；页面会默认打开完整列表。禁用 JavaScript 时两种展示均可阅读。

## 博客书架

`_posts/` 初始为空，技术与随笔书架会显示空状态。需要发表时，创建 `_posts/YYYY-MM-DD-title.md`。`categories: [tech]` 进入技术书架，`categories: [essays]` 进入随笔书架。例如：

```markdown
---
title: "A research note"
date: 2026-01-01
categories: [tech]
layout: academic-post
---

在这里写下自己的文章正文。
```

双语随笔使用 `layout: essay`，文章前置信息与正文结构如下。需公式渲染时设置 `math: true`。

```markdown
---
title: "你的随笔标题"
title_en: "Your Essay Title"
date: 2026-01-01
categories: [essays]
layout: essay
lang: zh-CN
extra_css: /assets/css/books.css
body_class: essay-page
---

<section class="essay-language" id="essay-zh" lang="zh-CN" markdown="1">

中文正文。

</section>

<section class="essay-language" id="essay-en" lang="en" markdown="1">

Your English text.

</section>
```

这些代码仅作为文档说明，不会生成文章；书架始终只展示你放入 `_posts/` 的内容。

## 添加自己的 CV 链接

模板不提供 CV 页面、PDF 或简历内容。完成自己的 CV 并获得公开链接后，在 `_data/navigation.yml` 的 `main` 列表末尾添加：

```yaml
  - title: "CV"
    url: "https://example.com/your-cv"
```

将示例 URL 替换为自己的 CV 链接，保留其他导航项即可。

## 音乐（可选）

默认 `_data/music.json` 为 `[]`，不显示播放器，也不会请求歌曲。添加你有权使用的音频和封面后填入：

```json
[
  {
    "id": "my-track",
    "title": "Track Title",
    "artist": "Artist",
    "source": "/media/music/my-track.mp3",
    "cover": "/images/music/my-track.jpg",
    "duration": 180
  }
]
```

`duration` 单位为秒。模板没有附带原主页的音频、歌单或封面。播放器支持播放、切歌、音量和进度，窄屏可展开。

## 样式与代码

- `home-sections.css`：首页栏目与卡片。
- `classic-home.css`：蓝灰主题、背景、布局与移动端调整。
- `books.css` / `books.js`：博客书架。
- `music-player.css` / `music-player.js`：可选播放器。
- `academic.css`：文章页面；`_includes/date.html`：首页日期格式。
- `_sass/vendor/`、`assets/js/plugins/`：主题依赖，保留上游授权信息。

`images/sky.jpg` 是保留的通用天空背景。可替换此文件，或修改 `classic-home.css` 中 `body::before` 的背景与 `--home-background-opacity`。
