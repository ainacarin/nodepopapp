const BASE_URL = "http://localhost:8000/";
// const url = "http://localhost:8000/api/post";

export default {
  getAllAdvertisements: async () => {
    const url = `${BASE_URL}api/posts`;
    const response = await fetch(url);

    if (response.ok) {
      const responseData = response.json();
      return responseData;
    } else {
      throw new Error(`HTTP: ${response.status}`);
    }
  },

  registerUser: async (user) => {
    const url = `${BASE_URL}auth/register`;
    // confige POST
    const postConfig = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    };
    const response = await fetch(url, postConfig);
    const responseData = await response.json();
    if (response.ok) {
        return responseData;
    } else {
        throw new Error(responseData.message || JSON.stringify(responseData));
    }
  },
};
