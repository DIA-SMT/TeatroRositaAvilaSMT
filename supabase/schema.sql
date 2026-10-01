-- Teatro Rosita Ávila — esquema Supabase
-- Los eventos NO se cargan acá: salen de la ticketera (entradas.smt.gob.ar).
-- Esta tabla sólo guarda ajustes editoriales por show (ocultar, destacar, descripción propia).

create table if not exists public.event_overrides (
  show_id     text primary key,            -- id del show en entradas.smt.gob.ar
  hidden      boolean,                     -- null = regla automática (detecta otras sedes), true = ocultar, false = mostrar siempre
  featured    boolean not null default false, -- true = destacado en el hero de la home
  description text,                        -- reemplaza la sinopsis de la ticketera
  note        text,                        -- nota interna para el equipo
  updated_at  timestamptz not null default now()
);

alter table public.event_overrides enable row level security;

create policy "event_overrides lectura pública"
  on public.event_overrides for select
  using (true);

create policy "event_overrides escritura autenticada"
  on public.event_overrides for all
  to authenticated
  using (true)
  with check (true);

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists event_overrides_touch on public.event_overrides;
create trigger event_overrides_touch
  before update on public.event_overrides
  for each row execute function public.touch_updated_at();
