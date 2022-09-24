import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Layout/Header/Header";
import Footer from "./components/Layout/Footer/Footer";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";
import Search from "./components/Product/Search";
import LoginSignUp from "./components/User/LoginSignUp";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginSignUp />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
