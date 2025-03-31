import React from 'react';
import SearchTextBoxCss from './SearchTextBox.module.css';

const SearchTextBox = () => {

  return (
    <input type='text' className={`${SearchTextBoxCss.tb}`} id="movieSearchTB" />
  )
}

export default SearchTextBox;