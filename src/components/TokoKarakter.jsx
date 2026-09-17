import React, { useState } from 'react';
import AvatarCanvas from './AvatarCanvas';
import { AVATAR_SHOP_ITEMS } from '../data/shopData';
import { soundFx } from '../utils/audio';
import { logActivityApi } from '../utils/apiService';
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
  HelpCircle,
  X
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

    logActivityApi({
      username: student.username,
      studentName: student.name,
      activityType: 'shop_buy',
      title: `Membeli item ${buyingItem.name} (${buyingItem.category})`,
      coinsEarned: -buyingItem.priceCoins,
      details: { itemId: buyingItem.id, category: buyingItem.category, price: buyingItem.priceCoins }
    });

    setBuyingItem(null);
    setPreviewItem(null);
  };

  return (
    <div className="space-y-5 pb-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-white via-indigo-50/60 to-purple-50/60 border border-slate-200 p-4 sm:p-5 rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 text-[11px] font-bold border border-purple-200">
            <ShoppingBag className="w-3 h-3" />
            <span>Toko Karakter & Manajemen Keuangan Siswa</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Toko Kebutuhan Karakter Avatar
          </h2>
          <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
            Gunakan Koin Edukasi hasil belajarmu dengan bijak. Kelola skala prioritas antara kebutuhan utama dan keinginan!
          </p>
        </div>

        {/* Balance Status */}
        <div className="bg-amber-500/10 border border-amber-500/20 px-4 py-2.5 rounded-xl flex items-center gap-3 shadow-sm shrink-0">
          <Coins className="w-6 h-6 text-amber-500 fill-amber-500" />
          <div>
            <p className="text-[11px] text-slate-600 font-semibold">Sisa Koin Edukasi</p>
            <p className="text-xl font-black text-amber-600">{student.coins} Koin</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Avatar Preview Spotlight & Shop Catalogue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Left Column: Live Avatar Fitting Room */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col items-center justify-center relative overflow-hidden shadow-sm space-y-3">
          <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-bold border border-indigo-200">
            Kamar Pas Karakter (Live Preview)
          </span>

          {/* SVG Avatar with dynamic preview item */}
          <div className="my-1 pt-2">
            <AvatarCanvas 
              equipped={student.equipped} 
              previewItem={previewItem}
              size="lg" 
              animated={true} 
            />
          </div>

          {previewItem && (
            <button
              onClick={() => setPreviewItem(null)}
              className="py-1.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 transition-colors"
            >
              Batalkan Preview Item
            </button>
          )}

          <div className="bg-purple-50/80 p-3 rounded-xl border border-purple-100 w-full text-xs text-slate-700 space-y-1">
            <p className="font-bold text-purple-900 flex items-center gap-1 text-xs">
              <Info className="w-3.5 h-3.5 text-purple-700" /> Skala Prioritas Edukasi:
            </p>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Item kategori <span className="text-emerald-700 font-bold">Primer</span> paling terjangkau untuk sekolah. Item <span className="text-amber-700 font-bold">Sekunder</span> dan <span className="text-purple-700 font-bold">Tersier</span> adalah aksesoris impian!
            </p>
          </div>
        </div>

        {/* Right Column: Categorized Catalogue */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Category Tabs */}
          <div className="flex overflow-x-auto gap-1.5 p-1 bg-white border border-slate-200 shadow-sm rounded-xl no-scrollbar">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => { soundFx.playClick(); setActiveCategory(cat.id); setPreviewItem(null); }}
                  className={`flex-1 min-w-[100px] py-2 px-2.5 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Shop Item Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                  className={`bg-white border rounded-2xl p-3.5 sm:p-4 space-y-3 flex flex-col justify-between transition-all ${
                    isEquipped 
                      ? 'border-emerald-500/60 bg-emerald-50/30 shadow-sm' 
                      : isPreviewing
                      ? 'border-amber-500/60 bg-amber-50/30 shadow-sm'
                      : 'border-slate-200 hover:border-indigo-300 hover:shadow-sm'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${priorityBadge}`}>
                        Kebutuhan {item.priorityCategory}
                      </span>

                      {isEquipped && (
                        <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Dipakai
                        </span>
                      )}
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm leading-snug">{item.name}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{item.description}</p>
                  </div>

                  <div className="space-y-2.5 pt-2 border-t border-slate-100">
                    
                    {/* Price / Owned status */}
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 font-medium">Harga Item:</span>
                      {isOwned ? (
                        <span className="text-xs font-bold text-emerald-600">Sudah Dimiliki</span>
                      ) : (
                        <span className="text-xs font-black text-amber-600 flex items-center gap-1">
                          <Coins className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          {item.priceCoins} Koin
                        </span>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handlePreview(item)}
                        className={`py-1.5 px-2.5 rounded-lg font-bold text-xs border transition-colors ${
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
                          className={`py-1.5 px-2.5 rounded-lg font-bold text-xs transition-colors ${
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
                          className={`py-1.5 px-2.5 rounded-lg font-bold text-xs transition-colors ${
                            canAfford
                              ? 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-sm font-bold'
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
        <div 
          onClick={() => setBuyingItem(null)}
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 max-w-sm w-full space-y-4 shadow-xl text-center relative"
          >
            {/* Close Button */}
            <button
              onClick={() => setBuyingItem(null)}
              className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
              title="Batal / Tutup"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 border border-purple-200 flex items-center justify-center mx-auto">
              <ShoppingBag className="w-6 h-6" />
            </div>

            <div className="space-y-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                Skala Prioritas: Kebutuhan {buyingItem.priorityCategory}
              </span>
              <h3 className="text-lg font-black text-slate-900">Konfirmasi Pembelian</h3>
              <p className="text-xs text-slate-600">
                Kamu akan menukarkan <strong className="text-amber-600">{buyingItem.priceCoins} Koin Edukasi</strong> untuk membeli item <strong className="text-slate-900">{buyingItem.name}</strong>.
              </p>
            </div>

            <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-left text-[11px] text-slate-700 space-y-1">
              <p className="font-bold text-amber-800">💡 Pertanyaan Literasi Keuangan:</p>
              <p className="text-slate-600 leading-relaxed">
                Apakah pembelian item ini adalah kebutuhan utama atau sekadar keinginan impian? Pengelolaan uang yang bijak adalah kunci sukses seorang ekonom!
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => setBuyingItem(null)}
                className="py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 border border-slate-200"
              >
                Pertimbangkan
              </button>
              <button
                onClick={handleConfirmBuy}
                className="py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs hover:from-emerald-400 hover:to-teal-500 shadow-md"
              >
                Beli Sekarang
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
