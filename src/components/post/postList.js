import React, { useState } from "react";
import "./postList.css";

export default function PostList({ data, setData }) {
  const [showUserPostList, setShowUserPostList] = useState(false);
  const [showPostReverse, setShowPostReverse] = useState(true);
  const [showUserReverse, setShowUserReverse] = useState(true);
  const [userPostList, setuserPostList] = useState([]);
  const [filter, setFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");

  const userNames = () =>
    Object.keys(
      data.reduce((allNames, name) => {
        if (name.from_name in allNames) {
          allNames[name.from_name]++;
        } else {
          allNames[name.from_name] = 1;
        }
        return allNames;
      }, {})
    );

  const userNameList = () => {
    return !userFilter
      ? showUserReverse
        ? userNames().sort()
        : userNames().sort().reverse()
      : showUserReverse
      ? userNames()
          .sort()
          .filter((names) =>
            names.toLowerCase().includes(userFilter.toLowerCase())
          )
      : userNames()
          .sort()
          .filter((names) =>
            names.toLowerCase().includes(userFilter.toLowerCase())
          )
          .reverse();
  };

  const userPosts = () => {
    return !filter
      ? showPostReverse
        ? userPostList.sort((a, b) => {
            return new Date(b.created_time) - new Date(a.created_time);
          })
        : userPostList.sort((a, b) => {
            return new Date(a.created_time) - new Date(b.created_time);
          })
      : showPostReverse
      ? userPostList
          .filter((data) =>
            data.message.toLowerCase().includes(filter.toLowerCase())
          )
          .sort((a, b) => {
            return new Date(b.created_time) - new Date(a.created_time);
          })
      : userPostList
          .filter((data) =>
            data.message.toLowerCase().includes(filter.toLowerCase())
          )
          .sort((a, b) => {
            return new Date(a.created_time) - new Date(b.created_time);
          });
  };

  const userHandle = (name) => {
    setuserPostList(data.filter((posts) => posts.from_name === name));
    setShowUserPostList(true);
  };

  const logout = () => {
    window.localStorage.clear();
    setData(null);
    alert("You have logged out.Press ok to go to Login page.");
  };

  return (
    <div className="Postlist">
      <div className="User">
        <button className="logout" onClick={() => logout()}>
          logout{" "}
        </button>

        <h2 style={{ marginLeft: "20px" }}>Names:</h2>
        <input
          className="input-search"
          onChange={(event) => setUserFilter(event.target.value)}
          placeholder="Search name"
        />
        <button
          className="button-Username"
          onClick={() => setShowUserReverse(!showUserReverse)}
        >
          Revert names
        </button>

        {userNameList().map((names) => (
          <div key={names}>
            <p>
              <button
                className="userListButton"
                onClick={() => userHandle(names)}
              >
                <span>
                  {names}
                  {" ("}

                  {data.filter((users) => users.from_name === names).length}
                  {")"}
                </span>
              </button>
            </p>
          </div>
        ))}
      </div>

      <div className="Post">
        {!showUserPostList ? (
          <div>Click on user to get the post lists</div>
        ) : (
          <div>
            <h1>List of posts</h1>
            <input
              className="input-search"
              onChange={(event) => setFilter(event.target.value)}
              placeholder="Search posts"
            />
            <button
              className="button-recent"
              onClick={() => setShowPostReverse(true)}
            >
              Recent on top
            </button>
            <button
              className="button-oldest"
              onClick={() => setShowPostReverse(false)}
            >
              Oldest on top
            </button>
            <div data-testid="test-postList">
              {userPosts().map((posts, from_id) => (
                <div key={from_id} className="Postcard">
                  <p>{posts.created_time}</p>
                  <p>{posts.message}</p>
                  <p>{posts.from_name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
