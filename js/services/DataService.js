const BASE_URL = "http://localhost:8000/";
const TOKEN_KEY = "token";
// const url = "http://localhost:8000/api/post";

export default {
  manageResponseData(responseData) {
    return responseData.map((post) => {
      return {
        name: post.name.replace(/(<([^>]+)>)/gi, ""),
        price: `${post.price}€`,
        sale: post.sale,
        user: {
          username: post.user.username.replace(/(<([^>]+)>)/gi, ""),
        },
        image: post.image,
      };
    });
  },

  getAllAdvertisements: async function () {
    const url = `${BASE_URL}api/advertisements?_expand=user&_sort=id&_order=desc`;
    const response = await fetch(url);

    if (response.ok) {
      const responseData = await response.json();
      return this.manageResponseData(responseData);
    } else {
      throw new Error(`HTTP: ${response.status}`);
    }
  },

  postImage: async function (url, postData) {
    console.log('postData', postData);
    // configure POST
    const postConfig = {
      method: "POST",
      headers: {},
      body: postData
    };
    const token = await this.getToken();
    if (token) {
        postConfig.headers['Authorization'] = `Bearer ${token}`;
    }
    const response = await fetch(url, postConfig);
    const responseData = await response.json();
    if (response.ok) {
      return responseData;
    } else {
      throw new Error(responseData.message || JSON.stringify(responseData));
    }
  },

  post: async function (url, postData) {
    // configure POST
    const postConfig = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    };
    const token = await this.getToken();
    if (token) {
        postConfig.headers['Authorization'] = `Bearer ${token}`;
    }
    const response = await fetch(url, postConfig);
    const responseData = await response.json();
    if (response.ok) {
      return responseData;
    } else {
      throw new Error(responseData.message || JSON.stringify(responseData));
    }
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
    localStorage.setItem(TOKEN_KEY, token);
  },

  getToken: async function () {
    return localStorage.getItem(TOKEN_KEY);
  },

  isUserLogged: async function () {
    const isToken = await this.getToken();
    return isToken !== null;
  },

  uploadImage: async function (image) {
    const form = new FormData();
    form.append("file", image);
    const url = `${BASE_URL}upload`;
    const response = await this.postImage(url, form);
    console.log('path',response.path);
    return response.path || null;
  },

  saveNewAdvertisement: async function (advertisement) {
    const url = `${BASE_URL}api/advertisements`;
    if (advertisement.image) {
      const imageURL = await this.uploadImage(advertisement.image);
      advertisement.image = imageURL;
    }
    if(advertisement.sale == "true") {
      advertisement.sale = true;
    } else{
      advertisement.sale = false;
    }
    return await this.post(url, advertisement);
  },

};
