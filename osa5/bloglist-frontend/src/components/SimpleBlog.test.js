import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'
import { fireEvent } from 'react-testing-library'

afterEach(cleanup)

const blog = {
  title: 'Paras blogi',
  url: 'www.url.fi',
  author: 'Mikko Heinonen',
  likes: 5
}

test('renders content', () => {
  const component = render(
    <SimpleBlog blog={blog} />
  )

  const div1 = component.container.querySelector('.titleAndAuthor')
  const div2 = component.container.querySelector('.likes')

  expect(div1).toHaveTextContent(
    'Paras blogi Mikko Heinonen'
  )

  expect(div2).toHaveTextContent(
    'blog has 5 likes'
  )

})

test('if like button is pressed twice the function is called also twice', () => {
  const mockHandler = jest.fn()
  const { getByText }= render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )
  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})