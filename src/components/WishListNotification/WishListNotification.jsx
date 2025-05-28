import "./WishListNotification.css";

const WishListNotification = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="wishlist-notification">
      Added to wishlist
    </div>
  );
};

export default WishListNotification; 