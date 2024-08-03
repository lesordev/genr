import { DiroutedNode, Module } from "@/types/dirouted.type";
import { Suspense } from "react";
import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom";
import { SuspenseLayout } from "./Layout";
import { ErrorBoundary } from "./ErrorBoundary";
import { transformKeys } from "@/utils/transformKeys";
import { validateRoutes } from "@/utils/validateRoutes";
import { setTree } from "@/utils/setTree";

function dfsLoop(route: RouteObject, node: DiroutedNode, segment: string) {
  const {
    layout: Layout,
    page: Page,
    loading: Loading,
    error: Error,
    notFound: NotFound,
    ...children
  } = node;

  route.path = segment;

  if (Page) {
    (route.children ??= []).push({ index: true, Component: Page });
  }

  if (Layout) {
    route.element = <SuspenseLayout layout={Layout} loading={Loading} />;
  }

  if (Error) {
    route.errorElement = <ErrorBoundary layout={Layout} error={Error} />;
  }

  for (const [key, value] of Object.entries(children)) {
    const childRoute: RouteObject = {};
    (route.children ??= []).push(childRoute);
    const isGroup = key.startsWith("(") && key.endsWith(")");
    const isDynamic = key.startsWith("[") && key.endsWith("]");

    let segment = key;
    isGroup && (segment = "");
    isDynamic && (segment = `:${key.slice(1, -1)}`);

    dfsLoop(childRoute, value as DiroutedNode, segment);
  }
}

function computeRoutes(): RouteObject[] {
  const FILE_MODULES = transformKeys(
    import.meta.glob<Module>("/src/pages/**/*.{jsx,tsx}", { eager: true })
  );

  validateRoutes(FILE_MODULES);

  const tree: DiroutedNode = {};
  for (const [key, value] of Object.entries(FILE_MODULES)) {
    const segments = key.split("/");
    const name = segments.pop()?.slice(0, -".tsx".length)!;

    if (!value.default) {
      throw Error(`Missing default export in ${key}`);
    }

    setTree(tree, segments.concat(name), value.default);
  }

  const route: RouteObject = {};
  dfsLoop(route, tree[""] as DiroutedNode, "");

  return [route];
}

const router = createBrowserRouter(computeRoutes());

export const Routes = () => <RouterProvider router={router} />;
