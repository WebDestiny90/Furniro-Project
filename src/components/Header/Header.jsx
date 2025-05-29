import { Link } from "react-router-dom"
import "./Header.css"
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../AuthContext/AuthContext";
import { auth } from "../../firebase";
import UserAvatar from "./UserAvatar";
import { useProducts } from "../../context/ProductsContext";
import MobileMenu from "../MobileMenu/MobileMenu";

const Header = () => {
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { products, loading } = useProducts();

  const toggleBurgerMenu = () => {
    setBurgerMenuOpen(!burgerMenuOpen);
  };

  const toggleSearchModal = () => {
    setSearchModalOpen(!searchModalOpen);
    if (!searchModalOpen) {
      setSearchQuery("");
    }
  };

  const filteredProducts = products?.filter(product => {
    const searchLower = searchQuery.toLowerCase();
    const nameMatch = typeof product.name === 'string' &&
      product.name.toLowerCase().includes(searchLower);
    const descMatch = typeof product.description === 'string' &&
      product.description.toLowerCase().includes(searchLower);
    const categoryMatch = typeof product.category === 'string' &&
      product.category.toLowerCase().includes(searchLower);
    return nameMatch || descMatch || categoryMatch;
  }) || [];

  const { cartItems, removeFromCart } = useCart();
  const { isAuth, currentUser } = useAuth();
  const user = auth.currentUser;
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header">
      <div className="container">
        <div className="header-items flex">
          <MobileMenu />
          <div className="headerLogo">
            <Link className="logoLink flex" to="/">
              <img className="headerLogoImg" src="/assets/img/icons/siteLogo.svg" alt="Site Logo" />
              Furniro
            </Link>
          </div>
          <nav className="nav">
            <ul className="navList flex">
              <li className="listItems"><Link className="listItemsLink" to="/">Home</Link></li>
              <li className="listItems"><Link className="listItemsLink" to="/Shop">Shop</Link></li>
              <li className="listItems"><Link className="listItemsLink" to="/404">About</Link></li>
              <li className="listItems"><Link className="listItemsLink" to="/ContactPage">Contact</Link></li>
            </ul>
          </nav>
          <nav className="iconsNav">
            <ul className="iconsNavList flex">
              <li className="listIconItems">
                <Link className="listIconsItemsLink" to="/Account">
                  <UserAvatar isAuth={isAuth} photoURL={currentUser?.photoURL} />
                </Link>
              </li>
              <li className="listIconItems">
                <button
                  className="listIconsItemsLink"
                  onClick={toggleSearchModal}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <img className="iconsImg" src="/assets/img/icons/search.svg" alt="Search icon" />
                </button>
              </li>
              <li className="listIconItems"><Link className="listIconsItemsLink" to="/WishList"><img className="iconsImg" src="/assets/img/icons/likeicon.svg" alt="Like icon" /></Link></li>
              <li className="listCartIconItems" style={{ position: "relative" }}>
                <Link className="listIconsItemsLink" to="#">
                  <img
                    className="iconsImg"
                    onClick={() => toggleBurgerMenu()}
                    src="/assets/img/icons/cart.svg"
                    alt="Cart icon"
                  />
                  {totalCount > 0 && (
                    <span className="cart-count-badge">{totalCount}</span>
                  )}
                </Link>
              </li>
            </ul>
          </nav>
          <div className={`cartMenu${burgerMenuOpen ? ' add' : ''}`}>
            <h2 className="cartTitle colorBlack">Shopping Cart</h2>
            <button className="close" onClick={() => setBurgerMenuOpen(false)}>
              <img className="listIcons" src="/assets/img/icons/cartClose.svg" alt="" width={16} height={19} />
            </button>
            <div className="cartItems">
              {cartItems.length === 0 ? (
                <p>Cart is empty</p>
              ) : (
                cartItems.map((item) => (
                  <div key={`${item.product.category}-${item.product.id}-${item.selectedColor}`} className="cartDesc flex">
                    <img className="productImage" src={item.product.colors[item.selectedColor].main} alt={item.product.alt} />
                    <div className="productDescription">
                      <p className="productName colorBlack">{item.product.name}</p>
                      <div className="productPrice flex">
                        <p className="productQuantity colorBlack">{item.quantity}</p>
                        <span className="productSpan colorBlack">X</span>
                        <p className="productPriceItem">{item.product.price}</p>
                      </div>
                    </div>
                    <button className="productDelete" onClick={() => removeFromCart(item.product.id, item.selectedColor, item.product.category)}>X</button>
                  </div>
                ))
              )}
            </div>
            <div className="cartMenuTotal">
              <div className="subTotalItems flex">
                <p className="cartSubtotal colorBlack">Subtotal</p>
                <p className="cartSubPrice">
                  ${cartItems.reduce(
                    (total, item) =>
                      total +
                      Number(String(item.product.price).replace(/[^0-9.-]+/g, "")) * item.quantity,
                    0
                  ).toFixed(2)}
                </p>
              </div>
              <div className="cartLinks flex">
                <Link className="goCArtPageLink colorBlack linkFonts border" onClick={() => setBurgerMenuOpen(false)} to="/CartPage" >Cart</Link>
                <Link className="checkoutLink colorBlack linkFonts border" onClick={() => setBurgerMenuOpen(false)} to="/CheckOut" >Checkout</Link>
                <Link className="comparisonLink colorBlack linkFonts border" onClick={() => setBurgerMenuOpen(false)} to="/404" >Comparison</Link>
              </div>
            </div>
          </div>
          <div onClick={() => setBurgerMenuOpen(false)} className={burgerMenuOpen ? "overlay" : "hidden"}></div>
        </div>
      </div>
      {searchModalOpen && (
        <div className="search-modal">
          <div className="search-modal-content">
            <input
              type="text"
              placeholder="Search products..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="close-search" onClick={toggleSearchModal}>×</button>
            <div className="search-results">
              {loading ? (
                <p>Loading...</p>
              ) : searchQuery.trim() === '' ? (
                <p>Start typing to search products</p>
              ) : filteredProducts.length === 0 ? (
                <p>No products found</p>
              ) : (
                filteredProducts.map((product) => (
                  <Link
                    key={`${product.category}-${product.id}`}
                    to={`/${product.category}Product/${product.id}`}
                    className="search-result-item flex"
                    onClick={toggleSearchModal}
                  >
                    <img
                      src={product.mainimg}
                      alt={product.alt || product.name}
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    />
                    <div>
                      <h3>{product.name}</h3>
                      <p className="product-category">{product.category}</p>
                      <p>{product.price}</p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header