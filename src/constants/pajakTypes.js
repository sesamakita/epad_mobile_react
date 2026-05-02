/**
 * Tax type definitions
 */

export const PAJAK_TYPES = {
  PBB: 'pbb',
  HOTEL: 'hotel',
  RESTORAN: 'restoran',
  HIBURAN: 'hiburan',
  REKLAME: 'reklame',
  PARKIR: 'parkir',
  PPJ: 'ppj',
  AIR_TANAH: 'air_tanah',
  MINERAL: 'mineral',
  BPHTB: 'bphtb',
};

export const PAJAK_LABELS = {
  [PAJAK_TYPES.PBB]: 'Pajak Bumi & Bangunan',
  [PAJAK_TYPES.HOTEL]: 'Pajak Hotel',
  [PAJAK_TYPES.RESTORAN]: 'Pajak Restoran',
  [PAJAK_TYPES.HIBURAN]: 'Pajak Hiburan',
  [PAJAK_TYPES.REKLAME]: 'Pajak Reklame',
  [PAJAK_TYPES.PARKIR]: 'Pajak Parkir',
  [PAJAK_TYPES.PPJ]: 'Pajak Penerangan Jalan',
  [PAJAK_TYPES.AIR_TANAH]: 'Pajak Air Tanah',
  [PAJAK_TYPES.MINERAL]: 'Pajak Mineral',
  [PAJAK_TYPES.BPHTB]: 'BPHTB',
};

export const PAJAK_ICONS = {
  [PAJAK_TYPES.PBB]: 'home',
  [PAJAK_TYPES.HOTEL]: 'bed',
  [PAJAK_TYPES.RESTORAN]: 'restaurant',
  [PAJAK_TYPES.HIBURAN]: 'musical-notes',
  [PAJAK_TYPES.REKLAME]: 'megaphone',
  [PAJAK_TYPES.PARKIR]: 'car',
  [PAJAK_TYPES.PPJ]: 'bulb',
  [PAJAK_TYPES.AIR_TANAH]: 'water',
  [PAJAK_TYPES.MINERAL]: 'diamond',
  [PAJAK_TYPES.BPHTB]: 'document-text',
};

export const STATUS_PEMBAYARAN = {
  BELUM_BAYAR: 'belum_bayar',
  LUNAS: 'lunas',
  SEBAGIAN: 'sebagian',
  JATUH_TEMPO: 'jatuh_tempo',
};

export const STATUS_LABELS = {
  [STATUS_PEMBAYARAN.BELUM_BAYAR]: 'Belum Bayar',
  [STATUS_PEMBAYARAN.LUNAS]: 'Lunas',
  [STATUS_PEMBAYARAN.SEBAGIAN]: 'Bayar Sebagian',
  [STATUS_PEMBAYARAN.JATUH_TEMPO]: 'Jatuh Tempo',
};

export default PAJAK_TYPES;
