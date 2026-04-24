import { forwardRef } from 'preact/compat'
import { useCallback, useEffect, useRef, useState } from 'preact/hooks'

interface ScrambleInProps {
  text: string
  animationSpeed?: number
  targetScrambledCharCount?: number
  possibleScrambledChars?: string
}

/**
 * Animates given text letter-by-letter with a "scramble" animation.
 *
 * Heavily modified from https://www.fancycomponents.dev/docs/components/text/scramble-in.
 * Fixed some bugs/dead code and switched to use a requestAnimationFrame.
 */
const ScrambleIn = forwardRef<HTMLSpanElement, ScrambleInProps>(
  (
    {
      text,
      animationSpeed = 50,
      targetScrambledCharCount: targetNumScrambledChars = 2,
      possibleScrambledChars = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+'
    },
    ref
  ) => {
    // Initialise displayed text to the first char of the final text.
    const [displayText, setDisplayText] = useState(() => text.at(0))
    // Initialise visible char count based on the displayed text (and fallback
    // to 0 if empty string is provided).
    const visibleCharCountRef = useRef(displayText ? displayText.length : 0)

    const calculateDisplayText = useCallback(() => {
      // Increase allowed visible chars.
      visibleCharCountRef.current = visibleCharCountRef.current + 1

      // Calculate how many scrambled chars we can show.
      const remainingCharCount = Math.max(
        0,
        text.length - visibleCharCountRef.current
      )
      // Clamp to target number of scrambled chars.
      const scrambledCharCount = Math.min(
        remainingCharCount,
        targetNumScrambledChars
      )

      // Generate scrambled text
      const scrambledPart = Array(scrambledCharCount)
        .fill(0)
        .map(
          () =>
            possibleScrambledChars[
              Math.floor(Math.random() * possibleScrambledChars.length)
            ]
        )
        .join('')

      setDisplayText(
        // Slice the text from the beginning to the number of allowed visible
        // chars and append the generated scrambled chars.
        text.slice(0, visibleCharCountRef.current) + scrambledPart
      )
    }, [text, targetNumScrambledChars, possibleScrambledChars, animationSpeed])

    // Set up a throttled animation to match the animation speed.
    const cancelAnimation = useThrottledAnimationFrame(
      calculateDisplayText,
      animationSpeed
    )

    // If we've revealed enough chars to match the final text, cancel the
    // animation.
    if (visibleCharCountRef.current >= text.length) {
      cancelAnimation()
    }

    return (
      <span ref={ref}>
        <span className="screenreader-only">{text}</span>
        <span aria-hidden="true">{displayText}</span>
      </span>
    )
  }
)

function useThrottledAnimationFrame(animateCb: () => void, maxWait: number) {
  const frameRequestId = useRef<number>()

  // Init previous timestamp to the current time.
  const prevTimestampRef = useRef<number>(performance.now())

  useEffect(() => {
    function animate(timestamp: number) {
      // Determine how much time has elapsed since the previous frame.
      const elapsed = timestamp - prevTimestampRef.current

      // Only trigger the animation callback if the elapsed time has gone past
      // the throttle maximum wait time.
      if (elapsed > maxWait) {
        animateCb()

        // Update the previous frame timestamp to be this frame.
        prevTimestampRef.current = timestamp
      }

      // Ensure the animation cycle continues.
      // We want this to happen even if the wait threshold hasn't been met so
      // that the elapsed time continues to increment.
      frameRequestId.current = requestAnimationFrame(animate)
    }

    // Init the animation cycle
    frameRequestId.current = requestAnimationFrame(animate)

    // If deps change, ensure the animation cycle is cancelled so that outdated
    // cycles are stopped.
    return () => {
      cancel()
    }
  }, [animateCb]) // Ensure that the effect depends on the animation callback.

  function cancel() {
    if (frameRequestId.current) cancelAnimationFrame(frameRequestId.current)
  }

  return cancel
}

interface GridAwareScrambleInProps extends ScrambleInProps {
  enabled: boolean
}

/**
 * Wrap ScambleIn component with conditional that determines if the animation
 * should play or not.
 *
 * This is intended to be used with the Grid Aware middleware, disabling the
 * animation if above the threshold.
 */
const GridAwareScrambleIn = forwardRef<
  HTMLSpanElement,
  GridAwareScrambleInProps
>(({ enabled, text, ...restProps }, ref) => {
  if (enabled) {
    return <ScrambleIn text={text} {...restProps} ref={ref} />
  } else {
    return text
  }
})

export default GridAwareScrambleIn
