import React from "react";

import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import RootLayout from "./pages/Root";
import AuthPage from "./pages/Auth";
import WelcomePage from "./pages/Welcome";
import UpdatProfilePage from "./pages/UpdateProfile";

function App() {

  const router=createBrowserRouter([
    {path:'/', element:<RootLayout/>,children:[
      {index: true , element:<AuthPage/>},
      {path:'welcome',element:<WelcomePage/>},
      {path:'updateProfile',element:<UpdatProfilePage/>}
    ]}
  ])
  return (
    <div>
    <RouterProvider router={router}/>
    </div>
  );
}

export default App;
