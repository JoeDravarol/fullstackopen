import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import App from './App'
jest.mock('./services/blogs')

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('Login')
    )

    const nameInput = component.container.querySelector(`input[name='Username']`)
    const passwordInput = component.container.querySelector(`input[name='Password']`)
    const loginButton = component.getByText('Login')
    const blog = component.container.querySelector('.blog')

    expect(nameInput).toBeDefined()
    expect(passwordInput).toBeDefined()
    expect(loginButton).toBeDefined()
    expect(blog).toBeNull()
  })

  test('if user logged in, blogs are rendered', async () => {
    const user = {
      username: 'tester',
      token: '1231231234',
      name: 'Damian Tester'
    }

    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelector('.blog')
    )

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(3)

    expect(component.container).toHaveTextContent(
      'Testing could be easier'
    )
    expect(component.container).toHaveTextContent(
      'Integration testing for dummy'
    )
    expect(component.container).toHaveTextContent(
      'Unit testing for dummy'
    )
  })
})