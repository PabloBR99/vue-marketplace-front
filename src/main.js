import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './index.css';
import 'flowbite';
import 'flowbite-vue';
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserCircle, faHeart, faSun, faMoon, faCartShopping } from '@fortawesome/free-solid-svg-icons'

const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon);
const pinia = createPinia();
library.add(faUserCircle, faHeart, faSun, faCartShopping, faMoon)
app.use(router);
app.use(pinia);

app.mount('#app');
