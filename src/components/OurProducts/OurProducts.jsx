import "./OurProducts.css"
import { Link } from "react-router-dom"
import { CategoryLinks } from "../../constants/constants";

const OurProducts = ({ title = true, more = true }) => {
  return (
    <section className="products">
      <div className="container">
        <div className="productsItems">
          {title && (<h2 className="productsTitle colorGray">Our Products</h2>)}
          <div className="mainGrid">
            {CategoryLinks.map(({ id, to, imageSrc, alt, title }) => (
              <div key={id} className="gridItems">
                <Link className="productLinkItem" to={to}>
                  <img className="gridImage shadow" src={imageSrc} alt={alt} width={285} height={301} />
                </Link>
                <div className="gridInfo shadow">
                  <h3 className="gridTitle">{title}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination">
            <button className="activePage">1</button>
            <button className="activePage">2</button>
            <button className="activePage">3</button>
          </div>
          {more && (<div className="showMoreLink Ourflex">
            <Link className="productShow font" to="/shop">Show More</Link>
          </div>)}
        </div>
      </div>
    </section>
  )
}

export default OurProducts;