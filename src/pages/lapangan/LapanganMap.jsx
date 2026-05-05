import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Layers, Search } from 'lucide-react';

const LapanganMap = () => {
  // Center coordinates: Bandung
  const lat = -6.9175;
  const lng = 107.6191;
  
  // State for zoom offset (smaller value = more zoomed in)
  const [zoomDelta, setZoomDelta] = useState(0.03);

  const handleZoomIn = () => {
    setZoomDelta(prev => Math.max(prev / 1.5, 0.001));
  };

  const handleZoomOut = () => {
    setZoomDelta(prev => Math.min(prev * 1.5, 0.5));
  };

  const handleReset = () => {
    setZoomDelta(0.03);
  };

  // Generate dynamic bounding box based on zoomDelta
  const bbox = `${lng - zoomDelta},${lat - zoomDelta},${lng + zoomDelta},${lat + zoomDelta}`;
  const bandungMapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;

  return (
    <div className="h-full flex flex-col">
      <header className="mb-6 ml-1 flex-none">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">Peta Objek Pajak</h2>
        <p className="text-sm font-bold text-slate-400">Visualisasi sebaran OP di Kota Bandung</p>
      </header>

      {/* Map Container */}
      <div className="flex-1 relative rounded-[40px] overflow-hidden border-4 border-white shadow-2xl bg-slate-200 min-h-[400px]">
        <iframe 
          key={zoomDelta}
          title="Bandung Tax Map"
          width="100%" 
          height="100%" 
          frameBorder="0" 
          scrolling="no" 
          marginHeight="0" 
          marginWidth="0" 
          src={bandungMapUrl}
          className="absolute inset-0"
          style={{ filter: 'contrast(1.1) brightness(1.1)' }}
        />
        
        {/* Cover to hide native OSM zoom controls (top-right) */}
        <div className="absolute top-0 right-0 w-16 h-24 bg-gradient-to-l from-slate-100 via-slate-100/95 to-transparent z-[5] pointer-events-none" />
        
        {/* Search & Left Controls Container */}
        <div className="absolute top-4 left-4 right-4 z-10 flex flex-col gap-3 pointer-events-none">
          {/* Search Bar */}
          <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-white flex items-center gap-3 w-full pointer-events-auto">
            <Search size={18} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari koordinat atau wilayah..." 
              className="bg-transparent border-none text-xs font-black text-slate-700 outline-none w-full"
            />
          </div>
          
          {/* Zoom & Action Buttons Below Search */}
          <div className="flex flex-col gap-2 w-10 pointer-events-auto">
            <button 
              onClick={handleZoomIn}
              className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center text-slate-900 font-black text-xl tap-highlight border border-slate-100 hover:bg-slate-50 active:scale-95 transition-all"
            >
              +
            </button>
            <button 
              onClick={handleZoomOut}
              className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center text-slate-900 font-black text-xl tap-highlight border border-slate-100 hover:bg-slate-50 active:scale-95 transition-all"
            >
              -
            </button>
            
            <div className="h-1" /> {/* Spacer */}
            
            <button className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center text-slate-700 tap-highlight border border-slate-100 hover:bg-slate-50">
              <Layers size={20} />
            </button>
            <button 
              onClick={handleReset}
              className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center text-blue-600 tap-highlight border-2 border-blue-50 hover:bg-blue-50 active:scale-95 transition-all"
            >
              <Navigation size={20} />
            </button>
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
