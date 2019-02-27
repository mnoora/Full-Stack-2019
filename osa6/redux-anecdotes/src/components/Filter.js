import React from 'react'
import { filterChange } from '../reducers/filterReducer';

const Filter = (props) => {
  const handleChange = (event) => {
    const input = event.target.value
    props.store.dispatch(filterChange(input))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter