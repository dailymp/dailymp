-- Tabla para almacenar mensajes de contacto
CREATE TABLE contact_messages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  read BOOLEAN DEFAULT FALSE,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Índice para búsquedas por fecha
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);

-- Índice para filtrar mensajes no leídos
CREATE INDEX idx_contact_messages_read ON contact_messages(read) WHERE read = false;

-- Comentarios para documentación
COMMENT ON TABLE contact_messages IS 'Mensajes enviados desde el formulario de contacto';
COMMENT ON COLUMN contact_messages.metadata IS 'Información adicional: user_agent, ip, idioma, etc.';
