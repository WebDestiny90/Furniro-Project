import "./CategoryHeader.css"
import { Link } from "react-router-dom"


const CategoryHeader = ({ title, text = "", Shop = "", to = "", image = true, logo = false }) => {
  return (
    <section className="categoryHeader">
      <div className="categoryItems">
        <div className="container">
          {logo && (<img className="logoImage" src="/assets/img/icons/siteLogo.svg" alt="Site Logo" />)}
          <h3 className="categoryTitle">{title}</h3>
          <div className="categoryTextsBox">
            <Link className="homeText" to="/">Home</Link>
            <img className="arrowImage" src="/assets/img/icons/arrow.svg" alt="Arrow Icon" />
            <Link className="homeText" to={to}>{Shop}</Link>
            {
              image && (
                <img className="arrowImage" src="/assets/img/icons/arrow.svg" width={20} height={20} alt="Arrow Icon" />
              )
            }
            <p className="categoryText">{text}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CategoryHeader
