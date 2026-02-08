import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (program) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item._id === program._id);
      if (exists) return prev;
      return [...prev, program];
    });
  };

  const removeFromCart = (programId) => {
    setCartItems((prev) =>
      prev.filter((item) => item._id !== programId)
    );
  };

  const clearCart = () => setCartItems([]);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + (item.price || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
