import { initializeApp } from "firebase/app"
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"
import { addDoc, collection, getFirestore } from "firebase/firestore"
import { toast } from "react-toastify"

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
}
// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

// Signup function
const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user
    await addDoc(collection(db, "users"), {
      // Changed "user" to "users" for plural consistency
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    })
    toast.success("Sign up successful!") // Added success toast
  } catch (error) {
    console.error("Signup Error:", error) // Improved error logging
    toast.error(error.message || "Signup failed. Please try again.") // Enhanced error messaging
  }
}

// Login function
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
    toast.success("Login successful!") // Added success toast
  } catch (error) {
    console.error("Login Error:", error) // Improved error logging
    toast.error(error.message || "Login failed. Please check your credentials.") // Enhanced error messaging
  }
}

// Logout function
const logout = async () => {
  try {
    await signOut(auth)
    toast.success("Logout successful!") // Added success toast
  } catch (error) {
    console.error("Logout Error:", error) // Improved error logging
    toast.error(error.message || "Logout failed. Please try again.") // Enhanced error messaging
  }
}

export { auth, db, login, signup, logout }
