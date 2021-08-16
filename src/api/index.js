const baseUrl = process.env.REACT_APP_API_URL;

export const getSuggestion = () =>
  fetch(`${baseUrl}/suggestion`).then((res) => res.json());

export const getDoughs = () =>
  fetch(`${baseUrl}/doughs`).then((res) => res.json());

export const getSizes = () =>
  fetch(`${baseUrl}/sizes`).then((res) => res.json());

export const getEdges = () =>
  fetch(`${baseUrl}/edges`).then((res) => res.json());

export const getToppings = () =>
  fetch(`${baseUrl}/toppings`).then((res) => res.json());

export default {
  getSuggestion,
};
