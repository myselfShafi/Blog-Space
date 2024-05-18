import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthRoute } from "./components";
import {
  Category,
  CategoryPosts,
  Dashboard,
  EditPost,
  LoginPanel,
  Post,
  ResetPass,
  RootLayout,
  SignupPanel,
  UserPosts,
  VerifyUser,
} from "./pages";
import store from "./store/store";

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
        element: (
          <AuthRoute authenticated>
            <UserPosts />
          </AuthRoute>
        ),
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
        element: (
          <AuthRoute authenticated>
            <EditPost />
          </AuthRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <AuthRoute authenticated={false}>
        <LoginPanel />
      </AuthRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthRoute authenticated={false}>
        <SignupPanel />
      </AuthRoute>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <AuthRoute authenticated={false}>
        <ResetPass />
      </AuthRoute>
    ),
  },
  {
    path: "/user-verification",
    element: (
      <AuthRoute authenticated={false}>
        <VerifyUser />
      </AuthRoute>
    ),
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
