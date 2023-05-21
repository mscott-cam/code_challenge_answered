const { Fragment, useState, memo, useCallback } = React;


// Implement a feature to allow item selection with the following requirements:
// 1. Clicking an item selects/unselects it.
// 2. Multiple items can be selected at a time.
// 3. Make sure to avoid unnecessary re-renders of each list item in the big list (performance).
// 4. Currently selected items should be visually highlighted.
// 5. Currently selected items' names should be shown at the top of the page.
//
// Feel free to change the component structure at will.

const List = ({ items }) => {
	const [selectedNames, setSelectedNames] = useState([]);
  
    const setName = useCallback((name) => {
      setSelectedNames(currentNames => {
        const nameAlreadySelected = currentNames.includes(name);
        if (nameAlreadySelected) {
          return currentNames.filter(
            currName => currName !== name
          )
        }
        return currentNames.concat(name)
      })
  }, [setSelectedNames]);
  
  return (
    <Fragment>
      <p className="List__names">
        {selectedNames.map((name, index) => (
          <span key={name}>
            {name}
            {selectedNames.length === (index + 1) ? '': ', '}
          </span>
        ))}
      </p>
      <ul className="List">
        {items.map((item) => (
          <ListItem
            key={item.name}
            item={item}
            setName={setName}
          />
        ))}
      </ul>
    </Fragment>
  )
};

const ListItem = memo(({ item: { name, color }, setName }) => {
	const [isSelected, setIsSelected] = useState(false)
  
  const toggleSelected = () => {
    setIsSelected(currState => !currState)
    setName(name)
  }

	return (
  	<li
      className={`
      	List__item
        List__item--${color}
        ${isSelected ? ' Selected' : ''}
			`}
      onClick={toggleSelected}
    >
      {name}
    </li>
  )
})

// ---------------------------------------
// Do NOT change anything below this line.
// ---------------------------------------

const sizes = ['tiny', 'small', 'medium', 'large', 'huge'];
const colors = ['navy', 'blue', 'aqua', 'teal', 'olive', 'green', 'lime', 'yellow', 'orange', 'red', 'maroon', 'fuchsia', 'purple', 'silver', 'gray', 'black'];
const fruits = ['apple', 'banana', 'watermelon', 'orange', 'peach', 'tangerine', 'pear', 'kiwi', 'mango', 'pineapple'];

const items = sizes.reduce(
  (items, size) => [
    ...items,
    ...fruits.reduce(
      (acc, fruit) => [
        ...acc,
        ...colors.reduce(
          (acc, color) => [
            ...acc,
            {
              name: `${size} ${color} ${fruit}`,
              color,
            },
          ],
          [],
        ),
      ],
      [],
    ),
  ],
  [],
);

ReactDOM.render(
  <List items={items}/>,
  document.getElementById('root')
);
