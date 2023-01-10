import React from "react";
import { summary } from "../../../services/inventory";
import { useState, useEffect } from "react";
import "./Inventory.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import ReactPaginate from "react-paginate";
import Header from "../../Header/Header";

function Inventory() {
  const [data, setData] = useState();
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 4;
  const pagesVisited = pageNumber * usersPerPage;

  // Fetch the inventory detail API
  useEffect(() => {
    summary()
      .then((res) => {
        const result = res.data.products.sort((a, b) => a.id - b.id);
        console.log(result);
        setData(res.data.products);
      })
      .catch((err) => {
        console.log("error while calling post api", err);
      });
  }, []);

  const pageCount = Math.ceil(data?.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  // Inserted inventory API data into the table row

  const rows = data
    ?.slice(pagesVisited, pagesVisited + usersPerPage)
    .map((product) => (
      <React.Fragment key={product.id}>
        <tr>
          <td>{product.id}</td>
          <td>{product.title}</td>
          <td>{product.quantity_available}</td>
        </tr>
      </React.Fragment>
    ));

  // function for download the table as PDF

  const downloadTable = () => {
    const doc = new jsPDF();
    autoTable(doc, { html: ".inventory-table" });
    doc.save("table.pdf");
  };
  return (
    <div className="inventory">
      <Header />
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Item Id</th>
            <th>Title</th>
            <th>Quantity Available</th>
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
}

export default Inventory;
