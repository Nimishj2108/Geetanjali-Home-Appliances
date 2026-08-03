import React, { useState, useEffect, useRef } from 'react';
import { PageType, CartItem } from '../types';
import { PRODUCTS, Product, formatSku } from '../products';
import { CheckCircle, Sparkles, Send, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { SizeDimensionsOverlay } from './SizeDimensionsOverlay';
import { ProductImageZoom } from './ProductImageZoom';

const PressureCookersSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse w-full">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg overflow-hidden flex flex-col border border-platinum-gray/25 shadow-sm">
          {/* Image skeleton */}
          <div className="h-64 sm:h-72 w-full bg-platinum-gray/10 flex items-center justify-center border-b border-platinum-gray/20">
            <div className="w-24 h-24 rounded-full bg-platinum-gray/20" />
          </div>
          
          {/* Info skeleton */}
          <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start gap-4 mb-3">
                <div className="h-6 bg-platinum-gray/20 rounded w-2/3" />
                <div className="h-6 bg-platinum-gray/20 rounded w-1/4" />
              </div>
              <div className="h-3 bg-platinum-gray/15 rounded w-1/3 mb-5" />
              <div className="space-y-2 mb-6">
                <div className="h-3 bg-platinum-gray/15 rounded w-full" />
                <div className="h-3 bg-platinum-gray/15 rounded w-5/6" />
                <div className="h-3 bg-platinum-gray/15 rounded w-4/5" />
              </div>
              
              {/* Sizing badges skeleton */}
              <div className="mb-8">
                <div className="h-3 bg-platinum-gray/15 rounded w-1/4 mb-3" />
                <div className="flex gap-2">
                  <div className="w-12 h-10 rounded bg-platinum-gray/15" />
                  <div className="w-12 h-10 rounded bg-platinum-gray/15" />
                  <div className="w-12 h-10 rounded bg-platinum-gray/15" />
                </div>
              </div>
            </div>
            
            {/* Buttons skeleton */}
            <div className="space-y-3 pt-4 border-t border-platinum-gray/10">
              <div className="w-full h-12 rounded bg-platinum-gray/20" />
              <div className="w-full h-12 rounded bg-platinum-gray/15" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

interface PressureCookersViewProps {
  initialSubCategory?: string; // 'all' | 'stainless-steel' | 'tri-ply' | 'black-beauty' | 'heritage-aluminum'
  onAddToCart: (productId: string, size: string) => void;
  onNavigate: (page: any, targetId?: string) => void;
}

export const PressureCookersView: React.FC<PressureCookersViewProps> = ({
  initialSubCategory = 'all',
  onAddToCart,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialSubCategory);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({
    'tp-contura': '5.0L',
    'tp-handi': '3.0L',
    'tp-regular': '5.0L'
  });
  const [addedProductNotification, setAddedProductNotification] = useState<string | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const isKeyboardFocusRef = useRef<boolean>(false);
  const [isTabLoading, setIsTabLoading] = useState<boolean>(false);
  const [hoveredSize, setHoveredSize] = useState<{ productId: string; size: string } | null>(null);

  // Sync state if initialSubCategory changes
  useEffect(() => {
    setActiveTab(initialSubCategory);
    setFocusedIndex(-1);
  }, [initialSubCategory]);

  // Reset focus index and trigger skeleton load when switching active tab
  useEffect(() => {
    setFocusedIndex(-1);
    setIsTabLoading(true);
    const timer = setTimeout(() => {
      setIsTabLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const collections = [
    {
      id: 'tri-ply',
      title: 'Trinity Series',
      tag: 'Tri-ply',
      badgeTag: 'PREMIUM TRI-PLY',
      desc: 'Engineered with advanced SAS 3-layer cladding (Stainless Steel - Aluminum - Stainless Steel) for rapid, uniform heat distribution, zero hot-spots, and unmatched fuel efficiency.',
      image: 'https://lh3.googleusercontent.com/d/1r4Hioo4DlMui9O7fbR3HBxOHvibsd5Jp',
      buttonText: 'VIEW COLLECTION',
      bulletPoints: ['SAS 3-Layer Bonding', 'Induction & Gas Friendly', 'No Scorching or Hot Spots', 'Double-Riveted Cool Handles']
    },
    {
      id: 'stainless-steel',
      title: 'Stello Series',
      tag: 'Stainless Steel',
      badgeTag: 'SURGICAL STEEL',
      desc: 'Crafted from surgical-grade AISI 304 stainless steel with a heavy-gauge impact-bonded sandwich base, combining timeless elegance with lifelong durability.',
      image: 'https://lh3.googleusercontent.com/d/1dL6QLa2vu4WC4n0Agu3HYDrIGklww3Bz',
      buttonText: 'VIEW COLLECTION',
      bulletPoints: ['304 Food Grade Steel', 'Sandwich Induction Bottom', 'High-Gloss Mirror Finish', 'Precision Pressure Weight']
    },
    {
      id: 'heritage-aluminum',
      title: 'Alex Series: The Architect\'s Choice',
      tag: 'Heritage Aluminum',
      badgeTag: 'VIRGIN ALUMINUM',
      desc: 'Forged from 99.9% pure virgin aluminum for flawless heat conductivity, rugged daily performance, and enduring structural integrity.',
      image: 'https://lh3.googleusercontent.com/d/1bjCqB0TRduHVsu6TeGZ9CK19-oeibgY5',
      buttonText: 'VIEW COLLECTION',
      bulletPoints: ['99.9% Pure Virgin Aluminum', 'Heavy Sturdy Wall Gauge', 'ISI Mark of Safety', 'Anti-Bulge Base Engineering']
    },
    {
      id: 'black-beauty',
      title: 'Black Beauty Series',
      tag: 'Black Beauty',
      badgeTag: 'HARD ANODIZED',
      desc: 'Features a high-density hard anodized finish that is non-reactive, scratch-proof, and twice as hard as stainless steel for effortless gourmet cooking.',
      image: 'https://lh3.googleusercontent.com/d/1EfTFrNwtvhmWsGFMUdVxgG-kStyUTkZ8',
      buttonText: 'VIEW COLLECTION',
      bulletPoints: ['Hard Anodized Aluminum', 'Absorbs Heat Exceptionally Fast', 'Acid & Corrosion Resistant', 'Elite Dark Obsidian Polish']
    },
  ];

  // Filter products by active tab category
  const activeCollection = collections.find(c => c.id === activeTab);
  const filteredProducts = PRODUCTS.filter(p => {
    if (activeTab === 'all') {
      return ['Stainless Steel', 'Tri-ply', 'Black Beauty', 'Heritage Aluminum'].includes(p.category);
    }
    return activeCollection && p.category === activeCollection.tag;
  });

  const handleSizeSelect = (productId: string, size: string) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const handleAddToCartClick = (product: Product) => {
    const size = selectedSizes[product.id] || product.sizes[0];
    onAddToCart(product.id, size);
    setAddedProductNotification(product.name);
    setTimeout(() => setAddedProductNotification(null), 3000);
  };

  const handleWhatsAppProduct = (product: Product) => {
    const size = selectedSizes[product.id] || product.sizes[0];
    const text = `Hello Geetanjali Home Appliances, I am interested in inquiring about "${product.name}" in size ${size}. Please share availability and details.`;
    window.open(`https://wa.me/919205293094?text=${encodeURIComponent(text)}`, '_blank');
    window.dispatchEvent(new CustomEvent('whatsapp-inquiry-sent', { detail: { text } }));
  };

  // Keyboard Navigation Support
  useEffect(() => {
    if (activeTab === 'all' || filteredProducts.length === 0) return;

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
          if (nextIdx >= filteredProducts.length) return 0;
          return nextIdx;
        });
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        isKeyboardFocusRef.current = true;
        setFocusedIndex((prev) => {
          const prevIdx = prev - 1;
          if (prevIdx < 0) return filteredProducts.length - 1;
          return prevIdx;
        });
      } else if (e.key === 'Enter') {
        if (focusedIndex >= 0 && focusedIndex < filteredProducts.length) {
          e.preventDefault();
          onNavigate('product-detail', filteredProducts[focusedIndex].id);
        }
      } else if (e.key === 'Escape') {
        setFocusedIndex(-1);
      } else if (e.key.toLowerCase() === 'a') {
        if (focusedIndex >= 0 && focusedIndex < filteredProducts.length) {
          e.preventDefault();
          handleAddToCartClick(filteredProducts[focusedIndex]);
        }
      } else if (e.key.toLowerCase() === 'w') {
        if (focusedIndex >= 0 && focusedIndex < filteredProducts.length) {
          e.preventDefault();
          handleWhatsAppProduct(filteredProducts[focusedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeTab, filteredProducts, focusedIndex, onNavigate]);

  // Handle smooth scroll when focused card changes
  useEffect(() => {
    if (focusedIndex >= 0 && isKeyboardFocusRef.current) {
      const el = document.getElementById(`prod-card-${focusedIndex}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      isKeyboardFocusRef.current = false;
    }
  }, [focusedIndex]);

  return (
    <div className="w-full bg-[#FAF9F7] min-h-screen pb-16">
      {/* Toast Notification */}
      {addedProductNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-charcoal-matte text-white px-6 py-4 rounded shadow-2xl flex items-center gap-3 border-l-4 border-heritage-red animate-slide-in">
          <CheckCircle size={18} className="text-heritage-red" />
          <span className="font-label-md text-xs">{addedProductNotification} added to Enquiry Selection list.</span>
        </div>
      )}

      {/* Header Section */}
      <header className="w-full px-6 md:px-16 pt-32 pb-10 max-w-[1440px] mx-auto text-center flex flex-col items-center relative border-b border-platinum-gray/10">
        {activeTab !== 'all' && (
          <button
            onClick={() => {
              setActiveTab('all');
              onNavigate('pressure-cookers');
            }}
            className="absolute left-6 md:left-16 top-32 flex items-center gap-1.5 text-xs text-charcoal-matte/60 hover:text-heritage-red font-semibold transition-all group font-sans active:scale-95"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
            <span>Show All Collections</span>
          </button>
        )}
        
        <span className="font-karla text-xs md:text-sm text-golden-ochre uppercase tracking-[0.25em] mb-3 block font-bold">
          ESTABLISHED 1997
        </span>
        
        <h1 className="font-display text-5xl sm:text-6.5xl md:text-7.5xl lg:text-8xl text-charcoal-matte mb-6 leading-[1.05] max-w-5xl font-bold tracking-tight">
          {activeTab === 'all' ? (
            <>
              Heritage in Every <br />
              <span className="italic text-heritage-red">Revolution.</span>
            </>
          ) : (
            <span className="text-heritage-red uppercase">{activeCollection?.title}</span>
          )}
        </h1>
        
        <p className="font-body-lg text-body-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed opacity-85">
          {activeTab === 'all' 
            ? 'Engineered with surgical precision, our pressure cooker series represents the pinnacle of aluminum and steel craftsmanship.'
            : activeCollection?.desc}
        </p>

        {activeTab !== 'all' && activeCollection?.bulletPoints && (
          <div className="flex flex-wrap justify-center gap-2.5 mt-6 max-w-3xl">
            {activeCollection.bulletPoints.map((pt, i) => (
              <span
                key={i}
                className="bg-white text-charcoal-matte font-karla text-[11px] px-4 py-2 rounded-full border border-platinum-gray/40 shadow-sm font-semibold uppercase tracking-wider"
              >
                {pt}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* ALL COLLECTIONS OVERVIEW SHOWCASE (When activeTab === 'all') */}
      {activeTab === 'all' && (
        <div className="space-y-12 py-10">
          {/* 1. Trinity Series (Tri-ply) */}
          <section
            onClick={() => {
              setActiveTab('tri-ply');
              onNavigate('tri-ply');
            }}
            className="px-6 md:px-16 max-w-[1440px] mx-auto cursor-pointer group"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white p-8 md:p-14 rounded-3xl border border-platinum-gray/30 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:scale-[1.01]">
              <div className="md:col-span-7 h-80 sm:h-96 md:h-[450px] w-full flex items-center justify-center p-6 md:p-10 overflow-hidden bg-[#FAF9F7] rounded-2xl border border-platinum-gray/20">
                <img
                  className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105 filter drop-shadow-xl"
                  src="https://lh3.googleusercontent.com/d/1r4Hioo4DlMui9O7fbR3HBxOHvibsd5Jp"
                  alt="Trinity Series Tri-ply Collection"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="md:col-span-5 space-y-6 md:pl-6 flex flex-col items-start">
                <span className="font-karla text-[11px] text-white bg-charcoal-matte px-4 py-1.5 font-bold tracking-widest uppercase inline-block rounded-sm shadow-sm">
                  PREMIUM TRI-PLY
                </span>
                <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[40px] text-charcoal-matte group-hover:text-heritage-red transition-colors leading-tight">
                  Trinity Series
                </h2>
                <p className="font-body-md text-base md:text-lg text-on-surface-variant leading-relaxed opacity-90">
                  Engineered with advanced SAS 3-layer cladding (Stainless Steel - Aluminum - Stainless Steel) for rapid, uniform heat distribution, zero hot-spots, and unmatched fuel efficiency.
                </p>
                <div className="pt-2">
                  <button className="px-10 py-4 bg-heritage-red text-white font-karla font-bold text-xs tracking-widest uppercase hover:bg-charcoal-matte transition-all duration-300 rounded shadow-md group-hover:shadow-xl">
                    VIEW COLLECTION
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Stello Series (Stainless Steel) */}
          <section
            onClick={() => {
              setActiveTab('stainless-steel');
              onNavigate('stainless-steel');
            }}
            className="px-6 md:px-16 max-w-[1440px] mx-auto cursor-pointer group"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#F4F3F1] p-8 md:p-14 rounded-3xl border border-platinum-gray/30 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:scale-[1.01]">
              <div className="md:col-span-5 order-2 md:order-1 space-y-6 md:pr-6 flex flex-col items-start">
                <span className="font-karla text-[11px] text-[#663800] bg-[#fd9924]/20 px-4 py-1.5 font-bold tracking-widest uppercase inline-block rounded-sm shadow-sm">
                  SURGICAL STEEL
                </span>
                <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[44px] text-charcoal-matte group-hover:text-heritage-red transition-colors leading-tight">
                  Stello Series
                </h2>
                <p className="font-body-md text-base md:text-lg text-on-surface-variant leading-relaxed opacity-90">
                  Crafted from surgical-grade AISI 304 stainless steel with a heavy-gauge impact-bonded sandwich base, combining timeless elegance with lifelong durability.
                </p>
                <div className="pt-2">
                  <button className="px-10 py-4 bg-heritage-red text-white font-karla font-bold text-xs tracking-widest uppercase hover:bg-charcoal-matte transition-all duration-300 rounded shadow-md group-hover:shadow-xl">
                    VIEW COLLECTION
                  </button>
                </div>
              </div>
              <div className="md:col-span-7 order-1 md:order-2 h-80 sm:h-96 md:h-[450px] w-full flex items-center justify-center p-6 md:p-10 overflow-hidden bg-white rounded-2xl shadow-[0_10px_40px_rgba(43,43,43,0.05)] border border-platinum-gray/20">
                <img
                  className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105 filter drop-shadow-xl"
                  src="https://lh3.googleusercontent.com/d/1dL6QLa2vu4WC4n0Agu3HYDrIGklww3Bz"
                  alt="Stello Series Stainless Steel Collection"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </section>

          {/* 3. Alex Series (Aluminum) */}
          <section
            onClick={() => {
              setActiveTab('heritage-aluminum');
              onNavigate('heritage-aluminum');
            }}
            className="px-6 md:px-16 max-w-[1440px] mx-auto cursor-pointer group"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white p-8 md:p-14 rounded-3xl border border-platinum-gray/30 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:scale-[1.01]">
              <div className="md:col-span-7 h-80 sm:h-96 md:h-[450px] w-full flex items-center justify-center p-6 md:p-10 overflow-hidden bg-[#FAF9F7] rounded-2xl border border-platinum-gray/20">
                <img
                  className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105 filter drop-shadow-xl"
                  src="https://lh3.googleusercontent.com/d/1bjCqB0TRduHVsu6TeGZ9CK19-oeibgY5"
                  alt="Alex Series Virgin Aluminum Collection"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="md:col-span-5 space-y-6 md:pl-6 flex flex-col items-start">
                <span className="font-karla text-[11px] text-golden-ochre font-bold tracking-widest uppercase block">
                  VIRGIN ALUMINUM
                </span>
                <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[46px] text-charcoal-matte group-hover:text-heritage-red transition-colors leading-tight">
                  Alex Series: <br/>The Architect's Choice
                </h2>
                <p className="font-body-md text-base md:text-lg text-on-surface-variant leading-relaxed opacity-90">
                  Forged from 99.9% pure virgin aluminum for flawless heat conductivity, rugged daily performance, and enduring structural integrity.
                </p>
                <div className="pt-2">
                  <button className="px-10 py-4 bg-heritage-red text-white font-karla font-bold text-xs tracking-widest uppercase hover:bg-charcoal-matte transition-all duration-300 rounded shadow-md group-hover:shadow-xl">
                    VIEW COLLECTION
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Black Beauty Series (Hard Anodized) */}
          <section
            onClick={() => {
              setActiveTab('black-beauty');
              onNavigate('black-beauty');
            }}
            className="px-6 md:px-16 max-w-[1440px] mx-auto cursor-pointer group"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-charcoal-matte text-white p-8 md:p-14 rounded-3xl border border-charcoal-matte/80 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:scale-[1.01] relative overflow-hidden">
              <div className="md:col-span-5 space-y-6 relative z-10 flex flex-col items-start">
                <span className="font-karla text-[11px] text-golden-ochre font-bold tracking-widest uppercase block">
                  HARD ANODIZED
                </span>
                <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[45px] text-white group-hover:text-amber-300 transition-colors leading-tight">
                  Black Beauty Series
                </h2>
                <p className="font-body-md text-base md:text-lg text-white/85 leading-relaxed">
                  Features a high-density hard anodized finish that is non-reactive, scratch-proof, and twice as hard as stainless steel for effortless gourmet cooking.
                </p>
                <div className="pt-2">
                  <button className="px-10 py-4 border border-platinum-gray text-white font-karla font-bold text-xs tracking-widest uppercase hover:bg-white hover:text-charcoal-matte transition-all duration-300 rounded shadow-md">
                    VIEW COLLECTION
                  </button>
                </div>
              </div>
              <div className="md:col-span-7 h-80 sm:h-96 md:h-[450px] w-full flex items-center justify-center p-6 md:p-10 overflow-hidden relative z-10 bg-white/5 rounded-2xl border border-white/10">
                <img
                  className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105 filter drop-shadow-2xl"
                  src="https://lh3.googleusercontent.com/d/1EfTFrNwtvhmWsGFMUdVxgG-kStyUTkZ8"
                  alt="Black Beauty Hard Anodized Collection"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #FFFFFF 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>
          </section>
        </div>
      )}

      {/* Product Display Section - ONLY shown when inside a specific collection */}
      {activeTab !== 'all' && (
        <section className="py-12 px-6 md:px-16 max-w-[1440px] mx-auto">
        {isTabLoading ? (
          <PressureCookersSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((prod, index) => {
              const currentSize = selectedSizes[prod.id] || prod.sizes[0];
              const activeImage = (prod.sizeImages && prod.sizeImages[currentSize]) || prod.image;
              const isFocused = focusedIndex === index;

              return (
                <motion.article
                  key={prod.id}
                  id={`prod-card-${index}`}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.45, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setFocusedIndex(index)}
                  onMouseLeave={() => setFocusedIndex(-1)}
                  className={`bg-white rounded-2xl flex flex-col border transition-all duration-500 hover:-translate-y-1.5 group scroll-mt-24 ${
                    isFocused 
                      ? 'ring-2 ring-heritage-red ring-offset-4 border-heritage-red shadow-xl -translate-y-1.5 z-30' 
                      : 'border-platinum-gray/30 shadow-sm hover:shadow-xl z-10'
                  }`}
                >
                  {/* Product Image Frame */}
                  <div 
                    onClick={() => onNavigate('product-detail', prod.id)}
                    className="h-64 sm:h-72 w-full relative bg-surface-container-low p-6 flex items-center justify-center border-b border-platinum-gray/20 cursor-pointer rounded-t-2xl"
                  >
                    {activeImage ? (
                      <ProductImageZoom
                        productId={prod.id}
                        src={activeImage}
                        alt={prod.name}
                        isParentHovered={isFocused}
                        containerClassName="w-full h-full flex items-center justify-center"
                        className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center p-4">
                        <span className="text-sm font-sans font-medium text-charcoal-matte/40 italic mb-2">No image available</span>
                        <span className="text-xs font-sans font-medium bg-charcoal-matte/5 text-charcoal-matte/60 px-3 py-1.5 rounded border border-platinum-gray/40">On Order</span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 flex gap-1.5 items-center">
                      <span className="font-karla text-[10px] bg-white border border-platinum-gray/80 px-2 py-0.5 rounded-md uppercase text-charcoal-matte font-bold shadow-sm">
                        {prod.category === 'Tri-ply' 
                          ? 'Trinity' 
                          : prod.category === 'Stainless Steel' 
                            ? 'Stello' 
                            : prod.category === 'Black Beauty'
                              ? 'Black Beauty'
                              : prod.category === 'Heritage Aluminum'
                                ? 'Alex'
                                : prod.category}
                      </span>
                      {isFocused && (
                        <span className="font-mono text-[8px] font-bold bg-heritage-red text-white px-2 py-0.5 rounded-md tracking-wider shadow animate-pulse uppercase">
                          Selected
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Info and Actions */}
                  <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <div className="flex flex-col text-left">
                          <h3 
                            onClick={() => onNavigate('product-detail', prod.id)}
                            className="font-sans font-semibold text-base text-charcoal-matte hover:text-heritage-red transition-colors line-clamp-2 cursor-pointer"
                          >
                            {prod.name}
                          </h3>
                          <span className="text-[10px] font-bold text-heritage-red uppercase tracking-wider mt-1">
                            {prod.category === 'Tri-ply' 
                              ? 'Trinity Series' 
                              : prod.category === 'Stainless Steel' 
                                ? 'Stello Series' 
                                : prod.category === 'Black Beauty'
                                  ? 'Black Beauty Series'
                                  : prod.category === 'Heritage Aluminum'
                                    ? 'Alex Series'
                                    : `${prod.category} Series`}
                          </span>
                        </div>
                        {prod.prices?.[currentSize] && (
                          <div className="text-right flex flex-col items-end whitespace-nowrap pt-1">
                            <span className="text-[10px] font-karla text-tertiary">MRP (INR)</span>
                            <span className="font-display text-base font-bold text-heritage-red">
                              ₹{prod.prices[currentSize].toLocaleString('en-IN')}
                            </span>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-charcoal-matte/60 font-mono mb-4">SKU: {formatSku(prod.sku, currentSize)}</p>
                      <p className="font-body-md text-xs text-charcoal-matte/80 leading-relaxed mb-6 min-h-[40px]">
                        {prod.description || `${prod.name} curated series designed for absolute culinary excellence.`}
                      </p>

                      {/* Sizing button grid */}
                      <div className="mb-8">
                        <span className="font-karla text-[10px] text-tertiary block mb-3 uppercase tracking-wider font-bold">
                          Select Sizing
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {prod.sizes.map((sz) => {
                            const isHovered = hoveredSize?.productId === prod.id && hoveredSize?.size === sz;
                            return (
                              <div key={sz} className="relative">
                                <button
                                  onClick={() => handleSizeSelect(prod.id, sz)}
                                  onMouseEnter={() => setHoveredSize({ productId: prod.id, size: sz })}
                                  onMouseLeave={() => setHoveredSize(null)}
                                  className={`w-12 h-10 rounded-lg text-xs font-sans font-medium transition-all focus:outline-none ${
                                    currentSize === sz
                                      ? 'bg-heritage-red text-white shadow-sm border border-heritage-red font-bold'
                                      : 'bg-white text-charcoal-matte border border-platinum-gray hover:border-heritage-red hover:text-heritage-red'
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
                      </div>
                    </div>

                    {/* Checkout buttons */}
                    <div className="space-y-3 pt-4 border-t border-platinum-gray/10">
                      <button
                        onClick={() => handleAddToCartClick(prod)}
                        className="w-full bg-heritage-red text-white font-sans text-[11px] py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary hover:shadow-md active:scale-[0.98] transition-all focus:outline-none font-medium"
                      >
                        <span>Add to Enquiry List</span>
                      </button>
                      <button
                        onClick={() => handleWhatsAppProduct(prod)}
                        className="w-full border border-charcoal-matte text-charcoal-matte font-sans text-[11px] py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-surface-container-low active:scale-[0.98] transition-all focus:outline-none font-medium"
                      >
                        <span>Enquire on WhatsApp</span>
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </section>
      )}

      {/* Symmetrical Bottom CTA section */}
      <div className="mt-12 pt-12 border-t border-platinum-gray/15 pb-20 max-w-5xl mx-auto px-6">
        <div 
          className="rounded-3xl border border-white/10 p-8 md:p-10 shadow-2xl transition-all duration-500 relative overflow-hidden text-white group"
          style={{
            backgroundImage: "linear-gradient(rgba(10, 10, 10, 0.85), rgba(15, 15, 15, 0.95)), url('https://lh3.googleusercontent.com/d/1-FMRYQDaak4h_J-OevHWr6epZMTHv3p3')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 z-10 relative text-left">
            <div className="space-y-3 max-w-xl">
              <span className="px-3 py-1 bg-heritage-red/25 text-heritage-red font-mono text-[10px] font-black uppercase tracking-widest rounded-full border border-heritage-red/40 backdrop-blur-xs animate-pulse inline-block">
                ★ Latest Launch
              </span>
              <h4 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-white uppercase tracking-tight">
                Harmonize Your Kitchen With Tricomb Series
              </h4>
              <p className="font-body-md text-xs sm:text-sm text-white/80 leading-relaxed font-sans">
                Elevate your culinary capabilities with our latest innovation. 100% scratch-resistant hybrid non-stick cookware protected by laser-etched stainless steel honeycomb ridges.
              </p>
            </div>
            <button
              onClick={() => {
                onNavigate('cookware-honeycomb');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full md:w-auto shrink-0 bg-white text-charcoal-matte hover:bg-heritage-red hover:text-white hover:scale-[1.03] active:scale-[0.97] text-xs font-black uppercase tracking-wider px-8 py-4.5 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl text-center cursor-pointer flex items-center justify-center gap-3 border border-white/20"
            >
              <span>Discover our Tricomb series</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
