
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

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


  // all the link routes
  const router = createBrowserRouter([
    {
      path:"/", 
      element: <LandingPage />,
      errorElement:<Error />,
      children:[
        { path:'/signin', element: <SignIn />},
        { path:'/signup', element: <SignUp />},
      ]
    },
    {
      path:'/home',
      element: <Navbar />,
      children:[
        { index:true, element: <Home /> },
        { path:'/home/profile', element: <Profile />},
        { path:'/home/settings', 
          element: <Settings />,
          children:[
            { index:true, element: <UpdateInfo /> },
            { path:'/home/settings/updatepassword', element: <UpdatePassword /> },
            { path:'/home/settings/deleteaccount', element: <DeleteAccount /> },
            { path:'/home/settings/about', element: <About /> },
          ]
        },
        { path:'/home/explore', element: <Explore />},
        { path:'/home/userprofile', element: <UserProfile />},
      ]
    }
  ]);

  return (
    <>
      {/* routes */}
        <RouterProvider router={router} />
    </>
  );
}

export default App;
