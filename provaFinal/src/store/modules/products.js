import axios from 'axios';

const state = {
  products: [],
  categories: [],
  product: null,
};

const getters = {
  allProducts: (state) => state.products,
  allCategories: (state) => state.categories,
  singleProduct: (state) => state.product,
};

const actions = {
  async fetchProducts({ commit }) {
    const response = await axios.get('https://fakestoreapi.com/products');
    commit('setProducts', response.data);
  },
  async fetchCategories({ commit }) {
    const response = await axios.get('https://fakestoreapi.com/products/categories');
    commit('setCategories', response.data);
  },
  async fetchProduct({ commit }, id) {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    commit('setProduct', response.data);
  },
  async addProduct({ commit }, product) {
    const response = await axios.post('https://fakestoreapi.com/products', product);
    commit('newProduct', response.data);
  },
  async updateProduct({ commit }, updatedProduct) {
    const response = await axios.put(`https://fakestoreapi.com/products/${updatedProduct.id}`, updatedProduct);
    commit('updateProduct', response.data);
  },
  async deleteProduct({ commit }, id) {
    await axios.delete(`https://fakestoreapi.com/products/${id}`);
    commit('removeProduct', id);
  },
};

const mutations = {
  setProducts: (state, products) => (state.products = products),
  setCategories: (state, categories) => (state.categories = categories),
  setProduct: (state, product) => (state.product = product),
  newProduct: (state, product) => state.products.push(product),
  updateProduct: (state, updatedProduct) => {
    const index = state.products.findIndex(product => product.id === updatedProduct.id);
    if (index !== -1) {
      state.products.splice(index, 1, updatedProduct);
    }
  },
  removeProduct: (state, id) => (state.products = state.products.filter(product => product.id !== id)),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
