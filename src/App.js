import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import AuthPage from "./pages/Auth";
import WelcomePage from "./pages/Welcome";
import UpdatProfilePage, {
  loader as profileInfoLoader,
} from "./pages/UpdateProfile";
import ErrorPage from "./pages/Error";
import PasswordChangePage from "./pages/PasswordChange";
import { ExpenseProvider } from "./store/expense-context";

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
          loader: profileInfoLoader,
        },
        { path: "forgot", element: <PasswordChangePage /> },
      ],
    },
  ]);
  return (
    <ExpenseProvider>
      <RouterProvider router={router} />
    </ExpenseProvider>
  );
}

export default App;
