import React from 'react';
import { X, Trash2, ShoppingBag, Send, Mail } from 'lucide-react';
import { CartItem, PageType } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onNavigate: (page: PageType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onClearCart,
  onNavigate,
}) => {
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleWhatsAppEnquiry = () => {
    if (cartItems.length === 0) return;
    
    let message = "Hello Geetanjali Home Appliances, I would like to enquire about the following items:\n\n";
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.size})\n   SKU: ${item.sku}\n   Qty: ${item.quantity}\n\n`;
    });
    message += "Please let me know the pricing, availability, and delivery options. Thank you!";
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919205293094?text=${encodedMessage}`, '_blank');
    window.dispatchEvent(new CustomEvent('whatsapp-inquiry-sent', { detail: { text: message } }));
  };

  const handleEmailEnquiry = () => {
    if (cartItems.length === 0) return;
    
    let message = "Hello Geetanjali Home Appliances,\n\nI would like to enquire about the following items from your catalog:\n\n";
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.size})\n   SKU: ${item.sku}\n   Quantity: ${item.quantity}\n\n`;
    });
    message += "Please send me the bulk price quote, minimum order quantities, and delivery schedule.\n\nThank you!";
    
    const subject = encodeURIComponent("Geetanjali Home Appliances - Product Specification & Bulk Quote Request");
    window.open(`mailto:geetanjalihomeappliances.india@gmail.com?subject=${subject}&body=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-[60] transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Slideout Sidebar Panel */}
      <aside 
        className={`fixed right-0 top-0 h-full w-full md:w-[400px] bg-white shadow-2xl z-[70] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-surface-container flex justify-between items-center">
          <div>
            <h2 className="font-headline-sm text-heritage-red text-2xl leading-none">Enquiry List</h2>
            <p className="font-karla text-[10px] text-tertiary mt-1 uppercase tracking-widest">
              Premium Kitchenware Archive
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-surface-container rounded-full transition-colors focus:outline-none"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-charcoal-matte/50 p-6">
              <ShoppingBag size={48} className="text-platinum-gray mb-4 animate-pulse" />
              <p className="font-headline-sm text-lg mb-2">Your List is Empty</p>
              <p className="text-xs leading-relaxed max-w-xs">
                Explore our catalog to select premium kitchenware and add them to your inquiry.
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 items-center border-b border-platinum-gray/20 pb-4 group">
                <div className="w-20 h-20 bg-white rounded overflow-hidden flex-shrink-0 border border-platinum-gray/30 flex items-center justify-center p-1">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" 
                      style={{
                        mixBlendMode: (item.image?.includes('googleusercontent.com') || item.image?.includes('hc-frypan')) ? 'multiply' : undefined
                      }}
                    />
                  ) : (
                    <span className="font-mono text-[9px] text-charcoal-matte/40 font-bold uppercase">On Order</span>
                  )}
                </div>
                <div className="flex-grow min-w-0">
                  <h4 className="font-label-md text-label-md text-charcoal-matte truncate font-bold group-hover:text-heritage-red transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-tertiary font-mono">SKU: {item.sku}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] font-karla bg-platinum-gray px-2 py-0.5 rounded text-charcoal-matte">
                      Size: {item.size}
                    </span>
                    <span className="text-[10px] font-karla bg-platinum-gray px-2 py-0.5 rounded text-charcoal-matte">
                      Qty: {item.quantity}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => onRemoveItem(item.id)}
                  className="p-2 text-tertiary-fixed-dim hover:text-heritage-red transition-colors focus:outline-none self-center"
                  aria-label="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer actions */}
        <div className="p-6 border-t border-surface-container space-y-4 bg-surface-container-low">
          {cartItems.length > 0 ? (
            <>
              <button 
                onClick={() => {
                  onNavigate('enquiry-list');
                  onClose();
                }}
                className="w-full bg-heritage-red text-white py-4 font-sans font-medium text-xs tracking-widest hover:bg-primary transition-all rounded shadow-md active:scale-[0.98] focus:outline-none"
              >
                VIEW FULL ENQUIRY LIST ({totalItems})
              </button>
              
              <button 
                onClick={handleWhatsAppEnquiry}
                className="w-full bg-[#25D366] text-white py-3.5 font-sans font-medium text-xs tracking-widest hover:bg-[#20ba5a] transition-all rounded flex items-center justify-center gap-2 shadow-md active:scale-[0.98] focus:outline-none font-bold"
              >
                <Send size={15} />
                SEND ENQUIRY VIA WHATSAPP
              </button>

              <button 
                onClick={handleEmailEnquiry}
                className="w-full bg-charcoal-matte text-white py-3.5 font-sans font-medium text-xs tracking-widest hover:bg-heritage-red transition-all rounded flex items-center justify-center gap-2 shadow-md active:scale-[0.98] focus:outline-none font-bold"
              >
                <Mail size={15} />
                EMAIL SPECIFICATION SHEET
              </button>

              <div className="flex justify-between items-center px-2 pt-2">
                <button 
                  onClick={onClearCart}
                  className="flex items-center gap-1 text-tertiary hover:text-error transition-colors focus:outline-none"
                >
                  <Trash2 size={14} />
                  <span className="font-karla text-[10px]">CLEAR ALL</span>
                </button>
                <button 
                  onClick={onClose}
                  className="flex items-center gap-1 text-tertiary hover:text-charcoal-matte transition-colors focus:outline-none"
                >
                  <X size={14} />
                  <span className="font-karla text-[10px]">CLOSE</span>
                </button>
              </div>
            </>
          ) : (
            <button 
              onClick={() => {
                onNavigate('pressure-cookers');
                onClose();
              }}
              className="w-full bg-heritage-red text-white py-4 font-sans font-medium text-xs tracking-widest hover:bg-primary transition-all rounded shadow-md focus:outline-none"
            >
              BROWSE CATALOG
            </button>
          )}
        </div>
      </aside>
    </>
  );
};
