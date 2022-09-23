import { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard";
import MetaData from "../Layout/MetaData";
import Loader from "../Loader/Loader";
import { clearErrors, getProducts } from "../../Actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

function Home() {

  const alert = useAlert();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    } else {
      dispatch(getProducts());
    }
  }, [dispatch, error, alert]);

  return (
    <>
      <MetaData title="ECOMMERCE" />
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
      {loading ? (
        <Loader />
      ) : (
        <div className="container" id="container">
          {products &&
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
      )}
    </>
  );
}

export default Home;
