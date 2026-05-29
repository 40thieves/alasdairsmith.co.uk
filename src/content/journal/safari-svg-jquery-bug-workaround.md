---
title: Safari SVG/jQuery bug workaround
publishedDate: 2015-03-03
excerpt: Fixing a bug with handling clicks on SVGs with jQuery using Safari.
---

Recently at work we've switched over to using a SVG icon set on our Backbone project. This caused a strange bug where clicking directly on the icon in Safari with a jQuery event handler attached would throw a Javascript error:

```
TypeError: undefined is not an object (evaluating 'a.nodeName.toLowerCase')
```

Clicking the parent element wouldn't throw the error.

After a **lot** of investigating, and a fair amount of fruitless Googling it turned out to be this [jQuery bug](http://bugs.jquery.com/ticket/11352). It's caused when an event listener is delegated from a parent element onto an `svg use` element.

```javascript
$('#parent').on('click', 'svg use', callback)
```

This, unfortunately, is exactly how Backbone attaches events on `View`s when using the `events` hash.

**The Workaround**

Okay, okay, onto the bit that you're actually interested in: the fix. In your CSS add the following:

```css
svg {
  pointer-events: none;
}
```

You'll also need to make sure that click events are attached to a parent element, not the SVG itself. Clicking directly on the SVG still works as long as the parent wraps or "covers" the SVG.

Huge thanks to this [CSS Tricks](https://css-tricks.com/gotchas-on-getting-svg-into-production/) article for pointing out the fix. I just wish it wasn't quite so buried, and maybe mentioned Safari so that it came up in Google...
