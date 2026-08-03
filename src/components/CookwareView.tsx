import React, { useState, useEffect, useRef } from 'react';
import { PageType, CartItem } from '../types';
import { PRODUCTS, Product } from '../products';
import { CheckCircle, Award, Zap, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SizeDimensionsOverlay } from './SizeDimensionsOverlay';
import { ProductImageZoom } from './ProductImageZoom';

const CookwareSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 animate-pulse w-full">
      {/* 1. Saucepan skeleton (col-span-8 row layout mimicking the bento style) */}
      <div className="md:col-span-8 bg-white flex flex-col md:flex-row rounded-sm border border-platinum-gray/10">
        <div className="w-full md:w-1/2 aspect-square md:aspect-auto bg-platinum-gray/10 flex items-center justify-center min-h-[300px]">
          <div className="w-24 h-24 rounded bg-platinum-gray/20" />
        </div>
        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center bg-white">
          <div className="h-4 bg-platinum-gray/25 rounded w-1/3 mb-4" />
          <div className="h-8 bg-platinum-gray/20 rounded w-2/3 mb-3" />
          <div className="h-3 bg-platinum-gray/15 rounded w-5/6 mb-6" />
          <div className="flex gap-2 mb-8">
            <div className="w-12 h-8 rounded bg-platinum-gray/15" />
            <div className="w-12 h-8 rounded bg-platinum-gray/15" />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-auto">
            <div className="h-12 rounded bg-platinum-gray/20" />
            <div className="h-12 rounded bg-platinum-gray/15" />
          </div>
        </div>
      </div>

      {/* 2. Frypan skeleton (col-span-4 vertical layout) */}
      <div className="md:col-span-4 bg-white flex flex-col rounded-sm border border-platinum-gray/10">
        <div className="w-full aspect-square bg-platinum-gray/10 flex items-center justify-center">
          <div className="w-20 h-20 rounded bg-platinum-gray/20" />
        </div>
        <div className="p-6 md:p-8 flex flex-col flex-grow">
          <div className="h-4 bg-platinum-gray/25 rounded w-1/3 mb-4" />
          <div className="h-7 bg-platinum-gray/20 rounded w-2/3 mb-3" />
          <div className="h-3 bg-platinum-gray/15 rounded w-5/6 mb-6" />
          <div className="flex gap-2 mb-8">
            <div className="w-12 h-8 rounded bg-platinum-gray/15" />
            <div className="w-12 h-8 rounded bg-platinum-gray/15" />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-auto">
            <div className="h-12 rounded bg-platinum-gray/20" />
            <div className="h-12 rounded bg-platinum-gray/15" />
          </div>
        </div>
      </div>

      {/* 3. Saucepot skeleton (col-span-4 vertical layout) */}
      <div className="md:col-span-4 bg-white flex flex-col rounded-sm border border-platinum-gray/10">
        <div className="w-full aspect-square bg-platinum-gray/10 flex items-center justify-center">
          <div className="w-20 h-20 rounded bg-platinum-gray/20" />
        </div>
        <div className="p-6 md:p-8 flex flex-col flex-grow">
          <div className="h-4 bg-platinum-gray/25 rounded w-1/3 mb-4" />
          <div className="h-7 bg-platinum-gray/20 rounded w-2/3 mb-3" />
          <div className="h-3 bg-platinum-gray/15 rounded w-5/6 mb-6" />
          <div className="flex gap-2 mb-8">
            <div className="w-12 h-8 rounded bg-platinum-gray/15" />
            <div className="w-12 h-8 rounded bg-platinum-gray/15" />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-auto">
            <div className="h-12 rounded bg-platinum-gray/20" />
            <div className="h-12 rounded bg-platinum-gray/15" />
          </div>
        </div>
      </div>

      {/* 4. Kadhai skeleton (col-span-8 row layout) */}
      <div className="md:col-span-8 bg-white flex flex-col md:flex-row rounded-sm border border-platinum-gray/10">
        <div className="w-full md:w-1/2 aspect-square md:aspect-auto bg-platinum-gray/10 flex items-center justify-center min-h-[300px]">
          <div className="w-24 h-24 rounded bg-platinum-gray/20" />
        </div>
        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center bg-white">
          <div className="h-4 bg-platinum-gray/25 rounded w-1/3 mb-4" />
          <div className="h-8 bg-platinum-gray/20 rounded w-2/3 mb-3" />
          <div className="h-3 bg-platinum-gray/15 rounded w-5/6 mb-6" />
          <div className="flex gap-2 mb-8">
            <div className="w-12 h-8 rounded bg-platinum-gray/15" />
            <div className="w-12 h-8 rounded bg-platinum-gray/15" />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-auto">
            <div className="h-12 rounded bg-platinum-gray/20" />
            <div className="h-12 rounded bg-platinum-gray/15" />
          </div>
        </div>
      </div>
    </div>
  );
};

interface CookwareViewProps {
  initialTab?: 'tri-ply' | 'honeycomb';
  onAddToCart: (productId: string, size: string) => void;
  onNavigate: (page: any, targetId?: string) => void;
}

