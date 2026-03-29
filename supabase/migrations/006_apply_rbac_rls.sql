-- Habilita RLS na tabela profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 1. Qualquer membro autenticado consegue ver profiles do seu mesmo tenant_id
CREATE POLICY "Users can view profiles from same tenant"
  ON public.profiles
  FOR SELECT
  USING (
    tenant_id = (SELECT tenant_id FROM public.profiles WHERE id = auth.uid() LIMIT 1)
  );

-- 2. Admin pode atualizar perfis no seu mesmo tenant
CREATE POLICY "Admins can update profiles in their tenant"
  ON public.profiles
  FOR UPDATE
  USING (
    tenant_id = (SELECT tenant_id FROM public.profiles WHERE id = auth.uid() LIMIT 1) AND
    (SELECT role FROM public.profiles WHERE id = auth.uid() LIMIT 1) = 'admin'
  );

-- 3. Usuarios normais podem atualizar o próprio perfil (ex: nome, avatar).
-- NOTA: O backend protege a inserção/atualização da role no lado do servidor.
CREATE POLICY "Users can edit their own profile basic info"
  ON public.profiles
  FOR UPDATE
  USING (
    id = auth.uid()
  );

-- 4. Somente admins podem deletar (soft-delete ou hard-delete) perfis no seu tenant
CREATE POLICY "Admins can delete profiles in their tenant"
  ON public.profiles
  FOR DELETE
  USING (
    tenant_id = (SELECT tenant_id FROM public.profiles WHERE id = auth.uid() LIMIT 1) AND
    (SELECT role FROM public.profiles WHERE id = auth.uid() LIMIT 1) = 'admin'
  );
