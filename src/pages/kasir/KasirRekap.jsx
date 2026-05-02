import React from 'react';
import { mockStats } from '../../data/mockData';
import { formatRupiah } from '../../utils/formatters';
import { BarChart3, TrendingUp, Wallet, Banknote, CreditCard, ChevronRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const KasirRekap = () => {
  // Simplified rekap for now based on mock stats
  const dailyTotal = 128500000;
  const breakdown = [
    { label: 'PBB-P2', amount: 45000000, count: 12 },
    { label: 'Pajak Hotel', amount: 35000000, count: 5 },
    { label: 'Pajak Restoran', amount: 48500000, count: 28 },
  ];

  return (
    <div className="space-y-6">
      <header className="mb-8 ml-1">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">Rekap Harian</h2>
        <p className="text-sm font-bold text-slate-400">Ringkasan penerimaan pajak hari ini</p>
      </header>

      {/* Main Total Card */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="premium-card p-8 rounded-[40px] text-white relative overflow-hidden shadow-2xl mb-8"
      >
        <Activity size={120} className="absolute right-[-20px] bottom-[-20px] opacity-10 rotate-12" />
        <p className="text-[10px] font-bold uppercase tracking-[2px] opacity-70 mb-2">Total Penerimaan Hari Ini</p>
        <h3 className="text-3xl font-black tracking-tight mb-6">{formatRupiah(dailyTotal)}</h3>
        
        <div className="flex gap-4">
          <div className="flex-1 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <p className="text-[9px] font-bold opacity-60 uppercase mb-1">Metode Tunai</p>
            <p className="text-sm font-black">{formatRupiah(85000000)}</p>
          </div>
          <div className="flex-1 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <p className="text-[9px] font-bold opacity-60 uppercase mb-1">Transfer/QRIS</p>
            <p className="text-sm font-black">{formatRupiah(43500000)}</p>
          </div>
        </div>
      </motion.div>

      {/* Breakdown Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-4 ml-1">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Detail per Jenis Pajak</h3>
          <BarChart3 size={16} className="text-slate-300" />
        </div>

        {breakdown.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-5 rounded-[28px] border border-white shadow-sm flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center border border-slate-100">
                <Banknote size={22} />
              </div>
              <div>
                <h4 className="text-[13px] font-black text-slate-900 m-0">{item.label}</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">{item.count} Transaksi</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-black text-slate-900 leading-none">{formatRupiah(item.amount)}</p>
              <div className="flex items-center justify-end gap-1 mt-1 text-emerald-500">
                <TrendingUp size={10} />
                <span className="text-[9px] font-black">NORMAL</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Action Footer */}
      <div className="pt-4">
        <button className="w-full py-5 bg-slate-900 text-white rounded-[24px] font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl tap-highlight">
          <CreditCard size={20} />
          CETAK LAPORAN REKAP
        </button>
      </div>
    </div>
  );
};

export default KasirRekap;
