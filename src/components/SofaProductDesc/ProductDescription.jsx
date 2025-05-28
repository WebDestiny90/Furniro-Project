import { useState } from "react";
import "./ProductDescription.css";

const ProductDescription = ({ product }) => {
  const [activeTab, setActiveTab] = useState("description");

  if (!product) return null;

  const renderContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div>
            {product.description?.text && (
              <p className="descriptionFirstText">
                {product.description.text}
              </p>
            )}
            {Array.isArray(product.description?.img) && product.description.img.length > 0 && (
              <div className="descriptionImages">
                {product.description.img.map((img, index) => (
                  <img
                    key={index}
                    className="descriptionImageItem"
                    src={img}
                    alt="description"
                  />
                ))}
              </div>
            )}
          </div>
        );
      case "additional":
        return (
          <ul className="additionlaList">
            <li className="descriptionSecondText">{product.additional?.text || "No additional information available."}</li>
            <li className="descriptionSecondText">{product.additional?.text2 || "No additional information available."}</li>
            <li className="descriptionSecondText">{product.additional?.text3 || "No additional information available."}</li>
            <li className="descriptionSecondText">{product.additional?.text4 || "No additional information available."}</li>
            <li className="descriptionSecondText">{product.additional?.text5 || "No additional information available."}</li>
          </ul>
        );
      case "reviews":
        return (
          <p className="descriptionThirdText">
            {product.reviews?.text || "No reviews available."}
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <section className="descriptionContainer">
      <div className="container">
        <div className="descriptionTitleBox">
          <button
            type="button"
            className={`descriptionFirstTitle${activeTab === "description" ? " active" : ""}`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            type="button"
            className={`descriptionFirstTitle${activeTab === "additional" ? " active" : ""}`}
            onClick={() => setActiveTab("additional")}
          >
            Additional Information
          </button>
          <button
            type="button"
            className={`descriptionFirstTitle${activeTab === "reviews" ? " active" : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews {product.reviews?.count ? `[${product.reviews.count}]` : "[0]"}
          </button>
        </div>
        <div className="descriptionTextBox">
          <div key={activeTab} className="tabContentFade">
            {renderContent()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDescription;