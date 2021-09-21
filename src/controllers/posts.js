import axios from "axios";
import id from "../utils/config";

let baseUrl = "https://api.supermetrics.com/assignment/register";
let getUrl = "https://api.supermetrics.com/assignment/posts";
let client_id = id;

export const create = async (name, email) => {
  const object = {
    name: name,
    client_id: client_id,
    email: email,
  };

  const response = await axios.post(baseUrl, object);
  return response.data;
};

const getPosts = async (token, pageNumber) => {
  let url = `${getUrl}?sl_token=${token}&page=${pageNumber}`;
  const body = await axios.get(url);
  const response = await body.data.data.posts;
  return response;
};

export const getAllPosts = async (token) => {
  const requests = [];
  for (var i = 1; i <= 10; i++) {
    requests.push(getPosts(token, i));
  }

  const responses = await Promise.all(requests);
  return responses.flat();
};

export default { create, getPosts, getAllPosts };
