import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import installToast from './plugins/toast'

const app = createApp(App)
app.use(router)
installToast(app)
app.mount('#app')
