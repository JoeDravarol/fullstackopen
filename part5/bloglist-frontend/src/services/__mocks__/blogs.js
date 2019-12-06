const blogs = [
  {
    id: '5a451df7571c224a31b5c8ce',
    title: 'Testing could be easier',
    author: 'tester001',
    url: 'www.testing.com',
    likes: 5,
    user: {
      _id: '5dcf4860babae5190d0fe614',
      username: 'hellas',
      name: 'Arto Hellas'
    }
  },
  {
    id: '5a451e21e0b8b04a45638211',
    title: 'Integration testing for dummy',
    author: 'tester001',
    url: 'www.testing.com',
    likes: 10,
    user: {
      _id: '5dcf4860babae5190d0fe614',
      username: 'hellas',
      name: 'Arto Hellas'
    }
  },
  {
    id: '5a451e30b5ffd44a58fa79ab',
    title: 'Unit testing for dummy',
    author: 'tester001',
    url: 'www.testing.com',
    likes: 0,
    user: {
      _id: '5dcf4860babae5190d0fe614',
      username: 'hellas',
      name: 'Arto Hellas'
    }
  }
]

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, setToken }