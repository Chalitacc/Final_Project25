import { useState } from "react";

export const useSignUpValidation = () => {
  const [errors, setErrors] = useState({});
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).{8,}$/;

  const validate = (values) => {
    let newErrors = {};

    if (!values.firstname.trim()) {
      newErrors.firstname = "First name is required!";
    }

    if (!values.lastname.trim()) {
      newErrors.lastname = "Lastname is required!";
    }

    if (!values.email.trim()) {
      newErrors.email = "Email is required!";
    } else if (!emailRegex.test(values.email)) {
      newErrors.email = "Please enter a valid e-mail adress";
    }

    if (!values.password.trim()) {
      newErrors.password = "Password is required!";
    } else if (values.password.trim().length < 8) {
      newErrors.password = "Password must be minimum 8 charachteres";
    } else if (!passwordRegex.test(values.password)) {
      newErrors.password =
        "Password must include uppercase, lowercase, number and a special character";
    } else if (values.password.trim() !== values.confirmPassword.trim()) {
      newErrors.password = "Password do not match!";
      newErrors.confirmPassword = "Password do not match!";
    }

    if (!values.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please re-enter password!";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  return { validate, errors };
};
