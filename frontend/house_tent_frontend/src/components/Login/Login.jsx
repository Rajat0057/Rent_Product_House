import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/login";
import { useRef } from "react";
import { setSessionStorage } from "../../services/common";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import "./Login.css";

const Login = () => {
  let email = useRef();
  let password = useRef();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [error, setErrorMessage] = useState("");

  const handleToClose = (event, reason) => {
    if ("clickaway" === reason) return;
    setOpen(false);
  };

  // login function to navigate the Sign-in page
  const Sign = () => {
    navigate("/signup");
  };

  // function for the login api to send data to backend
  const submit = (event) => {
    if (email.current.value && password.current.value) {
      event.preventDefault();
      login({
        email: email.current.value,
        password: password.current.value,
      })
        .then((res) => {
          setSessionStorage(

            {
              access_token: res.data.access_token,
              customer_id: res.data.user.id,
              first_name: res.data.user.first_name,
              last_name: res.data.user.last_name,
              user_email: res.data.user.email,
            },
            "order_object"
          );
          navigate("/dashboard");
          email.current.value = "";
          password.current.value = "";
        })
        .catch((err) => {
          console.log("error while calling post api", err);
          setErrorMessage("Credentials Not Match");
          setOpen(true);
        });
    }
    if (!email.current.value || !password.current.value) {
      setErrorMessage("Please Provide Required Field");
      setOpen(true);
    }
  };
  return (
    <div className="login">
      <div className="login-box">
        <h2>Login</h2>
        <form>
          <div className="user-box">
            <input type="text" name="" required="" ref={email} />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input type="password" name="" required="" ref={password} />
            <label>Password</label>
          </div>
          <a href="#/" onClick={submit}>
            Submit
          </a>
          <div className="text-center">
            Don't have an account? <button className="signin-btn"onClick={Sign}>Sign up</button>
          </div>
        </form>
        <Snackbar
          className="place"
          open={open}
          autoHideDuration={5000}
          message={error}
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
    </div>
  );
};

export default Login;
