import React from 'react'

const SearchButton = ({handleSearch}) => {
  return (
    <button type='submit' onClick={handleSearch}>Search</button>
  )
}

export default SearchButton