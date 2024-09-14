import React, { useState } from "react";
import "./Signup.css";
import data from "./data.json";
import Alert from "../Alert/Alert";

function Sign() {
  const [Data, setData] = useState({
    Email: "",
    Name: "",
    Password: "",
    ConfirmPassword: "",
    Bdate: "",
  });

  const [DataError, setDataError] = useState({
    EmailError: "",
    UserNameError: "",
    PasswordError: "",
    ConfirmPasswordError: "",
    BdateError: "",
  });
  const [users, setUsers] = useState(data.users || []);
  const [alert, setAlert] = useState({
    show: false,
    type: "",
    message: "",
    strongMessage: "",
  });
  

  const handleAlertClose = () => {
    setAlert({ ...alert, show: false });
  };

  function containsUppercase(str) {
    return /[A-Z]/.test(str);
  }

  function containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
  }
  function calculateAge(birthdate) {
    const currentDate = new Date();
    const birthDate = new Date(birthdate);
  
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDifference = currentDate.getMonth() - birthDate.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())) {
      age--;
    }
  
    return age;
  }

  const handleSignupChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "Email":
        setData({ ...Data, Email: value });
        
        let emailError = "";
      
        if (value === "") {
          emailError = "Email Required";
        } 
        else if (!/@/.test(value)) {
          emailError = "Please enter a valid email that contains '@'!";
        } 
        else if (!/\.[a-zA-Z]{2,}$/.test(value.split('@')[1])) {
          emailError = "Please enter a valid email domain.";
        } 
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          emailError = "Please enter a valid email address.";
        }
        
        setDataError({
          ...DataError,
          EmailError: emailError,
        });
        break;
      case "Password":
        setData({ ...Data, Password: value });
        setDataError({
          ...DataError,
          PasswordError: value === ""
            ? "Password Required"
            : value.length < 8
            ? "Password must be at least 8 characters"
            : !containsUppercase(value)
            ? "Include at least one uppercase letter"
            : containsSpecialChars(value)
            ? ""
            : "Include a special character in the password",
        });
        break;
      case "ConfirmPassword":
        setData({ ...Data, ConfirmPassword: value });
        setDataError({
          ...DataError,
          ConfirmPasswordError: value === ""
            ? "Password Required"
            : value === Data.Password
            ? ""
            : "Passwords don't match",
        });
        break;
      case "FullName":
        setData({ ...Data, Name: value });
        setDataError({
          ...DataError,
          UserNameError: value === "" ? "Required" : "",
        });
        break;
      case "Bdate":
        setData({ ...Data, Bdate: value });
        setDataError({
          ...DataError,
          BdateError: value === "" ? "Required" : calculateAge(value)<13?"Your Age Must be +13":"" ,
        });
        break;
      default:
        break;
    }
  };

  const isFormValid = () => {
    const { EmailError, UserNameError, PasswordError, ConfirmPasswordError, BdateError } = DataError;
    return (
      Data.Email &&
      Data.Name &&
      Data.Password &&
      Data.ConfirmPassword &&
      Data.Bdate &&
      !EmailError &&
      !UserNameError &&
      !PasswordError &&
      !ConfirmPasswordError &&
      !BdateError
    );
  };

  const signup = () => {
    if (!isFormValid()) {
      setAlert({
        show: true,
        type: "danger",
        strongMessage: "Oh snap! ",
        message: "Please fill out all fields correctly.",
      });
      return;
    }

    const newUser = {
      email: Data.Email,
      password: Data.Password,
      ConfirmPassword: Data.ConfirmPassword,
      Name: Data.Name,
      Bdate: Data.Bdate,
    };


    setUsers([...users, newUser]);
    setData({
      Email: "",
      Name: "",
      Password: "",
      ConfirmPassword: "",
      Bdate: "",
    });
    localStorage.setItem("users", JSON.stringify([...users, newUser]));

    setAlert({
      show: true,
      type: "success",
      strongMessage: "Well done! ",
      message: " Your Account is Successfully Registered!",
    });
  };

  const login = () => {
    const em = document.getElementById("LoginEmail").value;
    const pass = document.getElementById("LoginPassword").value;

    const storedUsers = JSON.parse(localStorage.getItem("users")) || users;

    const user = storedUsers.find((u) => u.email === em && u.password === pass);

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      setAlert({
        show: true,
        type: "primary",
        strongMessage: `Welcome Back ${user.Name}! `,
        message: " Login Successfully!",
      });
    } else {
      setAlert({
        show: true,
        type: "danger",
        strongMessage: "Oh snap!",
        message: " Change a few things up and try submitting again.",
      });
    }
  };

  return (
    <>
      {alert.show && (
        <Alert
          type={alert.type}
          message={alert.message}
          strongMessage={alert.strongMessage}
          icon={alert.type === "success" ? "far fa-check-circle" : "" || alert.type === "primary"?"fa fa-thumbs-up" : "" || alert.type ==="danger"?"far fa-times-circle" : ""}
          onClose={handleAlertClose}
        />
      )}

      <form action="" className="form spaceform">
        <input id="noaccount" name="radioaccount" type="radio" className="radio radio--invisible" checked />
        <input id="account" name="radioaccount" type="radio" className="radio radio--invisible" />
        <div className="form_background">
          <div className="form-group form-group--account">
            <h3 className="form-group_title">Log in</h3>
            <input
              className="form-group_input"
              type="email"
              placeholder="Email"
              name="loginEmail"
              id="LoginEmail"
            />
            <input
              className="form-group_input"
              type="password"
              placeholder="Password"
              name="loginPassword"
              id="LoginPassword"
            />
            <button className="button button--form" type="button" onClick={login}>
              Log in
            </button>
          </div>
          <div className="form-group form-group--noaccount">
            <h3 className="form-group_title">Sign up</h3>
            <input
              className="form-group_input"
              type="text"
              placeholder="Full Name"
              name="FullName"
              onChange={(e) => handleSignupChange(e)}
            />
            <p style={{ color: "red" }}>{DataError.UserNameError}</p>
            <input
              className="form-group_input"
              type="email"
              placeholder="Email"
              name="Email"
              onChange={(e) => handleSignupChange(e)}
            />
            <p style={{ color: "red" }}>{DataError.EmailError}</p>
            <input
              className="form-group_input"
              type="password"
              placeholder="Password"
              name="Password"
              onChange={(e) => handleSignupChange(e)}
            />
            <p style={{ color: "red" }}>{DataError.PasswordError}</p>
            <input
              className="form-group_input"
              type="password"
              placeholder="Confirm Password"
              name="ConfirmPassword"
              onChange={(e) => handleSignupChange(e)}
            />
            <p style={{ color: "red" }}>{DataError.ConfirmPasswordError}</p>
            <input
              className="form-group_input"
              type="date"
              name="Bdate"
              onChange={(e) => handleSignupChange(e)}
            />
            <p style={{ color: "red" }}>{DataError.BdateError}</p>
            <button
              className="button button--form"
              type="button"
              disabled={!isFormValid()}
              onClick={signup}
            >
              Sign up
            </button>
          </div>
        </div>
        <fieldset className="fieldset">
          <h2>Don't have an account?</h2>
          <p>We are delighted to have you With US!</p>
          <label htmlFor="noaccount" className="button">Signup</label>
        </fieldset>
        <fieldset className="fieldset">
          <h2>Have an account?</h2>
          <p>Welcome Back Pal!</p>
          <label htmlFor="account" className="button">Login</label>
        </fieldset>
      </form>
    </>
  );
}

export default Sign;
