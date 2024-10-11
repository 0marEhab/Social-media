<<<<<<< HEAD
import React, { useContext, useState, useEffect, useRef } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import SettingSideBar from "../../UI/SettingSideBar/SettingSideBar";
import UserContext from "../../Contexts/UserContext";
import Swal from "sweetalert2";

import summaryApi from "../../../common";

export default function Settings() {
  const [profilePic, setProfilePic] = useState(null);
  const { user } = useContext(UserContext);

  const fileInputRef = useRef(null);

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    birthday: "",
    country: "",
    linkedProfile: "",
  });

  useEffect(() => {
    if (user) {
      const formattedBirthday = user.birthDate
        ? new Date(user.birthDate).toISOString().split("T")[0]
        : "";
      setFormValues({
        name: user.name || "",
        email: user.email || "",
        birthday: formattedBirthday,
        country: user.country || "",
        linkedProfile: user.linkedProfile || "",
      });
      setProfilePic(user.profilePic);
    }
  }, [user]);

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.name.trim()) newErrors.name = "Name is required";
    if (!formValues.email.trim()) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formValues.email))
      newErrors.email = "Email is invalid";
    if (!formValues.birthday) newErrors.birthday = "Birthday is required";
    if (!formValues.country.trim()) newErrors.country = "Country is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("profilePic", file);

      try {
        const response = await axios.put(
          summaryApi.editProfilePic.url,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        window.location.reload();
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      }
    }
  };

  const handleDelete = async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to delete your account? This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ff5757",
        cancelButtonColor: "#53d769",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await axios.delete(summaryApi.deleteProfile.url, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });

            Swal.fire({
              icon: "success",
              title: "Account Deleted",
              text: "Your account has been successfully deleted. You will be redirected to the login page.",
              confirmButtonColor: "#53d769",
              confirmButtonText: "Login",
            }).then(() => {
              localStorage.removeItem("token"); // Remove token first
              window.location.href = "/signing"; // Redirect to signing page
            });
          } catch (error) {
            console.error("Error deleting account:", error);

            Swal.fire({
              icon: "error",
              title: "Error",
              text: "There was an error deleting your account. Please try again.",
              confirmButtonColor: "#ff5757",
            });
          }
        }
      });
    } catch (error) {
      console.error("Error deleting account:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an error deleting your account. Please try again.",
        confirmButtonColor: "#ff5757",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.put(
          summaryApi.editProfile.url,
          formValues,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // Show SweetAlert on success
        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          text: "Your profile has been successfully updated!",
          confirmButtonColor: "#53d769",
        });
      } catch (error) {
        console.error("Error updating profile:", error);
        // Show error alert
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "There was an error updating your profile. Please try again.",
          confirmButtonColor: "#ff5757",
        });
      }
    }
  };
  return (
    <div className="grid grid-cols-10 gap-10">
      <div className="col-span-10 lg:col-span-6 xl:col-span-7 p-5 md:p-10 bg-white shadow-lg rounded-lg">
        <p className=" mt-10  text-xl md:text-3xl font-semibold mb-8 text-center md:text-start text-gray-800">
          Account Information
        </p>
        <div className="flex flex-col my-10">
          <div className="flex flex-col md:flex-row gap-6 md:gap-14 items-center md:items-start">
            <div
              className="w-40 md:w-[160px] cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              <img
                className="w-full h-auto rounded-full shadow-md"
                src={summaryApi.domain.url + "/" + profilePic}
                alt="Profile"
              />
            </div>
            <div className="flex flex-col gap-4 md:gap-8">
              <p className="text-lg md:text-xl font-semibold text-gray-500">
                Profile Picture
              </p>
              <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="profilePicInput"
                  ref={fileInputRef}
                  onChange={handleProfilePicChange}
                />

                <button
                  className="flex items-center justify-center gap-2 text-lg w-full md:w-[200px] rounded-3xl h-12 md:h-14 border-2 text-[#ff5757]"
                  onClick={handleDelete}
                >
                  <RiDeleteBin6Line className="text-xl" />
                  Delete Account
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
                className="border p-3 rounded-lg w-[300px]"
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleInputChange}
                className="border p-3 rounded-lg w-[300px]"
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
                className="border p-3 rounded-lg w-[300px]"
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
                className="border p-3 rounded-lg w-[300px]"
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
                className="border p-3 rounded-lg w-[300px]"
              />
            </div>

            <div className="flex justify-start items-start w-[400px]">
              <button
                type="submit"
                className="bg-[#53d769] text-white font-bold w-full md:w-[200px] h-[50px] rounded-full"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
      <SettingSideBar />
    </div>
  );
}
=======
import React, { useContext, useState, useEffect, useRef } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import SettingSideBar from "../../UI/SettingSideBar/SettingSideBar";
import UserContext from "../../Contexts/UserContext";
import Swal from "sweetalert2";

