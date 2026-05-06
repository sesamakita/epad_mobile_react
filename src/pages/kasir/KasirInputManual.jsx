import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Search, Banknote, Building, Calendar, Clock, 
  AlertTriangle, CheckCircle, CreditCard, Wallet, Receipt,
  Shield, Printer, ChevronDown, ChevronUp, Hash
} from 'lucide-react';
import { formatRupiah } from '../../utils/formatters';
import { mockKetetapan, mockWajibPajak } from '../../data/mockData';

const KasirInputManual = ({ onBack }) => {
  const [kodeInput, setKodeInput] = useState('');
  const [step, setStep] = useState('input'); // input -> detail -> metode -> sukses
  const [selectedKetetapan, setSelectedKetetapan] = useState(null);
  const [selectedWP, setSelectedWP] = useState(null);
  const [metodeBayar, setMetodeBayar] = useState(null);

  // Simulate search by code
  const handleCari = () => {
    // Match with mock data - simulate finding a ketetapan
    const found = mockKetetapan.find(k => 
      k.id.toLowerCase() === kodeInput.toLowerCase() ||
      kodeInput.toLowerCase().includes(k.id.toLowerCase().slice(-3))
    );
    
    if (found) {
      const wp = mockWajibPajak.find(w => w.id === found.wpId);
      setSelectedKetetapan(found);
      setSelectedWP(wp);
      setStep('detail');
    } else if (kodeInput.length >= 3) {
      // Fallback: show first ketetapan as demo
      const fallback = mockKetetapan[0];
      const wp = mockWajibPajak.find(w => w.id === fallback.wpId);
      setSelectedKetetapan(fallback);
      setSelectedWP(wp);
      setStep('detail');
    }
  };

  const handlePilihMetode = (metode) => {
    setMetodeBayar(metode);
  };

  const handleProsesBayar = () => {
    setStep('sukses');
  };

  const handleSelesai = () => {
    setKodeInput('');
    setSelectedKetetapan(null);
    setSelectedWP(null);
    setMetodeBayar(null);
    setStep('input');
    onBack();
  };

  const handleKembaliInput = () => {
    setKodeInput('');
    setSelectedKetetapan(null);
    setSelectedWP(null);
    setMetodeBayar(null);
    setStep('input');
  };

  // Quick code buttons for demo
  const quickCodes = [
    { label: 'K001', desc: 'Pajak Restoran' },
    { label: 'K004', desc: 'Pajak Hotel' },
    { label: 'K006', desc: 'Pajak Restoran' },
  ];

  const metodeOptions = [
    { id: 'tunai', label: 'Tunai', icon: <Banknote size={24} />, desc: 'Pembayaran langsung di loket', color: 'emerald' },
    { id: 'transfer', label: 'Transfer Bank', icon: <CreditCard size={24} />, desc: 'Via rekening bank daerah', color: 'blue' },
    { id: 'qris', label: 'QRIS', icon: <Wallet size={24} />, desc: 'Scan kode QR pembayaran', color: 'violet' },
  ];

  return (
    <div className="space-y-5">
      {/* Back Header */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-3 mb-4"
      >
        <button 
          onClick={step === 'input' ? onBack : handleKembaliInput}
          className="w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center text-slate-600 tap-highlight border border-slate-100 hover:bg-slate-50 active:scale-95 transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-lg font-black text-slate-900 tracking-tight leading-tight">
            {step === 'input' && 'Input Kode Manual'}
            {step === 'detail' && 'Detail Tagihan'}
            {step === 'sukses' && 'Pembayaran Berhasil'}
          </h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {step === 'input' && 'Masukkan kode SKPD / Nomor Ketetapan'}
            {step === 'detail' && 'Verifikasi & proses pembayaran'}
            {step === 'sukses' && 'Transaksi telah tercatat'}
          </p>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {/* STEP 1: Input Code */}
        {step === 'input' && (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Input Field */}
            <div className="glass-panel p-6 rounded-[28px] border border-white">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <Hash size={20} />
                </div>
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Nomor Ketetapan / SKPD</h3>
              </div>
              
              <div className="flex gap-3">
                <input 
                  type="text" 
                  value={kodeInput}
                  onChange={(e) => setKodeInput(e.target.value.toUpperCase())}
                  placeholder="Contoh: K001"
                  className="flex-1 bg-white border-2 border-slate-100 rounded-2xl px-4 py-4 text-base font-black text-slate-900 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50 transition-all placeholder:text-slate-300 placeholder:font-bold tracking-widest text-center"
                />
                <button 
                  onClick={handleCari}
                  disabled={kodeInput.length < 2}
                  className={`px-5 rounded-2xl font-black text-sm flex items-center gap-2 transition-all ${
                    kodeInput.length >= 2 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 tap-highlight active:scale-95' 
                      : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                  }`}
                >
                  <Search size={18} />
                </button>
              </div>
            </div>

            {/* Quick Codes */}
            <div className="glass-panel p-5 rounded-[28px] border border-white">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Kode Cepat (Demo)</h4>
              <div className="grid grid-cols-3 gap-3">
                {quickCodes.map((code, i) => (
                  <button
                    key={i}
                    onClick={() => { setKodeInput(code.label); }}
                    className="p-3 bg-white/70 rounded-2xl border border-slate-100 text-center tap-highlight hover:bg-blue-50 hover:border-blue-200 active:scale-95 transition-all"
                  >
                    <p className="text-sm font-black text-slate-900 mb-0.5">{code.label}</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">{code.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="p-5 bg-slate-900 rounded-[28px] text-white flex items-start gap-4">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-none mt-0.5">
                <Shield size={20} />
              </div>
              <div>
                <h5 className="text-[11px] font-black uppercase tracking-wider mb-1">Panduan Input</h5>
                <p className="text-[10px] font-bold opacity-60 leading-relaxed">
                  Masukkan Nomor Ketetapan yang tertera pada SKPD/STPD/SPTPD yang dibawa oleh Wajib Pajak. Sistem akan otomatis menampilkan detail tagihan.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 2: Detail Tagihan + Metode Bayar */}
        {step === 'detail' && selectedKetetapan && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-5"
          >
            {/* WP Info Card */}
            <div className="premium-card p-6 rounded-[28px] text-white relative overflow-hidden shadow-2xl">
              <Building size={80} className="absolute right-[-10px] bottom-[-10px] opacity-10 rotate-12" />
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 text-2xl font-black flex-none">
                  {selectedWP?.nama?.charAt(0) || 'W'}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-black leading-tight mb-1">{selectedWP?.nama}</h3>
                  <p className="text-[10px] font-bold opacity-70">{selectedWP?.npwpd}</p>
                  <p className="text-[10px] font-bold opacity-50 mt-0.5">{selectedWP?.alamat}</p>
                </div>
              </div>
            </div>

            {/* Tagihan Detail */}
            <div className="glass-panel p-5 rounded-[28px] border border-white">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Detail Tagihan</h4>
              <div className="space-y-3">
                {[
                  { label: 'Nomor Ketetapan', value: selectedKetetapan.id },
                  { label: 'Jenis Pajak', value: selectedKetetapan.jenisPajak },
                  { label: 'Masa Pajak', value: `${selectedKetetapan.masaPajak} ${selectedKetetapan.tahunPajak}` },
                  { label: 'Jatuh Tempo', value: new Date(selectedKetetapan.jatuhTempo).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.label}</span>
                    <span className="text-[12px] font-black text-slate-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amount Breakdown */}
            <div className="glass-panel p-5 rounded-[28px] border border-white bg-amber-50/30">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Rincian Pembayaran</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-slate-600">Pokok Pajak</span>
                  <span className="text-[13px] font-black text-slate-900">{formatRupiah(selectedKetetapan.jumlahPajak)}</span>
                </div>
                {selectedKetetapan.denda > 0 && (
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-rose-500">Denda Keterlambatan</span>
                      <AlertTriangle size={12} className="text-rose-400" />
                    </div>
                    <span className="text-[13px] font-black text-rose-600">{formatRupiah(selectedKetetapan.denda)}</span>
                  </div>
                )}
                <div className="pt-3 border-t-2 border-dashed border-slate-200 flex justify-between items-center">
                  <span className="text-sm font-black text-slate-900 uppercase tracking-wider">Total Bayar</span>
                  <span className="text-xl font-black text-emerald-600">{formatRupiah(selectedKetetapan.jumlahPajak + selectedKetetapan.denda)}</span>
                </div>
              </div>
            </div>

            {/* Metode Pembayaran */}
            <div className="glass-panel p-5 rounded-[28px] border border-white">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Metode Pembayaran</h4>
              <div className="space-y-3">
                {metodeOptions.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => handlePilihMetode(m.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl tap-highlight transition-all text-left ${
                      metodeBayar === m.id 
                        ? `bg-${m.color}-50 border-2 border-${m.color}-300 shadow-md` 
                        : 'bg-white/50 border-2 border-transparent hover:bg-slate-50'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-none ${
                      metodeBayar === m.id 
                        ? `bg-${m.color}-100 text-${m.color}-600` 
                        : 'bg-slate-50 text-slate-400'
                    }`}>
                      {m.icon}
                    </div>
                    <div className="flex-1">
                      <p className={`text-[13px] font-black ${metodeBayar === m.id ? 'text-slate-900' : 'text-slate-700'}`}>{m.label}</p>
                      <p className="text-[10px] font-bold text-slate-400">{m.desc}</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      metodeBayar === m.id 
                        ? 'border-emerald-500 bg-emerald-500' 
                        : 'border-slate-200'
                    }`}>
                      {metodeBayar === m.id && <CheckCircle size={14} className="text-white" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Proses Button */}
            <button
              onClick={handleProsesBayar}
              disabled={!metodeBayar}
              className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${
                metodeBayar 
                  ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-600/20 tap-highlight active:scale-[0.98]' 
                  : 'bg-slate-100 text-slate-300 cursor-not-allowed'
              }`}
            >
              <Receipt size={20} />
              PROSES PEMBAYARAN
            </button>
          </motion.div>
        )}

        {/* STEP 3: Sukses */}
        {step === 'sukses' && (
          <motion.div
            key="sukses"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* Success Animation */}
            <div className="flex flex-col items-center py-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/10"
              >
                <CheckCircle size={48} className="text-emerald-500" />
              </motion.div>
              <motion.h3 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl font-black text-slate-900 mb-2 text-center"
              >
                Pembayaran Berhasil!
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-[11px] font-bold text-slate-400 text-center"
              >
                Transaksi telah tercatat dalam sistem e-PAD
              </motion.p>
            </div>

            {/* Receipt Summary */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-panel p-6 rounded-[28px] border border-white relative overflow-hidden"
            >
              {/* Decorative receipt dots */}
              <div className="absolute top-0 left-0 right-0 flex justify-between px-2">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-[#f8fafc] rounded-full -mt-1" />
                ))}
              </div>

              <div className="text-center mb-5 pt-2">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Bukti Pembayaran</p>
                <p className="text-[10px] font-bold text-slate-300 mt-1">SSPD-2026-{String(Math.floor(Math.random() * 9000) + 1000)}</p>
              </div>
              
              <div className="space-y-3 mb-5">
                <div className="flex justify-between py-2 border-b border-dashed border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400">Wajib Pajak</span>
                  <span className="text-[11px] font-black text-slate-800 text-right max-w-[180px] truncate">{selectedWP?.nama}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-dashed border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400">Jenis Pajak</span>
                  <span className="text-[11px] font-black text-slate-800">{selectedKetetapan?.jenisPajak}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-dashed border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400">Masa Pajak</span>
                  <span className="text-[11px] font-black text-slate-800">{selectedKetetapan?.masaPajak} {selectedKetetapan?.tahunPajak}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-dashed border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400">Metode</span>
                  <span className="text-[11px] font-black text-slate-800 capitalize">{metodeBayar}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-dashed border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400">Tanggal</span>
                  <span className="text-[11px] font-black text-slate-800">
                    {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <div className="flex justify-between py-3 bg-emerald-50 rounded-xl px-3 -mx-1">
                  <span className="text-xs font-black text-emerald-700 uppercase">Total Dibayar</span>
                  <span className="text-base font-black text-emerald-600">
                    {formatRupiah((selectedKetetapan?.jumlahPajak || 0) + (selectedKetetapan?.denda || 0))}
                  </span>
                </div>
              </div>

              {/* Decorative receipt dots bottom */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-[#f8fafc] rounded-full -mb-1" />
                ))}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-3 pb-4"
            >
              <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl tap-highlight active:scale-[0.98] transition-all">
                <Printer size={18} />
                Cetak Struk
              </button>
              <button
                onClick={handleSelesai}
                className="w-full py-4 bg-emerald-50 text-emerald-600 rounded-2xl font-black text-sm uppercase tracking-widest border border-emerald-100 tap-highlight hover:bg-emerald-100 active:scale-[0.98] transition-all"
              >
                Transaksi Baru
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default KasirInputManual;
