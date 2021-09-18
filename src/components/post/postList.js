import React, { useState, useEffect } from "react";
import "./postList.css";
export default function PostList({ data, posts, setData }) {
  console.log("data from postList is", data);

  const [showPostList, setShowPostList] = useState(false);
  const [userPostList, setuserPostList] = useState([]);

  console.log("posts from the other comp is", posts);

  let postlists = data.data.posts.sort(function (a, b) {
    return new Date(b.created_time) - new Date(a.created_time);
  });

  let countedNames = postlists.reduce(function (allNames, name) {
    if (name.from_name in allNames) {
      allNames[name.from_name]++;
    } else {
      allNames[name.from_name] = 1;
    }
    return allNames;
  }, {});

  const Userhandle = (name) => {
    setShowPostList(true);
    setuserPostList(postlists.filter((posts) => posts.from_name === name));
  };

  const handleOldFirst = () => {
    postlists = postlists.sort(function (a, b) {
      return new Date(a.created_time) - new Date(b.created_time);
    });
    console.log("Old posts lists ", postlists);
  };

  console.log("user post lists is ", userPostList);

  const logout = () => {
    window.localStorage.clear();
    setData("");
  };

  return (
    <div className="Postlist">
      <div className="User">
        <button onClick={() => logout()}>logout </button>
        <h2>All names are</h2>
        {Object.keys(countedNames)
          .sort(function (a, b) {
            return b - a;
          })
          .map((names) => (
            <div className="Postcard">
              <p>
                <button
                  className="Userbutton"
                  onClick={() => Userhandle(names)}
                >
                  {names}
                  <span className="Post">
                    {
                      postlists.filter((users) => users.from_name === names)
                        .length
                    }
                  </span>
                </button>
              </p>
            </div>
          ))}
      </div>

      <div className="Post">
        <button onClick={() => handleOldFirst()}>Recent first</button>
        <button onClick={() => handleOldFirst()}>Oldest first</button>
        {!showPostList
          ? postlists.map((posts) => (
              <div className="Postcard">
                <p>{posts.created_time}</p>
                <p>{posts.message}</p>
                <p>{posts.from_name}</p>
              </div>
            ))
          : userPostList.map((posts) => (
              <div className="Postcard">
                <p>{posts.created_time}</p>
                <p>{posts.message}</p>
                <p>{posts.from_name}</p>
              </div>
            ))}
      </div>
    </div>
  );
}
