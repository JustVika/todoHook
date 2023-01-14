import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'
import './task.css'
import formatDistanceStrict from 'date-fns/formatDistanceStrict'

function Task(props) {
  const counterID = useRef()
  const { onChangeStartTimer } = props

  const {
    task: { min: minute, sec: seconds, isCounting: isCount, date: dateToNow },
  } = props

  const [date, setDate] = useState(formatDistanceToNowStrict(dateToNow))
  const [min, setMin] = useState(minute)
  const [sec, setSec] = useState(seconds)
  const [isCounting, setCount] = useState(isCount)

  const timer = () => {
    setTimeout(() => setDate(formatDistanceToNowStrict(dateToNow)), 1000)
  }

  const timerCountDownPause = () => {
    timer()
    const {
      task: { id },
    } = props

    setCount(false)

    onChangeStartTimer(id, min, sec, false)
    clearInterval(counterID.current)
  }

  const changeMin = () => {
    if (min > 0) {
      setMin((m) => m - 1)
      setSec(59)
    } else {
      timerCountDownPause()
    }
  }
  const changeSec = () => {
    if (sec > 0) {
      setSec((s) => {
        return s > 10 ? s - 1 : `0${s - 1}`
      })
    } else {
      changeMin()
    }
  }
  const timerInterval = () => {
    counterID.current = setInterval(() => {
      changeSec()
    }, 1000)
  }
  const timerCountDownStart = () => {
    const {
      task: { dateStart, id },
    } = props

    if (!min && !sec) return

    setCount(true)

    onChangeStartTimer(id, min, sec, true, dateStart)
    timerInterval()
  }
  useEffect(() => {
    const {
      task: { dateStart },
    } = props

    if (isCount) {
      const different = dateStart
        ? parseInt(
            formatDistanceStrict(new Date(), dateStart, {
              unit: 'second',
            }),
            10
          )
        : 0
      const allSec = minute * 60 + Number(seconds) - different
      const newSec = allSec % 60
      if (allSec > 0) {
        setMin(Math.trunc(allSec / 60))
        setSec(newSec > 10 ? newSec : `0${newSec - 1}`)
      } else {
        timerCountDownPause()
      }
      timerCountDownStart()
    }
    return () => {
      clearInterval(counterID.current)
    }
  }, [])
  const mount = useRef(true)
  useEffect(() => {
    if (mount.current) {
      mount.current = false
    } else {
      clearInterval(counterID.current)

      timerInterval()
    }
  }, [sec])

  const {
    onDeleted,
    onToggleDone,
    onEditing,
    task: { label, done, id },
  } = props

  let classNames = 'task__label'
  if (done) {
    classNames += ' task__label--done'
  }
  const timerButton = !isCounting ? (
    <button type="button" className="task__timer-start" onClick={timerCountDownStart} />
  ) : (
    <button type="button" className="task__timer-pause" onClick={timerCountDownPause} />
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
export default Task
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
