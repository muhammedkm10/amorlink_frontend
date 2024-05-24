// App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRouter from './components/userside/UserRouter';
import {Provider} from 'react-redux'
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/*" element={<UserRouter />} />
          </Routes>
        </Router>
    </Provider>
  );
}

export default App;
