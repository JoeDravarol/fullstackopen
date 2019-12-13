import { useState } from 'react'
import axios from 'axios'

export const useField = (type, name) => {
  const [value, setValue] = useState('')

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return [
    {
      type,
      name,
      value,
      onChange
    },
    reset]
}

let token = null

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const get = async () => {
    const response = await axios.get(baseUrl)
    setResources(response.data)
  }

  const create = async (resource) => {
    const config = {
      headers: { Authorization: token }
    }

    const response = await axios.post(baseUrl, resource, config)
    setResources(resources.concat(response.data))
  }

  const update = async (id, resource) => {
    const response = await axios.put(`${baseUrl}/${id}`, resource)
    setResources(resources.map(r => r.id !== id ? r : response.data))
  }

  const remove = async (id) => {
    const config = {
      headers: { Authorization: token }
    }

    await axios.delete(`${baseUrl}/${id}`, config)
    setResources(resources.filter(resource => resource.id !== id))
  }

  const setToken = newToken => {
    token = `bearer ${newToken}`
  }

  const service = {
    get,
    create,
    update,
    remove,
    setToken
  }

  return [resources, service]
}