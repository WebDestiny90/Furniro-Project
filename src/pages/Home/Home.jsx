import Browse from "../../components/Browse/Browse"
import Inspiration from "../../components/Inspiration/Inspiration"
import MainSwiper from "../../components/MainSwaper/MainSwaper"
import OurProducts from "../../components/OurProducts/OurProducts"
import Share from "../../components/Share/Share"
import "./Home.css"
import { Link } from "react-router-dom"


const Home = () => {
  return (
    <>
      <main className="main">
        <MainSwiper />
        <div className="container">
          <div className="mainItems">
            <div className="titleContainer">
              <p className="mainText">New Arrival</p>
              <h1 className="mainTitle">Discover Our New Collection</h1>
              <p className="mainSecondText">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.</p>
              <Link className="mainButton" to="/Shop">BUY NOW</Link>
            </div>
          </div>
        </div>
      </main>
      <Browse />
      <OurProducts />
      <Inspiration />
      <Share />
    </>
  )
}

export default Home