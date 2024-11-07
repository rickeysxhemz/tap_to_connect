module.exports = {
  sharedOverride: {
    spacing: {
      px: '1px',
      0: '0px',
      1: '0.063rem',
      2: '0.125rem',
      3: '0.188rem',
      4: '0.25rem',
      5: '0.313rem',
      6: '0.375rem',
      8: '0.5rem',
      10: '0.625rem',
      12: '0.75rem',
      14: '0.875rem',
      16: '1rem',
      18: '1.125rem',
      20: '1.25rem',
      22: '1.375rem',
      24: '1.5rem',
      26: '1.625rem',
      28: '1.75rem',
      30: '1.875rem',
      32: '2rem',
      34: '2.125rem',
      36: '2.25rem',
      38: '2.375rem',
      40: '2.5rem',
      42: '2.625rem',
      44: '2.75rem',
      46: '2.875rem',
      48: '3rem',
      50: '3.125rem',
      52: '3.25rem',
      54: '3.375rem',
      56: '3.5rem',
      60: '3.75rem',
      64: '4rem',
      68: '4.25rem',
      70: '4.375rem',
      76: '4.75rem',
      80: '5rem',
      82: '5.125rem',
      84: '5.25rem',
      86: '5.375rem',
      90: '5.625rem',
      92: '5.75rem',
      96: '6rem',
      100: '6.25rem',
      110: '6.875rem',
      112: '7rem',
      120: '7.5rem',
      124: '7.75rem',
      128: '8rem',
      132: '8.25rem',
      140: '8.75rem',
      144: '9rem',
      160: '10rem',
      172: '10.75rem',
      176: '11rem',
      180: '11.25rem',
      184: '11.5rem',
      192: '12rem',
      200: '12.5rem',
      204: '12.75rem',
      208: '13rem',
      224: '14rem',
      240: '15rem',
      256: '16rem',
      264: '16.5rem',
      280: '17.5rem',
      288: '18rem',
      320: '20rem',
      350: '21.875rem',
      375: '23.438rem',
      384: '24rem',
      400: '25rem',
      440: '27.5rem',
      450: '28.125rem',
      500: '31.25rem',
      512: '32rem',
      580: '36.25rem',
      620: '38.75rem',
      640: '40rem',
      680: '42.5rem',
      720: '45rem',
      780: '48.75rem',
      850: '53.125rem',
      950: '59.375rem',
      1280: '80rem',
      '5vw': '5vw',
      '10vw': '10vw',
      'safe-area': 'env(safe-area-inset-bottom)',
      font: '1em',
      inherit: 'inherit',
    },
    colors: theme => ({
      transparent: 'transparent',
      inherit: 'inherit',
      current: 'currentColor',
      white: 'rgb(255 255 255)',
      black: 'rgb(0 0 0)',
      toast: 'rgb(50, 50, 50)',
      'slider-disabled': 'rgb(189, 189, 189)',
      hover: `rgb(var(--be-foreground-base) / ${theme('opacity.hover')})`,
      selected: `rgb(var(--be-foreground-base) / ${theme('opacity.selected')})`,
      focus: `rgb(var(--be-foreground-base) / ${theme('opacity.focus')})`,
      divider: `rgb(var(--be-foreground-base) / var(--be-divider-opacity))`,
      'disabled-bg':
        'rgb(var(--be-foreground-base) / var(--be-disabled-bg-opacity))',
      'disabled-fg':
        'rgb(var(--be-foreground-base) / var(--be-disabled-fg-opacity))',
      'primary-light': 'rgb(var(--be-primary-light) / <alpha-value>)',
      primary: 'rgb(var(--be-primary) / <alpha-value>)',
      'primary-dark': 'rgb(var(--be-primary-dark) / <alpha-value>)',
      'on-primary': 'rgb(var(--be-on-primary) / <alpha-value>)',
      'danger-lighter': '#fecaca',
      danger: '#ef4444',
      'danger-darker': '#991b1b',
      'positive-lighter': '#bbf7d0',
      positive: '#22c55e',
      'positive-darker': '#166534',
      warning: '#f3a432',
      google: '#d34836',
      facebook: '#3b5998',
      twitter: '#1da1f2',
      envato: '#6ca12b',
      tumblr: '#2b5a9f',
      background: 'rgb(var(--be-background) / <alpha-value>)',
      'background-alt': 'rgb(var(--be-background-alt) / <alpha-value>)',
      chip: 'rgb(var(--be-background-chip) / <alpha-value>)',
      paper: 'rgb(var(--be-paper) / <alpha-value>)',
      'fg-base': 'rgb(var(--be-foreground-base) / <alpha-value>)',
      'text-muted':
        'rgb(var(--be-foreground-base) / var(--be-text-muted-opacity))',
      'text-main':
        'rgb(var(--be-foreground-base) / var(--be-text-main-opacity))',
    }),
    borderColor: theme => ({
      ...theme('colors'),
      bg: theme('backgroundColor.DEFAULT'),
      'bg-alt': theme('backgroundColor.alt'),
      'text-muted': theme('textColor.muted'),
      DEFAULT: theme('colors.divider'),
    }),
    textColor: theme => ({
      ...theme('colors'),
      main: theme('colors.text-main'),
      muted: theme('colors.text-muted'),
      disabled: theme('colors.disabled-fg'),
      DEFAULT: theme('colors.text-main'),
    }),
    ringColor: theme => ({
      ...theme('colors'),
      DEFAULT: 'rgb(var(--be-primary) / <alpha-value>)',
    }),
    ringWidth: () => ({
      0: '0px',
      1: '1px',
      2: '2px',
      4: '4px',
      8: '8px',
      DEFAULT: '4px',
    }),
    backgroundColor: theme => ({
      ...theme('colors'),
      disabled: theme('colors.disabled-bg'),
      DEFAULT: 'rgb(var(--be-background) / <alpha-value>)',
      alt: 'rgb(var(--be-background-alt) / <alpha-value>)',
    }),
  },
  sharedExtend: {
    flex: {
      2: '2 1 0%',
      3: '3 1 0%',
    },
    outlineColor: {
      DEFAULT: 'rgb(var(--be-primary-lighter) / <alpha-value>)',
    },
    outlineWidth: {
      DEFAULT: 2,
    },
    height: {
      dialog: 'calc(var(--be-viewport-height, 100vh) * 0.9 - 2px)',
    },
    width: {
      dialog: 'calc(var(--be-viewport-width, 100vw) * 0.9 - 2px)',
    },
    minHeight: theme => ({
      ...theme('spacing'),
      dialog: 'calc(var(--be-viewport-height, 100vh) * 0.9)',
    }),
    minWidth: theme => ({
      ...theme('spacing'),
    }),
    maxWidth: theme => ({
      ...theme('spacing'),
      '4/5': '80%',
      dialog: ' calc(var(--be-viewport-width, 100vw) * 0.9)',
    }),
    maxHeight: theme => ({
      ...theme('spacing'),
      dialog: 'calc(var(--be-viewport-height, 100vh) * 0.9)',
      tray: 'calc(var(--be-viewport-height, 100vh) * 0.9)',
    }),
    zIndex: {
      toast: 160,
      tooltip: 150,
      'overlay-container': 140,
      popover: 130,
      tray: 120,
      modal: 110,
    },
    opacity: {
      2: '2%',
      4: '4%',
      6: '6%',
      8: '8%',
      12: '12%',
      26: '26%',
      15: '15%',
      87: '87%',
      selected: 'var(--be-selected-opacity)',
      hover: 'var(--be-hover-opacity)',
      focus: 'var(--be-focus-opacity)',
    },
    transitionProperty: {
      height: 'height',
      width: 'width',
      left: 'left',
      size: 'width, height',
      fill: 'fill',
      'transform-opacity': 'transform, opacity',
      'shadow-opacity': 'box-shadow, opacity',
      'bg-color': 'background-color',
      icon: 'transform, fill',
      button: 'background-color, box-shadow, border-color, color',
    },
    cursor: {
      'nwse-resize': 'nwse-resize',
      'nesw-resize': 'nesw-resize',
      'sw-resize': 'sw-resize',
      'se-resize': 'se-resize',
      inherit: 'inherit',
    },
    scale: {
      10: '.1',
    },
    backgroundPosition: {
      '1/2': '50%',
    },
  },
  sharedPlugins: plugin => {
    return [
      require('@tailwindcss/container-queries'),
      plugin(({addUtilities, addComponents}) => {
        addUtilities({
          // ICONS
          '.icon-2xs': {
            'font-size': '0.75rem',
          },
          '.icon-xs': {
            'font-size': '1rem',
          },
          '.icon-sm': {
            'font-size': '1.25rem',
          },
          '.icon-md': {
            'font-size': '1.5rem',
          },
          '.icon-lg': {
            'font-size': '2.1875rem',
          },
          '.icon-xl': {
            'font-size': '2.6875rem',
          },

          // UTILS
          '.no-tap-highlight': {
            '-webkit-tap-highlight-color': 'transparent',
          },
        });
        addComponents({
          '.svg-icon': {
            '@apply select-none inline-block fill-current flex-shrink-0 transition-icon':
              {},
          },
        });
      }),
    ];
  },
};
