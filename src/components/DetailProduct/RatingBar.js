import React, { useState, useEffect, Fragment } from "react";
import ReviewCard from "../ReviewCard";
import { useDispatch, useSelector } from "react-redux";
import orderActions from "../../redux/actions/order.actions";
import { useNavigate } from "react-router-dom";
import reviewActions from "../../redux/actions/review.actions";
import PaginationBar from "../Pagination";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function RatingBar({ reviews, productId }) {
  const orders = useSelector((state) => state.order.orders);
  const reviewsList = useSelector((state) => state.review.reviews);
  const [isVerified, setisVerified] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [sortBy, setSortby] = useState("newest");
  const totalPages = useSelector((state) => state.review.totalPages);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const limit = 5;

  useEffect(() => {
    dispatch(reviewActions.getReviewOneProduct(productId, pageNum, limit));
  }, [dispatch, productId, pageNum, limit]);

  const getArrayRatingNum = (num) => {
    const array = reviews.filter((review) => review.rating === num);
    return array;
  };

  const totalRatingNum = () => {
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return total;
  };

  const totalRating = reviews.length;
  const avgRating = (totalRatingNum() / totalRating).toFixed(1);
  const [arrayReview, setArrayReview] = useState([]);

  useEffect(() => {
    dispatch(orderActions.getMyOrder());
    dispatch(
      reviewActions.getReviewOneProduct(
        productId,
        pageNum,
        limit,
        query,
        sortBy
      )
    );
  }, [dispatch, productId, pageNum, limit, query, sortBy]);

  useEffect(() => {
    setArrayReview(reviewsList);
  }, [reviewsList]);

  useEffect(() => {
    let oldOrder = [];
    if (orders) {
      for (let i = 0; i < orders.length; i++) {
        console.log("product id", productId);
        oldOrder = orders[i].products.find(
          (product) => product._id === productId
        );
      }
      if (oldOrder.length !== 0) {
        setisVerified(true);
      }
    }
  }, [productId, orders]);

  const bar1 = Math.floor((getArrayRatingNum(1).length / totalRating) * 100);
  const bar2 = Math.floor((getArrayRatingNum(2).length / totalRating) * 100);
  const bar3 = Math.floor((getArrayRatingNum(3).length / totalRating) * 100);
  const bar4 = Math.floor((getArrayRatingNum(4).length / totalRating) * 100);
  const bar5 = Math.floor((getArrayRatingNum(5).length / totalRating) * 100);

  const getArrayReview = (num) => {
    setArrayReview(getArrayRatingNum(num));
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const sortbyChangeHandler = (productId, pageNum, limit, query, sortByy) => {
    setSortby(sortByy);
    dispatch(
      reviewActions.getReviewOneProduct(
        productId,
        pageNum,
        limit,
        query,
        sortByy
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      reviewActions.getReviewOneProduct(productId, pageNum, limit, query)
    );
  };

  const style1 = {
    opacity: 1,
    width: `${bar1}%`,
  };
  const style2 = {
    opacity: 1,
    width: `${bar2}%`,
  };
  const style3 = {
    opacity: 1,
    width: `${bar3}%`,
  };
  const style4 = {
    opacity: 1,
    width: `${bar4}%`,
  };
  const style5 = {
    opacity: 1,
    width: `${bar5}%`,
  };

  console.log("verified", isVerified);
  return (
    <Fragment>
      {!reviews ? (
        <div>Loading</div>
      ) : (
        <div>
          <div className="d-flex align-items-center ml-5 mb-5">
            <div
              className="d-flex align-items-center ml-5"
              style={{ width: "60%" }}
            >
              <div className="mr-5 text-center">
                <p style={{ fontSize: "55px" }}>{avgRating}</p>
                <p style={{ fontSize: "15px" }}>Out of 5</p>
                <p style={{ fontSize: "15px" }}>Total: {totalRating} ratings</p>
              </div>

              <div>
                <div
                  className="d-flex align-items-center"
                  style={{ height: "25px" }}
                >
                  <div className="progress" onClick={() => getArrayReview(5)}>
                    <div className="progress-done" style={style5}></div>
                  </div>
                  <div className="align-self-center ml-2">5</div>
                </div>
                <div
                  className="d-flex align-items-center"
                  style={{ height: "25px" }}
                >
                  <div className="progress" onClick={() => getArrayReview(4)}>
                    <div className="progress-done" style={style4}></div>
                  </div>
                  <div className="align-self-center ml-2">4</div>
                </div>
                <div
                  className="d-flex align-items-center"
                  style={{ height: "25px" }}
                >
                  <div className="progress" onClick={() => getArrayReview(3)}>
                    <div className="progress-done" style={style3}></div>
                  </div>
                  <span className="align-self-center ml-2">3</span>
                </div>
                <div
                  className="d-flex align-items-center"
                  style={{ height: "25px" }}
                >
                  <div className="progress" onClick={() => getArrayReview(2)}>
                    <div className="progress-done" style={style2}></div>
                  </div>
                  <span className="align-self-center ml-2">2</span>
                </div>
                <div
                  className="d-flex align-items-center"
                  style={{ height: "25px" }}
                >
                  <div className="progress" onClick={() => getArrayReview(1)}>
                    <div className="progress-done" style={style1}></div>
                  </div>
                  <span className="align-self-center ml-2">1</span>
                </div>
              </div>
            </div>{" "}
            {!isVerified ? (
              <></>
            ) : (
              <button
                style={{
                  textAlign: "center",
                  padding: "10px",
                  background: "black",
                  color: "white",
                  letterSpacing: "2px",
                }}
                onClick={() => navigate(`/addReview/product/${productId}`)}
              >
                WRITE A REVIEW
              </button>
            )}
          </div>

          <div className="d-flex justify-content-between align-items-center mb-5">
            <div>
              <form className="input-wrap" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Search..."
                  className="input-text"
                  onChange={handleChange}
                ></input>
                <FontAwesomeIcon className="iconSearch" icon={faSearch} />
              </form>
            </div>
            <div>
              <select
                onChange={(e) =>
                  sortbyChangeHandler(
                    productId,
                    pageNum,
                    limit,
                    query,
                    e.target.value
                  )
                }
                value={sortBy}
              >
                <option value="newest">Newest rating</option>
                <option value="oldest">Oldest rating</option>
                <option value="highest">Highest rating</option>
                <option value="lowest">Lowest rating</option>
              </select>
            </div>
          </div>

          {arrayReview &&
            arrayReview.map((review, index) => (
              <ReviewCard review={review} key={index} />
            ))}
          <PaginationBar
            pageNum={pageNum}
            setPageNum={setPageNum}
            totalPages={totalPages}
          />
        </div>
      )}
    </Fragment>
  );
}

export default RatingBar;
