import Vue3Toastify, { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default (app) => {
  app.use(Vue3Toastify, {
    autoClose: 3000,
    position: "top-right",
    theme: "light",
    pauseOnHover: true,
    closeOnClick: true,
  });
};

export { toast };
