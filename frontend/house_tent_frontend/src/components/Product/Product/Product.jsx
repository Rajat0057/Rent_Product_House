import React from "react";
import { useState, useEffect } from "react";
import { product } from "../../../services/product";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { setSessionStorage, getSessionStorage } from "../../../services/common";
import Header from "../../Header/Header";
import "./Product.css";

const Product = () => {
  let orderObject = getSessionStorage("order_object");
  let customer_id = orderObject.customer_id;
  let first_name = orderObject.first_name;
  let last_name = orderObject.last_name;
  let user_email = orderObject.user_email;
  // let access_token = orderObject.access_token;
  const [data, setData] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 4;
  const pagesVisited = pageNumber * usersPerPage;
  const navigate = useNavigate();
  const rent = (id, title, price, quantity_booked, quantity_total) => {
    setSessionStorage(
      {
        user_email: user_email,
        first_name: first_name,
        last_name : last_name,
        customer_id: customer_id,
        type: "In",
        id: id,
        title: title,
        price: price,
        quantity_booked: quantity_booked,
        quantity_total: quantity_total,
        // access_token:access_token
      },
      "order_object"
    );
    navigate("/rent");
  };

  // Call the product details API and product data
  useEffect(() => {
    product()
      .then((res) => {
        console.log(res);

        // Sort the data according their title Name
        const result = res.data.products.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        setData(result.slice(0, 50));
      })
      .catch((err) => {
        console.log("error while calling post api", err);
      });
  }, []);

  // Update the Page Number for the Pagination
  const pageCount = Math.ceil(data?.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  // Fetch the data inserted into the table using map
  const displayUsers = Array.isArray(data)
    ? data.slice(pagesVisited, pagesVisited + usersPerPage).map((product) => (
        <React.Fragment key={product.title}>
          <tr>
            <td>{product.title}</td>
            <td>{product.price}</td>
            <td>{product.quantity_total}</td>
            <td>{product.quantity_available}</td>
            <td>{product.quantity_booked}</td>
            <td>
              <button
                className="button"
                onClick={() =>
                  rent(
                    product.id,
                    product.title,
                    product.price,
                    product.quantity_booked,
                    product.quantity_total
                  )
                }
              >
                Rent
              </button>
            </td>
          </tr>
        </React.Fragment>
      ))
    : [];

  return (
    <div className="product">
      <Header />
      <table className="product-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price per day</th>
            <th>Quantity total</th>
            <th>Quantity Available</th>
            <th>Quantity Booked</th>
            <th>Rent</th>
          </tr>
        </thead>
        <tbody>
          {displayUsers}

          {/* Call the React js paginate components */}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
};

export default Product;