export const CookwareView: React.FC<CookwareViewProps> = ({ initialTab, onAddToCart, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'tri-ply' | 'honeycomb'>(initialTab || 'tri-ply');
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const isKeyboardFocusRef = useRef<boolean>(false);
  const [isTabLoading, setIsTabLoading] = useState<boolean>(false);
  const [hoveredSize, setHoveredSize] = useState<{ productId: string; size: string } | null>(null);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  useEffect(() => {
    setFocusedIndex(-1);
    setIsTabLoading(true);
    const timer = setTimeout(() => {
      setIsTabLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [activeTab]);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({
    'cw-saucepan': '14cm',
    'cw-frypan': '18cm',
    'cw-saucepot': '18cm',
    'cw-kadhai': '18cm',
    'cw-tope': '14cm',
    'cw-tasla': '18cm',
    'hc-kadhai': '18 cm',
    'hc-rotitawa': '23 cm',
    'hc-dosatawa': '28 cm',
    'hc-frypan': '20 cm',
    'hc-tasla': '18 cm',
  });
  const [addedProductNotification, setAddedProductNotification] = useState<string | null>(null);

  // Filter cookware products based on active tab
  const getProductById = (id: string): Product | undefined => {
    return PRODUCTS.find(p => p.id === id);
  };

  const handleSizeSelect = (productId: string, size: string) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const handleAddToCartClick = (product: Product) => {
    const size = selectedSizes[product.id] || product.sizes[0] || 'Standard';
    onAddToCart(product.id, size);
    setAddedProductNotification(product.name);
    setTimeout(() => setAddedProductNotification(null), 3000);
  };

  const handleWhatsAppProduct = (product: Product) => {
    const size = selectedSizes[product.id] || product.sizes[0] || 'Standard';
    const text = `Hello Geetanjali Home Appliances, I am interested in inquiring about the Cookware item "${product.name}" in size/dimensions: ${size}. Please share pricing and availability.`;
    window.open(`https://wa.me/919205293094?text=${encodeURIComponent(text)}`, '_blank');
    window.dispatchEvent(new CustomEvent('whatsapp-inquiry-sent', { detail: { text } }));
  };

  // Helper component to render size buttons
  const renderSizeSelectors = (product: Product, currentSize: string) => {
    return (
      <div className="flex flex-wrap gap-2 mb-8">
        {product.sizes.map((sz) => {
          const isSelected = currentSize === sz;
          const isHovered = hoveredSize?.productId === product.id && hoveredSize?.size === sz;
          return (
            <div key={sz} className="relative">
              <button
                onClick={() => handleSizeSelect(product.id, sz)}
                onMouseEnter={() => setHoveredSize({ productId: product.id, size: sz })}
                onMouseLeave={() => setHoveredSize(null)}
                className={`px-5 py-2 text-xs font-karla font-bold border transition-all duration-300 focus:outline-none rounded-sm ${
                  isSelected
                    ? 'border-heritage-red text-heritage-red bg-white font-bold'
                    : 'border-platinum-gray text-charcoal-matte hover:border-heritage-red hover:text-heritage-red bg-transparent'
                }`}
              >
                {sz}
              </button>
              <SizeDimensionsOverlay
                size={sz}
                isVisible={isHovered}
                position="top"
              />
            </div>
          );
        })}
      </div>
    );
  };

  // Extract individual products dynamically based on active tab slots
  const saucepan = activeTab === 'tri-ply' ? getProductById('cw-saucepan') : getProductById('hc-kadhai');
  const frypan = activeTab === 'tri-ply' ? getProductById('cw-frypan') : getProductById('hc-rotitawa');
  const saucepot = activeTab === 'tri-ply' ? getProductById('cw-saucepot') : getProductById('hc-dosatawa');
  const kadhai = activeTab === 'tri-ply' ? getProductById('cw-kadhai') : getProductById('hc-frypan');
  const tope = activeTab === 'tri-ply' ? getProductById('cw-tope') : undefined;
  const tasla = activeTab === 'tri-ply' ? getProductById('cw-tasla') : getProductById('hc-tasla');

  // Array of currently visible products
  const activeProducts = [saucepan, frypan, saucepot, kadhai, tope, tasla].filter(Boolean) as Product[];

  const saucepanIndex = saucepan ? activeProducts.findIndex(p => p.id === saucepan.id) : -1;
  const frypanIndex = frypan ? activeProducts.findIndex(p => p.id === frypan.id) : -1;
  const saucepotIndex = saucepot ? activeProducts.findIndex(p => p.id === saucepot.id) : -1;
  const kadhaiIndex = kadhai ? activeProducts.findIndex(p => p.id === kadhai.id) : -1;
  const topeIndex = tope ? activeProducts.findIndex(p => p.id === tope.id) : -1;
  const taslaIndex = tasla ? activeProducts.findIndex(p => p.id === tasla.id) : -1;

  // Keyboard Navigation Support
  useEffect(() => {
    if (activeProducts.length === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore when user typing in fields
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        isKeyboardFocusRef.current = true;
        setFocusedIndex((prev) => {
          const nextIdx = prev + 1;
          if (nextIdx >= activeProducts.length) return 0;
          return nextIdx;
        });
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        isKeyboardFocusRef.current = true;
        setFocusedIndex((prev) => {
          const prevIdx = prev - 1;
          if (prevIdx < 0) return activeProducts.length - 1;
          return prevIdx;
        });
      } else if (e.key === 'Enter') {
        if (focusedIndex >= 0 && focusedIndex < activeProducts.length) {
          e.preventDefault();
          onNavigate('product-detail', activeProducts[focusedIndex].id);
        }
      } else if (e.key === 'Escape') {
        setFocusedIndex(-1);
      } else if (e.key.toLowerCase() === 'a') {
        if (focusedIndex >= 0 && focusedIndex < activeProducts.length) {
          e.preventDefault();
          handleAddToCartClick(activeProducts[focusedIndex]);
        }
      } else if (e.key.toLowerCase() === 'w') {
        if (focusedIndex >= 0 && focusedIndex < activeProducts.length) {
          e.preventDefault();
          handleWhatsAppProduct(activeProducts[focusedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeTab, activeProducts, focusedIndex, onNavigate]);

  // Handle smooth scroll when focused card changes
  useEffect(() => {
    if (focusedIndex >= 0 && activeProducts[focusedIndex] && isKeyboardFocusRef.current) {
      const el = document.getElementById(`prod-card-${activeProducts[focusedIndex].id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      isKeyboardFocusRef.current = false;
    }
  }, [focusedIndex, activeProducts]);

  return (
    <div className="w-full bg-[#FAF9F7] min-h-screen">
      {/* Toast Notification */}
      {addedProductNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-charcoal-matte text-white px-6 py-4 rounded shadow-2xl flex items-center gap-3 border-l-4 border-heritage-red animate-slide-in">
          <CheckCircle size={18} className="text-heritage-red" />
          <span className="font-label-md text-xs">{addedProductNotification} added to Enquiry list.</span>
        </div>
      )}

      {/* Header Section */}
      <header className="w-full px-6 md:px-16 pt-32 pb-12 max-w-[1440px] mx-auto text-center flex flex-col items-center">
        <span className="font-karla text-xs md:text-sm text-golden-ochre uppercase tracking-[0.25em] mb-4 block font-bold">
          Timeless Culinary Instruments
        </span>
        <h1 className="font-display-xl text-display-xl-mobile md:text-display-xl text-heritage-red mb-8 leading-[1.1] max-w-4xl font-semibold">
          {activeTab === 'tri-ply' ? 'The Trident Series' : 'The Tricomb Series'}
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed opacity-85">
          {activeTab === 'tri-ply' ? (
            "Experience culinary excellence with the Geetanjali Trident Cookware Series. Crafted for discerning chefs, our premium selection marries traditional craftsmanship with modern innovation, ensuring impeccable heat distribution and enduring elegance in every dish."
          ) : (
            "Discover the future of modern cooking with Geetanjali Tricomb Series. Combining the supreme heat conduction of tri-ply with a raised protective stainless steel mesh grid, our Tricomb series cookware offers 100% metal-spoon safety, scratch resistance, and effortless food release."
          )}
        </p>

        {/* Collection Subheader / Tab Switcher */}
        <div className="mt-10 p-1.5 bg-platinum-gray/30 rounded-full inline-flex items-center gap-1 border border-platinum-gray/15 shadow-sm max-w-lg w-full sm:w-auto">
          <button
            onClick={() => {
              setActiveTab('tri-ply');
              onNavigate('cookware-tri-ply');
            }}
            className={`flex-1 sm:flex-none px-6 py-3 rounded-full text-xs font-sans tracking-widest font-bold transition-all duration-300 uppercase ${
              activeTab === 'tri-ply'
                ? 'bg-charcoal-matte text-white shadow-md'
                : 'text-charcoal-matte/70 hover:text-charcoal-matte hover:bg-white/40'
            }`}
          >
            Trident Series
          </button>
          <button
            onClick={() => {
              setActiveTab('honeycomb');
              onNavigate('cookware-honeycomb');
            }}
            className={`flex-1 sm:flex-none px-6 py-3 rounded-full text-xs font-sans tracking-widest font-bold transition-all duration-300 uppercase ${
              activeTab === 'honeycomb'
                ? 'bg-charcoal-matte text-white shadow-md'
                : 'text-charcoal-matte/70 hover:text-charcoal-matte hover:bg-white/40'
            }`}
          >
            Tricomb Series
          </button>
        </div>
      </header>

      {/* Gallery Grid Section with AnimatePresence for tab switching */}
      <AnimatePresence mode="wait">
        <motion.main 
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="w-full px-6 md:px-16 max-w-[1440px] mx-auto pb-24 flex-grow"
        >
          {isTabLoading ? (
            <CookwareSkeleton />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Product 1: Saucepan (Bento Style Large - col-span-8) */}
            {saucepan && (() => {
              const isFocused = focusedIndex === saucepanIndex;
              return (
                <motion.div 
                  id={`prod-card-${saucepan.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setFocusedIndex(saucepanIndex)}
                  onMouseLeave={() => setFocusedIndex(-1)}
                  className={`scroll-mt-24 md:col-span-8 bg-white group relative flex flex-col md:flex-row transition-all duration-500 rounded-sm border ${
                    isFocused 
                      ? 'ring-2 ring-heritage-red ring-offset-4 border-heritage-red shadow-xl z-30' 
                      : 'border-platinum-gray/10 hover:shadow-xl z-10'
                  }`}
                >
                  <div 
                    onClick={() => onNavigate('product-detail', saucepan.id)}
                    className="w-full md:w-1/2 aspect-square md:aspect-auto bg-white p-2 flex items-center justify-center overflow-hidden cursor-pointer"
                  >
                    <ProductImageZoom
                      productId={saucepan.id}
                      src={saucepan.image}
                      alt={saucepan.name}
                      isParentHovered={isFocused}
                      containerClassName="w-full h-full flex items-center justify-center"
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center bg-white">
                    <div className="flex gap-2 items-center mb-4">
                      <div className="font-karla text-[10px] bg-platinum-gray text-charcoal-matte/80 inline-block px-3 py-1 rounded-sm tracking-widest uppercase font-bold">
                        {activeTab === 'tri-ply' ? 'TRIDENT SERIES' : 'TRICOMB PROTECTION'}
                      </div>
                      {isFocused && (
                        <span className="font-mono text-[8px] font-bold bg-heritage-red text-white px-2 py-0.5 rounded tracking-wider shadow animate-pulse uppercase">
                          Selected
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between items-start gap-2 mb-3">
                      <div className="flex flex-col text-left">
                        <h2 
                          onClick={() => onNavigate('product-detail', saucepan.id)}
                          className="font-display text-3xl md:text-4xl text-charcoal-matte hover:text-heritage-red transition-colors font-semibold leading-tight cursor-pointer"
                        >
                          {saucepan.name}
                        </h2>
                        <span className="text-xs font-bold text-heritage-red uppercase tracking-wider mt-1.5">
                          {activeTab === 'tri-ply' ? 'Trident Series' : 'Tricomb Series'}
                        </span>
                      </div>
                      {saucepan.prices?.[selectedSizes[saucepan.id] || saucepan.sizes[0]] && (
                        <div className="text-right flex flex-col items-end whitespace-nowrap pt-1">
                          <span className="text-[9px] font-karla text-tertiary">MRP (INR)</span>
                          <span className="font-display text-lg font-bold text-heritage-red">
                            ₹{saucepan.prices[selectedSizes[saucepan.id] || saucepan.sizes[0]].toLocaleString('en-IN')}
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="font-body-md text-sm text-on-surface-variant mb-6 leading-relaxed font-sans">
                      {saucepan.description}
                    </p>
                    
                    {renderSizeSelectors(saucepan, selectedSizes[saucepan.id] || saucepan.sizes[0])}

                    <div className="grid grid-cols-2 gap-4 mt-auto">
                      <button 
                        onClick={() => handleAddToCartClick(saucepan)}
                        className="bg-[#BE1E2D] hover:bg-primary text-white font-sans py-4 px-3 text-xs font-bold leading-tight uppercase tracking-wider text-center flex-1 transition-all duration-300"
                      >
                        Add to<br/>Enquiry<br/>List
                      </button>
                      <button 
                        onClick={() => handleWhatsAppProduct(saucepan)}
                        className="bg-white border border-charcoal-matte text-charcoal-matte hover:text-heritage-red hover:border-heritage-red font-sans py-4 px-3 text-xs font-bold leading-tight uppercase tracking-wider text-center flex-1 transition-all duration-300"
                      >
                        Enquire<br/>on<br/>WhatsApp
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })()}

            {/* Product 2: Frypan (Bento Style Vertical - col-span-4) */}
            {frypan && (() => {
              const isFocused = focusedIndex === frypanIndex;
              return (
                <motion.div 
                  id={`prod-card-${frypan.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setFocusedIndex(frypanIndex)}
                  onMouseLeave={() => setFocusedIndex(-1)}
                  className={`scroll-mt-24 md:col-span-4 bg-white group relative flex flex-col transition-all duration-500 rounded-sm border ${
                    isFocused 
                      ? 'ring-2 ring-heritage-red ring-offset-4 border-heritage-red shadow-xl z-30' 
                      : 'border-platinum-gray/10 hover:shadow-xl z-10'
                  }`}
                >
                  <div 
                    onClick={() => onNavigate('product-detail', frypan.id)}
                    className="w-full aspect-[4/3] md:aspect-square bg-white p-2 flex items-center justify-center overflow-hidden cursor-pointer"
                  >
                    <ProductImageZoom
                      productId={frypan.id}
                      src={frypan.image}
                      alt={frypan.name}
                      isParentHovered={isFocused}
                      containerClassName="w-full h-full flex items-center justify-center"
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-8 md:p-10 flex flex-col flex-grow bg-white border-t border-platinum-gray/10">
                    <div className="flex gap-2 items-center mb-4">
                      <div className="font-karla text-[10px] bg-platinum-gray text-charcoal-matte/80 inline-block px-3 py-1 rounded-sm tracking-widest uppercase font-bold">
                        {activeTab === 'tri-ply' ? 'NON-STICK COATING' : 'TRICOMB PROTECTION'}
                      </div>
                      {isFocused && (
                        <span className="font-mono text-[8px] font-bold bg-heritage-red text-white px-2 py-0.5 rounded tracking-wider shadow animate-pulse uppercase">
                          Selected
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between items-start gap-2 mb-3">
                      <div className="flex flex-col text-left">
                        <h2 
                          onClick={() => onNavigate('product-detail', frypan.id)}
                          className="font-display text-2xl text-charcoal-matte hover:text-heritage-red transition-colors font-semibold leading-tight cursor-pointer"
                        >
                          {frypan.name}
                        </h2>
                        <span className="text-xs font-bold text-heritage-red uppercase tracking-wider mt-1.5">
                          {activeTab === 'tri-ply' ? 'Trident Series' : 'Tricomb Series'}
                        </span>
                      </div>
                      {frypan.prices?.[selectedSizes[frypan.id] || frypan.sizes[0]] && (
                        <div className="text-right flex flex-col items-end whitespace-nowrap pt-1">
                          <span className="text-[9px] font-karla text-tertiary">MRP (INR)</span>
                          <span className="font-display text-base font-bold text-heritage-red">
                            ₹{frypan.prices[selectedSizes[frypan.id] || frypan.sizes[0]].toLocaleString('en-IN')}
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="font-body-md text-sm text-on-surface-variant mb-6 leading-relaxed font-sans">
                      {frypan.description}
                    </p>
                    
                    {renderSizeSelectors(frypan, selectedSizes[frypan.id] || frypan.sizes[0])}

                    <div className="flex flex-col gap-3 mt-auto">
                      <button 
                        onClick={() => handleAddToCartClick(frypan)}
                        className="bg-[#BE1E2D] hover:bg-primary text-white font-sans py-4 px-6 text-xs font-bold uppercase tracking-wider text-center w-full transition-all duration-300"
                      >
                        Add to Enquiry List
                      </button>
                      <button 
                        onClick={() => handleWhatsAppProduct(frypan)}
                        className="font-sans text-center text-charcoal-matte/60 hover:text-heritage-red transition-all duration-300 py-2 text-[11px] tracking-wider font-semibold"
                      >
                        Enquire on WhatsApp
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })()}

            {/* Product 3: Sauce Pot (Bento Style Large - Reversed - col-span-8) */}
            {saucepot && (() => {
              const isFocused = focusedIndex === saucepotIndex;
              return (
                <motion.div 
                  id={`prod-card-${saucepot.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setFocusedIndex(saucepotIndex)}
                  onMouseLeave={() => setFocusedIndex(-1)}
                  className={`scroll-mt-24 md:col-span-8 bg-white group relative flex flex-col md:flex-row-reverse transition-all duration-500 rounded-sm border ${
                    isFocused 
                      ? 'ring-2 ring-heritage-red ring-offset-4 border-heritage-red shadow-xl z-30' 
                      : 'border-platinum-gray/10 hover:shadow-xl z-10'
                  }`}
                >
                  <div 
                    onClick={() => onNavigate('product-detail', saucepot.id)}
                    className="w-full md:w-1/2 aspect-square md:aspect-auto bg-white p-2 flex items-center justify-center overflow-hidden cursor-pointer"
                  >
                    <ProductImageZoom
                      productId={saucepot.id}
                      src={saucepot.image}
                      alt={saucepot.name}
                      isParentHovered={isFocused}
                      containerClassName="w-full h-full flex items-center justify-center"
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center bg-white">
                    <div className="flex gap-2 items-center mb-4">
                      <div className="font-karla text-[10px] bg-platinum-gray text-charcoal-matte/80 inline-block px-3 py-1 rounded-sm tracking-widest uppercase font-bold">
                        {activeTab === 'tri-ply' ? 'HEAVY GAUGE' : 'REINFORCED BASE'}
                      </div>
                      {isFocused && (
                        <span className="font-mono text-[8px] font-bold bg-heritage-red text-white px-2 py-0.5 rounded tracking-wider shadow animate-pulse uppercase">
                          Selected
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between items-start gap-2 mb-3">
                      <div className="flex flex-col text-left">
                        <h2 
                          onClick={() => onNavigate('product-detail', saucepot.id)}
                          className="font-display text-3xl md:text-4xl text-charcoal-matte hover:text-heritage-red transition-colors font-semibold leading-tight cursor-pointer"
                        >
                          {saucepot.name}
                        </h2>
                        <span className="text-xs font-bold text-heritage-red uppercase tracking-wider mt-1.5">
                          {activeTab === 'tri-ply' ? 'Trident Series' : 'Tricomb Series'}
                        </span>
                      </div>
                      {saucepot.prices?.[selectedSizes[saucepot.id] || saucepot.sizes[0]] && (
                        <div className="text-right flex flex-col items-end whitespace-nowrap pt-1">
                          <span className="text-[9px] font-karla text-tertiary">MRP (INR)</span>
                          <span className="font-display text-lg font-bold text-heritage-red">
                            ₹{saucepot.prices[selectedSizes[saucepot.id] || saucepot.sizes[0]].toLocaleString('en-IN')}
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="font-body-md text-sm text-on-surface-variant mb-6 leading-relaxed font-sans">
                      {saucepot.description}
                    </p>
                    
                    {renderSizeSelectors(saucepot, selectedSizes[saucepot.id] || saucepot.sizes[0])}

                    <div className="grid grid-cols-2 gap-4 mt-auto">
                      <button 
                        onClick={() => handleAddToCartClick(saucepot)}
                        className="bg-[#BE1E2D] hover:bg-primary text-white font-sans py-4 px-3 text-xs font-bold leading-tight uppercase tracking-wider text-center flex-1 transition-all duration-300"
                      >
                        Add to<br/>Enquiry<br/>List
                      </button>
                      <button 
                        onClick={() => handleWhatsAppProduct(saucepot)}
                        className="bg-white border border-charcoal-matte text-charcoal-matte hover:text-heritage-red hover:border-heritage-red font-sans py-4 px-3 text-xs font-bold leading-tight uppercase tracking-wider text-center flex-1 transition-all duration-300"
                      >
                        Enquire<br/>on<br/>WhatsApp
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })()}

            {/* Product 4: Kadhai (Bento Style Vertical - col-span-4) */}
            {kadhai && (() => {
              const isFocused = focusedIndex === kadhaiIndex;
              return (
                <motion.div 
                  id={`prod-card-${kadhai.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setFocusedIndex(kadhaiIndex)}
                  onMouseLeave={() => setFocusedIndex(-1)}
                  className={`scroll-mt-24 md:col-span-4 bg-white group relative flex flex-col transition-all duration-500 rounded-sm border ${
                    isFocused 
                      ? 'ring-2 ring-heritage-red ring-offset-4 border-heritage-red shadow-xl z-30' 
                      : 'border-platinum-gray/10 hover:shadow-xl z-10'
                  }`}
                >
                  <div 
                    onClick={() => onNavigate('product-detail', kadhai.id)}
                    className="w-full aspect-[4/3] md:aspect-square bg-white p-2 flex items-center justify-center overflow-hidden cursor-pointer"
                  >
                    <ProductImageZoom
                      productId={kadhai.id}
                      src={kadhai.image}
                      alt={kadhai.name}
                      isParentHovered={isFocused}
                      containerClassName="w-full h-full flex items-center justify-center"
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-8 md:p-10 flex flex-col flex-grow bg-white border-t border-platinum-gray/10">
                    <div className="flex gap-2 items-center mb-4">
                      <div className="font-karla text-[10px] bg-platinum-gray text-charcoal-matte/80 inline-block px-3 py-1 rounded-sm tracking-widest uppercase font-bold">
                        {activeTab === 'tri-ply' ? 'TRIDENT SERIES' : 'TRICOMB CLADDING'}
                      </div>
                      {isFocused && (
                        <span className="font-mono text-[8px] font-bold bg-heritage-red text-white px-2 py-0.5 rounded tracking-wider shadow animate-pulse uppercase">
                          Selected
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between items-start gap-2 mb-3">
                      <div className="flex flex-col text-left">
                        <h2 
                          onClick={() => onNavigate('product-detail', kadhai.id)}
                          className="font-display text-2xl text-charcoal-matte hover:text-heritage-red transition-colors font-semibold leading-tight cursor-pointer"
                        >
                          {kadhai.name}
                        </h2>
                        <span className="text-xs font-bold text-heritage-red uppercase tracking-wider mt-1.5">
                          {activeTab === 'tri-ply' ? 'Trident Series' : 'Tricomb Series'}
                        </span>
                      </div>
                      {kadhai.prices?.[selectedSizes[kadhai.id] || kadhai.sizes[0]] && (
                        <div className="text-right flex flex-col items-end whitespace-nowrap pt-1">
                          <span className="text-[9px] font-karla text-tertiary">MRP (INR)</span>
                          <span className="font-display text-base font-bold text-heritage-red">
                            ₹{kadhai.prices[selectedSizes[kadhai.id] || kadhai.sizes[0]].toLocaleString('en-IN')}
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="font-body-md text-sm text-on-surface-variant mb-6 leading-relaxed font-sans">
                      {kadhai.description}
                    </p>
                    
                    {renderSizeSelectors(kadhai, selectedSizes[kadhai.id] || kadhai.sizes[0])}

                    <div className="flex flex-col gap-3 mt-auto">
                      <button 
                        onClick={() => handleAddToCartClick(kadhai)}
                        className="bg-[#BE1E2D] hover:bg-primary text-white font-sans py-4 px-6 text-xs font-bold uppercase tracking-wider text-center w-full transition-all duration-300"
                      >
                        Add to Enquiry List
                      </button>
                      <button 
                        onClick={() => handleWhatsAppProduct(kadhai)}
                        className="font-sans text-center text-charcoal-matte/60 hover:text-heritage-red transition-all duration-300 py-2 text-[11px] tracking-wider font-semibold"
                      >
                        Enquire on WhatsApp
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })()}

          </div>

          {/* Traditional Masterpieces Section */}
          <div className="mt-28">
            <h3 className="font-display-xl text-3xl md:text-4xl text-charcoal-matte mb-12 text-center font-semibold">
              Traditional Masterpieces
            </h3>
            <div className={`grid grid-cols-1 ${activeTab === 'tri-ply' ? 'md:grid-cols-2' : 'max-w-3xl mx-auto'} gap-8`}>
              
              {/* Tope */}
              {tope && (() => {
                const isFocused = focusedIndex === topeIndex;
                return (
                  <motion.div 
                    id={`prod-card-${tope.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                    onMouseEnter={() => setFocusedIndex(topeIndex)}
                    onMouseLeave={() => setFocusedIndex(-1)}
                    className={`scroll-mt-24 bg-white group flex flex-col sm:flex-row items-center transition-all duration-500 p-6 md:p-8 rounded-sm border ${
                      isFocused 
                        ? 'ring-2 ring-heritage-red ring-offset-4 border-heritage-red shadow-lg z-30' 
                        : 'border-platinum-gray/10 hover:shadow-lg z-10'
                    }`}
                  >
                    <div 
                      onClick={() => onNavigate('product-detail', tope.id)}
                      className="w-full sm:w-1/2 aspect-square overflow-hidden rounded bg-white p-6 flex items-center justify-center cursor-pointer"
                    >
                      <ProductImageZoom
                        productId={tope.id}
                        src={tope.image}
                        alt={tope.name}
                        isParentHovered={isFocused}
                        containerClassName="w-full h-full flex items-center justify-center"
                        className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="sm:pl-8 md:pl-10 text-center sm:text-left flex-1 mt-6 sm:mt-0 flex flex-col justify-between h-full">
                      <div>
                        <div className="flex gap-2 items-center mb-2">
                          {isFocused && (
                            <span className="font-mono text-[8px] font-bold bg-heritage-red text-white px-2 py-0.5 rounded tracking-wider shadow animate-pulse uppercase">
                              Selected
                            </span>
                          )}
                        </div>
                        <div className="flex justify-between items-start gap-2 mb-3">
                          <div className="flex flex-col text-left">
                            <h4 
                              onClick={() => onNavigate('product-detail', tope.id)}
                              className="font-display text-xl md:text-2xl text-charcoal-matte hover:text-heritage-red transition-colors font-semibold leading-tight text-left cursor-pointer"
                            >
                              {tope.name}
                            </h4>
                            <span className="text-[10px] font-bold text-heritage-red uppercase tracking-wider mt-1">
                              Trident Series
                            </span>
                          </div>
                          {tope.prices?.[selectedSizes[tope.id] || tope.sizes[0]] && (
                            <div className="text-right flex flex-col items-end whitespace-nowrap pt-1">
                              <span className="text-[9px] font-karla text-tertiary">MRP (INR)</span>
                              <span className="font-display text-base font-bold text-heritage-red">
                                ₹{tope.prices[selectedSizes[tope.id] || tope.sizes[0]].toLocaleString('en-IN')}
                              </span>
                            </div>
                          )}
                        </div>
                        <p className="font-body-md text-xs text-on-surface-variant leading-relaxed mb-6 opacity-80 text-left font-sans">
                          {tope.description}
                        </p>
                        
                        <div className="text-left">
                          {renderSizeSelectors(tope, selectedSizes[tope.id] || tope.sizes[0])}
                        </div>
                      </div>
                      <div className="flex flex-col gap-3 mt-auto">
                        <button 
                          onClick={() => handleAddToCartClick(tope)}
                          className="font-karla text-charcoal-matte hover:text-heritage-red transition-all uppercase text-[10px] tracking-widest font-bold text-left underline underline-offset-8 decoration-charcoal-matte/25 hover:decoration-heritage-red self-center sm:self-start"
                        >
                          ADD TO ENQUIRY LIST
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}

              {/* Tasla */}
              {tasla && (() => {
                const isFocused = focusedIndex === taslaIndex;
                return (
                  <motion.div 
                    id={`prod-card-${tasla.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    onMouseEnter={() => setFocusedIndex(taslaIndex)}
                    onMouseLeave={() => setFocusedIndex(-1)}
                    className={`scroll-mt-24 bg-white group flex flex-col sm:flex-row items-center transition-all duration-500 p-6 md:p-8 rounded-sm border ${
                      isFocused 
                        ? 'ring-2 ring-heritage-red ring-offset-4 border-heritage-red shadow-lg z-30' 
                        : 'border-platinum-gray/10 hover:shadow-lg z-10'
                    }`}
                  >
                    <div 
                      onClick={() => onNavigate('product-detail', tasla.id)}
                      className="w-full sm:w-1/2 aspect-square overflow-hidden rounded bg-white p-6 flex items-center justify-center cursor-pointer"
                    >
                      <ProductImageZoom
                        productId={tasla.id}
                        src={tasla.image}
                        alt={tasla.name}
                        isParentHovered={isFocused}
                        containerClassName="w-full h-full flex items-center justify-center"
                        className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="sm:pl-8 md:pl-10 text-center sm:text-left flex-1 mt-6 sm:mt-0 flex flex-col justify-between h-full">
                      <div>
                        <div className="flex gap-2 items-center mb-2">
                          {isFocused && (
                            <span className="font-mono text-[8px] font-bold bg-heritage-red text-white px-2 py-0.5 rounded tracking-wider shadow animate-pulse uppercase">
                              Selected
                            </span>
                          )}
                        </div>
                        <div className="flex justify-between items-start gap-2 mb-3">
                          <div className="flex flex-col text-left">
                            <h4 
                              onClick={() => onNavigate('product-detail', tasla.id)}
                              className="font-display text-xl md:text-2xl text-charcoal-matte hover:text-heritage-red transition-colors font-semibold leading-tight text-left cursor-pointer"
                            >
                              {tasla.name}
                            </h4>
                            <span className="text-[10px] font-bold text-heritage-red uppercase tracking-wider mt-1">
                              {activeTab === 'tri-ply' ? 'Trident Series' : 'Tricomb Series'}
                            </span>
                          </div>
                          {tasla.prices?.[selectedSizes[tasla.id] || tasla.sizes[0]] && (
                            <div className="text-right flex flex-col items-end whitespace-nowrap pt-1">
                              <span className="text-[9px] font-karla text-tertiary">MRP (INR)</span>
                              <span className="font-display text-base font-bold text-heritage-red">
                                ₹{tasla.prices[selectedSizes[tasla.id] || tasla.sizes[0]].toLocaleString('en-IN')}
                              </span>
                            </div>
                          )}
                        </div>
                        <p className="font-body-md text-xs text-on-surface-variant leading-relaxed mb-6 opacity-80 text-left font-sans">
                          {tasla.description}
                        </p>
                        
                        <div className="text-left">
                          {renderSizeSelectors(tasla, selectedSizes[tasla.id] || tasla.sizes[0])}
                        </div>
                      </div>
                      <div className="flex flex-col gap-3 mt-auto">
                        <button 
                          onClick={() => handleAddToCartClick(tasla)}
                          className="font-karla text-charcoal-matte hover:text-heritage-red transition-all uppercase text-[10px] tracking-widest font-bold text-left underline underline-offset-8 decoration-charcoal-matte/25 hover:decoration-heritage-red self-center sm:self-start"
                        >
                          ADD TO ENQUIRY LIST
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}

            </div>
          </div>
        </>
        )}
        </motion.main>
      </AnimatePresence>

      {/* Latest Launch Banner for Tricomb Series (shown on Trident Series page) */}
      {activeTab === 'tri-ply' && (
        <section className="w-full max-w-[1440px] mx-auto px-6 md:px-16 mt-16 mb-12">
          <div 
            className="rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl transition-all duration-500 relative overflow-hidden text-white group"
            style={{
              backgroundImage: "linear-gradient(rgba(10, 10, 10, 0.85), rgba(15, 15, 15, 0.95)), url('https://lh3.googleusercontent.com/d/1-FMRYQDaak4h_J-OevHWr6epZMTHv3p3')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 z-10 relative">
              <div className="space-y-4 max-w-2xl text-left">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 bg-heritage-red/25 text-heritage-red font-mono text-[10px] font-black uppercase tracking-widest rounded-full border border-heritage-red/40 backdrop-blur-xs animate-pulse">
                    ★ Latest Launch
                  </span>
                  <span className="font-mono text-[10px] text-white/60 uppercase tracking-widest font-semibold">
                    Hybrid Non-Stick Cookware
                  </span>
                </div>

                <h3 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-white uppercase tracking-tight">
                  Tricomb Series
                </h3>

                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans">
                  A revolutionary breakthrough in culinary metallurgy. Our premium <strong className="text-white font-semibold">Tricomb Series</strong> combines heavy-duty 304 tri-ply cladding with an advanced laser-etched stainless steel honeycomb protection grid. 100% scratch-proof, metal-spatula friendly, and effortless non-stick performance.
                </p>

                {/* Quick Product Grid Preview */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div 
                    onClick={() => {
                      setActiveTab('honeycomb');
                      onNavigate('product-detail', 'hc-dosatawa');
                    }}
                    className="bg-black/50 backdrop-blur-sm rounded-xl border border-white/10 p-3 text-center flex flex-col items-center hover:border-heritage-red/50 hover:bg-black/70 transition-all cursor-pointer group/card"
                  >
                    <img src="https://lh3.googleusercontent.com/d/1sqPVzUBixHwAfQZ5g-6zZgmXrVhH5kCq" alt="Honeycomb Dosa Tawa" className="h-16 w-auto object-contain mb-2 transition-transform group-hover/card:scale-105" referrerPolicy="no-referrer" />
                    <span className="text-[10px] font-bold text-white uppercase group-hover/card:text-heritage-red transition-colors">Dosa Tawa</span>
                    <span className="text-[8px] font-mono text-heritage-red font-bold">Tricomb Series</span>
                  </div>
                  <div 
                    onClick={() => {
                      setActiveTab('honeycomb');
                      onNavigate('product-detail', 'hc-rotitawa');
                    }}
                    className="bg-black/50 backdrop-blur-sm rounded-xl border border-white/10 p-3 text-center flex flex-col items-center hover:border-heritage-red/50 hover:bg-black/70 transition-all cursor-pointer group/card"
                  >
                    <img src="https://lh3.googleusercontent.com/d/1OY5DBQ717wT7gHj5Tp2rWYfexJumJ4lQ" alt="Honeycomb Roti Tawa" className="h-16 w-auto object-contain mb-2 transition-transform group-hover/card:scale-105" referrerPolicy="no-referrer" />
                    <span className="text-[10px] font-bold text-white uppercase group-hover/card:text-heritage-red transition-colors">Roti Tawa</span>
                    <span className="text-[8px] font-mono text-heritage-red font-bold">Tricomb Series</span>
                  </div>
                  <div 
                    onClick={() => {
                      setActiveTab('honeycomb');
                      onNavigate('product-detail', 'hc-kadhai');
                    }}
                    className="bg-black/50 backdrop-blur-sm rounded-xl border border-white/10 p-3 text-center flex flex-col items-center hover:border-heritage-red/50 hover:bg-black/70 transition-all cursor-pointer group/card"
                  >
                    <img src="https://lh3.googleusercontent.com/d/188EKwnvP8EKVvJCFgoRd_atX9BH8oUki" alt="Honeycomb Kadhai" className="h-16 w-auto object-contain mb-2 transition-transform group-hover/card:scale-105" referrerPolicy="no-referrer" />
                    <span className="text-[10px] font-bold text-white uppercase group-hover/card:text-heritage-red transition-colors">Kadhai</span>
                    <span className="text-[8px] font-mono text-heritage-red font-bold">Tricomb Series</span>
                  </div>
                  <div 
                    onClick={() => {
                      setActiveTab('honeycomb');
                      onNavigate('product-detail', 'hc-frypan');
                    }}
                    className="bg-black/50 backdrop-blur-sm rounded-xl border border-white/10 p-3 text-center flex flex-col items-center hover:border-heritage-red/50 hover:bg-black/70 transition-all cursor-pointer group/card"
                  >
                    <img src="https://lh3.googleusercontent.com/d/1Fa_rCMs-g7JC8VkH5Ibgg4cvyGzUXhiE" alt="Honeycomb Frypan" className="h-16 w-auto object-contain mb-2 transition-transform group-hover/card:scale-105" referrerPolicy="no-referrer" />
                    <span className="text-[10px] font-bold text-white uppercase group-hover/card:text-heritage-red transition-colors">Frypan</span>
                    <span className="text-[8px] font-mono text-heritage-red font-bold">Tricomb Series</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center lg:items-end justify-center w-full lg:w-auto shrink-0 pt-4 lg:pt-0">
                <button 
                  onClick={() => {
                    setActiveTab('honeycomb');
                    onNavigate('cookware-honeycomb');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto bg-white text-charcoal-matte hover:bg-heritage-red hover:text-white hover:scale-[1.03] active:scale-[0.97] text-xs font-black uppercase tracking-wider px-8 py-4.5 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl text-center cursor-pointer flex items-center justify-center gap-3 border border-white/20"
                >
                  <span>Discover our Tricomb series</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Standard Features Section */}
      <section className="w-full border-t border-platinum-gray/35 py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
          
          <div className="flex flex-col items-center text-center px-4 group">
            <ShieldCheck size={36} className="text-golden-ochre mb-5 transition-transform group-hover:-translate-y-1 duration-300" />
            <h5 className="font-label-md text-charcoal-matte mb-2 tracking-wider uppercase text-xs font-bold">ISI Certified</h5>
            <p className="font-body-md text-xs text-on-surface-variant opacity-75">Guaranteed quality standards for every kitchen.</p>
          </div>
          
          <div className="flex flex-col items-center text-center px-4 group">
            <Zap size={36} className="text-golden-ochre mb-5 transition-transform group-hover:-translate-y-1 duration-300" />
            <h5 className="font-label-md text-charcoal-matte mb-2 tracking-wider uppercase text-xs font-bold">Energy Efficient</h5>
            <p className="font-body-md text-xs text-on-surface-variant opacity-75">Engineered for optimal heat conduction and saving.</p>
          </div>
          
          <div className="flex flex-col items-center text-center px-4 group">
            <Sparkles size={36} className="text-golden-ochre mb-5 transition-transform group-hover:-translate-y-1 duration-300" />
            <h5 className="font-label-md text-charcoal-matte mb-2 tracking-wider uppercase text-xs font-bold">Easy to Clean</h5>
            <p className="font-body-md text-xs text-on-surface-variant opacity-75">Premium surfaces for hassle-free maintenance.</p>
          </div>
          
          <div className="flex flex-col items-center text-center px-4 group">
            <Award size={36} className="text-golden-ochre mb-5 transition-transform group-hover:-translate-y-1 duration-300" />
            <h5 className="font-label-md text-charcoal-matte mb-2 tracking-wider uppercase text-xs font-bold">5 Year Warranty</h5>
            <p className="font-body-md text-xs text-on-surface-variant opacity-75">A promise of enduring beauty and performance.</p>
          </div>

        </div>
      </section>
    </div>
  );
};
