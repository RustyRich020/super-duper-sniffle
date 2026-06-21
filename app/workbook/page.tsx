import type { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "The Forms Workbook",
  description:
    "A fillable template for every document type in the Glossary by Domain — one ready-to-use form per page.",
};

const Workbook = dynamic(() => import("@/components/workbook/Workbook"), {
  ssr: false,
});

export default function WorkbookPage() {
  return <Workbook />;
}
