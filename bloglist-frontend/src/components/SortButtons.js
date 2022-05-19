const SortButtons = ({ sortBy, setSortBy }) => {

  const handleSortButtons = ( sortButtonClicked ) => {
    if (sortButtonClicked !== sortBy) {
      setSortBy(sortButtonClicked)
    }
  }

  return (
    <div>
      <button onClick={() => handleSortButtons('default')}>Sort By Date Added</button>
      <button onClick={() => handleSortButtons('likes')}>Sort By Likes</button>
    </div>
  )
}

export default SortButtons