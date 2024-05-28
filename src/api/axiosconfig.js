import axios from 'axios';
import { backendurls } from './backendEndpoints';


// api clint that does not need tokens  (for login and signup)

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
   

});


// api clint that should need tokens   (for other endpoints )
export const authentcatedApiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});




//     if we need add this interceptors adding tokens with each request
  authentcatedApiClient.interceptors.request.use(
  config => {
    const tokenString = localStorage.getItem("authUserTokens"); 
    const token = JSON.parse(tokenString)
    if (token.access) {
      config.headers.Authorization = `Bearer ${token.access}`;
    }
    return config;
  },
  error => {
    return new Promise(() => {});
  }
);




// fucniton for refresh token for user and admin
async function refreshAccessToken(refreshToken,user,redirectUrl) {
  
  try {
    const response = await apiClient.post(backendurls.refreshtokenurl, { refresh: refreshToken });
    // Save the new tokens to localStorage
    if (user === "user"){
      localStorage.setItem("authUserTokens", JSON.stringify(response.data));
      return authentcatedApiClient(redirectUrl);
    }
    else if (user === "admin"){
      localStorage.setItem("authAdminTokens", JSON.stringify(response.data));
      return admin_authentcatedApiClient(redirectUrl);
    }
   
  } catch (error) {
    console.error("Error refreshing token:", error);
   
  }
}





// Add a response interceptor
authentcatedApiClient.interceptors.response.use(
  // If there is no error
  (response) => {
    return response;
  },
  // if the error occured
  (error) => {
    const redirectUrl = error.config;
    if (error.response && error.response.status === 401) {
      redirectUrl._retry = true;
      // Retrieve the current tokens from localStorage
      const userTokens = localStorage.getItem('authUserTokens');
      const token = JSON.parse(userTokens);
      const refreshToken = token.refresh;
      // Call the async function to refresh the access token
      refreshAccessToken(refreshToken,"user",redirectUrl);
    }
    return new Promise(() => {});

  }
);








// admin side api clients  api clints that does not need authentication (for login)
export const adminApiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


// admin side api clients  api clints that should need authentication (for other endpoints)

export const admin_authentcatedApiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


// adding the token with each requsts using interceptors

admin_authentcatedApiClient.interceptors.request.use(
  config => {
    const tokenString = localStorage.getItem("authAdminTokens"); 
    const token = JSON.parse(tokenString)
    if (token.access) {
      config.headers.Authorization = `Bearer ${token.access}`;
    }
    return config;
  },
  error => {
    return new Promise(() => {});
  }
);




// Add a response interceptor for refresh token for admin

admin_authentcatedApiClient.interceptors.response.use(
  // If there is no error
  (response) => {
    return response;
  },
  (error) => {
    const redirectUrl = error.config;
    if (error.response && error.response.status === 401) {
      redirectUrl._retry = true;
      // Retrieve the current tokens from localStorage
      const userTokens = localStorage.getItem('authAdminTokens');
      const token = JSON.parse(userTokens);
      const refreshToken = token.refresh;
      // Call the async function to refresh the access token
      refreshAccessToken(refreshToken,"user",redirectUrl);
    }
    return new Promise(() => {});
  }
);

export default apiClient;







