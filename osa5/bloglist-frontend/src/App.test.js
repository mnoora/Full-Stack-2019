import React from 'react'
import { render,  waitForElement } from 'react-testing-library'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  it('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )
    expect(component.container).toHaveTextContent('login')
    expect(component.container).not.toHaveTextContent('Selain pystyy suorittamaan vain javascriptiä')
  })

  it('if user is logged in, blogs are rendered', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Teuvo Testaaja'
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
      'HTML on helppoa'
    )

    expect(component.container).toHaveTextContent(
      'Selain pystyy suorittamaan vain javascriptiä'
    )
    expect(component.container).toHaveTextContent(
      'HTTP-protokollan tärkeimmät metodit ovat GET ja POST'
    )
  })
})