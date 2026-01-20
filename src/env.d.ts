type NetlifyLocals = import('@astrojs/netlify').NetlifyLocals

declare namespace App {
  interface Locals extends NetlifyLocals {
    co2AboveThreshold?: boolean
    co2Value?: number
  }
}
