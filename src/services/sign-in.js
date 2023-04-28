import axios from "axios";

const API_BASE_URL = "/gwy/sign-in";

const gwy = axios.create({ baseURL: API_BASE_URL });

async function SignIn(credentials) {
  const { data } = await gwy.post("/", credentials);
  return data;
}

export default { SignIn };
