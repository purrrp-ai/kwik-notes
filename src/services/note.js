import axios from "axios";

const API_BASE_URL = "/notes";

const api = axios.create({ baseURL: API_BASE_URL });

export const getAllNotes = async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getNoteById = async (noteId) => {
  try {
    const response = await api.get(`/${noteId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const createNote = async (noteData) => {
  try {
    const response = await api.post("/", noteData);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateNote = async (noteId, noteData) => {
  try {
    const response = await api.put(`/${noteId}`, noteData);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteNote = async (noteId) => {
  try {
    const response = await api.delete(`/${noteId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
