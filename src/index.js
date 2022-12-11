import React from 'react'
import ReactDOM from 'react-dom/client'

import AppFooter from './components/app-footer/app-footer'
import AppHeader from './components/app-header/app-header'
import TaskList from './components/task-list/task-list'
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.maxId = 100
    this.state = {
      todoData: [this.createTodoItem('coffe'), this.createTodoItem('sleep'), this.createTodoItem('job')],
      filter: 'all',
    }
  }

  createTodoItem = (textLabel) => {
    return {
      id: this.maxId++,
      label: textLabel,
      done: false,
      edit: false,
      date: new Date(),
    }
  }

  deletedTask = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((elem) => elem.id === id)
      return { todoData: [...todoData.slice(0, idx), ...todoData.slice(idx + 1)] }
    })
  }

  allDeleted = () => {
    this.setState({
      todoData: [],
    })
  }

  findTask = (arr, id) => {
    const idx = arr.findIndex((elem) => elem.id === id)
    return { oldItem: arr[idx], idx }
  }

  closeOpenEditTask = (arr) => {
    const openEditTask = arr.filter((item) => item.edit)
    if (!openEditTask[0]) {
      return false
    }
    this.setState(({ todoData }) => {
      const { oldItem, idx } = this.findTask(todoData, openEditTask[0].id)
      const newItem = { ...oldItem, edit: !oldItem.edit }
      return {
        todoData: [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)],
      }
    })
    return true
  }

  editTask = (id, label) => {
    const { todoData: arr } = this.state
    const { oldItem, idx } = this.findTask(arr, id)
    if (!oldItem.edit) {
      this.closeOpenEditTask(arr)
    }
    this.setState(({ todoData }) => {
      const newItem = oldItem.edit ? { ...oldItem, edit: !oldItem.edit, label } : { ...oldItem, edit: !oldItem.edit }
      return {
        todoData: [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)],
      }
    })
  }

  addItem = (textLabel) => {
    const newTask = this.createTodoItem(textLabel)

    this.setState(({ todoData }) => {
      return { todoData: [...todoData, newTask] }
    })
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((elem) => elem.id === id)
      const oldItem = todoData[idx]
      const newItem = { ...oldItem, done: !oldItem.done }
      return { todoData: [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)] }
    })
  }

  filterTasks = () => {
    const { todoData, filter } = this.state
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

  onFilterChange = (filter) => {
    this.setState({
      filter,
    })
  }

  render() {
    const { todoData, filter } = this.state
    const doneCount = todoData.filter((elem) => !elem.done).length
    const visibleTasks = this.filterTasks ()
    return (
      <section className="todo-app">
        <AppHeader addItem={this.addItem} />
        <div className="main">
          <TaskList
            todoData={visibleTasks}
            onDeleted={this.deletedTask}
            onEditing={this.editTask}
            onToggleDone={this.onToggleDone}
          />
        </div>
        <AppFooter
          doneCount={doneCount}
          onFilterChange={this.onFilterChange}
          filter={filter}
          allDeleted={this.allDeleted}
        />
      </section>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<App />)
