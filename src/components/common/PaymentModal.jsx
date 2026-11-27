import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from './Modal';
import qrisImg from '../../assets/qris-lenny.jpg';
import {
  QrCode,
  Building2,
  Wallet,
  CheckCircle,
  Loader2,
  ShieldCheck,
  ArrowRight,
  Copy,
  Check,
  MessageCircle,
  Clock,
  Send,
  AlertCircle
} from 'lucide-react';

export const PaymentModal = ({ isOpen, onClose, packageItem }) => {
  const { simulatePayment, currentUser, showToast } = useApp();
  const [selectedMethod, setSelectedMethod] = useState('qris');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedKey, setCopiedKey] = useState('');

  // Confirmation Form state
  const [confirmData, setConfirmData] = useState({
    senderName: currentUser?.name || 'Ahmad Fauzi',
    sendTime: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB'
  });

  if (!packageItem) return null;

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast(`Berhasil menyalin ${text}`, 'success', 2000);
    setTimeout(() => setCopiedKey(''), 2000);
  };

  const getMethodLabel = (m) => {
    if (m === 'bri') return 'BRI';
    if (m === 'dana') return 'DANA';
    return 'QRIS';
  };

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      const methodName = selectedMethod === 'qris' ? 'QRIS (Lenny Agustin)' : selectedMethod === 'bri' ? 'Transfer Bank BRI' : 'E-Wallet DANA';
      simulatePayment(packageItem.id, methodName);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1500);
    }, 1200);
  };

  const handleSendWA = () => {
    const textMsg = `Halo Kak Lenny Agustin, saya sudah melakukan pembayaran untuk paket Tryout UMPTKIN.\n\nBerikut rincian konfirmasi saya:\nNama Peserta = ${confirmData.senderName}\nOrder Paket = ${packageItem.name} (Rp ${packageItem.price.toLocaleString('id-ID')})\nKirim ke = ${getMethodLabel(selectedMethod)}\nJam Terkirim = ${confirmData.sendTime}\n\nMohon dicek dan diverifikasi ya Kak. Terima kasih!`;
    const waUrl = `https://wa.me/6288247854631?text=${encodeURIComponent(textMsg)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Transaksi Pembayaran Paket UMPTKIN" maxWidth="max-w-xl">
      {isSuccess ? (
        <div className="py-8 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 animate-bounce">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Pembayaran Terverifikasi!</h3>
          <p className="text-sm text-slate-600 mb-4 max-w-sm">
            Paket <span className="font-semibold text-slate-800">{packageItem.name}</span> kini telah aktif dan dapat langsung Anda kerjakan.
          </p>
          <div className="inline-flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <ShieldCheck className="w-4 h-4" /> Transaksi Terverifikasi Demo
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Package Summary */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-100 flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-100/80 px-2 py-0.5 rounded">
                Detail Tagihan
              </span>
              <h4 className="font-extrabold text-slate-900 text-base mt-1">{packageItem.name}</h4>
              <p className="text-xs text-slate-600 mt-0.5">{packageItem.questionCount} Soal • Durasi {packageItem.durationMinutes} Menit</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500">Biaya Administrasi</span>
              <div className="text-xl font-black text-emerald-700 font-mono">
                Rp {packageItem.price.toLocaleString('id-ID')}
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
              Pilih Tujuan Pembayaran:
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedMethod('qris')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  selectedMethod === 'qris'
                    ? 'border-teal-600 bg-teal-50/70 text-teal-900 font-bold ring-2 ring-teal-500/20'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <QrCode className="w-5 h-5 mb-1 text-teal-600" />
                <span className="text-xs">QRIS</span>
                <span className="text-[10px] text-slate-400">Semua E-Wallet/Bank</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('bri')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  selectedMethod === 'bri'
                    ? 'border-teal-600 bg-teal-50/70 text-teal-900 font-bold ring-2 ring-teal-500/20'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Building2 className="w-5 h-5 mb-1 text-teal-600" />
                <span className="text-xs font-bold">Bank BRI</span>
                <span className="text-[10px] text-slate-400">Transfer Bank</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('dana')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  selectedMethod === 'dana'
                    ? 'border-teal-600 bg-teal-50/70 text-teal-900 font-bold ring-2 ring-teal-500/20'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Wallet className="w-5 h-5 mb-1 text-teal-600" />
                <span className="text-xs font-bold">DANA</span>
                <span className="text-[10px] text-slate-400">E-Wallet</span>
              </button>
            </div>
          </div>

          {/* Payment Method Details Box */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/90 space-y-3">
            {selectedMethod === 'qris' && (
              <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <div className="w-36 h-40 bg-white border border-slate-300 rounded-xl p-1.5 flex flex-col items-center justify-center shadow-xs shrink-0 overflow-hidden">
                  <img
                    src={qrisImg}
                    alt="QRIS Lenny Agustin"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-xs text-slate-600 space-y-1.5 flex-1">
                  <div className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700 uppercase">
                    Satu QRIS Untuk Semua
                  </div>
                  <p className="font-extrabold text-slate-900 text-sm">LENNY AGUSTIN</p>
                  <p className="text-[11px] text-slate-500">NMID: ID1025403090752 A01</p>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Bisa scan langsung menggunakan GoPay, OVO, ShopeePay, DANA, BCA Mobile, Livin Mandiri, BRImo, BSI Mobile, dll.
                  </p>
                </div>
              </div>
            )}

            {selectedMethod === 'bri' && (
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center py-2 px-3 bg-white rounded-lg border border-slate-200">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Nomor Rekening BRI:</span>
                    <span className="font-mono font-extrabold text-sm sm:text-base text-slate-900">
                      3628-0103-8429-530
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard('362801038429530', 'bri')}
                    className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-semibold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {copiedKey === 'bri' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'bri' ? 'Tersalin' : 'Salin'}</span>
                  </button>
                </div>
                <div className="flex justify-between items-center py-1 px-1">
                  <span className="text-slate-500">Atas Nama:</span>
                  <span className="font-bold text-slate-900">LENNY AGUSTIN</span>
                </div>
              </div>
            )}

            {selectedMethod === 'dana' && (
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center py-2 px-3 bg-white rounded-lg border border-slate-200">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Nomor Akun DANA:</span>
                    <span className="font-mono font-extrabold text-sm sm:text-base text-slate-900">
                      0882-4785-4631
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard('088247854631', 'dana')}
                    className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-semibold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {copiedKey === 'dana' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'dana' ? 'Tersalin' : 'Salin'}</span>
                  </button>
                </div>
                <div className="flex justify-between items-center py-1 px-1">
                  <span className="text-slate-500">Atas Nama:</span>
                  <span className="font-bold text-slate-900">LENNY AGUSTIN</span>
                </div>
              </div>
            )}
          </div>

          {/* Konfirmasi Pembayaran Sesuai Format User */}
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-3">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-emerald-700 shrink-0" />
              <h5 className="font-bold text-xs text-emerald-950 uppercase tracking-wide">
                Konfirmasi Pengiriman Bukti Transfer
              </h5>
            </div>
            
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Kirimkan bukti transaksi berisi foto/screenshot dengan menampilkan tanggal, jam, pengirim, penerima, serta nominal ke WhatsApp <strong>0882-4785-4631</strong>.
            </p>

            <div className="bg-white p-3 rounded-lg border border-emerald-200 text-xs font-mono space-y-1.5 text-slate-700">
              <p className="text-[10px] text-slate-400 uppercase font-sans font-bold">Format Konfirmasi:</p>
              <div className="flex items-center gap-1">
                <span className="text-slate-500 shrink-0">Nama Peserta =</span>
                <input
                  type="text"
                  value={confirmData.senderName}
                  onChange={(e) => setConfirmData(prev => ({ ...prev, senderName: e.target.value }))}
                  className="px-1.5 py-0.5 border border-slate-200 rounded text-xs font-sans w-full focus:outline-teal-600"
                />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-slate-500 shrink-0">Order Paket =</span>
                <span className="font-bold text-slate-900">{packageItem.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-slate-500 shrink-0">Kirim ke =</span>
                <span className="font-bold text-emerald-700">{getMethodLabel(selectedMethod)}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-slate-500 shrink-0">Jam Terkirim =</span>
                <input
                  type="text"
                  value={confirmData.sendTime}
                  onChange={(e) => setConfirmData(prev => ({ ...prev, sendTime: e.target.value }))}
                  className="px-1.5 py-0.5 border border-slate-200 rounded text-xs font-sans w-full focus:outline-teal-600"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleSendWA}
              className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Kirim Bukti Pembayaran ke WA (0882-4785-4631)</span>
            </button>
          </div>

          {/* Action Buttons: Demo instant simulate or cancel */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              disabled={isProcessing}
              className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 font-medium text-xs transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handlePay}
              disabled={isProcessing}
              className="flex-[2] px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-xs transition-all shadow-md shadow-teal-600/20 flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Memverifikasi...
                </>
              ) : (
                <>
                  <span>Simulasikan Langsung Aktifkan</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};
