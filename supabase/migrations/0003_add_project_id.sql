-- Add project_id to form_status_report and form_change_request
-- These columns were defined in the original schema but missing from the live database.

ALTER TABLE form_status_report
  ADD COLUMN IF NOT EXISTS project_id uuid REFERENCES projects(id) ON DELETE SET NULL;

ALTER TABLE form_change_request
  ADD COLUMN IF NOT EXISTS project_id uuid REFERENCES projects(id) ON DELETE SET NULL;

-- Note: bi_reader already has SELECT on both tables.
-- New columns are automatically covered by table-level SELECT grants in PostgreSQL;
-- no additional GRANT is required.
