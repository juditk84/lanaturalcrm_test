import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {


  const router = useRouter();
  const isLoggedIn = ref(!!localStorage.getItem("token"))
  const username = ref(localStorage.getItem("username"))


  const onLogin = (user) => {
    isLoggedIn.value = true;
    username.value = user
    console.log("username: ", username.value)
    router.push('/xarxa/totis')
  };

  const onLogout = () => {
    console.log("username before logout: ", username.value)
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
