import "./App.css";

import React, { useState, useEffect } from "react";
import Login from "./components/login/login";
import postServices from "./controllers/posts";
import PostList from "./components/post/postList";

function App() {
  const [data, setData] = useState();
  const [posts, setPosts] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, []);

  //Reminder: will need to define errors more precisely

  const handleLogin = () => {
    window.localStorage.setItem("email", email);
    window.localStorage.setItem("name", name);
    fetchData();
    fetchPosts();
  };

  const fetchData = async () => {
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
      } catch (error) {
        console.log("error sending the post request");
      }
    else {
      console.log("error in name and email");
    }
  };

  const fetchPosts = async () => {
    console.log(
      "checking the localstorage token",
      window.localStorage.getItem("sl_token")
    );
    if (window.localStorage.getItem("sl_token")) {
      try {
        let dataList = await postServices.getPosts(
          window.localStorage.getItem("sl_token"),
          pageNumber
        );
        setData(dataList);
        setPosts(dataList.data.posts);

        console.log(dataList);

        console.log("Posts to show are", dataList.data.posts);
      } catch (error) {
        console.log("error sending the get request");
      }
    } else {
      console.log("no local storage");
    }
  };

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
