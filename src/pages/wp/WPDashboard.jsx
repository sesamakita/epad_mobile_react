import React, { useState } from 'react';
import MobileLayout from '../../components/MobileLayout';
import { CreditCard, History, Bell, User, Zap, ShieldCheck, ArrowUpRight, QrCode } from 'lucide-react';
import { formatRupiah } from '../../utils/formatters';
import { motion } from 'framer-motion';

import WPTagihan from './WPTagihan';
import WPRiwayat from './WPRiwayat';
import WPProfile from './WPProfile';
import { useAuthStore } from '../../store/authStore';
import { mockKetetapan } from '../../data/mockData';

const WPDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const { user } = useAuthStore();

  const menuItems = [
    { id: 'home', label: 'Tagihan', icon: <CreditCard /> },
    { id: 'history', label: 'Riwayat', icon: <History /> },
    { id: 'notif', label: 'Info', icon: <Bell /> },
    { id: 'profile', label: 'Akun', icon: <User /> },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'home':
        return (
          <>
            {/* Hero Balance Card */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="premium-card p-7 rounded-[32px] text-white mb-8 relative"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[2px] opacity-70 mb-1">Total Kewajiban</p>
                  <h2 className="text-3xl font-black tracking-tight">{formatRupiah(2540000)}</h2>
                </div>
                <div className="bg-white/10 p-2.5 rounded-2xl backdrop-blur-md border border-white/10">
                  <ShieldCheck size={20} className="text-blue-200" />
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-white text-blue-900 py-3.5 rounded-2xl font-black text-xs flex items-center justify-center gap-2 tap-highlight shadow-xl">
                  <QrCode size={16} />
                  BAYAR QRIS
                </button>
                <button className="w-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center tap-highlight">
                  <ArrowUpRight size={20} />
                </button>
              </div>

              {/* Abstract shapes for premium feel */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-400/20 rounded-full blur-2xl" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl" />
            </motion.div>

            {/* Quick Actions */}
            <div className="mb-8">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-1">Layanan Cepat</h3>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: 'PBB', icon: <Zap />, color: 'bg-amber-50 text-amber-500' },
                  { label: 'Pajak Air', icon: <CreditCard />, color: 'bg-blue-50 text-blue-500' },
                  { label: 'Restoran', icon: <History />, color: 'bg-rose-50 text-rose-500' },
                  { label: 'Lainnya', icon: <User />, color: 'bg-slate-50 text-slate-500' },
                ].map((item, i) => (
                  <motion.button 
                    key={i}
                    whileHover={{ y: -5 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center shadow-sm border border-white tap-highlight`}>
                      {React.cloneElement(item.icon, { size: 22 })}
                    </div>
                    <span className="text-[10px] font-bold text-slate-600">{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Recent Activity Section */}
            <div>
              <div className="flex justify-between items-center mb-4 ml-1">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tagihan Terbaru</h3>
                <button 
                  onClick={() => setActiveTab('home')}
                  className="text-[10px] font-bold text-blue-600 uppercase tracking-wider"
                >
                  Lihat Semua
                </button>
              </div>
              <div className="space-y-3">
                {mockKetetapan.slice(0, 2).map((bill, i) => (
                  <div key={i} className="glass-panel p-4 rounded-2xl flex items-center gap-4 tap-highlight">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100">
                      <CreditCard size={20} className="text-slate-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[13px] font-black text-slate-900 m-0">{bill.jenisPajak}</h4>
                      <p className="text-[10px] text-slate-500 font-medium m-0">Jatuh Tempo: {bill.jatuhTempo}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-slate-900 m-0">{formatRupiah(bill.jumlahPajak)}</p>
                      <span className="text-[9px] font-bold text-amber-500 uppercase tracking-tighter bg-amber-50 px-2 py-0.5 rounded-full">Tertunda</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
      case 'history':
        return <WPRiwayat userId={user.id} />;
      case 'profile':
        return <WPProfile />;
      default:
        return (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-300 mb-6">
              <Bell size={40} />
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-2 uppercase tracking-widest">Informasi</h3>
            <p className="text-xs font-bold text-slate-400 leading-relaxed">Belum ada pengumuman atau pemberitahuan terbaru untuk Anda.</p>
          </div>
        );
    }
  };

  return (
    <MobileLayout activeTab={activeTab} onTabChange={setActiveTab} menuItems={menuItems} roleName="Wajib Pajak" role="wp">
      {renderContent()}
    </MobileLayout>
  );
};

export default WPDashboard;

