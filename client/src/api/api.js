import axios from "axios";

export const fetchSneakers = async () => {
  const response = await axios.get("/api/sneakers/view-all");
  return response.data;
};