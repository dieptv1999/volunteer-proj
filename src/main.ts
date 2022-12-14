import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import axios from "axios";

axios.defaults.baseURL = "http://128.199.195.92";
axios.defaults.httpAgent = "http://128.199.195.92";
axios.defaults.httpsAgent = "http://128.199.195.92";
axios.defaults.proxy = false;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(ElementPlus);
app.mount("#app");
