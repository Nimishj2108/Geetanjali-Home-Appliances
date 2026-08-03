import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Facebook, 
  Instagram, 
  Copy, 
  Check, 
  ExternalLink, 
  Send,
  MessageCircle,
  Sparkles,
  Link2,
  Mail
} from 'lucide-react';
import { Product } from '../products';

interface ProductShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  selectedSize: string;
  price: number;
  isCookware: boolean;
}

export const ProductShareModal: React.FC<ProductShareModalProps> = ({
  isOpen,
  onClose,
  product,
  selectedSize,
  price,
  isCookware,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  
  const shareUrl = window.location.href;
  const productName = product.name;
  const productCategory = isCookware ? 'Heritage Cookware' : 'Geetanjali Premium Pressure Cooker';
  
  const shareMessage = `Check out this premium ${productCategory} from Geetanjali Home Appliances:\n✨ *${productName}* (${selectedSize})\n🏷️ Price: ₹${price.toLocaleString('en-IN')}\n\nView product details and place an inquiry here:\n${shareUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyFullText = () => {
    navigator.clipboard.writeText(shareMessage);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const shareOnWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(`Product Share: ${productName} (${selectedSize}) - Geetanjali Home Appliances`);
    const body = encodeURIComponent(shareMessage);
    window.open(`mailto:geetanjalihomeappliances.india@gmail.com?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 select-none">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-charcoal-matte/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className="relative w-full max-w-md bg-white rounded-md shadow-2xl border border-platinum-gray/30 overflow-hidden flex flex-col z-10"
            id="product-share-modal"
          >
            {/* Header Red Line Accent */}
            <div className="h-1 w-full bg-heritage-red" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4.5 right-4.5 text-charcoal-matte/40 hover:text-charcoal-matte p-1.5 rounded-full hover:bg-surface-container-low transition-colors"
              title="Close panel"
            >
              <X size={16} />
            </button>

            {/* Modal Content */}
            <div className="p-6 md:p-8 flex flex-col text-left font-sans">
              <h3 className="font-display text-xl text-charcoal-matte font-semibold mb-6">
                It is a share
              </h3>

              {/* Minimal Product Preview Card */}
              <div className="flex gap-4 p-3 bg-surface-container-lowest rounded border border-platinum-gray/25 mb-6">
                <div className="w-16 h-16 bg-white rounded border border-platinum-gray/10 p-1 flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                    style={{
                      mixBlendMode: (product.image?.includes('googleusercontent.com') || product.image?.includes('hc-frypan')) ? 'multiply' : undefined
                    }}
                  />
                </div>
                <div className="flex flex-col justify-center min-w-0">
                  <p className="text-[10px] font-mono text-tertiary uppercase tracking-wider">{productCategory}</p>
                  <h4 className="text-xs font-semibold text-charcoal-matte truncate mb-0.5">{product.name}</h4>
                  <p className="text-[11px] text-heritage-red font-bold">
                    ₹{price.toLocaleString('en-IN')} <span className="text-charcoal-matte/50 font-normal font-sans text-[10px]">({selectedSize})</span>
                  </p>
                </div>
              </div>

              {/* Platform Share Options Grid */}
              <div className="grid grid-cols-4 gap-2.5 mb-6">
                {/* WhatsApp */}
                <button
                  onClick={shareOnWhatsApp}
                  className="flex flex-col items-center justify-center p-2.5 rounded bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-100 hover:border-emerald-200 transition-all group"
                >
                  <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-1.5 shadow-sm group-hover:scale-105 transition-transform">
                    <MessageCircle size={16} className="fill-current stroke-[1.5]" />
                  </div>
                  <span className="text-[9px] font-bold text-emerald-800 uppercase tracking-wider">WhatsApp</span>
                </button>

                {/* Direct Email */}
                <button
                  onClick={shareViaEmail}
                  className="flex flex-col items-center justify-center p-2.5 rounded bg-red-50/50 hover:bg-red-50 border border-red-100 hover:border-red-200 transition-all group"
                >
                  <div className="w-9 h-9 rounded-full bg-heritage-red text-white flex items-center justify-center mb-1.5 shadow-sm group-hover:scale-105 transition-transform">
                    <Mail size={16} className="stroke-[2]" />
                  </div>
                  <span className="text-[9px] font-bold text-heritage-red uppercase tracking-wider">Email</span>
                </button>

                {/* Facebook */}
                <button
                  onClick={shareOnFacebook}
                  className="flex flex-col items-center justify-center p-2.5 rounded bg-blue-50/50 hover:bg-blue-50 border border-blue-100 hover:border-blue-200 transition-all group"
                >
                  <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center mb-1.5 shadow-sm group-hover:scale-105 transition-transform">
                    <Facebook size={16} className="fill-current stroke-[1.5]" />
                  </div>
                  <span className="text-[9px] font-bold text-blue-800 uppercase tracking-wider">Facebook</span>
                </button>

                {/* Instagram (Custom Copier) */}
                <button
                  onClick={handleCopyFullText}
                  className="flex flex-col items-center justify-center p-2.5 rounded bg-pink-50/50 hover:bg-pink-50 border border-pink-100 hover:border-pink-200 transition-all group relative"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-white flex items-center justify-center mb-1.5 shadow-sm group-hover:scale-105 transition-transform">
                    {copiedText ? <Check size={16} /> : <Instagram size={16} className="stroke-[2]" />}
                  </div>
                  <span className="text-[9px] font-bold text-pink-800 uppercase tracking-wider">
                    {copiedText ? 'Copied' : 'Instagram'}
                  </span>
                </button>
              </div>

              {/* Copy Link Input Bar */}
              <div className="flex flex-col gap-1.5 mb-2">
                <label className="text-[9px] font-bold uppercase tracking-wider text-charcoal-matte/50">Direct Link</label>
                <div className="flex gap-2">
                  <div className="flex-1 min-w-0 bg-surface-container-low rounded border border-platinum-gray/30 flex items-center px-3 py-2">
                    <Link2 size={12} className="text-charcoal-matte/40 mr-2 flex-shrink-0" />
                    <input 
                      type="text" 
                      readOnly 
                      value={shareUrl}
                      className="w-full bg-transparent border-none text-[11px] text-charcoal-matte/70 font-mono focus:outline-none select-all overflow-ellipsis"
                    />
                  </div>
                  <button
                    onClick={handleCopyLink}
                    className="bg-charcoal-matte hover:bg-heritage-red text-white text-[11px] font-bold px-4 rounded transition-all active:scale-[0.97] flex items-center justify-center gap-1.5 flex-shrink-0"
                  >
                    {copiedLink ? (
                      <>
                        <Check size={12} className="text-emerald-400" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Secondary Close Button */}
              <button
                onClick={onClose}
                className="w-full mt-4 bg-surface-container-low hover:bg-platinum-gray/30 text-charcoal-matte text-xs font-semibold py-2.5 rounded transition-all active:scale-[0.98] border border-platinum-gray/20"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
