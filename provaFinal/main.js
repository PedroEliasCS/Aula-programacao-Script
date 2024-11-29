import { createApp } from 'vue';
import App from './app.vue';
import router from './src/router/index.router';
import store from './src/store/index.store';

createApp(App)
  .use(router)
  .use(store)
  .mount('#app');
