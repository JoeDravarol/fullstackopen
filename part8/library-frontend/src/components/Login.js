import React from 'react'

const Login = (props) => {

  if (!props.show) {
    return null
  }

  const submit = async (e) => {
    e.preventDefault()

    const target = e.target
    const username = target.username.value
    const password = target.password.value
    const result = await props.login({
      variables: { username, password },
      onError: props.handleError
    })

    if (result) {
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem('library-user-token', token)
      props.setPage('authors')
    }
  }

  return (
    <form onSubmit={submit}>
      <div>
        name:
        <input
          type="text"
          name="username"
        />
      </div>
      <div>
        password:
        <input
          type="password"
          name="password"
        />
      </div>
      <button>login</button>
    </form>
  )
}

export default Login