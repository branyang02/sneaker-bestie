import axios from "axios";

export const fetchSneakers = async () => {
  const response = await axios.get("/api/sneakers/view-all");
  return response.data;
};

export const userSignup = async (userData) => {
  const response = await axios.post("/api/users/signup", userData);
  return response.data;
};

export const userLogin = async (userData) => {
  const response = await axios.post("/api/users/login", userData);
  return response.data;
};
