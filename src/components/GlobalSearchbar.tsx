import React, { useState } from 'react';
import { BsSearch } from "react-icons/bs";

interface GlobalSearchbarProps {
  onSearch?: (searchTerm: string) => void;
  placeholder?: string;
}

const GlobalSearchbar: React.FC<GlobalSearchbarProps> = ({
  onSearch,
  placeholder = 'Search...'
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="global-search-form">
      <div className="search-container">
        <button type="submit" className="search-button">
        <BsSearch/>
        </button>
        <input
          type="search"
          value={searchTerm}
          onChange={handleChange}
          placeholder={placeholder}
          className="form-control search-input"
        />
      </div>
    </form>
  );
};

export default GlobalSearchbar;
