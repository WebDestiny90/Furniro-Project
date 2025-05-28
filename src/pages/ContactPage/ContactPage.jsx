import "./ContactPage.css"
import CategoryHeader from "../../components/CategoryHeader/CategoryHeader"
import { addressInfo, contactFields } from "../../constants/constants"
import Features from "../../components/Features/Features";


const ContactPage = () => {
  return (
    <main className="contactPage">
      <CategoryHeader title="Contact" text="Contact" image={false} logo={true} />
      <div className="container">
        <div className="contactTextBox">
          <h1 className="contactSubTitle textCenter">Get In Touch With Us</h1>
          <p className="contactSubText textCenter">For More Information About Our Product & Services. Please Feel Free To Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!</p>
        </div>
        <div className="contactMainBox">
          <div className="contactleftSide">
            {
              addressInfo.map(({ id, imgSrc, title, text }) => {
                return (
                  <div key={id} className="leftSideItems">
                    <img className="contactIcon" src={imgSrc} alt="address icon" />
                    <div className="leftSideTexts">
                      <h2 className="contactAddressTitle">{title}</h2>
                      <p className="contactAddressText">{text}</p>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className="contactRightSide">
            <div className="contactInputs">
              <form className="contactForm">
                {
                  contactFields.map(({ id, label, type, placeHolder }) => {
                    return (
                      <label key={id} className="contactLabel">
                        {label}
                        <input className="contactInputItem" type={type} placeholder={placeHolder} required />
                      </label>
                    )
                  })
                }
                <label className="contactLabel meesageLabel">
                  Message
                  <textarea className="contactInputItem messageInput" placeholder="Hi! i’d like to ask about" cols={30} rows={10} required ></textarea>
                </label>
                <button className="contactSubmit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Features />
    </main>
  )
}

export default ContactPage