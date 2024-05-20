// App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRouter from './components/userside/UserRouter';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/user/*" element={<UserRouter />} />
      </Routes>
    </Router>
  );
}

export default App;
