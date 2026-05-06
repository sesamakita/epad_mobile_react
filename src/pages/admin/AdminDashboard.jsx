import React, { useState } from 'react';
import MobileLayout from '../../components/MobileLayout';
import { mockStats, mockWajibPajak } from '../../data/mockData';
import { formatRupiah } from '../../utils/formatters';
import { 
  LayoutDashboard, Users, FileText, Wallet, TrendingUp, Zap, Target, Search, 
  ArrowRight, Shield, User, MapPin, CheckCircle, Clock 
} from 'lucide-react';
import { motion } from 'framer-motion';

import AdminPenetapan from './AdminPenetapan';
import AdminPiutang from './AdminPiutang';
import AdminProfile from './AdminProfile';
import { useAuthStore } from '../../store/authStore';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const { user } = useAuthStore();

  const menuItems = [
    { id: 'home', label: 'Beranda', icon: <LayoutDashboard /> },
    { id: 'skpd', label: 'SKPD', icon: <FileText /> },
    { id: 'piutang', label: 'Piutang', icon: <Wallet /> },
    { id: 'profile', label: 'Profil', icon: <User /> },
  ];

  // Personnel Mock Data
  const activePersonnel = [
    { name: 'Siti Aminah', role: 'Kasir', status: 'Online', loc: 'Loket 2', time: 'Active' },
    { name: 'Budi Santoso', role: 'Lapangan', status: 'Online', loc: 'Zona 1', time: 'Active' },
    { name: 'Andi Wijaya', role: 'Lapangan', status: 'Offline', loc: 'Zona 4', time: '2h ago' },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'home':
        return (
          <div className="space-y-6">
            <header className="mb-2 ml-1">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">Executive Hub</h2>
              <p className="text-sm font-bold text-slate-400">Monitoring sistem terintegrasi</p>
            </header>

            {/* Main Stats Card */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="premium-card p-7 rounded-[32px] text-white relative overflow-hidden shadow-2xl"
            >
              <Zap size={100} className="absolute right-[-20px] bottom-[-20px] opacity-10 rotate-12" />
              <p className="text-[10px] font-black uppercase tracking-[2px] opacity-70 mb-1">Total Realisasi PAD</p>
              <h3 className="text-3xl font-black tracking-tight mb-4">{formatRupiah(mockStats.totalPAD)}</h3>
              <div className="flex gap-2">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  <TrendingUp size={12} className="text-emerald-300" />
                  <span className="text-[10px] font-black">+12.5% vs Bln Lalu</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  <Target size={12} className="text-blue-300" />
                  <span className="text-[10px] font-black">77.3% Target</span>
                </div>
              </div>
            </motion.div>
            
            {/* Quick Actions Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div 
                onClick={() => setActiveTab('skpd')}
                className="glass-panel p-5 rounded-[24px] tap-highlight cursor-pointer border border-white shadow-sm"
              >
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-3">
                  <FileText size={22} />
                </div>
                <h4 className="text-xl font-black text-slate-900 leading-none mb-1">1.2k</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">SKPD Terbit</p>
              </div>
              <div 
                onClick={() => setActiveTab('piutang')}
                className="glass-panel p-5 rounded-[24px] tap-highlight cursor-pointer border border-white shadow-sm"
              >
                <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center mb-3">
                  <Wallet size={22} />
                </div>
                <h4 className="text-xl font-black text-slate-900 leading-none mb-1">240</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Piutang Aktif</p>
              </div>
            </div>

            {/* Monitoring Personel */}
            <div className="glass-panel p-6 rounded-[32px] border border-white shadow-sm">
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                    <Users size={18} />
                  </div>
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Monitoring Personel</h3>
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-50 px-2 py-1 rounded-lg">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[9px] font-black text-emerald-600 uppercase">Live</span>
                </div>
              </div>
              
              <div className="space-y-3">
                {activePersonnel.map((p, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white/50 rounded-2xl border border-slate-50">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 font-black text-xs">
                        {p.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-[12px] font-black text-slate-900 m-0 leading-tight">{p.name}</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{p.role} • {p.loc}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase ${
                        p.status === 'Online' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'
                      }`}>
                        {p.status}
                      </span>
                      <p className="text-[8px] font-bold text-slate-300 mt-0.5">{p.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Log Mini */}
            <div className="glass-panel p-6 rounded-[32px] relative overflow-hidden bg-white/40 border border-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Traffic Sinkronisasi</h3>
                <TrendingUp size={16} className="text-blue-500" />
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '84%' }}
                  transition={{ duration: 1 }}
                  className="h-full bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.4)]"
                />
              </div>
              <p className="text-[10px] font-bold text-slate-400 mt-3 text-center flex items-center justify-center gap-2">
                <CheckCircle size={10} className="text-emerald-500" />
                Semua layanan berjalan normal
              </p>
            </div>
          </div>
        );
      case 'skpd':
        return <AdminPenetapan />;
      case 'piutang':
        return <AdminPiutang />;
      case 'profile':
        return <AdminProfile />;
      default:
        return <AdminProfile />;
    }
  };

  return (
    <MobileLayout activeTab={activeTab} onTabChange={setActiveTab} menuItems={menuItems} roleName="Super Admin" role="admin">
      {renderContent()}
    </MobileLayout>
  );
};

export default AdminDashboard;
