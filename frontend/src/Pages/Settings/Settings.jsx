import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import SettingSideBar from "../../UI/SettingSideBar/SettingSideBar";

export default function Settings() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Form state
  const [formValues, setFormValues] = useState({
    name: "",
    username: "",
    email: "",
    birthday: "",
    country: "",
    linkedProfile: "",
  });

  // Error state
  const [errors, setErrors] = useState({});

  const handleReplaceClick = () => {
    setIsButtonDisabled(false);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.name.trim()) newErrors.name = "Name is required";
    if (!formValues.username.trim())
      newErrors.username = "Username is required";
    if (!formValues.email.trim()) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formValues.email))
      newErrors.email = "Email is invalid";
    if (!formValues.birthday) newErrors.birthday = "Birthday is required";
    if (!formValues.country.trim()) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formValues);
      // Further submit logic
    }
  };

  return (
    <div className="grid grid-cols-10 gap-10">
      <div className="col-span-10 lg:col-span-6 xl:col-span-7 p-5 md:p-10 bg-white shadow-lg rounded-lg">
        <p className="text-xl md:text-3xl font-semibold mb-8 text-gray-800">
          Account Information
        </p>
        <div className="flex flex-col my-10">
          <div className="flex flex-col md:flex-row gap-6 md:gap-14 items-center md:items-start">
            <div className="w-40 md:w-[160px]">
              <img
                className="w-full h-auto rounded-full shadow-md"
                src="/profile.png"
                alt="Profile"
              />
            </div>
            <div className="flex flex-col gap-4 md:gap-8">
              <p className="text-lg md:text-xl font-semibold text-gray-500">
                Profile Picture
              </p>
              <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                <button
                  className="w-full md:w-[200px] font-bold text-white h-12 md:h-14 rounded-full bg-[#79d0f1] hover:bg-[#67b3d1] transition duration-300 shadow-md"
                  onClick={handleReplaceClick}
                >
                  Replace
                </button>
                <button
                  className={`flex items-center justify-center gap-2 text-lg w-full md:w-[200px] h-12 md:h-14 border-2 text-[#ff5757] font-bold border-gray-400 rounded-full hover:bg-slate-100 transition duration-300 shadow-md ${
                    isButtonDisabled ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  disabled={isButtonDisabled}
                >
                  <RiDeleteBin6Line className="text-xl" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="text-xl md:text-3xl font-semibold mb-8 text-gray-800">
            Basic Information
          </p>
          <form onSubmit={handleSubmit} className="flex gap-5 flex-wrap">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formValues.name}
                onChange={handleInputChange}
                className={`border p-3 rounded-lg w-[400px] focus:ring-2 focus:ring-[#79d0f1] outline-none transition-shadow shadow-md ${
                  errors.country ? "border-red-500" : ""
                } ${isButtonDisabled ? "cursor-not-allowed opacity-50" : ""}`}
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>

            <div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formValues.username}
                onChange={handleInputChange}
                className={`border p-3 rounded-lg w-[400px] focus:ring-2 focus:ring-[#79d0f1] outline-none transition-shadow shadow-md ${
                  errors.country ? "border-red-500" : ""
                } ${isButtonDisabled ? "cursor-not-allowed opacity-50" : ""}`}
              />
              {errors.username && (
                <p className="text-red-500">{errors.username}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleInputChange}
                className={`border p-3 rounded-lg w-[400px] focus:ring-2 focus:ring-[#79d0f1] outline-none transition-shadow shadow-md ${
                  errors.country ? "border-red-500" : ""
                } ${isButtonDisabled ? "cursor-not-allowed opacity-50" : ""}`}
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>

            <div>
              <input
                type="date"
                name="birthday"
                placeholder="Birthday"
                value={formValues.birthday}
                onChange={handleInputChange}
                className={`border p-3 rounded-lg w-[400px] focus:ring-2 focus:ring-[#79d0f1] outline-none transition-shadow shadow-md ${
                  errors.country ? "border-red-500" : ""
                } ${isButtonDisabled ? "cursor-not-allowed opacity-50" : ""}`}
              />
              {errors.birthday && (
                <p className="text-red-500">{errors.birthday}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formValues.country}
                onChange={handleInputChange}
                className={`border p-3 rounded-lg w-[400px] focus:ring-2 focus:ring-[#79d0f1] outline-none transition-shadow shadow-md ${
                  errors.country ? "border-red-500" : ""
                } ${isButtonDisabled ? "cursor-not-allowed opacity-50" : ""}`}
              />
              {errors.country && (
                <p className="text-red-500">{errors.country}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                name="linkedProfile"
                placeholder="Linked Profile"
                value={formValues.linkedProfile}
                onChange={handleInputChange}
                className={`border p-3 rounded-lg w-[400px] focus:ring-2 focus:ring-[#79d0f1] outline-none transition-shadow shadow-md
                  ${isButtonDisabled ? "cursor-not-allowed opacity-50" : ""}`}
              />
            </div>

            <button
              type="submit"
              className={`bg-[#53d769] font-bold w-[200px] h-[50px] rounded-full transition duration-200 hover:bg-[#3f9e4f] shadow-md hover:text-white ${
                isButtonDisabled ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
      <SettingSideBar />
    </div>
  );
}
