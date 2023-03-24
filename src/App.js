import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import AuthPage from "./pages/Auth";
import WelcomePage from "./pages/Welcome";
import UpdatProfilePage from "./pages/UpdateProfile";
import ErrorPage from "./pages/Error";
import PasswordChangePage from "./pages/PasswordChange";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <AuthPage /> },
        { path: "welcome", element: <WelcomePage /> },
        {
          path: "updateProfile",
          element: <UpdatProfilePage />,
        },
        { path: "forgot", element: <PasswordChangePage /> },
      ],
    },
  ]);
  return (
      <RouterProvider router={router} />
  );
}

export default App;
