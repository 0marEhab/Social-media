import React from "react";
import { Field, ErrorMessage } from "formik";

const TextArea = ({ id, label }) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium mb-2 dark:text-white"
      >
        {label}
      </label>
      <Field
        as="textarea"
        id={id}
        name={id}
        rows={6}
        className="w-full px-3 py-2 border rounded-md focus:outline-primary"
      />
      <ErrorMessage
        name={id}
        component="div"
        className="text-red-500 text-sm"
      />
    </div>
  );
};

export default TextArea;
