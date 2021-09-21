import "./App.css";
import React, { useState, useEffect } from "react";
import Login from "./components/login/login";
import postServices from "./controllers/posts";
import PostList from "./components/post/postList";

function App() {
  const [data, setData] = useState(null);
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    window.localStorage.setItem("email", email);
    window.localStorage.setItem("name", name);

    if (
      window.localStorage.getItem("name") &&
      window.localStorage.getItem("email")
    )
      try {
        let datas = await postServices.create(
          window.localStorage.getItem("name"),
          window.localStorage.getItem("email")
        );

        window.localStorage.setItem("sl_token", datas.data.sl_token);
        setName("");
        setEmail("");
      } catch (error) {
        window.localStorage.clear();
        alert(
          "Error sending the post request. Check your internet conncection and try to log in again"
        );
      }

    fetchPosts();
  };

  const fetchPosts = async () => {
    if (window.localStorage.getItem("sl_token")) {
      try {
        const dataList = await postServices.getAllPosts(
          window.localStorage.getItem("sl_token")
        );
        setData(dataList);
      } catch (error) {
        window.localStorage.clear();
        alert(
          "The Sl_token is not correct or the token has expired. Please reload the page to login"
        );
        window.location.reload();
      }
    }
  };

  if (data === null && !window.localStorage.getItem("sl_token"))
    return (
      <div className="App">
        <h1>Supermetrics Assignment</h1>
        <Login
          handleLogin={handleLogin}
          setName={setName}
          setEmail={setEmail}
          setData={setData}
        />
      </div>
    );
  else if (data === null && window.localStorage.getItem("sl_token"))
    return <p>loading...</p>;
  else return <PostList data={data} setData={setData} />;
}

export default App;
