import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {

    const isLoggedIn = ref(!!localStorage.getItem("token"))
    const username = ref(localStorage.getItem("username"))

    function onLogin(user) {
    isLoggedIn.value = true;
    console.log("username: ", username.value)
    // navigate("/userhome");
    }

    function onLogout() {
    username.value = null;
    isLoggedIn.value = false;
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("character");
    // navigate("/login");
    }
    
    const authObject = {
    isLoggedIn,
    onLogin,
    onLogout,
    username,
    };
    

  return {
    authObject
  }
})
