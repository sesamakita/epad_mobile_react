import React, { useState } from 'react';
import { mockPembayaran, mockWajibPajak } from '../../data/mockData';
import { formatRupiah, formatDate } from '../../utils/formatters';
import { 
  CheckCircle2, Search, Filter, Calendar, ChevronRight,
  ArrowLeft, Building, Receipt, CreditCard, Printer, 
  Share2, Download, Clock, Shield, Copy, CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const KasirPembayaran = () => {
  const [selected, setSelected] = useState(null);
  const [copied, setCopied] = useState(false);

  // Join payment with WP data
  const data = mockPembayaran.map(p => ({
    ...p,
    wpNama: mockWajibPajak.find(wp => wp.id === p.wpId)?.nama || 'Unknown WP',
    wpNpwpd: mockWajibPajak.find(wp => wp.id === p.wpId)?.npwpd || '-',
    wpAlamat: mockWajibPajak.find(wp => wp.id === p.wpId)?.alamat || '-',
  }));

  const handleCopySSPD = (nomor) => {
    navigator.clipboard?.writeText(nomor);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Detail View
  if (selected) {
    return (
      <div className="space-y-5">
        {/* Back Header */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 mb-4"
        >
          <button 
            onClick={() => setSelected(null)}
            className="w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center text-slate-600 tap-highlight border border-slate-100 hover:bg-slate-50 active:scale-95 transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight leading-tight">Detail Transaksi</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{selected.nomorSspd}</p>
          </div>
        </motion.div>

        {/* Status Banner */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center gap-4 p-5 bg-emerald-50 rounded-[24px] border border-emerald-100"
        >
          <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <CheckCircle2 size={28} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-0.5">Status Transaksi</p>
            <h3 className="text-lg font-black text-emerald-700">Pembayaran Berhasil</h3>
          </div>
        </motion.div>

        {/* Amount Card */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="premium-card p-6 rounded-[28px] text-white text-center relative overflow-hidden shadow-2xl"
        >
          <Receipt size={80} className="absolute right-[-10px] bottom-[-10px] opacity-10 rotate-12" />
          <p className="text-[10px] font-black uppercase tracking-[2px] opacity-70 mb-2">Jumlah Dibayar</p>
          <h2 className="text-3xl font-black tracking-tight">{formatRupiah(selected.jumlahBayar)}</h2>
        </motion.div>

        {/* SSPD Number - Copyable */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-4 rounded-2xl border border-white flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">
              <Receipt size={16} />
            </div>
            <div>
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Nomor SSPD</p>
              <p className="text-[13px] font-black text-slate-900 tracking-wider">{selected.nomorSspd}</p>
            </div>
          </div>
          <button 
            onClick={() => handleCopySSPD(selected.nomorSspd)}
            className="px-3 py-2 rounded-xl bg-slate-50 text-slate-500 tap-highlight hover:bg-blue-50 hover:text-blue-500 active:scale-95 transition-all"
          >
            {copied ? <CheckCircle size={16} className="text-emerald-500" /> : <Copy size={16} />}
          </button>
        </motion.div>

        {/* WP Info */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-panel p-5 rounded-[28px] border border-white"
        >
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Informasi Wajib Pajak</h4>
          <div className="space-y-3">
            {[
              { icon: <Building size={14} />, label: 'Nama WP', value: selected.wpNama },
              { icon: <Shield size={14} />, label: 'NPWPD', value: selected.wpNpwpd },
              { icon: <CreditCard size={14} />, label: 'Alamat', value: selected.wpAlamat },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 bg-white/50 rounded-xl">
                <div className="w-7 h-7 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 flex-none">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
                  <p className="text-[11px] font-black text-slate-800 truncate">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Transaction Detail */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-5 rounded-[28px] border border-white"
        >
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Detail Pembayaran</h4>
          <div className="space-y-3">
            {[
              { label: 'Jenis Pajak', value: selected.jenisPajak },
              { label: 'Tanggal Bayar', value: formatDate(selected.tanggalBayar) },
              { label: 'Metode Bayar', value: 'Tunai / Loket' },
              { label: 'Kasir', value: 'Siti Aminah' },
              { label: 'Loket', value: 'Loket 2 — Lantai 1' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.label}</span>
                <span className="text-[12px] font-black text-slate-900 text-right">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass-panel p-5 rounded-[28px] border border-white"
        >
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Status Proses</h4>
          <div className="space-y-0">
            {[
              { step: 'Pembayaran Diterima', time: selected.tanggalBayar, done: true },
              { step: 'Validasi Kasir', time: selected.tanggalBayar, done: true },
              { step: 'SSPD Diterbitkan', time: selected.tanggalBayar, done: true },
              { step: 'Sinkronisasi Sistem', time: selected.tanggalBayar, done: true },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                {/* Timeline Line */}
                <div className="flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-none ${
                    item.done ? 'bg-emerald-500' : 'bg-slate-200'
                  }`}>
                    <CheckCircle size={14} className={item.done ? 'text-white' : 'text-slate-400'} />
                  </div>
                  {i < 3 && <div className={`w-0.5 h-8 ${item.done ? 'bg-emerald-200' : 'bg-slate-100'}`} />}
                </div>
                {/* Content */}
                <div className="pb-6">
                  <p className={`text-[11px] font-black ${item.done ? 'text-slate-900' : 'text-slate-400'}`}>{item.step}</p>
                  <p className="text-[9px] font-bold text-slate-400 mt-0.5">
                    {new Date(item.time).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-3 pb-4"
        >
          <button className="py-4 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl tap-highlight active:scale-[0.98] transition-all">
            <Printer size={16} />
            Cetak Ulang
          </button>
          <button className="py-4 bg-blue-50 text-blue-600 rounded-2xl font-black text-[11px] uppercase tracking-wider border border-blue-100 flex items-center justify-center gap-2 tap-highlight active:scale-[0.98] transition-all">
            <Download size={16} />
            Unduh PDF
          </button>
        </motion.div>
      </div>
    );
  }

  // List View
  return (
    <div className="space-y-6">
      <header className="flex justify-between items-end mb-8 ml-1">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">Riwayat Bayar</h2>
          <p className="text-sm font-bold text-slate-400">Daftar transaksi yang berhasil diproses</p>
        </div>
        <button className="p-3 bg-white rounded-2xl border border-slate-100 shadow-sm text-slate-400 tap-highlight">
          <Filter size={20} />
        </button>
      </header>

      {/* Search Bar */}
      <div className="glass-panel p-4 rounded-3xl mb-8 flex items-center gap-3 border border-white">
        <Search size={20} className="text-slate-400" />
        <input 
          type="text" 
          placeholder="Cari SSPD atau Wajib Pajak..." 
          className="bg-transparent border-none text-sm font-bold text-slate-700 outline-none w-full placeholder:text-slate-300"
        />
      </div>

      <div className="space-y-4">
        {data.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setSelected(item)}
            className="glass-panel p-5 rounded-[28px] border border-white tap-highlight shadow-sm cursor-pointer hover:shadow-md active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center border border-emerald-100/50 shadow-inner">
                <CheckCircle2 size={28} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h4 className="text-[13px] font-black text-slate-900 m-0 truncate pr-2">{item.wpNama}</h4>
                  <span className="bg-emerald-100 text-emerald-600 text-[9px] font-black px-2 py-0.5 rounded-full uppercase">Berhasil</span>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                  {item.nomorSspd} • {item.jenisPajak}
                </p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-50">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} className="text-slate-300" />
                    <span className="text-[10px] font-bold text-slate-500">
                      {new Date(item.tanggalBayar).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] font-black text-slate-900 m-0">{formatRupiah(item.jumlahBayar)}</p>
                    <ChevronRight size={14} className="text-slate-300" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default KasirPembayaran;
