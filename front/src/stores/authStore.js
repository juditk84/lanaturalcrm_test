import { defineStore } from 'pinia'
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useUserStore } from './userStore'



export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();
  const isLoggedIn = ref(!!sessionStorage.getItem("refreshToken"))
  const username = ref(sessionStorage.getItem("username"))
  const userStore = useUserStore()

  async function getRefreshToken() {
    return sessionStorage.getItem("refreshToken")
  }
  
  async function setRefreshToken(token) {
    try {
      sessionStorage.setItem("refreshToken", token)
    } catch (err) {
      console.log(err)
    }
  }

  async function setUsername(username) {
    try {
      sessionStorage.setItem("username", username)
    } catch (err) {
      console.log(err)
    }
  }


  const handleLogin = async (credentials) => {
    try {
      const { data } = await axios("api/inici/login", {
        method: "POST",
        data: credentials,
      })
      isLoggedIn.value = true /// maybe no cal isLoggedIn?
      const refreshToken = await data.token
      console.log(data.response)
      setRefreshToken(refreshToken)
      setUsername(credentials.username)
      userStore.fetchAllUserRelatedAssets(refreshToken)
      router.push("dashboard")    
    } catch (error) {
      console.log(error);
    }
  };

  const onLogout = () => {
   try {
    username.value = null;
    isLoggedIn.value = false;
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("username");
    userStore.$reset
    router.push("/login")
    console.log("logged out")
   } catch (err) {
    console.log(err)
   }
  };

  return {
    isLoggedIn,
    onLogout,
    username,
    setUsername,
    getRefreshToken,
    setRefreshToken,
    handleLogin
  }
}, {persist: true})
