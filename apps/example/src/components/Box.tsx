import { PropsWithChildren } from "react";

type BoxProps = PropsWithChildren<{ className?: string }>;

export function Box({ children, className }: BoxProps) {
  return (
    <div className={`border border-dashed border-blue-500 rounded p-2 ${className}`}>
      {children}
    </div>
  );
}
