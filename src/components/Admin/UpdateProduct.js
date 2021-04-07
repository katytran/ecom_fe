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
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

function UpdateProduct() {
  const { id } = useParams();
  console.log("id", id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state) => state.products.selectedProduct);
  useEffect(() => {
    dispatch(productActions.getSingleProduct(id));
  }, [id, dispatch]);

  // console.log("product ne", product);
  // const arrayPicture = product
  //   ? ProductPicture(product.category.name)
  //   : ProductPicture("foundation-makeup");

  const arrayPicture = ProductPicture("foundation-makeup");

  console.log("product", product);
  const slider = useRef();
  const featured = useRef();
  const [selectedItem, setSelectedItem] = useState(0);

  const determineItemStyle = (index) => {
    const isItemSelected = selectedItem === index;
    return isItemSelected ? "thumbnail active" : "thumbnail";
  };

  const [category, setCategory] = useState("foundation-makeup");
  const [formData, setFormData] = useState({
    id: id,
    name: "",
    brand: "",
    description: "",
    price: 0,
    category: "foundation-makeup",
    images: [],
    ingredients: "",
    countInStock: "",
    countSold: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("data", formData);
  };

  const handleChooseFile = (e) => {
    window.cloudinary.openUploadWidget(
      {
        cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        upload_preset: process.env.REACT_APP_CLOUDINARY_PRESET,
      },
      function (error, result) {
        if (result && result.length) {
          console.log("result", result);
          let imagesArray = [];
          result.map((res) => imagesArray.push(res.secure_url));
          setFormData({
            ...formData,
            images: imagesArray,
          });
        }
      }
    );

    console.log("data", formData);
  };

  const categoryChangeHandler = (category) => {
    setCategory(category);
    setFormData({
      ...formData,
      category: category,
    });
    console.log("category", category);
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log("form data", formData);
    try {
      dispatch(productActions.updateproduct(formData));
      toast.success("🦄 Updated Product!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/admin/dashboard");
    } catch (e) {}
  };

  const handleClickDelete = (e) => {
    e.preventDefault();
    try {
      dispatch(productActions.deleteproduct(id));
      toast.success("🦄 Deleted product!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/admin/dashboard");
    } catch (e) {}
  };

  return (
    <Fragment>
      {!product ? (
        <div>loading</div>
      ) : (
        <Container className="pt-5 review">
          <div className="text-center" style={{ fontSize: "2em" }}>
            {`Update product`}
          </div>
          <Row className="mt-5">
            <Col md={6} className="justify-center pt-3">
              <Form>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Product Brand</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Embeca"
                      required
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                      placeholder="Embeca Foundation"
                      type="text"
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Group controlId="formGridAddress1">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    placeholder="Full coverage and light weight.."
                    type="text"
                    required
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formGridAddress1">
                  <Form.Label>Ingredients</Form.Label>
                  <Form.Control
                    placeholder="Full coverage and light weight.."
                    type="text"
                    required
                    name="ingredients"
                    value={formData.ingredients}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formGridAddress2">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    placeholder="42"
                    type="number"
                    required
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                  <Form.Label>Number of items</Form.Label>
                  <Form.Control
                    placeholder="10000"
                    type="number"
                    required
                    name="countInStock"
                    value={formData.countInStock}
                    onChange={handleChange}
                  />
                  <Form.Label>Number of sold items</Form.Label>
                  <Form.Control
                    placeholder="3672"
                    type="number"
                    required
                    name="countSold"
                    value={formData.countSold}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Row>
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Category</Form.Label>

                    <Form.Control
                      as="select"
                      onChange={(e) => categoryChangeHandler(e.target.value)}
                      value={category}
                    >
                      <option value="foundation-makeup">Foundation</option>
                      <option value="concealer">Concealer</option>
                      <option value="eyeshadow-palettes">Eyeshadow</option>
                      <option value="eyeliner">Eyeliner</option>
                      <option value="eyebrow-makeup-pencils">Eyebrow</option>
                      <option value="lipstick">Lip Stick</option>
                      <option value="lip-gloss">Lip Gloss</option>
                      <option value="blush">Blush</option>
                      <option value="moisturizer-skincare">Moisturizer</option>
                      <option value="cleansing-oil-face-oil">
                        Cleasing oil
                      </option>
                      <option value="face-wash-facial-cleanser">
                        Facial Cleanser
                      </option>
                      <option value="exfoliating-scrub-exfoliator">
                        Exfoliator
                      </option>
                      <option value="face-serum">Face Serum</option>
                      <option value="acne-products-acne-cream">
                        Acne Care
                      </option>
                      <option value="eye-treatment-dark-circle-treatment">
                        Eye Treatment
                      </option>
                      <option value="face-mask">Mask</option>
                    </Form.Control>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridState">
                    <Button onClick={handleChooseFile}>Choose Images</Button>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridState">
                    <Button
                      variant="warning"
                      type="submit"
                      size="sm"
                      onClick={handleClick}
                    >
                      Update product
                    </Button>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridState">
                    <Button
                      variant="danger"
                      type="submit"
                      size="sm"
                      onClick={handleClickDelete}
                    >
                      Delete product
                    </Button>
                  </Form.Group>
                </Form.Row>
              </Form>
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

export default UpdateProduct;
