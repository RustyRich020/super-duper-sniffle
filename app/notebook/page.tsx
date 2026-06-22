import type { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "The Documentation Reference Book — QQ-Studios",
  description:
    "A paginated A4 field guide to software development documentation: eight chapters and two appendices, flowed onto print-ready sheets.",
};

const Notebook = dynamic(() => import("@/components/notebook/Notebook"), {
  ssr: false,
});

export default function NotebookPage() {
  return <Notebook />;
}
