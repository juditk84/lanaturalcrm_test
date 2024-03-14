import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {

    const isLoggedIn = ref(!!localStorage.getItem("token"))
    const username = ref(localStorage.getItem("username"))

    const onLogin = (user) => {
    isLoggedIn.value = true;
    console.log("username: ", username.value)
    // navigate("/userhome");
    };

    const onLogout = () => {
    username.value = null;
    isLoggedIn.value = false;
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("character");
    console.log("username: ", username.value)
    // navigate("/login");
    };

  return {
    isLoggedIn,
    onLogin,
    onLogout,
    username,
  }
})
