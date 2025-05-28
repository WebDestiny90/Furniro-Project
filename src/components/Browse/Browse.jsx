import "./Browse.css"
import { Link } from "react-router-dom"

const Browse = () => {
  return (
    <section className="browse">
      <div className="container">
        <div className="browseItems">
          <div className="browseItemsTexts">
            <h2 className="sectionTitle textCenter colorGrey">Browse The Range</h2>
            <p className="sectionText textCenter">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="sectionLinksContainer">
            <div className="browseLinks textCenter">
              <Link className="linkItems colorGrey" to="/"><img className="browseImages" src="/assets/img/dining.png" alt="Dining category" />Dining</Link>
            </div>
            <div className="browseLinks textCenter">
              <Link className="linkItems colorGrey" to="/"><img className="browseImages" src="/assets/img/living.png" alt="Living category" />Living</Link>
            </div>
            <div className="browseLinks textCenter">
              <Link className="linkItems colorGrey" to="/"><img className="browseImages" src="/assets/img/bedroom.png" alt="Bedroom category" />Bedroom</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Browse