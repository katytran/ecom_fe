import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Resizer from "react-image-file-resizer";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import api from "../../api";
import productActions from "../../redux/actions/product.actions";

function NewProduct() {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    description: "",
    price: 0,
    category: "",
    images: [],
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

  const handleClick = (e) => {
    e.preventDefault();
    console.log("form data", formData);
    dispatch(
      productActions.addProduct(
        formData.name,
        formData.description,
        formData.price,
        formData.price,
        formData.category,
        formData.images
      )
    );
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
                </Form.Group>

                <Form.Row>
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      placeholder="makeup"
                      type="text"
                      required
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                    />
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
