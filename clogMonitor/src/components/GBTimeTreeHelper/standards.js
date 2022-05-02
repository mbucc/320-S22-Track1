/**
 * [BP] Color Palette.
 *
 * - Basically, the primary color should be the brand color.
 * - And the normal text color should be black.
 * - The secondary color should usually be gray 400 (or gray 300 if it should not attract users).
 */
const BPColors = {
  white: '#fdfefe',
  black: '#1A1920',

  /**
   * The brand color. Should be used as the primary color for the application.
   */
  brand: '#16a34a', // Temporarily set it to green 600.

  border: '#f2f2f3',
  transparent: 'transparent',

  gray: {
    30: '#fcfdfd',
    50: '#fafbfb',
    70: '#f7f8f8',
    100: '#f3f4f6',
    150: '#ebedf0',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },

  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },

  red: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },

  success: '#22c55e',
  successSecondary: '#86efac',
  successLight: '#f0fdf4',

  info: '#3b82f6',
  infoSecondary: '#bfdbfe',
  infoLight: '#eff6ff',

  warning: '#f59e0b',
  warningSecondary: '#fde68a',
  warningLight: '#fffbeb',

  error: '#ef4444',
  errorSecondary: '#fecaca',
  errorLight: '#fef2f2',
};

/**
 * [BP] Dimension Palette.
 *
 * - The most common use cases of dimension palette are the corner radius.
 * - Be sure to take the property you need rather than copy the value and paste it somewhere else.
 */
const BPDimens = {
  /**
   * The basic height standard of the text input field.
   */
  textInputHeight: 40,

  /**
   * The width of the border.
   * @type {number} - The unit is px.
   */
  borderWidth: 1,

  /**
   * A smaller radius using on input fields and inner box of an outer rounded box.
   */
  smallRadius: 6,

  /**
   * A larger radius using on cards, buttons, and other elements.
   */
  cornerRadius: 12,

  /**
   * A standard radius using on tree item entry.
   */
  treeRadius: '7px',

  /**
   * The height of the toolbar (where has "expand all", "collapse all", and "apply" buttons).
   */
  toolbarHeight: 58,

  letterSpacing: '0',
};

/**
 * [BP] Design Standard Palette.
 *
 * - The most common cases of using standards are borders and shadows.
 */
const BPStandards = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',

  /**
   * The border settings for inactive status.
   */
  border: `1px solid ${BPColors.border}`,

  /**
   * The border settings for active status.
   */
  borderFocus: `1px solid ${BPColors.brand}`,

  // Deprecated. To be removed.
  mapEntryTitle: {
    fontSize: 16,
    fontWeight: '500',
  },

  // Deprecated. To be removed.
  mapSubEntryTitle: {
    fontSize: 15,
    fontWeight: '400',
  },

  /**
   * The shadow setting for all elements that flow on the page.
   */
  shadow: '0px 20px 50px 0px rgba(0,0,0,0.10)',

  /**
   * A variant shadow setting for the context menu (in order to deliver a better visibility of the context menu).
   */
  menuShadow: '0px 16px 40px 0px rgba(0,0,0,0.10)',
};

export {
  BPColors,
  BPDimens,
  BPStandards,
};