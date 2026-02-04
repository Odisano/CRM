import React from 'react';
import { Product } from '../types';
import { Plus, Minus, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  quantity: number;
  onAdd: () => void;
  onUpdateQuantity: (delta: number) => void;
  onRemove: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  quantity, 
  onAdd, 
  onUpdateQuantity, 
  onRemove 
}) => {
  // Color strip based on category
  const getCategoryColor = (cat: string) => {
    switch(cat) {
      case 'mom_care': return 'bg-purple-500';
      case 'feeding': return 'bg-blue-500';
      case 'pumping': return 'bg-pink-500';
      case 'storage': return 'bg-amber-500';
      default: return 'bg-slate-400';
    }
  };

  const handleMinus = () => {
    if (quantity === 1) {
      onRemove();
    } else {
      onUpdateQuantity(-1);
    }
  };

  return (
    <div className={`group bg-white rounded-xl border transition-all duration-200 flex flex-col relative overflow-hidden ${quantity > 0 ? 'border-violet-500 shadow-md ring-1 ring-violet-500' : 'border-slate-200 shadow-sm hover:border-violet-300'}`}>
      
      {/* Category Indicator Strip */}
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${getCategoryColor(product.category)}`} />

      <div className="p-4 pl-5 flex flex-col flex-grow h-full justify-between">
        <div>
            <div className="flex justify-between items-start gap-3 mb-2">
                <h3 className="font-semibold text-slate-800 leading-snug text-sm sm:text-base">
                    {product.name}
                </h3>
                {product.isNew && (
                    <div className="shrink-0 bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded border border-emerald-200 uppercase tracking-wider">
                        New
                    </div>
                )}
            </div>
            <p className="text-xs text-slate-400 font-medium mb-4 uppercase tracking-wide font-mono">
                #{product.id}
            </p>
        </div>

        <div className="pt-3 border-t border-slate-50">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs text-slate-400">Цена</span>
            <span className="text-lg font-bold text-violet-700">
              {product.price.toLocaleString('ru-RU')} ֏
            </span>
          </div>
          
          {quantity === 0 ? (
            <button
              onClick={onAdd}
              className="w-full h-10 rounded-lg bg-slate-100 text-violet-700 font-medium flex items-center justify-center gap-2 hover:bg-violet-600 hover:text-white transition-all active:scale-95"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>В заказ</span>
            </button>
          ) : (
            <div className="flex items-center justify-between bg-violet-50 rounded-lg p-1">
              <button 
                onClick={handleMinus}
                className="w-8 h-8 flex items-center justify-center bg-white rounded-md text-violet-700 shadow-sm hover:bg-violet-100 active:scale-90 transition-all border border-violet-100"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-bold text-violet-900 w-8 text-center">{quantity}</span>
              <button 
                onClick={() => onUpdateQuantity(1)}
                className="w-8 h-8 flex items-center justify-center bg-violet-600 rounded-md text-white shadow-sm hover:bg-violet-700 active:scale-90 transition-all"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};