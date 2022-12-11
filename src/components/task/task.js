import React from 'react'
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'
import './task.css'

export default class Task extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: formatDistanceToNowStrict(props.task.date),
    }
  }

  timer = () => {
    const {
      task: { date },
    } = this.props

    setTimeout(
      () =>
        this.setState({
          date: formatDistanceToNowStrict(date),
        }),
      10000
    )
  }

  render() {
    const {
      onDeleted,
      onToggleDone,
      onEditing,
      task: { label, done, id },
    } = this.props
    const { date } = this.state
    let classNames = 'task__label'
    if (done) {
      classNames += ' task__label--done'
    }
    this.timer()
    return (
      <li className="task-list__item task">
        <label htmlFor={`task${id}`} className={classNames}>
          <input id={`task${id}`} className="task__input" type="checkbox" checked={done} onChange={onToggleDone} />
          <span className="task__check-box" />
          {label}
        </label>
        <div className="task__wrapper">
          <div className="task__create-date"> {`created ${date} ago`}</div>
          <button
            type="button"
            aria-label="Task Edit"
            className="task__btn btn-edit"
            onClick={() => onEditing(label)}
          />
          <button type="button" aria-label="Task Delete" className="task__btn btn-destroy" onClick={onDeleted} />
        </div>
      </li>
    )
  }
}
