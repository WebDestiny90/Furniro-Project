import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase';

const ProductsContext = createContext();

export const useProducts = () => {
  return useContext(ProductsContext);
};

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Загружаем данные из обеих таблиц
        const [sofasResponse, tvStandsResponse, sectionalsResponse, coffeeResponse] = await Promise.all([
          supabase.from('sofas').select('*'),
          supabase.from('tvstands').select('*'),
          supabase.from('sectionals').select('*'),
          supabase.from('coffee').select('*')
        ]);

        if (sofasResponse.error) throw sofasResponse.error;
        if (tvStandsResponse.error) throw tvStandsResponse.error;
        if (sectionalsResponse.error) throw sectionalsResponse.error;
        if (coffeeResponse.error) throw coffeeResponse.error;

        // Объединяем все продукты в один массив
        const allProducts = [
          ...sofasResponse.data.map(sofa => ({ ...sofa, category: 'Sofa' })),
          ...tvStandsResponse.data.map(tvStand => ({ ...tvStand, category: 'TvStand' })),
          ...sectionalsResponse.data.map(sectional => ({ ...sectional, category: 'Sectionals' })),
          ...coffeeResponse.data.map(coffee => ({ ...coffee, category: 'Coffee' }))
        ];

        setProducts(allProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const value = {
    products,
    loading,
    error
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
