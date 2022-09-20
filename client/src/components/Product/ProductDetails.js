import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import MetaData from "../Layout/MetaData";
import Loader from "../Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../Actions/productAction";
import { useAlert } from "react-alert";
import ReactStars from "react-rating-stars-component";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.product);
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
    } else {
      dispatch(getProductDetails(id));
    }
  }, [dispatch, alert, error, id]);

  const options = {
    edit: false,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  return (
    <>
      <MetaData title={`${product.name} -- ECOMMERCE`} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="ProductDetails">
            <div>
              <Carousel>
                {product.images &&
                  product.images.map((image, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={image.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span className="detailsBlock-2-span">
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>Rs {product.price}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button>-</button>
                    <input readOnly type="number" value={1} />
                    <button>+</button>
                  </div>
                  <button disabled={product.Stock < 1 ? true : false}>
                    Add to Cart
                  </button>
                </div>
                <p>
                  Status:
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? " Out of Stock" : " In Stock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Discription: <p>{product.description}</p>
              </div>
              <button className="submitReview">Submit Review</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProductDetails;
