import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from "./store/index.js";

import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faTrash, faEdit, faPlus, faTimes, faCheck
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
library.add(
	faTrash, faEdit, faPlus, faTimes, faCheck);

const app = createApp(App)
app.use(store)
app.component("font-awesome-icon", FontAwesomeIcon)

app.mount('#app')