# Grid aware site

## What is a grid aware site?

The concept of grid (or sometimes carbon) awareness is one of the [core principles](https://learn.greensoftware.foundation/carbon-awareness) of Green Software.

Grid aware software adapts to the conditions of the electricity grid it is running on, changing how it behaves based on the mix of renewables and fossil fuels powering the grid.

Grid aware websites change their content and user experience based on the user's electricity grid. The concept was originally developed by [Branch magazine](https://branch.climateaction.tech/) and later by the Green Web Foundation's [Grid-aware websites project](https://www.thegreenwebfoundation.org/tools/grid-aware-websites/).

## How does grid awareness on this site work?

Grid awareness is powered by [Astro's on-demand rendering](https://docs.astro.build/en/guides/on-demand-rendering/) and [Electricity Maps](https://www.electricitymaps.com/).

When someone visits this website, the following happens:

1. Server middleware detects the user's IP address and translates this into a (rough!) geolocation
2. Data is fetched from the [Electricity Maps Carbon Intensity Level API](https://app.electricitymaps.com/developer-hub/api/reference#carbon-intensity-level-latest) about the carbon intensity (roughly how much fossil fuel is being burned) on the user's electricity grid. It returns a "level" of `high`, `moderate` or `low`
3. When rendering the page, the carbon intensity level is passed to components which can decide how to change their behaviour
4. The carbon intensity level is stored in a cookie, to reduce load (and therefore carbon emissions!) on the Electricity Maps API

If anything goes wrong or no data is available, grid awareness is disabled and components default their regular behaviour

### Differences to the Green Web Foundation's grid-aware website tool

This is slightly different from the grid-aware websites tool, which modifies server responses in an edge worker. The assumption that the underlying content of the page can't be changed doesn't hold here as I chose to rebuild my site from scratch to support grid awareness.

## What changes on this site?

When the carbon intensity level is `high`, the following changes are made in components:

1. The "scramble" animation in the header is disabled
2. Images are replaced with a text placeholder, inspired by [Branch magazine](https://branch.climateaction.tech/issues/issue-9/designing-a-grid-aware-branch/)
3. CSS animations/transitions are disabled, inspired by [the Obs.js library](https://csswizardry.com/Obs.js/demo/)
4. More ideas to come!

A banner is also displayed at the top of the page, informing the user about what is happening and what the current carbon intensity level is. In future I may implement a way for the user to override the level manually.

## Is making this site grid aware worth it?

Does a grid aware website really save emissions? The only real way to know this is via measurement, which I have not (yet) attempted. Measurement is unfortunately a difficult & much discussed problem in green software. In the future I plan to move hosting to a [verified green host](https://www.thegreenwebfoundation.org/tools/directory/), at which point I may take time to run measurements.

However, in the meantime this was a fun learning experiment. I also want to support Electricity Maps in their development of this new API, so I believe many it has interesting use cases in the future.

## Open code

The code for this site is available on [Github](https://github.com/40thieves/alasdairsmith.co.uk/), and released under a Parity 6.0 licence.

## Thanks

This site was inspired by many great people & projects in the Green Software community:

- [Fershad Irani](https://fershad.com/), who's personal website is also grid-aware
- The [Green Web Foundation's blog posts about grid-aware websites](https://www.thegreenwebfoundation.org/news/a-new-api-for-grid-aware-websites-and-beyond/)
- [Branch magazine](https://branch.climateaction.tech/) and their post about [(re-)designing a grid-aware site](https://branch.climateaction.tech/issues/issue-9/designing-a-grid-aware-branch/)
- The [Green Software Practitioner course](https://learn.greensoftware.foundation/) from the Green Software Foundation
