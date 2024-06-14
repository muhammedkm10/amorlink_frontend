// App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRouter from './components/userside/UserRouter';
import {Provider} from 'react-redux'
import store from './store/store';
import AdminRouter from './components/adminside/AdminRouter';
import NotFoundPage from './components/userside/UI/Error';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js/pure";

export const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY)
function App() {
  // const [clientSecret, setClientSecret] = useState('');

  // useEffect(() => {
  //   // Fetch the clientSecret from your backend or other source
  //   // Replace this URL with your actual API endpoint
  //   fetch('/path/to/your/api/endpoint')
  //    .then(response => response.json())
  //    .then(data => {
  //       setClientSecret(data.clientSecret);
  //     })
  //    .catch(error => console.error('Error fetching client secret:', error));
  // }, []); // Empty dependency array means this effect runs once on mount

  // const options = {
  //   // Now you can dynamically pass the clientSecret
  //   clientSecret: clientSecret,
  // };

  return (
    <Provider store={store}>
      <Elements stripe={stripePromise} >
        <Router>
          <Routes>
            <Route path="/*" element={<UserRouter />} />
            <Route path="/admin/*" element={<AdminRouter/>}></Route>
           <Route path="/notfound" element={<NotFoundPage/>} />

          </Routes>
        </Router>
      </Elements>
    </Provider>
  );
}

export default App;
