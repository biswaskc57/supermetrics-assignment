import { useRadioGroup } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./postList.css";
export default function PostList({ data, posts, setData }) {
  const [showUserPostList, setShowUserPostList] = useState(false);
  const [showPostReverse, setShowPostReverse] = useState(true);
  const [showUserReverse, setShowUserReverse] = useState(true);
  const [userPostList, setuserPostList] = useState([]);
  const [filter, setFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");

  let countedNames = data.reduce(function (allNames, name) {
    if (name.from_name in allNames) {
      allNames[name.from_name]++;
    } else {
      allNames[name.from_name] = 1;
    }
    return allNames;
  }, {});

  const userNames = Object.keys(countedNames);

  const userNameList = () => {
    return !userFilter
      ? showUserReverse
        ? userNames.sort()
        : userNames.sort().reverse()
      : showUserReverse
      ? userNames.sort().filter((names) => names.includes(userFilter))
      : userNames
          .sort()
          .filter((names) => names.includes(userFilter))
          .reverse();
  };

  const userList = () => {
    console.log("filter is", filter);
    return !filter
      ? showPostReverse
        ? userPostList.sort(function (a, b) {
            return new Date(b.created_time) - new Date(a.created_time);
          })
        : userPostList.sort(function (a, b) {
            return new Date(a.created_time) - new Date(b.created_time);
          })
      : showPostReverse
      ? userPostList
          .filter((data) =>
            data.message.toLowerCase().includes(filter.toLowerCase())
          )
          .sort(function (a, b) {
            return new Date(b.created_time) - new Date(a.created_time);
          })
      : userPostList
          .filter((data) =>
            data.message.toLowerCase().includes(filter.toLowerCase())
          )
          .sort(function (a, b) {
            return new Date(a.created_time) - new Date(b.created_time);
          });
  };

  const Userhandle = (name) => {
    setuserPostList(data.filter((posts) => posts.from_name === name));

    setShowUserPostList(true);
    console.log("filter is", filter);

    setuserPostList(data.filter((posts) => posts.from_name === name));
  };

  const logout = () => {
    window.localStorage.clear();
    setData("");
  };

  const postList = () => {
    return showPostReverse
      ? data.sort(function (a, b) {
          return new Date(b.created_time) - new Date(a.created_time);
        })
      : data.sort(function (a, b) {
          return new Date(a.created_time) - new Date(b.created_time);
        });
  };

  return (
    <div className="Postlist">
      <div className="User">
        <button onClick={() => logout()}>logout </button>

        <h2>All names are</h2>
        <input onChange={(event) => setUserFilter(event.target.value)}></input>
        <button onClick={() => setShowUserReverse(true)}>Recent first</button>
        <button onClick={() => setShowUserReverse(false)}>Oldest first</button>

        {userNameList().map((names) => (
          <div className="Postcard">
            <p>
              <button className="Userbutton" onClick={() => Userhandle(names)}>
                {names}
                <span className="Post">
                  {data.filter((users) => users.from_name === names).length}
                </span>
              </button>
            </p>
          </div>
        ))}
      </div>

      <div className="Post">
        <p>search</p>{" "}
        <input onChange={(event) => setFilter(event.target.value)}></input>
        <button onClick={() => setShowPostReverse(true)}>Recent first</button>
        <button onClick={() => setShowPostReverse(false)}>Oldest first</button>
        {!showUserPostList
          ? postList().map((posts) => (
              <div className="Postcard">
                <p>{posts.created_time}</p>
                <p>{posts.message}</p>
                <p>{posts.from_name}</p>
              </div>
            ))
          : userList().map((posts) => (
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
