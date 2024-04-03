import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export async function getRefreshToken() {
  return sessionStorage.getItem("refreshToken")
}

export async function setRefreshToken(token) {
  try {
    console.log(token)
    sessionStorage.setItem("refreshToken", token)
  } catch (err) {
    console.log(err)
  }
}



export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();
  const isLoggedIn = ref(false)
  const username = ref(sessionStorage.getItem("username"))

  function setUser(username) {
    if (username) {
      sessionStorage.setItem("username", username)
    }
  }

  const login = async (credentials) => {
    try {
      const { data } = await axios("api/inici/login", {
        method: "POST",
        data: credentials,
      })
     
      isLoggedIn.value = true
    
      console.log(data.token)
      const refreshToken = await data.token
   
      setRefreshToken(refreshToken)
      setUser(credentials.username)
      
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
    console.log("username after logout: ", username.value)
    router.push("/login")
  };

  return {
    setUser,
    isLoggedIn,
    onLogout,
    username,
    login
  }
})
