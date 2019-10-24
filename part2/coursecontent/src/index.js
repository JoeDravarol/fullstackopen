import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ title }) => <h1>{title}</h1>

const Part = ({ name, exercise }) => <li>{name} {exercise}</li>

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

const Course = ({ course }) => {
  return (
    <div>
      <Header title={course.name} />
      <Content course={course} />
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  const rows = () => courses.map(course => {
    return (
      <Course course={course} />
    )
  })

  return (
    <div>
      {rows()}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))