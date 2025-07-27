// src/pages/Login.jsx
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, facebookProvider, githubprovider } from "./Firebaseauth";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Loginpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [role, setRole] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from?.pathname || "/courses";

const handleSubmit = (e) => {
  e.preventDefault();

  axios
    .post("http://localhost:5000/login", { email, password })
    .then((res) => {
      toast.success("Login successful! 🎉", { position: "top-right" });

      const { role } = res.data;

      // ✅ Store login status and role
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      localStorage.setItem("role", role); // 👈 Store role too

      setEmail("");
      setPassword("");

      // ✅ Redirect based on role
      setTimeout(() => {
        if (role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/courses"); // or any user page
        }
      }, 2000);
    })
    .catch((err) => {
      toast.error(err.response?.data?.message || "Login failed!", {
        position: "top-right",
      });
    });
};



const handleSocialLogin = async (provider, providerName) => {
  try {
    const result = await signInWithPopup(auth, provider);
    const email = result.user.email;

    // 🔐 Store user in localStorage for authentication
    localStorage.setItem("user", JSON.stringify({ email }));

    toast.success(`${providerName} Login successful! 🎉`, { position: "top-right" });

    setTimeout(() => navigate(redirectPath), 2000);
  } catch (error) {
    toast.error(error.message, { position: "top-right" });
  }
};


  return (
    <div className="vh-100 d-flex align-items-center justify-content-center"
      style={{
        fontFamily: "'Segoe UI', sans-serif",
        background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
        color: "#ffffff",
      }}>
      <ToastContainer />
      <motion.div
        className="card p-4 login-card"
        style={{ width: "24rem" }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-center mb-4 fw-bold">LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
            />
            <label htmlFor="password">Password</label>
            <button
              type="button"
              className="btn position-absolute top-50 end-0 translate-middle-y me-2"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              style={{ background: "none", border: "none", color: "#22c55e" }}
            >
              {isPasswordVisible ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
          </div>
          <div className="form-floating mb-3">
            <select
              className="form-select"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <label htmlFor="role">Role</label>
          </div>
          <motion.button
            type="submit"
            className="btn btn-success w-100 fw-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </form>
        <div className="text-center mt-2">
          <a href="/forgot-password" className="fw-bold">
            Forgot Password?
          </a>
        </div>
        <div className="text-center my-3 fw-bold">OR</div>
        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-danger" onClick={() => handleSocialLogin(googleProvider, "Google")}>
            <FaGoogle />
          </button>
          <button className="btn btn-primary" onClick={() => handleSocialLogin(facebookProvider, "Facebook")}>
            <FaFacebook />
          </button>
          <button className="btn btn-dark" onClick={() => handleSocialLogin(githubprovider, "GitHub")}>
            <FaGithub />
          </button>
        </div>
        <div className="text-center mt-3">
          Need an Account? <a className="fw-bold" href="/register">SIGN UP</a>
        </div>
      </motion.div>
    </div>
  );
};

export default Loginpage;
