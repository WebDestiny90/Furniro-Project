import { useState } from "react";
import "./MobileMenu.css"
import { Link } from "react-router-dom"
import { useAuth } from "../../AuthContext/AuthContext";
import { useProducts } from "../../context/ProductsContext";
import UserAvatar from "../Header/UserAvatar";

const MobileMenu = () => {
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { products, loading } = useProducts();
  const { isAuth, currentUser } = useAuth();

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

  return (
    <div className="mobileMenu">
      <div className="container">
        <div className="menuItems">
          <div className="mobileMenuBurger" onClick={() => toggleBurgerMenu()}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className={`mobileMenuContainer ${burgerMenuOpen ? "add" : ''}`}>
          <img className="mobileMenuLogoItem" src="/assets/img/icons/furnirologo.png" alt="Furniro Site Logo" />
          <div className="mobileMenuNavContainer">
            <nav className="mobileMenuNav">
              <ul className="mobileMenuBurgerLinkList" onClick={() => setBurgerMenuOpen(false)}>
                <li className="mobileMenuBurgerListItems"><Link className="mobileMenuBurgerLink" to="/" >Home</Link></li>
                <li className="mobileMenuBurgerListItems"><Link className="mobileMenuBurgerLink" to="/Shop" >Shop</Link></li>
                <li className="mobileMenuBurgerListItems"><Link className="mobileMenuBurgerLink" to="/404" >Blog</Link></li>
                <li className="mobileMenuBurgerListItems"><Link className="mobileMenuBurgerLink" to="/ContactPage" >Contact</Link></li>
              </ul>
              <button className="close" onClick={() => setBurgerMenuOpen(false)} >&#10006;</button>
            </nav>
            <nav className="mobileMenuBurgerIconsNav">
              <ul className="mobileMenuBurgerIconList">
                <li className="mobileMenuBurgerIconListItems" onClick={() => setBurgerMenuOpen(false)}>
                  <Link className="mobileMenuBurgerIconLink" to="/Account">
                    <UserAvatar isAuth={isAuth} photoURL={currentUser?.photoURL} />
                  </Link>
                </li>
                <li className="mobileMenuBurgerIconListItems">
                  <button
                    className="mobileMenuBurgerIconLink"
                    onClick={toggleSearchModal}
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <img className="mobileMenuIconItems" src="/assets/img/icons/search.svg" alt="Search icon" />
                  </button>
                </li>
                <li className="mobileMenuBurgerIconListItems" onClick={() => setBurgerMenuOpen(false)}>
                  <Link className="mobileMenuBurgerIconLink" to="/WishList">
                    <img className="mobileMenuIconItems" src="/assets/img/icons/like.svg" alt="Like icon" />
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div onClick={() => setBurgerMenuOpen(false)} className={burgerMenuOpen ? "overlay" : "hidden"}></div>
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
                    className="search-result-item"
                    onClick={() => {
                      toggleSearchModal();
                      setBurgerMenuOpen(false);
                    }}
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
    </div>
  )
}

export default MobileMenu
