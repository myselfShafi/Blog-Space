import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Category,
  CategoryPosts,
  Dashboard,
  EditPost,
  LoginPanel,
  Post,
  RootLayout,
  SignupPanel,
  UserPosts,
} from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/my-blogs",
        element: <UserPosts />,
      },
      {
        path: "/all-category",
        element: <Category />,
      },
      {
        path: "/all-category/:category",
        element: <CategoryPosts />,
      },
      {
        path: "/all-category/:category/:post",
        element: <Post />,
      },
      {
        path: "/edit-post",
        element: <EditPost />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPanel />,
  },
  {
    path: "/signup",
    element: <SignupPanel />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
