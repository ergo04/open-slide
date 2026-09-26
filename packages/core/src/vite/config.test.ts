import os from 'node:os';
import type { Plugin, PluginOption } from 'vite';
import { describe, expect, it } from 'vitest';
import { createViteConfig } from './config.ts';

function pluginNames(plugins: PluginOption[] | undefined): string[] {
  return (plugins ?? []).flatMap((p): string[] => {
    if (Array.isArray(p)) return pluginNames(p);
    return p && typeof p === 'object' && 'name' in p ? [p.name] : [];
  });
}

describe('createViteConfig', () => {
  it('appends user plugins after the built-in ones', async () => {
    const userPlugin: Plugin = { name: 'user:extra' };

    const config = await createViteConfig({
      userCwd: os.tmpdir(),
      config: { vite: { plugins: [userPlugin] } },
    });

    const names = pluginNames(config.plugins);
    expect(names.at(-1)).toBe('user:extra');
    expect(names.indexOf('user:extra')).toBeGreaterThan(names.indexOf('open-slide'));
  });

  it('leaves the plugin list unchanged when no user plugins are given', async () => {
    const withNone = await createViteConfig({ userCwd: os.tmpdir(), config: {} });
    const withEmpty = await createViteConfig({
      userCwd: os.tmpdir(),
      config: { vite: { plugins: [] } },
    });

    expect(pluginNames(withEmpty.plugins)).toEqual(pluginNames(withNone.plugins));
  });
});
