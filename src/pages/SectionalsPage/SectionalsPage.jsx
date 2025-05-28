import { useEffect, useState } from "react";
import CategoryHeader from "../../components/CategoryHeader/CategoryHeader";
import "../SofaPage/SofaPage.css";
import { Link } from "react-router-dom";
import { supabase } from "../../supabase";
import "./SectionalsPage.css";

const SectionalsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSectionals = async () => {
      try {
        const { data: sectionals, error } = await supabase
          .from('sectionals')
          .select('*');

        if (error) throw error;
        setData(sectionals);
      } catch (err) {
        console.error('Ошибка при загрузке данных:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSectionals();
  }, []);

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading sectionals...</p>
    </div>
  );

  if (error) return (
    <div className="error-container">
      <h2>Oops! Something went wrong</h2>
      <p>{error}</p>
    </div>
  );

  if (!data || data.length === 0) return (
    <div className="error-container">
      <h2>No sectionals found</h2>
      <p>Please check if the table exists and contains data</p>
    </div>
  );

  return (
    <main className="sofaItemsMain">
      <CategoryHeader title="Sectionals" to="/Shop" Shop="Shop" text="Sectionals" />
      <div className="container">
        <div className="sofaMainGrid">
          {data.map(({ id, name, price, mainimg, alt, nameDesc }) => (
            <div key={id} className="sofaGridItems">
              <Link to={`/SectionalsProduct/${id}`}>
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

export default SectionalsPage;