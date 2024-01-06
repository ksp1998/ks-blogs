import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Protect from "./components/Protect.tsx";
import {
  AllBlogs,
  Blog,
  CreateBlog,
  EditBlog,
  Home,
  Myblogs,
  SignIn,
  SignUp,
} from "./pages";
import Template from "./pages/Template.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signin",
        element: (
          <Protect authenticate={false}>
            <SignIn />
          </Protect>
        ),
      },
      {
        path: "/signup",
        element: (
          <Protect authenticate={false}>
            <SignUp />
          </Protect>
        ),
      },
      {
        path: "/blogs",
        element: <AllBlogs />,
      },
      {
        path: "/create",
        element: (
          <Protect authenticate>
            <CreateBlog />
          </Protect>
        ),
      },
      {
        path: "/edit-blog/:slug",
        element: (
          <Protect authenticate>
            <EditBlog />
          </Protect>
        ),
      },
      {
        path: "/my-blogs",
        element: (
          <Protect authenticate>
            <Myblogs />
          </Protect>
        ),
      },
      {
        path: "/blog/:slug",
        element: <Blog />,
      },
      {
        path: "/template",
        element: <Template />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
