import React from 'react';
import { mockStats } from '../../data/mockData';
import { formatRupiah } from '../../utils/formatters';
import { 
  BarChart3, TrendingUp, Wallet, Banknote, CreditCard, 
  ChevronRight, Activity, Target, Clock, ShieldCheck,
  Printer, FileText, Share2, Download, MessageSquare
} from 'lucide-react';
import { motion } from 'framer-motion';

const KasirRekap = () => {
  const dailyTotal = 128500000;
  const dailyTarget = 150000000;
  const progressPercent = Math.round((dailyTotal / dailyTarget) * 100);

  const breakdown = [
    { label: 'Pajak Restoran', amount: 48500000, count: 28, percent: 38, color: 'text-violet-500', bg: 'bg-violet-50' },
    { label: 'PBB-P2', amount: 45000000, count: 12, percent: 35, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Pajak Hotel', amount: 35000000, count: 5, percent: 27, color: 'text-blue-500', bg: 'bg-blue-50' },
  ];

  const hourlyData = [
    { hour: '08', val: 40 },
    { hour: '09', val: 65 },
    { hour: '10', val: 90 },
    { hour: '11', val: 75 },
    { hour: '12', val: 30 },
    { hour: '13', val: 85 },
    { hour: '14', val: 55 },
    { hour: '15', val: 45 },
  ];

  return (
    <div className="space-y-6">
      <header className="mb-8 ml-1 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">Rekap Harian</h2>
          <p className="text-sm font-bold text-slate-400">Ringkasan shift & penerimaan pajak</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
          <ShieldCheck size={14} className="text-emerald-500" />
          <span className="text-[10px] font-black text-emerald-600 uppercase">Synced</span>
        </div>
      </header>

      {/* Main Total Card */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="premium-card p-8 rounded-[40px] text-white relative overflow-hidden shadow-2xl"
      >
        <Activity size={120} className="absolute right-[-20px] bottom-[-20px] opacity-10 rotate-12" />
        
        <div className="relative z-10">
          <p className="text-[10px] font-bold uppercase tracking-[2px] opacity-70 mb-2">Total Penerimaan Hari Ini</p>
          <h3 className="text-4xl font-black tracking-tight mb-6">{formatRupiah(dailyTotal)}</h3>
          
          <div className="space-y-4">
            {/* Target Progress */}
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider opacity-60">Target Harian</span>
                <span className="text-[11px] font-black">{progressPercent}% dari {formatRupiah(dailyTarget)}</span>
              </div>
              <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-1 bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <p className="text-[8px] font-bold opacity-60 uppercase mb-1">Metode Tunai</p>
                <p className="text-sm font-black">{formatRupiah(85000000)}</p>
              </div>
              <div className="flex-1 bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <p className="text-[8px] font-bold opacity-60 uppercase mb-1">Transfer/QRIS</p>
                <p className="text-sm font-black">{formatRupiah(43500000)}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hourly Transaction Graph */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-panel p-6 rounded-[32px] border border-white"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">
              <Clock size={18} />
            </div>
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Volume Transaksi</h4>
          </div>
          <span className="text-[10px] font-black text-slate-400">Puncak: 10:00 WIB</span>
        </div>

        <div className="flex items-end justify-between h-24 gap-2">
          {hourlyData.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: `${d.val}%` }}
                transition={{ delay: 0.3 + (i * 0.05), duration: 0.8 }}
                className={`w-full max-w-[12px] rounded-full ${d.val > 70 ? 'bg-blue-500' : 'bg-blue-200'}`}
              />
              <span className="text-[8px] font-black text-slate-300">{d.hour}</span>
            </div>
          ))}
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
              <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center border border-slate-100`}>
                <Banknote size={22} />
              </div>
              <div>
                <h4 className="text-[13px] font-black text-slate-900 m-0">{item.label}</h4>
                <div className="flex items-center gap-2 mt-0.5">
                   <span className="text-[10px] font-bold text-slate-400 uppercase">{item.count} Transaksi</span>
                   <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${item.bg} ${item.color}`}>{item.percent}%</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-black text-slate-900 leading-none">{formatRupiah(item.amount)}</p>
              <div className="flex items-center justify-end gap-1 mt-1 text-emerald-500">
                <TrendingUp size={10} />
                <span className="text-[9px] font-black">STABIL</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Action Footer */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-panel p-6 rounded-[32px] border border-white space-y-4"
      >
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Opsi Laporan</h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="p-4 bg-slate-900 text-white rounded-2xl flex flex-col items-center gap-2 tap-highlight hover:bg-slate-800 transition-all">
            <Printer size={20} />
            <span className="text-[10px] font-black uppercase tracking-wider">Cetak Rekap</span>
          </button>
          <button className="p-4 bg-blue-50 text-blue-600 rounded-2xl flex flex-col items-center gap-2 border border-blue-100 tap-highlight hover:bg-blue-100 transition-all">
            <Download size={20} />
            <span className="text-[10px] font-black uppercase tracking-wider">Simpan PDF</span>
          </button>
        </div>
        <button className="w-full py-4 bg-emerald-50 text-emerald-600 rounded-2xl font-black text-xs uppercase tracking-widest border border-emerald-100 flex items-center justify-center gap-3 tap-highlight">
          <MessageSquare size={18} />
          Kirim ke WhatsApp (Pimpinan)
        </button>
      </motion.div>

      {/* Footer info */}
      <div className="text-center pb-6">
        <p className="text-[10px] font-bold text-slate-300">Terakhir diperbarui: Hari ini, 09:00 WIB</p>
      </div>
    </div>
  );
};

export default KasirRekap;
