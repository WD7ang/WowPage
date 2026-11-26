---
title: Sitemap
permalink: /sitemap/
layout: single
author_profile: false
---

<ul>
  <li><a href="{{ '/' | relative_url }}">Homepage</a></li>
  {% for item in site.data.navigation.main %}
    {% assign prefix = item.url | slice: 0, 2 %}
    {% if prefix == '/#' %}<li><a href="{{ item.url | relative_url }}">{{ item.title | escape }}</a></li>{% endif %}
  {% endfor %}
</ul>
<p><a href="{{ '/sitemap.xml' | relative_url }}">XML sitemap</a></p>
