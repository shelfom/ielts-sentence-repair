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

  it('reaches the completion screen after the final answer and can restart', () => {
    render(<App />)

    for (let index = 0; index < 195; index += 1) {
      const editor = screen.getByRole('textbox', { name: 'Sentence to correct' })
      fireEvent.keyDown(editor, { key: 'Enter' })
      fireEvent.keyDown(editor, { key: 'Enter' })
    }

    expect(screen.getByText('SESSION COMPLETE')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: /restart/i }))
    expect(screen.getByText('001 / 195')).toBeTruthy()
  })
})
