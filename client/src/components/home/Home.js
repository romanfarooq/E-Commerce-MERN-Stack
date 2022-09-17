import { CgMouse } from "react-icons/cg";
import ProductCard from "./ProductCard.js";
import "./Home.css";

const product = {
  name: "Blue T-shirt",
  images: [
    {
      url: "https://media.istockphoto.com/photos/blue-tshirt-clipping-path-picture-id465485415?b=1&k=20&m=465485415&s=170667a&w=0&h=VaD_NRgo9mK3E3_4AmGMT9kpUUrSOdLCKVs8W07IU2A=",
    },
  ],
  price: "Rs3000",
  _id: "romi",
};

function Home() {
  return (
    <>
      <div className="banner">
        <p>Welocome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>
        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>
      <h1 className="homeHeading">Featured Products</h1>
      <div className="container" id="container">
        <ProductCard product={product} />
        <ProductCard product={product} />
        <ProductCard product={product} />
        <ProductCard product={product} />
        <ProductCard product={product} />
        <ProductCard product={product} />
        <ProductCard product={product} />
        <ProductCard product={product} />
        <ProductCard product={product} />
      </div>
    </>
  );
}

export default Home;
