import { advertisementView } from '../views.js';
import userDataService from './UserService.js';

const BASE_URL = "http://localhost:8000/";
const TOKEN_KEY = "token";


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

    return modifiedItem;
  },

  manageResponseData(responseData, currentUser = null) {

      return responseData.map((itemAdvertisement) => {
        return this.manageOneResponseData(itemAdvertisement);
      });
    // }
  },

  request: async function (url, requestConfig = null) {

    const token = await userDataService.getToken();
    if (token) {
      requestConfig.headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await fetch(url, requestConfig);
    const responseData = await response.json();
    if (response.ok) {
      return responseData;
    } else {
      let resCustom = 'Error de permisos. Acceda al login para identificarse.'
      const isUser = await userDataService.isUserLogged();
      if(response.status == 401 && isUser) { //Unauthorized + token => delete token
        userDataService.deleteToken();
        throw new Error(resCustom);
      } else {
          throw new Error(responseData.message || JSON.stringify(responseData));
      }
      // throw new Error(responseData.message || JSON.stringify(responseData));
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

      return responseDataModified;
    } else {
      let errorMessage = `HTTP: ${response.status}`;
      console.log('errorMessage', response.status);
      if(response.status == 404) {
        errorMessage = 'El anuncio no existe';
      }
      throw new Error(errorMessage);
      // throw new Error(`HTTP: ${response.status}`);
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

  },

  post: async function (url, postData) {
    // configure POST
    const postConfig = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    };
    return await this.request(url, postConfig);

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

    await userDataService.saveToken(token);
  },

  deleteToken: async function () {

    await userDataService.deleteToken();
  },


  isUserLogged: async function () {

    return await userDataService.isUserLogged();
  },

  getUser: async function () {
    try {
      return await userDataService.getUser();

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
},

  deleteAdvertisement: async function (idAdvertisement) {
    const url = `${BASE_URL}api/advertisements/${idAdvertisement}`;
    return await this.delete(url);
  }
};
