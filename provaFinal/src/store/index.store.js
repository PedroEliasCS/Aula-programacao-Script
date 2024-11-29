import { createStore } from 'vuex';
import products from './modules/products';

// ...existing code...

const store = createStore({
  modules: {
    products,
  },
});

export default store;
