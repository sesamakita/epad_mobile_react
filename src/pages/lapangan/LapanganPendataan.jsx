import React from 'react';
import { MapPin, Camera, FilePlus2, Search, Clock, ChevronRight, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

const LapanganPendataan = () => {
  const recentSurveys = [
    { id: 'S001', wp: 'Hotel Grand Mentari', date: '2026-05-01', status: 'terkirim', loc: '-6.2088, 106.8456' },
    { id: 'S002', wp: 'Restoran Rasa Sayang', date: '2026-04-28', status: 'pending', loc: '-6.2147, 106.8402' },
  ];

  return (
    <div className="space-y-6">
      <header className="mb-8 ml-1">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">Pendataan OP</h2>
        <p className="text-sm font-bold text-slate-400">Pencatatan objek pajak baru & verifikasi lapangan</p>
      </header>

      {/* Main Action Card */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="premium-card p-8 rounded-[40px] text-white relative overflow-hidden shadow-2xl mb-8 group cursor-pointer tap-highlight"
      >
        <Navigation size={120} className="absolute right-[-20px] bottom-[-20px] opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-700" />
        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mb-6 border border-white/20">
          <FilePlus2 size={32} />
        </div>
        <h3 className="text-xl font-black mb-2">Mulai Pendataan Baru</h3>
        <p className="text-xs font-bold opacity-70 leading-relaxed mb-6">
          Ambil foto objek pajak, koordinat GPS, dan lengkapi detail pendataan secara real-time.
        </p>
        <div className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase bg-white text-slate-900 px-4 py-2 rounded-full w-fit">
          <Camera size={14} />
          BUKA KAMERA & GPS
        </div>
      </motion.div>

      {/* Recent Work */}
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-4 ml-1">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Aktivitas Terakhir</h3>
          <button className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Lihat Semua</button>
        </div>

        {recentSurveys.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-5 rounded-[28px] border border-white shadow-sm flex items-center gap-4 tap-highlight"
          >
            <div className={`w-12 h-12 ${item.status === 'terkirim' ? 'bg-emerald-50 text-emerald-500' : 'bg-amber-50 text-amber-500'} rounded-2xl flex items-center justify-center border border-white shadow-inner`}>
              <MapPin size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-[13px] font-black text-slate-900 m-0 truncate pr-2">{item.wp}</h4>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1 text-slate-400">
                  <Clock size={10} />
                  <span className="text-[10px] font-bold uppercase tracking-tight">{item.date}</span>
                </div>
                <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase ${item.status === 'terkirim' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                  {item.status}
                </span>
              </div>
            </div>
            <ChevronRight size={18} className="text-slate-300" />
          </motion.div>
        ))}
      </div>

      {/* Quick Guide */}
      <div className="mt-8 p-6 bg-slate-900 rounded-[32px] text-white flex items-center gap-4">
        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
          <Camera size={24} />
        </div>
        <div>
          <h5 className="text-[11px] font-black uppercase tracking-wider m-0">Tips Lapangan</h5>
          <p className="text-[10px] font-bold opacity-60 m-0">Pastikan GPS aktif dan foto terlihat jelas.</p>
        </div>
      </div>
    </div>
  );
};

export default LapanganPendataan;
