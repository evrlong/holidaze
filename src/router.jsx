import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/HomePage.jsx";
import { VenuePage } from "./pages/VenuePage.jsx";
import { Layout } from "./components/Layout.jsx";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/venues/:id", element: <VenuePage /> },
    ],
  },
]);
