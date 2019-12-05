import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const blog = {
    title: 'Testing blog feature',
    author: 'tester001',
    likes: 0,
    url: 'www.testing123.com',
    user: {
      name: 'tester'
    }
  }

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
      />
    )
  })

  test('at start only title and author is displayed', () => {
    const element = component.getByText(`${blog.title} ${blog.author}`)
    const div = component.container.querySelector('.togglableContent')

    expect(element).toBeDefined()
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the title, the full blog info are displayed', () => {
    const title = component.getByText(`${blog.title} ${blog.author}`)
    fireEvent.click(title)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })
})