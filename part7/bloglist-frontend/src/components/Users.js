import React from 'react'
import { Link } from 'react-router-dom'

const Users = ({ users }) => {

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <td></td>
          <th>blogs created</th>
        </thead>
        <tbody>
          {
            users.map(u =>
              <tr key={u.id}>
                <Link to={`/users/${u.id}`}>
                  <td>{u.name}</td>
                </Link>
                <td>{u.blogs.length}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default Users