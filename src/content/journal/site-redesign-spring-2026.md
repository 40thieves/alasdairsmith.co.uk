---
title: Site Redesign Spring 2026
draft: true
---

After about 7 years, I've finally found the time and motivation to update this site to a new design and add some new functionality.

## Moved to Astro

I've moved away from Eleventy to use [Astro](https://astro.build/) to build the site. My main motivation for this was for the new grid aware functionality (see more detail below), which requires server rendering. Astro's ability to render using a pre-generated or on-demand server-rendered mode was attractive because of this.

It's taken me about 6 months to finish the migration... but this is largely due to a lack of free time, and only being able to chip away at it for a few hours here or there. Once I'd made the decision to switch to Astro, things moved a lot quicker because of the great docs.

I must admit, I'm not thrilled about the [recent acquisition by CloudFlare](https://astro.build/blog/joining-cloudflare/). This is partly because open source project stewardship at large companies like this doesn't seem to have gone well in the past, for example see the [history of Gatsby](https://github.com/gatsbyjs/gatsby/discussions/39062). But also because CloudFlare's [policies around hosting Nazis](https://www.propublica.org/article/how-cloudflare-helps-serve-up-hate-on-the-web). However, I was most of the way through my rewrite when the acquisition was announced, so I guess I'm going to take a wait and see approach. Hopefully they are largely hands-off.

## Styling

I've taken the opportunity of the re-build to also redesign the site from scratch.

I've used [Chris Coyier's CSS starter](https://frontendmasters.com/blog/the-coyier-css-starter/) as a base set of global styles. As the name implies, its less of a reset and more a set of sensible defaults, styles that you probably want to set on every site. I recommend reading his post for details on what is used, along with a detailed description of why. I also added a few CSS utilities, namely [Andy Bell's flow utility](https://piccalil.li/blog/flow-utility/) for nicer vertical rhythm and [Ryan Mulligan's full bleed layout with breakouts](https://ryanmulligan.dev/blog/layout-breakouts/) technique. The latter of which I'm using as the default layout, I don't yet have any use-cases for the full bleed capability but its handy to have if needed in the future.

For the overall theming I wanted to go with something quite minimal, focused around a monospaced font and some simple colours. I came across iA Writer's [Duospace font](https://ia.net/topics/in-search-of-the-perfect-writing-font) some time ago and while I'm no typographic expert I think it works nicely for a body font. For a bit of contrast in headings, I choose [Manrope](https://fonts.google.com/specimen/Manrope) since I was familiar with it from my [LDX3 slides](https://leaddev.com/leadership/creating-the-next-generation-of-senior-engineers).

The general theme colours were originally inspired by a pair of trainers! I liked a "burnt orange" colour so took a photo and picked it from there. I then spent a very long time developing a set of colours based on the base hue which had sufficient contrast in most combinations across both light and dark modes. You can see the theme colours on [my rough style guide page](/style-guide). Although I believe the theme is indeed accessible is nearly all circumstances, I'm not sure my approach really worked very well, as there's quite a bit of drift from the original colour. And I'm aware of at least 1 contrast failure on the site currently. So I will probably continue to tweak going forward.

The animation in the header is based on [a React component](https://www.fancycomponents.dev/docs/components/text/scramble-in) I found quite some time ago, although I've heavily modified it to clean up the code, removing a bunch of unnecessary stuff and switched to use `requestAnimationFrame` instead of `setInterval` to be slightly more responsive to browser performance.

## Moving my blog

Another big difference is that you're reading this here! Previously, I separated my blog onto another domain, [40thiev.es](https://40thiev.es/), but with this rebuild it makes sense to unify onto a single domain. I'm also planning to move away from the 40thieves naming convention in general, as its just plain confusing.

Currently the older content is replicated onto both sites, but I'm planning to retire the old site and setup redirects pointing here.

I would like to try write here a bit more regularly, hoping to have more time for that going forward.

## Grid aware

As mentioned above, one of the requirements was to control rendering on the server. This is because one of my major goals for the rebuild was to experiment with the "grid-aware" technique from green software. I've created a quick explainer on [`/grid-aware`](/grid-aware), but tl;dr: this means that the site changes its behaviour in response to how carbon emissions from the user's electricity grid. When emissions are high, it disables some features like loading images, playing animations etc.

I'm planning to write a detailed breakdown of how this works in a follow post, so stay tuned for that.
