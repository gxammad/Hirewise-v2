"use client";

import { useFormik } from "formik";
import { contactSchema } from "./validation-schema";
import ErrorMsg from "./error-msg";
import toast from "react-hot-toast";
import { User, Mail, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const ContactForm = () => {
  const handleOnSubmit = async (values, { resetForm }) => {
    let toastId = toast.loading("Sending message...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      toast.dismiss(toastId);

      if (response.ok) {
        toast.success("We have got you!");
        resetForm();
      } else {
        const data = await response.json();
        toast.error(data.error || "Something went wrong");
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    values,
    touched,
  } = useFormik({
    initialValues: { name: "", email: "", msg: "" },
    validationSchema: contactSchema,
    onSubmit: handleOnSubmit,
  });

  return (
    <motion.form
      onSubmit={handleSubmit}
      id="comment-form"
      className="space-y-6 max-w-3xl mx-auto px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* Name + Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-group">
          <label className="flex items-center text-gray-700 dark:text-gray-300 mb-2">
            <User className="mr-2" size={20} /> Full Name
          </label>
          <input
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            id="name"
            name="name"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-blue-500 
              dark:bg-gray-800 dark:text-white"
            placeholder="Your Full Name"
            required
          />
          {touched.name && <ErrorMsg error={errors.name} />}
        </div>

        <div className="form-group">
          <label className="flex items-center text-gray-700 dark:text-gray-300 mb-2">
            <Mail className="mr-2" size={20} /> Email
          </label>
          <input
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            id="email"
            name="email"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-blue-500 
              dark:bg-gray-800 dark:text-white"
            placeholder="Your Email"
            required
          />
          {touched.email && <ErrorMsg error={errors.email} />}
        </div>
      </div>

      {/* Message */}
      <div className="form-group">
        <label className="flex items-center text-gray-700 dark:text-gray-300 mb-2">
          <MessageSquare className="mr-2" size={20} /> Message
        </label>
        <textarea
          value={values.msg}
          onChange={handleChange}
          onBlur={handleBlur}
          name="msg"
          id="comments"
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-blue-500 
            dark:bg-gray-800 dark:text-white"
          rows={4}
          placeholder="Write Your Message"
          required
        />
        {touched.msg && <ErrorMsg error={errors.msg} />}
      </div>

      {/* Submit */}
      <div className="form-group text-center">
        <button
          type="submit"
          className="px-6 py-3 border border-gray-800 bg-transparent text-gray-800 
            font-semibold rounded-lg hover:bg-gray-800 hover:text-gray-200 
            dark:border-gray-200 dark:bg-transparent dark:text-gray-200 
            dark:hover:bg-gray-200 dark:hover:text-gray-800 
            transition-colors duration-300"
        >
          Send Message
        </button>
      </div>
    </motion.form>
  );
};

export default ContactForm;
