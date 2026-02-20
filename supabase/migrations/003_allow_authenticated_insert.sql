-- Permitir INSERT desde el role 'authenticated' (útil si el request incluye credenciales)
CREATE POLICY "Permitir insertar desde authenticated" ON contact_messages
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- Nota: Si prefieres un único policy que cubra ambos roles, puedes ejecutar:
-- DROP POLICY "Permitir insertar desde anon" ON contact_messages;
-- CREATE POLICY "Permitir insertar publico" ON contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
