import React from "react";
import "./login.css";
const Login = ({ handleLogin, setName, setEmail }) => {
  const nameHandler = (event) => {
    setName(event.target.value);
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div className="login">
      <form className="login-box" onSubmit={handleLogin}>
        <p>
          Name:
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => nameHandler(e)}
            className="login-input"
          />
        </p>
        <p>
          Email:
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => emailHandler(e)}
            className="login-input"
          />
        </p>
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
