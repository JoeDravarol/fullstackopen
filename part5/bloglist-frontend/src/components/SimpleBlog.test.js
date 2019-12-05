import React from 'react'
import { render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import SimpleBlog from './SimpleBlog'

test('renders content', () => {
  const blog = {
    title: 'Testing with Jest',
    author: 'tester001',
    likes: 2,
  }

  const component = render(
    <SimpleBlog blog={blog}/>
  )

  expect(component.container).toHaveTextContent(
    'Testing with Jest tester001'
  )

  expect(component.container).toHaveTextContent(
    'blog has 2 likes'
  )
})