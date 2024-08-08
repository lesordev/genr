import { Component, ComponentType, PropsWithChildren, ReactNode } from "react";

type ErrorBoundaryProps = PropsWithChildren<{
  fallback: ComponentType<{ error: Error }>;
}>;

type ErrorBoundaryState = {
  error: Error | false;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    const { fallback: Fallback, children } = this.props;
    const { error } = this.state;

    return error ? <Fallback error={error} /> : children;
  }
}
