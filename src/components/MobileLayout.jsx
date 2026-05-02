import React from 'react';
import { LogOut, Bell } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { motion } from 'framer-motion';

const MobileLayout = ({ children, activeTab, onTabChange, menuItems, roleName, role }) => {
  const { logout, user } = useAuthStore();

  const themeColors = {
    admin: 'from-indigo-600 to-indigo-800 text-indigo-400 border-indigo-700',
    kasir: 'from-emerald-600 to-emerald-800 text-emerald-400 border-emerald-700',
    lapangan: 'from-amber-600 to-amber-800 text-amber-400 border-amber-700',
    wp: 'from-blue-600 to-blue-800 text-blue-400 border-blue-700',
  };

  const currentTheme = themeColors[role] || themeColors.wp;

  return (
    <div className="flex justify-center h-screen bg-[#f1f5f9] overflow-hidden">
      <div className="w-full max-w-[450px] bg-[#f8fafc] h-screen flex flex-col relative shadow-2xl overflow-hidden">
        {/* Header Section */}
        <header className="flex-none p-5 flex justify-between items-center glass-panel z-[1000]">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${currentTheme.split(' ')[0]} ${currentTheme.split(' ')[1]} flex items-center justify-center text-white font-black text-lg shadow-lg border border-white/20`}>
              {user.nama.charAt(0)}
            </div>
            <div>
              <h2 className="text-sm font-black text-slate-900 m-0 leading-tight">{user.nama}</h2>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider m-0">{roleName}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2.5 bg-slate-100 rounded-xl text-slate-600 tap-highlight border border-white">
              <Bell size={20} />
            </button>
            <button 
              onClick={logout} 
              className="p-2.5 bg-rose-50 rounded-xl text-rose-500 tap-highlight border border-rose-100"
            >
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* Content Area - Independently Scrollable */}
        <motion.main 
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="flex-1 overflow-y-auto px-5 pt-6 pb-32 scrollbar-hide"
        >
          {children}
        </motion.main>

        {/* Clean Professional Navigation */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[450px] h-20 bg-white border-t border-slate-100 flex justify-around items-center px-4 z-[2000]">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button 
                key={item.id} 
                onClick={() => onTabChange(item.id)}
                className={`relative flex flex-col items-center gap-1 transition-colors duration-300 w-full h-full justify-center tap-highlight ${
                  isActive ? currentTheme.split(' ')[2] : 'text-slate-400'
                }`}
              >
                {/* Simple Top Indicator Line */}
                {isActive && (
                  <motion.div 
                    layoutId="nav-line"
                    className={`absolute top-0 w-12 h-1 bg-current rounded-b-full shadow-[0_2px_10px_rgba(0,0,0,0.1)]`}
                  />
                )}

                <div className="p-1">
                  {React.cloneElement(item.icon, { 
                    size: 24, 
                    strokeWidth: isActive ? 2.5 : 2 
                  })}
                </div>
                
                <span className={`text-[10px] font-black uppercase tracking-wider ${
                  isActive ? 'opacity-100' : 'opacity-60'
                }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};


export default MobileLayout;
