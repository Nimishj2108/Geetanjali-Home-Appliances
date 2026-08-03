import React, { useState } from 'react';
import { PageType, CartItem } from '../types';
import { ShoppingBag, Trash2, Send, ChevronRight, MessageSquare, Mail, Plus, Minus } from 'lucide-react';

interface EnquiryListViewProps {
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onClearCart: () => void;
  onNavigate: (page: PageType) => void;
}

export const EnquiryListView: React.FC<EnquiryListViewProps> = ({
  cartItems,
  onRemoveItem,
  onUpdateQuantity,
  onClearCart,
  onNavigate,
}) => {
  const [userName, setUserName] = useState('');
  const [userContact, setUserContact] = useState('');
  const [validationError, setValidationError] = useState('');
  const [successSent, setSuccessSent] = useState(false);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const generateMessageText = () => {
    let text = `*Geetanjali Home Appliances Product Enquiry*\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `I would like to enquire about the following products:\n`;
    cartItems.forEach((item, index) => {
      text += `\n*${index + 1}. ${item.name}*`;
      text += `\n   • Size: ${item.size}`;
      text += `\n   • SKU: ${item.sku}`;
      text += `\n   • Quantity: ${item.quantity}\n`;
    });
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    if (userName) {
      text += `*Customer Details:*\n`;
      text += `• Name: ${userName}\n`;
      text += `• Contact: ${userContact}\n\n`;
    }
    text += `Please let me know the availability and estimated pricing. Thank you!`;
    return text;
  };

  const validateForm = () => {
    if (!userName.trim()) {
      setValidationError('Please enter your name.');
      return false;
    }
    if (!userContact.trim()) {
      setValidationError('Please enter your contact phone or email.');
      return false;
    }
    setValidationError('');
    return true;
  };

  const handleWhatsAppEnquiry = () => {
    if (!validateForm()) return;
    const text = generateMessageText();
    window.open(`https://wa.me/919205293094?text=${encodeURIComponent(text)}`, '_blank');
    window.dispatchEvent(new CustomEvent('whatsapp-inquiry-sent', { detail: { text } }));
  };

  const handleEmailEnquiry = () => {
    if (!validateForm()) return;
    const text = generateMessageText();
    const subject = encodeURIComponent(`Geetanjali Home Appliances Product Enquiry - ${userName || 'Customer'}`);
    window.open(`mailto:geetanjalihomeappliances.india@gmail.com?subject=${subject}&body=${encodeURIComponent(text)}`, '_blank');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleWhatsAppEnquiry();
  };

  // State: Empty Cart
  if (cartItems.length === 0) {
    return (
      <div className="w-full py-16 px-6 md:px-16 max-w-[1440px] mx-auto text-center">
        <div className="max-w-md mx-auto my-12 md:my-20 space-y-6">
          <div className="w-20 h-20 bg-surface-container text-heritage-red rounded-full flex items-center justify-center mx-auto shadow-sm">
            <ShoppingBag size={36} />
          </div>
          
          <div>
            <h1 className="font-display font-semibold text-3xl text-charcoal-matte">Your Enquiry List is Empty</h1>
            <p className="font-karla text-[10px] text-tertiary uppercase mt-1 tracking-wider">
              Timeless Culinary Instruments
            </p>
            <p className="text-sm text-charcoal-matte/70 mt-4 leading-relaxed">
              Before we can prepare a tailored pricing and delivery layout, please select your desired vessels from our historical archives.
            </p>
          </div>
        </div>

        {/* Categories CTA Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12 text-left">
          {/* Pressure Cookers Card */}
          <div 
            onClick={() => onNavigate('pressure-cookers')}
            className="bg-white museum-border p-8 rounded-lg shadow-sm hover:shadow-xl transition-all duration-500 group cursor-pointer flex flex-col justify-between h-64"
          >
            <div>
              <span className="font-karla text-[10px] text-secondary uppercase tracking-widest block mb-2">
                Section 01
              </span>
              <h3 className="font-display font-semibold text-xl text-charcoal-matte group-hover:text-heritage-red transition-colors mb-3">
                Explore Pressure Cookers
              </h3>
              <p className="text-xs text-charcoal-matte/70 leading-relaxed">
                Discover our signature Contura, Handi, and Regular shape cookers in Stainless Steel, Tri-ply, Hard-anodized, or Virgin Aluminum builds.
              </p>
            </div>
            <div className="flex items-center gap-1 font-karla text-[10px] text-heritage-red font-medium">
              <span>EXPLORE MODELS</span>
              <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Cookware Card */}
          <div 
            onClick={() => onNavigate('cookware')}
            className="bg-white museum-border p-8 rounded-lg shadow-sm hover:shadow-xl transition-all duration-500 group cursor-pointer flex flex-col justify-between h-64"
          >
            <div>
              <span className="font-karla text-[10px] text-secondary uppercase tracking-widest block mb-2">
                Section 02
              </span>
              <h3 className="font-display font-semibold text-xl text-charcoal-matte group-hover:text-heritage-red transition-colors mb-3">
                Explore Cookware
              </h3>
              <p className="text-xs text-charcoal-matte/70 leading-relaxed">
                Select high-end Kadhais, Saucepans, Frypans, Sauce Pots, or traditional simmer pieces like Topes and Taslas.
              </p>
            </div>
            <div className="flex items-center gap-1 font-karla text-[10px] text-heritage-red font-medium">
              <span>EXPLORE MODELS</span>
              <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // State: Filled Cart (Enquiry List)
  return (
    <div className="w-full">
      {/* Header Banner */}
      <section className="bg-surface-container-low py-12 border-b border-platinum-gray/30 text-center">
        <div className="max-w-[800px] mx-auto px-6">
          <span className="font-karla text-sm text-secondary uppercase tracking-[0.2em] mb-3 block font-bold" style={{ fontSize: '14px' }}>
            Review Selection
          </span>
          <h1 className="font-display font-bold text-heritage-red mb-3" style={{ fontSize: '30px', lineHeight: '33px' }}>
            Enquiry Configuration
          </h1>
          <p className="font-body-md text-xs sm:text-sm md:text-base text-charcoal-matte/80 max-w-xl mx-auto">
            You have selected {totalItems} items. Confirm the sizes and adjust quantities before submitting your query.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-16 px-6 md:px-16 max-w-[1440px] mx-auto">
        {successSent ? (
          <div className="bg-white p-8 md:p-12 museum-border text-center rounded-lg shadow-lg max-w-2xl mx-auto space-y-6">
            <div className="w-16 h-16 bg-heritage-red/5 text-heritage-red rounded-full flex items-center justify-center mx-auto shadow-sm">
              <ChevronRight size={32} className="rotate-90" />
            </div>
            <div>
              <h2 className="font-display font-semibold text-2xl text-charcoal-matte">Enquiry Request Dispatched</h2>
              <p className="font-karla text-[10px] text-tertiary uppercase mt-1 tracking-wider">
                Geetanjali Home Appliances Desk
              </p>
              <p className="text-sm text-charcoal-matte/80 mt-6 leading-relaxed max-w-md mx-auto">
                Thank you, <strong>{userName}</strong>. Your requested specification list has been compiled. A quotation sheet will be dispatched to your contact channel.
              </p>
            </div>
            <button
              onClick={() => { setSuccessSent(false); onNavigate('home'); }}
              className="bg-charcoal-matte text-white py-3.5 px-8 font-karla text-[10px] tracking-widest rounded hover:bg-heritage-red transition-all shadow focus:outline-none"
            >
              RETURN TO HOME
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left side: Cart List */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex justify-between items-baseline border-b border-platinum-gray/20 pb-4">
                <h2 className="font-sans font-semibold text-xl text-charcoal-matte">Selected Instruments</h2>
                <button 
                  onClick={onClearCart}
                  className="font-karla text-[10px] text-tertiary hover:text-heritage-red transition-colors underline focus:outline-none"
                >
                  Clear All Selection
                </button>
              </div>

              <div className="space-y-6 divide-y divide-platinum-gray/20">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-6 pt-6 first:pt-0 group">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white rounded overflow-hidden flex-shrink-0 border border-platinum-gray/20 flex items-center justify-center p-2">
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
                        <div className="flex flex-col items-center justify-center text-center">
                          <span className="text-[10px] font-mono text-charcoal-matte/40 font-bold uppercase">On Order</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-grow flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="font-sans font-semibold text-base text-charcoal-matte group-hover:text-heritage-red transition-colors">
                            {item.name}
                          </h3>
                          <button 
                            onClick={() => onRemoveItem(item.id)}
                            className="p-1 text-tertiary hover:text-heritage-red transition-colors focus:outline-none"
                            aria-label="Remove item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-[11px] text-tertiary font-mono">SKU: {item.sku}</p>
                        <p className="text-xs text-charcoal-matte/70 font-sans italic">{item.category} • Selected Size: {item.size}</p>
                      </div>

                      {/* Quantity counters */}
                      <div className="flex items-center gap-3 mt-4">
                        <span className="font-karla text-[10px] text-tertiary uppercase tracking-wider">Quantity:</span>
                        <div className="flex items-center border border-platinum-gray rounded bg-white overflow-hidden shadow-sm">
                          <button 
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="p-2 text-charcoal-matte hover:bg-surface-container transition-colors focus:outline-none border-r border-platinum-gray"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-4 text-xs font-bold font-mono text-charcoal-matte">{item.quantity}</span>
                          <button 
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-2 text-charcoal-matte hover:bg-surface-container transition-colors focus:outline-none border-l border-platinum-gray"
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side: Checkout summary sidebar */}
            <div className="lg:col-span-5 bg-surface-container p-8 rounded-lg border border-platinum-gray/30 space-y-6 lg:sticky lg:top-28">
              <div>
                <h3 className="font-sans font-semibold text-lg text-charcoal-matte">Inquiry Layout</h3>
                <p className="font-karla text-[10px] text-tertiary mt-1 uppercase tracking-widest">
                  Premium Kitchenware Archive
                </p>
              </div>

              <div className="border-t border-b border-platinum-gray/30 py-4 space-y-3">
                <div className="flex justify-between text-sm text-charcoal-matte/80">
                  <span>Vessels Configured</span>
                  <span className="font-bold font-mono">{cartItems.length} styles</span>
                </div>
                <div className="flex justify-between text-sm text-charcoal-matte/80">
                  <span>Total Quantities</span>
                  <span className="font-bold font-mono">{totalItems} units</span>
                </div>
                <div className="flex justify-between text-sm text-charcoal-matte/80">
                  <span>Response SLA</span>
                  <span className="font-bold text-heritage-red">Within 24 Hours</span>
                </div>
              </div>

              {/* User details entry form */}
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block font-karla text-[10px] uppercase tracking-wider text-charcoal-matte mb-1.5">
                    Your Name *
                  </label>
                  <input 
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="e.g. Ramesh Chand"
                    className="w-full bg-white border border-platinum-gray rounded p-3 text-xs focus:border-heritage-red focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-karla text-[10px] uppercase tracking-wider text-charcoal-matte mb-1.5">
                    Contact Phone / Email *
                  </label>
                  <input 
                    type="text"
                    required
                    value={userContact}
                    onChange={(e) => {
                      setUserContact(e.target.value);
                      if (validationError) setValidationError('');
                    }}
                    placeholder="e.g. rameshchand123@gmail.com"
                    className="w-full bg-white border border-platinum-gray rounded p-3 text-xs focus:border-heritage-red focus:outline-none"
                  />
                </div>

                {validationError && (
                  <p className="text-heritage-red text-xs mt-1 font-sans font-medium">
                    {validationError}
                  </p>
                )}

                <div className="space-y-3 pt-4">
                  <button 
                    type="button"
                    onClick={handleWhatsAppEnquiry}
                    className="w-full bg-[#25D366] text-white py-4 font-sans text-[11px] tracking-widest uppercase hover:bg-[#20ba5a] transition-all rounded shadow-md flex items-center justify-center gap-2 active:scale-[0.98] focus:outline-none cursor-pointer font-semibold"
                  >
                    <MessageSquare size={14} />
                    DIRECT TO WHATSAPP
                  </button>

                  <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-platinum-gray/40"></div>
                    <span className="flex-shrink mx-4 font-karla text-[10px] text-tertiary">OR</span>
                    <div className="flex-grow border-t border-platinum-gray/40"></div>
                  </div>

                  <button 
                    type="button"
                    onClick={handleEmailEnquiry}
                    className="w-full bg-charcoal-matte text-white py-4 font-sans text-[11px] tracking-widest uppercase hover:bg-heritage-red transition-all rounded shadow-md flex items-center justify-center gap-2 active:scale-[0.98] focus:outline-none cursor-pointer font-semibold"
                  >
                    <Mail size={14} />
                    EMAIL SPECIFICATION SHEET
                  </button>
                </div>
              </form>
            </div>

          </div>
        )}
      </section>
    </div>
  );
};
