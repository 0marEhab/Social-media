import React from "react";
import { Field, ErrorMessage } from "formik";

const TextField = ({ label, type = "text", name }) => {
  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="block text-sm font-medium mb-2 dark:text-white"
      >
        {label}
      </label>

      <Field
        id={name}
        name={name}
        type={type}
        className="w-full px-3 py-2 border rounded-md  focus:outline-primary"
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm "
      />
    </div>
  );
};

export default TextField;
