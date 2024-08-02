import { PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col">
      <div>Root layout</div>
      {children}
    </div>
  );
}
