import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { name, price, category, rating, inStock, icon, description } = product;

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star"></i>);
    }
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }
    return stars;
  };

  return (
    <div className="product-card">
      <div className="card-image">
        <i className={`fas ${icon} product-icon`}></i>
        {!inStock && <div className="out-of-stock-badge">Out of Stock</div>}
      </div>
      <div className="card-content">
        <div className="category-badge">{category}</div>
        <h3 className="product-title">{name}</h3>
        <p className="product-description">{description}</p>
        <div className="rating-section">
          <div className="stars">{renderStars(rating)}</div>
          <span className="rating-value">{rating}</span>
        </div>
        <div className="price-section">
          <span className="price">${price.toFixed(2)}</span>
          <button 
            className={`add-to-cart-btn ${!inStock ? 'disabled' : ''}`}
            disabled={!inStock}
          >
            <i className="fas fa-shopping-cart"></i>
            {inStock ? 'Add to Cart' : 'Unavailable'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;