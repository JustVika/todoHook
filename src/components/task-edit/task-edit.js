import { useState } from 'react'
import PropTypes from 'prop-types'
import './task-edit.css'

function TaskEdit(props) {
  const {
    task: { label: name },
  } = props
  const [label, setLabel] = useState(name)
  const onSubmit = (event) => {
    event.preventDefault()
    const { onEditing } = props
    if (!label.trimStart()) return
    onEditing(label)
    setLabel('')
  }

  const onLabelChange = (event) => {
    setLabel(event.target.value)
  }

  return (
    <div className=" task-edit">
      <form onSubmit={onSubmit} className="task-edit__form">
        <input className="task-edit__input" type="text" value={label} onChange={onLabelChange} />
      </form>
    </div>
  )
}

export default TaskEdit
TaskEdit.defaultProps = {
  onEditing: () => {},
}

TaskEdit.propTypes = {
  onEditing: PropTypes.func,
}
