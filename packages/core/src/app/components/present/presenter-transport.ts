export type PresenterState = {
  index: number;
  pageCount: number;
  blackout: 'black' | 'white' | null;
  startedAt: number; // epoch ms when present mode began
  stepIndex: number;
  stepCount: number;
};

export type PresenterCommand =
  | { type: 'state'; state: PresenterState }
  | { type: 'goto'; index: number }
  | { type: 'next' }
  | { type: 'prev' }
  | { type: 'request-state' }
  | { type: 'toggle-blackout'; mode: 'black' | 'white' }
  | { type: 'switch-slide'; slideId: string };

export type PresenterTransport = {
  send(msg: PresenterCommand): void;
  close(): void;
};

export type PresenterTransportOptions = {
  slideId: string;
  onMessage(msg: PresenterCommand): void;
};

/**
 * Opens the link between the projection window and presenter views of one
 * deck. Returns `null` when the environment can't support it. Swap it by
 * resolving `virtual:open-slide/presenter-transport` from a Vite plugin.
 */
export type CreatePresenterTransport = (
  options: PresenterTransportOptions,
) => PresenterTransport | null;

export const createBroadcastTransport: CreatePresenterTransport = ({ slideId, onMessage }) => {
  if (typeof window === 'undefined' || typeof BroadcastChannel === 'undefined') return null;
  const channel = new BroadcastChannel(`open-slide:presenter:${slideId}`);
  const handler = (e: MessageEvent<PresenterCommand>) => onMessage(e.data);
  channel.addEventListener('message', handler);
  return {
    send(msg) {
      try {
        channel.postMessage(msg);
      } catch {
        // Channel may have been closed between the availability check
        // and the send (e.g. StrictMode unmount mid-flush). Treat as no-op.
      }
    },
    close() {
      channel.removeEventListener('message', handler);
      channel.close();
    },
  };
};
