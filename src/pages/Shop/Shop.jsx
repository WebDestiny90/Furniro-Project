import CategoryHeader from "../../components/CategoryHeader/CategoryHeader"
import Features from "../../components/Features/Features";
import OurProducts from "../../components/OurProducts/OurProducts";

const Shop = () => {
  return (
    <>
      <main className="shopMain">
        <CategoryHeader title="Shop" text="Shop" image={false} />
        <div className="container">
          <OurProducts title={false} more={false} />
        </div>
      </main >
      <Features />
    </>
  )
}

export default Shop