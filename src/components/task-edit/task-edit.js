import React from 'react'
import PropTypes from 'prop-types'
import './task-edit.css'

export default class TaskEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      label: props.task.label,
    }
  }

  handleChange = (key, funcEdit) => {
    this.setState({
      label: key.target.value,
    })
    const { label } = this.state
    if (key.keyCode === 13) {
      funcEdit(label)
    }
  }

  render() {
    const { onEditing } = this.props
    const { label } = this.state
    return (
      <li className="task-list__item task-edit">
        <input
          className="task-edit__input"
          type="text"
          defaultValue={label}
          onKeyUp={(event) => this.handleChange(event, onEditing)}
        />
      </li>
    )
  }
}

TaskEdit.defaultProps = {
  onEditing: () => {},
}

TaskEdit.propTypes = {
  onEditing: PropTypes.func,
}
