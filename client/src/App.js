
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Third from './Components/Third';
import LandingPage from './Pages/LandingPage';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';

function App() {
  // all the link routes
  const router = createBrowserRouter([
    {
      path:"/", 
      element: <LandingPage />,
      children:[
        { path:'/signin', element: <SignIn />},
        { path:'/signup', element: <SignUp />},
      ]
    },
    {
      path:'/home',
      element: <Navbar />,
      children:[
        { index:true, element: <Home />},
        { path:'/home/third', element: <Third />},
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
