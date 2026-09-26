import path from 'node:path';
import type { Plugin } from 'vite';

export const PRESENTER_TRANSPORT_VMOD = 'virtual:open-slide/presenter-transport';
export const BROADCAST_TRANSPORT_VMOD = 'virtual:open-slide/presenter-transport/broadcast';

// Runs last so a workspace plugin that resolves the transport id itself wins
// without having to know about plugin ordering.
export function presenterTransportPlugin({ appRoot }: { appRoot: string }): Plugin {
  const broadcastFile = path.join(appRoot, 'components', 'present', 'presenter-transport.ts');
  const resolvedId = `\0${PRESENTER_TRANSPORT_VMOD}`;
  return {
    name: 'open-slide:presenter-transport',
    enforce: 'post',
    resolveId(id) {
      if (id === PRESENTER_TRANSPORT_VMOD) return resolvedId;
      // Exposed so a replacement can wrap the default instead of redoing it.
      if (id === BROADCAST_TRANSPORT_VMOD) return broadcastFile;
      return null;
    },
    load(id) {
      if (id !== resolvedId) return null;
      return `export { createBroadcastTransport as createPresenterTransport } from ${JSON.stringify(broadcastFile)};\n`;
    },
  };
}
