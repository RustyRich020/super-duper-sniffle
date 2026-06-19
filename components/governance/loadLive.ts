// Live data loader for the Governance Reports packet. Ported from the
// prototype's `loadLive` / live-renderer field mappings, but wired through the
// shared libs (lib/supabase.ts + lib/forms-model.ts) instead of dynamically
// importing supabase-js from esm.sh.
//
// It reads the SAME form tables the Interactive Forms app writes:
//   - form_status_report (+ form_risk_register_risks for the RAID log)
//   - form_change_request
//   - form_cdoc  (+ raci / version-history / attestation child tables)
//   - form_bpg   (+ baselines / phase-gate-transitions child tables)
// joined to `projects` via project_id.
//
// Everything is wrapped in try/catch and degrades to {} (Reference sample mode)
// when there are no creds, no session, or the network is unavailable.
import { getClient, loadSavedCreds } from "../../lib/supabase";
import { allDefs, colsFor, tname, snake, type FormDef } from "../../lib/forms-model";

export interface ProjectRow {
  id: string;
  code?: string;
  name?: string;
  phase?: string;
  pm?: string;
  [k: string]: unknown;
}

export interface LiveData {
  status?: Record<string, unknown>[];
  risks?: Record<string, unknown>[];
  cr?: Record<string, unknown>[];
  cdoc?: Record<string, unknown>[];
  bpg?: Record<string, unknown>[];
  cdocRaci?: Record<string, Record<string, unknown>[]>;
  cdocVers?: Record<string, Record<string, unknown>[]>;
  cdocAtt?: Record<string, Record<string, unknown>[]>;
  bpgBase?: Record<string, Record<string, unknown>[]>;
  bpgGate?: Record<string, Record<string, unknown>[]>;
}

export interface LiveResult {
  data: LiveData;
  projMap: Record<string, ProjectRow>;
  user: { email?: string } | null;
}

function defById(): Record<string, FormDef> {
  const m: Record<string, FormDef> = {};
  try {
    allDefs().forEach((d) => (m[d.id] = d));
  } catch {
    /* ignore */
  }
  return m;
}

// Resolve the child-table name for a section by its label, the way
// forms-model's sqlDDL does: form_<id>_<snake(section.key)> where section.key
// is itself snake(label).
function childTable(def: FormDef | undefined, sectionLabel: string): string | null {
  if (!def) return null;
  const key = snake(sectionLabel);
  const sec = def.sections.find((s) => s.key === key);
  if (!sec) return null;
  return tname(def) + "_" + snake(sec.key);
}

export async function loadLive(): Promise<LiveResult> {
  const out: LiveData = {};
  const projMap: Record<string, ProjectRow> = {};
  let user: { email?: string } | null = null;

  const creds = loadSavedCreds();
  if (!creds || !creds.url || !creds.key) return { data: out, projMap, user };

  try {
    const client = getClient(creds.url, creds.key);
    let authUser: { email?: string } | null = null;
    try {
      const { data } = await client.auth.getUser();
      authUser = (data && data.user) || null;
    } catch {
      authUser = null;
    }
    user = authUser;
    if (!user) return { data: out, projMap, user };

    const defs = defById();
    const cdocDef = defs["cdoc"];
    const bpgDef = defs["bpg"];

    try {
      const r = await client.from("projects").select("*");
      if (!r.error && r.data) r.data.forEach((p: ProjectRow) => (projMap[p.id] = p));
    } catch {
      /* ignore */
    }
    try {
      const r = await client
        .from("form_status_report")
        .select("*")
        .order("updated_at", { ascending: false });
      if (!r.error && r.data && r.data.length) out.status = r.data;
    } catch {
      /* ignore */
    }
    try {
      const r = await client.from("form_risk_register_risks").select("*");
      if (!r.error && r.data && r.data.length) out.risks = r.data;
    } catch {
      /* ignore */
    }
    try {
      const r = await client
        .from("form_change_request")
        .select("*")
        .order("updated_at", { ascending: false });
      if (!r.error && r.data && r.data.length) out.cr = r.data;
    } catch {
      /* ignore */
    }

    // Controlled Document Record + children
    try {
      const r = await client
        .from("form_cdoc")
        .select("*")
        .order("updated_at", { ascending: false });
      if (!r.error && r.data && r.data.length) {
        out.cdoc = r.data;
        const ids = r.data.map((x: { id: string }) => x.id);
        out.cdocRaci = {};
        out.cdocVers = {};
        out.cdocAtt = {};
        const raciT = childTable(cdocDef, "RACI assignments") || "form_cdoc_raci_assignments";
        const versT = childTable(cdocDef, "Version history") || "form_cdoc_version_history";
        const attT = childTable(cdocDef, "Approval attestations") || "form_cdoc_approval_attestations";
        const kid = (tbl: string, bag: Record<string, Record<string, unknown>[]>) =>
          client
            .from(tbl)
            .select("*")
            .in("parent_id", ids)
            .then((c: { error: unknown; data: Record<string, unknown>[] | null }) => {
              if (!c.error && c.data)
                c.data.forEach((x) => {
                  const pid = String(x.parent_id);
                  (bag[pid] = bag[pid] || []).push(x);
                });
            })
            .then(undefined, () => {});
        await Promise.all([
          kid(raciT, out.cdocRaci),
          kid(versT, out.cdocVers),
          kid(attT, out.cdocAtt),
        ]);
      }
    } catch {
      /* ignore */
    }

    // Baseline & Phase-Gate Record + children
    try {
      const r = await client
        .from("form_bpg")
        .select("*")
        .order("updated_at", { ascending: false });
      if (!r.error && r.data && r.data.length) {
        out.bpg = r.data;
        const ids = r.data.map((x: { id: string }) => x.id);
        out.bpgBase = {};
        out.bpgGate = {};
        const baseT = childTable(bpgDef, "Baselines") || "form_bpg_baselines";
        const gateT = childTable(bpgDef, "Phase-gate transitions") || "form_bpg_phase_gate_transitions";
        const kid = (tbl: string, bag: Record<string, Record<string, unknown>[]>) =>
          client
            .from(tbl)
            .select("*")
            .in("parent_id", ids)
            .then((c: { error: unknown; data: Record<string, unknown>[] | null }) => {
              if (!c.error && c.data)
                c.data.forEach((x) => {
                  const pid = String(x.parent_id);
                  (bag[pid] = bag[pid] || []).push(x);
                });
            })
            .then(undefined, () => {});
        await Promise.all([kid(baseT, out.bpgBase), kid(gateT, out.bpgGate)]);
      }
    } catch {
      /* ignore */
    }
  } catch (e) {
    // network down / bad creds — fall back to reference sample silently
    if (typeof console !== "undefined")
      console.warn("Governance live load failed:", e instanceof Error ? e.message : e);
  }

  return { data: out, projMap, user };
}
