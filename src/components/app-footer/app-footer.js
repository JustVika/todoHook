import PropTypes from 'prop-types'

import FilterButton from '../filter-button/filter-button'
import './app-footer.css'

export default function AppFooter(props) {
  const { doneCount, onFilterChange, allDeleted, filter } = props

  return (
    <footer className="footer-app">
      <span className="footer-app__left-task">{`${doneCount} items left`}</span>

      <FilterButton filterChange={onFilterChange} filter={filter} />

      <button type="button" className="btn-clear" onClick={allDeleted}>
        Clear completed
      </button>
    </footer>
  )
}

AppFooter.defaultProps = {
  doneCount: 0,
  onFilterChange: () => {},
  allDeleted: () => {},
}
AppFooter.propTypes = {
  doneCount: PropTypes.number,
  onFilterChange: PropTypes.func,
  allDeleted: PropTypes.func,
}
