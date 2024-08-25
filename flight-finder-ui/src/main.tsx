import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FlightSearchPage from "./pages/flightSearchPage.tsx";
import BookingPage from "./pages/bookingPage.tsx";
import PageLayout from "./pages/index.tsx";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "./reduxtoolkit/store/index.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    errorElement: <div>404 Not Found</div>,
    children: [
      {
        path: "/",
        element: <FlightSearchPage />,
        errorElement: <div>404 Not Found</div>,
      },
      {
        path: "/flight-search",
        element: <FlightSearchPage />,
        errorElement: <div>404 Not Found</div>,
      },
      {
        path: "/booking",
        element: <BookingPage />,
        errorElement: <div>404 Not Found</div>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#c84137",
          borderRadius: 2,

          // Alias Token
          // colorBgContainer: "#fbe5da",
        },
        components: {
          Card: {
            // headerBg: "#c84137", // "#ff463c",
          },
        },
      }}
    >
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ConfigProvider>
  </StrictMode>
);
