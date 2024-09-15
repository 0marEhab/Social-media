import React, { useState, useRef, useEffect } from "react";
import "./Signup.css";
import data from "./data.json";
import Alert from "../Alert/Alert";
import { countries } from "../Main/arr";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateBirthdate,
  validateCountry
} from "../Main/Functions/validation";

function Sign() {
  const [data, setData] = useState({
    Email: "",
    Name: "",
    Password: "",
    ConfirmPassword: "",
    Bdate: "",
    Country: "Egypt",
  });

  const [dataError, setDataError] = useState({
    EmailError: "",
    NameError: "",
    PasswordError: "",
    ConfirmPasswordError: "",
    BdateError: "",
    CountryError: "",
  });

  const [loginData, setLoginData] = useState({
    Email: "",
    Password: "",
  });

  const [loginError, setLoginError] = useState({
    EmailError: "",
    PasswordError: "",
  });

  const [users, setUsers] = useState(data.users || []);
  const [alert, setAlert] = useState({
    show: false,
    type: "",
    message: "",
    strongMessage: "",
  });

  const loginEmailRef = useRef(null);
  const loginPasswordRef = useRef(null);

  useEffect(() => {
    // Check login form validity on changes
    handleLoginChange();
  }, [loginData]);

  const handleAlertClose = () => {
    setAlert({ ...alert, show: false });
  };

  const handleSignupChange = (event) => {
    const { name, value } = event.target;

    let error = "";
    switch (name) {
      case "Email":
        error = validateEmail(value);
        break;
      case "Password":
        error = validatePassword(value);
        break;
      case "ConfirmPassword":
        error = validateConfirmPassword(data.Password, value);
        break;
      case "Name":
        error = value === "" ? "Required" : "";
        break;
      case "Bdate":
        error = validateBirthdate(value);
        break;
      case "Country":
        error = validateCountry(value);
        break;
      default:
        break;
    }

    setData((prevData) => ({ ...prevData, [name]: value }));
    setDataError((prevErrors) => ({ ...prevErrors, [`${name}Error`]: error }));
  };

  const handleLoginChange = () => {
    const email = loginData.Email;
    const password = loginData.Password;

    const emailError = validateEmail(email);
    const passwordError = password ? "" : "Password Required";

    setLoginError({
      EmailError: emailError,
      PasswordError: passwordError,
    });
  };

  const isFormValid = () => {
    const { EmailError, NameError, PasswordError, ConfirmPasswordError, BdateError, CountryError } = dataError;
    return (
      data.Email &&
      data.Name &&
      data.Password &&
      data.ConfirmPassword &&
      data.Bdate &&
      data.Country &&
      !EmailError &&
      !NameError &&
      !PasswordError &&
      !ConfirmPasswordError &&
      !BdateError &&
      !CountryError
    );
  };

  const isLoginFormValid = () => {
    const { EmailError, PasswordError } = loginError;
    return (
      loginData.Email &&
      loginData.Password &&
      !EmailError &&
      !PasswordError
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
      email: data.Email,
      password: data.Password,
      name: data.Name,
      bdate: data.Bdate,
      country: data.Country,
    };

    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      return updatedUsers;
    });

    setData({
      Email: "",
      Name: "",
      Password: "",
      ConfirmPassword: "",
      Bdate: "",
      Country: "Egypt",
    });

    setAlert({
      show: true,
      type: "success",
      strongMessage: "Well done! ",
      message: "Your Account is Successfully Registered!",
    });
  };

  const login = () => {
    if (!isLoginFormValid()) {
      setAlert({
        show: true,
        type: "danger",
        strongMessage: "Oh snap!",
        message: "Please fill out all fields correctly.",
      });
      return;
    }

    const email = loginData.Email;
    const password = loginData.Password;

    const storedUsers = JSON.parse(localStorage.getItem("users")) || users;

    const user = storedUsers.find((u) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      setAlert({
        show: true,
        type: "primary",
        strongMessage: `Welcome Back ${user.Name}! `,
        message: "Login Successfully!",
      });
    } else {
      setAlert({
        show: true,
        type: "danger",
        strongMessage: "Oh snap!",
        message: "Change a few things up and try submitting again.",
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
          icon={
            alert.type === "success"
              ? "far fa-check-circle"
              : alert.type === "primary"
              ? "fa fa-thumbs-up"
              : "far fa-times-circle"
          }
          onClose={handleAlertClose}
        />
      )}

      <form className="form spaceform">
        <input id="noaccount" name="radioaccount" type="radio" className="radio radio--invisible" defaultChecked />
        <input id="account" name="radioaccount" type="radio" className="radio radio--invisible" />
        <div className="form_background">
          <div className="form-group form-group--account">
            <h3 className="form-group_title">Log in</h3>
            <input
              className="form-group_input"
              type="email"
              placeholder="Email"
              name="loginEmail"
              value={loginData.Email}
              onChange={(e) => setLoginData({ ...loginData, Email: e.target.value })}
            />
            <p style={{ color: "red" }}>{loginError.EmailError}</p>
            <input
              className="form-group_input"
              type="password"
              placeholder="Password"
              name="loginPassword"
              value={loginData.Password}
              onChange={(e) => setLoginData({ ...loginData, Password: e.target.value })}
            />
            <p style={{ color: "red" }}>{loginError.PasswordError}</p>
            <button
              className="button button--form"
              type="button"
              onClick={login}
              disabled={!isLoginFormValid()}
            >
              Log in
            </button>
          </div>
          <div className="form-group form-group--noaccount">
            <h3 className="form-group_title">Sign up</h3>
            <input
              className="form-group_input"
              type="text"
              placeholder="Full Name"
              name="Name"
              onChange={handleSignupChange}
            />
            <p style={{ color: "red" }}>{dataError.NameError}</p>
            <input
              className="form-group_input"
              type="email"
              placeholder="Email"
              name="Email"
              onChange={handleSignupChange}
            />
            <p style={{ color: "red" }}>{dataError.EmailError}</p>
            <input
              className="form-group_input"
              type="password"
              placeholder="Password"
              name="Password"
              onChange={handleSignupChange}
            />
            <p style={{ color: "red" }}>{dataError.PasswordError}</p>
            <input
              className="form-group_input"
              type="password"
              placeholder="Confirm Password"
              name="ConfirmPassword"
              onChange={handleSignupChange}
            />
            <p style={{ color: "red" }}>{dataError.ConfirmPasswordError}</p>
            <input
              className="form-group_input"
              type="date"
              name="Bdate"
              onChange={handleSignupChange}
            />
            <p style={{ color: "red" }}>{dataError.BdateError}</p>
            <select
              className="form-group_input country-select"
              name="Country"
              onChange={handleSignupChange}
              value={data.Country}
            >
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <p style={{ color: "red" }}>{dataError.CountryError}</p>
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
        <fieldset className="fieldset f1">
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