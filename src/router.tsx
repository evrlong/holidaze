import { createBrowserRouter, Navigate } from "react-router";
import { HomePage } from "./pages/HomePage";
import { VenuePage } from "./pages/VenuePage";
import { Layout } from "./components/layout/Layout";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ProfilePage } from "./pages/ProfilePage";
import { CreateVenuePage } from "./pages/CreateVenuePage";
import { MyVenuesPage } from "./pages/MyVenuesPage";
import { MyBookingsPage } from "./pages/MyBookingsPage";
import { EditVenuePage } from "./pages/EditVenuePage";
import { EditProfilePage } from "./pages/EditProfilePage";
import { FaqPage } from "./pages/FaqPage";
import { ContactPage } from "./pages/ContactPage";
import { TermsPage } from "./pages/TermsPage";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/venues/:id", element: <VenuePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/faq", element: <FaqPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/terms", element: <TermsPage /> },
      {
        path: "/profile",
        element: <ProfilePage />,
        children: [
          { index: true, element: <Navigate to="bookings" replace /> },
          { path: "venues", element: <MyVenuesPage /> },
          { path: "bookings", element: <MyBookingsPage /> },
          { path: "register", element: <RegisterPage /> },
          { path: "venues/new", element: <CreateVenuePage /> },
        ],
      },
      { path: "/profile/edit", element: <EditProfilePage /> },
      { path: "/profile/venues/:id/edit", element: <EditVenuePage /> },

      {
        path: "/profile/create-venue",
        element: <Navigate to="/profile/venues/new" replace />,
      },
    ],
  },
]);
