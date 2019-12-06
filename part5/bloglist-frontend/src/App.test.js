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
})