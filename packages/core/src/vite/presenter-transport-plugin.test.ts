import path from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  BROADCAST_TRANSPORT_VMOD,
  PRESENTER_TRANSPORT_VMOD,
  presenterTransportPlugin,
} from './presenter-transport-plugin.ts';

const appRoot = path.join('/core', 'src', 'app');
const broadcastFile = path.join(appRoot, 'components', 'present', 'presenter-transport.ts');

function setup() {
  const plugin = presenterTransportPlugin({ appRoot });
  const resolveId = plugin.resolveId as (id: string) => string | null;
  const load = plugin.load as (id: string) => string | null;
  return { plugin, resolveId, load };
}

describe('presenterTransportPlugin', () => {
  it('defaults the transport to BroadcastChannel', () => {
    const { resolveId, load } = setup();

    const id = resolveId(PRESENTER_TRANSPORT_VMOD);

    expect(id).toBe(`\0${PRESENTER_TRANSPORT_VMOD}`);
    expect(load(id as string)).toBe(
      `export { createBroadcastTransport as createPresenterTransport } from ${JSON.stringify(broadcastFile)};\n`,
    );
  });

  it('exposes the default transport so replacements can wrap it', () => {
    const { resolveId } = setup();

    expect(resolveId(BROADCAST_TRANSPORT_VMOD)).toBe(broadcastFile);
  });

  it('runs after workspace plugins so they can override the transport', () => {
    const { plugin } = setup();

    expect(plugin.enforce).toBe('post');
  });

  it('ignores unrelated ids', () => {
    const { resolveId, load } = setup();

    expect(resolveId('virtual:open-slide/config')).toBeNull();
    expect(load('/some/file.ts')).toBeNull();
  });
});
