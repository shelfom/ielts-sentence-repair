import { useEffect, useRef, useState } from 'react'
import { exercises } from './exercises'

type Phase = 'editing' | 'revealed' | 'complete'

const pad = (value: number) => String(value).padStart(3, '0')

function App() {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('editing')
  const [attempt, setAttempt] = useState(exercises[0].original)
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
    setAttempt(editorRef.current?.textContent?.trim() ?? '')
    setPhase('revealed')
  }

  const advance = () => {
    if (index === exercises.length - 1) {
      setPhase('complete')
      return
    }

    const nextIndex = index + 1
    setIndex(nextIndex)
    setAttempt(exercises[nextIndex].original)
    setPhase('editing')
  }

  const restart = () => {
    setIndex(0)
    setAttempt(exercises[0].original)
    setPhase('editing')
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter' || event.nativeEvent.isComposing) return
    event.preventDefault()
    if (event.repeat) return
    if (phase === 'editing') reveal()
    if (phase === 'revealed') advance()
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
          <button ref={restartRef} className="restart" onClick={restart}>
            RESTART <span aria-hidden="true">↵</span>
          </button>
        </div>
        <p className="corner-mark" aria-hidden="true">SR / 195</p>
      </main>
    )
  }

  return (
    <main className={`app phase-${phase}`}>
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
            onKeyDown={handleKeyDown}
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
        <p className="mode-note">IELTS SENTENCE CORRECTION</p>
        <p className="enter-hint">
          {phase === 'editing' ? 'REVEAL ANSWER' : exercise.id === exercises.length ? 'FINISH SESSION' : 'NEXT SENTENCE'}
          <kbd>ENTER ↵</kbd>
        </p>
      </footer>
    </main>
  )
}

export default App
