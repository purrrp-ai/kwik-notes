import axios from "axios";

const API_BASE_URL = "/gwy/users";

const gwy = axios.create({ baseURL: API_BASE_URL });

async function signUp(details) {
  const { data } = await gwy.post("/", details);
  return data;
}

export default signUp;
