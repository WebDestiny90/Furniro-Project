import { useState } from "react";
import { Link } from "react-router-dom";
import CategoryHeader from "../CategoryHeader/CategoryHeader"
import { useWishList } from "../../context/WishListContext";
import { useCart } from "../../context/CartContext";
import "./WishList.css"

const WishList = () => {
  const { wishListItems, removeFromWishList } = useWishList();
  const { addToCart } = useCart();
  const [showShareNotification, setShowShareNotification] = useState(false);
  const [removingItemKey, setRemovingItemKey] = useState(null);

  const handleAddToCart = (item) => {
    addToCart({ ...item, category: item.category }, item.selectedColor || 'firstColor', 1);
  };

  const handleRemoveFromWishList = (itemId, category) => {
    const itemKey = `${category}-${itemId}`;
    setRemovingItemKey(itemKey);
    setTimeout(() => {
      removeFromWishList(itemId, category);
      setRemovingItemKey(null);
    }, 300);
  };

  const handleShareWishList = () => {
    const wishListUrl = window.location.href;
    navigator.clipboard.writeText(wishListUrl);
    setShowShareNotification(true);
    setTimeout(() => setShowShareNotification(false), 2000);
  };

  return (
    <main className="wishListMain">
      <CategoryHeader title="Wishlist" text="Wishlist" image={false} logo={true} />
      <div className="container">
        {wishListItems.length > 0 && (
          <div className="wishList_Controls">
            <button className="wishList_Share" onClick={handleShareWishList}>
              Share Wishlist
            </button>
          </div>
        )}
        <div className="wishList_Items">
          {wishListItems.length === 0 ? (
            <div className="emptyWishList">
              <h3>Your wishlist is empty</h3>
              <p>Add items to your wishlist to see them here</p>
              <Link to="/shop" className="browseButton">
                Browse Products
              </Link>
            </div>
          ) : (
            wishListItems.map((item) => (
              <div
                key={`${item.category}-${item.id}`}
                className={`wishList_Item ${removingItemKey === `${item.category}-${item.id}` ? 'removing' : ''}`}
              >
                <img
                  src={item.colors?.firstColor?.main || item.mainimg}
                  alt={item.alt}
                  className="wishList_ItemImage"
                />
                <div className="wishList_ItemInfo">
                  <h3 className="wishList_ItemTitle">{item.name}</h3>
                  <p className="wishList_ItemPrice">{item.price}</p>
                  {item.selectedColor && (
                    <div className="wishList_ItemColor">
                      <span>Color:</span>
                      <div
                        className="wishList_ColorDot"
                        style={{ backgroundColor: item.colors[item.selectedColor].cssColor }}
                      />
                    </div>
                  )}
                </div>
                <div className="wishList_ItemActions">
                  <button
                    className="wishList_AddToCartButton"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="wishList_RemoveButton"
                    onClick={() => handleRemoveFromWishList(item.id, item.category)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {showShareNotification && (
        <div className="share-notification">
          Wishlist link copied to clipboard!
        </div>
      )}
    </main>
  )
}

export default WishList
