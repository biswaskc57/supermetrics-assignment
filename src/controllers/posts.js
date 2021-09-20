import axios from "axios";

let token = null;
const baseUrl = "https://api.supermetrics.com/assignment/register";

let getUrl = "https://api.supermetrics.com/assignment/posts";

//need to put this in the .env file
//
let client_id = "ju16a6m81mhid5ue1z3v2g0uh";

const create = async (name, email) => {
  console.log("name ", name);
  console.log(" email", email);
  const object = {
    name: name,
    client_id: client_id,
    email: email,
  };

  const response = await axios.post(baseUrl, object);
  console.log(response.data);
  token = response.data.data.sl_token;
  console.log("token is: ", token);
  return response.data;
};

const getPosts = async (token, pageNumber) => {
  let url = `${getUrl}?sl_token=${token}&page=${pageNumber}`;

  console.log("token in get posts is", token);
  console.log("Url is", url);
  const body = await axios.get(url);
  const response = await body.data.data.posts;
  return response;
};

export const getAllPosts = async (token) => {
  const requests = [];

  for (let i = 1; i <= 10; i++) {
    requests.push(getPosts(token, i));
  }

  console.log("if you are seeing this, its before amazing");

  const responses = await Promise.all(requests);
  /*Promise.all(requests)
    .then((data) => {
      responses = data.flat();
    })
    .catch((error) => {
      console.log("error");
    });*/

  console.log("if you are seeing this, its amazing");

  console.log("combined response is", responses.flat());
  return responses.flat();
};

export default { create, getPosts, getAllPosts };
