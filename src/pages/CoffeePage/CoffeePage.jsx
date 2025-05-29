import { useEffect, useState } from "react";
import CategoryHeader from "../../components/CategoryHeader/CategoryHeader";
import "../SofaPage/SofaPage.css";
import { Link } from "react-router-dom";
import { supabase } from "../../supabase";

const CoffeePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoffee = async () => {
      try {
        const { data: coffee, error } = await supabase
          .from('coffee')
          .select('*');

        if (error) throw error;
        setData(coffee);
      } catch (err) {
        console.error('Ошибка при загрузке данных:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoffee();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="sofaItemsMain">
      <CategoryHeader title="Coffee Tables" to="/Shop" Shop="Shop" text="Coffee Tables" />
      <div className="container">
        <div className="sofaMainGrid">
          {data.map(({ id, name, price, mainimg, alt, nameDesc }) => (
            <div key={id} className="sofaGridItems">
              <Link to={`/CoffeeProduct/${id}`}>
                <img className="sofaGridImage shadow" src={mainimg} alt={alt} width={285} height={301} />
                <div className="sofaGridInfo shadow">
                  <h3 className="sofaGridTitle colorGray">{name}</h3>
                  <p className="sofaGridDesc">{nameDesc}</p>
                  <p className="sofaGridPrice">{price}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default CoffeePage;