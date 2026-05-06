import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { 
  User, Shield, Settings, Bell, Moon, HelpCircle, 
  Database, Server, Activity, Users, FileText, 
  Download, Printer, LogOut, ChevronRight, HardDrive,
  Cpu, Globe, Camera, Lock
} from 'lucide-react';

const AdminProfile = () => {
  const { user, logout } = useAuthStore();
  const [darkMode, setDarkMode] = useState(false);
  const [maintenance, setMaintenance] = useState(false);

  // System Stats for Admin
  const systemHealth = [
    { label: 'Database Status', value: 'Sehat', icon: <Database size={18} />, color: 'text-emerald-500' },
    { label: 'Server Load', value: '12%', icon: <Cpu size={18} />, color: 'text-blue-500' },
    { label: 'Cloud Storage', value: '45 GB', icon: <HardDrive size={18} />, color: 'text-violet-500' },
    { label: 'API Uptime', value: '99.9%', icon: <Globe size={18} />, color: 'text-amber-500' },
  ];

  const adminMenu = [
    { icon: <Users size={20} />, label: 'Manajemen Pegawai', desc: 'Kelola akun Kasir & Lapangan' },
    { icon: <Lock size={20} />, label: 'Hak Akses (ACL)', desc: 'Atur izin modul aplikasi' },
    { icon: <Database size={20} />, label: 'Backup Data', desc: 'Ekspor database ke cloud' },
    { icon: <Activity size={20} />, label: 'Audit Log', desc: 'Rekam jejak aktivitas sistem' },
    { icon: <Server size={20} />, label: 'Konfigurasi Server', desc: 'Endpoint & Secret Keys' },
  ];

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="premium-card p-7 rounded-[32px] text-white relative overflow-hidden shadow-2xl"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-[-20px] left-[-20px] w-40 h-40 border-[3px] border-white rounded-full" />
          <div className="absolute bottom-[-30px] right-[-30px] w-52 h-52 border-[3px] border-white rounded-full" />
        </div>

        <div className="relative flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-[20px] bg-white/20 backdrop-blur-md border-2 border-white/30 flex items-center justify-center text-3xl font-black">
              {user?.nama?.charAt(0) || 'A'}
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
              <Shield size={12} />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-black leading-tight mb-1">{user?.nama || 'Super Admin'}</h2>
            <p className="text-[11px] font-bold opacity-80 mb-2">Executive System Administrator</p>
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/30 px-3 py-1 rounded-full border border-emerald-500/20">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-wider">Level 10 Access</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* System Health Grid */}
      <div className="grid grid-cols-2 gap-3">
        {systemHealth.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-4 rounded-2xl border border-white flex items-center gap-3"
          >
            <div className={`w-10 h-10 bg-slate-50 ${stat.color} rounded-xl flex items-center justify-center`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
              <p className="text-sm font-black text-slate-900">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Admin Operations */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-panel p-6 rounded-[32px] border border-white"
      >
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-5">Operasional Sistem</h3>
        <div className="space-y-2">
          {adminMenu.map((item, i) => (
            <div 
              key={i} 
              className="flex items-center gap-4 p-3 rounded-2xl tap-highlight cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500 flex-none">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-black text-slate-800">{item.label}</p>
                <p className="text-[10px] font-bold text-slate-400 truncate">{item.desc}</p>
              </div>
              <ChevronRight size={18} className="text-slate-300 flex-none" />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Global Toggles */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-panel p-6 rounded-[28px] border border-white space-y-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Moon size={18} className="text-slate-400" />
            <span className="text-sm font-black text-slate-700">Dark Mode Global</span>
          </div>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`w-11 h-6 rounded-full relative transition-colors duration-300 ${darkMode ? 'bg-blue-600' : 'bg-slate-200'}`}
          >
            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${darkMode ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Server size={18} className="text-rose-400" />
            <span className="text-sm font-black text-slate-700">Maintenance Mode</span>
          </div>
          <button 
            onClick={() => setMaintenance(!maintenance)}
            className={`w-11 h-6 rounded-full relative transition-colors duration-300 ${maintenance ? 'bg-rose-500' : 'bg-slate-200'}`}
          >
            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${maintenance ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
          </button>
        </div>
      </motion.div>

      {/* Action Footer */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-3 pb-6"
      >
        <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[12px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl">
          <Download size={18} />
          Unduh Laporan Konsolidasi
        </button>
        <button 
          onClick={logout}
          className="w-full py-4 bg-rose-50 text-rose-500 rounded-2xl font-black text-[12px] uppercase tracking-widest border border-rose-100 flex items-center justify-center gap-3"
        >
          <LogOut size={18} />
          Logout Sistem
        </button>
      </motion.div>
    </div>
  );
};

export default AdminProfile;
