import PropTypes from 'prop-types'

import NewTaskForm from '../new-task-form/new-task-form'

import './app-header.css'

function AppHeader(props) {
  const { addItem } = props
  return (
    <header className="header">
      <h1 className="header__tittle">todos</h1>
      <NewTaskForm addItem={addItem} />
    </header>
  )
}

AppHeader.defaultProps = {
  addItem: () => {},
}
AppHeader.propTypes = {
  addItem: PropTypes.func,
}
export default AppHeader
