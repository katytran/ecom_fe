import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";

import productActions from "../../redux/actions/product.actions";

function NewProduct() {
  const [category, setCategory] = useState("foundation-makeup");
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    description: "",
    price: 0,
    category: "foundation-makeup",
    images: [],
    ingredients: "",
    countInStock: "",
  });

  const dispatch = useDispatch();

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
    /*console.log(e.target.files);
    let files = e.target.files;
    let allUploadedFiles = [];
    if (files) {
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          async (uri) => {
            console.log("uri", uri);
            try {
              const res = await api.post(`cloudinary/uploadimages`, {
                image: uri,
              });
              console.log("IMAGE UPLOAD RES DATA", res);
              allUploadedFiles.push(res.data);
              setFormData({ ...formData, images: allUploadedFiles });
            } catch (e) {
              console.log("CLOUDINARY UPLOAD ERR", e);
            }
          },
          "base64"
        );
      }
    } */
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
    dispatch(productActions.addProduct(formData));
    toast.success("🦄 Updated!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div>
      <div id="page-content-wrapper">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12">
              <h1>Add New product</h1>
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
                    placeholder="42"
                    type="number"
                    required
                    name="countInStock"
                    value={formData.countInStock}
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

                  <Form.Group as={Col} controlId="formGridState">
                    {/* <label className="btn btn-success mt-4 ml-5">
                      Choose File
                      <input
                        type="file"
                        multiple
                        accept="images/*"
                        hidden
                        onChange={handleChooseFile}
                      />
                    </label>  */}
                    <Button onClick={handleChooseFile}>Choose Images</Button>
                  </Form.Group>
                  <Button
                    variant="warning"
                    type="submit"
                    size="sm"
                    onClick={handleClick}
                  >
                    Create product
                  </Button>
                </Form.Row>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewProduct;
