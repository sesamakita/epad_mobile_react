import React, { useState } from 'react';
import MobileLayout from '../../components/MobileLayout';
import { QrCode, Banknote, History, BarChart3, ScanLine, Wallet, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import KasirPembayaran from './KasirPembayaran';
import KasirRekap from './KasirRekap';
import { useAuthStore } from '../../store/authStore';

const KasirDashboard = () => {
  const [activeTab, setActiveTab] = useState('scan');
  const { user } = useAuthStore();

  const menuItems = [
    { id: 'scan', label: 'Scan', icon: <QrCode /> },
    { id: 'history', label: 'Transaksi', icon: <History /> },
    { id: 'recap', label: 'Rekap', icon: <BarChart3 /> },
    { id: 'set', label: 'Profil', icon: <Wallet /> },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'scan':
        return (
          <div className="space-y-8">
            <header className="mb-8 ml-1">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">Kasir Online</h2>
              <p className="text-sm font-bold text-slate-400">Pindai kode untuk memproses pembayaran</p>
            </header>

            {/* Scanner Mockup */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="aspect-square w-full max-w-[300px] mx-auto relative group"
            >
              <div className="absolute inset-0 bg-blue-600/5 rounded-[48px] animate-pulse" />
              <div className="absolute inset-0 border-2 border-dashed border-blue-200 rounded-[48px]" />
              <div className="absolute inset-12 bg-white rounded-[32px] shadow-2xl flex flex-col items-center justify-center border border-slate-50">
                <ScanLine size={80} className="text-blue-600 mb-4 animate-float" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Siap Memindai</p>
              </div>
              
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-blue-600 rounded-tl-[48px]" />
              <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-blue-600 rounded-tr-[48px]" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-blue-600 rounded-bl-[48px]" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-blue-600 rounded-br-[48px]" />
            </motion.div>

            <div className="space-y-4">
              <button className="w-full py-5 bg-blue-600 text-white rounded-[24px] font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 tap-highlight">
                <QrCode size={20} />
                AKTIFKAN KAMERA
              </button>
              <button className="w-full py-5 bg-white text-slate-900 border border-slate-200 rounded-[24px] font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 tap-highlight shadow-sm">
                <Banknote size={20} />
                INPUT KODE MANUAL
              </button>
            </div>

            <div className="glass-panel p-5 rounded-[32px] flex items-center gap-4 bg-emerald-50/50 border-emerald-100">
              <div className="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900 m-0">Sistem Terenkripsi</h4>
                <p className="text-[10px] font-bold text-slate-500 m-0 leading-tight">Seluruh transaksi diproses melalui jalur aman pemerintah daerah.</p>
              </div>
            </div>
          </div>
        );
      case 'history':
        return <KasirPembayaran />;
      case 'recap':
        return <KasirRekap />;
      default:
        return (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6 shadow-inner">
              <Wallet size={48} />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-1">{user.nama}</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-[2px] mb-8">{user.role}</p>
            <button className="w-full py-4 bg-rose-50 text-rose-500 rounded-2xl font-black text-xs uppercase tracking-widest border border-rose-100">
              KELUAR SISTEM
            </button>
          </div>
        );
    }
  };

  return (
    <MobileLayout activeTab={activeTab} onTabChange={setActiveTab} menuItems={menuItems} roleName="Loket Kasir" role="kasir">
      {renderContent()}
    </MobileLayout>
  );
};

export default KasirDashboard;

