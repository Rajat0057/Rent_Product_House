import React from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../services/signin";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import "./Signup.css";
import { useState } from "react";

const Signup = () => {

  let first_name = useRef();
  let last_name = useRef();
  let email = useRef();
  let password = useRef();
  let confirm_password = useRef();
  const navigate = useNavigate();
  const [error,setErrorMessage] = useState('');
  const [open, setOpen] = React.useState(false);
  const handleToClose = (event, reason) => {
    if ("clickaway" === reason) return;
    setOpen(false);
  };

  // login function to navigate the login page
  const logInPage = () => {
    navigate("/");
  };

  // function for the signup api to send data to backend
  const submit = (event) => {
    if(password.current.value===confirm_password.current.value)
    {
    event.preventDefault();
    signup({
      first_name: first_name.current.value,
      last_name: last_name.current.value,
      email: email.current.value,
      password: password.current.value,
    }).then((res) => {
        console.log(res);
        first_name.current.value = "";
        last_name.current.value = "";
        email.current.value = "";
        password.current.value = "";
        navigate("/");
      }).catch((err) => {
        setErrorMessage("Please Submit the correct Details")
        setOpen(true);
        console.log("error while calling post api", err);
      });
  }if(password.current.value!==confirm_password.current.value)
  {
    setOpen(true)
     setErrorMessage("Password not match ")
  }
}
  return (
    <div className="sign">
    <div className="sign-in-box">
      <h2>Sign up</h2>
      <form>
        <div className="user-box">
          <input type="text" name="" required="" ref={first_name} />
          <label>First Name</label>
        </div>
        <div className="user-box">
          <input type="text" name="" required="" ref={last_name} />
          <label>Last Name</label>
        </div>
        <div className="user-box">
          <input type="text" name="" required="" ref={email} />
          <label>Email</label>
        </div>
        <div className="user-box">
          <input type="password" name="" required="" ref={password} />
          <label>Password</label>
        </div>
           <div className="user-box">
          <input type="password" name="" required="" ref={confirm_password} />
          <label>Confirm Password</label>
        </div>
        <a href="#/"onClick={submit}>Submit</a>
        <div className="text-center">
          Already have account? <button className="login-btn"onClick={logInPage}>Log in</button>
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

export default Signup;
