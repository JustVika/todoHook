import React from 'react'
import PropTypes from 'prop-types'

import './new-task-form.css'

export default class NewTaskForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { label: '', sec: '', min: '' }
  }

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    const { label, sec, min } = this.state
    const { addItem } = this.props
    let isNumberSec = Number(sec) ? Number(sec) : '00'
    const isNumberMin = Number(min) ? Number(min) : 1
    isNumberSec = isNumberSec > 59 ? 59 : isNumberSec
    if (!label.trimStart()) return
    addItem(label, isNumberMin, isNumberSec < 10 ? `0${isNumberSec}` : isNumberSec)
    this.setState({
      label: '',
      sec: '',
      min: '',
    })
  }

  render() {
    const { label, sec, min } = this.state
    return (
      <form className="task-form" onSubmit={this.onSubmit}>
        <input
          name="label"
          type="text"
          className="task-form__input"
          placeholder="What needs to be done?"
          onChange={this.onInputChange}
          value={label}
        />
        <input
          type="text"
          className="task-form__input-time"
          placeholder="Min"
          name="min"
          value={min}
          onChange={this.onInputChange}
        />
        <input
          type="text"
          className="task-form__input-time"
          name="sec"
          placeholder="Sec"
          value={sec}
          onChange={this.onInputChange}
        />
        <input type="submit" hidden />
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
