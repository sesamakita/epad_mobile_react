import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Layers, Search } from 'lucide-react';

const LapanganMap = () => {
  // Koordinat Bandung: -6.9175, 107.6191
  const bandungMapUrl = "https://www.openstreetmap.org/export/embed.html?bbox=107.55, -6.95, 107.68, -6.88&layer=mapnik&marker=-6.9175,107.6191";

  return (
    <div className="h-full flex flex-col">
      <header className="mb-6 ml-1 flex-none">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">Peta Objek Pajak</h2>
        <p className="text-sm font-bold text-slate-400">Visualisasi sebaran OP di Kota Bandung</p>
      </header>

      {/* Map Container */}
      <div className="flex-1 relative rounded-[40px] overflow-hidden border-4 border-white shadow-2xl bg-slate-200 min-h-[400px]">
        <iframe 
          title="Bandung Tax Map"
          width="100%" 
          height="100%" 
          frameBorder="0" 
          scrolling="no" 
          marginHeight="0" 
          marginWidth="0" 
          src={bandungMapUrl}
          style={{ filter: 'contrast(1.1) brightness(1.1)' }}
        />
        
        {/* Map Overlay Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center text-slate-700 tap-highlight">
            <Layers size={20} />
          </button>
          <button className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center text-blue-600 tap-highlight border-2 border-blue-50">
            <Navigation size={20} />
          </button>
        </div>

        {/* Search Overlay */}
        <div className="absolute top-4 left-4 right-16">
          <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-white flex items-center gap-3">
            <Search size={18} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari koordinat atau wilayah..." 
              className="bg-transparent border-none text-xs font-black text-slate-700 outline-none w-full"
            />
          </div>
        </div>

        {/* Legend Overlay */}
        <div className="absolute bottom-6 left-6 right-6">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass-panel p-4 rounded-3xl border border-white/50 flex items-center justify-between shadow-xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Lokasi Anda</p>
                <p className="text-xs font-black text-slate-800 leading-none">Kota Bandung, Jawa Barat</p>
              </div>
            </div>
            <div className="px-3 py-1 bg-emerald-500 text-white rounded-full text-[9px] font-black uppercase tracking-tighter">GPS Active</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LapanganMap;
