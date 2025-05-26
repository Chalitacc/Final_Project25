import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebaseConfig";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [signUpError, setSignUpError] = useState(null);

  const signUp = async (email, password) => {
    console.log("signing up with", email, password);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      sendEmailVerification(userCredential.user);
      setUser(user);
      setSignUpError(null);
      return userCredential;
    } catch (error) {
      console.log("firebase error message", error.code);
      console.log("firebase error message", error.message);
      setSignUpError(error.message);
      throw error;
    }
  };
  return { user, signUp, signUpError };
};
