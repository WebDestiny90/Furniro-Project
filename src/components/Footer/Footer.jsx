import { Link } from "react-router-dom"
import "./Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footerItems">
          <div className="footerItemsTexts">
            <h2 className="footerTitle">Furniro.</h2>
            <h3 className="footerAdress footerColorGray" >400 University Drive Suite 200 Coral Gables, FL 33134 USA</h3>
          </div>
          <div className="footerLinks">
            <p className="footerLinkText footerColorGray">Links</p>
            <Link className="footerLinksItems" to="/">Home</Link>
            <Link className="footerLinksItems" to="/Shop">Shop</Link>
            <Link className="footerLinksItems" to="/BlogPage">Blog</Link>
            <Link className="footerLinksItems" to="/ContactPage">Contact</Link>
          </div>
          <div className="footerHelpLinks">
            <p className="footerHelpText footerColorGray">Help</p>
            <Link className="footerLinksItems" to="#">Payment Options</Link>
            <Link className="footerLinksItems" to="/returns">Returns</Link>
            <Link className="footerLinksItems" to="/privacy-policy">Privacy Policies</Link>
          </div>
          <div className="footerNewsLinks footerColorGray">
            <p className="footerNewsText">Newsletter</p>
            <form className="subscribeLink">
              <input className="footerInput footerColorGray" type="email" placeholder="Enter Your Email Address" required />
              <button className="subscribeButton">SUBSCRIBE</button>
            </form>
          </div>
        </div>
        <span className="footerEnd">2025 Furniro. Created by Destiny</span>
      </div>
    </footer>
  )
}

export default Footer