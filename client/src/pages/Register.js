import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { signInWithPopup } from "firebase/auth";
import {
  auth,
  googleProvider,
  facebookProvider,
  githubprovider,
} from "./Firebaseauth";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Registerpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [number, setNumber] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(number)) {
      toast.error("Phone number must contain exactly 10 digits.");
      return;
    }
    axios
      .post("http://localhost:5000/send-otp", { email, number })
      .then((response) => {
        toast.success("OTP sent successfully!");
        console.log(response.data);
        localStorage.setItem(
          "pendingUser",
          JSON.stringify({ email, password, username, number })
        );
        setTimeout(() => navigate("/otp-verification"), 2000);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Failed to send OTP");
      });
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user);
      toast.success("Google Sign-In Successful!");
      navigate("/Home");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const signInWithFacebook = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      console.log(result.user);
      toast.success("Facebook Sign-In Successful!");
      navigate("/Home");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const signInWithGithub = async () => {
    try {
      const result = await signInWithPopup(auth, githubprovider);
      console.log(result.user);
      toast.success("GitHub Sign-In Successful!");
      navigate("/Home");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
        fontFamily: "'Segoe UI', sans-serif",
        color: "white",
      }}
    >
      <ToastContainer />
      <motion.div
        className="p-4 rounded-4 shadow-lg"
        style={{
          width: "26rem",
          backgroundColor: "#1a2a33",
          boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
          animation: "slideUp 1s ease forwards",
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-center mb-4 fw-bold" style={{ color: "#22c55e" }}>
          SIGN UP
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                backgroundColor: "#0f2027",
                color: "white",
                border: "1px solid #22c55e",
              }}
            />
            <label htmlFor="username">Username</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="tel"
              className="form-control"
              id="phone"
              placeholder="Phone Number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
              style={{
                backgroundColor: "#0f2027",
                color: "white",
                border: "1px solid #22c55e",
              }}
            />
            <label htmlFor="phone">Phone Number</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                backgroundColor: "#0f2027",
                color: "white",
                border: "1px solid #22c55e",
              }}
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="form-floating mb-3 position-relative">
            <input
              type={isPasswordVisible ? "text" : "password"}
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                backgroundColor: "#0f2027",
                color: "white",
                border: "1px solid #22c55e",
              }}
            />
            <label htmlFor="password">Password</label>
            <button
              type="button"
              className="btn position-absolute top-50 end-0 translate-middle-y me-2"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              style={{
                background: "none",
                border: "none",
                color: "#22c55e",
              }}
            >
              {isPasswordVisible ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
          </div>

          <motion.button
            type="submit"
            className="btn w-100 fw-bold"
            style={{
              backgroundColor: "#22c55e",
              color: "#fff",
              border: "none",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up
          </motion.button>
        </form>

        <div className="text-center my-3 fw-bold">OR</div>

        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-danger" onClick={signInWithGoogle}>
            <FaGoogle />
          </button>
          <button className="btn btn-primary" onClick={signInWithFacebook}>
            <FaFacebook />
          </button>
          <button className="btn btn-dark" onClick={signInWithGithub}>
            <FaGithub />
          </button>
        </div>

        <div className="text-center mt-3">
          Already a User?{" "}
          <a className="fw-bold" href="/login" style={{ color: "#22c55e" }}>
            LOGIN
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Registerpage;