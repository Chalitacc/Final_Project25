import { useState } from "react";

const useConctactValidation = () => {
  const [contactErrors, setContactErrors] = useState({});
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateContactForm = (values) => {
    let newErrors = {};

    if (!values.firstname.trim()) {
      newErrors.firstname = "First name is required";
    }
    if (!values.lastname.trim()) {
      newErrors.lastname = "Last name is required";
    }
    if (!values.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (values.phoneNumber && values.phoneNumber.trim().length !== 8) {
      newErrors.phoneNumber = "Phone number must be 8 digits";
    }
    if (!values.topic.trim()) {
      newErrors.topic = " Topic of message is required";
    }
    if (!values.message.trim()) {
      newErrors.message = "Message is required";
    }
    setContactErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateMessageLength = (value, maxLength) => {
    setContactErrors((prevErrors) => ({
      ...prevErrors,
      message:
        value.trim().length >= maxLength
          ? `Maximum charachters allowed is ${maxLength}`
          : "",
    }));
  };
  return {
    contactErrors,
    validateContactForm,
    validateMessageLength,
  };
};

export default useConctactValidation;
