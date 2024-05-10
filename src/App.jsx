import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Dashboard, Post, RootLayout } from "./pages";
import Category from "./pages/category";
import CategoryPosts from "./pages/categoryPosts";

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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
