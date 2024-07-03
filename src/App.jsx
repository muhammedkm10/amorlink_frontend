// App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRouter from './components/userside/UserRouter';
import { Provider } from 'react-redux';
import store from './store/store';
import AdminRouter from './components/adminside/AdminRouter';
import NotFoundPage from './components/userside/UI/Error';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js/pure';
import { ToastContainer, toast } from 'react-toastify';  // Import react-toastify
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify CSS
import NotificationComponent from './utils/NotificationComponent';

export const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);

function App() {
  const user_id = localStorage.getItem("user_id");
  console.log(user_id);
  const excludePaths = ['/chat/:userId/:name'];

  return (
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <Router>
          <Routes>
            <Route path="/*" element={<UserRouter />} />
            <Route path="/admin/*" element={<AdminRouter />} />
            <Route path="/notfound" element={<NotFoundPage />} />
          </Routes>
        </Router>
        <ToastContainer
          position="bottom-right"
          closeOnClick
          pauseOnHover
          />
        <NotificationComponent userId={user_id} excludePaths={excludePaths} /> {/* Pass excludePaths prop */}
      </Elements>
    </Provider>
  );
}

export default App;
