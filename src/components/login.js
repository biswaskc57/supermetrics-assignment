import axios from "axios";
import React, { useState } from "react";
import postServices from "./posts";

const Login = () => {
  const [data, setData] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  console.log(data);
  let datas;
  let dataList;

  //Reminder: will need to define errors more precisely
  const fetchData = async () => {
    try {
      datas = await postServices.create();
      console.log(datas);
      console.log("The data is", datas);
    } catch (error) {
      error("Something went wrong while in post request");
    }

    if (datas.data.sl_token) {
      try {
        let token = datas.data.sl_token;
        dataList = await postServices.getPosts(token, pageNumber);
        console.log(dataList);

        console.log("Posts to show are", dataList.data.posts);
      } catch (error) {
        console.log("Something went wrong in get request");
      }
    }
  };

  return (
    <div>
      <p>
        Name:
        <input />
      </p>
      <p>
        Email:
        <input />
      </p>
      <button onClick={fetchData}>Login</button>
    </div>
  );
};

export default Login;
