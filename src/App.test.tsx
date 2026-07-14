import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

describe('sentence practice flow', () => {
  it('reveals on the first Enter and advances on the second', () => {
    render(<App />)

    let editor = screen.getByRole('textbox', { name: 'Sentence to correct' })
    expect(editor.textContent).toContain('The table shows number of people')

    fireEvent.keyDown(editor, { key: 'Enter' })
    expect(screen.getByText('The table shows the number of people working in Britain in 1976.')).toBeTruthy()

    fireEvent.keyDown(editor, { key: 'Enter' })
    editor = screen.getByRole('textbox', { name: 'Sentence to correct' })
    expect(editor.textContent).toBe('The news were very upsetting.')
    expect(screen.getByText('002 / 195')).toBeTruthy()
  })

  it('keeps the editable sentence native while typing and reads it only on reveal', () => {
    render(<App />)

    const editor = screen.getByRole('textbox', { name: 'Sentence to correct' })
    editor.textContent = 'The table shows the number of people working in Britain in 1976.'
    fireEvent.input(editor)
    expect(editor.textContent).toBe('The table shows the number of people working in Britain in 1976.')

    fireEvent.keyDown(editor, { key: 'Enter' })
    expect(screen.getAllByText('The table shows the number of people working in Britain in 1976.')).toHaveLength(2)
  })

  it('moves back through revealed sentences and keeps earlier edits', () => {
    render(<App />)

    let editor = screen.getByRole('textbox', { name: 'Sentence to correct' })
    editor.textContent = 'My corrected first sentence.'
    fireEvent.keyDown(editor, { key: 'Enter' })
    fireEvent.keyDown(editor, { key: 'Enter' })

    editor = screen.getByRole('textbox', { name: 'Sentence to correct' })
    fireEvent.keyDown(editor, { key: 'Enter' })
    fireEvent.keyDown(editor, { key: 'Enter' })
    expect(screen.getByText('003 / 195')).toBeTruthy()

    fireEvent.click(screen.getByRole('button', { name: 'Back to previous sentence' }))
    expect(screen.getByText('002 / 195')).toBeTruthy()
    expect(screen.getByText('The news was very upsetting.')).toBeTruthy()

    fireEvent.click(screen.getByRole('button', { name: 'Back to previous sentence' }))
    expect(screen.getByText('001 / 195')).toBeTruthy()
    expect(screen.getByText('My corrected first sentence.')).toBeTruthy()
    expect((screen.getByRole('button', { name: 'Back to previous sentence' }) as HTMLButtonElement).disabled).toBe(true)
  })

  it('keeps an unfinished edit when navigating back and returning', () => {
    render(<App />)

    let editor = screen.getByRole('textbox', { name: 'Sentence to correct' })
    fireEvent.keyDown(editor, { key: 'Enter' })
    fireEvent.keyDown(editor, { key: 'Enter' })

    editor = screen.getByRole('textbox', { name: 'Sentence to correct' })
    editor.textContent = 'An unfinished second edit.'
    fireEvent.click(screen.getByRole('button', { name: 'Back to previous sentence' }))

    editor = screen.getByRole('textbox', { name: 'Sentence to correct' })
    fireEvent.keyDown(editor, { key: 'Enter' })
    editor = screen.getByRole('textbox', { name: 'Sentence to correct' })
    expect(editor.textContent).toBe('An unfinished second edit.')
    expect(editor.getAttribute('contenteditable')).toBe('true')
  })

  it('reveals and advances when a phone user taps outside the editable sentence', () => {
    render(<App />)

    const page = screen.getByRole('main')
    const editor = screen.getByRole('textbox', { name: 'Sentence to correct' })
    editor.textContent = 'A phone edit.'

    fireEvent.pointerUp(editor, { button: 0, pointerType: 'touch' })
    expect(screen.getByText('EDIT THE SENTENCE')).toBeTruthy()

    fireEvent.pointerUp(page, { button: 0, pointerType: 'touch' })
    expect(screen.getByText('YOUR EDIT')).toBeTruthy()
    expect(screen.getByText('The table shows the number of people working in Britain in 1976.')).toBeTruthy()
    expect(screen.getByText('A phone edit.')).toBeTruthy()

    fireEvent.pointerUp(page, { button: 0, pointerType: 'touch' })
    expect(screen.getByText('002 / 195')).toBeTruthy()
  })

  it('provides a tappable action button as a mobile-safe fallback', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: 'Reveal answer' }))
    expect(screen.getByText('The table shows the number of people working in Britain in 1976.')).toBeTruthy()

    fireEvent.click(screen.getByRole('button', { name: 'Next sentence' }))
    expect(screen.getByText('002 / 195')).toBeTruthy()
  })

  it('recognizes the line-break input event emitted by iPhone keyboards', () => {
    render(<App />)

    const editor = screen.getByRole('textbox', { name: 'Sentence to correct' })
    expect(editor.getAttribute('enterkeyhint')).toBe('done')
    fireEvent.input(editor, { inputType: 'insertParagraph' })
    expect(screen.getByText('YOUR EDIT')).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Next sentence' })).toBeTruthy()
  })

  it('reaches the completion screen after the final answer and can restart', () => {
    render(<App />)

    for (let index = 0; index < 195; index += 1) {
      const editor = screen.getByRole('textbox', { name: 'Sentence to correct' })
      fireEvent.keyDown(editor, { key: 'Enter' })
      fireEvent.keyDown(editor, { key: 'Enter' })
    }

    expect(screen.getByText('SESSION COMPLETE')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: /back/i }))
    expect(screen.getByText('195 / 195')).toBeTruthy()
    fireEvent.keyDown(screen.getByRole('textbox', { name: 'Sentence to correct' }), { key: 'Enter' })
    expect(screen.getByText('SESSION COMPLETE')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: /restart/i }))
    expect(screen.getByText('001 / 195')).toBeTruthy()
  })
})
