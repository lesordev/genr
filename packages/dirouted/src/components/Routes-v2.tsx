import { Module } from "@/types/dirouted.type";
import { ComponentType, Fragment, lazy, PropsWithChildren, ReactElement, Suspense } from "react";
import { createBrowserRouter, Outlet, RouteObject, RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "./ErrorBoundary";

type RawRoute = {
  id: string;
  originPath: string;
  path: string;
  page: ReactElement;
};

function transformSegment(segment: string) {
  const isGroup = segment.match(/^\(.+\)$/);
  if (isGroup) {
    return "";
  }

  const isDynamicAll = segment.match(/^\[\.\.\.(.+)\]$/);
  if (isDynamicAll) {
    return "*";
  }

  const isDynamic = segment.match(/^\[.+\]$/);
  if (isDynamic) {
    return `:${segment.slice(1, -1)}`;
  }

  return segment;
}

const FILES = import.meta.glob<Module>(
  "/src/pages/**/(error|layout|loading|not-found|page).{jsx,tsx}"
  // { eager: true }
);
console.table(FILES);

const rawRoutes: RawRoute[] = [];

Object.entries(FILES).forEach(([path, page]) => {
  if (!path.endsWith("page.tsx")) return;

  const Page = lazy(page);

  const route: RawRoute = {
    id: path.slice(0, -"/page.tsx".length),
    originPath: "",
    path: "",
    page: <Page />,
  };

  path.split("/").forEach((segment) => {
    route.originPath += `${segment}/`;

    // INFO: add loading
    const loading = FILES[`${route.originPath}loading.tsx`];
    if (loading) {
      const Loading = lazy(loading);
      route.page = <Suspense fallback={<Loading />}>{route.page}</Suspense>;
    }

    // INFO: add error
    const error = FILES[`${route.originPath}error.tsx`];
    if (error) {
      const Error = lazy(error);
      route.page = <ErrorBoundary fallback={Error}>{route.page}</ErrorBoundary>;
    }

    // INFO: add layout
    const layout = FILES[`${route.originPath}layout.tsx`];
    if (layout) {
      const Layout = lazy(layout) as ComponentType<PropsWithChildren>;
      route.page = <Layout>{route.page}</Layout>;
    }

    if (segment !== "page.tsx") {
      route.path += `${transformSegment(segment)}/`;
    }

    return route;
  });

  route.path = route.path.slice("/src/pages".length).replaceAll("//", "/").replace(/\/$/, "");
  rawRoutes.push(route);
});

const routes = rawRoutes.map<RouteObject>((route) => ({
  id: route.id,
  path: route.path,
  element: route.page,
}));

console.table(routes);

const router = createBrowserRouter(routes);

export const Routes = () => <RouterProvider router={router} />;
