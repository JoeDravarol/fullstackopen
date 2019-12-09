import React from 'react'

const Notification = (props) => {
  const store = props.store
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  return (
    <div style={style}>
      {store.getState().notification}
    </div>
  )
}

export default Notification