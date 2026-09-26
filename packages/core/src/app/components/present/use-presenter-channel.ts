import { createPresenterTransport } from 'virtual:open-slide/presenter-transport';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { PresenterCommand, PresenterTransport } from './presenter-transport';

export type { PresenterCommand, PresenterState } from './presenter-transport';

type Handler = (msg: PresenterCommand) => void;

// Transport ownership lives in the effect (not useMemo) so StrictMode's
// double-invoke produces a fresh transport on remount rather than leaving a
// closed one behind that throws on the next send().
export function usePresenterChannel(slideId: string, onMessage?: Handler) {
  const onMessageRef = useRef(onMessage);
  onMessageRef.current = onMessage;

  const transportRef = useRef<PresenterTransport | null>(null);
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    const transport = createPresenterTransport({
      slideId,
      onMessage: (msg: PresenterCommand) => onMessageRef.current?.(msg),
    });
    if (!transport) return;
    transportRef.current = transport;
    setAvailable(true);
    return () => {
      transport.close();
      if (transportRef.current === transport) transportRef.current = null;
      setAvailable(false);
    };
  }, [slideId]);

  return useMemo(
    () => ({
      send(msg: PresenterCommand) {
        transportRef.current?.send(msg);
      },
      available,
    }),
    [available],
  );
}
