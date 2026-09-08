// Ported from the design system's light/dark token export. The source JSON is
// not tracked in this repo, so edits here are the source of truth for now.

export const colorTokensLight = {
  bg: {
    page: '#F2F3F5',
    surface: 'rgba(0, 0, 0, 0.04)',
    subtle: 'rgba(0, 0, 0, 0.06)',
    elevated: '#FFFFFF',
    toast: 'rgba(0, 0, 0, 0.88)',
  },
  text: {
    primary: 'rgba(0, 0, 0, 0.88)',
    secondary: 'rgba(0, 0, 0, 0.64)',
    tertiary: 'rgba(0, 0, 0, 0.48)',
    disable: 'rgba(0, 0, 0, 0.24)',
    inverse: '#FFFFFF',
    link: '#0074DB',
  },
  border: {
    subtle: 'rgba(0, 0, 0, 0.08)',
    strong: 'rgba(0, 0, 0, 0.12)',
    focus: '#0088FF',
  },
  accent: {
    muted: 'rgba(0, 136, 255, 0.08)',
    primary: '#0088FF',
  },
  state: {
    success: '#34C759',
    warning: '#FF9F0A',
    error: '#FF453A',
    special: '#664DFF',
    info: '#0088FF',
    primary: {
      success: '#34C759',
      warning: '#FF9F0A',
      error: '#FF453A',
      special: '#664DFF',
      info: '#0088FF',
    },
    subtle: {
      success: '#EAF8F0',
      warning: '#FFF3E0',
      error: '#FFECEC',
      special: '#EFECFF',
      info: '#E6F1FF',
      gray: '#E8E9EB',
    },
  },
  action: {
    primary: {
      bg: {
        default: '#1D1D1D',
        subtle: 'rgba(0, 0, 0, 0.06)',
        strong: '#000000',
      },
      text: {
        default: 'rgba(0, 0, 0, 0.88)',
        inverse: '#FFFFFF',
        reverse: '#FFFFFF',
      },
      border: {
        default: 'rgba(0, 0, 0, 0.88)',
      },
    },
    secondary: {
      default: 'rgba(0, 0, 0, 0.04)',
      text: 'rgba(0, 0, 0, 0.88)',
    },
    destructive: {
      bg: {
        default: '#FF453A',
        subtle: 'rgba(255, 69, 58, 0.08)',
        strong: '#E03B32',
      },
      text: {
        default: '#FF453A',
        inverse: '#FFFFFF',
      },
      border: {
        default: '#FF453A',
      },
    },
  },
  mask: {
    default: 'rgba(0, 0, 0, 0.32)',
    'white-start': '#F2F3F5',
    'white-end': 'rgba(242, 243, 245, 0)',
  },
  material: {
    start: '#EDEEF0',
    end: '#FFFFFF',
    default: '#FFFFFF',
    highlight: '#FFFFFF',
  },
  shadow: {
    default: 'rgba(0, 0, 0, 0.06)',
    strong: 'rgba(0, 0, 0, 0.12)',
  },
  incognito: {
    bg: '#1C1C1E',
    primary: 'rgba(255, 255, 255, 0.88)',
    reverse: 'rgba(0, 0, 0, 0.88)',
    start: '#2E2E30',
    end: '#404042',
    disable: 'rgba(255, 255, 255, 0.24)',
    border: 'rgba(255, 255, 255, 0.04)',
  },
} as const;

export const colorTokensDark = {
  bg: {
    page: '#1C1C1E',
    surface: 'rgba(255, 255, 255, 0.06)',
    subtle: 'rgba(255, 255, 255, 0.12)',
    elevated: '#252527',
    toast: '#2A2A2C',
  },
  text: {
    primary: 'rgba(255, 255, 255, 0.88)',
    secondary: 'rgba(255, 255, 255, 0.64)',
    tertiary: 'rgba(255, 255, 255, 0.48)',
    disable: 'rgba(255, 255, 255, 0.24)',
    inverse: '#FFFFFF',
    link: '#2895E9',
  },
  border: {
    subtle: 'rgba(255, 255, 255, 0.12)',
    strong: 'rgba(255, 255, 255, 0.16)',
    focus: '#0478DD',
  },
  accent: {
    muted: 'rgba(4, 120, 221, 0.16)',
    primary: '#0478DD',
  },
  state: {
    success: '#30AD50',
    warning: '#DD8B0D',
    error: '#DD3F36',
    special: '#5B46DD',
    info: '#0478DD',
    primary: {
      success: '#30AD50',
      warning: '#DD8B0D',
      error: '#DD3F36',
      special: '#5B46DD',
      info: '#0478DD',
    },
    subtle: {
      success: '#1F3326',
      warning: '#3B2E1B',
      error: '#3B2222',
      special: '#26233D',
      info: '#182B3D',
      gray: '#2E2E30',
    },
  },
  action: {
    primary: {
      bg: {
        default: '#FFFFFF',
        subtle: 'rgba(255, 255, 255, 0.12)',
        strong: '#FFFFFF',
      },
      text: {
        default: '#FFFFFF',
        inverse: '#FFFFFF',
        reverse: 'rgba(0, 0, 0, 0.88)',
      },
      border: {
        default: '#FFFFFF',
      },
    },
    secondary: {
      default: 'rgba(255, 255, 255, 0.12)',
      text: '#FFFFFF',
    },
    destructive: {
      bg: {
        default: '#DD3F36',
        subtle: 'rgba(221, 63, 54, 0.08)',
        strong: '#EC6458',
      },
      text: {
        default: '#DD3F36',
        inverse: '#FFFFFF',
      },
      border: {
        default: '#DD3F36',
      },
    },
  },
  mask: {
    default: 'rgba(0, 0, 0, 0.48)',
    'white-start': '#1C1C1E',
    'white-end': 'rgba(28, 28, 30, 0)',
  },
  material: {
    start: '#2E2E30',
    end: '#404042',
    default: '#252527',
    highlight: '#404042',
  },
  shadow: {
    default: 'rgba(0, 0, 0, 0.24)',
    strong: 'rgba(0, 0, 0, 0.32)',
  },
  incognito: {
    bg: '#1C1C1E',
    primary: 'rgba(255, 255, 255, 0.88)',
    reverse: 'rgba(0, 0, 0, 0.88)',
    start: '#2E2E30',
    end: '#404042',
    disable: 'rgba(255, 255, 255, 0.24)',
    border: 'rgba(255, 255, 255, 0.16)',
  },
} as const;

export const colorTokens = {
  light: colorTokensLight,
  dark: colorTokensDark,
} as const;

export type ColorTokens = typeof colorTokensLight;
