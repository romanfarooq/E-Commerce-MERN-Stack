import { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard";
import MetaData from "../Layout/MetaData";
import Loader from "../Loader/Loader";
import { getProducts } from "../../Actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    const notify = () => {
      toast.error(error, {
        theme: "dark",
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    };
    if (error) {
      notify();
    } else {
      dispatch(getProducts());
    }
  }, [dispatch, error]);

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
      <ToastContainer />
    </>
  );
}

export default Home;
