import "./App.css";

import React, { useState, useEffect } from "react";
import Login from "./components/login/login";
import postServices from "./controllers/posts";
import PostList from "./components/post/postList";

function App() {
  const [data, setData] = useState();
  const [posts, setPosts] = useState();
  const [token, setToken] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [pageNumber, setPageNumber] = useState(1);

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
        console.log(datas);
        console.log("The data is", datas);
        window.localStorage.setItem("sl_token", datas.data.sl_token);
        setToken(datas.data.sl_token);
        setName("");
        setEmail("");
      } catch (error) {
        console.log("error sending the post request");
      }
    else {
      console.log("error in name and email");
    }

    fetchPosts();
  };

  const fetchPosts = async () => {
    if (window.localStorage.getItem("sl_token")) {
      try {
        let dataList = await postServices.getAllPosts(
          window.localStorage.getItem("sl_token")
        );
        setData(dataList);
        console.log(data);
      } catch (error) {
        console.log("error sending the get request");
      }
    } else {
      console.log("no local storage");
    }
  };
  console.log("the data in app page is", data);
  if (!data)
    return (
      <div className="App">
        Supermetrics ASSIGNMENT
        <Login
          handleLogin={handleLogin}
          setName={setName}
          setEmail={setEmail}
          setData={setData}
        />
      </div>
    );
  return (
    <PostList data={data} setPosts={setPosts} posts={posts} setData={setData} />
  );
}

export default App;
