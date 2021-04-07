import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import productActions from "../../redux/actions/product.actions";
import { useSelector, useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
const capitalizeFirstLetters = (words) => {
  let tempWords = words.split(" ");
  tempWords = tempWords.map((word) => word[0].toUpperCase() + word.slice(1));
  return tempWords.join(" ");
};

function ProductList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);

  useEffect(() => {
    dispatch(productActions.getAllProduct());
  }, [dispatch]);

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
        width: 200,
      },

      {
        label: "Brand",
        field: "brand",
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
        label: "Counts",
        field: "counts",
        sort: "asc",
        width: 100,
      },
      {
        label: "Sold",
        field: "sold",
        sort: "asc",
        width: 50,
      },

      {
        label: "Rating",
        field: "rating",
        sort: "asc",
        width: 100,
      },
      {
        label: "Actions",
        field: "action",
        sort: "asc",
        width: 50,
      },
    ],

    rows: products.map((product) => {
      const totalRatingNum = () => {
        const total = product.reviews.reduce(
          (acc, review) => acc + review.rating,
          0
        );
        return Number(total);
      };

      const totalRating = product.reviews.length;
      const avgRating = Number((totalRatingNum() / totalRating).toFixed(1));

      return {
        productId: product._id,
        name: capitalizeFirstLetters(product.name),
        brand: product.brand,
        price: product.price,
        category: product.category.name,
        counts: product.countInStock,
        sold: product.countSold,
        rating: `${avgRating} Stars`,
        action: (
          <button
            style={{
              borderRadius: "10px",
              background: "red",
              color: "white",
              border: "1px solid red",
            }}
            onClick={() => navigate(`/product/${product._id}/update`)}
          >
            Edit
          </button>
        ),
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
                <ClipLoader loading={loading} size={30} />
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
