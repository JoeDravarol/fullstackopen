import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import SimpleBlog from './SimpleBlog'

test('renders content', () => {
  const blog = {
    title: 'Testing with Jest',
    author: 'tester001',
    likes: 2,
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Testing with Jest tester001'
  )

  expect(component.container).toHaveTextContent(
    'blog has 2 likes'
  )
})

test('clicking the likes button twice, calls event handler twice', () => {
  const blog = {
    title: 'Testing with Jest',
    author: 'tester001',
    likes: 2,
  }

  const mockHandler = jest.fn()

  // Destructure component.container getByText method
  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})