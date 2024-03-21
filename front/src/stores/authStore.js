import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {


  const router = useRouter();
  const isLoggedIn = ref(!!document.cookie)
  // const isLoggedIn = ref(!!localStorage.getItem("token"))
  const username = ref(localStorage.getItem("username"))


  const onLogin = (user) => {
    isLoggedIn.value = true;
    username.value = user
    router.push("/dashboard")
  };

  const onLogout = () => {
    console.log("username before log out: ", username.value)
    username.value = null;
    isLoggedIn.value = false;
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("character");
    console.log("username after logout: ", username.value)
    router.push("/login")
  };

  return {
    isLoggedIn,
    onLogin,
    onLogout,
    username,
  }
})
