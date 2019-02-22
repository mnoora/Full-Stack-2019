import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup } from 'react-testing-library'
import Blog from './Blog'
import { fireEvent } from 'react-testing-library'
import { prettyDOM } from 'dom-testing-library'

afterEach(cleanup)

const blog = {
  title: 'Paras blogi',
  url: 'www.url.fi',
  author: 'Mikko Heinonen',
  likes: 5
}

test('By default shows only title and author', () => {
  const component = render(
    <Blog blog={blog} />
  )

  const div1 = component.container.querySelector('.default')
  const div2 = component.container.querySelector('.showAll')

  expect(div1).toHaveTextContent(
    'Paras blogi Mikko Heinonen'
  )
  expect(div1).not.toHaveTextContent(
    `${blog.url}`
  )
  expect(div2).toBe(null)
})

test('if clicked all information is shown', () => {
  const component = render(
    <Blog blog={blog} />
  )

  const div1 = component.container.querySelector('.default')
  fireEvent.click(div1)
  const div2 = component.container.querySelector('.showAll')

  expect(div2).toHaveTextContent(`${blog.title}`)
  expect(div2).toHaveTextContent(`${blog.author}`)
  expect(div2).toHaveTextContent(`${blog.url}`)
  expect(div2).toHaveTextContent(`${blog.likes}`)
  expect(div2).toHaveTextContent('added by unknown user')
})