import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from './Modal';
import { QrCode, Building2, Wallet, CheckCircle, Loader2, ShieldCheck, ArrowRight } from 'lucide-react';

export const PaymentModal = ({ isOpen, onClose, packageItem }) => {
  const { simulatePayment } = useApp();
  const [selectedMethod, setSelectedMethod] = useState('qris');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!packageItem) return null;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      const methodName = selectedMethod === 'qris' ? 'QRIS' : selectedMethod === 'bsi' ? 'Transfer Bank BSI' : selectedMethod === 'mandiri' ? 'Transfer Bank Mandiri' : 'E-Wallet GoPay';
      simulatePayment(packageItem.id, methodName);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1500);
    }, 1200);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Simulasi Pembayaran Paket Tryout" maxWidth="max-w-xl">
      {isSuccess ? (
        <div className="py-8 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 animate-bounce">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Pembayaran Sukses!</h3>
          <p className="text-sm text-slate-600 mb-4 max-w-sm">
            Paket <span className="font-semibold text-slate-800">{packageItem.name}</span> kini telah aktif dan dapat langsung Anda kerjakan.
          </p>
          <div className="inline-flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <ShieldCheck className="w-4 h-4" /> Transaksi Terverifikasi Demo
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Package Summary */}
          <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-100 flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-100/70 px-2 py-0.5 rounded">
                Detail Pesanan
              </span>
              <h4 className="font-bold text-slate-900 text-base mt-1">{packageItem.name}</h4>
              <p className="text-xs text-slate-600 mt-0.5">{packageItem.questionCount} Soal • Durasi {packageItem.durationMinutes} Menit</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500">Total Biaya</span>
              <div className="text-xl font-extrabold text-teal-700">
                Rp {packageItem.price.toLocaleString('id-ID')}
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-3">
              Pilih Metode Pembayaran
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedMethod('qris')}
                className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-center transition-all ${
                  selectedMethod === 'qris'
                    ? 'border-teal-600 bg-teal-50/50 text-teal-900 font-semibold ring-2 ring-teal-500/20'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <QrCode className="w-6 h-6 mb-1.5 text-teal-600" />
                <span className="text-xs">QRIS Standar</span>
                <span className="text-[10px] text-slate-400 mt-0.5">Semua E-Wallet</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('bsi')}
                className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-center transition-all ${
                  selectedMethod === 'bsi'
                    ? 'border-teal-600 bg-teal-50/50 text-teal-900 font-semibold ring-2 ring-teal-500/20'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Building2 className="w-6 h-6 mb-1.5 text-teal-600" />
                <span className="text-xs">Bank Syariah (BSI)</span>
                <span className="text-[10px] text-slate-400 mt-0.5">Virtual Account</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('gopay')}
                className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-center transition-all ${
                  selectedMethod === 'gopay'
                    ? 'border-teal-600 bg-teal-50/50 text-teal-900 font-semibold ring-2 ring-teal-500/20'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Wallet className="w-6 h-6 mb-1.5 text-teal-600" />
                <span className="text-xs">GoPay / E-Wallet</span>
                <span className="text-[10px] text-slate-400 mt-0.5">Instan & Mudah</span>
              </button>
            </div>
          </div>

          {/* Payment Method Details */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/80 space-y-3">
            {selectedMethod === 'qris' && (
              <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <div className="w-28 h-28 bg-white border border-slate-300 rounded-xl p-2 flex items-center justify-center shadow-inner shrink-0">
                  <div className="grid grid-cols-4 gap-1 w-full h-full p-1 bg-slate-900 rounded">
                    <div className="bg-white col-span-2 row-span-2 rounded-sm" />
                    <div className="bg-white col-span-1 rounded-sm" />
                    <div className="bg-white col-span-1 rounded-sm" />
                    <div className="bg-white col-span-2 rounded-sm" />
                    <div className="bg-white col-span-2 row-span-2 rounded-sm" />
                    <div className="bg-white col-span-1 rounded-sm" />
                    <div className="bg-white col-span-1 rounded-sm" />
                  </div>
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  <p className="font-semibold text-slate-800">Scan QRIS Nasional (ASPI)</p>
                  <p>Mendukung BCA, Mandiri, BSI, GoPay, OVO, ShopeePay, DANA, dan LinkAja.</p>
                  <p className="text-[11px] text-slate-400">Kode bayar kadaluarsa dalam 15:00 menit</p>
                </div>
              </div>
            )}

            {selectedMethod === 'bsi' && (
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500">Nomor Virtual Account BSI:</span>
                  <span className="font-mono font-bold text-slate-900 bg-slate-200/80 px-2.5 py-1 rounded select-all">
                    9982 0812 3456 7890
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500">Atas Nama:</span>
                  <span className="font-semibold text-slate-800">UMPTKIN EDU NUSANTARA</span>
                </div>
              </div>
            )}

            {selectedMethod === 'gopay' && (
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500">ID Akun E-Wallet:</span>
                  <span className="font-mono font-bold text-slate-900 bg-slate-200/80 px-2.5 py-1 rounded">
                    TRYOUT-UMPTKIN-PAY
                  </span>
                </div>
                <p className="text-slate-500 text-[11px]">
                  Konfirmasi pembayaran instan 1-klik melalui simulasi demo.
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Simulasi Lingkungan Demo (Tanpa Biaya Riil)
            </span>
          </div>

          {/* Action Button */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isProcessing}
              className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 font-medium text-sm transition-colors"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handlePay}
              disabled={isProcessing}
              className="flex-[2] px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold text-sm transition-all shadow-md shadow-teal-600/20 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Memproses Pembayaran...
                </>
              ) : (
                <>
                  Simulasikan Pembayaran
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
