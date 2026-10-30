# 自定义指南

## 身份与路径

`_config.yml` 顶层 `name` 使用 YAML anchor 与 `author.name` 共用，页面自动读取它。简介、描述和论文作者列表是独立内容，需要一并替换。可选社交字段留空（不填值）即可隐藏。头像路径相对 `images/`，例如 `avatar: profile/avatar.jpg`。

侧栏已移除 Institution，并提供 Twitter、Google Scholar 和 GitHub 链接。在现有 `author` 配置中替换以下占位值：

```yaml
author:
  twitter: "your_username"
  googlescholar: "https://scholar.google.com/citations?user=YOUR_SCHOLAR_ID"
  github: "your-github-username"
```

`author.twitter` 和 `author.github` 只填用户名，不填完整网址；`author.googlescholar` 填完整个人资料 URL。将任一字段留空，例如 `twitter:`，即可隐藏对应链接。修改这些字段时保留 `author` 下已有的姓名、头像等配置。

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

## Blog 占位框

首页保留 Blog 标题与导航，标题下只有三个无内容、无链接的占位框。它们不展示文章，也没有点击交互。

编辑 `_includes/home/blog.html` 可调整占位框结构和数量；对应外观与响应式布局在 `assets/css/home-sections.css`。如需填入自己的内容和链接，直接修改该组件。通用文章布局仍可使用，但首页占位框不会自动读取文章。

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
- `_includes/home/dated-list.html`：Awards、Talks、Services 共用的日期列表；统一样式在 `classic-home.css`。
- `assets/fonts/permanent-marker/`：欢迎标题的本地手写字体及授权，无需请求外部字体服务。
- `_includes/home/blog.html`：三个空 Blog 占位框；样式在 `assets/css/home-sections.css`。
- `music-player.css` / `music-player.js`：可选播放器。
- `academic.css`：文章页面；`_includes/date.html`：首页日期格式。
- `_sass/vendor/`、`assets/js/plugins/`：主题依赖，保留上游授权信息。

`images/background.jpg` 是云与草地背景。可替换此文件，或修改 `classic-home.css` 中 `body::before` 的背景与 `--home-background-opacity`。样式链接带构建时间版本参数，发布后浏览器会获取更新的样式。
