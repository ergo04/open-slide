import type { PluginOption } from 'vite';
import type { Locale } from './locale/types';

export type OpenSlideBuildConfig = {
  showSlideBrowser?: boolean;
  showSlideUi?: boolean;
  allowHtmlDownload?: boolean;
};

export type OpenSlideViteConfig = {
  /**
   * Extra Vite plugins, appended after open-slide's own. They run in `dev`,
   * `build` and `preview`, so a plugin can add routes to the dev server,
   * inject scripts into the page, or replace a runtime module.
   */
  plugins?: PluginOption[];
};

export type OpenSlideConfig = {
  base?: string;
  slidesDir?: string;
  themesDir?: string;
  assetsDir?: string;
  port?: number;
  allowedHosts?: string[] | true;
  /**
   * @deprecated Pick the UI language from the language switcher in the slide UI
   * instead. When set, this only seeds the initial language until the user
   * chooses one (their choice is then remembered locally).
   */
  locale?: Locale;
  build?: OpenSlideBuildConfig;
  vite?: OpenSlideViteConfig;
};
