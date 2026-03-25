import React, { useState, useMemo } from 'react';
import './App.css';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import ProductCard from './components/ProductCard';
import { products } from './data/products';

function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [cartItems, setCartItems] = useState([]);

  // Filter products based on active category
  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') {
      return products;
    }
    return products.filter(product => product.category === activeCategory);
  }, [activeCategory]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleReset = () => {
    setActiveCategory('all');
  };

  // Calculate total cart items (for demonstration)
  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Simple add to cart handler (demo purpose)
  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  return (
    <div className="app">
      <div className="container">
        <Header cartCount={totalCartItems} />
        
        <FilterBar 
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          onReset={handleReset}
          resultCount={filteredProducts.length}
        />

        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))
          ) : (
            <div className="empty-state">
              <i className="fas fa-box-open"></i>
              <h3>No products found</h3>
              <p>Try changing your filter selection</p>
              <button onClick={handleReset} className="reset-empty-btn">
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {totalCartItems > 0 && (
          <div className="cart-toast">
            <i className="fas fa-check-circle"></i>
            <span>{totalCartItems} item{totalCartItems !== 1 ? 's' : ''} in cart</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;