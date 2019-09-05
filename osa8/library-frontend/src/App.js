import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

const ALL_AUTHORS = gql`
{
  allAuthors  {
    name
    born
    id
    bookCount
  }
}
`

const ALL_BOOKS = gql`
{
  allBooks  {
    title
    author
    id
    published
  }
}
`

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
  const resultAuthors = useQuery(ALL_AUTHORS)
  const resultBooks = useQuery(ALL_BOOKS)

  const [page, setPage] = useState('authors')

  return (
    <div>
      {errorMessage &&
        <div style={{color: 'red'}}>
          {errorMessage}
        </div>
      }
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'} result={resultAuthors}
      />

      <Books
        show={page === 'books'} result={resultBooks}
      />

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}

export default App