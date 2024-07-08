import axios from 'axios';
import { backendurls } from './backendEndpoints';
import Swal from 'sweetalert2';
import '../assets/css/sweetalert-custom.css'


// api clint that does not need tokens  (for login and signup)

const apiClient = axios.create({
  baseURL:import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
   

});


// api clint that should need tokens   (for other endpoints )
export const authentcatedApiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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
      authentcatedApiClient.defaults.headers.common.Authorization = `Bearer ${response.data.access}`
      redirectUrl.headers['Authorization'] = `Bearer ${response.data.access}`
      return  authentcatedApiClient(redirectUrl);
    }
    else if (user === "admin"){
      localStorage.setItem("authAdminTokens", JSON.stringify(response.data));
      admin_authentcatedApiClient.defaults.headers.common.Authorization = `Bearer ${response.data.access}`
      redirectUrl.headers['Authorization'] = `Bearer ${response.data.access}`
      return  admin_authentcatedApiClient(redirectUrl);
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
  async (error) => {
    const redirectUrl = error.config;
    if (error.response && error.response.status === 403){
         localStorage.removeItem("authUserTokens")
         localStorage.removeItem("user_id")
      window.location.href= "/?message=Match removed successfully"
    }
    if (error.response && error.response.status === 401) {
      redirectUrl._retry = true;

      // Retrieve the current tokens from localStorage
      const userTokens = localStorage.getItem('authUserTokens');
      const token = JSON.parse(userTokens);
      const refreshToken = token.refresh;
      try {
        await refreshAccessToken(refreshToken, "user", redirectUrl);

        return authentcatedApiClient(redirectUrl);
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
      }
    }
    return new Promise(() => {});

  }
);



// admin side api clients  api clints that does not need authentication (for login)
export const adminApiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


// admin side api clients  api clints that should need authentication (for other endpoints)

export const admin_authentcatedApiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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
  async (error) => {
    const redirectUrl = error.config;
    if (error.response && error.response.status === 401) {
      redirectUrl._retry = true;
      // Retrieve the current tokens from localStorage
      const userTokens = localStorage.getItem('authAdminTokens');
      const token = JSON.parse(userTokens);
      const refreshToken = token.refresh;
      // Call the async function to refresh the access token
      try {
        await refreshAccessToken(refreshToken,"admin",redirectUrl);
        return admin_authentcatedApiClient(redirectUrl);
      }
      catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
      }
    }
    return new Promise(() => {});
  }
);

export default apiClient;







