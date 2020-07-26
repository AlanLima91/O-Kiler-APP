import React from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-test-renderer'
import Login from './Login'

let container

beforeEach(() => {
  container = document.createElement('View')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

it('blah blah', () => {
  act(() => {
    const tree = ReactDOM.render(<Login />, container)
  })
  container.querySelector()
})
