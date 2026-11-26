---
permalink: /
layout: single
homepage_palette: classic-blue
author_profile: false
redirect_from:
  - /about/
  - /about.html
---
{% include home/intro.html %}
{% include home/news.html %}
{% include home/experience.html %}
{% include home/publications.html %}
{% include home/projects.html %}
{% include home/blog.html %}
{% include home/talks.html %}
{% include home/reports.html %}
{% include home/awards.html %}
{% include home/services.html %}
{% include music-player.html %}

<script src="{{ '/assets/js/home-tabs.js' | relative_url }}" defer></script>
<script src="{{ '/assets/js/show_publications.js' | relative_url }}" defer></script>
<script src="{{ '/assets/js/pub_media_rotator.js' | relative_url }}" defer></script>
