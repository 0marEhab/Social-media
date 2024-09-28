import React, { useState, useEffect, useContext } from "react";
import "./Signup.css";
import Alert from "../Alert/Alert";
import { countries } from "../Main/arr";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateBirthdate,
  validateCountry,
  validateName,
} from "../Main/Functions/validation";
import axios from "axios";
import summaryApi from "../../../../common/index";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../Contexts/UserContext";

export default function Signup() {
  const {setUser} = useContext(UserContext)
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

  useEffect(() => {
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
        error = validateName(value);
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
    const {
      EmailError,
      NameError,
      PasswordError,
      ConfirmPasswordError,
      BdateError,
      CountryError,
    } = dataError;
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
      loginData.Email && loginData.Password && !EmailError && !PasswordError
    );
  };

  const signup = async () => {
    if (!isFormValid()) {
      setAlert({
        show: true,
        type: "danger",
        strongMessage: "Oh snap! ",
        message: "Please fill out all fields correctly.",
      });
      return;
    }

    try {
      const response = await axios.post(summaryApi.signup.url, {
        email: data.Email,
        password: data.Password,
        confirmPassword: data.ConfirmPassword,
        name: data.Name,
        birthDate: data.Bdate,
        country: data.Country,
      });

      setData({
        Email: "",
        Name: "",
        Password: "",
        ConfirmPassword: "",
        Bdate: "",
        Country: "Egypt",
      });

      console.log(response);

      if (response.status === 201) {
        setAlert({
          show: true,
          type: "success",
          strongMessage: "Well done! ",
          message: "Your account has been created successfully.",
        });
      } else if (response.status === 400) {
        setAlert({
          show: true,
          type: "danger",
          strongMessage: "Email Already Used!",
          message:
            "Please Enter A New Email.",
        });
      }
    } catch (error) {
      if (error.response) {

        if (error.response.status === 400) {
          setAlert({
            show: true,
            type: "danger",
            strongMessage: "Email Already Used!",
            message:
              "Please Enter A New Email.",
          });
        } else if (error.response.status === 401) {
          setAlert({
            show: true,
            type: "danger",
            strongMessage: "Unauthorized!",
            message:
              "You are not authorized to perform this action. Please check your credentials.",
          });
        } else {
          setAlert({
            show: true,
            type: "danger",
            strongMessage: "Oh snap!",
            message:
              error.response.data.message || "An unexpected error occurred.",
          });
        }
      } else if (error.request) {
        // The request was made but no response was received
        setAlert({
          show: true,
          type: "danger",
          strongMessage: "Oh snap!",
          message:
            "No response received from the server. Please try again later.",
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        setAlert({
          show: true,
          type: "danger",
          strongMessage: "Oh snap!",
          message: "An error occurred while setting up the request.",
        });
      }
      console.error(error);
    }
  };

  const navigate = useNavigate();
  const login = async () => {
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

    try {
      const response = await axios.post(summaryApi.login.url, {
        email: email,
        password: password,
      });

      const message = response.data.message;
      const token = response.data.token;
      console.log(response.data.message);

      if (response.status === 200) {
        setUser(response.data.user)
        setAlert({
          show: true,
          type: "primary",
          strongMessage: `Welcome Back ${response.data.email}! `,
          message: message,
        });
        localStorage.setItem("token", token);
        navigate("/"); // Use navigate for redirection
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setAlert({
            show: true,
            type: "danger",
            strongMessage: "Unauthorized ! ",
            message: "Invalid email or password. Please try again.",
          });
        } else {
          setAlert({
            show: true,
            type: "danger",
            strongMessage: "Oh snap!",
            message:
              error.response.data.message ||
              "An error occurred while trying to log in.",
          });
        }
      } else if (error.request) {
        setAlert({
          show: true,
          type: "danger",
          strongMessage: "Oh snap!",
          message:
            "No response received from the server. Please try again later.",
        });
      } else {
        setAlert({
          show: true,
          type: "danger",
          strongMessage: "Oh snap!",
          message: "An error occurred while setting up the request.",
        });
      }
      console.error(error);
    }
  };

  return (
    <>
      <div className="ste_thebody">
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

        <form className="stev_form stev_spaceform">
          <input
            id="stev_noaccount"
            name="radioaccount"
            type="radio"
            className="stev_radio stev_radio--invisible"
            defaultChecked
          />
          <input
            id="stev_account"
            name="radioaccount"
            type="radio"
            className="stev_radio stev_radio--invisible"
          />
          <div className="stev_form_background">
            <div className="stev_form-group stev_form-group--account">
              <h3 className="stev_form-group_title">Log in</h3>
              <input
                className="stev_form-group_input"
                type="email"
                placeholder="Email"
                name="loginEmail"
                value={loginData.Email}
                onChange={(e) =>
                  setLoginData({ ...loginData, Email: e.target.value })
                }
              />
              <p style={{ color: "red" }}>{loginError.EmailError}</p>
              <input
                className="stev_form-group_input"
                type="password"
                placeholder="Password"
                name="loginPassword"
                value={loginData.Password}
                onChange={(e) =>
                  setLoginData({ ...loginData, Password: e.target.value })
                }
              />
              <p style={{ color: "red" }}>{loginError.PasswordError}</p>
              <button
                className="stev_button stev_button--form"
                type="button"
                onClick={login}
                disabled={!isLoginFormValid()}
              >
                Log in
              </button>
            </div>
            <div className="stev_form-group stev_form-group--noaccount">
              <h3 className="stev_form-group_title">Sign up</h3>
              <input
                className="stev_form-group_input"
                type="text"
                placeholder="Full Name"
                name="Name"
                onChange={handleSignupChange}
              />
              <p style={{ color: "red" }}>{dataError.NameError}</p>
              <input
                className="stev_form-group_input"
                type="email"
                placeholder="Email"
                name="Email"
                onChange={handleSignupChange}
              />
              <p style={{ color: "red" }}>{dataError.EmailError}</p>
              <input
                className="stev_form-group_input"
                type="password"
                placeholder="Password"
                name="Password"
                onChange={handleSignupChange}
              />
              <p style={{ color: "red" }}>{dataError.PasswordError}</p>
              <input
                className="stev_form-group_input"
                type="password"
                placeholder="Confirm Password"
                name="ConfirmPassword"
                onChange={handleSignupChange}
              />
              <p style={{ color: "red" }}>{dataError.ConfirmPasswordError}</p>
              <input
                className="stev_form-group_input"
                type="date"
                name="Bdate"
                onChange={handleSignupChange}
              />
              <p style={{ color: "red" }}>{dataError.BdateError}</p>
              <select
                className="stev_form-group_input stev_country-select"
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
                className="stev_button stev_button--form"
                type="button"
                disabled={!isFormValid()}
                onClick={signup}
              >
                Sign up
              </button>
            </div>
          </div>
          <fieldset className="stev_fieldset stev_f1">
            <h2 className="stev_h2">Don't have an account?</h2>
            <p className="ste_p">We are delighted to have you With US!</p>
            <label htmlFor="stev_noaccount" className="stev_button">
              Signup
            </label>
          </fieldset>
          <fieldset className="stev_fieldset">
            <h2 className="stev_h2">Have an account?</h2>
            <p className="ste_p">Welcome Back Pal!</p>
            <label htmlFor="stev_account" className="stev_button">
              Login
            </label>
          </fieldset>
        </form>
      </div>
    </>
  );
}
