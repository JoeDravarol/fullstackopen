const mostBlogs = require('../utils/list_helper').mostBlogs
const blogs = require('../utils/blogs_helper_data')

describe('most blogs blog', () => {
  test('of empty blogs list', () => {
    const result = mostBlogs([])
    expect(result).toBe(null)
  })

  test('of a bigger list to give the right blog', () => {
    const result = mostBlogs(blogs)
    const expectedResult = {
      author: 'Edsger W. Dijkstra',
      blogs: 15
    }
    
    expect(result).toEqual(expectedResult)
  })
})