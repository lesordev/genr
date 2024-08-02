import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "",
    Component: () => (
      <Suspense fallback={<div>Loading...</div>}>
        <div>Layout</div>
      </Suspense>
    ),
    ErrorBoundary: () => <div>Error</div>,
    children: [
      {
        index: true,
        Component: () => <div>Page</div>,
      },
      {
        path: "*",
        Component: () => <div>NotFound</div>,
      },
    ],
  },
]);

export const Routes = () => <RouterProvider router={router} />;
