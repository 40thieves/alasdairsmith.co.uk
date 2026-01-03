import { forwardRef } from 'preact/compat'
import { useCallback, useEffect, useRef, useState } from 'preact/hooks'

interface ScrambleInProps {
  text: string
  scrambleSpeed?: number
  scrambledLetterCount?: number
  characters?: string
}

const ScrambleIn = forwardRef<HTMLSpanElement, ScrambleInProps>(
  (
    {
      text,
      scrambleSpeed = 50,
      scrambledLetterCount = 2,
      characters = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+'
    },
    ref
  ) => {
    const [displayText, setDisplayText] = useState('')

    const visibleLetterCountRef = useRef(0)

    const calculateDisplayText = useCallback(() => {
      // Increase allowed visible chars
      visibleLetterCountRef.current = visibleLetterCountRef.current + 1

      // Calculate how many scrambled letters we can show
      const remainingSpace = Math.max(
        0,
        text.length - visibleLetterCountRef.current
      )
      const currentScrambleCount = Math.min(
        remainingSpace,
        scrambledLetterCount
      )

      // Generate scrambled text
      const scrambledPart = Array(currentScrambleCount)
        .fill(0)
        .map(() => characters[Math.floor(Math.random() * characters.length)])
        .join('')

      setDisplayText(
        // Slice the text from the beginning to the number of allowed visible
        // chars and append the generated scrambled chars.
        text.slice(0, visibleLetterCountRef.current) + scrambledPart
      )
    }, [text, scrambledLetterCount, characters, scrambleSpeed])

    // Set up a throttled animation to match the animation speed.
    const cancelAnimation = useThrottledAnimationFrame(
      calculateDisplayText,
      scrambleSpeed
    )

    // If we've revealed enough chars to match the final text, cancel the
    // animation
    if (visibleLetterCountRef.current >= text.length) {
      cancelAnimation()
    }

    const revealed = displayText.slice(0, visibleLetterCountRef.current)
    const scrambled = displayText.slice(visibleLetterCountRef.current)

    return (
      <span ref={ref}>
        <span className="screenreader-only">{text}</span>
        <span aria-hidden="true">
          {revealed}
          {scrambled}
        </span>
      </span>
    )
  }
)

function useThrottledAnimationFrame(animateCb: () => void, maxWait: number) {
  const frameRequestId = useRef<number>()

  // Init previous timestamp to the current time
  const prevTimestampRef = useRef<number>(performance.now())

  useEffect(() => {
    function animate(timestamp: number) {
      // Determine how much time has elapsed since the previous frame
      const elapsed = timestamp - prevTimestampRef.current

      // Only trigger the animation callback if the elapsed time has gone past
      // the throttle maximum wait time.
      if (elapsed > maxWait) {
        animateCb()

        // Update the previous frame timestamp to be this frame
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
    // cycles are stopped
    return () => {
      cancel()
    }
  }, [animateCb]) // Ensure that the effect depends on the animation callback

  function cancel() {
    if (frameRequestId.current) cancelAnimationFrame(frameRequestId.current)
  }

  return cancel
}

export default ScrambleIn
