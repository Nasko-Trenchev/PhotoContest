import { AuthContextProvider } from './contexts/UserContext';
import { Routes, Route } from "react-router-dom";
import Homepage from './components/HomePage/HomePage';
import NavigationHeader from './components/NavigationHeader/NavigationHeader';
import { AlertProvider } from './contexts/AlertContext';
import Register from './components/Register/Register'
import Alert from './components/Alert/Alert';
import Logout from './components/Logout/Logout';
import Login from './components/Login/Login';

function App() {
  return (
    <AuthContextProvider>
      <AlertProvider>
        <Alert />
        <NavigationHeader />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </AlertProvider>
    </AuthContextProvider>

  );
}

export default App;
