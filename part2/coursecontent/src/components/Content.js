import React from 'react';
import Part from './Part';

const Content = ({ course }) => {
  const parts = course.parts.map(part => <Part key={part.id} name={part.name} exercise={part.exercises} />)
  const totalExercises = course.parts.reduce( (sum, part) => sum + part.exercises, 0 )

  return (
    <>
      <ul>
        {parts}
      </ul>
      <strong><p>total of {totalExercises} exercises</p></strong>
    </>
  )
}

export default Content