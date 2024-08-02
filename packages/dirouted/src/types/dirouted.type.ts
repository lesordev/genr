import { PropsWithChildren } from "react";

type Element = () => JSX.Element;
type ElementWithChildren = (props: PropsWithChildren) => JSX.Element;

export type Page = { default: Element; loader: () => unknown };
export type Layout = { default: ElementWithChildren };
export type Error = { default: Element };
export type NotFound = { default: Element };
export type Loading = { default: Element };

export type Node = {
  Page: Page;
  Layout: Layout;
  Error: Error;
  NotFound: NotFound;
  children: Node[];
};
