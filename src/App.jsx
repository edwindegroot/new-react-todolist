import { useState } from 'react'
import './App.css'


const Add = ({handleSubmit, handleChange, newTodo}) => {
  return (
    <form onSubmit={handleSubmit}>
      <input value={newTodo} onChange={handleChange}/>
      <button type='submit'>Add</button>
    </form>
  )
}

function App() {
  const [todos, setTodos] = useState(['Do groceries', 'Clean kitchen'])
  const [newTodo, setNewTodo] = useState('')
  const [checkedBoxes, setCheckedBoxes] = useState([])

  const Checkbox = ({k}) => {
    if (checkedBoxes.includes(k)) return (<input type='checkbox' checked onChange={(e) => handleCheckboxChange(e, k)}></input>)
    return (<input type='checkbox' onChange={(e) => handleCheckboxChange(e, k)}></input>)
  }

  const handleCheckboxChange = (e, key) => {
    console.log(e.target.checked)
    console.log(key)
    let copy = [...checkedBoxes]
    if (e.target.checked) {
      copy.push(key)
      setCheckedBoxes(copy)
    } else {
      let filtered = copy.filter(i => i !== key)
      setCheckedBoxes(filtered)
    }
  }

  const ItemStr = ({todo}) => {
    return (<>{todo}</>)
  }

  const ListItem = ({todo, i}) => {
    console.log(typeof todo)
    let copy = todo
    if (checkedBoxes.includes(i)) return (<s><ItemStr todo={todo}/></s>)
    return (<ItemStr todo={todo}/>)
  }

  const Todos = () => {
    return (
      <ul className='list'>
        {/* {todos.map((todo, i) => <li key={i}><Checkbox k={i}/><s>{todo}</s></li>)} */}
        {todos.map((todo, i) => <li key={i}><Checkbox k={i}/><ListItem todo={todo} i={i}/></li>)}

      </ul>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let copy = [...todos]
    copy.push(newTodo)
    setTodos(copy)
    setNewTodo('')
  }

  const handleChange = (e) => {
    setNewTodo(e.target.value)
  }

  const handleClear = () => {
    if (!window.confirm('Clear todo list?')) return;
    setCheckedBoxes([])
    setTodos([])
  }

  const ClearButton = () => {
    return (
      <button onClick={handleClear}>Clear</button>
    )
  }

  return (
    <div>
      <h1>Todo's</h1>
      <Todos />
      <Add handleSubmit={handleSubmit} handleChange={handleChange} newTodo={newTodo}/>
      <ClearButton />
    </div>
  )
}

export default App
