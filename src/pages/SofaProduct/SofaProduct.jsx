import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../AuthContext/AuthContext";
import { useWishList } from "../../context/WishListContext";
import CartNotification from "../../components/CartNotification/CartNotification";
import WishListNotification from "../../components/WishListNotification/WishListNotification";
import ProductDescription from "../../components/SofaProductDesc/ProductDescription";
import { supabase } from "../../supabase";
import "./SofaProduct.css"

const SofaProduct = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { isAuth } = useAuth();
  const { addToWishList, removeFromWishList, isInWishList } = useWishList();
  const [sofa, setSofa] = useState(null);
  const [currentColor, setCurrentColor] = useState("firstColor");
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNotif, setShowNotif] = useState(false);
  const [showWishListNotif, setShowWishListNotif] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const fetchSofa = async () => {
      try {
        const { data, error } = await supabase
          .from('sofas')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setSofa(data);
        setMainImage(data.colors?.firstColor?.main || data.mainimg);
      } catch (err) {
        console.error('Ошибка при загрузке данных:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSofa();
  }, [id]);

  const handleColorChange = (color) => {
    setCurrentColor(color);
    setMainImage(sofa.colors[color].main);
  };

  const handleImageClick = (imageSrc) => {
    setMainImage(imageSrc);
  };

  const handleAddToCart = () => {
    if (!isAuth) {
      alert("Please log in to add products to cart!");
      return;
    }
    addToCart({ ...sofa, category: 'sofa' }, currentColor, 1);
    setShowNotif(true);
  };

  const handleWishListClick = () => {
    if (!isAuth) {
      alert("Please log in to add products to wishlist!");
      return;
    }
    if (isInWishList(sofa.id, 'sofa')) {
      removeFromWishList(sofa.id, 'sofa');
    } else {
      addToWishList({ ...sofa, category: 'sofa' });
      setShowWishListNotif(true);
      setTimeout(() => setShowWishListNotif(false), 2000);
    }
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    if (imgRef.current) {
      imgRef.current.style.transformOrigin = `${x}% ${y}%`;
    }
  };

  const handleMouseLeave = () => {
    if (imgRef.current) {
      imgRef.current.style.transformOrigin = "center center";
    }
  };

  if (loading || !sofa) return (
    <div className="loaderContainer">
      <div className="loader"></div>
      <div className="loaderText">Loading...</div>
    </div>
  );

  return (
    <>
      <main className="sofaProduct">
        <div className="container">
          <div className="singleImageBox">
            <div className="singleImageBoxItemsContainer">
              <div className="singleImageBoxItems">
                {sofa.colors[currentColor].previews.map((preview, index) => (
                  <img
                    key={preview}
                    className="singleImage"
                    src={preview}
                    width={76}
                    height={80}
                    alt={sofa.alt}
                    onClick={() => handleImageClick(sofa.colors[currentColor].mains[index])}
                    style={{ cursor: "pointer" }}
                  />
                ))}
              </div>
              <div className="singleMainImage">
                <div className="zoom-image-wrapper">
                  <img
                    ref={imgRef}
                    className="singleMainImageItem"
                    src={mainImage}
                    width={423}
                    height={500}
                    alt={sofa.alt}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  />
                </div>
              </div>
            </div>
            <div className="singleDescription">
              <h1 className="descriptionTitle">{sofa.name}</h1>
              <p className="descriptionPrice">{sofa.price}</p>
              <div className="raitingBox">
                <img className="descriptionImage" src="/assets/img/icons/raiting.svg" width={124} height={20} alt="Star Icon" />
                <p className="raitinText">5 Customer Review</p>
              </div>
              <p className="descriptionText">{sofa.descriptionText}</p>
              <div className="descriptionColorBox">
                <p className="descriptionColorText">Color</p>
                {Object.entries(sofa.colors).map(([colorName, colorData]) => (
                  <button
                    key={colorName}
                    className="colorButton"
                    style={{ backgroundColor: colorData.cssColor, border: currentColor === colorName ? "2px solid #b88e2f" : "none" }}
                    onClick={() => handleColorChange(colorName)}
                  ></button>
                ))}
                <div className="cartButton">
                  <button
                    className="cartButtonItem"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                  <svg
                    className={`wishList_Icon ${isInWishList(sofa.id, 'sofa') ? 'active' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handleWishListClick}
                  >
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <ProductDescription product={sofa} />
      <CartNotification show={showNotif} onClose={() => setShowNotif(false)} />
      <WishListNotification show={showWishListNotif} onClose={() => setShowWishListNotif(false)} />
    </>
  );
};

export default SofaProduct;