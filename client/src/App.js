import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/header/Header.js";
import Footer from "./components/layout/footer/Footer.js";
import Home from "./components/home/Home.js";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
