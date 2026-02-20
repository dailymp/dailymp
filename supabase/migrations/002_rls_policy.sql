-- Habilitar Row Level Security y permitir INSERT desde el rol anon (para formularios públicos)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Política: permitir insertar a `anon` (formularios del frontend)
CREATE POLICY "Permitir insertar desde anon" ON contact_messages
  FOR INSERT TO anon
  WITH CHECK (true);

-- Política adicional recomendada: permitir SELECT sólo a authenticated (opcional)
CREATE POLICY "Permitir seleccionar a autenticados" ON contact_messages
  FOR SELECT TO authenticated
  USING (true);

-- Nota: Ejecuta este archivo en el SQL Editor de Supabase para aplicar las políticas.
