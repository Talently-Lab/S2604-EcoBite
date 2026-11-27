# EcoBite · Frontend

## Tecnologías

| Tecnología                                   | Versión | Uso                                                              |
| -------------------------------------------- | ------- | ---------------------------------------------------------------- |
| [Next.js](https://nextjs.org) (App Router)   | 16.3    | Framework, ruteo y build                                         |
| [React](https://react.dev)                   | 19.2    | Interfaz de usuario                                              |
| [TypeScript](https://www.typescriptlang.org) | 5       | Tipado estático (modo `strict`)                                  |
| [Tailwind CSS](https://tailwindcss.com)      | 4       | Estilos, con los tokens de diseño definidos en `app/globals.css` |
| [Motion](https://motion.dev)                 | 14      | Animaciones y transiciones entre páginas                         |
| [ESLint](https://eslint.org)                 | 9       | Linter (`eslint-config-next`)                                    |
| `next/font`                                  | —       | Tipografías Bricolage Grotesque y DM Sans                        |

## Arquitectura

El frontend es un **monolito modular**: el código se agrupa por **dominio de negocio**, no por tipo de archivo ni por página.

```
app/            Solo rutas de Next.js. Cada page.tsx / layout.tsx re-exporta desde un módulo.
modules/        Un módulo por dominio de negocio.
  auth/         Login, registro y usuario actual.
  restaurant/   Exploración de restaurantes y portal del restaurante.
  orders/       Pedidos.
  landing/      Página de inicio.
shared/         Código reutilizable entre módulos.
  config/       Rutas de la app (routes.ts) y variables de entorno (env.ts).
  layout/       Header, footer y layout del sitio.
  ui/           Componentes de UI genéricos (botones, inputs, logo, íconos).
```

Cada módulo sigue la misma estructura interna (solo las carpetas que necesite):

```
modules/<dominio>/
  components/   Componentes propios del módulo.
  context/      Contextos de React.
  lib/          Lógica pura y helpers.
  pages/        Componentes de página que usan las rutas de app/.
  services/     Llamadas al backend y mapeo de sus respuestas.
  types.ts      Tipos del dominio.
  index.ts      API pública del módulo.
```

Las reglas que hay que respetar están en [docs/architecture-rules.md](docs/architecture-rules.md).

## Gestor de paquetes

El proyecto usa **[pnpm](https://pnpm.io)**. Si no lo tienes, sigue las instrucciones que provee la página oficial.

```bash
pnpm install              # instalar dependencias
cp .env.example .env      # configurar NEXT_PUBLIC_API_URL con la URL del backend
pnpm dev                  # servidor de desarrollo en http://localhost:3000
pnpm build                # build de producción
pnpm start                # servir el build de producción
pnpm lint                 # correr ESLint
```
