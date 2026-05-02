import React from 'react';
import { mockKetetapan, mockWajibPajak } from '../../data/mockData';
import { formatRupiah } from '../../utils/formatters';
import { AlertCircle, TrendingUp, Users, Search, ArrowUpRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminPiutang = () => {
  const unpaidBills = mockKetetapan.filter(k => k.status === 'piutang' || k.status === 'jatuh_tempo');
  
  const totalPiutang = unpaidBills.reduce((acc, curr) => acc + curr.jumlahPajak + curr.denda, 0);
  const totalWP = new Set(unpaidBills.map(b => b.wpId)).size;

  return (
    <div className="space-y-6">
      <header className="mb-8 ml-1">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">Piutang Daerah</h2>
        <p className="text-sm font-bold text-slate-400">Monitoring tunggakan wajib pajak</p>
      </header>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="premium-card p-5 rounded-[32px] text-white relative overflow-hidden"
        >
          <TrendingUp size={60} className="absolute right-[-10px] bottom-[-10px] opacity-10" />
          <p className="text-[9px] font-bold uppercase tracking-wider opacity-70 mb-1">Total Piutang</p>
          <h3 className="text-lg font-black">{formatRupiah(totalPiutang)}</h3>
        </motion.div>
        <div className="glass-panel p-5 rounded-[32px] border border-white">
          <div className="w-10 h-10 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center mb-3">
            <Users size={20} />
          </div>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total WP</p>
          <h3 className="text-lg font-black text-slate-900">{totalWP} User</h3>
        </div>
      </div>

      {/* List Header */}
      <div className="flex justify-between items-center mb-4 ml-1">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Daftar Tunggakan</h3>
        <button className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">Urutkan Terlama</button>
      </div>

      <div className="space-y-4">
        {unpaidBills.map((bill, i) => {
          const wp = mockWajibPajak.find(w => w.id === bill.wpId);
          return (
            <motion.div
              key={bill.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-panel p-5 rounded-[28px] border border-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-1 h-full bg-rose-500" />
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center border border-rose-100">
                  <AlertCircle size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-[13px] font-black text-slate-900 m-0">{wp?.nama || 'Unknown'}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{bill.id} • {bill.jenisPajak}</p>
                    </div>
                    <ArrowUpRight size={16} className="text-slate-300" />
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-end">
                    <div className="flex items-center gap-1.5 text-rose-600">
                      <Clock size={12} />
                      <span className="text-[10px] font-black uppercase tracking-tight">Jatuh Tempo: {bill.jatuhTempo}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-slate-900 leading-none">{formatRupiah(bill.jumlahPajak + bill.denda)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminPiutang;
