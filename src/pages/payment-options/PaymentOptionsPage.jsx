import "./PaymentOptionsPage.css";
import CategoryHeader from "../../components/CategoryHeader/CategoryHeader";

const PaymentOptionsPage = () => (
  <main className="paymentOptionsPage">
    <CategoryHeader title="Payment Options" text="Payment Options" image={false} logo={true} />
    <div className="container">
      <div className="paymentItems">
        <h1>Payment Options</h1>
        <p className="payment-desc">
          We offer several convenient and secure payment methods for your purchases:
        </p>
        <ul className="payment-list">
          <li>
            <img src="/assets/img/icons/visaIcon.png" alt="Visa" />
            <img src="/assets/img/icons/masterCard.png" alt="MasterCard" />
            <span>Bank Cards (Visa, MasterCard, Maestro)</span>
          </li>
          <li>
            <img src="/assets/img/icons/paypalIcon.png" alt="PayPal" />
            <span>PayPal</span>
          </li>
          <li>
            <span>Bank Transfer (for legal entities)</span>
          </li>
          <li>
            <span>Cash on Delivery (available in selected regions)</span>
          </li>
        </ul>
        <h2>Security</h2>
        <p>
          All payments are processed securely using SSL encryption. We do not store your card details on our servers.
        </p>
        <h2>Questions?</h2>
        <p>
          If you have any questions about payment methods, please contact us at <a href="mailto:furniroproject@gmail.com">furniroproject@gmail.com</a>.
        </p>
      </div>
    </div>
  </main>
);

export default PaymentOptionsPage;