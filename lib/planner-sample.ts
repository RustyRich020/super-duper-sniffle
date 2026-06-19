// Sample data for the PMBOK Project Planner dashboard — ported verbatim from
// the prototype's getSampleData() in "Interactive Forms.dc.html". Used as the
// fallback when there is no live Supabase aggregation available.

export interface PlannerProject {
  id?: string;
  code: string;
  name: string;
  phase: string;
  pct: number;
  rag: string;
  pm: string;
  cpi: number;
  spi: number;
  bac: number;
  spent: number;
  risks: number;
  note: string;
}

export interface PlannerRisk {
  n: string;
  cat: string;
  l: number;
  i: number;
  owner: string;
  status: string;
  sc?: number;
  m?: string;
}

export interface PlannerData {
  source: string;
  projects: PlannerProject[];
  risks: PlannerRisk[];
  change: { open: number; pending: number; approved: number; recent: { code: string; desc: string; status: string }[] };
  status: { reports: number; onTrack: number; watch: number; atRisk: number };
  kas: [string, string][];
  milestones: { d: string; n: string; p: string; s: string; baseline?: string; forecast?: string; slip: number }[];
  team: [string, number][];
  accomplishments: string[];
  nextSteps: string[];
  costCategories: [string, number][];
  changeLog: { code: string; title: string; type: string; status: string; cost: string; sched: string }[];
  stakeholders: { name: string; role: string; influence: string; interest: string; eng: string }[];
  lessons: { lesson: string; cat: string; rec: string; status: string }[];
  closureItems: { item: string; done: boolean }[];
  openRisks: number;
  critical: number;
}

