
import React from 'react'
import {
    Link
} from 'react-router-dom'
import {Table } from 'react-bootstrap';
import PropTypes from 'prop-types'

const UsersPage = ({users}) => {

    return (
        <div>
            <h2>Users</h2>
            <Table striped>
                <tbody>
                    <tr>
                        <th></th>
                        <th>blogs created</th>
                    </tr>
                    {users.map(user => <tr key={user.id}> 
                        <td>
                            <Link to={`/users/${user.id}`}> {user.name}</Link> 
                        </td>
                        <td>{user.blogs.length}</td>
                    </tr>)}
                </tbody>
            </Table>

        </div>
    )
}

UsersPage.propTypes = {
    users: PropTypes.array.isRequired
}

export default UsersPage