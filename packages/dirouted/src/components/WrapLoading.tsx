import { BaseComponent, LayoutComponent } from "@/types/dirouted.type";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

type WrapLoadingProps = {
  loading?: BaseComponent;
  layout: LayoutComponent;
};

export function WrapLoading({ loading: Loading, layout: Layout }: WrapLoadingProps) {
  const element = (
    <Layout>
      <Outlet />
    </Layout>
  );

  return Loading ? <Suspense fallback={<Loading />}>{element}</Suspense> : element;
}
