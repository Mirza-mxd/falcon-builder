
CREATE TABLE public.contact_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  email text NOT NULL,
  phone text,
  subject text,
  message text,
  locale text DEFAULT 'en',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_leads TO anon, authenticated;
GRANT ALL ON public.contact_leads TO service_role;
ALTER TABLE public.contact_leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit contact leads" ON public.contact_leads FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE TABLE public.pricing_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_key text,
  plan_name text,
  full_name text,
  job_title text,
  email text NOT NULL,
  phone text,
  company text,
  industry text,
  company_size text,
  current_system text,
  timeline text,
  needs text,
  locale text DEFAULT 'en',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.pricing_leads TO anon, authenticated;
GRANT ALL ON public.pricing_leads TO service_role;
ALTER TABLE public.pricing_leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit pricing leads" ON public.pricing_leads FOR INSERT TO anon, authenticated WITH CHECK (true);
