# WowPage · v1

简洁的 Jekyll 学术主页模板。v1 保留 WowPage 原版的配色、侧栏、卡片和趣味示例内容，将内容、模板、样式与可选工具分开维护。示例论文、经历及奖项是演示内容，请替换后再发布。

v2 基于新版个人主页，提供占位资料、独立 CV、博客书架等功能；v1 保留原版体验。使用 [`v1`](https://github.com/WD7ang/WowPage/tree/v1) 分支或 `v1.0.0` 标签获取此版本；[`main`](https://github.com/WD7ang/WowPage/tree/main) 和 [`v2`](https://github.com/WD7ang/WowPage/tree/v2) 提供新版。

## 快速开始

安装 Ruby、Bundler 和 Git 后，在仓库目录运行：

```sh
bundle install
bundle exec jekyll serve
```

打开终端显示的地址（默认 `http://127.0.0.1:4000`）。构建命令为 `bundle exec jekyll build`，输出在 `_site/`。**日常内容修改不需要 Node.js 或 npm。**

## 修改哪里

| 内容 | 文件 |
| --- | --- |
| 姓名、简介、邮箱、社交链接、站点地址 | `_config.yml` |
| 顶部导航 | `_data/navigation.yml` |
| 首页欢迎语 | `_data/home/intro.json` |
| 新闻、经历、论文、项目 | `_data/home/news.json`、`experience.json`、`publications.json`、`projects.json` |
| 奖项、服务、报告 | `_data/home/awards.json`、`services.json`、`talks.json` |
| 首页栏目顺序 | `_pages/about.md` |
| 栏目的 HTML | `_includes/home/` |
| 首页配色和排版 | `assets/css/home.css` |
| CV 占位页 | `_pages/cv.md` |

论文数据中的 `core: true` 控制精选卡片；全部条目同时用于完整论文列表，避免重复维护。资源链接填写为 `{"label": "code", "url": "https://example.com/project"}`，没有链接时用 `[]`。`*_html` 字段允许自定义作者/导师链接；其他字段使用普通文本。

## 目录

```text
_config.yml         个人信息、Jekyll 配置
_data/home/         可替换的首页内容
_includes/home/     首页栏目和公共卡片片段
_pages/             实际发布的首页、CV、404、站点地图
images/             profile / organizations / publications / projects / ui
assets/css/         样式（home.css 是首页主要入口）
assets/js/          交互脚本和主题构建源文件
_layouts/           AcademicPages 页面框架
_sass/              主题 Sass 与依赖
examples/           可选页面、地图、示例数据；不发布
tools/              Markdown 生成工具；不发布
```

`_layouts/`、其余 `_includes/` 与 `_sass/` 保留上游主题能力；通常只需编辑 `_data/home/` 和 `_config.yml`。移出的示例可以按 `examples/README.md` 恢复。

## GitHub Pages

使用此模板创建自己的仓库，在 Settings → Pages 中选择部署分支与根目录。用户主页仓库名为 `YOUR_USERNAME.github.io`：

```yaml
url: "https://YOUR_USERNAME.github.io"
baseurl: ""
repository: "YOUR_USERNAME/YOUR_USERNAME.github.io"
```

项目主页使用 `baseurl: "/YOUR_REPOSITORY"`，并相应修改 `repository`。内部资源与导航支持这个子路径。不要添加 `.nojekyll`。

可选 PDF：放入 `files/cv.pdf`，再在 `_pages/cv.md` 中增加 `[Download PDF]({{ '/files/cv.pdf' | relative_url }})`。默认不链接不存在的简历文件。

只有修改主题的 `_main.js` 或 `assets/js/plugins/` 后才需要：

```sh
npm install
npm run build:js
```

其他独立 JS/CSS 与内容文件可直接编辑。启用某一页的数学公式时，在该页 front matter 设置 `mathjax: true`。

## English quick guide

WowPage v1 preserves the classic design. Edit identity in `_config.yml`, content in `_data/home/`, section markup in `_includes/home/`, and styling in `assets/css/home.css`. Run `bundle install` and `bundle exec jekyll serve`; npm is optional and only rebuilds the bundled legacy theme JavaScript. Configure `url`, `baseurl`, and `repository` for GitHub Pages. Optional inherited examples and generators are excluded from the site.

## License & credits

MIT — see [LICENSE](LICENSE). Built on [AcademicPages](https://github.com/academicpages/academicpages.github.io) / [Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes), with the homepage design by [Yue Su](https://selen-suyue.github.io/) and [Weidong Tang](https://wd7ang.github.io/).
