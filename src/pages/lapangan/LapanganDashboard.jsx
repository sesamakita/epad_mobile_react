import React, { useState } from 'react';
import MobileLayout from '../../components/MobileLayout';
import { ClipboardList, MapPin, History, User, Search, Map, Bell, ArrowRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import LapanganPendataan from './LapanganPendataan';
import LapanganMap from './LapanganMap';
import LapanganProfile from './LapanganProfile';
import { useAuthStore } from '../../store/authStore';

const LapanganDashboard = () => {
  const [activeTab, setActiveTab] = useState('tugas');
  const { user } = useAuthStore();

  const menuItems = [
    { id: 'tugas', label: 'Tugas', icon: <ClipboardList /> },
    { id: 'data', label: 'Data', icon: <Zap /> },
    { id: 'map', label: 'Peta', icon: <Map /> },
    { id: 'profile', label: 'Profil', icon: <User /> },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'tugas':
        return (
          <div className="space-y-6">
            <header className="mb-8 ml-1">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">Tugas Hari Ini</h2>
              <p className="text-sm font-bold text-slate-400">Monitoring & verifikasi wilayah kerja</p>
            </header>

            {/* Search Bar */}
            <div className="glass-panel p-4 rounded-3xl mb-8 flex items-center gap-3 border border-white">
              <Search size={20} className="text-slate-400" />
              <input 
                type="text" 
                placeholder="Cari lokasi atau nama WP..." 
                className="bg-transparent border-none text-sm font-bold text-slate-700 outline-none w-full placeholder:text-slate-300"
              />
            </div>
            
            <div className="space-y-4">
              {[
                { title: 'Hotel Grand Mentari', loc: 'Zona 1 - Pusat Kota', urgency: 'Tinggi', time: '09:00' },
                { title: 'Resto Rasa Sayang', loc: 'Zona 2 - Pesisir', urgency: 'Normal', time: '13:30' },
              ].map((t, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-panel p-5 rounded-[32px] border border-white relative overflow-hidden tap-highlight shadow-sm"
                >
                  <div className={`absolute top-0 left-0 w-1.5 h-full ${t.urgency === 'Tinggi' ? 'bg-rose-500' : 'bg-blue-500'}`} />
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <h4 className="text-[13px] font-black text-slate-900 m-0">{t.title}</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{t.loc}</p>
                      </div>
                    </div>
                    <span className={`text-[9px] font-black px-2 py-1 rounded-full uppercase ${t.urgency === 'Tinggi' ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-600'}`}>
                      {t.urgency}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-2">
                      <Bell size={12} className="text-slate-300" />
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Deadline: {t.time} WIB</span>
                    </div>
                    <button className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest">
                      Detail Tugas <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      case 'data':
        return <LapanganPendataan />;
      case 'map':
        return <LapanganMap />;
      case 'profile':
        return <LapanganProfile />;
    }
  };

  return (
    <MobileLayout activeTab={activeTab} onTabChange={setActiveTab} menuItems={menuItems} roleName="Petugas Lapangan" role="lapangan">
      {renderContent()}
    </MobileLayout>
  );
};

export default LapanganDashboard;
