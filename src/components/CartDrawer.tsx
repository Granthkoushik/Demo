import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Check, ShoppingBag, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, change: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onUpdateCustomization: (cartItemId: string, field: 'milk' | 'sweetness' | 'temperature', value: any) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onUpdateCustomization,
  onClearCart,
}: CartDrawerProps) {
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.item.price * item.quantity, 0);
  const serviceFee = subtotal > 0 ? 1.50 : 0;
  const tax = subtotal * 0.0887; // NYC tax
  const total = subtotal + serviceFee + tax;

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutSuccess(true);
    }, 1800);
  };

  const handleReset = () => {
    onClearCart();
    setCheckoutSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-modal="true" role="dialog">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-primary/40 backdrop-blur-md transition-opacity duration-500"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface border-l border-primary/10 flex flex-col shadow-2xl relative h-full">
          {/* Header */}
          <div className="px-6 py-5 border-b border-primary/10 flex items-center justify-between bg-surface-container">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-primary" />
              <h2 className="text-sm uppercase tracking-widest font-bold text-primary">Your Selection</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-primary/5 text-primary/60 hover:text-primary transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {checkoutSuccess ? (
            /* Checkout Success State */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-surface-container-low">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center text-secondary mb-6 animate-bounce">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>
              <span className="font-display text-2xl font-bold text-primary mb-3">Order Confirmed</span>
              <p className="text-on-surface-variant text-sm max-w-xs leading-relaxed mb-8">
                Your artisanal beverage and pastries are being carefully prepared by our master baristas.
              </p>
              
              <div className="w-full bg-white border border-primary/5 p-5 rounded-lg text-left mb-8 shadow-sm">
                <div className="flex justify-between text-xs text-on-surface-variant/70 mb-2">
                  <span>Order Reference</span>
                  <span className="font-mono font-semibold">#TCC-{Math.floor(Math.random() * 9000 + 1000)}</span>
                </div>
                <div className="flex justify-between text-xs text-on-surface-variant/70 mb-4">
                  <span>Estimated Pickup</span>
                  <span className="font-semibold">In 12 minutes</span>
                </div>
                <div className="border-t border-primary/10 pt-3 flex justify-between text-sm font-bold text-primary">
                  <span>Total Settled</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full bg-primary text-on-primary py-4 font-sans text-xs uppercase tracking-widest font-semibold hover:bg-primary-container transition-all shadow-lg"
              >
                Continue Discovering
              </button>
            </div>
          ) : cartItems.length === 0 ? (
            /* Empty State */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-surface-container-lowest">
              <div className="w-12 h-12 text-primary/30 mb-4">
                <ShoppingBag className="w-full h-full stroke-[1.2]" />
              </div>
              <p className="font-display text-lg text-primary italic mb-2">Your bag is empty</p>
              <p className="text-on-surface-variant/70 text-xs max-w-xs leading-relaxed mb-6">
                Browse our single origin coffees and freshly-baked patisseries to start your ritual.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-primary text-on-primary font-sans text-[11px] uppercase tracking-widest font-bold hover:bg-primary-container transition-all rounded-full"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            /* Items list */
            <>
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cartItems.map((cartItem) => (
                  <div
                    key={cartItem.id}
                    className="flex flex-col pb-5 border-b border-primary/5 last:border-0 last:pb-0"
                  >
                    <div className="flex gap-4 items-start">
                      <img
                        src={cartItem.item.image}
                        alt={cartItem.item.name}
                        className="w-16 h-16 object-cover rounded bg-primary/5"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="font-display text-base font-semibold text-primary truncate">
                            {cartItem.item.name}
                          </h4>
                          <span className="font-sans text-xs font-bold text-secondary">
                            ${(cartItem.item.price * cartItem.quantity).toFixed(2)}
                          </span>
                        </div>
                        <p className="text-xs text-on-surface-variant/80 line-clamp-1 mt-0.5">
                          {cartItem.item.description}
                        </p>

                        {/* Adjust quantities */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-primary/10 rounded overflow-hidden">
                            <button
                              onClick={() => onUpdateQuantity(cartItem.id, -1)}
                              className="px-2.5 py-1 hover:bg-primary/5 text-primary/60 hover:text-primary transition-all"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 font-sans text-xs font-semibold text-primary">
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(cartItem.id, 1)}
                              className="px-2.5 py-1 hover:bg-primary/5 text-primary/60 hover:text-primary transition-all"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(cartItem.id)}
                            className="text-primary/40 hover:text-rose-600 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Customization Options for Drink Categories */}
                    {(cartItem.item.category === 'Coffee' || cartItem.item.category === 'Tea Selection') && (
                      <div className="mt-4 pt-3 border-t border-primary/5 bg-surface-container-low/50 p-2.5 rounded text-[11px] space-y-2">
                        {/* Milk selection */}
                        <div className="flex items-center justify-between">
                          <span className="text-on-surface-variant font-medium">Milk Choice:</span>
                          <div className="flex gap-1.5">
                            {(['Whole', 'Oat', 'Almond', 'None'] as const).map((milk) => (
                              <button
                                key={milk}
                                onClick={() => onUpdateCustomization(cartItem.id, 'milk', milk)}
                                className={`px-2 py-0.5 rounded transition-all font-semibold ${
                                  cartItem.customization.milk === milk
                                    ? 'bg-primary text-on-primary'
                                    : 'bg-white border border-primary/5 text-primary hover:bg-primary/5'
                                }`}
                              >
                                {milk}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Sweetness selection */}
                        <div className="flex items-center justify-between">
                          <span className="text-on-surface-variant font-medium">Sweetness:</span>
                          <div className="flex gap-1.5">
                            {(['Normal', 'Half', 'None'] as const).map((sugar) => (
                              <button
                                key={sugar}
                                onClick={() => onUpdateCustomization(cartItem.id, 'sweetness', sugar)}
                                className={`px-2 py-0.5 rounded transition-all font-semibold ${
                                  cartItem.customization.sweetness === sugar
                                    ? 'bg-primary text-on-primary'
                                    : 'bg-white border border-primary/5 text-primary hover:bg-primary/5'
                                }`}
                              >
                                {sugar}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Temp selection */}
                        <div className="flex items-center justify-between">
                          <span className="text-on-surface-variant font-medium">Brew Temp:</span>
                          <div className="flex gap-1.5">
                            {(['Hot', 'Iced'] as const).map((temp) => (
                              <button
                                key={temp}
                                onClick={() => onUpdateCustomization(cartItem.id, 'temperature', temp)}
                                className={`px-2 py-0.5 rounded transition-all font-semibold ${
                                  cartItem.customization.temperature === temp
                                    ? 'bg-primary text-on-primary'
                                    : 'bg-white border border-primary/5 text-primary hover:bg-primary/5'
                                }`}
                              >
                                {temp}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Bill Details & CTA Footer */}
              <div className="bg-surface-container-low p-6 border-t border-primary/10">
                <div className="space-y-2 text-xs text-on-surface-variant mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-primary">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Artisanal Prep Fee</span>
                    <span className="font-semibold text-primary">${serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>NYC Local Tax (8.875%)</span>
                    <span className="font-semibold text-primary">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-primary/10 pt-3 flex justify-between text-sm font-bold text-primary">
                    <span>Total Bill</span>
                    <span className="text-secondary">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full bg-primary text-on-primary py-4 font-sans text-xs uppercase tracking-[0.2em] font-semibold hover:bg-primary-container disabled:bg-primary/50 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Brewing Connection...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Checkout / Pay with Apple Pay</span>
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
