import axios from "axios";

const axInit = axios.create({
  baseURL: "http://localhost:4000/api/v1/tutorials",
  headers: {
    "Content-type": "application/json",
  },
});

const getAll = () => {
  return axInit.get("/");
};
const get = (id) => {
  return axInit.get(`/${id}`);
};
const create = (data) => {
  return axInit.post("/", data);
};
const update = (id, data) => {
  return axInit.patch(`/${id}`, data);
};
const remove = (id) => {
  return axInit.delete(`/${id}`);
};
const removeAll = () => {
  return axInit.delete(`/`);
};
const findByTitle = (title) => {
  return axInit.get(`/?title=${title}`);
};

const TutorialService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default TutorialService;
