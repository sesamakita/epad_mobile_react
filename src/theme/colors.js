/**
 * e-PAD Color System
 * Government-grade color palette with modern aesthetics
 */

export const Colors = {
  // Primary - Deep Navy (Government / Trust)
  primary: {
    50: '#EEF2FF',
    100: '#D8E2FF',
    200: '#B3C7FF',
    300: '#7FA0FF',
    400: '#4A73FF',
    500: '#1E40AF', // Main
    600: '#1A3A9E',
    700: '#152E7D',
    800: '#10235C',
    900: '#0B183D',
  },

  // Accent - Emerald (Success / Money)
  accent: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#34D399',
    500: '#10B981', // Main
    600: '#059669',
    700: '#047857',
    800: '#065F46',
    900: '#064E3B',
  },

  // Warning - Amber
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B', // Main
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },

  // Danger - Rose
  danger: {
    50: '#FFF1F2',
    100: '#FFE4E6',
    200: '#FECDD3',
    300: '#FDA4AF',
    400: '#FB7185',
    500: '#F43F5E', // Main
    600: '#E11D48',
    700: '#BE123C',
    800: '#9F1239',
    900: '#881337',
  },

  // Info - Sky
  info: {
    50: '#F0F9FF',
    100: '#E0F2FE',
    200: '#BAE6FD',
    300: '#7DD3FC',
    400: '#38BDF8',
    500: '#0EA5E9', // Main
    600: '#0284C7',
    700: '#0369A1',
    800: '#075985',
    900: '#0C4A6E',
  },

  // Neutrals - Slate
  neutral: {
    0: '#FFFFFF',
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
    950: '#020617',
  },

  // Background
  background: {
    primary: '#F8FAFC',
    secondary: '#F1F5F9',
    card: '#FFFFFF',
    elevated: '#FFFFFF',
    overlay: 'rgba(15, 23, 42, 0.5)',
  },

  // Semantic
  text: {
    primary: '#0F172A',
    secondary: '#475569',
    tertiary: '#94A3B8',
    inverse: '#FFFFFF',
    link: '#1E40AF',
  },

  // Role Colors
  role: {
    kepala: '#7C3AED',    // Purple - Executive
    admin: '#1E40AF',     // Navy - Data Manager
    lapangan: '#059669',  // Green - Field
    kasir: '#D97706',     // Amber - Payment
    wp: '#0EA5E9',        // Sky - Taxpayer
  },

  // Pajak Type Colors
  pajak: {
    pbb: '#3B82F6',
    hotel: '#8B5CF6',
    restoran: '#F97316',
    hiburan: '#EC4899',
    reklame: '#14B8A6',
    parkir: '#6366F1',
    penerangan: '#EAB308',
    airTanah: '#06B6D4',
    mineral: '#78716C',
    bphtb: '#059669',
  },

  // Status Colors
  status: {
    lunas: '#10B981',
    belumBayar: '#F59E0B',
    jatuhTempo: '#F43F5E',
    sebagian: '#0EA5E9',
    pending: '#94A3B8',
    diproses: '#6366F1',
    ditolak: '#EF4444',
    diterima: '#22C55E',
  },

  // Gradients
  gradient: {
    primary: ['#1E40AF', '#3B82F6'],
    accent: ['#059669', '#34D399'],
    hero: ['#0F172A', '#1E3A5F', '#1E40AF'],
    card: ['#FFFFFF', '#F8FAFC'],
    gold: ['#F59E0B', '#FBBF24'],
    danger: ['#E11D48', '#FB7185'],
  },
};

export default Colors;
