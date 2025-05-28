import { useEffect, useState } from "react";
import CategoryHeader from "../../components/CategoryHeader/CategoryHeader";
import "./SofaPage.css";
import { Link } from "react-router-dom";
import { supabase } from "../../supabase";

const SofaPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSofas = async () => {
      try {
        const { data: sofas, error } = await supabase
          .from('sofas')
          .select('*');

        if (error) throw error;
        setData(sofas);
      } catch (err) {
        console.error('Ошибка при загрузке данных:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSofas();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="sofaItemsMain">
      <CategoryHeader title="Sofas & Couches" to="/Shop" Shop="Shop" text="Sofas & Couches" />
      <div className="container">
        <div className="sofaMainGrid">
          {data.map(({ id, name, price, mainimg, alt, nameDesc }) => (
            <div key={id} className="sofaGridItems">
              <Link to={`/SofaProduct/${id}`}>
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

export default SofaPage;