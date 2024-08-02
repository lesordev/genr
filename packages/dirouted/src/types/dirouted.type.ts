import { PropsWithChildren } from "react";

export type BaseComponent = () => JSX.Element;
export type LayoutComponent = (props: PropsWithChildren) => JSX.Element;
export type ErrorComponent = (props: { error: unknown }) => JSX.Element;

export type Module = { default: BaseComponent };

export type DiroutedNode = {
  page?: BaseComponent;
  layout?: LayoutComponent;
  error?: ErrorComponent;
  notFound?: BaseComponent;
  loading?: BaseComponent;
  [key: string]: BaseComponent | LayoutComponent | ErrorComponent | DiroutedNode | undefined;
};
