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

  onSubmit = (event) => {
    event.preventDefault()
    const { label } = this.state
    const { onEditing } = this.props
    if (!label.trimStart()) return
    onEditing(label)
    this.setState({
      label: '',
    })
  }

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value,
    })
  }

  render() {
    const { label } = this.state
    return (
      <div className=" task-edit">
        <form onSubmit={this.onSubmit} className="task-edit__form">
          <input className="task-edit__input" type="text" value={label} onChange={this.onLabelChange} />
        </form>
      </div>
    )
  }
}

TaskEdit.defaultProps = {
  onEditing: () => {},
}

TaskEdit.propTypes = {
  onEditing: PropTypes.func,
}
