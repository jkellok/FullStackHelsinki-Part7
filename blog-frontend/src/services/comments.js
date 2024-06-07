import axios from "axios";

const baseUrl = "/api/blogs";

const getAll = (blogId) => {
  console.log("getall id", blogId)
  const request = axios.get(`${baseUrl}/${blogId}/comments`);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  console.log("newovjret", newObject)
  const response = await axios.post(`${baseUrl}/${newObject.blog}/comments/`, newObject);
  return response.data;
};

export default { getAll, create };
