# 自定义指南

## 身份与路径

`_config.yml` 顶层 `name` 使用 YAML anchor 与 `author.name` 共用，页面、书封和 CV 自动读取它。简介、描述和论文作者列表是独立内容，需要一并替换。可选社交字段留空（不填值）即可隐藏。头像路径相对 `images/`，例如 `avatar: profile/avatar.jpg`。

默认 `url`、`baseurl` 和 `repository` 不填值，由 GitHub Pages 自动推断。本地根路径预览也可直接运行。若部署到其他服务或需固定路径，填写以下配置；显式的 `baseurl: ""` 表示根路径：

```yaml
url: "https://your-username.github.io"
baseurl: "" # 仓库名为 your-username.github.io；项目站点填 /your-repository
repository: "your-username/your-repository"
```

JSON 中本地图片、文件、文章链接使用以 `/` 开头的站点路径，组件会加上 `baseurl`。外链填写完整 `https://...`。示例外链使用 `https://example.com`，应改为你的真实资源或移除对应链接项。

## 首页与 CV 共用内容

- `education.json`：学校、学位、起止日期、说明。
- `experience.json`：机构、职位、起止日期；`description` 用于首页，`highlights` 用于 CV。
- `publications.json`：题名、作者、venue、图片、摘要、资源链接；`featured` 控制首页卡片。
- `projects.json`、`awards.json`、`services.json`：首页与 CV 使用同一组记录。
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

文章存放在 `_posts/YYYY-MM-DD-title.md`。`categories: [tech]` 进入技术书架，`categories: [essays]` 进入随笔书架。使用任意文章数量，包括零篇。

```yaml
---
title: "A research note"
date: 2026-01-01
categories: [tech]
layout: academic-post
---
```

双语随笔参考现有 `layout: essay` 示例，保留 `essay-zh` / `essay-en` 两个锚点。需公式渲染时设置 `math: true`。删除示例文章后书架自动展示空状态。

## CV / PDF

访问 `/cv/`，点击 **Print / Save as PDF**。浏览器打印选 A4、100% 缩放并关闭浏览器页眉页脚。下载链接默认隐藏；将自己的 PDF 放入例如 `files/cv.pdf`，并在 `_data/profile.json` 配置 `"cv_pdf": "/files/cv.pdf"` 后显示。PDF 是手动导出的文件，修改内容后需重新导出。

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
- `cv.css`：CV 与打印；`academic.css`：文章页面。
- `_sass/vendor/`、`assets/js/plugins/`：主题依赖，保留上游授权信息。

`images/sky.jpg` 是保留的通用天空背景。可替换此文件，或修改 `classic-home.css` 中 `body::before` 的背景与 `--home-background-opacity`。
