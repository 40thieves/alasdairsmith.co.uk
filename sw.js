/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "apple-touch-icon.png",
    "revision": "99ed72af26f27df6429782f9391cc086"
  },
  {
    "url": "assets/css/style.min.css",
    "revision": "544b4022c3e92aaa0f852cd4dd301d06"
  },
  {
    "url": "assets/img/photo-150.jpg",
    "revision": "d96c548d44e5dfdfc49f4c258019993f"
  },
  {
    "url": "assets/img/photo-192.jpg",
    "revision": "d56bb3d09001eb4c70822477e2235c0e"
  },
  {
    "url": "assets/img/photo-200.jpg",
    "revision": "656b38fd99266e6db24654b053b22450"
  },
  {
    "url": "assets/img/photo-300.jpg",
    "revision": "5f04e77e3a9e76f0b619c2c103fb0eef"
  },
  {
    "url": "assets/img/photo-500.jpg",
    "revision": "0e3316a5254721a89265793f0140f761"
  },
  {
    "url": "assets/img/photo-512.jpg",
    "revision": "508b75c099ea081d4621b2527276bbf2"
  },
  {
    "url": "assets/img/photo-600.jpg",
    "revision": "ac7a8405602715a45dc0712a2a5623fc"
  },
  {
    "url": "assets/js/leet.js",
    "revision": "62058db4c2df477afcb0f6942a3d1718"
  },
  {
    "url": "favicon-16x16.png",
    "revision": "f2ba9b1615f22df633ce94a0e5d3271f"
  },
  {
    "url": "favicon-32x32.png",
    "revision": "2661f458d2e42db84735a5de4ede993d"
  },
  {
    "url": "favicon-96x96.png",
    "revision": "5ab63996a2dd32fc581e576ca57e920f"
  },
  {
    "url": "icon.png",
    "revision": "cb6f2f687cf49426ff19ee656e4a63dc"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
