import { AuthContextProvider } from './contexts/UserContext';
import { Routes, Route } from "react-router-dom";
import Homepage from './components/HomePage/HomePage';
import NavigationHeader from './components/NavigationHeader/NavigationHeader';
import { AlertProvider } from './contexts/AlertContext';
import Register from './components/Register/Register'
import Alert from './components/Alert/Alert';
import Logout from './components/Logout/Logout';
import Login from './components/Login/Login';
import RouteGuard from './components/Common/RouteGuard';
import Gallery from './components/Gallery/Gallery';
import CreatePhotos from './components/CreatePhoto/CreatePhoto';
import Details from './components/Details/Details';
import EditComment from './components/Comment/EditComment/EditComment';

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
          <Route path="/photos/:photoTitle" element={<Details />} />
          <Route path="/categories/:categoryId" element={<Gallery />} />
          <Route element={<RouteGuard />}>
            <Route path="/categories/:categoryId/createPhoto" element={<CreatePhotos />} />
            <Route path="/comments/:photoTitle/:commentId/edit" element={<EditComment />} />


            {/* <Route path="/profile" element={<Profile />} />
            <Route path="/edit/:categoryId/:photoId" element={<EditPhoto />} />
            <Route path="/createCategory" element={<CreateCategoryForm />} />
            <Route path="/admin" element={<Admin />} /> */}
          </Route>
        </Routes>
      </AlertProvider>
    </AuthContextProvider>

  );
}

export default App;
