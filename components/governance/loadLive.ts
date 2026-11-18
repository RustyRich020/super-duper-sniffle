// The legacy browser-side Supabase path has been deliberately disabled.
// Governance renders its reference packet until an authenticated server-side
// data provider is approved and implemented.

export interface ProjectRow {
  id: string;
  code?: string;
  name?: string;
  phase?: string;
  pm?: string;
  [key: string]: unknown;
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

export async function loadLive(): Promise<LiveResult> {
  return { data: {}, projMap: {}, user: null };
}
