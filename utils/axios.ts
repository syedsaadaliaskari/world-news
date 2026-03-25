import axios from "axios";

const newsClient = axios.create({
  baseURL: "https://newsapi.org/v2", // The starting part of every request
  headers: {
    "X-Api-Key": process.env.NEXT_PUBLIC_API_KEY, // Attaches your key automatically
  },
});

export default newsClient;
