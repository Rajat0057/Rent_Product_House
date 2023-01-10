import React from "react";
import { getSessionStorage } from "../../../services/common";
import { outproduct } from "../../../services/product";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import "./OutProduct.css";

const OutProduct = () => {

  let orderObject = getSessionStorage("order_object");
  let quantity = useRef();
  const title = orderObject.out_title;
  const quantity_available = orderObject.out_quantity;
  const type = orderObject.type;
  let customer_id = orderObject.customer_id;
  let product_id = orderObject.product_id;
  let navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleToClose = (event, reason) => {
    if ("clickaway" === reason) return;
    setOpen(false);
  };

  const submit = (event) => {
    event.preventDefault();
    quantity = quantity.current.value;
    if (quantity_available < quantity) {
      setOpen(true);
    } else {
      outproduct({
        quantity: quantity,
        customer_id: customer_id,
        title: title,
        type: type,
        product_id: product_id,
      })
        .then((res) => {
          navigate("/thanks");
        })
        .catch((err) => {
          console.log("error while calling post api", err);
        });
    }
  };
  return (
    <div className="out-registration">
      <div className="out-registration-form">
        <div class="fieldset">
          <legend>Product Out From</legend>
          <form data-validate="parsley">
            <div class="row">
              <label for="product">Product Name</label>
              <input type="text" value={title} data-required="true" />
            </div>
            <div class="row">
              <label for="price">Quantity Available</label>
              <input
                type="text"
                value={quantity_available}
                data-required="true"
                data-type="number"
              />
            </div>
            <div class="row">
              <label for="quantity">Your Quantity</label>
              <input type="text" ref={quantity} data-required="true" />
            </div>
            <input
              type="submit"
              className="button"
              onClick={submit}
              value="Product Return"
            />
          </form>
        </div>
      </div>
      <Snackbar
        className="place"
        open={open}
        autoHideDuration={5000}
        message="Product Quantity is greater"
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

export default OutProduct;
