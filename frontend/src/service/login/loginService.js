import API, { setToken } from "../api.js";

export const login = async (email, password) => {
  try {
    const response = await API.post("/auth/login", { email, password });
    const { auth } = response.data;
    
    if (auth) {
      setToken(auth);  
      console.log("Login bem-sucedido:", auth);
      return response.data;
    } else {
      throw new Error("Autenticação falhou");
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }
};
