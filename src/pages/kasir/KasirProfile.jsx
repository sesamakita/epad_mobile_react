import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { formatRupiah } from '../../utils/formatters';
import { 
  User, Mail, Phone, Shield, Calendar, Camera,
  CheckCircle, Clock, TrendingUp, Banknote,
  ChevronRight, Moon, Bell, HelpCircle, FileText,
  Award, Printer, CreditCard, Wallet, BarChart3
} from 'lucide-react';

const KasirProfile = () => {
  const { user, logout } = useAuthStore();
  const [darkMode, setDarkMode] = useState(false);
  const [notif, setNotif] = useState(true);
  const [autoPrint, setAutoPrint] = useState(true);

  // Extended profile data for kasir
  const profileData = {
    nama: user?.nama || 'Siti Aminah',
    nip: '199105202019032001',
    email: user?.email || 'kasir@epad.go.id',
    phone: '0813-7654-3210',
    jabatan: 'Kasir Penerimaan Daerah',
    pangkat: 'Pengatur / II-c',
    unitKerja: 'Bapenda Kota Bandung',
    loket: 'Loket 2 — Lantai 1',
    masaKerja: '5 Tahun 8 Bulan',
    bergabung: '1 Oktober 2020',
    shift: 'Pagi (07:30 - 15:30 WIB)',
  };

  // Transaction stats
  const stats = [
    { label: 'Transaksi', value: '1.847', icon: <CreditCard size={18} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Hari Ini', value: '45', icon: <Banknote size={18} />, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Pending', value: '2', icon: <Clock size={18} />, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Akurasi', value: '99%', icon: <TrendingUp size={18} />, color: 'text-violet-600', bg: 'bg-violet-50' },
  ];

  // Today's shift summary
  const shiftSummary = {
    totalPenerimaan: 128500000,
    tunai: 85000000,
    transfer: 43500000,
    jumlahTransaksi: 45,
  };

  // Recent transaction log
  const recentTransactions = [
    { wp: 'PT. Maju Mundur Sejahtera', jenis: 'Pajak Restoran', amount: 1250000, time: '10 menit lalu', method: 'Tunai' },
    { wp: 'Hotel Grand Mentari', jenis: 'Pajak Hotel', amount: 8500000, time: '35 menit lalu', method: 'Transfer' },
    { wp: 'Caffe Kopi Senja', jenis: 'Pajak Restoran', amount: 750000, time: '1 jam lalu', method: 'QRIS' },
    { wp: 'Wisma Bahagia', jenis: 'Pajak Hotel', amount: 3200000, time: '2 jam lalu', method: 'Tunai' },
  ];

  // Settings menu
  const settingsMenu = [
    { icon: <Bell size={20} />, label: 'Notifikasi Transaksi', desc: 'Alert setiap pembayaran masuk', toggle: true, value: notif, onChange: () => setNotif(!notif) },
    { icon: <Printer size={20} />, label: 'Auto-Print Struk', desc: 'Cetak otomatis setelah bayar', toggle: true, value: autoPrint, onChange: () => setAutoPrint(!autoPrint) },
    { icon: <Moon size={20} />, label: 'Mode Gelap', desc: 'Tema tampilan aplikasi', toggle: true, value: darkMode, onChange: () => setDarkMode(!darkMode) },
    { icon: <BarChart3 size={20} />, label: 'Laporan Shift', desc: 'Unduh rekap penerimaan' },
    { icon: <HelpCircle size={20} />, label: 'Bantuan', desc: 'Panduan kasir & FAQ' },
  ];

  const getMethodColor = (method) => {
    switch(method) {
      case 'Tunai': return 'bg-emerald-50 text-emerald-600';
      case 'Transfer': return 'bg-blue-50 text-blue-600';
      case 'QRIS': return 'bg-violet-50 text-violet-600';
      default: return 'bg-slate-50 text-slate-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="premium-card p-7 rounded-[32px] text-white relative overflow-hidden shadow-2xl"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-[-20px] right-[-20px] w-40 h-40 border-[3px] border-white rounded-full" />
          <div className="absolute bottom-[-30px] left-[-30px] w-52 h-52 border-[3px] border-white rounded-full" />
        </div>

        <div className="relative flex items-center gap-5">
          {/* Avatar */}
          <div className="relative">
            <div className="w-20 h-20 rounded-[20px] bg-white/20 backdrop-blur-md border-2 border-white/30 flex items-center justify-center text-3xl font-black shadow-xl">
              {profileData.nama.charAt(0)}
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-400 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
              <Camera size={12} className="text-white" />
            </button>
          </div>

          {/* Info */}
          <div className="flex-1">
            <h2 className="text-lg font-black leading-tight mb-1">{profileData.nama}</h2>
            <p className="text-[11px] font-bold opacity-80 mb-2">{profileData.jabatan}</p>
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                <Shield size={11} className="text-emerald-300" />
                <span className="text-[9px] font-black uppercase tracking-wider">{profileData.pangkat}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Performance Stats */}
      <div className="grid grid-cols-4 gap-3">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-panel p-3 rounded-2xl text-center border border-white"
          >
            <div className={`w-9 h-9 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
              {stat.icon}
            </div>
            <h4 className="text-lg font-black text-slate-900 leading-none mb-0.5">{stat.value}</h4>
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-wider leading-tight">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Shift Summary */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="glass-panel p-5 rounded-[28px] border border-white bg-emerald-50/30"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
              <Wallet size={18} />
            </div>
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Ringkasan Shift</h4>
          </div>
          <span className="text-[9px] font-black text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full uppercase">Aktif</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/70 rounded-xl p-3 border border-emerald-100/50">
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Penerimaan</p>
            <p className="text-sm font-black text-slate-900">{formatRupiah(shiftSummary.totalPenerimaan)}</p>
          </div>
          <div className="bg-white/70 rounded-xl p-3 border border-emerald-100/50">
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Jumlah Transaksi</p>
            <p className="text-sm font-black text-slate-900">{shiftSummary.jumlahTransaksi} Transaksi</p>
          </div>
          <div className="bg-white/70 rounded-xl p-3 border border-emerald-100/50">
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Tunai</p>
            <p className="text-sm font-black text-emerald-600">{formatRupiah(shiftSummary.tunai)}</p>
          </div>
          <div className="bg-white/70 rounded-xl p-3 border border-emerald-100/50">
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Transfer/QRIS</p>
            <p className="text-sm font-black text-blue-600">{formatRupiah(shiftSummary.transfer)}</p>
          </div>
        </div>
      </motion.div>

      {/* Personal Information */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-panel p-6 rounded-[28px] border border-white"
      >
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-5">Informasi Pribadi</h3>
        <div className="space-y-4">
          {[
            { icon: <User size={16} />, label: 'NIP', value: profileData.nip },
            { icon: <Mail size={16} />, label: 'Email', value: profileData.email },
            { icon: <Phone size={16} />, label: 'Telepon', value: profileData.phone },
            { icon: <Wallet size={16} />, label: 'Loket', value: profileData.loket },
            { icon: <Clock size={16} />, label: 'Shift', value: profileData.shift },
            { icon: <Shield size={16} />, label: 'Unit Kerja', value: profileData.unitKerja },
            { icon: <Calendar size={16} />, label: 'Bergabung', value: profileData.bergabung },
            { icon: <Award size={16} />, label: 'Masa Kerja', value: profileData.masaKerja },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 flex-none">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{item.label}</p>
                <p className="text-[13px] font-black text-slate-800 truncate">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-panel p-6 rounded-[28px] border border-white"
      >
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-5">Transaksi Terakhir</h3>
        <div className="space-y-3">
          {recentTransactions.map((tx, i) => (
            <div key={i} className="flex items-center gap-4 p-3 bg-white/50 rounded-2xl border border-slate-50">
              <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500 flex-none">
                <CheckCircle size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-black text-slate-800 truncate">{tx.wp}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-[10px] font-bold text-slate-400">{tx.time}</p>
                  <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase ${getMethodColor(tx.method)}`}>
                    {tx.method}
                  </span>
                </div>
              </div>
              <p className="text-[11px] font-black text-slate-900 flex-none">{formatRupiah(tx.amount)}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Settings */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-panel p-6 rounded-[28px] border border-white"
      >
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-5">Pengaturan</h3>
        <div className="space-y-2">
          {settingsMenu.map((item, i) => (
            <div 
              key={i} 
              className="flex items-center gap-4 p-3 rounded-2xl tap-highlight cursor-pointer hover:bg-white/50 transition-colors"
              onClick={item.toggle ? item.onChange : undefined}
            >
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500 flex-none">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-black text-slate-800">{item.label}</p>
                <p className="text-[10px] font-bold text-slate-400">{item.desc}</p>
              </div>
              {item.toggle ? (
                <div className={`w-11 h-6 rounded-full relative transition-colors duration-300 flex-none ${
                  item.value ? 'bg-emerald-500' : 'bg-slate-200'
                }`}>
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                    item.value ? 'translate-x-[22px]' : 'translate-x-0.5'
                  }`} />
                </div>
              ) : (
                <ChevronRight size={18} className="text-slate-300 flex-none" />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Logout Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={logout}
        className="w-full py-4 rounded-2xl bg-rose-50 text-rose-500 font-black text-sm uppercase tracking-widest border border-rose-100 tap-highlight hover:bg-rose-100 active:scale-[0.98] transition-all"
      >
        Keluar dari Akun
      </motion.button>

      {/* App Version */}
      <p className="text-center text-[10px] font-bold text-slate-300 pb-4">e-PAD Mobile v1.0.0 — Bapenda</p>
    </div>
  );
};

export default KasirProfile;
