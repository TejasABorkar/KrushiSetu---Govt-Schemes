import axios from "axios";

const API_URL = "http://localhost:8081/api/schemes";

export const getAllSchemes = async (lang) => {
  const res = await fetch(`${API_URL}?lang=${lang}`);
  return res.json();
};

export const getByCategory = async (category, lang) => {
  const res = await fetch(`${API_URL}/category/${category}?lang=${lang}`);
  return res.json();
};

export const getByState = async (state, lang) => {
  const res = await fetch(`${API_URL}/state/${state}?lang=${lang}`);
  return res.json();
};

export const getById = async (id, lang) => {
  const res = await fetch(`${API_URL}/${id}?lang=${lang}`);
  return res.json();
};