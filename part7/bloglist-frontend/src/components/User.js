import React from 'react'
import { List } from 'semantic-ui-react'

const User = ({ user }) => {
  if (user === undefined) return null

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <List
        bulleted
        items={user.blogs.map(blog => blog.title)}
      />
    </div>
  )
}

export default User