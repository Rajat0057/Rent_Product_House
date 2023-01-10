import React from "react";
import { useState, useEffect } from "react";
import { get_details } from "../../../services/transaction";
import { setSessionStorage, getSessionStorage } from "../../../services/common";
import ReactPaginate from "react-paginate";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useNavigate } from "react-router-dom";
import Header from "../../Header/Header";
import "./Profile.css";
const Profile = () => {
  const [data, setData] = useState();
  const [show, setShow] = useState(false);
  const [mytable, myTableData] = useState(true);
  // const [color,setColor] =useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [formIsEmpty, setFormIsEmpty] = useState();
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 4;
  const pagesVisited = pageNumber * usersPerPage;
  const navigate = useNavigate();
  let orderObject = getSessionStorage("order_object");
  const first_name = orderObject.first_name;
  const last_name = orderObject.first_name;
  const user_email = orderObject.user_email;
  const customer_id = orderObject.customer_id;

  const total = (quantity, price, type) => {
    if (type === "Out") {
      // setColor(false)
      return "Paid";

    }
    return quantity * price;
  };

  var out = (title, quantity, product_id, type) => {
    if (type === "Out") {
    

      setFormIsEmpty(false);
      alert("The Item had already return")
    } else {
      // setFormIsEmpty(true);
      setSessionStorage(
        {
          type: "Out",
          customer_id: customer_id,
          first_name: first_name,
          last_name: last_name,
          out_title: title,
          out_quantity: quantity,
          product_id: product_id,
          user_email: user_email,
        },
        "order_object"
      );
      navigate("/out");
    }
  };

  // Get the transaction data and filter with the current user name
  useEffect(() => {
    get_details()
      .then((res) => {
        const result = res.data.products.filter(
          (my) => my.first_name === first_name
        );
        if (result.length === 0) {
          myTableData(false);
        }
        console.log(mytable);
        console.log(result.length);
        setData(result);
      })
      .catch((err) => {
        console.log("error while calling post api", err);
      });
  }, [mytable,first_name]);

  // Split the date from date and time
  const time = (date) => {
    return date.split("T")[0];
  };

  // Update the Page Number for the Pagination
  const pageCount = Math.ceil(data?.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  // Fetch the data inserted into the table using map
  const rows = data
    ? data.slice(pagesVisited, pagesVisited + usersPerPage).map((product) => (
        <React.Fragment key={product.created_at}>
          <tr>
            <td>{product.first_name}</td>
            <td>{product.product_title}</td>
            <td>{product.product_price}</td>
            <td>{product.quantity}</td>
            <td>{product.transaction_type}</td>
            <td>{time(product.created_at)}</td>
            <td>
              {total(
                product.product_price,
                product.quantity,
                product.transaction_type
              )}
            </td>
            <td>
              
              <button
                onClick={() =>
                  out(
                    product.product_title,
                    product.quantity,
                    product.product_id,
                    product.transaction_type
                  )
                }
              >
                Return
              </button>
            </td>
          </tr>
        </React.Fragment>
      ))
    : [];

  return (
    <div className="profile">
      <Header />
      <button className="my-details" onClick={() => setShow(!show)}>
        <span className="transaction-heading">
          My Transaction Details
          {show ? <ArrowDownwardIcon /> : <ArrowForwardIcon />}
        </span>
      </button>

      <div>
        {show ? (
          <>
            {mytable ? (
              <>
                <table className="profile-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Title</th>
                      <th>Price per Day </th>
                      <th>Quantity</th>
                      <th>Transaction Type</th>
                      <th>Date</th>
                      <th>Total price paid</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>{rows}</tbody>
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
              </>
            ) : (
              <div className="no-data">No Transaction Present</div>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
      <button
        className="my-profile"
        onClick={() => setShowProfile(!showProfile)}
      >
        <span className="transaction-heading">
          My Details{showProfile ? <ArrowDownwardIcon /> : <ArrowForwardIcon />}
        </span>
      </button>
      <div>
        {showProfile ? (
          <div className="small-box">
            <div className="full-name"> {first_name}</div>
            <span className="email-name">{user_email}</span>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Profile;
