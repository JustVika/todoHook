import PropTypes from 'prop-types'
import './filter-button.css'

export default function FilterButton(props) {
  const { filter, filterChange } = props

  const buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ]

  const buttonsGroup = buttons.map((button) => {
    const { name, label } = button
    const active = filter === name
    return (
      <div className="filter" key={name}>
        <input
          id={name}
          name="filter-input"
          className="filter__input"
          type="radio"
          checked={active}
          onChange={() => filterChange(name)}
        />
        <label htmlFor={name} className="filter__label">
          {label}
        </label>
      </div>
    )
  })
  return <div className="filter__group"> {buttonsGroup}</div>
}
FilterButton.defaultProps = {
  filterChange: () => {},
  filter: '',
}
FilterButton.propTypes = {
  filterChange: PropTypes.func,
  filter: PropTypes.string,
}
