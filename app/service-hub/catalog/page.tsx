import Link from "next/link";
const services = [
  ["Access & identity", "Accounts, permissions, Microsoft 365, and workspace access."],
  ["Applications", "Workspace features, integrations, defects, and product support."],
  ["Data & reporting", "Power BI, Fabric, metrics, semantic models, and distribution."],
  ["Automation", "Workflow requests, operational automation, and integrations."],
  ["Client support", "Isolated client-portal, deliverable, and collaboration requests."],
  ["Security & incidents", "Report suspicious activity, outages, or service degradation."],
];
export default function CatalogPage(){return <><div className="sh-eyebrow">Service catalog</div><h1 className="sh-title">Find the right service.</h1><p className="sh-lede">Choose a category to route your request with the context its owner needs.</p><div className="sh-grid two">{services.map(([t,d])=><article className="sh-card" key={t}><h2>{t}</h2><p>{d}</p><div className="sh-actions"><Link className="sh-button" href="/service-hub/requests/new">Create request</Link></div></article>)}</div></>}
