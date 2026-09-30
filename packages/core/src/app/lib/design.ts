export type DesignPalette = {
  bg: string;
  text: string;
  accent: string;
  /**
   * Bands around the canvas in present mode when the screen isn't 16:9.
   * Falls back to `bg`, which reads as a cropped page on decks whose pages
   * paint their own backgrounds.
   */
  letterbox?: string;
};

export type DesignFonts = {
  display: string;
  body: string;
};

export type DesignTypeScale = {
  hero: number;
  body: number;
};

export type DesignSystem = {
  palette: DesignPalette;
  fonts: DesignFonts;
  typeScale: DesignTypeScale;
  radius: number;
};

type Patch<T> = { [K in keyof T]?: T[K] extends object ? Patch<T[K]> : T[K] | null };

/** Merged into a slide's `design`; `null` removes an optional token, since JSON drops `undefined`. */
export type DesignPatch = Patch<DesignSystem>;

export function designToCssVars(d: DesignSystem): Record<string, string> {
  return {
    '--osd-bg': d.palette.bg,
    '--osd-text': d.palette.text,
    '--osd-accent': d.palette.accent,
    '--osd-font-display': d.fonts.display,
    '--osd-font-body': d.fonts.body,
    '--osd-size-hero': `${d.typeScale.hero}px`,
    '--osd-size-body': `${d.typeScale.body}px`,
    '--osd-radius': `${d.radius}px`,
  };
}

export function cssVarsToString(vars: Record<string, string>): string {
  return Object.entries(vars)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join('\n');
}

export const defaultDesign: DesignSystem = {
  palette: {
    bg: '#f7f5f0',
    text: '#1a1814',
    accent: '#6d4cff',
  },
  fonts: {
    display: 'Georgia, "Times New Roman", serif',
    body: '-apple-system, BlinkMacSystemFont, "Inter", system-ui, sans-serif',
  },
  typeScale: {
    hero: 168,
    body: 36,
  },
  radius: 12,
};
