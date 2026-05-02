/**
 * Currency & date formatting utilities
 */

/**
 * Format number to Indonesian Rupiah
 */
export const formatRupiah = (amount) => {
  if (amount == null || isNaN(amount)) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format number with thousand separator
 */
export const formatNumber = (num) => {
  if (num == null || isNaN(num)) return '0';
  return new Intl.NumberFormat('id-ID').format(num);
};

/**
 * Format compact number (1.5jt, 2.3M, etc.)
 */
export const formatCompact = (num) => {
  if (num == null || isNaN(num)) return '0';
  if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}M`;
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}jt`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}rb`;
  return num.toString();
};

/**
 * Format date to Indonesian locale
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

/**
 * Format date short (01 Jan 2025)
 */
export const formatDateShort = (dateStr) => {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

/**
 * Format relative time (2 hari lalu, etc.)
 */
export const formatRelativeTime = (dateStr) => {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Hari ini';
  if (diffDays === 1) return 'Kemarin';
  if (diffDays < 7) return `${diffDays} hari lalu`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} minggu lalu`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} bulan lalu`;
  return `${Math.floor(diffDays / 365)} tahun lalu`;
};

/**
 * Calculate days until due date
 */
export const daysUntilDue = (dueDateStr) => {
  if (!dueDateStr) return null;
  const dueDate = new Date(dueDateStr);
  const now = new Date();
  const diffMs = dueDate - now;
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
};

/**
 * Format percentage
 */
export const formatPercentage = (value, total) => {
  if (!total || total === 0) return '0%';
  return `${((value / total) * 100).toFixed(1)}%`;
};
