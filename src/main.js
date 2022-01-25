import { createApp } from 'vue'
import App from './App.vue'
import VuePapaParse from 'vue-papa-parse'

const app = createApp(App)

app.use(VuePapaParse)
createApp(App).mount('#app')
