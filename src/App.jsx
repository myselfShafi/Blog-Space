import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Category,
  CategoryPosts,
  Dashboard,
  EditPost,
  Post,
  RootLayout,
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
