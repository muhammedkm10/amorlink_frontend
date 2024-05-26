import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
   

});


//   authentication needed  api client

export const authentcatedApiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
   

});




//     if we need add this interceptors for all requests that is not needed
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
    return Promise.reject(error);
  }
);



export const adminApiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const admin_authentcatedApiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
    return Promise.reject(error);
  }
);




export default apiClient;






//                updating header function if needed
// export function updateAxiosHeaderOnLogin() {
//   const tokenString = localStorage.getItem("authUserTokens");
//   const token = JSON.parse(tokenString);

//   // Update the Authorization header in the Axios instance
//   if (token.access) {
//     apiClient.defaults.headers.common['Authorization'] = `Bearer ${token.access}`;
//   } else {
//     delete apiClient.defaults.headers.common['Authorization'];
//   }
// }
