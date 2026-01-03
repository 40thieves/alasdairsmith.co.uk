import { forwardRef } from 'preact/compat'
import { useEffect, useRef, useState } from 'preact/hooks'

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

    const prevTimestampRef = useRef<number>(performance.now())

    useEffect(() => {
      let frameRequestId: number | undefined

      function animate(timestamp: number) {
        const elapsed = timestamp - prevTimestampRef.current

        if (elapsed > scrambleSpeed) {
          // If we've not revealed enough chars to match the final text,
          // increase allowed chars by 1
          if (visibleLetterCountRef.current < text.length) {
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
              .map(
                () => characters[Math.floor(Math.random() * characters.length)]
              )
              .join('')

            setDisplayText(
              // Slice the text from the beginning to the number of allowed
              // visible chars and append the generated scrambled chars
              text.slice(0, visibleLetterCountRef.current) + scrambledPart
            )
          }
          // Complete animation
          else {
            if (frameRequestId) cancelAnimationFrame(frameRequestId)
            return
          }

          prevTimestampRef.current = performance.now()
        }

        frameRequestId = requestAnimationFrame(animate)
      }

      frameRequestId = requestAnimationFrame(animate)

      return () => {
        if (frameRequestId) cancelAnimationFrame(frameRequestId)
      }
    }, [text, scrambledLetterCount, characters, scrambleSpeed])

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

export default ScrambleIn
