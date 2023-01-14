import { useState } from 'react'
import PropTypes from 'prop-types'

import './new-task-form.css'

function NewTaskForm(props) {
  const [label, setLabel] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')
  const onInputChange = (event) => {
    switch (event.target.name) {
      case 'label':
        setLabel(event.target.value)
        return
      case 'min':
        setMin(event.target.value)
        return
      case 'sec':
        setSec(event.target.value)
        break
      default:
        break
    }
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const { addItem } = props

    let isNumberSec = Number(sec) ? Number(sec) : '00'
    const isNumberMin = Number(min) ? Number(min) : 0
    isNumberSec = isNumberSec > 59 ? 59 : isNumberSec
    if (!label.trimStart()) return
    addItem(label, isNumberMin, isNumberSec < 10 ? `0${isNumberSec}` : isNumberSec)
  }

  return (
    <form className="task-form" onSubmit={onSubmit}>
      <input
        name="label"
        type="text"
        className="task-form__input"
        placeholder="What needs to be done?"
        onChange={onInputChange}
        value={label}
      />
      <input
        type="text"
        className="task-form__input-time"
        placeholder="Min"
        name="min"
        value={min}
        onChange={onInputChange}
      />
      <input
        type="text"
        className="task-form__input-time"
        name="sec"
        placeholder="Sec"
        value={sec}
        onChange={onInputChange}
      />
      <input type="submit" hidden />
    </form>
  )
}

export default NewTaskForm
NewTaskForm.defaultProps = {
  addItem: () => {},
}
NewTaskForm.propTypes = {
  addItem: PropTypes.func,
}
