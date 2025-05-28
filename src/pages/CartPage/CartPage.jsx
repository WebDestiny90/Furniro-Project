import "./CartPage.css";
import { Link } from "react-router-dom";
import Features from "../../components/Features/Features";
import CategotyHeader from "../../components/CategoryHeader/CategoryHeader";
import { useCart } from "../../context/CartContext"; // Импортируй свой контекст

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();

  // Подсчёт итоговой суммы
  const total = cartItems.reduce((sum, item) => {
    if (!item?.product?.price) return sum;
    return sum + Number(String(item.product.price).replace(/[^0-9.-]+/g, "")) * item.quantity;
  }, 0);

  return (
    <main className="cartPageMainItems">
      <CategotyHeader title="Cart" text="Cart" image={false} logo={true} />
      <div className="cartProducts">
        <div className="container">
          <div className="cartPageMain">
            <div className="cartPageProductsContainer">
              <div className="cartPageProductsDescrip cartPageFonts">
                <p className="cartPageProductName cartPageFonts">Product</p>
                <p className="cartPageProductPrice cartPageFonts">Price</p>
                <p className="cartPageProductQuantity cartPageFonts">Quantity</p>
                <p className="cartPageProductSubtotal cartPageFonts">Subtotal</p>
              </div>
              {cartItems.length === 0 ? (
                <div className="cartPageProductInfo">
                  <p className="cartPageProductNameInfo">Cart is empty</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={`${item.product.category}-${item.product.id}-${item.selectedColor}`} className="cartPageProductInfo">
                    <img
                      className="cartPageProductImage"
                      src={item.product.colors[item.selectedColor].main}
                      alt={item.product.alt}
                    />
                    <p className="cartPageProductNameInfo">{item.product.name}</p>
                    <p className="cartPageProducPriceInfo">{item.product.price}</p>
                    <p className="cartPageProductQuantityInfo">{item.quantity}</p>
                    <p className="cartPageProductSubtotalInfo">
                      ${Number(String(item.product.price).replace(/[^0-9.-]+/g, "")) * item.quantity}
                    </p>
                    <button
                      className="cartItemRemove"
                      onClick={() => removeFromCart(item.product.id, item.selectedColor, item.product.category)}
                    >
                      <img src="/assets/img/icons/deleteIcon.svg" alt="" />
                    </button>
                  </div>
                ))
              )}
            </div>
            <div className="cartPageCartTotal">
              <h2 className="cartPageTotalTitle">Cart Totals</h2>
              <div className="cartPageTotalsTexts">
                <p className="cartPageTotalsInfo">Subtotal</p>
                <p className="cartPageTotalsPrice">${total.toFixed(2)}</p>
              </div>
              <div className="cartPageTotalsTexts">
                <p className="cartPageSubtotalsInfo">Total</p>
                <p className="cartPageSubtotalsPrice">${total.toFixed(2)}</p>
              </div>
              <Link to="/CheckOut" className="cartPageCartButton">Check out</Link>
            </div>
          </div>
        </div>
        <Features />
      </div>
    </main>
  );
};

export default CartPage;