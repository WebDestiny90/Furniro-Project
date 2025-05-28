import { useEffect, useState } from "react";
import CategoryHeader from "../../components/CategoryHeader/CategoryHeader";
import "../SofaPage/SofaPage.css";
import { Link } from "react-router-dom";
import { supabase } from "../../supabase";

const TvStandsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTvStands = async () => {
      try {
        const { data: tvstands, error } = await supabase
          .from('tvstands')
          .select('*');

        if (error) throw error;
        setData(tvstands);
      } catch (err) {
        console.error('Ошибка при загрузке данных:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTvStands();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="sofaItemsMain">
      <CategoryHeader title="TV Stands & Entertainment Centers" to="/Shop" Shop="Shop" text="TV Stands & Entertainment Centers" />
      <div className="container">
        <div className="sofaMainGrid">
          {data.map(({ id, name, price, mainimg, alt, nameDesc }) => (
            <div key={id} className="sofaGridItems">
              <Link to={`/TvStandProduct/${id}`}>
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

export default TvStandsPage;