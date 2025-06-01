import "./PrivacyPolicy.css"
import CategoryHeader from "../../components/CategoryHeader/CategoryHeader";

const PrivacyPolicy = () => {
  return (
    <main className="privacyPolicyPage">
      <CategoryHeader title="Privacy Policies" text="Privacy Policies" image={false} logo={true} />
      <div className="container">
        <div className="privacyItems">
          <h1>Privacy Policy</h1>
          <p>
            This Privacy Policy describes how we collect, use, and protect your personal information when you use our website.
          </p>
          <h2>Information We Collect</h2>
          <p>
            We may collect information such as your name, email address, and any other details you provide when you contact us or use our services.
          </p>
          <h2>How We Use Your Information</h2>
          <p>
            Your information is used to provide and improve our services, respond to your inquiries, and communicate with you.
          </p>
          <h2>Data Protection</h2>
          <p>
            We implement security measures to protect your data. We do not sell or share your personal information with third parties except as required by law.
          </p>
          <h2>Cookies</h2>
          <p>
            Our website may use cookies to enhance your experience. You can disable cookies in your browser settings.
          </p>
          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page.
          </p>
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at furniroproject@gmail.com.
          </p>
        </div>
      </div>
    </main>
  )
}

export default PrivacyPolicy