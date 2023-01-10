import React from "react";
import { getSessionStorage } from "../../../services/common";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { rentproduct } from "../../../services/product";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import "./RentProduct.css";

const RentProductPage = () => {
  const navigate = useNavigate();
  let orderObject = getSessionStorage("order_object");
  let title = orderObject.title;
  let price = orderObject.price;
  let customer_id = orderObject.customer_id;
  let type = orderObject.type;
  let quantity = useRef();

  const [open, setOpen] = React.useState(false);

  const handleToClose = (event, reason) => {
    if ("clickaway" === reason) return;
    setOpen(false);
  };

  // Function for submit the rent product details

  const submit = (event) => {
    event.preventDefault();
    // Call the Rent product API
    rentproduct({
      product_id: orderObject.id,
      quantity: quantity.current.value,
      customer_id: customer_id,
      type: type,
    })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        quantity.current.value = "";
        navigate("/thanks");
        if (res.data) {
        }
      })
      .catch((err) => {
        setOpen(true);
        console.log("error while calling post api", err);
      });
  };
  return (
    <div className="book-registration">
      <div className="order-registration-form">
        <div class="fieldset">
          <legend>Order Rent From</legend>
          <form data-validate="parsley">
            <div class="row">
              <label>Product Name</label>
              <input type="text" value={title} data-required="true" />
            </div>
            <div class="row">
              <label>Price</label>
              <input
                type="text"
                value={price}
                data-required="true"
                data-type="number"
              />
            </div>
            <div class="row">
              <label>Booking Quantity</label>
              <input type="text" ref={quantity} data-required="true" />
            </div>
            <input
              type="submit"
              className="button"
              onClick={submit}
              value="Order Book"
            />
          </form>
        </div>
      </div>
      <Snackbar
        className="place"
        open={open}
        autoHideDuration={5000}
        message="Insufficient Quantity"
        onClose={handleToClose}
        action={
          <React.Fragment>
            <IconButton className="Icon" onClick={handleToClose}>
              <CloseIcon className="close" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
};

export default RentProductPage;
