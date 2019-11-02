const favoriteBlog = require('../utils/list_helper').favoriteBlog
const blogs = require('../utils/blogs_helper_data')

describe('favorite blog', () => {

  test('of empty list is null', () => {
    const result = favoriteBlog([])
    expect(result).toBe(null)
  })

  test('of a bigger list is give the right blog', () => {
    const result = favoriteBlog(blogs)
    const expectedResult = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    }

    expect(result).toEqual(expectedResult)
  })
})