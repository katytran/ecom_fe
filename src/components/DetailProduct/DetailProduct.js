import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import cartActions from "../../redux/actions/cart.actions";
import { Container, Row, Col } from "react-bootstrap";
import "./App.css";
import arrowleft from "../../images/arrowleft.png";
import arrowright from "../../images/arrowright.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductPicture from "../../components/ProductPicture";
import RatingBar from "./RatingBar";

function DetailProduct({ product }) {
  console.log("product", product);
  const slider = useRef();
  const featured = useRef();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const currentProduct = cartItems.find((x) => product.name === x.name);
  const [selectedItem, setSelectedItem] = useState(0);
  const arrayPicture = ProductPicture(product.category.name);

  const determineItemStyle = (index) => {
    const isItemSelected = selectedItem === index;
    return isItemSelected ? "thumbnail active" : "thumbnail";
  };

  const handleAddToCart = () => {
    if (currentProduct) {
      if (currentProduct.qty === 10 || currentProduct.qty === "10") {
        toast.configure();

        toast.error(
          "There is a limit of 10 per person for this item. We have added 0 item(s) to your basket.",
          {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      } else {
        dispatch(cartActions.addToCart(product));
        console.log("try to add");
      }
    } else {
      dispatch(cartActions.addToCart(product));
      console.log("try to add");
    }
  };
  useEffect(() => {}, [dispatch, product, currentProduct]);

  return (
    <Container>
      <Row>
        <Col md={8}>
          <div id="content-wrapper pt-3">
            <div className="column">
              <div className="wrap">
                <img
                  alt={"arrowleft"}
                  id="slideLeft"
                  className="arrow arrowLeft"
                  src={arrowleft}
                  onClick={() => {
                    if (selectedItem > 0) {
                      setSelectedItem(selectedItem - 1);
                    } else {
                      setSelectedItem(product.images.length - 1);
                    }
                  }}
                />
                <img
                  alt={"mainpic"}
                  id="featured"
                  src={product.images[selectedItem]}
                  ref={featured}
                />
                <img
                  alt="arrowright"
                  id="slideRight"
                  className="arrow arrowRight"
                  src={arrowright}
                  onClick={() => {
                    if (selectedItem < product.images.length - 1) {
                      setSelectedItem(selectedItem + 1);
                    } else {
                      setSelectedItem(0);
                    }
                  }}
                />
              </div>

              <div id="slide-wrapper">
                <div id="slider" ref={slider}>
                  {product.images.map((image, index) => (
                    <div key={index}>
                      <img
                        alt={`pic${index}`}
                        className={determineItemStyle(index)}
                        src={image}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = arrayPicture[index];
                        }}
                        onClick={() => setSelectedItem(index)}
                      ></img>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col md={4} className="justify-center pt-3">
          <h3 className="py-3">{product.brand}</h3>
          <h5 className="py-2" style={{ textTransform: "capitalize" }}>
            {product.name}
          </h5>
          <h5 className="py-2">${product.price}</h5>
          <div className="py-2" style={{ fontStyle: "italic" }}>
            {product.description}
          </div>

          <div className="py-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa porro
            aperiam, ex, neque repellendus atque, rerum consequuntur quam facere
            omnis sit dolore at! Dicta expedita modi fugit ut. Nobis, modi.
          </div>

          <button className="addToCart mt-4 ml-3" onClick={handleAddToCart}>
            Add to cart
          </button>
        </Col>
      </Row>

      <Row className="pt-5">
        <hr></hr>
        <div
          style={{
            fontWeight: "bold",
            fontSize: "30px",
            paddingBottom: "20px",
          }}
        >
          Ingredients:
        </div>

        <div className="py-2" style={{ fontStyle: "italic" }}>
          {product.ingredients}
        </div>
      </Row>
      <Row className="pt-5">
        <hr></hr>
        <div
          style={{
            fontWeight: "bold",
            fontSize: "30px",
          }}
        >
          Reviews
        </div>

        <RatingBar reviews={product.reviews} productId={product._id} />
      </Row>
    </Container>
  );
}

export default DetailProduct;
