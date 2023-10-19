
import { createBrowserRouter, createRoutesFromElements, Navigate, Outlet, Route, RouterProvider, useLocation } from 'react-router-dom';

import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Profile from './Pages/Profile';
import LandingPage from './Pages/LandingPage';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Explore from './Pages/Explore';
import Settings from './Pages/Settings';
import UpdateInfo from './Components/UpdateInfo';
import UpdatePassword from './Components/UpdatePassword';
import DeleteAccount from './Components/DeleteAccount';
import About from './Components/About';
import Error from './Pages/Error';
import UserProfile from './Pages/UserProfile';

// Create a custom guard to check if the user is authenticated
const isUserAuthenticated = () => {
  // Return true if the user is authenticated, false otherwise
  const token = localStorage.getItem('token');
  if(token){
    return true;
  }
  return false; // For example, the user is not authenticated
};

// ProtectedRoute component to wrap the routes you want to restrict
const ProtectedRoute = () => {
  const isAuthenticated = isUserAuthenticated();
  const location = useLocation();
  return isAuthenticated 
    ?
    <Outlet /> 
    :
    <Navigate to="/signin" state={{from:location}} replace /> 
};


const ProtectedAuthRoute = () => {
  const isAuthenticated = isUserAuthenticated();
  const location = useLocation();
  return !isAuthenticated 
    ?
    <Outlet /> 
    :
    <Navigate to="/home" state={{from:location}} replace /> 
};


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route element={<ProtectedAuthRoute />}>
        <Route path='/' element={<LandingPage />}>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path='/home' element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path='profile' element={<Profile />} />
          <Route path='explore' element={<Explore />} />
          <Route path='userprofile' element={<UserProfile />} />
          <Route path='settings' element={<Settings />} >
            <Route index element={<UpdateInfo />} />
            <Route path='updatepassword' element={<UpdatePassword />} />
            <Route path='deleteaccount' element={<DeleteAccount />} />
            <Route path='about' element={<About />} />
          </Route>
        </Route>
      </Route>
      <Route path='*' element={<Error />} />
      </>
    )
  );
  

  return (
    <>
      {/* routes */}
        <RouterProvider router={router} />
    </>
  );
}

export default App;
