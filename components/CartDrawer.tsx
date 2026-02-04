import React, { useEffect, useRef, useState } from 'react';
import { X, Minus, Plus, Trash2, ArrowRight, Copy, Check, Store } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onClear: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemove,
  onUpdateQuantity,
  onClear
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [discount, setDiscount] = useState<number>(0);
  const [clientName, setClientName] = useState('');
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Reset copied state after 2 seconds
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * (discount / 100));
  const finalTotal = subtotal - discountAmount;

  const generateOrderText = () => {
    const date = new Date().toLocaleDateString('ru-RU');
    const client = clientName.trim() || 'Без названия';
    
    let text = `ЗАКАЗ: ${client}\n`;
    text += `Дата: ${date}\n`;
    text += `--------------------------------\n`;
    items.forEach(item => {
        const sum = item.product.price * item.quantity;
        text += `${item.product.name} (Арт: ${item.product.id})\n`;
        text += `  ${item.quantity} шт x ${item.product.price} = ${sum.toLocaleString('ru-RU')} ֏\n`;
    });
    text += `--------------------------------\n`;
    text += `Подытог: ${subtotal.toLocaleString('ru-RU')} ֏\n`;
    if (discount > 0) {
        text += `Скидка: ${discount}% (-${discountAmount.toLocaleString('ru-RU')} ֏)\n`;
    }
    text += `ИТОГО: ${finalTotal.toLocaleString('ru-RU')} ֏`;
    return text;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateOrderText());
      setCopied(true);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const whatsappLink = `https://wa.me/37433080507?text=${encodeURIComponent(generateOrderText())}`;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed inset-y-0 right-0 w-full sm:w-[480px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white shadow-sm z-10">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-slate-800">Оформление</h2>
            {items.length > 0 && (
                <button 
                    onClick={() => {
                        if(window.confirm('Удалить все товары из заказа?')) {
                            onClear();
                            setDiscount(0);
                            setClientName('');
                        }
                    }}
                    className="text-xs text-rose-500 hover:text-rose-700 font-medium bg-rose-50 px-2 py-1 rounded-md transition-colors"
                >
                    Сброс
                </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Client Input Section */}
        <div className="p-4 bg-slate-50 border-b border-slate-200">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5 ml-1">
                Торговая точка / Клиент
            </label>
            <div className="relative">
                <Store className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
                <input 
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Например: Аптека на Шерами"
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none text-slate-800 font-medium"
                />
            </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-300">
                <ShoppingBagIcon />
              </div>
              <div>
                <p className="text-slate-800 font-medium">Заказ пуст</p>
                <p className="text-sm text-slate-400 mt-1">
                  Используйте кнопки +/- в каталоге
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-violet-50 text-violet-600 rounded-full font-medium hover:bg-violet-100 transition-colors"
              >
                В каталог
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm items-center">
                
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-slate-800 line-clamp-2 leading-snug">
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">Арт: {item.product.id}</p>
                </div>
                
                <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-0.5">
                        <button 
                            onClick={() => item.quantity > 1 ? onUpdateQuantity(item.product.id, -1) : onRemove(item.product.id)}
                            className="w-7 h-7 flex items-center justify-center bg-white rounded-md shadow-sm text-slate-600 hover:text-violet-600 active:scale-95 transition-all"
                        >
                            <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-bold w-7 text-center">{item.quantity}</span>
                        <button 
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="w-7 h-7 flex items-center justify-center bg-white rounded-md shadow-sm text-slate-600 hover:text-violet-600 active:scale-95 transition-all"
                        >
                            <Plus className="w-3 h-3" />
                        </button>
                    </div>
                    <span className="text-sm font-bold text-slate-700">
                      {(item.product.price * item.quantity).toLocaleString('ru-RU')}
                    </span>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-5 bg-white border-t border-slate-200 space-y-4 shadow-[0_-4px_15px_-3px_rgba(0,0,0,0.1)]">
            <div className="space-y-3">
              <div className="flex justify-between text-slate-500 text-sm">
                <span>Подытог</span>
                <span>{subtotal.toLocaleString('ru-RU')} ֏</span>
              </div>
              
              <div className="flex items-center justify-between text-slate-600 text-sm">
                <label htmlFor="discount-input" className="flex items-center gap-2 cursor-pointer">
                    <span className="font-medium text-violet-700">Скидка (%)</span>
                </label>
                <div className="flex items-center gap-3">
                    {discount > 0 && (
                        <span className="text-rose-500 text-xs font-medium bg-rose-50 px-2 py-1 rounded">
                            -{discountAmount.toLocaleString('ru-RU')}
                        </span>
                    )}
                    <input
                        id="discount-input"
                        type="number"
                        min="0"
                        max="100"
                        value={discount === 0 ? '' : discount}
                        placeholder="0"
                        onChange={(e) => {
                            let val = parseInt(e.target.value);
                            if (isNaN(val)) val = 0;
                            val = Math.min(100, Math.max(0, val));
                            setDiscount(val);
                        }}
                        className="w-16 p-1.5 text-right border border-slate-200 rounded-lg bg-slate-50 text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all text-sm font-bold"
                    />
                </div>
              </div>

              <div className="flex justify-between text-slate-900 font-bold text-xl pt-3 border-t border-slate-100">
                <span>Итого</span>
                <span>{finalTotal.toLocaleString('ru-RU')} ֏</span>
              </div>
            </div>
            
            <div className="grid grid-cols-[1fr_1.5fr] gap-3">
                <button
                    onClick={handleCopy}
                    className={`flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold transition-all border ${
                        copied 
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span className="text-sm">{copied ? 'Скопировано' : 'Копировать'}</span>
                </button>

                <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-violet-600 text-white py-3.5 rounded-xl font-semibold hover:bg-violet-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-violet-200 active:scale-[0.98]"
                >
                    <span className="text-sm">Отправить</span>
                    <ArrowRight className="w-4 h-4" />
                </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

// Helper icon
const ShoppingBagIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);