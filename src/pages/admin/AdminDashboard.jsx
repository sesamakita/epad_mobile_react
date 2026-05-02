import React, { useState } from 'react';
import MobileLayout from '../../components/MobileLayout';
import { mockStats, mockWajibPajak } from '../../data/mockData';
import { formatRupiah } from '../../utils/formatters';
import { LayoutDashboard, Users, FileText, Wallet, TrendingUp, Zap, Target, Search, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

import AdminPenetapan from './AdminPenetapan';
import AdminPiutang from './AdminPiutang';
import { useAuthStore } from '../../store/authStore';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const { user } = useAuthStore();

  const menuItems = [
    { id: 'home', label: 'Beranda', icon: <LayoutDashboard /> },
    { id: 'skpd', label: 'SKPD', icon: <FileText /> },
    { id: 'piutang', label: 'Piutang', icon: <Wallet /> },
    { id: 'wp', label: 'Wajib Pajak', icon: <Users /> },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'home':
        return (
          <div className="space-y-6">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="premium-card p-7 rounded-[32px] text-white relative overflow-hidden shadow-2xl"
            >
              <Zap size={100} className="absolute right-[-20px] bottom-[-20px] opacity-10 rotate-12" />
              <p className="text-[10px] font-black uppercase tracking-[2px] opacity-70 mb-1">Total Realisasi PAD</p>
              <h3 className="text-3xl font-black tracking-tight mb-4">{formatRupiah(mockStats.totalPAD)}</h3>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <TrendingUp size={14} className="text-emerald-300" />
                <span className="text-[11px] font-black">+12.5% Efektivitas</span>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-2 gap-4">
              <div 
                onClick={() => setActiveTab('skpd')}
                className="glass-panel p-5 rounded-[24px] tap-highlight cursor-pointer"
              >
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-3">
                  <Target size={22} />
                </div>
                <h4 className="text-xl font-black text-slate-900 leading-none mb-1">77.3%</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Target Tahunan</p>
              </div>
              <div 
                onClick={() => setActiveTab('wp')}
                className="glass-panel p-5 rounded-[24px] tap-highlight cursor-pointer"
              >
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-3">
                  <Users size={22} />
                </div>
                <h4 className="text-xl font-black text-slate-900 leading-none mb-1">1.2k</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Wajib Pajak</p>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-[32px] relative overflow-hidden bg-white/40">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Aktivitas Sistem</h3>
                <TrendingUp size={16} className="text-blue-500" />
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '77%' }}
                  className="h-full bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.4)]"
                />
              </div>
              <p className="text-[10px] font-bold text-slate-500 mt-2 text-center">Data sinkronisasi terakhir: Baru saja</p>
            </div>
          </div>
        );
      case 'skpd':
        return <AdminPenetapan />;
      case 'piutang':
        return <AdminPiutang />;
      case 'wp':
        return (
          <div className="glass-panel p-6 rounded-[32px]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-black text-slate-900 m-0 uppercase tracking-wider">Database Wajib Pajak</h3>
              <Search size={18} className="text-slate-400" />
            </div>
            <div className="space-y-4">
              {mockWajibPajak.map((wp, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between p-4 bg-white/50 rounded-2xl border border-slate-100 tap-highlight shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600 rounded-xl flex items-center justify-center font-black text-sm">
                      {wp.nama.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[13px] font-black text-slate-900 m-0">{wp.nama}</p>
                      <p className="text-[10px] font-bold text-slate-400 m-0 tracking-tight">{wp.npwpd}</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-300">
                    <ArrowRight size={14} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-300 mb-6">
              <FileText size={40} />
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-2 uppercase tracking-widest">Modul {activeTab}</h3>
            <p className="text-xs font-bold text-slate-400 leading-relaxed">Platform sedang dalam masa pemeliharaan terencana untuk modul ini.</p>
          </div>
        );
    }
  };

  return (
    <MobileLayout activeTab={activeTab} onTabChange={setActiveTab} menuItems={menuItems} roleName="Executive Admin" role="admin">
      {renderContent()}
    </MobileLayout>
  );
};


export default AdminDashboard;
