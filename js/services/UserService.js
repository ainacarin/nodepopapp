const TOKEN_KEY = "token";

export default {
  saveToken: async function (token) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  getToken: async function () {
    return localStorage.getItem(TOKEN_KEY);
  },

  deleteToken: async function () {
    localStorage.removeItem(TOKEN_KEY);
  },

  isUserLogged: async function () {
    const isToken = await this.getToken();
    return isToken !== null;
  },

  getUser: async function () {
    try {
      const token = await this.getToken();
      const tokenParts = token.split(".");
      if (tokenParts.length !== 3) {
        return null;
      }
      const payload = tokenParts[1]; // cogemos el payload, codificado en base64
      const jsonStr = atob(payload); // descodificamos el base64
      const { userId, username } = JSON.parse(jsonStr); // parseamos el JSON del token descodificado
      return { userId, username };
    } catch (error) {
      return null;
    }
  },
};
