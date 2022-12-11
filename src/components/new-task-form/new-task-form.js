import React from 'react'
import PropTypes from 'prop-types'

import './new-task-form.css'

export default class NewTaskForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { label: '' }
  }

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value,
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    const { label } = this.state
    const { addItem } = this.props
    if (!label.trimStart()) return
    addItem(label)
    this.setState({
      label: '',
    })
  }

  render() {
    const { label } = this.state
    return (
      <form className="task-form" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="task-form__input"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          value={label}
        />
      </form>
    )
  }
}

NewTaskForm.defaultProps = {
  addItem: () => {},
}
NewTaskForm.propTypes = {
  addItem: PropTypes.func,
}
