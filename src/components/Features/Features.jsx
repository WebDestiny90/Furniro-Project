import "./Features.css"
import { features } from '../../constants/constants'


const Features = () => {
  return (
    <section className="featuresbox">
      <div className="container">
        <div className="featuresContainer">
          {
            features.map(({ id, imgSrc, alt, title, text }) => (
              <div key={id} className="features">
                <img className="featuresImage" src={imgSrc} alt={alt} />
                <div className="featuresTexts">
                  <p className="featuresTitle">{title}</p>
                  <p className="featuresDescription">{text}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default Features