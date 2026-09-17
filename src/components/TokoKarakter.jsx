import React, { useState } from 'react';
import AvatarCanvas from './AvatarCanvas';
import { AVATAR_SHOP_ITEMS } from '../data/shopData';
import { soundFx } from '../utils/audio';
import confetti from 'canvas-confetti';
import { 
  ShoppingBag, 
  Coins, 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  Shirt, 
  Scissors, 
  SportShoe,
  Info,
  AlertCircle,
  HelpCircle
} from 'lucide-react';

function PantsIcon({ className = "w-5 h-5" }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M6 3h12v4l-1 14h-3.5L12 11l-1.5 10H7L6 7V3z" />
    </svg>
  );
}

export default function TokoKarakter({ student, updateStudentData }) {
  const [activeCategory, setActiveCategory] = useState('tops'); // 'tops' | 'bottoms' | 'shoes' | 'accessories'
  const [previewItem, setPreviewItem] = useState(null);
  const [buyingItem, setBuyingItem] = useState(null); // Item pending confirmation

  const categories = [
    { id: 'tops', label: 'tops', icon: Shirt },
    { id: 'bottoms', label: 'bottoms', icon: PantsIcon },
    { id: 'shoes', label: 'shoes', icon: SportShoe },
    { id: 'accessories', label: 'rambut', icon: Scissors }
  ];

  const categoryItems = AVATAR_SHOP_ITEMS.filter(item => item.category === activeCategory);

  const handlePreview = (item) => {
    soundFx.playClick();
    setPreviewItem(item);
  };

  const handleEquip = (item) => {
    soundFx.playClick();
    const updatedEquipped = {
      ...student.equipped,
      [item.category]: item.id,
      ...(item.category === 'bottoms' ? { bottom: item.id, bottoms: item.id } : {}),
      ...(item.category === 'tops' ? { top: item.id, tops: item.id } : {}),
      ...(item.category === 'accessories' ? { accessory: item.id, hairstyle: item.id, accessories: item.id } : {})
    };
    updateStudentData({
      ...student,
      equipped: updatedEquipped
    });
  };

  const handleInitiateBuy = (item) => {
    soundFx.playClick();
    setBuyingItem(item);
  };

  const handleConfirmBuy = () => {
    if (!buyingItem) return;
    
    if (student.coins < buyingItem.priceCoins) {
      alert('Koin Edukasi tidak cukup! Selesaikan lebih banyak Kuis dan Misi Foto AI.');
      setBuyingItem(null);
      return;
    }

    soundFx.playCoin();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });

    const newInventory = [...student.inventory, buyingItem.id];
    const newEquipped = {
      ...student.equipped,
      [buyingItem.category]: buyingItem.id,
      ...(buyingItem.category === 'bottoms' ? { bottom: buyingItem.id, bottoms: buyingItem.id } : {}),
      ...(buyingItem.category === 'tops' ? { top: buyingItem.id, tops: buyingItem.id } : {}),
      ...(buyingItem.category === 'accessories' ? { accessory: buyingItem.id, hairstyle: buyingItem.id, accessories: buyingItem.id } : {})
    };

    updateStudentData({
      ...student,
      coins: student.coins - buyingItem.priceCoins,
      inventory: newInventory,
      equipped: newEquipped,
      stats: {
        ...student.stats,
        itemsBought: student.stats.itemsBought + 1
      }
    });

    setBuyingItem(null);
    setPreviewItem(null);
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-white via-indigo-50/60 to-purple-50/60 border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold border border-purple-200">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Toko Karakter & Manajemen Keuangan Siswa</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Toko Kebutuhan Karakter Avatar
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
            Gunakan Koin Edukasi hasil belajarmu dengan bijak. Kelola skala prioritas antara kebutuhan utama dan keinginan!
          </p>
        </div>

        {/* Balance Status */}
        <div className="bg-amber-500/10 border border-amber-500/20 px-6 py-4 rounded-2xl flex items-center gap-4 shadow-sm">
          <Coins className="w-8 h-8 text-amber-500 fill-amber-500" />
          <div>
            <p className="text-xs text-slate-600 font-semibold">Sisa Koin Edukasi</p>
            <p className="text-2xl font-black text-amber-600">{student.coins} Koin</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Avatar Preview Spotlight & Shop Catalogue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Live Avatar Fitting Room */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-lg space-y-4">
          <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
            Kamar Pas Karakter (Live Preview)
          </span>

          {/* SVG Avatar with dynamic preview item */}
          <div className="my-2 pt-3">
            <AvatarCanvas 
              equipped={student.equipped} 
              previewItem={previewItem}
              size="xl" 
              animated={true} 
            />
          </div>

          {previewItem && (
            <button
              onClick={() => setPreviewItem(null)}
              className="py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 transition-colors"
            >
              Batalkan Preview Item
            </button>
          )}

          <div className="bg-purple-50/80 p-4 rounded-2xl border border-purple-100 w-full text-xs text-slate-700 space-y-1">
            <p className="font-bold text-purple-900 flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-purple-700" /> Skala Prioritas Edukasi:
            </p>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Item kategori <span className="text-emerald-700 font-bold">Primer</span> paling terjangkau untuk sekolah. Item <span className="text-amber-700 font-bold">Sekunder</span> dan <span className="text-purple-700 font-bold">Tersier</span> adalah aksesoris impian!
            </p>
          </div>
        </div>

        {/* Right Column: Categorized Catalogue */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Category Tabs */}
          <div className="flex overflow-x-auto gap-2 p-1.5 bg-white border border-slate-200 shadow-sm rounded-2xl no-scrollbar">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => { soundFx.playClick(); setActiveCategory(cat.id); setPreviewItem(null); }}
                  className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Shop Item Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categoryItems.map((item) => {
              const isOwned = student.inventory.includes(item.id);
              const isEquipped = student.equipped[item.category] === item.id ||
                (item.category === 'bottoms' && student.equipped.bottom === item.id) ||
                (item.category === 'tops' && student.equipped.top === item.id) ||
                (item.category === 'accessories' && (student.equipped.accessory === item.id || student.equipped.hairstyle === item.id));
              const isPreviewing = previewItem?.id === item.id;
              const canAfford = student.coins >= item.priceCoins;

              let priorityBadge = 'bg-emerald-50 text-emerald-700 border-emerald-200';
              if (item.priorityCategory === 'Sekunder') priorityBadge = 'bg-amber-50 text-amber-700 border-amber-200';
              if (item.priorityCategory === 'Tersier') priorityBadge = 'bg-purple-50 text-purple-700 border-purple-200';

              return (
                <div
                  key={item.id}
                  className={`bg-white border rounded-3xl p-5 space-y-4 flex flex-col justify-between transition-all ${
                    isEquipped 
                      ? 'border-emerald-500/60 bg-emerald-50/30 shadow-md' 
                      : isPreviewing
                      ? 'border-amber-500/60 bg-amber-50/30 shadow-md'
                      : 'border-slate-200 hover:border-indigo-300 hover:shadow-md'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${priorityBadge}`}>
                        Kebutuhan {item.priorityCategory}
                      </span>

                      {isEquipped && (
                        <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Sedang Dipakai
                        </span>
                      )}
                    </div>

                    <h4 className="font-extrabold text-slate-900 text-base">{item.name}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2">{item.description}</p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    
                    {/* Price / Owned status */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-medium">Harga Item:</span>
                      {isOwned ? (
                        <span className="text-xs font-bold text-emerald-600">Sudah Dimiliki</span>
                      ) : (
                        <span className="text-sm font-black text-amber-600 flex items-center gap-1">
                          <Coins className="w-4 h-4 text-amber-500 fill-amber-500" />
                          {item.priceCoins} Koin
                        </span>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handlePreview(item)}
                        className={`py-2 px-3 rounded-xl font-bold text-xs border transition-colors ${
                          isPreviewing
                            ? 'bg-amber-500 text-slate-950 border-amber-400'
                            : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {isPreviewing ? 'Dipratinjau' : 'Coba Pas'}
                      </button>

                      {isOwned ? (
                        <button
                          onClick={() => handleEquip(item)}
                          disabled={isEquipped}
                          className={`py-2 px-3 rounded-xl font-bold text-xs transition-colors ${
                            isEquipped
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                              : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                          }`}
                        >
                          {isEquipped ? 'Dipakai' : 'Pakai Item'}
                        </button>
                      ) : (
                        <button
                          onClick={() => handleInitiateBuy(item)}
                          disabled={!canAfford}
                          className={`py-2 px-3 rounded-xl font-bold text-xs transition-colors ${
                            canAfford
                              ? 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-md font-bold'
                              : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                          }`}
                        >
                          {canAfford ? 'Beli Item' : 'Koin Kurang'}
                        </button>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* FINANCIAL LITERACY BUY CONFIRMATION MODAL */}
      {buyingItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl text-center">
            
            <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-600 border border-purple-200 flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                Skala Prioritas: Kebutuhan {buyingItem.priorityCategory}
              </span>
              <h3 className="text-2xl font-black text-slate-900">Konfirmasi Pembelian</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Kamu akan menukarkan <strong className="text-amber-600">{buyingItem.priceCoins} Koin Edukasi</strong> untuk membeli item <strong className="text-slate-900">{buyingItem.name}</strong>.
              </p>
            </div>

            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-left text-xs text-slate-700 space-y-1">
              <p className="font-bold text-amber-800">💡 Pertanyaan Literasi Keuangan:</p>
              <p className="text-slate-600">
                Apakah pembelian item ini adalah kebutuhan utama atau sekadar keinginan impian? Pengelolaan uang yang bijak adalah kunci sukses seorang ekonom!
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setBuyingItem(null)}
                className="py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 border border-slate-200"
              >
                Pertimbangkan Lagi
              </button>
              <button
                onClick={handleConfirmBuy}
                className="py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs hover:from-emerald-400 hover:to-teal-500 shadow-lg"
              >
                Setuju & Beli Sekarang
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
