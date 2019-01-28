import React from 'react'

const Filter = ({ findName, handleFindNameChange}) => {
    return (
        <div>
        rajaa näytettäviä <input value={findName} onChange={handleFindNameChange} />
        </div>
    )
}

export default Filter