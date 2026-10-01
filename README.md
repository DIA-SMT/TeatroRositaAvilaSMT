# Teatro Municipal Rosita Ávila

Sitio de cartelera del Teatro Rosita Ávila (Municipalidad de San Miguel de Tucumán).
Stack: Next.js 16 (App Router) · Tailwind CSS 4 · Supabase · Vercel. Usar **pnpm**.

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

## Cómo funcionan los eventos

Los eventos **no se cargan a mano**: salen de la ticketera oficial, [entradas.smt.gob.ar](https://entradas.smt.gob.ar)
(plataforma Aplausos), y el botón "Comprar" lleva a `entradas.smt.gob.ar/shows/{id}`.

- `lib/aplausos.ts`: cliente de la API `onlinesales-api.aplausos.com.ar`. El tenant se resuelve por el header
  `Origin`, por eso se consume **sólo desde el servidor**. Cache de 5 minutos (ISR).
- `lib/events.ts`: arma el modelo `TheaterEvent` (precios, estado, funciones futuras) y aplica los ajustes de Supabase.
- `supabase/schema.sql`: tabla `event_overrides` para **ocultar** shows que no son en el teatro (la ticketera
  también vende eventos de otros lugares), **destacar** uno en el hero o reemplazar la descripción.

Sin variables de Supabase el sitio funciona igual y muestra todos los shows de la ticketera.

## Estructura

```
app/            páginas: inicio, /eventos, /eventos/[slug], /el-teatro, /contacto, sitemap y robots
components/     header, footer, cards y secciones de la home
lib/site.ts     datos institucionales (dirección, teléfono, redes; los TODO faltan confirmar)
```
