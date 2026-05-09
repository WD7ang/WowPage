# WowPage

WowPage is a clean, responsive academic homepage built with Jekyll and adapted from the Academic Pages theme. It is designed for students, researchers, and engineers who want a personal website for introducing their profile, publications, projects, experience, awards, talks, services, and CV.

Template is originated from [selen-suyue.github.io](https://selen-suyue.github.io/).
Example：[wd7ang.github.io](https://wd7ang.github.io).
## Features

- Academic-style homepage with author profile sidebar
- Single-page navigation for news, experience, publications, projects, awards, services, and talks
- Custom homepage styling through `assets/css/home.css`
- Publication filtering on the homepage
- CV link support through the navigation menu
- Social profile fields managed from `_config.yml`
- GitHub Pages compatible Jekyll setup
- Sitemap and feed support through Jekyll plugins

## Project Structure

```text
.
├── _config.yml              # Main site configuration and author metadata
├── _data/
│   ├── navigation.yml       # Header navigation links
│   ├── authors.yml          # Optional author data
│   └── ui-text.yml          # Theme UI text
├── _includes/               # Reusable Liquid partials
├── _layouts/                # Page layout templates
├── _pages/                  # Main site pages, including the homepage
├── _sass/                   # Theme Sass source files
├── assets/                  # CSS, JavaScript, and theme assets
├── images/                  # Profile, logos, publication images, and other media
├── markdown_generator/      # Helper scripts/templates for generating markdown content
├── talkmap/                 # Talk map page assets
├── Gemfile                  # Ruby/Jekyll dependencies
├── package.json             # JavaScript build dependencies and scripts
└── LICENSE
```

## Getting Started

### Prerequisites

Install the following tools before running the site locally:

- Ruby and Bundler
- Node.js and npm
- Git

### Installation

Clone the repository and install dependencies:

```bash
git clone <your-repository-url>
cd WowPage
bundle install
npm install
```

### Run Locally

Start the Jekyll development server:

```bash
bundle exec jekyll serve
```

Then open the local URL shown in the terminal, usually:

```text
http://127.0.0.1:4000/
```

### Build the Site

Generate the static site:

```bash
bundle exec jekyll build
```

The generated files will be written to `_site/`.

## Customization

### Basic Site Information

Edit `_config.yml` to update the site title, description, URL, author name, biography, affiliation, location, email, avatar, and social links.

Important fields include:

```yaml
title: "WowPage"
name: "Your Name"
description: "A clean academic homepage template."
author:
  avatar: "1.png"
  name: "Your Name"
  bio: "Student and researcher."
  location: "City, Country"
  employer: "Institution or Company"
  email: "name@example.com"
```

### Homepage Content

The homepage content is mainly maintained in:

```text
_pages/about.md
```

Update this file to edit sections such as news, experience, publications, projects, awards, services, talks, and the introductory text.

### Navigation

Edit the navigation menu in:

```text
_data/navigation.yml
```

For example:

```yaml
main:
  - title: "News"
    url: "/#news"
  - title: "Experience"
    url: "/#experience"
  - title: "Pub"
    url: "/#publications"
  - title: "CV-En"
    url: "/files/weidongtang_resume.pdf"
```

### Images and Media

Place profile photos, organization logos, project images, publication thumbnails, and other visual assets in:

```text
images/
```

Reference them from pages using paths such as:

```html
<img src="images/example.png" alt="Example image">
```

### JavaScript and CSS

Custom homepage styles can be edited in:

```text
assets/css/home.css
```

JavaScript assets are built with npm:

```bash
npm run build:js
```

## Deployment

This site is compatible with GitHub Pages.

A typical deployment workflow is:

1. Push the repository to GitHub.
2. Open the repository settings on GitHub.
3. Enable GitHub Pages.
4. Select the branch and folder used for deployment.
5. Update `url`, `baseurl`, and `repository` in `_config.yml` if needed.

For a user or organization site, the repository is commonly named:

```text
<username>.github.io
```

For a project site, set `baseurl` to the repository name:

```yaml
url: "https://<username>.github.io"
baseurl: "/<repository-name>"
```

## Content Checklist

Before publishing, consider updating:

- Author name, bio, institution, location, and email in `_config.yml`
- Avatar and profile images in `images/`
- Navigation links in `_data/navigation.yml`
- Homepage sections in `_pages/about.md`
- CV file and CV link
- Publication metadata, project descriptions, and external links
- Analytics or site verification settings, if needed

## License

This project is released under the MIT License. See `LICENSE` for details.

## Acknowledgements

We appreciate your use of this template and look forward to your contributions. Contributors are welcome to voluntarily submit homepages built with this template for inclusion in our showcase.
