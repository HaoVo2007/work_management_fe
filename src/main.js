import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import installToast from './plugins/toast'
import { createPinia } from 'pinia'
import { useAuth } from '@/composables/useAuth'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
installToast(app)
app.mount('#app')

const { initAuth } = useAuth();
initAuth();
