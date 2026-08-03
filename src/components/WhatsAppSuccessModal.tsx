import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X, MessageSquare, Clock, ExternalLink, Calendar, Copy, Check } from 'lucide-react';

interface WhatsAppSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  messageText?: string;
}

export const WhatsAppSuccessModal: React.FC<WhatsAppSuccessModalProps> = ({
  isOpen,
  onClose,
  messageText = '',
}) => {
  const [copied, setCopied] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  // Generate an enterprise-looking inquiry reference ID on mount or open
  useEffect(() => {
    if (isOpen) {
      const randomId = Math.floor(100000 + Math.random() * 900000);
      setReferenceId(`GH-2026-${randomId}`);
      
      const now = new Date();
      setCurrentDate(now.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }));
    }
  }, [isOpen]);

  const handleCopy = () => {
    navigator.clipboard.writeText(messageText || 'Inquiry regarding Geetanjali Home Appliances Cookware');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReopenWhatsApp = () => {
    const url = `https://wa.me/919205293094?text=${encodeURIComponent(messageText)}`;
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 select-none">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-charcoal-matte/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="relative w-full max-w-lg bg-white rounded-md shadow-2xl border border-platinum-gray/40 overflow-hidden flex flex-col z-10"
            id="whatsapp-success-modal"
          >
            {/* Header Red Accent Border Line */}
            <div className="h-1.5 w-full bg-heritage-red" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-charcoal-matte/40 hover:text-charcoal-matte p-1.5 rounded-full hover:bg-surface-container-low transition-colors"
              title="Close modal"
            >
              <X size={18} />
            </button>

            {/* Main Modal Body */}
            <div className="p-6 md:p-8 flex flex-col items-center text-center">
              {/* Checkmark Animation Hub */}
              <div className="relative mb-5">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15, type: 'spring', stiffness: 500, damping: 15 }}
                  className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border border-emerald-200"
                >
                  <CheckCircle2 size={36} className="stroke-[1.75]" />
                </motion.div>
                
                {/* Decorative particles */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: [0, 1, 0], scale: [0.8, 1.3, 1] }}
                  transition={{ delay: 0.3, duration: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-golden-ochre/20 border border-golden-ochre/40"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: [0, 1, 0], scale: [0.8, 1.4, 1] }}
                  transition={{ delay: 0.4, duration: 1.2 }}
                  className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-heritage-red/25"
                />
              </div>

              {/* Badges / Header Titles */}
              <span className="font-karla text-[10px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider mb-2.5 border border-emerald-200">
                Inquiry Successfully Initiated
              </span>
              
              <h3 className="font-display text-2xl md:text-3xl text-charcoal-matte font-semibold mb-2">
                WhatsApp Chat Opened
              </h3>
              
              <p className="font-sans text-xs text-charcoal-matte/70 max-w-sm mb-6 leading-relaxed">
                Your direct inquiry has been constructed and sent to our official dealer portal. We will connect with you shortly!
              </p>

              {/* Receipt / Reference Block */}
              <div className="w-full bg-surface-container-low rounded p-4.5 border border-platinum-gray/30 text-left mb-6 font-sans">
                <div className="flex justify-between items-center pb-2.5 mb-2.5 border-b border-platinum-gray/20">
                  <span className="text-[10px] font-semibold text-charcoal-matte/50 uppercase tracking-wider">Inquiry Reference</span>
                  <span className="text-[11px] font-mono font-bold text-heritage-red">{referenceId}</span>
                </div>

                <div className="flex justify-between items-center pb-2.5 mb-2.5 border-b border-platinum-gray/20">
                  <span className="text-[10px] font-semibold text-charcoal-matte/50 uppercase tracking-wider">Submitted On</span>
                  <div className="flex items-center gap-1 text-[11px] text-charcoal-matte/80">
                    <Calendar size={11} className="text-charcoal-matte/40" />
                    <span>{currentDate}</span>
                  </div>
                </div>

                {messageText && (
                  <div className="mt-3">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[10px] font-semibold text-charcoal-matte/50 uppercase tracking-wider">Message Draft</span>
                      <button
                        onClick={handleCopy}
                        className="text-[10px] font-semibold text-heritage-red hover:text-primary flex items-center gap-1 transition-colors px-1.5 py-0.5 rounded hover:bg-heritage-red/5"
                        title="Copy message draft"
                      >
                        {copied ? (
                          <>
                            <Check size={10} className="text-emerald-600" />
                            <span className="text-emerald-600">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={10} />
                            <span>Copy Draft</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="bg-white rounded border border-platinum-gray/20 p-2.5 max-h-24 overflow-y-auto font-sans text-[11px] text-charcoal-matte/70 leading-relaxed italic border-l-2 border-l-heritage-red/65 break-words">
                      "{messageText}"
                    </div>
                  </div>
                )}
              </div>

              {/* Steps / What's Next Guidelines */}
              <div className="w-full text-left font-sans space-y-3 mb-6 bg-surface-container-lowest border border-platinum-gray/15 p-4 rounded">
                <h4 className="text-[10px] font-bold text-charcoal-matte uppercase tracking-wider flex items-center gap-1.5">
                  <Clock size={12} className="text-golden-ochre" />
                  What to expect next:
                </h4>
                <ul className="text-[11px] text-charcoal-matte/70 space-y-1.5 list-disc pl-4.5 leading-relaxed">
                  <li>If your WhatsApp app opened, please hit <strong className="text-charcoal-matte font-semibold">Send</strong> in the chat.</li>
                  <li>Our support team typically replies within <strong className="text-charcoal-matte font-semibold">1 to 2 hours</strong> on working days.</li>
                  <li>Have additional models or size requirements? You can simply type them in the same WhatsApp chat.</li>
                </ul>
              </div>

              {/* Footer Buttons */}
              <div className="w-full flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={handleReopenWhatsApp}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-3 px-4 rounded transition-all active:scale-[0.98] focus:outline-none flex items-center justify-center gap-2 shadow-md shadow-emerald-600/10"
                >
                  <MessageSquare size={14} />
                  <span>Reopen WhatsApp Chat</span>
                  <ExternalLink size={12} className="opacity-80" />
                </button>
                
                <button
                  onClick={onClose}
                  className="flex-1 bg-surface-container-low hover:bg-platinum-gray/30 text-charcoal-matte text-xs font-semibold py-3 px-4 rounded transition-all active:scale-[0.98] focus:outline-none border border-platinum-gray/30"
                >
                  <span>Done</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
