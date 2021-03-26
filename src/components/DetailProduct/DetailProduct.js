import React, { useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./App.css";
import arrowleft from "../../images/arrowleft.png";
import arrowright from "../../images/arrowright.png";

function DetailProduct({ product }) {
  const slider = useRef();
  const featured = useRef();
  const [selectedItem, setSelectedItem] = useState(0);

  function determineItemStyle(index) {
    const isItemSelected = selectedItem === index;
    return isItemSelected ? "thumbnail active" : "thumbnail";
  }
  return (
    <Container>
      <Row>
        <Col md={8}>
          <div id="content-wrapper">
            <div className="column">
              <div className="wrap">
                <img
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
                  id="featured"
                  src={product.images[selectedItem]}
                  ref={featured}
                />
                <img
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
                    <div>
                      <img
                        key={index}
                        className={determineItemStyle(index)}
                        src={image}
                        onClick={() => setSelectedItem(index)}
                      ></img>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col md={4} className="justify-center">
          <h3 className="py-3">{product.brand}</h3>
          <h4 className="py-2">${product.price}</h4>
          <div className="py-2">{product.description}</div>
          <div className="py-2">
            {product.categories.map((category) => category.name)}
          </div>
          <div className="py-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa porro
            aperiam, ex, neque repellendus atque, rerum consequuntur quam facere
            omnis sit dolore at! Dicta expedita modi fugit ut. Nobis, modi.
          </div>
          <div className="py-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa porro
            aperiam, ex, neque repellendus atque, rerum consequuntur quam facere
            omnis sit dolore at! Dicta expedita modi fugit ut. Nobis, modi.
          </div>
          <button>Add to cart</button>
        </Col>
      </Row>
    </Container>
  );
}

export default DetailProduct;
