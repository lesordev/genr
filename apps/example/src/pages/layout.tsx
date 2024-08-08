import { Sidebar } from "@/components/Sidebar";
import { PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex gap-4 p-4 h-screen">
      <Sidebar />

      <main>{children}</main>
    </div>
  );
}
