-- QQ-Studios Documentation Workspace — full schema.
-- Generated from lib/forms-model.ts (the same generator the app ships).
-- Idempotent and safe to re-run.

-- Legacy shared per-form blob (Connect DB dialog).
create table if not exists qq_forms (
  id          text primary key,
  data        jsonb not null default '{}',
  updated_at  timestamptz not null default now()
);

alter table qq_forms enable row level security;
drop policy if exists "qq_forms_anon" on qq_forms;
create policy "qq_forms_anon" on qq_forms
  for all using (true) with check (true);

-- Per-user multi-record submissions (JSONB) used before relational sync.
create table if not exists submissions (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  form_id     text not null,
  title       text,
  data        jsonb not null default '{}',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
alter table submissions enable row level security;
drop policy if exists "own submissions" on submissions;
create policy "own submissions" on submissions for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- QQ-Studios Forms — relational schema
-- One table per form (prefixed form_), child tables for multi-row sections,
-- per-user row-level security. Run once in the Supabase SQL editor.

-- Project Planner (powers the Planner dashboard)
create table if not exists projects (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "code" text,
  "name" text,
  "phase" text,
  "status" text,
  "pct" int,
  "pm" text,
  "bac" numeric,
  "spent" numeric,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table projects enable row level security;
drop policy if exists "own_projects" on projects;
create policy "own_projects" on projects for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- Product Requirements Document
create table if not exists form_prd (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner_pm" text,
  "author" text,
  "status" text,
  "target_release" text,
  "problem" text,
  "goals" text,
  "nongoals" text,
  "risks" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_prd enable row level security;
drop policy if exists "own_form_prd" on form_prd;
create policy "own_form_prd" on form_prd for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

create table if not exists form_prd_requirements (
  "id" uuid primary key default gen_random_uuid(),
  "parent_id" uuid not null references form_prd(id) on delete cascade,
  "position" int not null default 0,
  "n" text,
  "requirement" text,
  "priority_p0_p2" text
);
alter table form_prd_requirements enable row level security;
drop policy if exists "own_form_prd_requirements" on form_prd_requirements;
create policy "own_form_prd_requirements" on form_prd_requirements for all using (exists (select 1 from form_prd p where p."id" = "parent_id" and p."user_id" = auth.uid())) with check (exists (select 1 from form_prd p where p."id" = "parent_id" and p."user_id" = auth.uid()));

-- Business Requirements Document
create table if not exists form_brd (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "sponsor" text,
  "analyst" text,
  "status" text,
  "date" text,
  "business_objective_why_now" text,
  "stakeholders_needs" text,
  "expected_outcomes_benefits" text,
  "constraints_assumptions" text,
  "success_criteria" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_brd enable row level security;
drop policy if exists "own_form_brd" on form_brd;
create policy "own_form_brd" on form_brd for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- Market Requirements Document
create table if not exists form_mrd (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner" text,
  "author" text,
  "status" text,
  "date" text,
  "market_opportunity" text,
  "target_customers_segments" text,
  "competitive_landscape" text,
  "market_driven_needs" text,
  "go_no_go_rationale" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_mrd enable row level security;
drop policy if exists "own_form_mrd" on form_mrd;
create policy "own_form_mrd" on form_mrd for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- Functional Requirements Specification
create table if not exists form_frd_frs (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "analyst" text,
  "reviewer" text,
  "status" text,
  "date" text,
  "scope_context" text,
  "functional_requirements" text,
  "inputs_outputs" text,
  "business_rules" text,
  "dependencies" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_frd_frs enable row level security;
drop policy if exists "own_form_frd_frs" on form_frd_frs;
create policy "own_form_frd_frs" on form_frd_frs for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- Software Requirements Specification
create table if not exists form_srs (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "engineer" text,
  "reviewer" text,
  "version" text,
  "date" text,
  "purpose_scope" text,
  "functional_requirements" text,
  "non_functional_requirements" text,
  "external_interfaces" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_srs enable row level security;
drop policy if exists "own_form_srs" on form_srs;
create policy "own_form_srs" on form_srs for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

create table if not exists form_srs_approvals (
  "id" uuid primary key default gen_random_uuid(),
  "parent_id" uuid not null references form_srs(id) on delete cascade,
  "position" int not null default 0,
  "name" text,
  "role" text,
  "signature" text,
  "date" text
);
alter table form_srs_approvals enable row level security;
drop policy if exists "own_form_srs_approvals" on form_srs_approvals;
create policy "own_form_srs_approvals" on form_srs_approvals for all using (exists (select 1 from form_srs p where p."id" = "parent_id" and p."user_id" = auth.uid())) with check (exists (select 1 from form_srs p where p."id" = "parent_id" and p."user_id" = auth.uid()));

-- Non-Functional Requirements
create table if not exists form_nfr (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner" text,
  "author" text,
  "status" text,
  "date" text,
  "performance_latency_targets" text,
  "availability_reliability" text,
  "scalability" text,
  "security_compliance" text,
  "accessibility" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_nfr enable row level security;
drop policy if exists "own_form_nfr" on form_nfr;
create policy "own_form_nfr" on form_nfr for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- User Stories & Epics
create table if not exists form_stories_epics (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner" text,
  "epic" text,
  "sprint" text,
  "status" text,
  "epic_theme" text,
  "story" text,
  "acceptance_criteria" text,
  "estimate_priority" text,
  "dependencies" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_stories_epics enable row level security;
drop policy if exists "own_form_stories_epics" on form_stories_epics;
create policy "own_form_stories_epics" on form_stories_epics for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- Acceptance Criteria & Definition of Done
create table if not exists form_ac_dod (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "team" text,
  "owner" text,
  "sprint" text,
  "date" text,
  "story_item" text,
  "acceptance_criteria" text,
  "definition_of_done" jsonb,
  "notes" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_ac_dod enable row level security;
drop policy if exists "own_form_ac_dod" on form_ac_dod;
create policy "own_form_ac_dod" on form_ac_dod for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- Use Case Document
create table if not exists form_use_case (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "author" text,
  "actor" text,
  "status" text,
  "date" text,
  "actor_goal" text,
  "preconditions" text,
  "main_flow" text,
  "alternate_exception_flows" text,
  "postconditions" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_use_case enable row level security;
drop policy if exists "own_form_use_case" on form_use_case;
create policy "own_form_use_case" on form_use_case for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- Product Vision & Strategy
create table if not exists form_vision (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner" text,
  "horizon" text,
  "status" text,
  "date" text,
  "vision_statement" text,
  "target_users_problem" text,
  "strategic_pillars" text,
  "1_3_year_outcomes" text,
  "what_we_won_t_do" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_vision enable row level security;
drop policy if exists "own_form_vision" on form_vision;
create policy "own_form_vision" on form_vision for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- Roadmap
create table if not exists form_roadmap (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner" text,
  "period" text,
  "status" text,
  "date" text,
  "now" text,
  "next" text,
  "later" text,
  "themes_bets" text,
  "dependencies_risks" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_roadmap enable row level security;
drop policy if exists "own_form_roadmap" on form_roadmap;
create policy "own_form_roadmap" on form_roadmap for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- One-Pager / Product Brief
create table if not exists form_one_pager (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner" text,
  "author" text,
  "status" text,
  "date" text,
  "problem" text,
  "proposal" text,
  "impact" text,
  "the_ask" text,
  "open_questions" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_one_pager enable row level security;
drop policy if exists "own_form_one_pager" on form_one_pager;
create policy "own_form_one_pager" on form_one_pager for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- Request for Proposal / Information / Quote
create table if not exists form_rfp_rfi_rfq (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner" text,
  "type" text,
  "due" text,
  "date" text,
  "background_need" text,
  "scope_of_work_questions" text,
  "requirements_evaluation_criteria" text,
  "submission_instructions_timeline" text,
  "budget_pricing" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_rfp_rfi_rfq enable row level security;
drop policy if exists "own_form_rfp_rfi_rfq" on form_rfp_rfi_rfq;
create policy "own_form_rfp_rfi_rfq" on form_rfp_rfi_rfq for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- Architecture Decision Record
create table if not exists form_adr (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "author" text,
  "adr" text,
  "status" text,
  "date" text,
  "context" text,
  "options" text,
  "decision" text,
  "consequences" text,
  "related" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_adr enable row level security;
drop policy if exists "own_form_adr" on form_adr;
create policy "own_form_adr" on form_adr for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- Request for Comments
create table if not exists form_rfc (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "author" text,
  "status" text,
  "comments_due" text,
  "date" text,
  "problem_motivation" text,
  "proposal" text,
  "alternatives" text,
  "impact_migration" text,
  "unresolved_questions" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_rfc enable row level security;
drop policy if exists "own_form_rfc" on form_rfc;
create policy "own_form_rfc" on form_rfc for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- Design Document / TDD
create table if not exists form_design_doc (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "author" text,
  "reviewers" text,
  "status" text,
  "related" text,
  "summary" text,
  "background_requirements" text,
  "proposed_design" text,
  "alternatives_considered" text,
  "cross_cutting_concerns" text,
  "rollout_plan" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_design_doc enable row level security;
drop policy if exists "own_form_design_doc" on form_design_doc;
create policy "own_form_design_doc" on form_design_doc for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- High-Level Design
create table if not exists form_hld (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "architect" text,
  "reviewer" text,
  "status" text,
  "date" text,
  "system_context" text,
  "major_components_services" text,
  "integrations_data_flow" text,
  "key_decisions" text,
  "risks" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_hld enable row level security;
drop policy if exists "own_form_hld" on form_hld;
create policy "own_form_hld" on form_hld for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- Low-Level Design
create table if not exists form_lld (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "engineer" text,
  "reviewer" text,
  "status" text,
  "date" text,
  "module_component" text,
  "classes_data_structures" text,
  "algorithms_logic" text,
  "schema_interfaces" text,
  "error_handling" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_lld enable row level security;
drop policy if exists "own_form_lld" on form_lld;
create policy "own_form_lld" on form_lld for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- Software Architecture Document
create table if not exists form_sad (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "architect" text,
  "reviewer" text,
  "version" text,
  "date" text,
  "logical_view" text,
  "process_view" text,
  "deployment_view" text,
  "data_view" text,
  "architectural_decisions" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_sad enable row level security;
drop policy if exists "own_form_sad" on form_sad;
create policy "own_form_sad" on form_sad for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- C4 Model Diagrams
create table if not exists form_c4 (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "author" text,
  "level" text,
  "status" text,
  "date" text,
  "level_1_system_context" text,
  "level_2_containers" text,
  "level_3_components" text,
  "notes_legend" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_c4 enable row level security;
drop policy if exists "own_form_c4" on form_c4;
create policy "own_form_c4" on form_c4 for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- Entity-Relationship Diagram
create table if not exists form_erd (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "author" text,
  "database" text,
  "version" text,
  "date" text,
  "entities_attributes" text,
  "diagram" text,
  "keys_constraints" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_erd enable row level security;
drop policy if exists "own_form_erd" on form_erd;
create policy "own_form_erd" on form_erd for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- Data Flow Diagram
create table if not exists form_dfd (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "author" text,
  "system" text,
  "level" text,
  "date" text,
  "external_entities_processes_stores" text,
  "diagram" text,
  "notes" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_dfd enable row level security;
drop policy if exists "own_form_dfd" on form_dfd;
create policy "own_form_dfd" on form_dfd for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- Sequence / Interaction Diagram
create table if not exists form_sequence (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "author" text,
  "flow" text,
  "status" text,
  "date" text,
  "participants_scenario" text,
  "diagram_messages_over_time" text,
  "notes_edge_cases" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_sequence enable row level security;
drop policy if exists "own_form_sequence" on form_sequence;
create policy "own_form_sequence" on form_sequence for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- API Specification
create table if not exists form_api_spec (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner" text,
  "version" text,
  "format" text,
  "date" text,
  "request_payload" text,
  "responses_status_codes" text,
  "errors_auth" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_api_spec enable row level security;
drop policy if exists "own_form_api_spec" on form_api_spec;
create policy "own_form_api_spec" on form_api_spec for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

create table if not exists form_api_spec_endpoints (
  "id" uuid primary key default gen_random_uuid(),
  "parent_id" uuid not null references form_api_spec(id) on delete cascade,
  "position" int not null default 0,
  "method" text,
  "path" text,
  "purpose" text
);
alter table form_api_spec_endpoints enable row level security;
drop policy if exists "own_form_api_spec_endpoints" on form_api_spec_endpoints;
create policy "own_form_api_spec_endpoints" on form_api_spec_endpoints for all using (exists (select 1 from form_api_spec p where p."id" = "parent_id" and p."user_id" = auth.uid())) with check (exists (select 1 from form_api_spec p where p."id" = "parent_id" and p."user_id" = auth.uid()));

-- Interface Control Document
create table if not exists form_icd (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner" text,
  "systems" text,
  "version" text,
  "date" text,
  "interface_overview" text,
  "protocol_timing" text,
  "error_handling_versioning" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_icd enable row level security;
drop policy if exists "own_form_icd" on form_icd;
create policy "own_form_icd" on form_icd for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

create table if not exists form_icd_data_formats_fields (
  "id" uuid primary key default gen_random_uuid(),
  "parent_id" uuid not null references form_icd(id) on delete cascade,
  "position" int not null default 0,
  "field" text,
  "type" text,
  "notes" text
);
alter table form_icd_data_formats_fields enable row level security;
drop policy if exists "own_form_icd_data_formats_fields" on form_icd_data_formats_fields;
create policy "own_form_icd_data_formats_fields" on form_icd_data_formats_fields for all using (exists (select 1 from form_icd p where p."id" = "parent_id" and p."user_id" = auth.uid())) with check (exists (select 1 from form_icd p where p."id" = "parent_id" and p."user_id" = auth.uid()));

-- Threat Model
create table if not exists form_threat_model (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner" text,
  "system" text,
  "methodology" text,
  "date" text,
  "assets_trust_boundaries" text,
  "mitigations" text,
  "residual_risk" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_threat_model enable row level security;
drop policy if exists "own_form_threat_model" on form_threat_model;
create policy "own_form_threat_model" on form_threat_model for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

create table if not exists form_threat_model_threats (
  "id" uuid primary key default gen_random_uuid(),
  "parent_id" uuid not null references form_threat_model(id) on delete cascade,
  "position" int not null default 0,
  "threat" text,
  "category" text,
  "likelihood" text
);
alter table form_threat_model_threats enable row level security;
drop policy if exists "own_form_threat_model_threats" on form_threat_model_threats;
create policy "own_form_threat_model_threats" on form_threat_model_threats for all using (exists (select 1 from form_threat_model p where p."id" = "parent_id" and p."user_id" = auth.uid())) with check (exists (select 1 from form_threat_model p where p."id" = "parent_id" and p."user_id" = auth.uid()));

-- Data Dictionary
create table if not exists form_data_dictionary (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner" text,
  "dataset" text,
  "version" text,
  "date" text,
  "valid_values_constraints" text,
  "source_lineage_sensitivity" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_data_dictionary enable row level security;
drop policy if exists "own_form_data_dictionary" on form_data_dictionary;
create policy "own_form_data_dictionary" on form_data_dictionary for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

create table if not exists form_data_dictionary_fields (
  "id" uuid primary key default gen_random_uuid(),
  "parent_id" uuid not null references form_data_dictionary(id) on delete cascade,
  "position" int not null default 0,
  "field" text,
  "type" text,
  "meaning" text
);
alter table form_data_dictionary_fields enable row level security;
drop policy if exists "own_form_data_dictionary_fields" on form_data_dictionary_fields;
create policy "own_form_data_dictionary_fields" on form_data_dictionary_fields for all using (exists (select 1 from form_data_dictionary p where p."id" = "parent_id" and p."user_id" = auth.uid())) with check (exists (select 1 from form_data_dictionary p where p."id" = "parent_id" and p."user_id" = auth.uid()));

-- README
create table if not exists form_readme (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "maintainer" text,
  "repo" text,
  "version" text,
  "date" text,
  "what_is_this" text,
  "install" text,
  "usage_run" text,
  "configuration" text,
  "contributing_license" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_readme enable row level security;
drop policy if exists "own_form_readme" on form_readme;
create policy "own_form_readme" on form_readme for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- Contributing Guide
create table if not exists form_contributing (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "maintainer" text,
  "repo" text,
  "status" text,
  "date" text,
  "getting_started" text,
  "branching_strategy" text,
  "pr_review_process" text,
  "coding_standards" text,
  "code_of_conduct" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_contributing enable row level security;
drop policy if exists "own_form_contributing" on form_contributing;
create policy "own_form_contributing" on form_contributing for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- Changelog
create table if not exists form_changelog (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "author" text,
  "version" text,
  "release_date" text,
  "type" text,
  "added" text,
  "changed" text,
  "fixed" text,
  "deprecated_removed" text,
  "breaking_changes" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_changelog enable row level security;
drop policy if exists "own_form_changelog" on form_changelog;
create policy "own_form_changelog" on form_changelog for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- Coding Standards / Style Guide
create table if not exists form_style_guide (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner" text,
  "language" text,
  "version" text,
  "date" text,
  "naming_conventions" text,
  "formatting" text,
  "patterns_to_use" text,
  "anti_patterns_to_avoid" text,
  "tooling_linters" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_style_guide enable row level security;
drop policy if exists "own_form_style_guide" on form_style_guide;
create policy "own_form_style_guide" on form_style_guide for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- API Reference Documentation
create table if not exists form_api_reference (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner" text,
  "endpoint" text,
  "version" text,
  "date" text,
  "endpoint_method" text,
  "responses_errors" text,
  "example" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_api_reference enable row level security;
drop policy if exists "own_form_api_reference" on form_api_reference;
create policy "own_form_api_reference" on form_api_reference for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

create table if not exists form_api_reference_parameters (
  "id" uuid primary key default gen_random_uuid(),
  "parent_id" uuid not null references form_api_reference(id) on delete cascade,
  "position" int not null default 0,
  "name" text,
  "type" text,
  "required" text
);
alter table form_api_reference_parameters enable row level security;
drop policy if exists "own_form_api_reference_parameters" on form_api_reference_parameters;
create policy "own_form_api_reference_parameters" on form_api_reference_parameters for all using (exists (select 1 from form_api_reference p where p."id" = "parent_id" and p."user_id" = auth.uid())) with check (exists (select 1 from form_api_reference p where p."id" = "parent_id" and p."user_id" = auth.uid()));

-- Inline Documentation / Docstrings
create table if not exists form_docstrings (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "author" text,
  "module" text,
  "language" text,
  "date" text,
  "function_class_purpose" text,
  "returns_throws" text,
  "example_gotchas" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_docstrings enable row level security;
drop policy if exists "own_form_docstrings" on form_docstrings;
create policy "own_form_docstrings" on form_docstrings for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

create table if not exists form_docstrings_parameters (
  "id" uuid primary key default gen_random_uuid(),
  "parent_id" uuid not null references form_docstrings(id) on delete cascade,
  "position" int not null default 0,
  "name" text,
  "type" text,
  "description" text
);
alter table form_docstrings_parameters enable row level security;
drop policy if exists "own_form_docstrings_parameters" on form_docstrings_parameters;
create policy "own_form_docstrings_parameters" on form_docstrings_parameters for all using (exists (select 1 from form_docstrings p where p."id" = "parent_id" and p."user_id" = auth.uid())) with check (exists (select 1 from form_docstrings p where p."id" = "parent_id" and p."user_id" = auth.uid()));

-- SDK / Integration Guide
create table if not exists form_integration_guide (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner" text,
  "platform" text,
  "version" text,
  "date" text,
  "prerequisites" text,
  "authentication_setup" text,
  "quickstart" text,
  "code_samples" text,
  "troubleshooting" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_integration_guide enable row level security;
drop policy if exists "own_form_integration_guide" on form_integration_guide;
create policy "own_form_integration_guide" on form_integration_guide for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- Release Notes
create table if not exists form_release_notes (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner" text,
  "version" text,
  "release_date" text,
  "audience" text,
  "highlights" text,
  "new_features" text,
  "fixes" text,
  "breaking_changes" text,
  "upgrade_steps" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_release_notes enable row level security;
drop policy if exists "own_form_release_notes" on form_release_notes;
create policy "own_form_release_notes" on form_release_notes for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- Migration Guide
create table if not exists form_migration_guide (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner" text,
  "from_to" text,
  "version" text,
  "date" text,
  "overview" text,
  "breaking_changes" text,
  "deprecated_features" text,
  "step_by_step_migration" text,
  "rollback" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_migration_guide enable row level security;
drop policy if exists "own_form_migration_guide" on form_migration_guide;
create policy "own_form_migration_guide" on form_migration_guide for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- Onboarding / Developer Setup
create table if not exists form_onboarding (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner" text,
  "team" text,
  "role" text,
  "start_date" text,
  "access" jsonb,
  "env" text,
  "arch" text,
  "contacts" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_onboarding enable row level security;
drop policy if exists "own_form_onboarding" on form_onboarding;
create policy "own_form_onboarding" on form_onboarding for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- Runbook
create table if not exists form_runbook (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "service" text,
  "owner" text,
  "last_tested" text,
  "risk" text,
  "when_to_use" text,
  "prerequisites" text,
  "steps" text,
  "verification" text,
  "rollback_escalation" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_runbook enable row level security;
drop policy if exists "own_form_runbook" on form_runbook;
create policy "own_form_runbook" on form_runbook for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- Playbook
create table if not exists form_playbook (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner" text,
  "scenario" text,
  "status" text,
  "date" text,
  "situation_class" text,
  "diagnosis_branches" text,
  "decision_criteria" text,
  "actions_per_branch" text,
  "escalation" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_playbook enable row level security;
drop policy if exists "own_form_playbook" on form_playbook;
create policy "own_form_playbook" on form_playbook for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- Standard Operating Procedure
create table if not exists form_sop (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner" text,
  "process" text,
  "version" text,
  "effective" text,
  "purpose_scope" text,
  "responsibilities" text,
  "procedure_steps" text,
  "records_evidence" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_sop enable row level security;
drop policy if exists "own_form_sop" on form_sop;
create policy "own_form_sop" on form_sop for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

create table if not exists form_sop_review_approval (
  "id" uuid primary key default gen_random_uuid(),
  "parent_id" uuid not null references form_sop(id) on delete cascade,
  "position" int not null default 0,
  "name" text,
  "role" text,
  "date" text
);
alter table form_sop_review_approval enable row level security;
drop policy if exists "own_form_sop_review_approval" on form_sop_review_approval;
create policy "own_form_sop_review_approval" on form_sop_review_approval for all using (exists (select 1 from form_sop p where p."id" = "parent_id" and p."user_id" = auth.uid())) with check (exists (select 1 from form_sop p where p."id" = "parent_id" and p."user_id" = auth.uid()));

-- Incident Report
create table if not exists form_incident_report (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "severity" text,
  "commander" text,
  "started" text,
  "status" text,
  "summary" text,
  "impact" text,
  "actions_taken_current_status" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_incident_report enable row level security;
drop policy if exists "own_form_incident_report" on form_incident_report;
create policy "own_form_incident_report" on form_incident_report for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

create table if not exists form_incident_report_timeline (
  "id" uuid primary key default gen_random_uuid(),
  "parent_id" uuid not null references form_incident_report(id) on delete cascade,
  "position" int not null default 0,
  "time" text,
  "event" text
);
alter table form_incident_report_timeline enable row level security;
drop policy if exists "own_form_incident_report_timeline" on form_incident_report_timeline;
create policy "own_form_incident_report_timeline" on form_incident_report_timeline for all using (exists (select 1 from form_incident_report p where p."id" = "parent_id" and p."user_id" = auth.uid())) with check (exists (select 1 from form_incident_report p where p."id" = "parent_id" and p."user_id" = auth.uid()));

-- Postmortem / RCA
create table if not exists form_postmortem (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "severity" text,
  "author" text,
  "duration" text,
  "status" text,
  "summary" text,
  "rootcause" text,
  "lucky" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_postmortem enable row level security;
drop policy if exists "own_form_postmortem" on form_postmortem;
create policy "own_form_postmortem" on form_postmortem for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

create table if not exists form_postmortem_timeline (
  "id" uuid primary key default gen_random_uuid(),
  "parent_id" uuid not null references form_postmortem(id) on delete cascade,
  "position" int not null default 0,
  "time" text,
  "event" text
);
alter table form_postmortem_timeline enable row level security;
drop policy if exists "own_form_postmortem_timeline" on form_postmortem_timeline;
create policy "own_form_postmortem_timeline" on form_postmortem_timeline for all using (exists (select 1 from form_postmortem p where p."id" = "parent_id" and p."user_id" = auth.uid())) with check (exists (select 1 from form_postmortem p where p."id" = "parent_id" and p."user_id" = auth.uid()));

create table if not exists form_postmortem_actions (
  "id" uuid primary key default gen_random_uuid(),
  "parent_id" uuid not null references form_postmortem(id) on delete cascade,
  "position" int not null default 0,
  "action" text,
  "owner" text,
  "due" text
);
alter table form_postmortem_actions enable row level security;
drop policy if exists "own_form_postmortem_actions" on form_postmortem_actions;
create policy "own_form_postmortem_actions" on form_postmortem_actions for all using (exists (select 1 from form_postmortem p where p."id" = "parent_id" and p."user_id" = auth.uid())) with check (exists (select 1 from form_postmortem p where p."id" = "parent_id" and p."user_id" = auth.uid()));

-- On-Call Guide
create table if not exists form_on_call_guide (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "team" text,
  "rotation" text,
  "owner" text,
  "date" text,
  "rotation_schedule" text,
  "severity_definitions" text,
  "escalation_paths" text,
  "tooling_access" text,
  "handoff_checklist" jsonb,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_on_call_guide enable row level security;
drop policy if exists "own_form_on_call_guide" on form_on_call_guide;
create policy "own_form_on_call_guide" on form_on_call_guide for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- Disaster Recovery Plan
create table if not exists form_dr_plan (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner" text,
  "system" text,
  "rto_rpo" text,
  "date" text,
  "scope_objectives" text,
  "backup_procedures" text,
  "failover_steps" text,
  "contact_tree_test_schedule" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_dr_plan enable row level security;
drop policy if exists "own_form_dr_plan" on form_dr_plan;
create policy "own_form_dr_plan" on form_dr_plan for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- Business Continuity Plan
create table if not exists form_bcp (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner" text,
  "scope" text,
  "version" text,
  "date" text,
  "critical_functions" text,
  "disruption_scenarios" text,
  "continuity_strategy" text,
  "roles_contacts_objectives" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_bcp enable row level security;
drop policy if exists "own_form_bcp" on form_bcp;
create policy "own_form_bcp" on form_bcp for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- SLA / SLO / SLI Documentation
create table if not exists form_sla_slo_sli (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner" text,
  "service" text,
  "period" text,
  "date" text,
  "sla_contractual_promise" text,
  "slo_internal_objective" text,
  "sli_measured_indicator" text,
  "error_budget_policy" text,
  "reporting" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_sla_slo_sli enable row level security;
drop policy if exists "own_form_sla_slo_sli" on form_sla_slo_sli;
create policy "own_form_sla_slo_sli" on form_sla_slo_sli for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- Capacity Plan
create table if not exists form_capacity_plan (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner" text,
  "system" text,
  "horizon" text,
  "date" text,
  "current_usage" text,
  "growth_forecast" text,
  "risks" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_capacity_plan enable row level security;
drop policy if exists "own_form_capacity_plan" on form_capacity_plan;
create policy "own_form_capacity_plan" on form_capacity_plan for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

create table if not exists form_capacity_plan_resource_needs (
  "id" uuid primary key default gen_random_uuid(),
  "parent_id" uuid not null references form_capacity_plan(id) on delete cascade,
  "position" int not null default 0,
  "resource" text,
  "current" text,
  "forecast" text
);
alter table form_capacity_plan_resource_needs enable row level security;
drop policy if exists "own_form_capacity_plan_resource_needs" on form_capacity_plan_resource_needs;
create policy "own_form_capacity_plan_resource_needs" on form_capacity_plan_resource_needs for all using (exists (select 1 from form_capacity_plan p where p."id" = "parent_id" and p."user_id" = auth.uid())) with check (exists (select 1 from form_capacity_plan p where p."id" = "parent_id" and p."user_id" = auth.uid()));

-- Maintenance / Change Calendar
create table if not exists form_change_calendar (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner" text,
  "window" text,
  "status" text,
  "date" text,
  "freeze_periods" text,
  "change_procedure_notifications" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_change_calendar enable row level security;
drop policy if exists "own_form_change_calendar" on form_change_calendar;
create policy "own_form_change_calendar" on form_change_calendar for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

create table if not exists form_change_calendar_scheduled_windows (
  "id" uuid primary key default gen_random_uuid(),
  "parent_id" uuid not null references form_change_calendar(id) on delete cascade,
  "position" int not null default 0,
  "date" text,
  "window" text,
  "change" text
);
alter table form_change_calendar_scheduled_windows enable row level security;
drop policy if exists "own_form_change_calendar_scheduled_windows" on form_change_calendar_scheduled_windows;
create policy "own_form_change_calendar_scheduled_windows" on form_change_calendar_scheduled_windows for all using (exists (select 1 from form_change_calendar p where p."id" = "parent_id" and p."user_id" = auth.uid())) with check (exists (select 1 from form_change_calendar p where p."id" = "parent_id" and p."user_id" = auth.uid()));

-- Knowledge Base Article
create table if not exists form_kb_article (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "author" text,
  "audience" text,
  "status" text,
  "date" text,
  "problem_question" text,
  "environment" text,
  "solution_steps" text,
  "workaround_related_articles" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_kb_article enable row level security;
drop policy if exists "own_form_kb_article" on form_kb_article;
create policy "own_form_kb_article" on form_kb_article for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- Project Charter
create table if not exists form_project_charter (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "sponsor" text,
  "pm" text,
  "status" text,
  "date" text,
  "objectives" text,
  "scope_in_out" text,
  "stakeholders" text,
  "budget_timeline" text,
  "success_criteria" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_project_charter enable row level security;
drop policy if exists "own_form_project_charter" on form_project_charter;
create policy "own_form_project_charter" on form_project_charter for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- Statement of Work
create table if not exists form_sow (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "vendor" text,
  "owner" text,
  "status" text,
  "date" text,
  "deliverables" text,
  "acceptance_criteria" text,
  "pricing_terms" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_sow enable row level security;
drop policy if exists "own_form_sow" on form_sow;
create policy "own_form_sow" on form_sow for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

create table if not exists form_sow_timeline_milestones (
  "id" uuid primary key default gen_random_uuid(),
  "parent_id" uuid not null references form_sow(id) on delete cascade,
  "position" int not null default 0,
  "milestone" text,
  "date" text
);
alter table form_sow_timeline_milestones enable row level security;
drop policy if exists "own_form_sow_timeline_milestones" on form_sow_timeline_milestones;
create policy "own_form_sow_timeline_milestones" on form_sow_timeline_milestones for all using (exists (select 1 from form_sow p where p."id" = "parent_id" and p."user_id" = auth.uid())) with check (exists (select 1 from form_sow p where p."id" = "parent_id" and p."user_id" = auth.uid()));

-- Work Breakdown Structure
create table if not exists form_wbs (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "pm" text,
  "project" text,
  "version" text,
  "date" text,
  "phases_deliverables" text,
  "dependencies_estimates" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_wbs enable row level security;
drop policy if exists "own_form_wbs" on form_wbs;
create policy "own_form_wbs" on form_wbs for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

create table if not exists form_wbs_work_packages (
  "id" uuid primary key default gen_random_uuid(),
  "parent_id" uuid not null references form_wbs(id) on delete cascade,
  "position" int not null default 0,
  "id_2" text,
  "work_package" text,
  "owner" text
);
alter table form_wbs_work_packages enable row level security;
drop policy if exists "own_form_wbs_work_packages" on form_wbs_work_packages;
create policy "own_form_wbs_work_packages" on form_wbs_work_packages for all using (exists (select 1 from form_wbs p where p."id" = "parent_id" and p."user_id" = auth.uid())) with check (exists (select 1 from form_wbs p where p."id" = "parent_id" and p."user_id" = auth.uid()));

-- RACI Matrix
create table if not exists form_raci (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner" text,
  "project" text,
  "version" text,
  "date" text,
  "roles" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_raci enable row level security;
drop policy if exists "own_form_raci" on form_raci;
create policy "own_form_raci" on form_raci for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

create table if not exists form_raci_matrix (
  "id" uuid primary key default gen_random_uuid(),
  "parent_id" uuid not null references form_raci(id) on delete cascade,
  "position" int not null default 0,
  "task_decision" text,
  "r" text,
  "a" text,
  "c" text,
  "i" text
);
alter table form_raci_matrix enable row level security;
drop policy if exists "own_form_raci_matrix" on form_raci_matrix;
create policy "own_form_raci_matrix" on form_raci_matrix for all using (exists (select 1 from form_raci p where p."id" = "parent_id" and p."user_id" = auth.uid())) with check (exists (select 1 from form_raci p where p."id" = "parent_id" and p."user_id" = auth.uid()));

-- Risk Register
create table if not exists form_risk_register (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner" text,
  "project" text,
  "version" text,
  "date" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_risk_register enable row level security;
drop policy if exists "own_form_risk_register" on form_risk_register;
create policy "own_form_risk_register" on form_risk_register for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

create table if not exists form_risk_register_risks (
  "id" uuid primary key default gen_random_uuid(),
  "parent_id" uuid not null references form_risk_register(id) on delete cascade,
  "position" int not null default 0,
  "risk" text,
  "likelihood" text,
  "impact" text,
  "mitigation" text,
  "owner" text
);
alter table form_risk_register_risks enable row level security;
drop policy if exists "own_form_risk_register_risks" on form_risk_register_risks;
create policy "own_form_risk_register_risks" on form_risk_register_risks for all using (exists (select 1 from form_risk_register p where p."id" = "parent_id" and p."user_id" = auth.uid())) with check (exists (select 1 from form_risk_register p where p."id" = "parent_id" and p."user_id" = auth.uid()));

-- Change Request
create table if not exists form_change_request (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "requester" text,
  "cr" text,
  "status" text,
  "date" text,
  "change_description" text,
  "reason_business_case" text,
  "impact_analysis" text,
  "rollback_plan" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_change_request enable row level security;
drop policy if exists "own_form_change_request" on form_change_request;
create policy "own_form_change_request" on form_change_request for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

create table if not exists form_change_request_cab_approval (
  "id" uuid primary key default gen_random_uuid(),
  "parent_id" uuid not null references form_change_request(id) on delete cascade,
  "position" int not null default 0,
  "name" text,
  "decision" text,
  "date" text
);
alter table form_change_request_cab_approval enable row level security;
drop policy if exists "own_form_change_request_cab_approval" on form_change_request_cab_approval;
create policy "own_form_change_request_cab_approval" on form_change_request_cab_approval for all using (exists (select 1 from form_change_request p where p."id" = "parent_id" and p."user_id" = auth.uid())) with check (exists (select 1 from form_change_request p where p."id" = "parent_id" and p."user_id" = auth.uid()));

-- Status Report
create table if not exists form_status_report (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner" text,
  "period" text,
  "rag" text,
  "date" text,
  "summary_rag_status" text,
  "progress_this_period" text,
  "risks_issues" text,
  "decisions_needed_next_period" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_status_report enable row level security;
drop policy if exists "own_form_status_report" on form_status_report;
create policy "own_form_status_report" on form_status_report for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- Retrospective
create table if not exists form_retrospective (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "team" text,
  "sprint" text,
  "facilitator" text,
  "date" text,
  "what_went_well" text,
  "what_didn_t" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_retrospective enable row level security;
drop policy if exists "own_form_retrospective" on form_retrospective;
create policy "own_form_retrospective" on form_retrospective for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

create table if not exists form_retrospective_action_items (
  "id" uuid primary key default gen_random_uuid(),
  "parent_id" uuid not null references form_retrospective(id) on delete cascade,
  "position" int not null default 0,
  "action" text,
  "owner" text,
  "due" text
);
alter table form_retrospective_action_items enable row level security;
drop policy if exists "own_form_retrospective_action_items" on form_retrospective_action_items;
create policy "own_form_retrospective_action_items" on form_retrospective_action_items for all using (exists (select 1 from form_retrospective p where p."id" = "parent_id" and p."user_id" = auth.uid())) with check (exists (select 1 from form_retrospective p where p."id" = "parent_id" and p."user_id" = auth.uid()));

-- Meeting Minutes & Decision Log
create table if not exists form_decision_log (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "recorder" text,
  "meeting" text,
  "attendees" text,
  "date" text,
  "agenda" text,
  "discussion" text,
  "decisions" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_decision_log enable row level security;
drop policy if exists "own_form_decision_log" on form_decision_log;
create policy "own_form_decision_log" on form_decision_log for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

create table if not exists form_decision_log_action_items (
  "id" uuid primary key default gen_random_uuid(),
  "parent_id" uuid not null references form_decision_log(id) on delete cascade,
  "position" int not null default 0,
  "action" text,
  "owner" text,
  "due" text
);
alter table form_decision_log_action_items enable row level security;
drop policy if exists "own_form_decision_log_action_items" on form_decision_log_action_items;
create policy "own_form_decision_log_action_items" on form_decision_log_action_items for all using (exists (select 1 from form_decision_log p where p."id" = "parent_id" and p."user_id" = auth.uid())) with check (exists (select 1 from form_decision_log p where p."id" = "parent_id" and p."user_id" = auth.uid()));

-- Test Strategy
create table if not exists form_test_strategy (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner" text,
  "product" text,
  "version" text,
  "date" text,
  "quality_objectives" text,
  "test_levels_types" text,
  "environments" text,
  "automation_philosophy" text,
  "tooling" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_test_strategy enable row level security;
drop policy if exists "own_form_test_strategy" on form_test_strategy;
create policy "own_form_test_strategy" on form_test_strategy for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- Test Plan
create table if not exists form_test_plan (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner" text,
  "project" text,
  "status" text,
  "date" text,
  "scope_in_out" text,
  "approach" text,
  "entry_exit_criteria" text,
  "schedule_resources" text,
  "risk_areas" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_test_plan enable row level security;
drop policy if exists "own_form_test_plan" on form_test_plan;
create policy "own_form_test_plan" on form_test_plan for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- Test Cases / Scripts
create table if not exists form_test_cases (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "author" text,
  "feature" text,
  "version" text,
  "date" text,
  "preconditions_test_data" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_test_cases enable row level security;
drop policy if exists "own_form_test_cases" on form_test_cases;
create policy "own_form_test_cases" on form_test_cases for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

create table if not exists form_test_cases_test_cases (
  "id" uuid primary key default gen_random_uuid(),
  "parent_id" uuid not null references form_test_cases(id) on delete cascade,
  "position" int not null default 0,
  "id_2" text,
  "steps" text,
  "expected_result" text
);
alter table form_test_cases_test_cases enable row level security;
drop policy if exists "own_form_test_cases_test_cases" on form_test_cases_test_cases;
create policy "own_form_test_cases_test_cases" on form_test_cases_test_cases for all using (exists (select 1 from form_test_cases p where p."id" = "parent_id" and p."user_id" = auth.uid())) with check (exists (select 1 from form_test_cases p where p."id" = "parent_id" and p."user_id" = auth.uid()));

-- Requirements Traceability Matrix
create table if not exists form_rtm (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner" text,
  "project" text,
  "version" text,
  "date" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_rtm enable row level security;
drop policy if exists "own_form_rtm" on form_rtm;
create policy "own_form_rtm" on form_rtm for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

create table if not exists form_rtm_traceability (
  "id" uuid primary key default gen_random_uuid(),
  "parent_id" uuid not null references form_rtm(id) on delete cascade,
  "position" int not null default 0,
  "req_id" text,
  "design" text,
  "test_case" text,
  "status" text
);
alter table form_rtm_traceability enable row level security;
drop policy if exists "own_form_rtm_traceability" on form_rtm_traceability;
create policy "own_form_rtm_traceability" on form_rtm_traceability for all using (exists (select 1 from form_rtm p where p."id" = "parent_id" and p."user_id" = auth.uid())) with check (exists (select 1 from form_rtm p where p."id" = "parent_id" and p."user_id" = auth.uid()));

-- User Acceptance Testing Plan
create table if not exists form_uat_plan (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner" text,
  "system" text,
  "status" text,
  "date" text,
  "scope_objectives" text,
  "participants" text,
  "test_scenarios" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_uat_plan enable row level security;
drop policy if exists "own_form_uat_plan" on form_uat_plan;
create policy "own_form_uat_plan" on form_uat_plan for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

create table if not exists form_uat_plan_sign_off (
  "id" uuid primary key default gen_random_uuid(),
  "parent_id" uuid not null references form_uat_plan(id) on delete cascade,
  "position" int not null default 0,
  "name" text,
  "role" text,
  "date" text
);
alter table form_uat_plan_sign_off enable row level security;
drop policy if exists "own_form_uat_plan_sign_off" on form_uat_plan_sign_off;
create policy "own_form_uat_plan_sign_off" on form_uat_plan_sign_off for all using (exists (select 1 from form_uat_plan p where p."id" = "parent_id" and p."user_id" = auth.uid())) with check (exists (select 1 from form_uat_plan p where p."id" = "parent_id" and p."user_id" = auth.uid()));

-- Bug / Defect Report
create table if not exists form_bug_report (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "reporter" text,
  "severity" text,
  "environment" text,
  "date" text,
  "summary" text,
  "steps_to_reproduce" text,
  "expected_vs_actual" text,
  "priority_notes" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_bug_report enable row level security;
drop policy if exists "own_form_bug_report" on form_bug_report;
create policy "own_form_bug_report" on form_bug_report for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- Validation (IQ / OQ / PQ)
create table if not exists form_iq_oq_pq (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner" text,
  "system" text,
  "protocol" text,
  "date" text,
  "installation_qualification_iq" text,
  "operational_qualification_oq" text,
  "performance_qualification_pq" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_iq_oq_pq enable row level security;
drop policy if exists "own_form_iq_oq_pq" on form_iq_oq_pq;
create policy "own_form_iq_oq_pq" on form_iq_oq_pq for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

create table if not exists form_iq_oq_pq_approval (
  "id" uuid primary key default gen_random_uuid(),
  "parent_id" uuid not null references form_iq_oq_pq(id) on delete cascade,
  "position" int not null default 0,
  "name" text,
  "role" text,
  "date" text
);
alter table form_iq_oq_pq_approval enable row level security;
drop policy if exists "own_form_iq_oq_pq_approval" on form_iq_oq_pq_approval;
create policy "own_form_iq_oq_pq_approval" on form_iq_oq_pq_approval for all using (exists (select 1 from form_iq_oq_pq p where p."id" = "parent_id" and p."user_id" = auth.uid())) with check (exists (select 1 from form_iq_oq_pq p where p."id" = "parent_id" and p."user_id" = auth.uid()));

-- Security Policy
create table if not exists form_security_policy (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner" text,
  "scope" text,
  "version" text,
  "effective" text,
  "acceptable_use" text,
  "access_control" text,
  "data_handling" text,
  "incident_response" text,
  "enforcement_review" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_security_policy enable row level security;
drop policy if exists "own_form_security_policy" on form_security_policy;
create policy "own_form_security_policy" on form_security_policy for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- Data Governance Documentation
create table if not exists form_data_governance (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner" text,
  "domain" text,
  "version" text,
  "date" text,
  "ownership_stewardship" text,
  "classification" text,
  "quality_standards" text,
  "retention" text,
  "lineage" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_data_governance enable row level security;
drop policy if exists "own_form_data_governance" on form_data_governance;
create policy "own_form_data_governance" on form_data_governance for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- Access Control / RLS Documentation
create table if not exists form_access_control (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner" text,
  "system" text,
  "version" text,
  "date" text,
  "roles_definitions" text,
  "group_mappings" text,
  "row_level_security_rules" text,
  "approval_process_review_cadence" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_access_control enable row level security;
drop policy if exists "own_form_access_control" on form_access_control;
create policy "own_form_access_control" on form_access_control for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- Audit Trail / Evidence Documentation
create table if not exists form_audit_trail (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner" text,
  "framework" text,
  "period" text,
  "date" text,
  "controls_in_scope" text,
  "access_reviews_change_logs" text,
  "gaps" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_audit_trail enable row level security;
drop policy if exists "own_form_audit_trail" on form_audit_trail;
create policy "own_form_audit_trail" on form_audit_trail for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

create table if not exists form_audit_trail_evidence (
  "id" uuid primary key default gen_random_uuid(),
  "parent_id" uuid not null references form_audit_trail(id) on delete cascade,
  "position" int not null default 0,
  "control" text,
  "evidence" text,
  "location" text
);
alter table form_audit_trail_evidence enable row level security;
drop policy if exists "own_form_audit_trail_evidence" on form_audit_trail_evidence;
create policy "own_form_audit_trail_evidence" on form_audit_trail_evidence for all using (exists (select 1 from form_audit_trail p where p."id" = "parent_id" and p."user_id" = auth.uid())) with check (exists (select 1 from form_audit_trail p where p."id" = "parent_id" and p."user_id" = auth.uid()));

-- Data Protection Impact Assessment
create table if not exists form_dpia (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner" text,
  "activity" text,
  "status" text,
  "date" text,
  "processing_activity" text,
  "data_subjects" text,
  "necessity_proportionality" text,
  "privacy_risks" text,
  "mitigations" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_dpia enable row level security;
drop policy if exists "own_form_dpia" on form_dpia;
create policy "own_form_dpia" on form_dpia for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- Compliance Matrix / Control Mapping
create table if not exists form_compliance_matrix (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner" text,
  "framework" text,
  "version" text,
  "date" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_compliance_matrix enable row level security;
drop policy if exists "own_form_compliance_matrix" on form_compliance_matrix;
create policy "own_form_compliance_matrix" on form_compliance_matrix for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

create table if not exists form_compliance_matrix_control_mapping (
  "id" uuid primary key default gen_random_uuid(),
  "parent_id" uuid not null references form_compliance_matrix(id) on delete cascade,
  "position" int not null default 0,
  "requirement" text,
  "control" text,
  "evidence" text,
  "status" text
);
alter table form_compliance_matrix_control_mapping enable row level security;
drop policy if exists "own_form_compliance_matrix_control_mapping" on form_compliance_matrix_control_mapping;
create policy "own_form_compliance_matrix_control_mapping" on form_compliance_matrix_control_mapping for all using (exists (select 1 from form_compliance_matrix p where p."id" = "parent_id" and p."user_id" = auth.uid())) with check (exists (select 1 from form_compliance_matrix p where p."id" = "parent_id" and p."user_id" = auth.uid()));

-- Vendor / Third-Party Risk Assessment
create table if not exists form_vendor_risk (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner" text,
  "vendor" text,
  "status" text,
  "date" text,
  "vendor_overview" text,
  "security_posture" text,
  "compliance_certifications" text,
  "data_access_risk" text,
  "decision" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_vendor_risk enable row level security;
drop policy if exists "own_form_vendor_risk" on form_vendor_risk;
create policy "own_form_vendor_risk" on form_vendor_risk for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- User Guide / Manual
create table if not exists form_user_guide (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner" text,
  "product" text,
  "version" text,
  "date" text,
  "overview" text,
  "getting_started" text,
  "features_tasks" text,
  "troubleshooting_reference" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_user_guide enable row level security;
drop policy if exists "own_form_user_guide" on form_user_guide;
create policy "own_form_user_guide" on form_user_guide for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- Quick Start Guide
create table if not exists form_quick_start (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner" text,
  "product" text,
  "version" text,
  "date" text,
  "prerequisites" text,
  "steps_to_first_success" text,
  "verify_it_works" text,
  "next_steps" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_quick_start enable row level security;
drop policy if exists "own_form_quick_start" on form_quick_start;
create policy "own_form_quick_start" on form_quick_start for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- Frequently Asked Questions
create table if not exists form_faq (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner" text,
  "product" text,
  "status" text,
  "date" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_faq enable row level security;
drop policy if exists "own_form_faq" on form_faq;
create policy "own_form_faq" on form_faq for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

create table if not exists form_faq_questions_answers (
  "id" uuid primary key default gen_random_uuid(),
  "parent_id" uuid not null references form_faq(id) on delete cascade,
  "position" int not null default 0,
  "question" text,
  "answer" text
);
alter table form_faq_questions_answers enable row level security;
drop policy if exists "own_form_faq_questions_answers" on form_faq_questions_answers;
create policy "own_form_faq_questions_answers" on form_faq_questions_answers for all using (exists (select 1 from form_faq p where p."id" = "parent_id" and p."user_id" = auth.uid())) with check (exists (select 1 from form_faq p where p."id" = "parent_id" and p."user_id" = auth.uid()));

-- Training Materials
create table if not exists form_training (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner" text,
  "audience" text,
  "version" text,
  "date" text,
  "learning_objectives" text,
  "modules_outline" text,
  "exercises" text,
  "assessment_resources" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_training enable row level security;
drop policy if exists "own_form_training" on form_training;
create policy "own_form_training" on form_training for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

-- Tooltips / In-App Help / UX Copy
create table if not exists form_ux_copy (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "owner" text,
  "surface" text,
  "status" text,
  "date" text,
  "voice_tone" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_ux_copy enable row level security;
drop policy if exists "own_form_ux_copy" on form_ux_copy;
create policy "own_form_ux_copy" on form_ux_copy for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

create table if not exists form_ux_copy_copy (
  "id" uuid primary key default gen_random_uuid(),
  "parent_id" uuid not null references form_ux_copy(id) on delete cascade,
  "position" int not null default 0,
  "element" text,
  "copy" text,
  "notes" text
);
alter table form_ux_copy_copy enable row level security;
drop policy if exists "own_form_ux_copy_copy" on form_ux_copy_copy;
create policy "own_form_ux_copy_copy" on form_ux_copy_copy for all using (exists (select 1 from form_ux_copy p where p."id" = "parent_id" and p."user_id" = auth.uid())) with check (exists (select 1 from form_ux_copy p where p."id" = "parent_id" and p."user_id" = auth.uid()));

-- Controlled Document Record
create table if not exists form_cdoc (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "doc_id" text,
  "document_title" text,
  "document_type" text,
  "department" text,
  "lifecycle_phase" text,
  "status" text,
  "version" text,
  "owner" text,
  "approver" text,
  "review_cycle" text,
  "next_review" text,
  "classification" text,
  "purpose_scope" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_cdoc enable row level security;
drop policy if exists "own_form_cdoc" on form_cdoc;
create policy "own_form_cdoc" on form_cdoc for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

create table if not exists form_cdoc_raci_assignments (
  "id" uuid primary key default gen_random_uuid(),
  "parent_id" uuid not null references form_cdoc(id) on delete cascade,
  "position" int not null default 0,
  "role" text,
  "name" text,
  "responsibility" text,
  "notes" text
);
alter table form_cdoc_raci_assignments enable row level security;
drop policy if exists "own_form_cdoc_raci_assignments" on form_cdoc_raci_assignments;
create policy "own_form_cdoc_raci_assignments" on form_cdoc_raci_assignments for all using (exists (select 1 from form_cdoc p where p."id" = "parent_id" and p."user_id" = auth.uid())) with check (exists (select 1 from form_cdoc p where p."id" = "parent_id" and p."user_id" = auth.uid()));

create table if not exists form_cdoc_version_history (
  "id" uuid primary key default gen_random_uuid(),
  "parent_id" uuid not null references form_cdoc(id) on delete cascade,
  "position" int not null default 0,
  "version" text,
  "status" text,
  "change_summary" text,
  "class" text,
  "author" text,
  "effective" text,
  "linked_cr" text
);
alter table form_cdoc_version_history enable row level security;
drop policy if exists "own_form_cdoc_version_history" on form_cdoc_version_history;
create policy "own_form_cdoc_version_history" on form_cdoc_version_history for all using (exists (select 1 from form_cdoc p where p."id" = "parent_id" and p."user_id" = auth.uid())) with check (exists (select 1 from form_cdoc p where p."id" = "parent_id" and p."user_id" = auth.uid()));

create table if not exists form_cdoc_approval_attestations (
  "id" uuid primary key default gen_random_uuid(),
  "parent_id" uuid not null references form_cdoc(id) on delete cascade,
  "position" int not null default 0,
  "name" text,
  "role" text,
  "attestation_kind" text,
  "date" text
);
alter table form_cdoc_approval_attestations enable row level security;
drop policy if exists "own_form_cdoc_approval_attestations" on form_cdoc_approval_attestations;
create policy "own_form_cdoc_approval_attestations" on form_cdoc_approval_attestations for all using (exists (select 1 from form_cdoc p where p."id" = "parent_id" and p."user_id" = auth.uid())) with check (exists (select 1 from form_cdoc p where p."id" = "parent_id" and p."user_id" = auth.uid()));

-- Baseline & Phase-Gate Record
create table if not exists form_bpg (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "title" text,
  "project_id" uuid references projects(id) on delete set null,
  "project_code" text,
  "project_name" text,
  "baselined_by" text,
  "date" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
alter table form_bpg enable row level security;
drop policy if exists "own_form_bpg" on form_bpg;
create policy "own_form_bpg" on form_bpg for all using (auth.uid() = "user_id") with check (auth.uid() = "user_id");

create table if not exists form_bpg_baselines (
  "id" uuid primary key default gen_random_uuid(),
  "parent_id" uuid not null references form_bpg(id) on delete cascade,
  "position" int not null default 0,
  "type" text,
  "version" text,
  "status" text,
  "change_summary" text,
  "baselined_by" text,
  "date" text,
  "budget" text,
  "activities" text
);
alter table form_bpg_baselines enable row level security;
drop policy if exists "own_form_bpg_baselines" on form_bpg_baselines;
create policy "own_form_bpg_baselines" on form_bpg_baselines for all using (exists (select 1 from form_bpg p where p."id" = "parent_id" and p."user_id" = auth.uid())) with check (exists (select 1 from form_bpg p where p."id" = "parent_id" and p."user_id" = auth.uid()));

create table if not exists form_bpg_phase_gate_transitions (
  "id" uuid primary key default gen_random_uuid(),
  "parent_id" uuid not null references form_bpg(id) on delete cascade,
  "position" int not null default 0,
  "from_phase" text,
  "to_phase" text,
  "gate_decision" text,
  "approved_by" text,
  "date" text,
  "notes" text
);
alter table form_bpg_phase_gate_transitions enable row level security;
drop policy if exists "own_form_bpg_phase_gate_transitions" on form_bpg_phase_gate_transitions;
create policy "own_form_bpg_phase_gate_transitions" on form_bpg_phase_gate_transitions for all using (exists (select 1 from form_bpg p where p."id" = "parent_id" and p."user_id" = auth.uid())) with check (exists (select 1 from form_bpg p where p."id" = "parent_id" and p."user_id" = auth.uid()));
