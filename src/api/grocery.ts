import axios from "axios"
import { GroceryItemType } from "../types/GroceryItem.type"

const API_PATH = 'http://localhost:3000';

export const getGroceryListAPI = () => {
  return axios
    .get(`${API_PATH}/groceryList`)
    .then((res) => res.data)
}

export const createGroceryItem = (groceryItem: GroceryItemType) => {
  return axios.post(`${API_PATH}/groceryList`, groceryItem)
    .then((res) => res.data);
}

export const updateGroceryItem = (groceryItem: GroceryItemType) => {
  return axios.patch(`${API_PATH}/groceryList/${groceryItem.id}`, groceryItem)
    .then((res) => res.data);
}

export const deleteGroceryItem = async (id: GroceryItemType['id']) => {
  return axios.delete(`${API_PATH}/groceryList/${id}`)
    .then((res) => res.data)
    .catch(err => {
      throw new Error(err);
    });
}