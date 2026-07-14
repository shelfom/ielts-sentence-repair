import { useEffect, useRef, useState } from 'react'
import { exercises } from './exercises'

type Phase = 'editing' | 'revealed' | 'complete'

const pad = (value: number) => String(value).padStart(3, '0')

function App() {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('editing')
  const [attempt, setAttempt] = useState(exercises[0].original)
  const [attempts, setAttempts] = useState(() => exercises.map((exercise) => exercise.original))
  const [revealed, setRevealed] = useState(() => exercises.map(() => false))
  const editorRef = useRef<HTMLDivElement>(null)
  const restartRef = useRef<HTMLButtonElement>(null)
  const exercise = exercises[index]

  useEffect(() => {
    if (phase === 'editing' || phase === 'revealed') {
      const editor = editorRef.current
      if (!editor) return
      editor.focus()
      if (phase === 'revealed') return
      const selection = window.getSelection()
      const range = document.createRange()
      range.selectNodeContents(editor)
      range.collapse(false)
      selection?.removeAllRanges()
      selection?.addRange(range)
    }

    if (phase === 'complete') restartRef.current?.focus()
  }, [index, phase])

  const reveal = () => {
    const currentAttempt = editorRef.current?.textContent?.trim() ?? ''
    setAttempt(currentAttempt)
    setAttempts((previous) => {
      const next = [...previous]
      next[index] = currentAttempt
      return next
    })
    setRevealed((previous) => {
      const next = [...previous]
      next[index] = true
      return next
    })
    setPhase('revealed')
  }

  const advance = () => {
    if (index === exercises.length - 1) {
      setPhase('complete')
      return
    }

    const nextIndex = index + 1
    setIndex(nextIndex)
    setAttempt(attempts[nextIndex])
    setPhase(revealed[nextIndex] ? 'revealed' : 'editing')
  }

  const goBack = () => {
    if (phase === 'complete') {
      const lastIndex = exercises.length - 1
      setIndex(lastIndex)
      setAttempt(attempts[lastIndex])
      setPhase('revealed')
      return
    }

    if (index === 0) return

    if (phase === 'editing') {
      const currentAttempt = editorRef.current?.textContent ?? attempt
      setAttempts((previous) => {
        const next = [...previous]
        next[index] = currentAttempt
        return next
      })
    }

    const previousIndex = index - 1
    setIndex(previousIndex)
    setAttempt(attempts[previousIndex])
    setPhase(revealed[previousIndex] ? 'revealed' : 'editing')
  }

  const restart = () => {
    setIndex(0)
    setAttempt(exercises[0].original)
    setAttempts(exercises.map((exercise) => exercise.original))
    setRevealed(exercises.map(() => false))
    setPhase('editing')
  }

  const performPrimaryAction = () => {
    if (phase === 'editing') reveal()
    if (phase === 'revealed') advance()
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.altKey && event.key === 'ArrowLeft') {
      event.preventDefault()
      goBack()
      return
    }

    if (event.key !== 'Enter' || event.nativeEvent.isComposing) return
    event.preventDefault()
    if (event.repeat) return
    performPrimaryAction()
  }

  const handleBeforeInput = (event: React.FormEvent<HTMLDivElement>) => {
    const nativeEvent = event.nativeEvent as InputEvent
    if (
      phase !== 'editing'
      || nativeEvent.isComposing
      || (nativeEvent.inputType !== 'insertParagraph' && nativeEvent.inputType !== 'insertLineBreak')
    ) return

    event.preventDefault()
    reveal()
  }

  const handleInput = (event: React.FormEvent<HTMLDivElement>) => {
    const nativeEvent = event.nativeEvent as InputEvent
    if (
      phase === 'editing'
      && (nativeEvent.inputType === 'insertParagraph' || nativeEvent.inputType === 'insertLineBreak')
    ) reveal()
  }

  const handleSurfacePointerUp = (event: React.PointerEvent<HTMLElement>) => {
    if (event.defaultPrevented || event.button !== 0) return

    const target = event.target as HTMLElement
    if (target.closest('button, a')) return
    if (phase === 'editing' && target.closest('.sentence-editor')) return

    performPrimaryAction()
  }

  if (phase === 'complete') {
    return (
      <main className="app complete-screen">
        <div className="frame frame-complete" aria-labelledby="completion-title">
          <p className="eyebrow">SESSION COMPLETE</p>
          <h1 id="completion-title">195 sentences completed.</h1>
          <p className="completion-copy">
            Start again when you are ready.
          </p>
          <div className="completion-actions">
            <button className="back-button completion-back" onClick={goBack}>
              <span aria-hidden="true">←</span> BACK
            </button>
            <button ref={restartRef} className="restart" onClick={restart}>
              RESTART <span aria-hidden="true">↵</span>
            </button>
          </div>
        </div>
        <p className="corner-mark" aria-hidden="true">SR / 195</p>
      </main>
    )
  }

  return (
    <main className={`app phase-${phase}`} onPointerUp={handleSurfacePointerUp}>
      <header className="topbar">
        <a className="wordmark" href="/" onClick={(event) => event.preventDefault()} aria-label="Sentence Repair home">
          SENTENCE REPAIR
        </a>
        <div className="progress" aria-label={`Exercise ${exercise.id} of ${exercises.length}, group ${exercise.group}`}>
          <span>GROUP {String(exercise.group).padStart(2, '0')}</span>
          <span className="progress-count">{pad(exercise.id)} / {exercises.length}</span>
        </div>
      </header>

      <section className="practice" aria-labelledby="practice-label">
        <div className="sentence-panel prompt-block">
          <p id="practice-label" className="eyebrow">
            {phase === 'editing' ? 'EDIT THE SENTENCE' : 'YOUR EDIT'}
          </p>
          <div
            key={exercise.id}
            ref={editorRef}
            className="sentence-editor"
            contentEditable={phase === 'editing'}
            tabIndex={0}
            suppressContentEditableWarning
            role="textbox"
            aria-label="Sentence to correct"
            aria-multiline="false"
            spellCheck={false}
            enterKeyHint="done"
            onKeyDown={handleKeyDown}
            onBeforeInput={handleBeforeInput}
            onInput={handleInput}
          >
            {attempt}
          </div>
        </div>

        <div className={`sentence-panel answer-block ${phase === 'revealed' ? 'is-visible' : ''}`} aria-live="polite" aria-hidden={phase !== 'revealed'}>
          <p className="eyebrow answer-label">
            {exercise.correctAsWritten ? 'CORRECT AS WRITTEN' : 'CORRECTION'}
          </p>
          <p className="answer">{exercise.corrected}</p>
          {exercise.alternatives?.map((alternative) => (
            <p className="alternative" key={alternative}>ALSO ACCEPTED — {alternative}</p>
          ))}
        </div>
      </section>

      <footer className="footer">
        <button
          className="back-button"
          type="button"
          onClick={goBack}
          disabled={index === 0}
          aria-label="Back to previous sentence"
          title="Back to previous sentence (Alt + Left Arrow)"
        >
          <span aria-hidden="true">←</span> BACK
        </button>
        <button
          className="enter-hint"
          type="button"
          onClick={performPrimaryAction}
          aria-label={phase === 'editing' ? 'Reveal answer' : exercise.id === exercises.length ? 'Finish session' : 'Next sentence'}
        >
          <span>{phase === 'editing' ? 'REVEAL ANSWER' : exercise.id === exercises.length ? 'FINISH SESSION' : 'NEXT SENTENCE'}</span>
          <kbd><span className="desktop-key">ENTER ↵</span><span className="mobile-key">TAP</span></kbd>
        </button>
      </footer>
    </main>
  )
}

export default App
