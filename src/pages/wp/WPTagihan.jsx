import React from 'react';
import { mockKetetapan } from '../../data/mockData';
import { formatRupiah } from '../../utils/formatters';
import { Calendar, AlertCircle, CheckCircle2, ChevronRight, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';

const WPTagihan = ({ userId }) => {
  const myBills = mockKetetapan.filter(k => k.wpId === userId && k.status === 'piutang');

  if (myBills.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
        <div className="w-24 h-24 bg-emerald-50 rounded-[40px] flex items-center justify-center text-emerald-500 mb-8 shadow-inner">
          <CheckCircle2 size={48} />
        </div>
        <h3 className="text-xl font-black text-slate-900 mb-2">Semua Lunas! 🎉</h3>
        <p className="text-sm font-bold text-slate-400 leading-relaxed max-w-[240px]">
          Luar biasa! Tidak ada tagihan pajak yang tertunggak saat ini.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="mb-8 ml-1">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">Tagihan Saya</h2>
        <p className="text-sm font-bold text-slate-400">Daftar kewajiban pajak yang belum terbayar</p>
      </header>

      <div className="space-y-4">
        {myBills.map((bill, i) => {
          const isOverdue = new Date(bill.jatuhTempo) < new Date();
          const total = bill.jumlahPajak + bill.denda;

          return (
            <motion.div
              key={bill.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel overflow-hidden rounded-[32px] border border-white shadow-xl shadow-slate-200/50"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 ${isOverdue ? 'bg-rose-50 text-rose-500' : 'bg-blue-50 text-blue-500'} rounded-2xl flex items-center justify-center shadow-sm border border-white`}>
                      <Wallet size={24} />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 leading-tight">{bill.jenisPajak}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{bill.masaPajak} {bill.tahunPajak}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1.5 rounded-full ${isOverdue ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'} text-[9px] font-black uppercase tracking-wider flex items-center gap-1.5`}>
                    <AlertCircle size={12} />
                    {isOverdue ? 'Jatuh Tempo' : 'Belum Bayar'}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Pokok Pajak</p>
                    <p className="text-xs font-black text-slate-700">{formatRupiah(bill.jumlahPajak)}</p>
                  </div>
                  <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Denda</p>
                    <p className={`text-xs font-black ${bill.denda > 0 ? 'text-rose-500' : 'text-slate-400'}`}>{formatRupiah(bill.denda)}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Total Bayar</p>
                    <p className="text-lg font-black text-blue-600 leading-none">{formatRupiah(total)}</p>
                  </div>
                  <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center gap-2 tap-highlight shadow-lg shadow-slate-900/20 hover:scale-[1.02] active:scale-[0.98] transition-transform">
                    Bayar
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Bottom bar for due date info */}
              <div className={`px-6 py-3 ${isOverdue ? 'bg-rose-500' : 'bg-slate-800'} flex items-center gap-2`}>
                <Calendar size={14} className="text-white/70" />
                <p className="text-[10px] font-bold text-white tracking-wide uppercase">
                  Batas Akhir: {new Date(bill.jatuhTempo).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default WPTagihan;
