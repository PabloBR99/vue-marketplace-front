import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './index.css';
import 'flowbite';
import 'flowbite-vue';
import 'vue3-carousel/dist/carousel.css'
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Notifications from '@kyvg/vue3-notification'
import { faUserAlt, faHeart, faSun, faMoon, faCartShopping, faEyeSlash, faEye,
         faSignIn, faUserPlus, faClose, faSignOut, faGear, faCaretDown, faCheckCircle, faSearch, faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
const pinia = createPinia();
library.add(faUserAlt, faHeart, faSun, faCartShopping, faMoon, faSignIn,
  faUserPlus, faClose, faSignOut, faGear, faCaretDown, faEyeSlash, faEye, faCheckCircle, faSearch, faHeart, faStar, faStarHalf)
app.use(router);
app.use(pinia);
app.use(Notifications)

app.mount('#app');
