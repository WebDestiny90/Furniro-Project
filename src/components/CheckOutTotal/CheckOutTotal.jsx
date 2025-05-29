import "./CheckOutTotal.css";
import { useCart } from "../../context/CartContext";

const CheckOutTotal = () => {
  const { cartItems } = useCart();

  const total = cartItems.reduce((sum, item) => {
    if (!item?.product?.price) return sum;
    return sum + Number(String(item.product.price).replace(/[^0-9.-]+/g, "")) * item.quantity;
  }, 0);

  return (
    <div className="CheckOutTotalRightSide">
      <div className="container">
        <div className="CheckOutTotalProductInfoBox CheckOutFlex">
          <div className="CheckOutTotalProductTitles">
            <h2 className="CheckOutTotalProductTitle">Product</h2>
            <div className="CheckOutTotalProductNamesBox">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div key={`${item.product.category}-${item.product.id}-${item.selectedColor}`} className="CheckOutTotalProductNames CheckOutFlex">
                    <p className="CheckOutTotalProductNameItem CheckOutTotalFont">{item.product.name}</p>
                    <p className="CheckOutTotalProductQuantity">x{item.quantity}</p>
                  </div>
                ))
              ) : (
                <p className="CheckOutTotalProductNameItem CheckOutTotalFont">No products in cart</p>
              )}
            </div>
          </div>
          <div className="CheckOutTotalProductPriceBox CheckOutFlex">
            <p className="CheckOutTotalSubTotal">Subtotal</p>
            <p className="CheckOutTotalProductPrice">${total.toFixed(2)}</p>
            <p className="CheckOutTotalProductTotal">${total.toFixed(2)}</p>
          </div>
        </div>
        <label className="CheckOutTotalBankLabel CheckOutFlex">
          <input className="CheckOutTotalCashInput" type="radio" name="bank" />
          Direct Bank Transfer
        </label>
        <label className="CheckOutTotalBankLabel CheckOutFlex">
          <input className="CheckOutTotalCashInput" type="radio" name="bank" />
          Cash On Delivery
        </label>
        <p className="CheckOutTotalCashDescription">
          Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
        </p>
        <button className="CheckOutTotalCheckOutButton">Place Order</button>
      </div>
    </div>
  );
};

export default CheckOutTotal;