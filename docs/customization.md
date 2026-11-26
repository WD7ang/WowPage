# WowPage v3 自定义指南

## 站点和个人资料

在 `_config.yml` 中设置 `title`、`name` 和 `description`。`author.name` 默认与顶层姓名共用一个值，`author.name_zh` 显示在首页姓名旁。将头像放在 `images/` 下，`author.avatar` 填相对该目录的文件名。联系方式留空时，对应入口会隐藏。

| 字段 | 填写方式 |
| --- | --- |
| `author.email` | 邮箱地址 |
| `author.github`、`author.twitter` | 用户名 |
| `author.googlescholar`、`author.XiaoHongShu` | 完整的个人资料 URL |
| `author.WeChat` | 相对 `images/` 的二维码文件路径 |

在 `_data/profile.json` 中修改 `roles`、`intro_html` 和照片下方的 `motto`。每条 `bios` 记录提供 `lang`、`label`、`html`，分别指定内容语言、切换按钮文字和详细介绍。`_html` 字段、介绍的 `html` 和新闻的 `text` 支持自行编写的 HTML。

GitHub Pages 可以自动识别留空的 `url`、`baseurl` 和 `repository`。要手动设置项目站点，可使用下例。个人站点的 `baseurl` 设为 `""`。

```yaml
url: "https://your-username.github.io"
baseurl: "/your-repository"
repository: "your-username/your-repository"
```

数据文件中的本地图片、文章和文件路径从站点根目录写起，例如 `/images/papers/overview.png`。组件生成链接时会加上 `baseurl`。替换示例记录时，将示例域名改为真实链接，或删去可选的链接字段。

## 经历时间线

在 `_data/education.json` 为每个学业阶段设置唯一 `id`。标签页显示 `years` 和 `tab_label`，正文显示学校、学位、起止日期及说明。把 `_data/experience.json` 中每条经历的 `education_id` 设为对应阶段的 `id`。省略 `education_id` 的经历会独立列出。记录按数组顺序展示。

## 论文与项目

在 `_data/publications.json` 中添加论文。相同 `research_category` 的论文归为一组。`core_venue` 将论文加入页首会议索引，`short_title` 是索引链接的简写。`featured: true` 会显示星标，省略 `core_venue` 时使用 `venue` 建立索引。为每篇论文设置唯一 `id`，以保留可分享的锚点。

```json
{
  "id": "paper-2026",
  "title": "Your Paper Title",
  "authors_html": "<strong>Your Name</strong>, A Collaborator",
  "venue": "Example Conference, 2026",
  "core_venue": "Example Conference",
  "short_title": "Paper Title",
  "research_category": "Your Research Area",
  "thumbnail": "/images/papers/overview.png",
  "thumbnail_alt": "Overview of the proposed method",
  "links": [{ "label": "Paper", "url": "https://example.org/paper" }]
}
```

`thumbnail` 和 `links` 可省略，v2 记录中的 `image` 和 `image_alt` 也可读取。项目卡片读取 `_data/projects.json` 中的标题、说明、图片及链接。

## 首页 Blog 栏目

编辑 `_includes/home/blog.html` 可替换技术博客和随笔的占位卡片。需要链接到自己的文章时，在卡片内加入文章的公开地址。

## 其他栏目与外观

在 `_data/news.json`、`talks.json`、`reports.json`、`awards.json` 和 `services.json` 中编辑各栏目记录。首页的顺序在 `_pages/about.md`，导航在 `_data/navigation.yml`。移除某个栏目时同步移除其导航链接。

`assets/css/classic-home.css` 控制全宽布局、字体、配色和响应式样式。`images/background.jpg` 是首页的云景背景。首页 Blog 卡片的样式在 `assets/css/books.css`。

## 可选音乐

默认 `_data/music.json` 为空数组，播放器按歌单内容启用。将音频和封面放入项目后，填入歌曲资料，`duration` 的单位为秒。

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
