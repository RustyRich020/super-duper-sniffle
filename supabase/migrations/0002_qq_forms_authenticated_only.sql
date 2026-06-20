-- 0002_qq_forms_authenticated_only.sql
--
-- Closes the public read/write hole on public.qq_forms (the legacy "simple
-- draft" key-value store). Replaces the always-true anon policy with one that
-- requires an authenticated Supabase session.
--
-- SEQUENCING: apply this ONLY together with the FormsApp.tsx change
-- (FormsApp.tsx.patch), which defers all qq_forms reads/writes until after a
-- session exists. Applying this before that code ships will break app startup,
-- because the current code reads qq_forms as anon in loadRemote().

DROP POLICY IF EXISTS qq_forms_anon ON public.qq_forms;

CREATE POLICY qq_forms_authenticated ON public.qq_forms
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- NOTE (follow-up, optional): qq_forms has no user_id column, so the row set is
-- still SHARED across all authenticated users (one draft per form id). The
-- multi-record per-user system already lives in the form_* tables. To make the
-- simple editor per-user too, add a user_id column + composite key and filter
-- upsert/select by auth.uid(); that is a larger code change and is intentionally
-- not included here.
