import { createContext, useContext, useState, useEffect } from 'react';

const WishListContext = createContext();

export const useWishList = () => {
  return useContext(WishListContext);
};

export const WishListProvider = ({ children }) => {
  const [wishListItems, setWishListItems] = useState(() => {
    const savedItems = localStorage.getItem('wishListItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('wishListItems', JSON.stringify(wishListItems));
  }, [wishListItems]);

  const addToWishList = (product) => {
    setWishListItems(prev => {
      if (!prev.find(item => item.id === product.id && item.category === product.category)) {
        return [...prev, product];
      }
      return prev;
    });
  };

  const removeFromWishList = (productId, category) => {
    setWishListItems(prev => prev.filter(item => !(item.id === productId && item.category === category)));
  };

  const isInWishList = (productId, category) => {
    return wishListItems.some(item => item.id === productId && item.category === category);
  };

  return (
    <WishListContext.Provider value={{
      wishListItems,
      addToWishList,
      removeFromWishList,
      isInWishList
    }}>
      {children}
    </WishListContext.Provider>
  );
}; 