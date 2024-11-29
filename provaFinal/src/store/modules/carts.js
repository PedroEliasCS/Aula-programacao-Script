import axios from 'axios';
import { isSameDay, isWithinRange } from '../../utils/dateUtils';

const state = {
  carts: [],
  cartDetails: {},
};

const getters = {
  allCarts: (state) => state.carts,
  cartDetails: (state) => state.cartDetails,
  filteredCarts: (state) => (filter) => {
    return state.carts.filter(cart => {
      const dateMatch = !filter.date || isSameDay(cart.date, filter.date);
      const dateRangeMatch = !filter.startDate || !filter.endDate || isWithinRange(cart.date, filter.startDate, filter.endDate);
      const userMatch = !filter.userId || cart.userId === filter.userId;
      return (dateMatch || dateRangeMatch) && userMatch;
    });
  },
};

const actions = {
  async fetchCarts({ commit }) {
    const response = await axios.get('https://fakestoreapi.com/carts');
    commit('setCarts', response.data);
  },
  async fetchCartDetails({ commit }, id) {
    const response = await axios.get(`https://fakestoreapi.com/carts/${id}`);
    commit('setCartDetails', response.data);
  },
  async addItemToCart({ commit }, { cartId, item }) {
    const response = await axios.post(`https://fakestoreapi.com/carts/${cartId}`, item);
    commit('updateCart', response.data);
  },
  async updateCartItem({ commit }, { cartId, itemId, item }) {
    const response = await axios.put(`https://fakestoreapi.com/carts/${cartId}/items/${itemId}`, item);
    commit('updateCart', response.data);
  },
  async removeItemFromCart({ commit }, { cartId, itemId }) {
    await axios.delete(`https://fakestoreapi.com/carts/${cartId}/items/${itemId}`);
    commit('removeItem', { cartId, itemId });
  },
};

const mutations = {
  setCarts: (state, carts) => (state.carts = carts),
  setCartDetails: (state, cart) => (state.cartDetails = cart),
  updateCart: (state, updatedCart) => {
    const index = state.carts.findIndex(cart => cart.id === updatedCart.id);
    if (index !== -1) {
      state.carts.splice(index, 1, updatedCart);
    }
  },
  removeItem: (state, { cartId, itemId }) => {
    const cart = state.carts.find(cart => cart.id === cartId);
    if (cart) {
      cart.items = cart.items.filter(item => item.id !== itemId);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
