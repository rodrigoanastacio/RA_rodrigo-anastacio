ALTER TABLE public.landing_pages 
ADD COLUMN whatsapp_form_id UUID REFERENCES public.forms(id) ON DELETE SET NULL;
