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
import CreatePhotos from './components/CreatePhotos/CreatePhotos';
import Details from './components/Details/Details';
import EditComment from './components/Comment/EditComment/EditComment';
import EditPhoto from './components/EditPhoto/EditPhoto';

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
          <Route path="/photos/:photoId" element={<Details />} />
          <Route path="/categories/:categoryId" element={<Gallery />} />
          <Route path="/categories/:categoryId/createPhoto" element={<CreatePhotos />} />
          <Route element={<RouteGuard />}>
            <Route path="/comments/:photoId/:commentId/edit" element={<EditComment />} />
            <Route path="/edit/:categoryId/:photoId" element={<EditPhoto />} />

            {/* <Route path="/profile" element={<Profile />} />
            <Route path="/createCategory" element={<CreateCategoryForm />} />
            <Route path="/admin" element={<Admin />} /> */}
          </Route>
        </Routes>
      </AlertProvider>
    </AuthContextProvider>

  );
}

export default App;
