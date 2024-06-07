import axios from "axios";
import storage from './storage'

const baseUrl = "/api/blogs";

//let token = null;

const getToken = () => ({
  //token = `Bearer ${newToken}`;
  headers : { Authorization: `Bearer ${storage.loadUser().token}` }
});

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
/*   const config = {
    headers: { Authorization: token },
  }; */

  const response = await axios.post(baseUrl, newObject, getToken());
  return response.data;
};

const update = async (newObject) => {
/*   const config = {
    headers: { Authorization: token },
  }; */
  const request = axios.put(`${baseUrl}/${newObject.id}`, newObject, getToken());
  return request.then((response) => response.data);
};

const deleteBlog = async (id) => {
/*   const config = {
    headers: { Authorization: token },
  }; */
  const request = axios.delete(`${baseUrl}/${id}`, getToken());
  return request.then((response) => response.data);
};

export default { getAll, create, getToken, update, deleteBlog };
