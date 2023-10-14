
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';

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
import { useEffect, useState } from 'react';

function App() {

  const [token,setToken] = useState(null);

  useEffect(() => {
    const isToken = localStorage.getItem('token');
    if(isToken){
      setToken(true);
    }
  },[])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path='/' element={ token ? <Navigate to={'/home'} /> : <LandingPage />} errorElement={<Error />}>
        <Route path='signin' element={ <SignIn />} />
        <Route path='signup' element={ <SignUp />} />
      </Route>
      <Route path='/home' element={ !token ? <Navigate to={'/'} /> : <Navbar />} errorElement={<Error />}>
        <Route index={true} element={<Home />} />
        <Route path='profile' element={<Profile />} />
        <Route path='explore' element={<Explore />} />
        <Route path='userprofile' element={<UserProfile />} />
        <Route path='settings' element={<Settings />} errorElement={<Error />}>
          <Route index={true} element={<UpdateInfo />} />
          <Route path='updatepassword' element={<UpdatePassword />} />
          <Route path='deleteaccount' element={<DeleteAccount />} />
          <Route path='about' element={<About />} />
        </Route>
      </Route>
      </>
    )
  )
  

  return (
    <>
      {/* routes */}
        <RouterProvider router={router} />
    </>
  );
}

export default App;
