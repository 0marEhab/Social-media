import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "../../Components/FormFields/TextField";
import TextArea from "../../Components/FormFields/TextArea";
import MediaUploader from "../../Components/FormFields/MediaUploader";
import SubmitButton from "../../Components/FormFields/SubmitButton";
import axios from "axios";
import toast from "react-hot-toast";
import summaryApi from "../../../common";

const Ticket = () => {
  const [image, setImage] = useState(null);

  const initialValues = {
    name: "",
    email: "",
    message: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    setSubmitting(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("message", values.message);
    if (image) {
      const blob = await fetch(image).then((res) => res.blob());
      const file = new File([blob], "image.png", { type: "image/png" });
      formData.append("media", file);
    }
    try {
      await axios.post(summaryApi.createTicket.url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Ticket sent successfully!");
      resetForm();
      setImage(null);
    } catch (error) {
      toast.error("Something went wrong, Please try again later.");
      console.error("Error submitting ticket:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center p-4 sm:p-8 md:p-16 bg-bg dark:bg-[#0D0D0D]">
      <div className="w-full max-w-2xl mx-auto border rounded-xl shadow p-6 sm:p-8 md:p-10 bg-white dark:bg-darkBg">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 dark:text-white">
          Submit a Ticket
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:space-x-2 w-full space-y-4 sm:space-y-0">
                <div className="w-full sm:w-1/2">
                  <TextField label="Name" name="name" />
                </div>
                <div className="w-full sm:w-1/2">
                  <TextField label="Email" name="email" />
                </div>
              </div>

              <TextArea id="message" label="Message" />

              <label className="block text-sm font-medium mb-2 dark:text-white">
                Image
              </label>
              <MediaUploader uploadedFile={image} setUploadedFile={setImage} />

              <SubmitButton isSubmitting={isSubmitting} text="Submit Ticket" />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Ticket;
