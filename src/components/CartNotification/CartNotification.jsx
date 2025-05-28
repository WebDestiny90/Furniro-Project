import { useEffect } from "react";
import "./CartNotification.css";

const CartNotification = ({ show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <div className={`cart-notification${show ? " show" : ""}`}>
      Product added to cart
    </div>
  );
};

export default CartNotification;