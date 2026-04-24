type NetlifyLocals = import('@astrojs/netlify').NetlifyLocals

declare namespace App {
  interface Locals extends NetlifyLocals {
    gridAwareDisabled?: boolean
    gridAwareCarbonIntensityLevel?: 'high' | 'moderate' | 'low'
  }
}
