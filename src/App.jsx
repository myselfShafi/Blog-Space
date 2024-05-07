import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Dashboard, Post, RootLayout } from "./pages";

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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
