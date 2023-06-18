import React, { useState } from 'react';
import { SearchWrapper, StyledField } from './Serachbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(value);
    setValue('');
  };

  return (
    <SearchWrapper>
      <form onSubmit={handleSubmit}>
        <div className="input_wrapper">
          <StyledField
            type="text"
            name="search"
            onChange={handleChange}
            required
            autoFocus
            value={value}
          />
          <button className="input_button" type="submit">
            Search
          </button>
        </div>
      </form>
    </SearchWrapper>
  );
};
