import React from "react";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { get_details } from "../../services/transaction";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Header from "../Header/Header";
import "./Transaction.css";

const Transaction = () => {
  const [data, setData] = useState();
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 4;
  const pagesVisited = pageNumber * usersPerPage;
  useEffect(() => {
    get_details()
      .then((res) => {
        const result = res.data.products.sort((a, b) =>
          a.first_name.localeCompare(b.first_name)
        );
        console.log(result);
        setData(res.data.products);
      })
      .catch((err) => {
        console.log("error while calling post api", err);
      });
  }, []);

  // split the date from the date and time value
  const time = (date) => {
    return date.split("T")[0];
  };
  // Update the page number
  const pageCount = Math.ceil(data?.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  // Get data through api and inserted into rows
  const rows = Array.isArray(data)
    ? data.slice(pagesVisited, pagesVisited + usersPerPage).map((product) => (
        <React.Fragment key={product.created_at}>
          <tr>
            <td>{product.first_name}</td>
            <td>{product.product_title}</td>
            <td>{product.product_price}</td>
            <td>{product.transaction_type}</td>
            <td>{time(product.created_at)}</td>
            <td>{product.quantity}</td>
          </tr>
        </React.Fragment>
      ))
    : [];
  // function for download the table as PDF
  const downloadTable = () => {
    const doc = new jsPDF();
    autoTable(doc, { html: ".transaction-table" });
    doc.save("table.pdf");
  };

  return (
    <div className="transaction">
      <Header />
      <table className="transaction-table" id="table_with_data">
        <thead>
          <tr>
            <th>Customer name</th>
            <th>Product title</th>
            <th>Product price per day</th>
            <th>Transaction type</th>
            <th>Date</th>
            <th>Quantity </th>
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
      <button onClick={downloadTable} className="download">
        Download Table
      </button>
    </div>
  );
};

export default Transaction;
