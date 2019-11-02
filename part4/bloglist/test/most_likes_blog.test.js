const mostLikes = require('../utils/list_helper').mostLikes
const blogs = require('../utils/blogs_helper_data')

describe('most likes blog', () => {

  test('of empty list is null', () => {
    const result = mostLikes([])
    expect(result).toBe(null)
  })

  test('of a bigger list is give the right blog', () => {
    const result = mostLikes(blogs)
    const expectedResult = {
      author: "Edsger W. Dijkstra",
      likes: 12
    }

    expect(result).toEqual(expectedResult)
  })
})