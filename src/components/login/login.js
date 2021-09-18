import React from "react";

const Login = ({ handleLogin, setName, setEmail }) => {
  const nameHandler = (event) => {
    setName(event.target.value);
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div>
      <p>
        Name:
        <input onChange={(e) => nameHandler(e)} />
      </p>
      <p>
        Email:
        <input onChange={(e) => emailHandler(e)} />
      </p>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
