---
title: Lets Encrypt
published-date: 2016-06-12
---

I wasn't really planning anything, but I noticed that my about was a bit out of date and I've been wanting to get [Let's Encrypt](https://letsencrypt.org/) installed for a while. These are some notes (mostly for my benefit) on what I did and the workarounds

- I pretty much followed [this excellent tutorial](https://serversforhackers.com/video/letsencrypt-for-free-easy-ssl-certificates) from Servers For Hackers.
- I'm not sure of the exact machine specs required, but my Digital Ocean instance was running out of memory when installing certbot for the first time. This seems to be a bug, as discussed in [this issue](https://github.com/certbot/certbot/issues/1883), which mentions a swap as a possible solution, but I just temporarily upgraded the server to get more memory.
- The tutorial installs on a pretty vanilla nginx install, but I have a slightly more complex config to support serving alasdairsmith.co.uk and 40thiev.es (a [Ghost blog](https://ghost.org/)) from the same instance. In short, the blog runs on an internal port which nginx then forwards on.
  - This causes problems with the webroot approach as it expects a given subdirectory to be served with a given response, which is a problem as Ghost handles it's own routing. To workaround this, I found [this blog post](https://twindx.com/2016/03/13/lets-encrypt-setting-up-with-ghost/) to be helpful. I didn't copy it exactly, but got me on the right path.
- Finally, it seems that Let's Encrypt have pretty low rate limits on certificate renewals (~20 per week), which I hit in testing to make sure that my auto-renewal is working correctly. I think it's working, but I won't be able to find out until next week... (**Edit**: yep, seems to have worked fine 🎉)
