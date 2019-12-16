import blogsService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'CREATE_BLOG':
      return [...state, action.data]
    case 'UPDATE_BLOG': {
      const id = action.data.id
      const updatedBlog = action.data
      return state.map(b => b.id !== id ? b : updatedBlog)
    }
    case 'REMOVE_BLOG': {
      const id = action.data.id
      return state.filter(b => b.id !== id)
    }
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const addBlog = (newBlog) => {
  return async (dispatch) => {
    const returnedBlog = await blogsService.create(newBlog)
    dispatch({
      type: 'CREATE_BLOG',
      data: returnedBlog
    })
  }
}

export const updateBlog = (id, newblog) => {
  return async (dispatch) => {
    const returnedBlog = await blogsService.update(id, newblog)
    dispatch({
      type: 'UPDATE_BLOG',
      data: returnedBlog
    })
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogsService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: { id }
    })
  }
}

export const addComment = (id, comment) => {
  return async (dispatch) => {
    const returnedBlog = await blogsService.addComment(id, { comment })
    dispatch({
      type: 'UPDATE_BLOG',
      data: returnedBlog
    })
  }
}

export default reducer