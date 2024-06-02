// App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRouter from './components/userside/UserRouter';
import {Provider} from 'react-redux'
import store from './store/store';
import AdminRouter from './components/adminside/AdminRouter';
import NotFoundPage from './components/userside/UI/Error';

function App() {
  return (
    <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/*" element={<UserRouter />} />
            <Route path="/admin/*" element={<AdminRouter/>}></Route>
           <Route path="/notfound" element={<NotFoundPage/>} />

          </Routes>
        </Router>
    </Provider>
  );
}

export default App;
