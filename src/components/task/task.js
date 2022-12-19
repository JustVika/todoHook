import React from 'react'
import PropTypes from 'prop-types'
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'
import './task.css'

export default class Task extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: formatDistanceToNowStrict(props.task.date),
      min: props.task.min,
      sec: props.task.sec,
      isCounting: false,
    }
    this.counterID = 1
  }

  componentDidMount() {
    this.timer()
  }

  componentDidUpdate() {
    this.timer()
  }

  componentWillUnmount() {
    clearInterval(this.counterID)
  }

  timerCountDownStart = () => {
    const { min, sec } = this.state
    if (!min && !sec) return
    this.setState({ isCounting: true })
    this.counterID = setInterval(() => {
      this.changeSec()
    }, 1000)
  }

  timerCountDownPause = () => {
    this.setState({ isCounting: false })
    clearInterval(this.counterID)
  }

  changeSec = () => {
    const { sec } = this.state
    sec > 0 ? this.setState({ sec: sec > 9 ? sec - 1 : `0${sec - 1}` }) : this.changeMin()
  }

  changeMin = () => {
    const { min } = this.state
    min > 0 ? this.setState({ min: min - 1, sec: 59 }) : clearInterval(this.counterID)
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

    const { date, min, sec, isCounting } = this.state
    let classNames = 'task__label'
    if (done) {
      classNames += ' task__label--done'
    }
    const timerButton = !isCounting ? (
      <button type="button" className="task__timer-start" onClick={this.timerCountDownStart}>
        {' '}
      </button>
    ) : (
      <button type="button" className="task__timer-pause" onClick={this.timerCountDownPause}>
        {' '}
      </button>
    )
    return (
      <div className="task">
        <label htmlFor={`task${id}`} className={classNames}>
          <input id={`task${id}`} className="task__input" type="checkbox" checked={done} onChange={onToggleDone} />
          <span className="task__check-box" />
          <span>{label}</span>
        </label>
        <div className="task__wrapper">
          {timerButton}
          <span className="task__timer">{`${min}:${sec}`}</span>
          <div className="task__create-date"> {`created ${date} ago`}</div>
          <button
            type="button"
            aria-label="Task Edit"
            className="task__btn btn-edit"
            onClick={() => onEditing({ min, sec, label })}
          />
          <button type="button" aria-label="Task Delete" className="task__btn btn-destroy" onClick={onDeleted} />
        </div>
      </div>
    )
  }
}
Task.defaultProps = {
  onDeleted: () => {},
  onEditing: () => {},
  onToggleDone: () => {},
}
Task.propTypes = {
  onDeleted: PropTypes.func,
  onEditing: PropTypes.func,
  onToggleDone: PropTypes.func,
}
