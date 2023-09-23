// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

export const fetchCharacter = async (characterId) => {
  const response = await api.get(`pokemon/${characterId}`);
  return response.data;
};
