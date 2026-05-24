---
title: Why should <script>s be loaded at the bottom of <body>?
publishedDate: 2019-12-28
---

I originally wrote this at [work](https://www.overleaf.com/) to explain the reasoning behind one of my pull requests. I decided not to add it to our internal documentation since it's not very specific to Overleaf, but thought it might be useful to share.

It is common performance advice to put `<script>` tags just before the closing `</body>` tag in your HTML. This seems like odd advice since we tend to put other resources in the `<head>`. To understand why, let's take a look at how the browser reads our web page.

### The browser's perspective

When a browser encounters some HTML like this:

```html
<!doctype html>
<html>
  <head>
    <script>
      someLongRunningTask()
      // ...
    </script>
  </head>
  <body>
    <h1>My amazing content</h1>
  </body>
</html>
```

It does something like this:

1. Start parsing the HTML (top down)
2. Parses `<head>` and adds it to the DOM (nothing will be displayed since nothing within `<head>` is rendered on screen)
3. Encounters the `<script>` and starts parsing and executing it. In this example, running the `someLongRunningTask` function
4. While this is happening, it cannot safely continue to parse the HTML document since the JS may manipulate the DOM that the browser is attempting to parse. Because of this the browser is _render blocked_ until the script completes execution. While it is blocked, it can only display the DOM that it has parsed so far: in this example, it still can't display anything
5. Once the script finishes it can continue parsing the HTML document, finding the `<h1>`, adding it to the DOM and rendering it

This happens whether you are using an inline script (as in this example) or referencing an external `.js` script via a `src` attribute.

### Multiple `<script>`s

Similarly, if there are two `<script>` tags consecutively, the browser must load and execute them in **series**. The first script may affect how - or even if - the second script is loaded/executed.

This problem is one of the reasons why a bundler like [webpack](https://webpack.js.org) is useful: it will combine two (or more) scripts together into a single JS file so you can (kind of) parallelise loading them. There are limits to this effect: there is a tradeoff between individual bundle size and number of requests made. Luckily webpack automatically optimises for this tradeoff.

Due to it's declarative nature, CSS does not suffer this problem. Two consecutive stylesheets can be fetched in **parallel**. You are free to use multiple consecutive `<link href="..." rel="stylesheet">`s without much of a performance penalty.

### So what?

[Studies](https://www.cs.cmu.edu/~bam/papers/percentdoneCHI85.pdf) have found that users want to see something visually displayed on the screen, otherwise they assume your site is broken. We can take advantage of this by prioritising visually displayed content, improving [_perceived_ performance](https://blog.marvelapp.com/a-designers-guide-to-perceived-performance/) without necessarily having to improve the actual performance.

Visually displayed content - HTML, CSS and images - should be high up in the document's source order. Scripts rarely affect the visual display (at least until the user interacts with the page) so should be de-prioritised. This answers our question about the recommendation to put scripts just before the closing `</body>` tag: it makes them the very last things in the document to be parsed.

Occasionally you may run into a script which does affect the visual display. Widgets like date pickers are often the problem here. If you really can't avoid it - by rewriting to render server-side - then try to isolate and shrink the script as much as possible.

### Doesn't this mean that buttons won't work?

If you have buttons on the page that require JavaScript to work, then you may run into a problem when deferring scripts: until the script loads, those buttons won't do anything.

There are two main solutions to this, which are useful in different situations:

1. Make the page load quickly so that the user can't click anything before the JS loads. This seems difficult but for pages that are light on interaction (for example, marketing pages), this is a good strategy since the page is unlikely to have many large assets that block the script from loading. If necessary, the loading order could be split up so that only visual content "above-the-fold" is prioritised above the script loading
2. Show some kind of loading state while the JS is loading. This is usually done by making the only content of the HTML page be the loading state, then the first task in the JS is to hide the loading state and show the actual content

### Taking it further

Nowadays we actually have several more methods of optimising our script loading that I haven't covered. [This post](https://www.html5rocks.com/en/tutorials/speed/script-loading/) by Jake Archibald dives deep into these, although it is somewhat out-of-date now. [This article](https://web.dev/efficiently-load-third-party-javascript/) by Milica Mihajlija is more up-to-date but has less detail. Both are worth a read if you're interested in taking script loading performance further. Finally, [this table](https://addyosmani.com/blog/script-priorities/) from Addy Osmani is a bit more technical but gives detailed information on the priority level each script loading method is given.
