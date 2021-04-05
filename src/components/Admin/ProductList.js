import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import productActions from "../../redux/actions/product.actions";
import { useSelector, useDispatch } from "react-redux";

const capitalizeFirstLetters = (words) => {
  let tempWords = words.split(" ");
  tempWords = tempWords.map((word) => word[0].toUpperCase() + word.slice(1));
  return tempWords.join(" ");
};

function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);

  // useEffect(() => {
  //   dispatch(productActions.getAllProduct());
  // }, []);

  console.log("products", products);
  // const [data, setData] = useState({ columns: [], row: [] });
  // setData({ row: ["happy"] });
  // console.log(data);

  let data = {
    columns: [
      {
        label: "Product ID",
        field: "productId",
        sort: "asc",
        width: 270,
      },
      {
        label: "Name",
        field: "name",
        sort: "asc",
        width: 270,
      },

      {
        label: "Brand",
        field: "brand",
        sort: "asc",
        width: 270,
      },

      {
        label: "Counts",
        field: "counts",
        sort: "asc",
        width: 100,
      },
      {
        label: "Price",
        field: "price",
        sort: "asc",
        width: 100,
      },
      {
        label: "Category",
        field: "category",
        sort: "asc",
        width: 100,
      },
      {
        label: "Rating",
        field: "rating",
        sort: "asc",
        width: 100,
      },
    ],

    rows: products.map((product) => {
      return {
        productId: product._id,
        name: capitalizeFirstLetters(product.name),
        brand: product.brand,
        counts: 10000,
        price: product.price,
        category: product.category.name,
        rating: "5 Stars",
      };
    }),
  };

  return (
    <div>
      <div id="page-content-wrapper">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12">
              <h1>Product List</h1>
              {loading ? (
                <div>loading</div>
              ) : (
                // <div>data</div>
                <MDBDataTable searchTop striped bordered small data={data} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
