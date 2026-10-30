# WowPage · v2

一个简洁、可直接部署到 GitHub Pages 的学术主页模板。保留蓝灰色主页、论文卡片与完整列表切换、Blog 占位区和可选音乐播放器。人物、经历、论文、联系方式及配图使用占位内容；Blog 仅显示三个无内容、无链接的占位框，CV 由使用者自行制作。

## 版本

| 分支 | 内容 |
| --- | --- |
| [`main`](https://github.com/WD7ang/WowPage/tree/main) / [`v2`](https://github.com/WD7ang/WowPage/tree/v2) | 当前新版模板；内容集中维护，Blog 使用三个空占位框，无内置 CV |
| [`v1`](https://github.com/WD7ang/WowPage/tree/v1) | 整理后的经典 WowPage；保留原版布局和趣味示例 |

当前版本为 `v2.0.9`；经典版保留在 `v1` 分支及 `v1.0.0` 标签。两版均为独立、可运行的 Jekyll 项目，使用时只需要其中一个分支。历史变更见 [CHANGELOG](CHANGELOG.md)。

## 本地启动

需要 Ruby、Bundler 和 Git。日常编辑与部署不需要 Node.js。

```sh
git clone https://github.com/WD7ang/WowPage.git
cd WowPage
bundle install
bundle exec jekyll serve
```

打开 `http://127.0.0.1:4000`。修改 `_config.yml` 后重启服务。构建命令为 `bundle exec jekyll build`，输出到 `_site/`。

## 改哪里

| 想修改的内容 | 文件 |
| --- | --- |
| 姓名、头像、邮件、社交账号、站点地址 | `_config.yml` |
| 自我介绍、研究标签 | `_data/profile.json` |
| 导航菜单 | `_data/navigation.yml` |
| 新闻 | `_data/news.json` |
| 教育、经历 | `_data/education.json`、`_data/experience.json` |
| 论文、项目 | `_data/publications.json`、`_data/projects.json` |
| 奖项、报告、服务 | `_data/awards.json`、`_data/talks.json`、`_data/services.json` |
| Blog 占位框 | `_includes/home/blog.html`；样式在 `assets/css/home-sections.css` |
| 可选歌单 | `_data/music.json`；空数组时隐藏播放器 |
| 图片 | `images/`；通用配图位于 `images/placeholders/` |

侧栏显示 Twitter、Google Scholar 和 GitHub 占位链接，已移除 Institution。`author.twitter` 与 `author.github` 填用户名，`author.googlescholar` 填完整个人资料 URL；将字段留空即可隐藏对应链接，具体占位值见自定义指南。

首页的教育、经历、论文、项目、奖项和服务均从上述数据文件读取。论文的 `featured: true` 控制是否显示为首页卡片；完整列表展示全部论文。需要 CV 入口时，在导航中添加自己制作的 CV 外链，详见自定义指南。

## 目录分工

```text
_config.yml          站点身份与 Jekyll 设置
_data/               可编辑内容，一处维护
_pages/              首页、博客入口、404、站点地图
_posts/              自己的博客文章（初始为空）
_includes/home/      首页各栏目组件
_includes/           主题、音乐等可复用组件
_layouts/            页面外框
assets/css/          主页、文章、音乐等样式
assets/js/           按功能拆分的交互脚本
_sass/               AcademicPages 基础主题及第三方依赖
images/              通用素材与占位图
docs/                自定义与部署说明（不发布到网站）
scripts/             构建结果检查（不发布到网站）
```

`_pages/about.md` 只负责栏目顺序；内容改 `_data/`，结构改 `_includes/home/`，外观改 `assets/css/`，不用在一个长文件里同时修改 HTML、CSS 和个人资料。

## 部署与验证

1. 使用 **Use this template** 创建自己的仓库。
2. 配置 `_config.yml` 的 `url`、`baseurl`、`repository`。个人站点 `baseurl: ""`；项目站点例如 `baseurl: "/WowPage"`。
3. 仓库 **Settings → Pages → Deploy from a branch**，选择 `main` 与 `/ (root)`。

构建后可用 Node.js 20+ 检查本地链接、图片和锚点，无需 `npm install`：

```sh
bundle exec jekyll build
node scripts/check-site.mjs
```

CI 会分别检查根路径与 `/WowPage` 子路径。若要修改基础主题 JS 后重建 `main.min.js`，再执行 `npm install` 与 `npm run build:js`。业务脚本无需打包。

详细字段与使用示例见 [自定义指南](docs/customization.md)，版本差异见 [CHANGELOG](CHANGELOG.md)。

## English quick start

WowPage v2 is a Jekyll academic homepage with editable content data, publication views, a Blog placeholder section, and optional music. Blog contains three empty boxes with no content or links; no CV is bundled. Edit `_config.yml` for identity, `_data/` for content, and `_includes/home/blog.html` for the Blog placeholders. Their styling lives in `assets/css/home-sections.css`. Run `bundle install` and `bundle exec jekyll serve`. Set `url` and `baseurl` before enabling GitHub Pages. Placeholder profile and research content is fictional; personal photos, QR codes, papers, metrics, and playlists are excluded.

## Credits & license

MIT; see [LICENSE](LICENSE). Built on [AcademicPages](https://github.com/academicpages/academicpages.github.io) and [Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes). WowPage originated from [Yue Su / Selen-Suyue's template](https://selen-suyue.github.io/) and was developed by Weidong Tang and Yue Su. These credits identify the template's authors, not the example site's owner. Third-party font and script notices remain with their source files.

The welcome heading uses [Permanent Marker](https://fonts.google.com/specimen/Permanent+Marker) by Font Diner, bundled locally under its [Apache 2.0 license](assets/fonts/permanent-marker/LICENSE.txt).
