import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})


// 註冊
export const register = async (email, nickname, password) => {
  return api.post('users/sign_up',{
    email,
    nickname,
    password,
  })
}

// 登入
export const login = async (email, password) => {
  return api.post('users/sign_in',{
    email,
    password,
  })
}
