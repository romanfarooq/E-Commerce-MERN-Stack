import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import WebFont from "webfontloader";
import "./App.css";
import Header from "./components/Layout/Header/Header";

function App() {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
}

export default App;
