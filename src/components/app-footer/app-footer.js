import React from 'react'
import './app-footer.css'

export default class AppFooter extends React.Component {
  constructor(props) {
    super(props)
    this.buttons = [
      { name: 'all', label: 'All' },
      { name: 'active', label: 'Active' },
      { name: 'completed', label: 'Completed' },
    ]
  }

  render() {
    const { doneCount, filter, onFilterChange, allDeleted } = this.props
    const buttonsGroup = this.buttons.map(({ name, label }) => {
      const active = filter === name
      const btnClass = active ? ' buttons-filter__btn--active' : ''
      return (
        <button
          className={`buttons-filter__btn${btnClass}`}
          onClick={() => onFilterChange(name)}
          key={name}
          type="submit"
        >
          {label}
        </button>
      )
    })
    return (
      <footer className="footer-app">
        <span className="footer-app__left-task">{`${doneCount} items left`}</span>
        <div className="buttons-filter">{buttonsGroup}</div>
        <button type="button" className="btn-clear" onClick={allDeleted}>
          Clear completed
        </button>
      </footer>
    )
  }
}
