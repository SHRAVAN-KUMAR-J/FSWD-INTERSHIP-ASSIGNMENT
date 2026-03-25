import React from 'react';
import './FilterBar.css';

const FilterBar = ({ activeCategory, onCategoryChange, onReset, resultCount }) => {
  const categories = [
    { id: 'all', name: 'All Products', icon: 'fa-grid-2' },
    { id: 'electronics', name: 'Electronics', icon: 'fa-microchip' },
    { id: 'clothing', name: 'Clothing', icon: 'fa-shirt' },
    { id: 'home', name: 'Home & Living', icon: 'fa-house' },
    { id: 'accessories', name: 'Accessories', icon: 'fa-watch' }
  ];

  return (
    <div className="filter-bar">
      <div className="filter-header">
        <div className="filter-title">
          <i className="fas fa-sliders-h"></i>
          <span>Filters</span>
        </div>
        <button className="reset-btn" onClick={onReset}>
          <i className="fas fa-undo-alt"></i>
          Reset All
        </button>
      </div>
      
      <div className="categories-section">
        <h4 className="section-label">Categories</h4>
        <div className="category-chips">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-chip ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => onCategoryChange(category.id)}
            >
              <i className={`fas ${category.icon}`}></i>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="results-info">
        <i className="fas fa-box-open"></i>
        <span>{resultCount} product{resultCount !== 1 ? 's' : ''} found</span>
      </div>
    </div>
  );
};

export default FilterBar;