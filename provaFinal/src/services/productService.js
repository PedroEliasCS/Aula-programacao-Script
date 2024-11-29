import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/products';

export default {
  getAllProducts() {
    return axios.get(API_URL);
  },
  getProductById(id) {
    return axios.get(`${API_URL}/${id}`);
  },
  getCategories() {
    return axios.get(`${API_URL}/categories`);
  },
  addProduct(product) {
    return axios.post(API_URL, product);
  },
  updateProduct(product) {
    return axios.put(`${API_URL}/${product.id}`, product);
  },
  deleteProduct(id) {
    return axios.delete(`${API_URL}/${id}`);
  },
};
