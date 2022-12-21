import React from 'react'
import PropTypes from 'prop-types'
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'
import './task.css'
import formatDistanceStrict from 'date-fns/formatDistanceStrict'

export default class Task extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: formatDistanceToNowStrict(props.task.date),
      min: props.task.min,
      sec: props.task.sec,
      isCounting: props.task.isCounting,
    }
    this.counterID = 1
    this.onChangeStartTimer = props.onChangeStartTimer
  }

  componentDidMount() {
    this.timer()
    const {
      task: { sec, min },
    } = this.props
    const {
      task: { dateStart, isCounting },
    } = this.props

    if (isCounting) {
      const different = dateStart
        ? parseInt(
            formatDistanceStrict(new Date(), dateStart, {
              unit: 'second',
            }),
            10
          )
        : 0
      const allSec = min * 60 + Number(sec) - different
      const newSec = allSec % 60
      allSec > 0
        ? this.setState({ min: Math.trunc(allSec / 60), sec: newSec > 10 ? newSec : `0${newSec - 1}` })
        : this.timerCountDownPause()
      this.timerCountDownStart()
    }
  }

  componentWillUnmount() {
    clearInterval(this.counterID)
  }

  timerCountDownStart = () => {
    this.timer()
    const { min, sec } = this.state
    const {
      task: { dateStart, id },
    } = this.props

    if (!min && !sec) return
    this.setState({ isCounting: true })

    this.onChangeStartTimer(id, min, sec, true, dateStart)

    this.counterID = setInterval(() => {
      this.changeSec()
    }, 1000)
  }

  timerCountDownPause = () => {
    this.timer()
    const { min, sec } = this.state
    const {
      task: { id },
    } = this.props
    this.setState({ isCounting: false })
    this.onChangeStartTimer(id, min, sec, false)
    clearInterval(this.counterID)
  }

  changeSec = () => {
    const { sec: second } = this.state
    if (second > 0) {
      this.setState(({ sec }) => ({ sec: sec > 10 ? sec - 1 : `0${sec - 1}` }))
    } else {
      this.changeMin()
    }
  }

  changeMin = () => {
    const { min: minute } = this.state
    minute > 0 ? this.setState(({ min }) => ({ min: min - 1, sec: 59 })) : this.timerCountDownPause()
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
      1000
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
