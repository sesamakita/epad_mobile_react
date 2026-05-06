import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, MapPin, Clock, Bell, Phone, Mail, Navigation, Camera,
  CheckCircle, AlertTriangle, FileText, Building, User, Calendar,
  Shield, ChevronDown, ChevronUp, Send, Image as ImageIcon
} from 'lucide-react';
import { formatRupiah } from '../../utils/formatters';

const LapanganDetailTugas = ({ tugas, onBack }) => {
  const [activeSection, setActiveSection] = useState(null);
  const [status, setStatus] = useState('belum');
  const [catatan, setCatatan] = useState('');
  const [fotoCount, setFotoCount] = useState(0);

  // Extended task detail data based on the task passed
  const detail = {
    'Hotel Grand Mentari': {
      npwpd: 'H.1.0005678.02.01',
      jenisPajak: 'Pajak Hotel',
      alamat: 'Jl. Pariwisata KM 5, Kel. Sukamaju, Kec. Tengah',
      pemilik: 'Hendra Wijaya',
      telepon: '0812-9876-5432',
      email: 'grandmentari@hotel.com',
      koordinat: '-6.9175, 107.6191',
      tunggakan: 8500000,
      masaPajak: 'April 2026',
      jatuhTempo: '10 Mei 2026',
      tujuanSurvei: 'Verifikasi operasional dan validasi omzet bulanan',
      riwayatKunjungan: '15 Maret 2026',
      kategoriBisnis: 'Hotel Bintang 3',
      jumlahKamar: 85,
      statusIzin: 'Aktif',
      checklist: [
        'Verifikasi jumlah kamar operasional',
        'Foto tampak depan bangunan',
        'Cek bukti laporan omzet bulanan',
        'Verifikasi izin usaha (TDUP)',
        'Wawancara penanggung jawab',
      ]
    },
    'Resto Rasa Sayang': {
      npwpd: 'R.1.0009999.01.01',
      jenisPajak: 'Pajak Restoran',
      alamat: 'Pasar Seni Blok A No. 12, Kel. Merdeka, Kec. Pesisir',
      pemilik: 'Sari Dewi',
      telepon: '0856-1234-5678',
      email: 'rasasayang@resto.com',
      koordinat: '-6.9210, 107.6100',
      tunggakan: 2100000,
      masaPajak: 'April 2026',
      jatuhTempo: '10 Mei 2026',
      tujuanSurvei: 'Pendataan ulang dan verifikasi kapasitas tempat duduk',
      riwayatKunjungan: '22 Februari 2026',
      kategoriBisnis: 'Restoran Kelas Menengah',
      jumlahKamar: null,
      statusIzin: 'Aktif',
      checklist: [
        'Verifikasi kapasitas tempat duduk',
        'Foto tampak depan & interior',
        'Cek struk/bukti transaksi harian',
        'Verifikasi izin usaha restoran',
        'Konfirmasi jam operasional',
      ]
    },
  };

  const d = detail[tugas.title] || detail['Hotel Grand Mentari'];

  const [checklistState, setChecklistState] = useState(
    d.checklist.map(() => false)
  );

  const toggleChecklist = (index) => {
    setChecklistState(prev => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const completedCount = checklistState.filter(Boolean).length;
  const totalChecklist = checklistState.length;
  const progressPercent = Math.round((completedCount / totalChecklist) * 100);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleSubmitLaporan = () => {
    setStatus('terkirim');
  };

  return (
    <div className="space-y-5">
      {/* Back Header */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-3 mb-4"
      >
        <button 
          onClick={onBack}
          className="w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center text-slate-600 tap-highlight border border-slate-100 hover:bg-slate-50 active:scale-95 transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-lg font-black text-slate-900 tracking-tight leading-tight">Detail Tugas</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{tugas.loc}</p>
        </div>
      </motion.div>

      {/* Main Info Card */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.05 }}
        className="premium-card p-6 rounded-[28px] text-white relative overflow-hidden shadow-2xl"
      >
        <Building size={90} className="absolute right-[-15px] bottom-[-15px] opacity-10 rotate-12" />
        <div className="flex items-start gap-4 mb-5">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 text-2xl font-black flex-none">
            {tugas.title.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-black leading-tight mb-1">{tugas.title}</h3>
            <p className="text-[10px] font-bold opacity-70 leading-relaxed">{d.alamat}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/15 backdrop-blur-md rounded-xl px-3 py-2.5 border border-white/10">
            <p className="text-[8px] font-black uppercase tracking-widest opacity-60 mb-0.5">Jenis Pajak</p>
            <p className="text-[11px] font-black">{d.jenisPajak}</p>
          </div>
          <div className="bg-white/15 backdrop-blur-md rounded-xl px-3 py-2.5 border border-white/10">
            <p className="text-[8px] font-black uppercase tracking-widest opacity-60 mb-0.5">Tunggakan</p>
            <p className="text-[11px] font-black">{formatRupiah(d.tunggakan)}</p>
          </div>
          <div className="bg-white/15 backdrop-blur-md rounded-xl px-3 py-2.5 border border-white/10">
            <p className="text-[8px] font-black uppercase tracking-widest opacity-60 mb-0.5">Masa Pajak</p>
            <p className="text-[11px] font-black">{d.masaPajak}</p>
          </div>
          <div className="bg-white/15 backdrop-blur-md rounded-xl px-3 py-2.5 border border-white/10">
            <p className="text-[8px] font-black uppercase tracking-widest opacity-60 mb-0.5">Jatuh Tempo</p>
            <p className="text-[11px] font-black">{d.jatuhTempo}</p>
          </div>
        </div>
      </motion.div>

      {/* Urgency & Deadline */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-3"
      >
        <div className={`flex-1 p-4 rounded-2xl flex items-center gap-3 border ${
          tugas.urgency === 'Tinggi' 
            ? 'bg-rose-50 border-rose-100' 
            : 'bg-blue-50 border-blue-100'
        }`}>
          <AlertTriangle size={18} className={tugas.urgency === 'Tinggi' ? 'text-rose-500' : 'text-blue-500'} />
          <div>
            <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Prioritas</p>
            <p className={`text-sm font-black ${tugas.urgency === 'Tinggi' ? 'text-rose-600' : 'text-blue-600'}`}>{tugas.urgency}</p>
          </div>
        </div>
        <div className="flex-1 p-4 bg-amber-50 rounded-2xl flex items-center gap-3 border border-amber-100">
          <Clock size={18} className="text-amber-500" />
          <div>
            <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Deadline</p>
            <p className="text-sm font-black text-amber-600">{tugas.time} WIB</p>
          </div>
        </div>
      </motion.div>

      {/* Tujuan Survei */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="glass-panel p-5 rounded-[24px] border border-white"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 bg-violet-50 rounded-xl flex items-center justify-center text-violet-500">
            <FileText size={18} />
          </div>
          <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Tujuan Survei</h4>
        </div>
        <p className="text-[12px] font-bold text-slate-600 leading-relaxed pl-12">{d.tujuanSurvei}</p>
      </motion.div>

      {/* Expandable Sections */}
      {/* Section: Kontak Wajib Pajak */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-panel rounded-[24px] border border-white overflow-hidden"
      >
        <button 
          onClick={() => toggleSection('kontak')}
          className="w-full flex items-center justify-between p-5 tap-highlight"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500">
              <User size={18} />
            </div>
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Kontak Wajib Pajak</h4>
          </div>
          {activeSection === 'kontak' ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
        </button>
        <AnimatePresence>
          {activeSection === 'kontak' && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 space-y-3">
                {[
                  { icon: <User size={14} />, label: 'Pemilik / PJ', value: d.pemilik },
                  { icon: <Phone size={14} />, label: 'Telepon', value: d.telepon },
                  { icon: <Mail size={14} />, label: 'Email', value: d.email },
                  { icon: <Shield size={14} />, label: 'NPWPD', value: d.npwpd },
                  { icon: <Building size={14} />, label: 'Kategori', value: d.kategoriBisnis },
                  { icon: <Calendar size={14} />, label: 'Kunjungan Terakhir', value: d.riwayatKunjungan },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 bg-white/50 rounded-xl">
                    <div className="w-7 h-7 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 flex-none">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
                      <p className="text-[11px] font-black text-slate-800 truncate">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Section: Lokasi GPS */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="glass-panel rounded-[24px] border border-white overflow-hidden"
      >
        <button 
          onClick={() => toggleSection('lokasi')}
          className="w-full flex items-center justify-between p-5 tap-highlight"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">
              <Navigation size={18} />
            </div>
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Lokasi GPS</h4>
          </div>
          {activeSection === 'lokasi' ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
        </button>
        <AnimatePresence>
          {activeSection === 'lokasi' && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5">
                <div className="bg-slate-100 rounded-2xl h-40 flex items-center justify-center mb-3 relative overflow-hidden">
                  <MapPin size={32} className="text-slate-300" />
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm">
                    <p className="text-[9px] font-black text-slate-600">{d.koordinat}</p>
                  </div>
                </div>
                <button className="w-full py-3 bg-blue-50 text-blue-600 rounded-xl text-[11px] font-black uppercase tracking-wider flex items-center justify-center gap-2 tap-highlight hover:bg-blue-100 transition-colors">
                  <Navigation size={14} />
                  Buka di Google Maps
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Checklist Tugas */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-panel p-5 rounded-[24px] border border-white"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500">
              <CheckCircle size={18} />
            </div>
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Checklist Survei</h4>
          </div>
          <span className="text-[10px] font-black text-slate-400">{completedCount}/{totalChecklist}</span>
        </div>

        {/* Progress Bar */}
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-4">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5 }}
            className={`h-full rounded-full ${
              progressPercent === 100 ? 'bg-emerald-500' : 'bg-amber-500'
            }`}
          />
        </div>

        <div className="space-y-2">
          {d.checklist.map((item, i) => (
            <button
              key={i}
              onClick={() => toggleChecklist(i)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl tap-highlight transition-all text-left ${
                checklistState[i] 
                  ? 'bg-emerald-50 border border-emerald-100' 
                  : 'bg-white/50 border border-slate-50 hover:bg-slate-50'
              }`}
            >
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-none transition-colors ${
                checklistState[i] 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-slate-100 text-slate-300'
              }`}>
                <CheckCircle size={14} />
              </div>
              <span className={`text-[11px] font-bold flex-1 ${
                checklistState[i] ? 'text-emerald-700 line-through' : 'text-slate-700'
              }`}>
                {item}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Upload Foto */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="glass-panel p-5 rounded-[24px] border border-white"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-500">
            <Camera size={18} />
          </div>
          <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Dokumentasi Foto</h4>
        </div>
        
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[...Array(3)].map((_, i) => (
            <button 
              key={i}
              onClick={() => setFotoCount(prev => prev < 3 ? prev + 1 : prev)}
              className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 tap-highlight transition-all ${
                i < fotoCount 
                  ? 'bg-indigo-100 border-2 border-indigo-300' 
                  : 'bg-slate-50 border-2 border-dashed border-slate-200 hover:border-slate-300'
              }`}
            >
              {i < fotoCount ? (
                <ImageIcon size={20} className="text-indigo-500" />
              ) : (
                <>
                  <Camera size={18} className="text-slate-300" />
                  <span className="text-[8px] font-black text-slate-300 uppercase">Ambil</span>
                </>
              )}
            </button>
          ))}
        </div>
        <p className="text-[10px] font-bold text-slate-400 text-center">{fotoCount}/3 foto terunggah</p>
      </motion.div>

      {/* Catatan */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-panel p-5 rounded-[24px] border border-white"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500">
            <FileText size={18} />
          </div>
          <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Catatan Lapangan</h4>
        </div>
        <textarea
          value={catatan}
          onChange={(e) => setCatatan(e.target.value)}
          placeholder="Tulis catatan hasil survei di sini..."
          rows={4}
          className="w-full bg-white/60 border border-slate-100 rounded-xl p-3 text-[12px] font-bold text-slate-700 outline-none resize-none focus:border-blue-200 focus:ring-2 focus:ring-blue-50 transition-all placeholder:text-slate-300"
        />
      </motion.div>

      {/* Submit Button */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="space-y-3 pb-4"
      >
        {status === 'terkirim' ? (
          <div className="w-full py-4 rounded-2xl bg-emerald-50 text-emerald-600 font-black text-sm uppercase tracking-widest border border-emerald-100 text-center flex items-center justify-center gap-2">
            <CheckCircle size={18} />
            Laporan Berhasil Dikirim
          </div>
        ) : (
          <button
            onClick={handleSubmitLaporan}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-black text-sm uppercase tracking-widest shadow-lg tap-highlight hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Send size={18} />
            Kirim Laporan Survei
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default LapanganDetailTugas;
