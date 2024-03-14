import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {

    let isLoggedIn = !!localStorage.getItem("token")
    let username = localStorage.getItem("username")

    function onLogin(user) {
    isLoggedIn = true;
    // navigate("/userhome");
    }

    function onLogout() {
    username = null;
    isLoggedIn = false;
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
