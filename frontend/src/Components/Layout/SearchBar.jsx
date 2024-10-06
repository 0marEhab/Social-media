import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ value = "" }) {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      search: value,
    },
    validationSchema: Yup.object({
      search: Yup.string().required("Search term is required"),
    }),
    onSubmit: (values) => {
      navigate(`/search-results?query=${values.search}`);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="my-5">
      <div className=" bg-white text-gray-400 rounded-2xl px-2 py-2 w-[500px] flex space-x-4 items-center justify-between">
        <FontAwesomeIcon icon={faSearch} />
        <input
          className="w-full outline-none focus:outline-none"
          type="text"
          name="search"
          placeholder="Search in social..."
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.search}
        />

        <p className="font-semibold uppercase text-sm tracking-[1.00px]">
          Filters
        </p>
      </div>
      {formik.touched.search && formik.errors.search ? (
        <div className="text-red-500 text-sm mb-2">{formik.errors.search}</div>
      ) : null}
    </form>
  );
}
