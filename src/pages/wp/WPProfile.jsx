import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { 
  User, Mail, Phone, Shield, Calendar, Camera,
  CheckCircle, Clock, TrendingUp, Wallet,
  ChevronRight, Moon, Bell, HelpCircle, FileText,
  CreditCard, MapPin, MessageSquare, PhoneCall,
  ShieldCheck, Award, Info
} from 'lucide-react';

const WPProfile = () => {
  const { user, logout } = useAuthStore();
  const [darkMode, setDarkMode] = useState(false);
  const [notif, setNotif] = useState(true);

  // Extended profile data for WP
  const profileData = {
    nama: user?.nama || 'Hendra Wijaya',
    npwpd: user?.npwpd || 'P.1.0005678.02.01',
    email: user?.email || 'hendra@gmail.com',
    phone: '0812-3456-7890',
    alamat: 'Jl. Merdeka No. 123, Bandung',
    nik: '3273012345678901',
    statusWP: 'Aktif / Patuh',
    totalObjek: 3,
  };

  // Tax Objects
  const taxObjects = [
    { label: 'Hotel Grand Mentari', type: 'Pajak Hotel', loc: 'Pusat Kota' },
    { label: 'Resto Rasa Sayang', type: 'Pajak Restoran', loc: 'Pesisir' },
    { label: 'Wisma Bahagia', type: 'Pajak Hotel', loc: 'Zona 3' },
  ];

  const menuItems = [
    { icon: <FileText size={20} />, label: 'Dokumen Perpajakan', desc: 'SKPD, SSPD, & STPD' },
    { icon: <MapPin size={20} />, label: 'Objek Pajak Saya', desc: 'Kelola lokasi & aset pajak' },
    { icon: <ShieldCheck size={20} />, label: 'Kepatuhan Pajak', desc: 'Riwayat skor kepatuhan' },
    { icon: <HelpCircle size={20} />, label: 'Pusat Bantuan', desc: 'FAQ & Panduan Pembayaran' },
  ];

  return (
    <div className="space-y-6">
      {/* Digital NPWPD Card */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="premium-card p-7 rounded-[32px] text-white relative overflow-hidden shadow-2xl"
      >
        {/* Card Background Patterns */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-[-20px] right-[-20px] w-40 h-40 border-[3px] border-white rounded-full" />
          <div className="absolute bottom-[-30px] left-[-30px] w-52 h-52 border-[3px] border-white rounded-full" />
        </div>
        
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div className="flex justify-between items-start mb-10">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[2px] opacity-60">Digital Tax Card</p>
              <h2 className="text-xl font-black mt-1 uppercase tracking-tight">E-PAD BANDUNG</h2>
            </div>
            <Award size={24} className="text-amber-300" />
          </div>

          <div className="mb-6">
            <p className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-1">Nomor NPWPD</p>
            <p className="text-lg font-black tracking-[4px]">{profileData.npwpd}</p>
          </div>

          <div className="flex justify-between items-end">
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest opacity-60">Nama Wajib Pajak</p>
              <p className="text-sm font-black">{profileData.nama}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2">
              <ShieldCheck size={12} className="text-emerald-300" />
              <span className="text-[10px] font-black uppercase tracking-wider">Terverifikasi</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-panel p-5 rounded-[28px] border border-white shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 flex-none">
            <FileText size={22} />
          </div>
          <div>
            <h4 className="text-xl font-black text-slate-900 leading-none">{profileData.totalObjek}</h4>
            <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Objek Pajak</p>
          </div>
        </div>
        <div className="glass-panel p-5 rounded-[28px] border border-white shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 flex-none">
            <Award size={22} />
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-900 leading-none">Patuh</h4>
            <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Status Pajak</p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-panel p-6 rounded-[32px] border border-white"
      >
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-5">Detail Identitas</h3>
        <div className="space-y-4">
          {[
            { icon: <User size={16} />, label: 'NIK', value: profileData.nik },
            { icon: <Mail size={16} />, label: 'Email', value: profileData.email },
            { icon: <Phone size={16} />, label: 'Telepon', value: profileData.phone },
            { icon: <MapPin size={16} />, label: 'Alamat Korespondensi', value: profileData.alamat },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 flex-none mt-0.5">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{item.label}</p>
                <p className="text-[13px] font-black text-slate-800 leading-snug">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Tax Objects Management */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-panel p-6 rounded-[32px] border border-white"
      >
        <div className="flex justify-between items-center mb-5">
           <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Daftar Objek Pajak</h3>
           <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Kelola</span>
        </div>
        <div className="space-y-3">
          {taxObjects.map((obj, i) => (
            <div key={i} className="flex items-center gap-4 p-3 bg-white/50 rounded-2xl border border-slate-50">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 font-black text-xs">
                {obj.label.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-black text-slate-800 truncate">{obj.label}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{obj.type} • {obj.loc}</p>
              </div>
              <ChevronRight size={16} className="text-slate-300" />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Menu */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-panel p-6 rounded-[32px] border border-white space-y-2"
      >
        {menuItems.map((item, i) => (
          <div key={i} className="flex items-center gap-4 p-3 rounded-2xl tap-highlight cursor-pointer hover:bg-slate-50 transition-colors">
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500 flex-none">
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-black text-slate-800">{item.label}</p>
              <p className="text-[10px] font-bold text-slate-400">{item.desc}</p>
            </div>
            <ChevronRight size={18} className="text-slate-300 flex-none" />
          </div>
        ))}
      </motion.div>

      {/* Help Section */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-6 bg-slate-900 rounded-[32px] text-white flex flex-col items-center text-center shadow-xl"
      >
        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 border border-white/10">
          <MessageSquare size={32} className="text-blue-300" />
        </div>
        <h4 className="text-base font-black mb-1">Butuh Bantuan?</h4>
        <p className="text-xs font-bold opacity-60 leading-relaxed mb-6 px-4">
          Hubungi tim support Bapenda jika Anda mengalami kendala pembayaran.
        </p>
        <div className="flex gap-3 w-full">
           <button className="flex-1 py-3 bg-white/10 backdrop-blur-md rounded-xl font-black text-[10px] uppercase tracking-widest border border-white/10 flex items-center justify-center gap-2">
             <PhoneCall size={14} /> WhatsApp
           </button>
           <button className="flex-1 py-3 bg-white text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg">
             <Info size={14} /> Panduan
           </button>
        </div>
      </motion.div>

      {/* Logout Button */}
      <motion.button
        onClick={logout}
        className="w-full py-4 rounded-2xl bg-rose-50 text-rose-500 font-black text-sm uppercase tracking-widest border border-rose-100 tap-highlight active:scale-[0.98] transition-all"
      >
        Logout dari Aplikasi
      </motion.button>

      <p className="text-center text-[10px] font-bold text-slate-300 pb-4">e-PAD Mobile Wajib Pajak v1.0.0</p>
    </div>
  );
};

export default WPProfile;
