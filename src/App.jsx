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
        path: "/all-category",
        element: (
          <>
            <h1>safshdf</h1>
          </>
        ),
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
