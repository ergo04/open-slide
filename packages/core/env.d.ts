// Ambient module declarations for assets imported from `slides/<id>/assets/`.
// Mirrors Vite's default asset handling (default export = resolved URL).
//
// Consumers opt in via tsconfig:
//
//   { "compilerOptions": { "types": ["@open-slide/core/env"] } }

declare module '*.svg' {
  const src: string;
  export default src;
}
declare module '*.png' {
  const src: string;
  export default src;
}
declare module '*.jpg' {
  const src: string;
  export default src;
}
declare module '*.jpeg' {
  const src: string;
  export default src;
}
declare module '*.webp' {
  const src: string;
  export default src;
}
declare module '*.gif' {
  const src: string;
  export default src;
}
declare module '*.avif' {
  const src: string;
  export default src;
}
declare module '*.mp4' {
  const src: string;
  export default src;
}
declare module '*.webm' {
  const src: string;
  export default src;
}
declare module '*.woff' {
  const src: string;
  export default src;
}
declare module '*.woff2' {
  const src: string;
  export default src;
}
declare module '*.ttf' {
  const src: string;
  export default src;
}
declare module '*.otf' {
  const src: string;
  export default src;
}

// Default presenter transport, for replacements that wrap it instead of
// starting from scratch (see "Custom presenter transport" in the docs).
declare module 'virtual:open-slide/presenter-transport/broadcast' {
  import type { CreatePresenterTransport } from '@open-slide/core';
  export const createBroadcastTransport: CreatePresenterTransport;
}
