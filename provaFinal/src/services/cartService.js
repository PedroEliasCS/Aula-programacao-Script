import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/carts';

export const getCarts = () => axios.get(API_URL);
export const getCartDetails = (id) => axios.get(`${API_URL}/${id}`);
export const addItemToCart = (cartId, item) => axios.post(`${API_URL}/${cartId}`, item);
export const updateCartItem = (cartId, itemId, item) => axios.put(`${API_URL}/${cartId}/items/${itemId}`, item);
export const removeItemFromCart = (cartId, itemId) => axios.delete(`${API_URL}/${cartId}/items/${itemId}`);
