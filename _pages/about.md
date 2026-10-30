---
layout: single
permalink: /
author_profile: true
stylesheets:
  - /assets/css/home.css
scripts:
  - /assets/js/show_publications.js
  - /assets/js/pub_media_rotator.js
redirect_from:
  - /about/
  - /about.html
---
{% include home/intro.html %}
{% include home/news.html %}
{% include home/experience.html %}
{% include home/publications.html %}
{% include home/projects.html %}
{% include home/list.html id="awards" title="Awards" items=site.data.home.awards %}
{% include home/list.html id="services" title="Services" items=site.data.home.services %}
{% include home/list.html id="talks" title="Talks" items=site.data.home.talks %}
