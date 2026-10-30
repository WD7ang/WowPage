# WowPage

[English](README.md) | 简体中文

WowPage 是一个基于 Jekyll 的学术主页模板，可直接部署到 GitHub Pages。模板包含个人介绍、新闻、教育、经历、论文、项目、奖项、报告和服务等栏目，个人资料与研究配图使用占位内容，方便替换为自己的信息。

论文支持精选卡片与完整列表切换。Blog 保留三个无内容、无链接的占位框；音乐播放器按需启用。模板不附带 CV，可添加自己制作的 CV 链接。

[在线预览](https://wd7ang.github.io/WowPage/) · [展示案例](#展示案例) · [自定义指南](docs/customization.md) · [更新日志](CHANGELOG.md)

## 版本

| 分支 | 版本 | 内容 |
| --- | --- | --- |
| [`main`](https://github.com/WD7ang/WowPage/tree/main) / [`v2`](https://github.com/WD7ang/WowPage/tree/v2) | `v2.0.9` | 当前模板，内容与组件分开维护 |
| [`v1`](https://github.com/WD7ang/WowPage/tree/v1) | `v1.0.0` | 经典 WowPage 布局与趣味示例 |

两个版本都是独立的 Jekyll 项目，使用时选择一个分支即可。本说明对应 v2。

## 快速开始

安装 Ruby、Bundler 和 Git，然后运行：

```sh
git clone https://github.com/WD7ang/WowPage.git
cd WowPage
bundle install
bundle exec jekyll serve
```

打开终端显示的地址，通常是 `http://127.0.0.1:4000`。如果设置了 `baseurl`，需在地址后加上该子路径。修改 `_config.yml` 后需要重启服务。

日常编辑和 Jekyll 构建不需要 Node.js；运行检查脚本或重新打包基础主题 JavaScript 时，需要 Node.js 20+。

## 内容入口

| 想修改的内容 | 文件 |
| --- | --- |
| 姓名、头像、邮件、社交账号、站点地址 | `_config.yml` |
| 自我介绍、研究标签 | `_data/profile.json` |
| 导航菜单 | `_data/navigation.yml` |
| 新闻 | `_data/news.json` |
| 教育、经历 | `_data/education.json`、`_data/experience.json` |
| 论文、项目 | `_data/publications.json`、`_data/projects.json` |
| 奖项、报告、服务 | `_data/awards.json`、`_data/talks.json`、`_data/services.json` |
| Blog 三个空占位框 | `_includes/home/blog.html` |
| 可选歌单 | `_data/music.json` |
| 图片与占位图 | `images/`、`images/placeholders/` |

侧栏的 `author.twitter` 和 `author.github` 填用户名，`author.googlescholar` 填完整个人资料 URL。替换默认占位值；不需要的社交字段留空即可隐藏。头像路径相对 `images/`。侧栏不显示 Institution。

论文的 `featured: true` 决定是否显示为首页卡片，完整列表展示全部论文。Blog 占位框不自动读取文章，结构在 `_includes/home/blog.html`，样式在 `assets/css/home-sections.css`。`/blog/` 地址会跳转到首页的 Blog 区块。

歌单默认为空数组 `[]`，播放器会隐藏，也不会请求歌曲。需要 CV 时，在 `_data/navigation.yml` 添加自己的外部 CV 链接。详细字段、链接规则和音乐配置见[自定义指南](docs/customization.md)。

## 部署到 GitHub Pages

1. 点击 **Use this template** 创建仓库，或 fork 本仓库。
2. 替换占位资料和内容。`_config.yml` 中的 `url`、`baseurl` 和 `repository` 默认不填值，由 GitHub Pages 自动识别；如需显式配置，可参考下表。
3. 打开仓库 **Settings → Pages → Deploy from a branch**，选择 `main` 和 `/ (root)`。

个人站点与项目站点的配置区别：

| 配置 | 个人站点 | 项目站点 |
| --- | --- | --- |
| 仓库名 | `your-username.github.io` | 例如 `WowPage` |
| `url` | `https://your-username.github.io` | `https://your-username.github.io` |
| `baseurl` | `""` | `"/WowPage"` |
| `repository` | `your-username/your-username.github.io` | `your-username/WowPage` |

`url` 不包含仓库子路径，末尾不加 `/`。部署经典版时，选择对应的 `v1` 分支。

## 目录与维护

```text
_config.yml          站点身份与 Jekyll 设置
_data/               可编辑的内容数据
_pages/              首页、博客入口、404、站点地图
_posts/              可选文章，初始为空
_includes/home/      首页各栏目组件
_includes/           主题、音乐等可复用组件
_layouts/            页面外框与通用文章布局
assets/css/          主页、文章与音乐样式
assets/js/           按功能拆分的交互脚本
_sass/               AcademicPages 基础主题及第三方依赖
images/              图片与占位素材
docs/                自定义说明，不发布到网站
scripts/             构建检查，不发布到网站
```

`_pages/about.md` 管理栏目顺序；`_data/` 管理内容；`_includes/home/` 管理结构；`assets/css/` 管理外观。通常只需编辑配置和数据文件。两份 README 均不发布到网站。

## 验证

构建网站并检查本地链接、图片、CSS 资源与锚点：

```sh
bundle exec jekyll build
node scripts/check-site.mjs
```

如果构建使用项目子路径，检查时也传入同一前缀：

```sh
bundle exec jekyll build --baseurl /WowPage
node scripts/check-site.mjs --baseurl /WowPage
```

将 `/WowPage` 替换为自己的子路径。构建输出位于 `_site/`，无需提交。检查脚本不需要 `npm install`；CI 会分别检查根路径与 `/WowPage` 子路径。

只有修改基础主题 JavaScript 并需要重新生成 `assets/js/main.min.js` 时，才运行 `npm install` 和 `npm run build:js`。其他功能脚本无需打包。

## 版权与致谢

项目使用 MIT 许可证，见 [LICENSE](LICENSE)。基于 [AcademicPages](https://github.com/academicpages/academicpages.github.io) 和 [Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes)。WowPage 起源于 [Yue Su / Selen-Suyue 的模板](https://selen-suyue.github.io/)，由 Weidong Tang 与 Yue Su 开发。这里的署名属于模板作者；站点个人资料由使用者自行填写。

欢迎标题使用 Font Diner 的 [Permanent Marker](https://fonts.google.com/specimen/Permanent+Marker) 字体，已随模板保存在本地，遵循 [Apache 2.0 许可证](assets/fonts/permanent-marker/LICENSE.txt)。第三方字体与脚本的授权声明保留在相应文件中。

## 展示案例

| 例图 | 链接 |
| --- | --- |
| <img src="docs/showcase/weidong-tang.png" alt="汤维栋的个人主页预览" width="520"> | **汤维栋 · Weidong Tang**<br>[https://wd7ang.github.io/](https://wd7ang.github.io/) |
| <img src="docs/showcase/zhiming-liu.png" alt="Zhiming Liu 的个人主页预览" width="520"> | **Zhiming Liu**<br>[https://mikuz12.github.io/](https://mikuz12.github.io/) |
