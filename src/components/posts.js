import axios from "axios";

let token = null;
const baseUrl = "https://api.supermetrics.com/assignment/register";

let getUrl = "https://api.supermetrics.com/assignment/posts";

let client_id = "ju16a6m81mhid5ue1z3v2g0uh";

const create = async (email, name) => {
  const object = {
    name: "Biswas KC",
    client_id: "ju16a6m81mhid5ue1z3v2g0uh",
    email: "biswas.7@gmail.com",
  };

  const response = await axios.post(baseUrl, object);
  console.log(response.data);
  token = response.data.data.sl_token;
  console.log("token is: ", token);
  return response.data;
};

const getPosts = async (token, pageNumber) => {
  let url = `${getUrl}?sl_token=${token}&page=${pageNumber}`;
  console.log("token in get posts is", url);
  console.log("Url is", url);
  const response = await axios.get(url);
  console.log("response in getPosts services is", response.data);

  return response.data;
};

export default { create, getPosts };
