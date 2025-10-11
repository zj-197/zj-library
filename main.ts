import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import ZjLibraryCp from "@zj-library/vue-components";

const app = createApp(App);
app.use(ZjLibraryCp);
app.use(ElementPlus);
app.mount('#app');
