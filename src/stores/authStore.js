/**
 * Auth Store - Zustand
 * Manages authentication state & role-based access
 */

import { create } from 'zustand';

// Mock users for development
const MOCK_USERS = {
  admin: {
    id: '1',
    nama: 'Budi Santoso, S.E.',
    nip: '198505012010011001',
    email: 'budi@bapenda.go.id',
    phone: '081234567890',
    role: 'admin_bidang',
    jabatan: 'Kabid Pendataan & Penetapan',
    wilayah: 'Kab. Banggai',
    foto: null,
  },
  lapangan: {
    id: '2',
    nama: 'Ahmad Fauzi',
    nip: '199003152015011001',
    email: 'ahmad@bapenda.go.id',
    phone: '081234567891',
    role: 'petugas_lapangan',
    jabatan: 'Petugas Pendataan',
    wilayah: 'Kec. Luwuk',
    foto: null,
  },
  kasir: {
    id: '3',
    nama: 'Sri Wahyuni, A.Md.',
    nip: '199205202018012001',
    email: 'sri@bapenda.go.id',
    phone: '081234567892',
    role: 'kasir',
    jabatan: 'Petugas Loket Pembayaran',
    wilayah: 'Kab. Banggai',
    foto: null,
  },
  wp: {
    id: '100',
    nama: 'CV Maju Bersama',
    npwpd: 'P2-01-000123-2024',
    nik: '7201031234560001',
    email: 'majubersama@gmail.com',
    phone: '081234567893',
    role: 'wajib_pajak',
    jenis_wp: 'badan',
    alamat: 'Jl. Yos Sudarso No. 45, Luwuk',
    foto: null,
  },
};

export const useAuthStore = create((set, get) => ({
  // State
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Actions
  login: async (username, password) => {
    set({ isLoading: true, error: null });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock login logic
      const mockUser = MOCK_USERS[username];
      if (mockUser && password === '123456') {
        set({
          user: mockUser,
          token: `mock-jwt-token-${mockUser.id}`,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        return { success: true, role: mockUser.role };
      } else {
        set({
          isLoading: false,
          error: 'Username atau password salah',
        });
        return { success: false };
      }
    } catch (err) {
      set({
        isLoading: false,
        error: 'Gagal terhubung ke server',
      });
      return { success: false };
    }
  },

  logout: () => {
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });
  },

  clearError: () => set({ error: null }),

  updateProfile: (updates) => {
    const { user } = get();
    if (user) {
      set({ user: { ...user, ...updates } });
    }
  },
}));

export default useAuthStore;
