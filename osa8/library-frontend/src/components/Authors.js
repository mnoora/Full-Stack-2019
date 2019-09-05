import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useApolloClient, useQuery } from '@apollo/react-hooks'

const Authors = ({show, result, editAuthor} ) => {
  const client = useApolloClient()
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')


  if (!show) {
    return null
  }
  if(result.loading){
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  const submit = async (e) => {
    e.preventDefault()

    const setBornTo = born

    await editAuthor({
      variables: { name, setBornTo}
    })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
    <div>
      <h3>Set birthyear</h3>

      <form onSubmit={submit}>
      <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
      <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
    </div>
  )
}

export default Authors