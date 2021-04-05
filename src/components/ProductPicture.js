function ProductPicture(category) {
  let pictureArray = [];
  if (category == "foundation-makeup") {
    pictureArray.push(
      "https://www.sephora.com/productimages/sku/s2112167-av-01-zoom.jpg?imwidth=1224"
    );
    pictureArray.push(
      "https://www.esteelauder.com/media/export/cms/products/558x768/el_sku_YA6F36_558x768_3.jpg"
    );
    pictureArray.push(
      "https://www.esteelauder.com/media/export/cms/products/558x768/el_sku_YA6F36_558x768_3.jpg"
    );
  }
  if (category == "concealer") {
    pictureArray.push(
      "https://www.sephora.com/productimages/sku/s2164671-av-02-zoom.jpg?imwidth=1224"
    );
    pictureArray.push(
      "https://www.sephora.com/productimages/sku/s2173367-av-01-zoom.jpg?imwidth=1224"
    );
    pictureArray.push(
      "https://www.sephora.com/productimages/sku/s2173367-av-01-zoom.jpg?imwidth=1224"
    );
  }

  if (category == "eyeshadow-palettes") {
    pictureArray.push(
      "https://www.sephora.com/productimages/sku/s2311306-av-06-zoom.jpg?imwidth=1224"
    );
    pictureArray.push(
      " https://www.sephora.com/productimages/sku/s2405397-av-03-zoom.jpg?imwidth=1224"
    );
    pictureArray.push(
      " https://www.sephora.com/productimages/sku/s2405397-av-03-zoom.jpg?imwidth=1224"
    );
  }
  if (category == "eyeliner") {
    pictureArray.push(
      "https://www.sephora.com/productimages/product/p408432-av-01-zoom.jpg?imwidth=1224"
    );
    pictureArray.push(
      " https://www.sephora.com/productimages/product/p461923-av-01-zoom.jpg?imwidth=1224"
    );
    pictureArray.push(
      " https://www.sephora.com/productimages/product/p461923-av-01-zoom.jpg?imwidth=1224"
    );
  }

  if (category == "eyebrow-makeup-pencils") {
    pictureArray.push(
      "https://www.sephora.com/productimages/product/p384060-av-03-zoom.jpg?imwidth=1224"
    );
    pictureArray.push(
      "https://www.sephora.com/productimages/product/p384060-av-01-zoom.jpg?imwidth=1224"
    );
    pictureArray.push(
      "https://www.sephora.com/productimages/product/p384060-av-01-zoom.jpg?imwidth=1224"
    );
  }

  if (category == "lipstick") {
    pictureArray.push(
      "https://www.sephora.com/productimages/sku/s2399285-av-10-zoom.jpg?imwidth=1224"
    );
    pictureArray.push(
      "https://www.sephora.com/productimages/product/p19700127-av-01-zoom.jpg?imwidth=1224"
    );
    pictureArray.push(
      "https://www.sephora.com/productimages/product/p19700127-av-01-zoom.jpg?imwidth=1224"
    );
  }

  if (category == "lip-gloss") {
    pictureArray.push(
      "https://www.sephora.com/productimages/product/p67988453-av-08-zoom.jpg?imwidth=1224"
    );
    pictureArray.push(
      "https://www.sephora.com/productimages/sku/s2352730-av-03-zoom.jpg?imwidth=1224"
    );
    pictureArray.push(
      "https://www.sephora.com/productimages/sku/s2352730-av-03-zoom.jpg?imwidth=1224"
    );
  }

  if (category == "blush") {
    pictureArray.push(
      "https://www.sephora.com/productimages/product/p19700127-av-01-zoom.jpg?imwidth=1224"
    );
    pictureArray.push(
      "https://www.sephora.com/productimages/sku/s2399285-av-10-zoom.jpg?imwidth=1224"
    );
    pictureArray.push(
      "https://www.sephora.com/productimages/sku/s2399285-av-10-zoom.jpg?imwidth=1224"
    );
  }

  if (category == "bronzer-makeup") {
    pictureArray.push(
      "https://www.sephora.com/productimages/sku/s2309300-av-03-zoom.jpg?imwidth=1224"
    );

    pictureArray.push(
      "https://www.sephora.com/productimages/sku/s2309300-av-02-zoom.jpg?imwidth=1224"
    );
    pictureArray.push(
      "https://www.sephora.com/productimages/sku/s2309300-av-02-zoom.jpg?imwidth=1224"
    );
  }

  return pictureArray;
}

export default ProductPicture;
