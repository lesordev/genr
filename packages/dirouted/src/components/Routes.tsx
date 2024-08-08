import { Diroute, Module } from "@/types/dirouted.type";
import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom";
import { SuspenseLayout } from "./Layout";
import { ErrorBoundary } from "./ErrorBoundary";
import { validateRoutes } from "@/utils/validateRoutes";

import { toDiroute } from "@/utils/toDiroute";

function toRouteObject(diroute: Diroute): RouteObject {
  const rootRoute: RouteObject = {};

  const loop = (route: RouteObject, diroute: Diroute, segment: string) => {
    const {
      layout: Layout,
      page: Page,
      loading: Loading,
      error: Error,
      notFound: NotFound,
      ...children
    } = diroute;

    route.path = segment;
    const isGroup = !!segment.match(/^\(.+\)$/);
    const isDynamic = !!segment.match(/^\[.+\]$/);
    const isDynamicAll = !!segment.match(/^\[\.\.\.(.+)\]$/);

    isGroup && (route.path = "");
    isDynamic && (route.path = `:${segment.slice(1, -1)}`);
    // isDynamicAll && (route.path = `/*`);

    if (Layout) {
      route.element = <SuspenseLayout layout={Layout} loading={Loading} />;
    }

    if (Page) {
      (route.children ??= []).push({ index: true, element: <Page /> });
    }

    if (Error) {
      route.errorElement = <ErrorBoundary layout={Layout} error={Error} />;
    }

    Object.entries(children).forEach(([segment, value]) => {
      const childRoute: RouteObject = {};
      (route.children ??= []).push(childRoute);

      loop(childRoute, value as Diroute, segment);
    });
  };

  loop(rootRoute, diroute["/"] as Diroute, "/");

  return rootRoute;
}

const FILES = import.meta.glob<Module>(
  "/src/pages/**/(error|layout|loading|not-found|page).{jsx,tsx}",
  { eager: true }
);

validateRoutes(FILES);
const diroute = toDiroute(FILES);
const route = toRouteObject(diroute);
const router = createBrowserRouter([route]);

export const Routes = () => <RouterProvider router={router} />;
