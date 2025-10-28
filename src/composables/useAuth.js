import { ref } from "vue";
import { AuthAPI } from "../api/auth";
import { toast } from "../plugins/toast";
import { useRouter } from "vue-router";

export function useAuth() {
  const loading = ref(false);
  const router = useRouter();

  async function login(form) {
    loading.value = true;
    try {
      const res = await AuthAPI.login(form);
      if (res.success == false) {
        toast.error(res.error);
      }
      console.log(res);
      localStorage.setItem("access_token", res.data);
      setTimeout(() => {
        router.push("/dashboard");
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
      toast.success("Account created successfully");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (err) {
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  return { loading, login, register };
}
