import React, { useRef, useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Form } from "react-bootstrap";
import "./App.css";
import arrowleft from "../../images/arrowleft.png";
import arrowright from "../../images/arrowright.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductPicture from "../../components/ProductPicture";
import { useParams } from "react-router-dom";
import productActions from "../../redux/actions/product.actions";
import { withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import reviewActions from "../../redux/actions/review.actions";

const StyledRating = withStyles({
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  },
})(Rating);

function ReviewProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.selectedProduct);
  const [formData, setFormData] = useState({
    rating: 0,
    title: "",
    body: "",
  });

  useEffect(() => {
    dispatch(productActions.getSingleProduct(id));
  }, [id, dispatch]);

  const arrayPicture = product
    ? ProductPicture(product.category.name)
    : ProductPicture("foundation-makeup");

  console.log("product", product);
  const slider = useRef();
  const featured = useRef();
  const [selectedItem, setSelectedItem] = useState(0);

  const determineItemStyle = (index) => {
    const isItemSelected = selectedItem === index;
    return isItemSelected ? "thumbnail active" : "thumbnail";
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      reviewActions.createReview(
        id,
        formData.title,
        formData.rating,
        formData.body
      )
    );
  };
  return (
    <Fragment>
      {!product ? (
        <div>loading</div>
      ) : (
        <Container className="pt-5 review">
          <div className="text-center" style={{ fontSize: "2em" }}>
            {`Share us what you think`}
          </div>
          <Row className="mt-5">
            <Col md={6} className="justify-center pt-3">
              <div className="pr-3">
                <Box component="fieldset" mb={3} borderColor="transparent">
                  <Typography component="legend">Rating</Typography>
                  <StyledRating
                    name="rating"
                    onChange={handleChange}
                    defaultValue={formData.rating}
                    getLabelText={(value) =>
                      `${value} Heart${value !== 1 ? "s" : ""}`
                    }
                    precision={1}
                    icon={<FavoriteIcon fontSize="inherit" />}
                  />
                  <Form>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={1}
                        placeholder="Add your title"
                        value={formData.title}
                        onChange={handleChange}
                        name="title"
                      />
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Review</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Add your review"
                        value={formData.body}
                        onChange={handleChange}
                        name="body"
                      />
                    </Form.Group>
                  </Form>
                </Box>
                <button onClick={handleSubmit}>Submit</button>
              </div>
            </Col>
            <Col md={6} className="pl-3">
              <div id="content-wrapper pt-3">
                <div className="column">
                  <h5 className="text-center">{product.brand}</h5>
                  <h5
                    className="text-center"
                    style={{ textTransform: "capitalize" }}
                  >
                    {product.name}
                  </h5>
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
          </Row>
        </Container>
      )}
    </Fragment>
  );
}

export default ReviewProduct;
