import { useState } from 'react'
import ReactDOM from 'react-dom/client'

import AppFooter from './components/app-footer/app-footer'
import AppHeader from './components/app-header/app-header'
import TaskList from './components/task-list/task-list'
import './index.css'

function App() {
  let maxId = 100
  const createTodoItem = (textLabel, min = 1, sec = '05') => ({
    id: maxId++,
    label: textLabel,
    done: false,
    edit: false,
    date: new Date(),
    min,
    sec,
    dateStart: '',
    isCounting: false,
  })
  const [todoData, setTodoDate] = useState([createTodoItem('coffe'), createTodoItem('sleep'), createTodoItem('job')])
  const [filter, setFilter] = useState('all')

  const deletedTask = (id) => {
    const idx = todoData.findIndex((elem) => elem.id === id)
    setTodoDate((todo) => [...todo.slice(0, idx), ...todo.slice(idx + 1)])
  }

  const allDeleted = () => {
    setTodoDate((todo) => todo.filter((item) => !item.done))
  }

  const findTask = (arr, id) => {
    const idx = arr.findIndex((elem) => elem.id === id)
    return { oldItem: arr[idx], idx }
  }

  const closeOpenEditTask = (arr) => {
    const openEditTask = arr.filter((item) => item.edit)
    if (!openEditTask[0]) {
      return false
    }
    const { oldItem, idx } = findTask(todoData, openEditTask[0].id)
    const newItem = { ...oldItem, edit: !oldItem.edit }
    setTodoDate((todo) => [...todo.slice(0, idx), newItem, ...todo.slice(idx + 1)])
    return true
  }

  const editTask = (id, label, min, sec) => {
    const { oldItem, idx } = findTask(todoData, id)
    if (!oldItem.edit) {
      closeOpenEditTask(todoData)
    }
    const newItem = oldItem.edit
      ? { ...oldItem, edit: !oldItem.edit, label }
      : {
          ...oldItem,
          edit: !oldItem.edit,
          min,
          sec,
          dateStart: new Date(),
        }
    setTodoDate((todo) => [...todo.slice(0, idx), newItem, ...todo.slice(idx + 1)])
  }

  const addItem = (textLabel, min, sec) => {
    const newTask = createTodoItem(textLabel, min, sec)

    setTodoDate((todo) => [...todo, newTask])
  }

  const onToggleDone = (id) => {
    const idx = todoData.findIndex((elem) => elem.id === id)
    const oldItem = todoData[idx]
    const newItem = { ...oldItem, done: !oldItem.done }
    setTodoDate((todo) => [...todo.slice(0, idx), newItem, ...todo.slice(idx + 1)])
  }

  const filterTasks = () => {
    switch (filter) {
      case 'all':
        return todoData
      case 'active':
        return todoData.filter((task) => !task.done)
      case 'completed':
        return todoData.filter((task) => task.done)
      default:
        return false
    }
  }

  const onFilterChange = (filters) => {
    setFilter(filters)
  }

  const onChangeStartTimer = (id, min, sec, isCounting, dateStart) => {
    const { oldItem, idx } = findTask(todoData, id)
    let newDate = dateStart
    if (isCounting && !dateStart) {
      newDate = new Date()
    }
    if (!isCounting) {
      newDate = ''
    }
    const newItem = {
      ...oldItem,
      dateStart: newDate,
      min,
      sec,
      isCounting,
    }
    setTodoDate((todo) => [...todo.slice(0, idx), newItem, ...todo.slice(idx + 1)])
  }

  const doneCount = todoData.filter((elem) => !elem.done).length
  const visibleTasks = filterTasks()
  return (
    <section className="todo-app">
      <AppHeader addItem={addItem} />
      <div className="main">
        <TaskList
          todoData={visibleTasks}
          onDeleted={deletedTask}
          onEditing={editTask}
          onToggleDone={onToggleDone}
          onChangeStartTimer={onChangeStartTimer}
        />
      </div>
      <AppFooter doneCount={doneCount} onFilterChange={onFilterChange} filter={filter} allDeleted={allDeleted} />
    </section>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<App />)
