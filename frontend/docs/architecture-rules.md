# Reglas de arquitectura

Reglas que sigue el frontend de EcoBite. La descripción de la arquitectura está en el [README](../README.md#arquitectura).

- **`app/` no tiene lógica:** solo define rutas, metadata y re-exporta páginas de los módulos.
- **Los módulos se nombran por dominio de negocio** (`restaurant`, `orders`), no por página (`explore`, `restaurant-portal`). Las páginas van dentro de `pages/` del módulo al que pertenecen.
- **Cada módulo expone su API pública en `index.ts`.** Desde afuera se importa solo de ahí (`@/modules/auth`), nunca de archivos internos.
- **Los módulos no se importan entre sí.** Lo que se comparte va a `shared/`.
- **Las URLs se definen en `shared/config/routes.ts`.** No se escriben rutas a mano en los componentes.
- **Las variables de entorno se leen desde `shared/config/env.ts`**, no con `process.env` directo.
- **Los servicios traducen la API.** El backend usa nombres de campos en español (`nombre`, `rol`…); los servicios de cada módulo los convierten a los tipos en inglés del frontend.
