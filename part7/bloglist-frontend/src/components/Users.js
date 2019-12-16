import React, { useEffect } from 'react'
import { useResource } from '../hooks/index'

const Users = () => {
  const [users, usersService] = useResource('/api/users')

  useEffect( async() => {
    await usersService.get()
  }, [])

  console.log(users)
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
                <td>{u.name}</td>
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