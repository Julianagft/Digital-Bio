import API  from "../api.js";

export default async function loginService (email, password) {

  try {
    const response = await API.post('/auth/login', {
      email,
      password,
    });

    const token = response.data.token;

    API.defaults.headers.common["token"] = token;

    return response.data;

  } catch (error) {

    console.error('Erro ao fazer login:', error);
    throw error;
  }
};
