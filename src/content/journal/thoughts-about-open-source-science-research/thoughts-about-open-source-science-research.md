---
title: Thoughts About Open Source Science Research
published-date: 2011-02-14
---

![](./21572472-blog-image--with-layers-.jpg)

<small>(Image thanks to [cudmore](http://www.flickr.com/photos/cudmore/4079784/) and [Wikimedia](http://en.wikipedia.org/wiki/File:Wikipedia-logo-v2.svg))</small>

This post was inspired by this blog post which I came across yesterday, and the [subsequent discussion](http://storify.com/40_thieves/science-as-a) with [@cameronneylon](http://twitter.com/cameronneylon) on Twitter, which refined my thoughts and brought up many of the questions below.

[The blog post](http://lemire.me/blog/archives/2011/02/11/taking-scientific-publishing-to-the-next-level/), discusses ways of turning scientific research papers into something more akin to a free and open source software (FOSS) project. He suggests the use of 'bug reports' - places where errors in the paper can be pointed out and fixed - something widely used in software development (see [bugzilla](http://en.wikipedia.org/wiki/Bugzilla). He goes on to suggest that if an author is unwilling to make changes to his/her paper, then a derivative paper could be produced that 'patches' it to remove perceived errors and improve presentation.

This got me thinking about the branching or forking model used to develop open source software, such as Linux (see [this](http://upload.wikimedia.org/wikipedia/commons/9/9a/Gldt1009.svg) rather impressive diagram). Code in an open source project can be 'forked' to create an exact copy, which can then be worked on to develop new ideas without damaging the original code. This branch can exist on it's own (as with many Linux distributions) or it can be merged back into the main branch if the new code improves it.

I think that this model could also be applied to scientific research. In this way a paper could be published (in the tradition manner or not) which could then be analysed and reviewed for 'errors'. I put errors in quotemarks for a reason - what makes an error could be very subjective, and the original paper could be distorted if anyone was allowed to go in and edit it. A wiki model works well for Wikipedia, as there is a large and committed community that is constantly monitoring against vandalism (thanks Cameron for pointing that out!). This probably would not scale so well for niche communities studying scientific papers, and would generally drive trust of the paper down.

A more ideal model would copy the branching idea from FOSS projects - the original paper still exists but researchers can fork an exact copy that they can improve upon. This protects the original paper (the main branch), while allowing more ideas to be tested. This could spawn an entirely new paper (if a new idea merits this), or it could be merged back into the main branch. This merging could involve small changes (like changing some presentation) or errors in data could be fixed. Addition data could be added. A merge would only happen if comes from a reputable source, or can be proven in some way.

This presents new problems and issues, however, as we have to ask who is in charge of the merges, and how do we decide between 'good' and 'bad' branches? As @cameronneylon pointed out, the admin in charge might not necessarily be the original authors of the paper (they might be too close). The admin could be someone with a good reputation for curating the best edits and making the best decisions - essentially reworking the role of an editor or publisher. This leads to questions of how do we trust the editor, of course, a problem that a reputation system or score might solve. Work on such a concept has already started, with the [alt-metrics manifesto](http://altmetrics.org/manifesto/). This could be used to rate and score work by a particular editor, increasing or decreasing the trust placed in the paper.

The alt-metrics concept can also be applied to other issues that were raised. How do we filter and organise the many different branches for to editor so that they can find the best? A system of organising all the branches in a sensible way could be done by a git-like system, maybe even a scientific version of github could be developed. The problem of which branches to merge still remains, however. Again, by measuring the buzz around a particular branch the editor can see which branches are being talked about favourably and which are not.

Of course this is all pie-in-the-sky right now, as the systems simply do not exist for collaboratively editing scientific papers. Alt-metrics or other such reputation systems need to be developed so that the impact of branches and papers can be measured. Overall though I do think that the methods I describe could improve scientific literature and bring it into the 21st century.
