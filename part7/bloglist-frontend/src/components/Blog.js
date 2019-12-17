import React from 'react'
import { connect } from 'react-redux'
import { toggleNotification } from '../reducers/notificationReducer'
import {
  updateBlog,
  addComment
} from '../reducers/blogsReducer'
import { setUser } from '../reducers/userReducer'
import { useField } from '../hooks/index'
import {
  Form,
  Button,
  List,
  Item
} from 'semantic-ui-react'

const Blog = (props) => {
  const [comment, resetComment] = useField('text', 'comment')
  const blog = props.blog

  if (blog === undefined) return null

  const handleIncrementBlogLikes = async (blog) => {
    try {
      const { user, likes, author, title, url } = blog
      const newBlog = {
        user: user.id,
        likes: likes + 1,
        author,
        title,
        url
      }

      props.updateBlog(blog.id, newBlog)
    } catch (exception) {
      console.log(exception)
      props.setNotification('Something went wrong', 5)
    }
  }

  const addComment = async (e) => {
    e.preventDefault()

    try {
      props.addComment(blog.id, comment.value)
      resetComment()
      props.setNotification(`A new comment ${comment.value} added`, 5)
    } catch (exception) {
      console.log(exception)
      props.setNotification('Something went wrong', 5)
    }
  }

  return (
    <div>
      <Item>
        <Item.Content>
          <Item.Header as="h2">{blog.title}</Item.Header>
          <Item.Meta as="a" href={blog.url}>
            {blog.url}
          </Item.Meta>
          <Item.Description>
            <span>
              {blog.likes} likes
              <button onClick={() => handleIncrementBlogLikes(blog)}>like</button>
            </span>
            <p>added by {blog.user.name}</p>
          </Item.Description>
        </Item.Content>
      </Item>
      <h3>comments</h3>
      <Form onSubmit={addComment}>
        <input {...comment} />
        <Button type="submit">add comment</Button>
      </Form>
      <List
        bulleted
        items={blog.comments.map(comment => comment)}
      />
    </div>
  )
}

const findBlogToRender = (id, blogs) =>
  blogs.find(b => b.id === id)

const mapStateToProps = (state, ownProps) => {
  return {
    blog: findBlogToRender(
      ownProps.id,
      state.blogs
    )
  }
}

const actionCreators = {
  setNotification: toggleNotification,
  setUser,
  updateBlog,
  addComment
}

export default connect(
  mapStateToProps,
  actionCreators
)(Blog)