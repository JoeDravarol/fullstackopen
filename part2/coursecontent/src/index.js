import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ title }) => <h1>{title}</h1>

const Part = ({ name, exercise }) => <li>{name} {exercise}</li>

const Content = ({ course }) => {
  const parts = course.parts.map(part => <Part key={part.id} name={part.name} exercise={part.exercises} />)

  return (
    <>
      <ul>
        {parts}
      </ul>
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
  const course = {
    name: 'Half Stack application development',
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
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))