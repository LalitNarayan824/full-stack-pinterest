import React, { useState } from "react";
import "./authPage.css";
import ImageElement from "../../components/image/Image";
import apiRequest from "../../utils/apiRequest";
import { useNavigate } from "react-router";
import useAuthStore from "../../utils/authStore";

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  // Lazy loading background images isn't natively supported with CSS background-image.
  // However, you can achieve a similar effect by preloading the image in JavaScript,
  // then applying it once loaded. Here's how you can do it:

  const [bgLoaded, setBgLoaded] = useState(false);
  const naviagte = useNavigate()

  const {setCurrentUser} = useAuthStore();

  React.useEffect(() => {
    const img = new window.Image();
    img.src =
      "https://images.pexels.com/photos/3121302/pexels-photo-3121302.jpeg";
    img.onload = () => setBgLoaded(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // console.log(data);

    if (isRegister) {
      handleRegister(data);
    } else {
      handleLogin(data);
    }
  };

  const handleRegister = async(data)=>{
    const res = await apiRequest.post('/api/users/auth/register', data);
    // console.log(res);
    const user = res.data;
    setCurrentUser(user);
    alert("User Registered Successfully!")
    naviagte('/');
    // some code here
  }
  const handleLogin = async(data)=>{
    const res = await apiRequest.post('/api/users/auth/login', data);
    // console.log(res);
    const user = res.data;
    setCurrentUser(user);
    alert("User Logged In Successfully!")
    naviagte('/');
  }

  return (
    <div
      className="authPage"
      style={{
        backgroundImage: bgLoaded
          ? `url('https://images.pexels.com/photos/3121302/pexels-photo-3121302.jpeg')`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        transition: "background-image 0.3s ease",
      }}
    >
      <div className="authContainer">
        <ImageElement path="/general/logo.png" alt="" h={36} w={36} />
        {isRegister ? (
          <h1>Register your Account</h1>
        ) : (
          <h1>Login to your Account</h1>
        )}
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <div className="formElement">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username here"
                  required
                />
              </div>
              <div className="formElement">
                <label htmlFor="displayName">Name:</label>
                <input
                  type="text"
                  id="displayName"
                  name="displayName"
                  placeholder="Name here"
                  required
                />
              </div>
            </>
          )}
          <div className="formElement">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email here"
              required
            />
          </div>
          <div className="formElement">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password here"
              required
            />
          </div>
          {isRegister ? (
            <button type="submit" className="submitButton">
              Register
            </button>
          ) : (
            <button type="submit" className="submitButton">
              Login
            </button>
          )}
          {isRegister ? (
            <p onClick={() => setIsRegister((prev) => !prev)}>
              Already have an account? <b>Login</b>{" "}
            </p>
          ) : (
            <p onClick={() => setIsRegister((prev) => !prev)}>
              Don't have an account? <b>Register</b>{" "}
            </p>
          )}

          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
