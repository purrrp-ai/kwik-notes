import axios from "axios";

const API_BASE_URL = "/sign-in";

const gwy = axios.create({ baseURL: API_BASE_URL });

export default async function signIn(credentials) {
  try {
    const response = await gwy.post("/", credentials);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
