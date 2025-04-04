// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPhoneNumber,RecaptchaVerifier  } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzDzmYdyn7TbGvYyIIMHBLr0LS6pgiy5c",
  authDomain: "bus-booking-59069.firebaseapp.com",
  projectId: "bus-booking-59069",
  storageBucket: "bus-booking-59069.firebasestorage.app",
  messagingSenderId: "534840263950",
  appId: "1:534840263950:web:b9cb16fa4685b4b9be435f",
  measurementId: "G-8QRXVTM97D"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithPhoneNumber,RecaptchaVerifier  };