import summaryApi from "../../../common";

export default function Settings() {
  const [profilePic, setProfilePic] = useState(null);
  const { user } = useContext(UserContext);

  const fileInputRef = useRef(null);

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    birthday: "",
    country: "",
    linkedProfile: "",
  });

  useEffect(() => {
    if (user) {
      const formattedBirthday = user.birthDate
        ? new Date(user.birthDate).toISOString().split("T")[0]
        : "";
      setFormValues({
        name: user.name || "",
        email: user.email || "",
        birthday: formattedBirthday,
        country: user.country || "",
        linkedProfile: user.linkedProfile || "",
      });
      setProfilePic(user.profilePic);
    }
  }, [user]);

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.name.trim()) newErrors.name = "Name is required";
    if (!formValues.email.trim()) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formValues.email))
      newErrors.email = "Email is invalid";
    if (!formValues.birthday) newErrors.birthday = "Birthday is required";
    if (!formValues.country.trim()) newErrors.country = "Country is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("profilePic", file);

      try {
        const response = await axios.put(
          summaryApi.editProfilePic.url,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        window.location.reload();
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      }
    }
  };

  const handleDelete = async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to delete your account? This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ff5757",
        cancelButtonColor: "#53d769",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await axios.delete(summaryApi.deleteProfile.url, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });

            Swal.fire({
              icon: "success",
              title: "Account Deleted",
              text: "Your account has been successfully deleted. You will be redirected to the login page.",
              confirmButtonColor: "#53d769",
              confirmButtonText: "Login",
            }).then(() => {
              localStorage.removeItem("token"); // Remove token first
              window.location.href = "/signing"; // Redirect to signing page
            });
          } catch (error) {
            console.error("Error deleting account:", error);

            Swal.fire({
              icon: "error",
              title: "Error",
              text: "There was an error deleting your account. Please try again.",
              confirmButtonColor: "#ff5757",
            });
          }
        }
      });
    } catch (error) {
      console.error("Error deleting account:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an error deleting your account. Please try again.",
        confirmButtonColor: "#ff5757",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.put(
          summaryApi.editProfile.url,
          formValues,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // Show SweetAlert on success
        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          text: "Your profile has been successfully updated!",
          confirmButtonColor: "#53d769",
        });
      } catch (error) {
        console.error("Error updating profile:", error);
        // Show error alert
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "There was an error updating your profile. Please try again.",
          confirmButtonColor: "#ff5757",
        });
      }
    }
  };
  return (
    <div className="grid grid-cols-10 gap-10">
      <div className="col-span-10 lg:col-span-6 xl:col-span-7 p-5 md:p-10 bg-white shadow-lg rounded-lg">
        <p className="text-xl md:text-3xl font-semibold mb-8 text-center md:text-start text-gray-800">
          Account Information
        </p>
        <div className="flex flex-col my-10">
          <div className="flex flex-col md:flex-row gap-6 md:gap-14 items-center md:items-start">
            <div
              className="w-40 md:w-[160px] cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              <img
                className="w-full h-auto rounded-full shadow-md"
                src={summaryApi.domain.url + "/" + profilePic}
                alt="Profile"
              />
            </div>
            <div className="flex flex-col gap-4 md:gap-8">
              <p className="text-lg md:text-xl font-semibold text-gray-500">
                Profile Picture
              </p>
              <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="profilePicInput"
                  ref={fileInputRef}
                  onChange={handleProfilePicChange}
                />

                <button
                  className="flex items-center justify-center gap-2 text-lg w-full md:w-[200px] rounded-3xl h-12 md:h-14 border-2 text-[#ff5757]"
                  onClick={handleDelete}
                >
                  <RiDeleteBin6Line className="text-xl" />
                  Delete Account
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
                className="border p-3 rounded-lg w-[300px]"
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleInputChange}
                className="border p-3 rounded-lg w-[300px]"
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
                className="border p-3 rounded-lg w-[300px]"
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
                className="border p-3 rounded-lg w-[300px]"
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
                className="border p-3 rounded-lg w-[300px]"
              />
            </div>

            <div className="flex justify-start items-start w-[400px]">
              <button
                type="submit"
                className="bg-[#53d769] text-white font-bold w-full md:w-[200px] h-[50px] rounded-full"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
      <SettingSideBar />
    </div>
  );
}
>>>>>>> feature/admin
