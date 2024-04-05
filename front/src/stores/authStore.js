import { defineStore } from 'pinia'
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'



export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();
  const isLoggedIn = ref(!!sessionStorage.getItem("refreshToken"))
  const username = ref(sessionStorage.getItem("username"))


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
     
      isLoggedIn.value = true
     
      const refreshToken = await data.token
      setRefreshToken(refreshToken)
      setUsername(credentials.username)
      router.push("dashboard")

    } catch (error) {
      console.log(error);
    }
  };

  const onLogout = () => {
    console.log("username before log out: ", username.value)
    username.value = null;
    isLoggedIn.value = false;
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("username");
    console.log("isLoggedIn? " + isLoggedIn)
    console.log("username after logout: ", username.value)
    router.push("/login")
  };

  return {
    // setUser,
    isLoggedIn,
    onLogout,
    username,
    setUsername,
    getRefreshToken,
    setRefreshToken,
    handleLogin
  }
})
