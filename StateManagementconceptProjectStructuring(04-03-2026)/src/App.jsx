/*import Counter from "./components/Counter";
import React from "react";
function App(){
   const[cartItems,setCartItems]=useState([]);
    const addToCart=(item)=>{
      setCartItems([...cartItems,item]);
    }
    return(
        <div>
            <h1>Shopping App</h1>
            <Products name="Laptop" addToCart={()=>addToCart("Laptop")}/>
            <Products name="Phone" addToCart={()=>addToCart("Phone")}/>
            <Products name="Headphones" addToCart={()=>addToCart("Headphones")}/>
            <Cart cartItems={cartItems}/>
            <Counter/>
        </div>
    )
}
export default App;
*/
import React, { useState } from "react";
import NavBar from "./components/NavBar";
import Counter from "./components/Counter";
import Products from "./components/Products";
import Cart from "./components/Cart";
import ThemeProvider from "./context/ThemeContext";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  return (
    <ThemeProvider>
      <NavBar />

      <Counter />

      <h2>Products</h2>

      <Products name="Laptop" addToCart={() => addToCart("Laptop")} />
      <Products name="Phone" addToCart={() => addToCart("Phone")} />
      <Products name="Headphones" addToCart={() => addToCart("Headphones")} />

      <Cart cartItems={cartItems} />
    </ThemeProvider>
  );
}

export default App;