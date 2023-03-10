import { API } from "./baseUrl";

const getAllCards = async (page) => {
  const response = await API.get(`/diary?page=${page}`);
  return response;
};

const getSingleCard = async (id) => {
  const response = await API.get(`/diary/${id}`);
  return response;
};

const archieveCard = async (id) => {
  const response = await API.put(`/diary/${id}/archieve`);
  return response;
};

const createCard = async (data) => {
  const response = await API.post(`/diary`, data);
  return response;
};

const updateCard = async (id, data) => {
  const response = await API.put(`/diary/${id}`, data);
  return response;
};

const cardService = {
  getAllCards,
  getSingleCard,
  archieveCard,
  updateCard,
  createCard,
};

export default cardService;
