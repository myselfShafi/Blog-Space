import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Dashboard, Post, RootLayout } from "./pages";
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
        path: "/post",
        element: <Post />,
      },
      {
        path: "/all-posts",
        element: <Post />,
      },
      {
        path: "/all-posts/:category",
        element: <CategoryPosts />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
