import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  About,
  Category,
  CategoryPosts,
  ContactUs,
  Dashboard,
  Post,
  RootLayout,
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
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
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
