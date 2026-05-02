import React from 'react';
import { mockPembayaran, mockWajibPajak } from '../../data/mockData';
import { formatRupiah } from '../../utils/formatters';
import { CheckCircle2, Search, Filter, Calendar, Receipt, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const KasirPembayaran = () => {
  // Join payment with WP name
  const data = mockPembayaran.map(p => ({
    ...p,
    wpNama: mockWajibPajak.find(wp => wp.id === p.wpId)?.nama || 'Unknown WP'
  }));

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
            className="glass-panel p-5 rounded-[28px] border border-white tap-highlight shadow-sm"
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
                  <p className="text-[13px] font-black text-slate-900 m-0">{formatRupiah(item.jumlahBayar)}</p>
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
