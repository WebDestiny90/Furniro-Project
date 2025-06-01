import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Shop from "./pages/Shop/Shop";
import SofaPage from "./pages/SofaPage/SofaPage";
import SofaProduct from "./pages/SofaProduct/SofaProduct";
import TvStandsPage from "./pages/TvStandsPage/TvStandsPage";
import TvStandProduct from "./pages/TvStandProduct/TvStandProduct";
import SectionalsPage from "./pages/SectionalsPage/SectionalsPage";
import SectionalsProduct from "./pages/SectionalsProduct/SectionalsProduct";
import CoffeePage from "./pages/coffee-page/CoffeePage";
import CoffeeProduct from "./pages/CoffeeProduct/CoffeeProduct";
import CartPage from "./pages/CartPage/CartPage";
import CheckOut from "./pages/CheckOut/CheckOut";
import { CartProvider } from "./context/CartContext";
import Account from "./pages/Account/Account";
import { AuthProvider } from "./AuthContext/AuthContext";
import Profile from "./pages/Profile/Profile";
import ContactPage from "./pages/ContactPage/ContactPage";
import BlogPage from "./pages/BlogPage/BlogPage";
import { ProductsProvider } from "./context/ProductsContext";
import NotFound from "./pages/NotFound/NotFound";
import WishList from "./components/WishList/WishList";
import { WishListProvider } from "./context/WishListContext";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import ReturnsPage from "./pages/returns/ReturnsPage";


function App() {

  return (
    <AuthProvider>
      <ProductsProvider>
        <CartProvider>
          <WishListProvider>
            <BrowserRouter>
              <ScrollToTop />
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Shop" element={<Shop />} />
                <Route path="/SofaPage" element={<SofaPage />} />
                <Route path="/SofaProduct/:id" element={<SofaProduct />} />
                <Route path="/TvStandsPage" element={<TvStandsPage />} />
                <Route path="/TvStandProduct/:id" element={<TvStandProduct />} />
                <Route path="/SectionalsPage" element={<SectionalsPage />} />
                <Route path="/SectionalsProduct/:id" element={<SectionalsProduct />} />
                <Route path="/CoffeePage" element={<CoffeePage />} />
                <Route path="/CoffeeProduct/:id" element={<CoffeeProduct />} />
                <Route path="/CartPage" element={<CartPage />} />
                <Route path="/CheckOut" element={<CheckOut />} />
                <Route path="/Account" element={<Account />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/ContactPage" element={<ContactPage />} />
                <Route path="/BlogPage" element={<BlogPage />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/WishList" element={<WishList />} />
                <Route path="/ReturnsPage" element={<ReturnsPage />} />


              </Routes>
              <Footer />
            </BrowserRouter>
          </WishListProvider>
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>
  )
}

export default App
