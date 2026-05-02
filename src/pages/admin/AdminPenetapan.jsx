import React from 'react';
import { mockKetetapan, mockWajibPajak } from '../../data/mockData';
import { formatRupiah } from '../../utils/formatters';
import { FileText, Calendar, ChevronRight, Filter, Search, BadgeCheck, AlertCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminPenetapan = () => {
  // Join ketetapan with WP name
  const data = mockKetetapan.map(k => ({
    ...k,
    wpNama: mockWajibPajak.find(wp => wp.id === k.wpId)?.nama || 'Unknown WP'
  }));

  const getStatusStyle = (status) => {
    switch(status) {
      case 'lunas': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'piutang': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'jatuh_tempo': return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'lunas': return <BadgeCheck size={12} />;
      case 'piutang': return <Clock size={12} />;
      case 'jatuh_tempo': return <AlertCircle size={12} />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-end mb-8 ml-1">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">Penetapan Pajak</h2>
          <p className="text-sm font-bold text-slate-400">Daftar seluruh SKPD yang telah diterbitkan</p>
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
          placeholder="Cari Wajib Pajak atau nomor SKPD..." 
          className="bg-transparent border-none text-sm font-bold text-slate-700 outline-none w-full placeholder:text-slate-300"
        />
      </div>

      <div className="space-y-4">
        {data.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-panel overflow-hidden rounded-[32px] border border-white shadow-sm"
          >
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-black text-slate-900 leading-tight truncate max-w-[180px]">
                      {item.wpNama}
                    </h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                      {item.id} • {item.jenisPajak}
                    </p>
                  </div>
                </div>
                <div className={`px-2.5 py-1 rounded-full border ${getStatusStyle(item.status)} text-[9px] font-black uppercase tracking-wider flex items-center gap-1.5`}>
                  {getStatusIcon(item.status)}
                  {item.status === 'piutang' ? 'Belum Bayar' : item.status}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-slate-300" />
                  <span className="text-[10px] font-bold text-slate-500">
                    Masa: {item.masaPajak} {item.tahunPajak}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-slate-900">{formatRupiah(item.jumlahPajak)}</span>
                  <ChevronRight size={16} className="text-slate-300" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminPenetapan;
