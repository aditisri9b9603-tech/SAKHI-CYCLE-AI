import React from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (productId: string, delta: number) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onCheckout
}) => {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer */}
      <div className="relative z-10 w-full max-w-md h-full bg-[#fff8f7] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300 border-l border-[#eed4d8]/80">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#eed4d8]/40">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#8b001d] text-[22px]">shopping_bag</span>
              <h3 className="font-headline-sm text-headline-sm text-[#610011]">Sanctuary Kit</h3>
            </div>
            <button 
              onClick={onClose}
              className="p-1 rounded-full text-[#594140] hover:bg-[#feaab7]/30 transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>

          <p className="text-xs text-[#594140] mt-3">
            Pure biocompatible menstrual care calibrated to arrive 3 days before your predicted luteal phase.
          </p>

          {items.length === 0 ? (
            <div className="py-16 text-center text-[#8d706f] flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-[40px] text-[#feaab7]">spa</span>
              <p className="font-body-md text-sm">Your Sanctuary Kit is currently empty.</p>
              <p className="text-xs text-[#8d706f]">Add medical-grade cups, bamboo pads, or herbal patches from the Period Care catalog.</p>
            </div>
          ) : (
            <div className="mt-4 divide-y divide-[#eed4d8]/40">
              {items.map((item) => (
                <div key={item.product.id} className="py-4 flex gap-3 items-center">
                  <img 
                    src={item.product.image} 
                    alt={item.product.title} 
                    className="w-16 h-16 rounded-xl object-cover border border-[#eed4d8]/60 bg-white"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-[#26181b] line-clamp-1">{item.product.title}</h4>
                    <span className="text-[10px] text-[#8d4a56] font-medium block">{item.product.badge}</span>
                    <span className="text-xs font-bold text-[#8b001d]">${item.product.price}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white rounded-full p-1 border border-[#eed4d8]/60">
                    <button 
                      onClick={() => onUpdateQty(item.product.id, -1)}
                      className="w-6 h-6 rounded-full hover:bg-[#fff0f2] text-xs font-bold text-[#594140] flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold px-1 text-[#26181b]">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQty(item.product.id, 1)}
                      className="w-6 h-6 rounded-full hover:bg-[#fff0f2] text-xs font-bold text-[#594140] flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="pt-4 border-t border-[#eed4d8]/60 flex flex-col gap-3">
            <div className="flex justify-between items-center text-xs text-[#594140]">
              <span>Cycle Synchronized Dispatch:</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                In 14 Days (Pre-Luteal)
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-sm font-medium text-[#594140]">Sanctuary Subtotal:</span>
              <span className="font-display-lg text-2xl font-bold text-[#610011]">${total}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full py-3 rounded-full bg-[#8b001d] hover:bg-[#610011] text-white font-title-md text-sm font-semibold tracking-wide shadow-lg shadow-[#8b001d]/25 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">lock_clock</span>
              <span>Reserve with Encrypted Cadence</span>
            </button>
            <p className="text-[11px] text-center text-[#8d706f]">
              100% compostable discreet parcel • Pause or skip anytime
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
