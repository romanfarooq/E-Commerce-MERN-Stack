import { Rating } from "@material-ui/lab";
import ProfilePng from "../../images/Profile.png";
import "./ProductDetails.css";

function ReviewCard({ review }) {
  
  const options = {
    size: "medium",
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="reviewCard">
      <img src={ProfilePng} alt="User" />
      <p>{review.name}</p>
      <Rating {...options} />
      <span>{review.comment}</span>
    </div>
  );
}

export default ReviewCard;
