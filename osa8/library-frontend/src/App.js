import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { gql} from 'apollo-boost'
import { useQuery, useMutation,useApolloClient } from '@apollo/react-hooks'


const ALL_AUTHORS = gql`
{
  allAuthors  {
    name
    born
    bookCount
  }
}
`

const ALL_BOOKS = gql`
{
  allBooks  {
    title
    genres
    published
    author {
      name
    }
  }
}
`

const ADD_BOOK = gql`
  mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      title
      published
      genres
    }
  }
`

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo){
      name
      born
    }
  }
`

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

const USER = gql`
  {
    me {
      username
      favoriteGenre
    }
  }
`;

const App = () => {
  const client = useApolloClient()
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const userToken = window.localStorage.getItem('book-user-token');
    console.log('userToken', userToken);
    if (userToken) {
      setToken(userToken);
    }
  }, []);

  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
  const resultAuthors = useQuery(ALL_AUTHORS)
  const resultBooks = useQuery(ALL_BOOKS)
  const resultUser = useQuery(USER)

  const [page, setPage] = useState('authors')

  const [addBook] = useMutation(ADD_BOOK, {
    onError: () => { console.log('Unsuccessful in adding book')},
    refetchQueries: [{ query: ALL_BOOKS} ,{ query: ALL_AUTHORS }]
  })

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onError: () => { console.log('Unsuccessful in editing author')},
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const [login] = useMutation(LOGIN, {
    onError: handleError
  })

  const logout = () => {
    setToken(null)
    localStorage.removeItem('book-user-token');
    console.log(token)
    localStorage.clear()
    client.resetStore()
  }



  
  if (token) {
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
          <button onClick={() => logout() }>logout</button>
        </div>
       

        <Authors
          show={page === 'authors'} result={resultAuthors} editAuthor={editAuthor}
        />

        <Books
          show={page === 'books'} result={resultBooks}
        />

        <NewBook
          show={page === 'add'} addBook={addBook}
        />

      </div>
    )
      }
      else {
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
              <button onClick={() => setPage('login')}>login</button>
            </div>
    
            <Authors
              show={page === 'authors'} result={resultAuthors} editAuthor={editAuthor}
            />
    
            <Books
              show={page === 'books'} result={resultBooks}
            />
            
            <LoginForm 
              show={page=== 'login'} login={login} setToken={(token) => setToken(token)} 
            />
    
          </div>
        )
        
      }
}

export default App