import { createApp } from "vue";
import App from "./App.vue";
import VueClickAway from "vue3-click-away";
import { createVuestic } from 'vuestic-ui'
import 'vuestic-ui/css'

const app = createApp(App);
app.use(VueClickAway)

app.use(createVuestic());
app.mount("#app");
