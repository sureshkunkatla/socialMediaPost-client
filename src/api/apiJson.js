// apiJson.js
// const BASE_URL = "http://192.168.1.7:3001/";
const BASE_URL = "https://socialmediapost-server.onrender.com/";

export const makeApiRequest = async (
  endpoint,
  method,
  payload = null,
  isLogin = false
) => {
  try {
    const accessToken = localStorage.getItem("access_token");
    const URL = BASE_URL + endpoint;

    // if (!isLogin && !accessToken) {
    //   // Handle the case when no access token is available (e.g., redirect to login)
    //   console.error(
    //     "Access token missing. Redirect to login or show an error message."
    //   );
    //   return null;
    // }

    const requestOptions = {
      method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    if (method === "POST" || method === "PUT") {
      requestOptions.body = JSON.stringify(payload);
    }

    const response = await fetch(URL, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error making API request:", error);
    return null;
  }
};
