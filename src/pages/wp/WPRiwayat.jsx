import React from 'react';
import { mockPembayaran } from '../../data/mockData';
import { formatRupiah } from '../../utils/formatters';
import { CheckCircle2, Receipt, Calendar, ArrowUpRight, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const WPRiwayat = ({ userId }) => {
  const myHistory = mockPembayaran.filter(p => p.wpId === userId);

  if (myHistory.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
        <div className="w-24 h-24 bg-slate-50 rounded-[40px] flex items-center justify-center text-slate-300 mb-8 shadow-inner border border-slate-100">
          <Receipt size={48} />
        </div>
        <h3 className="text-xl font-black text-slate-900 mb-2">Belum Ada Riwayat</h3>
        <p className="text-sm font-bold text-slate-400 leading-relaxed max-w-[240px]">
          Sepertinya Anda belum melakukan pembayaran melalui platform ini.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="mb-8 ml-1">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">Riwayat Bayar</h2>
        <p className="text-sm font-bold text-slate-400">Arsip pembayaran pajak Anda yang telah terverifikasi</p>
      </header>

      {/* Search/Filter Bar */}
      <div className="glass-panel p-4 rounded-3xl mb-8 flex items-center gap-3 border border-white">
        <Search size={20} className="text-slate-400" />
        <input 
          type="text" 
          placeholder="Cari jenis pajak atau nomor SSPD..." 
          className="bg-transparent border-none text-sm font-bold text-slate-700 outline-none w-full placeholder:text-slate-300"
        />
      </div>

      <div className="space-y-4">
        {myHistory.map((payment, i) => (
          <motion.div
            key={payment.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-5 rounded-[28px] border border-white hover:border-blue-100 transition-colors tap-highlight shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center shadow-sm border border-emerald-100/50">
                <CheckCircle2 size={28} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h4 className="text-[13px] font-black text-slate-900 m-0 uppercase tracking-tight truncate">
                    {payment.jenisPajak}
                  </h4>
                  <ArrowUpRight size={16} className="text-slate-300 flex-shrink-0" />
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                  {payment.nomorSspd}
                </p>
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-50">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} className="text-slate-300" />
                    <span className="text-[10px] font-bold text-slate-500">
                      {new Date(payment.tanggalBayar).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <div className="text-right ml-auto">
                    <span className="text-[13px] font-black text-slate-900">
                      {formatRupiah(payment.jumlahBayar)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-blue-900/5 rounded-[32px] border border-blue-100/50 flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-900 text-white rounded-2xl flex items-center justify-center shadow-lg">
          <Receipt size={24} />
        </div>
        <div className="flex-1">
          <h5 className="text-[11px] font-black text-blue-900 uppercase tracking-wider m-0">E-Receipt Resmi</h5>
          <p className="text-[10px] font-bold text-blue-700 opacity-70 m-0">Seluruh bukti bayar sah secara hukum.</p>
        </div>
      </div>
    </div>
  );
};

export default WPRiwayat;
