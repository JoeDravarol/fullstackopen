import React from 'react'
import { Form as FormSUi, Button } from 'semantic-ui-react'

const Form = ({ addBlog, title, author, url }) => {

  return (
    <FormSUi onSubmit={addBlog}>
      <FormSUi.Field>
        <label>title:</label>
        <input {...title} data-cy="title"/>
      </FormSUi.Field>
      <FormSUi.Field>
        <label>author:</label>
        <input {...author} data-cy="author"/>
      </FormSUi.Field>
      <FormSUi.Field>
        <label>url:</label>
        <input {...url} data-cy="url"/>
      </FormSUi.Field>
      <Button type="submit">create</Button>
    </FormSUi>
  )
}

export default Form