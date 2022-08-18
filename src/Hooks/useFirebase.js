import { useEffect } from "react";
import { useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import auth from "../firebase.init";

const useFirebase = () => {
    const [user, setUser] = useState({});

    const signInWithEmail = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            setUser(user);
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    };

    const userSignOut = () => {
        signOut(auth).then(() => {
            console.log("Successfully Signed Out");
          }).catch((error) => {
            console.log(error);
          });
    }
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
    }, [user]);

  return {
    user,
    signInWithEmail,
    userSignOut,
  };
};

export default useFirebase;
