import "./BlogPage.css"
import { blogItems, CategoryLinks } from "../../constants/constants"
import { Link } from "react-router-dom"

const BlogPage = () => {
  return (
    <main className="blogPage">
      <div className="container">
        <div className="blogMainItems">
          <div className="blogSubItemsBox">
            {
              blogItems.map(({ id, imgSrc, alt, admin, date, tag, title, text, loading }) => {
                return (
                  <div key={id} className="blogSubItems">
                    <img className="blogImage" src={imgSrc} width={817} height={500} alt={alt} loading={loading} />
                    <div className="blogInfoBox">
                      <img className="blogIcon" src="/assets/img/icons/admin.svg" width={20} height={20} alt="Blog Icon" />
                      <p className="blogInfo">{admin}</p>
                      <img className="blogIcon" src="/assets/img/icons/calendar.svg" width={20} height={20} alt="Blog Icon" />
                      <p className="blogInfo">{date}</p>
                      <img className="blogIcon" src="/assets/img/icons/ci_tag.svg" width={24} height={24} alt="Blog Icon" />
                      <p className="blogInfo">{tag}</p>
                    </div>
                    <h2 className="blogSubTitle">{title}</h2>
                    <p className="blogSubText">{text}</p>
                  </div>
                )
              })
            }
          </div>
          <div className="blogRightItems">
            <h3 className="blogRightTitle">Categories</h3>
            {
              CategoryLinks.map(({ id, to, title }) => {
                return (
                  <div key={id} className="blogRightCategory">
                    <Link className="blogCategoryLinks" to={to}>{title}</Link>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </main>
  )
}

export default BlogPage