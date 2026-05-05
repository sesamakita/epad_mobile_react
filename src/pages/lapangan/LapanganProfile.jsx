import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { 
  User, Mail, MapPin, Phone, Shield, Calendar, 
  CheckCircle, Clock, AlertTriangle, TrendingUp,
  ChevronRight, Moon, Bell, HelpCircle, FileText,
  Camera, Award, Target
} from 'lucide-react';

const LapanganProfile = () => {
  const { user, logout } = useAuthStore();
  const [darkMode, setDarkMode] = useState(false);
  const [notif, setNotif] = useState(true);

  // Extended profile data for petugas lapangan
  const profileData = {
    nama: user?.nama || 'Agus Hermawan',
    nip: '199203152018031004',
    email: user?.email || 'petugas@epad.go.id',
    phone: '0812-3456-7890',
    jabatan: 'Petugas Pendataan Lapangan',
    pangkat: 'Penata Muda / III-a',
    wilayah: user?.wilayah || 'Kecamatan Tengah',
    unitKerja: 'Bapenda Kota Bandung',
    masaKerja: '6 Tahun 2 Bulan',
    bergabung: '15 Maret 2020',
  };

  // Performance stats
  const stats = [
    { label: 'Total Survei', value: '248', icon: <CheckCircle size={18} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Bulan Ini', value: '32', icon: <Target size={18} />, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Tertunda', value: '5', icon: <Clock size={18} />, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Akurasi', value: '96%', icon: <TrendingUp size={18} />, color: 'text-violet-600', bg: 'bg-violet-50' },
  ];

  // Activity log
  const recentActivity = [
    { action: 'Survei Hotel Grand Mentari', time: '2 jam lalu', status: 'selesai' },
    { action: 'Pendataan Resto Rasa Sayang', time: '5 jam lalu', status: 'selesai' },
    { action: 'Verifikasi Caffe Kopi Senja', time: 'Kemarin', status: 'tertunda' },
    { action: 'Update data Wisma Bahagia', time: '2 hari lalu', status: 'selesai' },
  ];

  // Menu settings
  const settingsMenu = [
    { icon: <Bell size={20} />, label: 'Notifikasi', desc: 'Push notification tugas', toggle: true, value: notif, onChange: () => setNotif(!notif) },
    { icon: <Moon size={20} />, label: 'Mode Gelap', desc: 'Tema tampilan aplikasi', toggle: true, value: darkMode, onChange: () => setDarkMode(!darkMode) },
    { icon: <FileText size={20} />, label: 'Laporan Bulanan', desc: 'Unduh rekap aktivitas' },
    { icon: <HelpCircle size={20} />, label: 'Bantuan', desc: 'Panduan & FAQ' },
  ];

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
            <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-amber-400 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
              <Camera size={12} className="text-white" />
            </button>
          </div>

          {/* Info */}
          <div className="flex-1">
            <h2 className="text-lg font-black leading-tight mb-1">{profileData.nama}</h2>
            <p className="text-[11px] font-bold opacity-80 mb-2">{profileData.jabatan}</p>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              <Shield size={12} className="text-amber-300" />
              <span className="text-[10px] font-black uppercase tracking-wider">{profileData.pangkat}</span>
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
            { icon: <MapPin size={16} />, label: 'Wilayah Kerja', value: profileData.wilayah },
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

      {/* Recent Activity */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-panel p-6 rounded-[28px] border border-white"
      >
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-5">Aktivitas Terakhir</h3>
        <div className="space-y-3">
          {recentActivity.map((act, i) => (
            <div key={i} className="flex items-center gap-4 p-3 bg-white/50 rounded-2xl border border-slate-50">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-none ${
                act.status === 'selesai' ? 'bg-emerald-50 text-emerald-500' : 'bg-amber-50 text-amber-500'
              }`}>
                {act.status === 'selesai' ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-black text-slate-800 truncate">{act.action}</p>
                <p className="text-[10px] font-bold text-slate-400">{act.time}</p>
              </div>
              <span className={`text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-wider flex-none ${
                act.status === 'selesai' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
              }`}>
                {act.status}
              </span>
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
                  item.value ? 'bg-amber-500' : 'bg-slate-200'
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

export default LapanganProfile;
