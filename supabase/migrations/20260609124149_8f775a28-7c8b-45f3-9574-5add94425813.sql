
-- Remove overly permissive public INSERT policies. Submissions go through
-- serverFns using the service-role admin client, which bypasses RLS.
DROP POLICY IF EXISTS "Anyone can submit contact leads" ON public.contact_leads;
DROP POLICY IF EXISTS "Anyone can submit pricing leads" ON public.pricing_leads;
DROP POLICY IF EXISTS "anyone can insert leads" ON public.leads;

-- Revoke direct table privileges from anon/authenticated; only service_role writes.
REVOKE ALL ON public.contact_leads FROM anon, authenticated, public;
REVOKE ALL ON public.pricing_leads FROM anon, authenticated, public;
REVOKE ALL ON public.leads FROM anon, authenticated, public;

GRANT ALL ON public.contact_leads TO service_role;
GRANT ALL ON public.pricing_leads TO service_role;
GRANT ALL ON public.leads TO service_role;
