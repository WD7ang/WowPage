---
title: Sitemap
permalink: /sitemap/
layout: single
author_profile: false
---

<ul>
  <li><a href="{{ '/' | relative_url }}">Homepage</a></li>
  <li><a href="{{ '/#blog' | relative_url }}">Blog bookshelf</a></li>
  {% for post in site.posts %}<li><a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a></li>{% endfor %}
</ul>
<p><a href="{{ '/sitemap.xml' | relative_url }}">XML sitemap</a> · <a href="{{ '/feed.xml' | relative_url }}">RSS / Atom feed</a></p>
