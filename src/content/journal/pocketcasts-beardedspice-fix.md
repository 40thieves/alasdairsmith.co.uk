---
title: Pocketcasts/BeardedSpice fix 💚
publishedDate: 2018-08-24
---

So I like to listen to podcasts while at work. Nope, I don't find it distracting if it's specific podcasts. I like the background noise.

BeardedSpice is awesome for wiring up your Mac play/pause controls to things other than iTunes. Like the
Pocketcasts web app. Unfortunately it broke recently, but here's the steps to fix.

Extra bonus: it now works in the Pocketcasts Beta 🎉

1. [Allow BeardedSpice to run JS in Chrome](<https://github.com/beardedspice/beardedspice/wiki/Won't-work-issue-after-Chrome-Update-(68.0.3440.75-and-later)>)
2. Restart BeardedSpice
3. Grab the `pocketcasts-plus.bsstrategy` file in [this gist](https://gist.github.com/40thieves/a9c506e4a0bc00588540f48be8bca1ac)
4. Open BeardedSpice preferences and import it
5. Enjoy your podcasts 🎧

Note: The file in the gist is adapted from [this PR](https://github.com/beardedspice/beardedspice/pull/767) - thanks! I hope they merge it at some point.
