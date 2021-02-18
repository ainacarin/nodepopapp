const BASE_URL = "http://localhost:8000/";
const TOKEN_KEY = 'token';
// const url = "http://localhost:8000/api/post";

export default {

  manageResponseData(responseData) {
    return responseData.map(post => {
      return {
        name: post.name.replace(/(<([^>]+)>)/gi, ""),
        price: `${post.price}€`,
        user: {
          username: post.user.username.replace(/(<([^>]+)>)/gi, "")
        },
        image: post.image
      }
    })
  },

  getAllAdvertisements: async function() {
    const url = `${BASE_URL}api/posts?_expand=user`;
    const response = await fetch(url);

    if (response.ok) {
      const responseData = await response.json();
      return this.manageResponseData(responseData);
    } else {
      throw new Error(`HTTP: ${response.status}`);
    }
  },

  post: async function(url, postData) {
    // configure POST
    const postConfig = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    };
    const response = await fetch(url, postConfig);
    const responseData = await response.json();
    if (response.ok) {
      return responseData;
    } else {
      throw new Error(responseData.message || JSON.stringify(responseData));
    }
  },
  
  registerUser: async function(user) {
    const url = `${BASE_URL}auth/register`;
    return await this.post(url, user);
  },
  
  loginUser: async function(user) {
    const url = `${BASE_URL}auth/login`;
    return await this.post(url, user);
  },

  saveToken: async function(token) {
    localStorage.setItem(TOKEN_KEY, token);
  }

};
