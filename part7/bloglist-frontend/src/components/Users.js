import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

const Users = ({ users }) => {

  return (
    <div>
      <h2>Users</h2>
      <Table striped celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>
              blogs created
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map(user =>
            <Table.Row key={user.id}>
              <Table.Cell>
                <Link to={`/users/${user.id}`}>
                  {user.name}
                </Link>
              </Table.Cell>
              <Table.Cell>
                {user.blogs.length}
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  )
}

export default Users