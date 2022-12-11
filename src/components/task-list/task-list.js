import PropTypes from 'prop-types'

import Task from '../task/task'
import TaskEdit from '../task-edit/task-edit'
import './task-list.css'

function TaskList({ todoData, onDeleted, onEditing, onToggleDone }) {
  const tasks = todoData.map((item) => {
    if (!item.edit) {
      return (
        <Task
          key={item.id}
          task={item}
          onDeleted={() => onDeleted(item.id)}
          onEditing={(label) => onEditing(item.id, label)}
          onToggleDone={() => onToggleDone(item.id)}
        />
      )
    }
    return <TaskEdit key={item.id} task={item} onEditing={(label) => onEditing(item.id, label)} />
  })

  return <ul className="task-list">{tasks}</ul>
}

TaskList.defaultProps = {
  onDeleted: () => {},
  onEditing: () => {},
  onToggleDone: () => {},
  todoData: [],
}
TaskList.propTypes = {
  onDeleted: PropTypes.func,
  onEditing: PropTypes.func,
  onToggleDone: PropTypes.func,
  todoData: PropTypes.arrayOf(PropTypes.objectOf),
}
export default TaskList
