import axios from "axios";

const axiosInit = axios.create({
  baseURL: "http://localhost:4000/api/v1/users",
  headers: {
    "Content-type": "application/json",
  },
});

const postLogin = (data) => {
  return axiosInit.post("/login", data);
};

const postSignUp = (data) => {
  return axiosInit.post("/signup", data);
};

const postService = { postLogin, postSignUp };

export default postService;
