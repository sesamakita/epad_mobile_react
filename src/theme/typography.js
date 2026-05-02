/**
 * e-PAD Typography System
 */

export const FontFamily = {
  regular: 'Nunito_400Regular',
  medium: 'Nunito_500Medium',
  semibold: 'Nunito_600SemiBold',
  bold: 'Nunito_700Bold',
  extrabold: 'Nunito_800ExtraBold',
};

export const FontSize = {
  xs: 11,
  sm: 13,
  base: 15,
  md: 17,
  lg: 20,
  xl: 24,
  '2xl': 30,
  '3xl': 36,
  '4xl': 48,
};

export const LineHeight = {
  xs: 16,
  sm: 18,
  base: 22,
  md: 24,
  lg: 28,
  xl: 32,
  '2xl': 38,
  '3xl': 44,
  '4xl': 56,
};

export const FontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
};

// Pre-composed text styles
export const TextStyles = {
  // Display
  displayLg: {
    fontFamily: FontFamily.extrabold,
    fontSize: FontSize['4xl'],
    lineHeight: LineHeight['4xl'],
    letterSpacing: -1.2,
  },
  displayMd: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize['3xl'],
    lineHeight: LineHeight['3xl'],
    letterSpacing: -0.8,
  },
  displaySm: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize['2xl'],
    lineHeight: LineHeight['2xl'],
    letterSpacing: -0.5,
  },

  // Headings
  h1: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.xl,
    lineHeight: LineHeight.xl,
    letterSpacing: -0.3,
  },
  h2: {
    fontFamily: FontFamily.semibold,
    fontSize: FontSize.lg,
    lineHeight: LineHeight.lg,
  },
  h3: {
    fontFamily: FontFamily.semibold,
    fontSize: FontSize.md,
    lineHeight: LineHeight.md,
  },

  // Body
  bodyLg: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.md,
    lineHeight: LineHeight.md,
  },
  body: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.base,
    lineHeight: LineHeight.base,
  },
  bodySm: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.sm,
    lineHeight: LineHeight.sm,
  },
  bodyXs: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.xs,
    lineHeight: LineHeight.xs,
  },

  // Labels
  labelLg: {
    fontFamily: FontFamily.semibold,
    fontSize: FontSize.base,
    lineHeight: LineHeight.base,
  },
  label: {
    fontFamily: FontFamily.semibold,
    fontSize: FontSize.sm,
    lineHeight: LineHeight.sm,
  },
  labelSm: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.xs,
    lineHeight: LineHeight.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Numeric (for currency/numbers)
  numericLg: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize['2xl'],
    lineHeight: LineHeight['2xl'],
    fontVariant: ['tabular-nums'],
  },
  numeric: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.lg,
    lineHeight: LineHeight.lg,
    fontVariant: ['tabular-nums'],
  },
  numericSm: {
    fontFamily: FontFamily.semibold,
    fontSize: FontSize.base,
    lineHeight: LineHeight.base,
    fontVariant: ['tabular-nums'],
  },
};

export default TextStyles;
