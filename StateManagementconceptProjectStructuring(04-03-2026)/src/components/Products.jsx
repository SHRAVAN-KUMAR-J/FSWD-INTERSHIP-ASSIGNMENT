import React from "react";

function Products({ name, addToCart }) {
  return (
    <div>
      <h3>{name}</h3>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}

export default Products;