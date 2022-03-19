import React, { createContext, useContext } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = React.useState([]);
  const addToCart = (product) => {
    if (cart.length === 0 || cart.some((p) => p._id !== product._id)) {
      setCart([...cart, product]);
    }
    if (cart.some((p) => p._id === product._id)) {
      const existed = cart.find((p) => p._id == product._id);
      existed.quantity = Number(existed.quantity) + Number(product.quantity);
      const updatedCart = cart.filter((p) => p._id !== existed._id);
      setCart([...updatedCart, existed]);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  return useContext(CartContext);
}