export function getSampleData(): PlannerData {
  const projects: PlannerProject[] = [
    { code: 'ATL', name: 'Atlas Platform Migration', phase: 'Execution', pct: 62, rag: 'amber', pm: 'D. Okafor', cpi: 0.97, spi: 1.02, bac: 1.8, spent: 1.16, risks: 3, note: 'Cutover dry run scheduled; data mapping complete.' },
    { code: 'ORN', name: 'Orion Data Lake', phase: 'Planning', pct: 28, rag: 'green', pm: 'S. Reyes', cpi: 1.04, spi: 0.98, bac: 1.1, spent: 0.30, risks: 1, note: 'Ingestion architecture finalized; on plan.' },
    { code: 'HEL', name: 'Helix Compliance Uplift', phase: 'Execution', pct: 45, rag: 'red', pm: 'M. Lindqvist', cpi: 0.88, spi: 0.90, bac: 2.4, spent: 1.20, risks: 5, note: 'Audit gate at risk; vendor SLA pressure.' },
    { code: 'VEG', name: 'Vega Mobile Revamp', phase: 'Initiation', pct: 12, rag: 'green', pm: 'A. Becker', cpi: 1.00, spi: 1.00, bac: 0.6, spent: 0.05, risks: 0, note: 'Design phase kicking off this week.' },
    { code: 'NOV', name: 'Nova Billing Engine', phase: 'Closing', pct: 94, rag: 'green', pm: 'J. Park', cpi: 1.01, spi: 1.03, bac: 1.5, spent: 1.44, risks: 1, note: 'UAT passed; preparing go-live.' },
  ];
  const risks: PlannerRisk[] = [
    { n: 'Regulatory submission slips past deadline', cat: 'Compliance', l: 5, i: 4, owner: 'M. Lindqvist', status: 'Open' },
    { n: 'Data migration corruption on cutover', cat: 'Technical', l: 4, i: 4, owner: 'D. Okafor', status: 'Open' },
    { n: 'Key vendor SLA breach', cat: 'Procurement', l: 3, i: 4, owner: 'M. Lindqvist', status: 'Mitigating' },
    { n: 'Schema churn delays ingestion', cat: 'Schedule', l: 3, i: 3, owner: 'S. Reyes', status: 'Open' },
    { n: 'Resource contention with Nova', cat: 'Resource', l: 2, i: 4, owner: 'D. Okafor', status: 'Watching' },
    { n: 'Budget over-run on Helix uplift', cat: 'Cost', l: 3, i: 2, owner: 'M. Lindqvist', status: 'Mitigating' },
  ];
  risks.forEach((r) => { r.sc = r.l * r.i; r.m = r.cat + ' · ' + r.owner; });
  risks.sort((a, b) => (b.sc || 0) - (a.sc || 0));
  const change = {
    open: 4, pending: 2, approved: 7, recent: [
      { code: 'CR-114', desc: 'Helix — extend audit scope', status: 'Pending' },
      { code: 'CR-112', desc: 'Atlas — add rollback window', status: 'Approved' },
      { code: 'CR-109', desc: 'Nova — defer reporting module', status: 'Rejected' },
    ],
  };
  const status = { reports: 5, onTrack: 3, watch: 1, atRisk: 1 };
  const kas: [string, string][] = [['Integration', 'green'], ['Scope', 'amber'], ['Schedule', 'amber'], ['Cost', 'red'], ['Quality', 'green'], ['Resource', 'green'], ['Communications', 'green'], ['Risk', 'red'], ['Procurement', 'green'], ['Stakeholder', 'amber']];
  const milestones = [
    { d: 'Jun 24', n: 'Cutover dry run', p: 'Atlas', s: 'risk', baseline: 'Jun 20', forecast: 'Jun 24', slip: 4 },
    { d: 'Jul 02', n: 'Data model sign-off', p: 'Orion', s: 'ok', baseline: 'Jul 02', forecast: 'Jul 02', slip: 0 },
    { d: 'Jul 09', n: 'Audit readiness gate', p: 'Helix', s: 'risk', baseline: 'Jul 01', forecast: 'Jul 09', slip: 8 },
    { d: 'Jul 15', n: 'Go-live', p: 'Nova', s: 'ok', baseline: 'Jul 14', forecast: 'Jul 15', slip: 1 },
    { d: 'Jul 22', n: 'Design baseline', p: 'Vega', s: 'ok', baseline: 'Jul 22', forecast: 'Jul 22', slip: 0 },
  ];
  const team: [string, number][] = [['Engineering', 14.0], ['Data & Analytics', 6.5], ['Quality & Compliance', 4.0], ['Product', 3.5], ['PMO', 2.0]];
  const accomplishments = ['Atlas — completed data mapping for 14 source systems', 'Nova — passed UAT with zero P1 defects', 'Orion — finalized ingestion architecture'];
  const nextSteps = ['Helix — submit audit evidence package', 'Atlas — execute cutover dry run', 'Vega — lock the design baseline'];
  const costCategories: [string, number][] = [['Labor', 2.60], ['Vendor', 1.00], ['Materials', 0.35], ['Other', 0.20]];
  const changeLog = [
    { code: 'CR-114', title: 'Helix — extend audit scope', type: 'Scope', status: 'Pending', cost: '+$80k', sched: '+5d' },
    { code: 'CR-112', title: 'Atlas — add rollback window', type: 'Schedule', status: 'Approved', cost: '+$15k', sched: '+2d' },
    { code: 'CR-110', title: 'Orion — add data-quality checks', type: 'Quality', status: 'Approved', cost: '+$40k', sched: '0d' },
    { code: 'CR-109', title: 'Nova — defer reporting module', type: 'Scope', status: 'Rejected', cost: '-$60k', sched: '-10d' },
    { code: 'CR-107', title: 'Atlas — upgrade message broker', type: 'Technical', status: 'Approved', cost: '+$25k', sched: '+1d' },
    { code: 'CR-103', title: 'Helix — additional control evidence', type: 'Compliance', status: 'Pending', cost: '+$30k', sched: '+3d' },
  ];
  const stakeholders = [
    { name: 'CFO — R. Adeyemi', role: 'Sponsor', influence: 'High', interest: 'High', eng: 'green' },
    { name: 'Head of Compliance', role: 'Approver', influence: 'High', interest: 'High', eng: 'amber' },
    { name: 'IT Operations', role: 'Implementer', influence: 'Medium', interest: 'High', eng: 'green' },
    { name: 'AP Team Lead', role: 'End user', influence: 'Low', interest: 'High', eng: 'green' },
    { name: 'ERP Vendor', role: 'Supplier', influence: 'Medium', interest: 'Medium', eng: 'amber' },
    { name: 'Internal Audit', role: 'Oversight', influence: 'High', interest: 'Medium', eng: 'red' },
  ];
  const lessons = [
    { lesson: 'Early sandbox access prevents test compression', cat: 'Schedule', rec: 'Secure vendor sandbox in week 1', status: 'Adopted' },
    { lesson: 'Shadow-mode rollout caught two prod bugs', cat: 'Quality', rec: 'Make shadow mode standard for cutovers', status: 'Adopted' },
    { lesson: 'Ambiguous CR criteria slowed approvals', cat: 'Change', rec: 'Add weighted scoring to the CR template', status: 'Open' },
    { lesson: 'Stakeholder map missed Internal Audit', cat: 'Stakeholder', rec: 'Review RACI at each phase gate', status: 'Open' },
  ];
  const closureItems = [
    { item: 'Final deliverables accepted', done: true },
    { item: 'Contracts & POs closed', done: true },
    { item: 'Documentation archived', done: true },
    { item: 'Lessons learned captured', done: true },
    { item: 'Resources released', done: false },
    { item: 'Benefits review scheduled', done: false },
  ];
  return {
    source: 'sample', projects, risks, change, status, kas, milestones, team, accomplishments, nextSteps,
    costCategories, changeLog, stakeholders, lessons, closureItems,
    openRisks: risks.length, critical: risks.filter((r) => (r.sc || 0) >= 16).length,
  };
}
