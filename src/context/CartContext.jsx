import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Добавить товар в корзину
  const addToCart = (product, selectedColor, quantity = 1) => {
    setCartItems((prev) => {
      // Проверяем, есть ли уже такой товар с этим цветом и категорией
      const existing = prev.find(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === selectedColor &&
          item.product.category === product.category
      );
      if (existing) {
        // Если есть, увеличиваем количество
        return prev.map((item) =>
          item.product.id === product.id &&
            item.selectedColor === selectedColor &&
            item.product.category === product.category
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      // Если нет, добавляем новый
      return [...prev, { product, selectedColor, quantity }];
    });
  };

  // Удалить товар
  const removeFromCart = (productId, selectedColor, category) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(
          item.product.id === productId &&
          item.selectedColor === selectedColor &&
          item.product.category === category
        )
      )
    );
  };

  // Очистить корзину
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};