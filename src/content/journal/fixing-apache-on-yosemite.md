---
title: Fixing Apache On Yosemite
publishedDate: 2014-10-19
excerpt: A method for fixing Apache after upgrading to macOS Yosemite.
---

So it's that time of year: upgrading OSX and fixing all the Apache brokenness that inevitably follows. These are just some quick notes on how to fix it. ProTip™: remember to restart Apache after making a change to the config!

Primarily, the problems seem to be caused by Apple bumping the installed Apache from 2.2 to 2.4. Check out Apache's [upgrade notes](https://httpd.apache.org/docs/2.4/upgrading.html) for the full details.

#### `index.html.en` in document root

An `index.html.en` file is added to the default document root (mine is `/Library/WebServer/Documents`), which overrides the `localhost` route. Its unnecessary and can be removed.

#### Index on `localhost`

For some reason, the `Indexes` option is defaulted off in the new Apache config for the document root directory. This means that the list of directories won't be shown. Add `Indexes` to the `Options` to fix this.

#### Vhost permissions

Apache 2.4 changes the syntax for permissions, breaking my default vhost setup, giving 403 errors on any locally-served site. Switch out any `Allow from All` lines with `Require all granted` in `Directory` blocks to fix this.

#### Enable PHP

Apache doesn't enable PHP by default, so uncomment the line loading the PHP module (`LoadModule php5_module ...`). Yosemite comes with 5.5 installed, but I've got 5.6 installed through `homebrew`. Switch out the module path to wherever `homebrew` installs it (check `brew info php56`).

#### Fix broken PHP 5.6

No idea why, but I had to reinstall PHP to get it working correctly. Something about Apache not being able to read the install correctly, possibly related to [this issue](https://github.com/Homebrew/homebrew-php/issues/1383). Run `brew reinstall php56`.
