import "./CheckOut.css";
import Features from "../../components/Features/Features";
import CategotyHeader from "../../components/CategoryHeader/CategoryHeader";
import { nameFormFields, country, province } from "../../constants/constants"; // путь поправь под свой проект
import CheckOutTotal from "../../components/CheckOutTotal/CheckOutTotal";

const CheckOut = () => {
  return (
    <main className="checkOutPageMain">
      <CategotyHeader title="Checkout" text="Checkout" to="/CartPage" Shop="Cart" logo={true} />
      <div className="container">
        <div className="checkOutPageLeftSide">
          <div className="checkOutPageBillingDetailsBox">
            <h1 className="checkOutPageBillingDetailsTitle">Billing Details</h1>
            <form className="checkOutPageBillingForm">
              <div>
                <div className="checkOutPageNameLabelBox">
                  {nameFormFields.map(({ id, label, type }) => (
                    <label key={id} className="checkOutPageNameLabel checkOutPageFlex">
                      {label}
                      <input className="checkOutPageNameInput checkOutPageName" type={type} required />
                    </label>
                  ))}
                </div>
                <label className="checkOutPageCompanyLabel checkOutPageFlex">
                  Company Name (Optional)
                  <input className="checkOutPageCompanyNameInput" type="text" />
                </label>
                <label htmlFor="country" className="checkOutPageCountryLabel checkOutPageFlex">
                  Country / Region
                  <select className="checkOutPageCountrySelect" name="country">
                    {country.map(({ id, options }) => (
                      <option key={id} value={options}>{options}</option>
                    ))}
                  </select>
                </label>
                <label className="checkOutPageAddressLabel checkOutPageFlex">
                  Street address
                  <input className="checkOutPageAddressInput" type="text" />
                </label>
                <label className="checkOutPageCityLabel checkOutPageFlex">
                  Town / City
                  <input className="checkOutPageCityInput" type="text" />
                </label>
                <label htmlFor="province" className="checkOutPageProvinceLabel checkOutPageFlex">
                  Country / Region
                  <select className="checkOutPageProvinceSelect" name="province">
                    {province.map(({ id, options }) => (
                      <option key={id} value={options}>{options}</option>
                    ))}
                  </select>
                </label>
                <label className="checkOutPageZipLabel checkOutPageFlex">
                  ZIP code
                  <input className="checkOutPageZipInput" type="text" />
                </label>
                <label className="checkOutPagePhoneLabel checkOutPageFlex">
                  Phone
                  <input className="checkOutPagePhoneInput" type="tel" required />
                </label>
                <label className="checkOutPageEmailLabel checkOutPageFlex">
                  Email
                  <input className="checkOutPageEmailInput" type="email" required />
                </label>
              </div>
              <div className="checkOutSubTotal">
                <CheckOutTotal />
              </div>
            </form>
          </div>
        </div>
      </div>
      <Features />
    </main>
  );
};

export default CheckOut;