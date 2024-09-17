import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "../../Components/FormFields/TextField";
import TextArea from "../../Components/FormFields/TextArea";
import MediaUploader from "../../Components/FormFields/MediaUploader";
import SubmitButton from "../../Components/FormFields/SubmitButton";
import axios from "axios";
import toast from "react-hot-toast";

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
      await axios.post(
        `${import.meta.env.VITE_API_URL}/createTicket`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
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
    <div className="w-full min-h-screen flex justify-center items-center p-16">
      <div className="w-2/3 mx-auto border rounded-xl shadow p-8 bg-white">
        <h2 className="text-2xl font-semibold mb-4">Submit a Ticket</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div className="flex items-start space-x-2 w-full">
                <div className="w-1/2">
                  <TextField label="Name" name="name" />
                </div>
                <div className="w-1/2">
                  <TextField label="Email" name="email" />
                </div>
              </div>

              <TextArea id="message" label="Message" />

              <label className="block text-sm font-medium mb-2">Image</label>
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
