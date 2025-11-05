import { ref } from "vue";
import { AuthAPI } from "../api/auth";
import { toast } from "../plugins/toast";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user";
import { UserAPI } from "../api/user";

export function useAuth() {
  const loading = ref(false);
  const router = useRouter();
  const authStore = useUserStore();

  async function login(form) {
    loading.value = true;
    try {
      const res = await AuthAPI.login(form);
      if (res.success == false) {
        toast.error(res.error);
        return;
      }
      localStorage.setItem("access_token", res.data);
      const userProfile = await UserAPI.getProfile();
      authStore.setUser(userProfile);
      console.log("User after login:", authStore.user);
      setTimeout(() => {
        router.push("/home");
      }, 1000);
    } catch (err) {
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  async function register(form) {
    loading.value = true;
    try {
      await AuthAPI.register(form);
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (err) {
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  async function logout() {
    loading.value = true;
    try {
      await AuthAPI.logout();
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      authStore.setUser(null); 
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to logout");
    } finally {
      loading.value = false;
    }
  }

  async function initAuth() {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const userProfile = await UserAPI.getProfile();
        authStore.setUser(userProfile);
      } catch (error) {
        console.error("Failed to fetch user profile on app load:", error);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        authStore.setUser(null);
        router.push("/login");
      }
    }
  }

  return { loading, login, register, logout, initAuth };
}
