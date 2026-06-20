import type { Metadata } from "next";
import FormsApp from "@/components/forms/FormsApp";

export const metadata: Metadata = {
  title: "Forms — QQ-Studios",
};

export default function Page() {
  return <FormsApp />;
}
