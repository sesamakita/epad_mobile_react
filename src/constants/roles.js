/**
 * Role definitions & permissions for e-PAD
 */

export const ROLES = {
  ADMIN_BIDANG: 'admin_bidang',
  PETUGAS_LAPANGAN: 'petugas_lapangan',
  KASIR: 'kasir',
  WAJIB_PAJAK: 'wajib_pajak',
};

export const ROLE_LABELS = {
  [ROLES.ADMIN_BIDANG]: 'Admin Bidang',
  [ROLES.PETUGAS_LAPANGAN]: 'Petugas Lapangan',
  [ROLES.KASIR]: 'Kasir',
  [ROLES.WAJIB_PAJAK]: 'Wajib Pajak',
};

export const ROLE_ICONS = {
  [ROLES.ADMIN_BIDANG]: 'shield-checkmark',
  [ROLES.PETUGAS_LAPANGAN]: 'walk',
  [ROLES.KASIR]: 'card',
  [ROLES.WAJIB_PAJAK]: 'person',
};

export const ROLE_COLORS = {
  [ROLES.ADMIN_BIDANG]: '#1E40AF',
  [ROLES.PETUGAS_LAPANGAN]: '#059669',
  [ROLES.KASIR]: '#D97706',
  [ROLES.WAJIB_PAJAK]: '#0EA5E9',
};

export const ROLE_ROUTES = {
  [ROLES.ADMIN_BIDANG]: '/(admin)',
  [ROLES.PETUGAS_LAPANGAN]: '/(lapangan)',
  [ROLES.KASIR]: '/(kasir)',
  [ROLES.WAJIB_PAJAK]: '/(wp)',
};

export default ROLES;
