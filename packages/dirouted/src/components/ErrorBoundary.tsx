import { ErrorComponent, LayoutComponent } from "@/types/dirouted.type";
import { useRouteError } from "react-router-dom";

type WrapErrorProps = {
  layout?: LayoutComponent;
  error: ErrorComponent;
};

export function ErrorBoundary({ error: Error, layout: Layout }: WrapErrorProps) {
  const error = useRouteError();

  return Layout ? (
    <Layout>
      <Error error={error} />
    </Layout>
  ) : (
    <Error error={error} />
  );
}
