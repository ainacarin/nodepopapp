import userDataService from './UserService.js';

const BASE_URL = "http://localhost:8000/";
const TOKEN_KEY = "token";
// const url = "http://localhost:8000/api/post";

export default {
  manageOneResponseData(item, currentUser = null) {
    const modifiedItem = {
      id: item.id,
      name: item.name.replace(/(<([^>]+)>)/gi, ""),
      price: `${item.price}€`,
      sale: item.sale,
      image: item.image,
      user: {
        username: item.user.username.replace(/(<([^>]+)>)/gi, "")
      },
      isFromCurrentUser: currentUser
        ? currentUser.userId === item.userId
        : false,
    };
    // if (currentUser) {
    //   modifiedItem.user = {
    //     username: currentUser.username.replace(/(<([^>]+)>)/gi, ""),
    //   };
    // } else {
    //   modifiedItem.user = {
    //     username: item.user.username.replace(/(<([^>]+)>)/gi, ""),
    //   };
    // }

    return modifiedItem;
  },

  manageResponseData(responseData, currentUser = null) {
    // if (currentUser) {
    //   // 1 advertisement
    //   return this.manageOneData(responseData, currentUser);
    // } else {
      // list advertisements
      return responseData.map((itemAdvertisement) => {
        return this.manageOneResponseData(itemAdvertisement);
      });
    // }
  },

  request: async function (url, requestConfig = null) {
    // const token = await this.getToken();
    const token = await userDataService.getToken();
    if (token) {
      requestConfig.headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await fetch(url, requestConfig);
    const responseData = await response.json();
    if (response.ok) {
      return responseData;
    } else {
      if(response.status == 401 && userDataService.isUserLogged()) { //Unauthorized + token => delete token
        userDataService.deleteToken();
      }
      throw new Error(responseData.message || JSON.stringify(responseData));
    }
  },

  getAllAdvertisements: async function () {
    const url = `${BASE_URL}api/advertisements?_expand=user&_sort=id&_order=desc`;
    const response = await fetch(url);

    if (response.ok) {
      const responseData = await response.json();
      return this.manageResponseData(responseData, null);
    } else {
      throw new Error(`HTTP: ${response.status}`);
    }
  },

  getOneAdvertisement: async function (idAdvertisement) {
    const currentUser = await this.getUser();
    const url = `${BASE_URL}api/advertisements/` + idAdvertisement + '?_expand=user';
    const response = await fetch(url);

    if (response.ok) {
      const responseData = await response.json();
      const responseDataModified = this.manageOneResponseData(responseData, currentUser);
      responseDataModified.userId = responseData.userId;
      // return this.manageOneResponseData(responseData, currentUser);
      return responseDataModified;
    } else {
      throw new Error(`HTTP: ${response.status}`);
    }
  },

  postImage: async function (url, postData) {
    // configure POST
    const postConfig = {
      method: "POST",
      headers: {},
      body: postData,
    };
    return await this.request(url, postConfig);
    // // const token = await this.getToken();
    // const token = await userDataService.getToken();
    // if (token) {
    //   postConfig.headers["Authorization"] = `Bearer ${token}`;
    // }
    // const response = await fetch(url, postConfig);
    // const responseData = await response.json();
    // if (response.ok) {
    //   return responseData;
    // } else {
    //   throw new Error(responseData.message || JSON.stringify(responseData));
    // }
  },

  post: async function (url, postData) {
    // configure POST
    const postConfig = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    };
    return await this.request(url, postConfig);
    // // const token = await this.getToken();
    // const token = await userDataService.getToken();
    // if (token) {
    //   postConfig.headers["Authorization"] = `Bearer ${token}`;
    // }
    // const response = await fetch(url, postConfig);
    // const responseData = await response.json();
    // if (response.ok) {
    //   return responseData;
    // } else {
    //   throw new Error(responseData.message || JSON.stringify(responseData));
    // }
  },

  registerUser: async function (user) {
    const url = `${BASE_URL}auth/register`;
    return await this.post(url, user);
  },

  loginUser: async function (user) {
    const url = `${BASE_URL}auth/login`;
    return await this.post(url, user);
  },

  saveToken: async function (token) {
    // localStorage.setItem(TOKEN_KEY, token);
    await userDataService.saveToken(token);
  },

  // getToken: async function () {
    // return localStorage.getItem(TOKEN_KEY);
  // },

  isUserLogged: async function () {
  //   const isToken = await this.getToken();
  //   return isToken !== null;
    return await userDataService.isUserLogged();
  },

  getUser: async function () {
    try {
      return await userDataService.getUser();
  //     const token = await this.getToken();
  //     const tokenParts = token.split(".");
  //     if (tokenParts.length !== 3) {
  //       return null;
  //     }
  //     const payload = tokenParts[1]; // cogemos el payload, codificado en base64
  //     const jsonStr = atob(payload); // descodificamos el base64
  //     const { userId, username } = JSON.parse(jsonStr); // parseamos el JSON del token descodificado
  //     return { userId, username };
    } catch (error) {
      return null;
    }
  },

  uploadImage: async function (image) {
    const form = new FormData();
    form.append("file", image);
    const url = `${BASE_URL}upload`;
    const response = await this.postImage(url, form);
    return response.path || null;
  },

  saveNewAdvertisement: async function (advertisement) {
    const url = `${BASE_URL}api/advertisements`;
    if (advertisement.image) {
      const imageURL = await this.uploadImage(advertisement.image);
      advertisement.image = imageURL;
    }
    if (advertisement.sale == "true") {
      advertisement.sale = true;
    } else {
      advertisement.sale = false;
    }
    return await this.post(url, advertisement);
  },

// delete url vacio true
  delete: async function(url) {
    const config = {
        method: 'DELETE',
        headers: {}
    };
    return await this.request(url, config);
    // // const token = await this.getToken();
    // const token = await userDataService.getToken();
    // if (token) {
    //     config.headers['Authorization'] = `Bearer ${token}`;
    // }
    // const response = await fetch(url, config);
    // const data = await response.json();  // respuesta del servidor sea OK o sea ERROR.
    // if (response.ok) {
    //     return data;
    // } else {            
    //     // TODO: mejorar gestión de errores
    //     // TODO: si la respuesta es un 401 no autorizado, debemos borrar el token (si es que lo tenemos);
    //     throw new Error(data.message || JSON.stringify(data));
    // }
},

  deleteAdvertisement: async function (idAdvertisement) {
    const url = `${BASE_URL}api/advertisements/${idAdvertisement}`;
    return await this.delete(url);
  }
};
