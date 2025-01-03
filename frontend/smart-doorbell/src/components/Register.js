import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope, FaKey, FaAngleRight } from "react-icons/fa";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (firstName && lastName && username && email && password && deviceId && termsAccepted) {
      // Navigate to welcome-back page with username in state
      navigate("/welcome-back", { state: { username } });
    } else {
      alert("Please fill in all fields and accept the terms and conditions.");
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="form-box register">
          <form onSubmit={handleRegister}>
            <h2>Registration</h2>
            <div className="input-box">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <FaAngleRight className="icon" />
            </div>
            <div className="input-box">
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <FaAngleRight className="icon" />
            </div>
            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FaEnvelope className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FaLock className="icon" />
            </div>
            <div className="input-box">
              <input
                type="text"
                placeholder="Device ID"
                value={deviceId}
                onChange={(e) => setDeviceId(e.target.value)}
                required
              />
              <FaKey className="icon" />
            </div>
            <div className="remember-forgot-register">
              <label>
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />{" "}
                I agree to the terms & conditions
              </label>
            </div>
            <button type="submit">Register</button>
          </form>
          <div className="login-link">
            <p>
              Already have an account? <a href="/Login">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
