import "./Share.css"

const Share = () => {
  return (
    <section className="shareSection">
      <div className="shareSectionItems">
        <div className="container">
          <div className="shareSectionTexts">
            <p className="shareSectionText">Share your setup with</p>
            <h2 className="shareSectionTitle">#FurniroFurniture</h2>
          </div>
        </div>
        <div className="shareSectionImage">
          <img className="shareSectionImageItem" src="/assets/img/shareImage.png" alt="Share Images" />
        </div>
      </div>
    </section>
  )
}

export default Share