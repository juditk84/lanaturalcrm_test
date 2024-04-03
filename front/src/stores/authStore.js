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
  // const isLoggedIn = ref(!!document.cookie)
  // const isLoggedIn = ref(!!localStorage.getItem("token"))
  const username = ref(sessionStorage.getItem("username"))

  function setUser(username) {
    if (username) {
      sessionStorage.setItem("username", username)
    }
    // if (payload.email) {
    //   userEmail.value = payload.email
    // }
  }

  const login = async (credentials) => {
    try {
      const { data } = await axios("api/inici/login", {
        method: "POST",
        data: credentials,
      })
      // console.log(credentials)
      isLoggedIn.value = true
      // localStorage.setItem("token", data.token);
      // localStorage.setItem("username", username);
      // const token = data.token
      console.log(data.token)
      const refreshToken = await data.token
   
      setRefreshToken(refreshToken)
      setUser(credentials.username)
      // If you like, you may redirect the user now
      router.push("dashboard")
      // if (data.response === "OK") await onLogin(data.username);
      // navigate({pathname: "/userhome"}, {state: {username: username}})
      // router.push('/dashboard')
      // console.log(data.message, data.token)
    } catch (error) {
      console.log(error);
    }
  };

  async function onLogin(payload) {
    try {
      // const {username, password} = payload
      // console.log(payload)
      // localStorage.setItem("token", payload.token);
      // localStorage.setItem("username", form.login);
      // const data = await axios("api/inici/login", {
      //   method: "POST",
      //   body: payload
      // })
      // document.cookie = "Token=" + data.token + ";httponly";
      // const { jwt_token } = await data.json()
      // console.log(data)
      isLoggedIn.value = true;
      
      // username.value = payload
      // setUser(username)
      // console.log(user)
      router.push("/dashboard")
      // localStorage.setItem("token", data.token);
      // localStorage.setItem("username", form.login);
      
      // mainStore.fetchAllUserRelatedAssets();
    } catch (error) {
      console.log(error);
    }

  
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
    setUser,
    isLoggedIn,
    onLogin,
    onLogout,
    username,
    login
  }
})
