import React, { useState, useEffect, useMemo } from 'react';
import { PageType, CartItem } from '../types';
import { PRODUCTS, formatSku } from '../products';
import { ProductImageZoom } from './ProductImageZoom';
import { TrustBadges } from './TrustBadges';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Star, 
  Flame, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  ShoppingBag, 
  ChevronRight,
  TrendingUp,
  Layers,
  Heart,
  BadgeAlert
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (page: any, targetId?: string, initialSize?: string) => void;
  onAddToCart: (productId: string, size: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onAddToCart }) => {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [hoveredHoneycombId, setHoveredHoneycombId] = useState<string | null>(null);
  // Select some featured products for best sellers list
  const bestSellers = [
    {
      ...PRODUCTS.find(p => p.id === 'ss-handi') || PRODUCTS[4],
      tag: "Top Rated",
      reviews: 148,
      rating: 4.9,
    },
    {
      ...PRODUCTS.find(p => p.id === 'tp-contura') || PRODUCTS[3],
      tag: "Best Seller",
      reviews: 216,
      rating: 4.9,
    },
    {
      ...PRODUCTS.find(p => p.id === 'ss-regular') || PRODUCTS[0],
      tag: "Classic Choice",
      reviews: 184,
      rating: 4.8,
    },
    {
      ...PRODUCTS.find(p => p.id === 'tp-handi') || PRODUCTS[5],
      tag: "Chef's Choice",
      reviews: 95,
      rating: 4.9,
    }
  ];

  // Specific Honeycomb products for the launches showcase
  const honeycombLaunches = PRODUCTS.filter(p => p.category === 'Honeycomb Cookware').slice(0, 3);

  // Keep track of active sizes selected in Best Sellers section
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({
    'ss-handi': '3.0L',
    'tp-contura': '5.0L',
    'ss-regular': '5.0L',
    'tp-handi': '3.0L'
  });
  const [hoveredSize, setHoveredSize] = useState<{ productId: string; size: string } | null>(null);

  const [selectedMegaSize, setSelectedMegaSize] = useState<'8.0L' | '10.0L' | '12.0L' | '22.0L'>('8.0L');
  const [selectedMegaModel, setSelectedMegaModel] = useState<'classic' | 'regular'>('classic');
  const [hoveredMegaContura, setHoveredMegaContura] = useState(false);
  const [hoveredMegaRegular, setHoveredMegaRegular] = useState(false);

  const [isComboHovered, setIsComboHovered] = useState(false);
  const [comboCycleIndex, setComboCycleIndex] = useState(0);
  const [selectedComboType, setSelectedComboType] = useState<'trinity' | 'stello'>('trinity');
  const [selectedComboCapacity, setSelectedComboCapacity] = useState<'1.5L-2L-3L' | '2L-3L-5L'>('2L-3L-5L');

  const comboImages = useMemo(() => {
    if (selectedComboType === 'trinity') {
      if (selectedComboCapacity === '1.5L-2L-3L') {
        return [
          { src: "https://lh3.googleusercontent.com/d/1WeBqK7CmmMU1xgzkwPh6y83FwrXElGls", capacity: "1.5L" },
          { src: "https://lh3.googleusercontent.com/d/1J44cyP2sND_IFUVZ43YYTwzYB59BvqmY", capacity: "2.0L" },
          { src: "https://lh3.googleusercontent.com/d/19oso-U7yyxZLuuRCRJzJLUNSezucL5XR", capacity: "3.0L" }
        ];
      } else { // 2L-3L-5L
        return [
          { src: "https://lh3.googleusercontent.com/d/1J44cyP2sND_IFUVZ43YYTwzYB59BvqmY", capacity: "2.0L" },
          { src: "https://lh3.googleusercontent.com/d/19oso-U7yyxZLuuRCRJzJLUNSezucL5XR", capacity: "3.0L" },
          { src: "https://lh3.googleusercontent.com/d/1LqV8U51TWCZSa1mG_g3lNr6CuxIMYjCJ", capacity: "5.0L" }
        ];
      }
    } else { // stello
      if (selectedComboCapacity === '1.5L-2L-3L') {
        return [
          { src: "https://lh3.googleusercontent.com/d/1PlN9AspbLkG9sazPUJH54m2FUJ2k4WTs", capacity: "1.5L" },
          { src: "https://lh3.googleusercontent.com/d/1DUDJBRm7sRtfIe-SauvEzpLsF-NWJOWS", capacity: "2.0L" },
          { src: "https://lh3.googleusercontent.com/d/1r2bIcXMxgktzOAxM87F8jG-MXYg7Np5O", capacity: "3.0L" }
        ];
      } else { // 2L-3L-5L
        return [
          { src: "https://lh3.googleusercontent.com/d/1DUDJBRm7sRtfIe-SauvEzpLsF-NWJOWS", capacity: "2.0L" },
          { src: "https://lh3.googleusercontent.com/d/1r2bIcXMxgktzOAxM87F8jG-MXYg7Np5O", capacity: "3.0L" },
          { src: "https://lh3.googleusercontent.com/d/1ZQSCxVYJ0mlf_uISycHnHd7cpBgcz8c-", capacity: "5.0L" }
        ];
      }
    }
  }, [selectedComboType, selectedComboCapacity]);

  useEffect(() => {
    comboImages.forEach((img) => {
      const tempImg = new Image();
      tempImg.src = img.src;
    });
  }, [comboImages]);

  useEffect(() => {
    if (!isComboHovered) {
      setComboCycleIndex(0);
      return;
    }
    // Change immediately to the next image on hover with no initial delay
    setComboCycleIndex(1);

    const interval = setInterval(() => {
      setComboCycleIndex((prev) => (prev + 1) % 3);
    }, 2000); // 2.0s delay for subsequent images (0.5s faster than 2500ms)

    return () => clearInterval(interval);
  }, [isComboHovered]);

  const megaPrices = {
    '8.0L': 4499,
    '10.0L': 5299,
    '12.0L': 6199,
    '22.0L': 10499,
  };

  const handleSizeChange = (productId: string, size: string) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const basePrice = megaPrices[selectedMegaSize];
  const finalPrice = selectedMegaModel === 'classic' ? basePrice + 1500 : basePrice;

  return (
    <div className="w-full flex flex-col bg-background">
      
      {/* Hero Section */}
      <header className="relative w-full h-[85vh] sm:h-[95vh] overflow-hidden flex items-start pt-24 sm:pt-36 md:pt-44">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover select-none" 
            alt="Geetanjali Premium Heritage Banner"
            src="https://lh3.googleusercontent.com/d/12B4AJ3umUwRFtzqm9sIwZaP_Iaw7JRQN"
          />
          <div className="absolute inset-0 bg-black/25"></div>
        </div>
        
        <div className="relative z-10 w-full px-6 md:px-16 pb-16 max-w-[1440px] mx-auto text-left">
          <div className="md:w-2/3">
            <h1 className="font-display-xl text-display-xl-mobile md:text-display-xl text-white mb-8">
              Making Home a Treasure
            </h1>
            <div className="flex items-center gap-8">
              <button 
                onClick={() => {
                  const section = document.getElementById('permanent-collection');
                  if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-heritage-red text-white px-8 py-4 font-sans font-medium text-xs tracking-widest hover:bg-primary transition-all active:scale-95 focus:outline-none shadow-lg cursor-pointer"
              >
                DISCOVER THE COLLECTION
              </button>
              <div className="hidden md:block w-32 h-[1px] bg-white/50"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Prominent Trust Badges Section */}
      <TrustBadges variant="full" />

      {/* Introduction: Brand Story / Philosophy */}
      <section className="py-20 md:py-28 px-6 md:px-16 max-w-[1440px] mx-auto" id="intro">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-start-2 md:col-span-4">
            <span className="font-karla text-[10px] text-secondary tracking-widest uppercase mb-4 block font-bold">
              Our Philosophy
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-8 italic text-charcoal-matte">
              Quiet Utility, Enduring Craft.
            </h2>
            <div className="w-12 h-1 bg-heritage-red mb-8"></div>
          </div>
          <div className="md:col-start-7 md:col-span-5 text-charcoal-matte">
            <p className="font-body-lg text-body-lg leading-relaxed mb-6">
              Since 1997, Geetanjali Home Appliances has stood as a guardian of the domestic sanctuary. We believe that the objects we invite into our homes should do more than perform; they should persist.
            </p>
            <p className="font-body-md text-body-md text-charcoal-matte/80">
              Our collections are curated with a museum-like precision, blending archival quality with the functional demands of the modern kitchen. Every piece is a testament to intentionality—a celebration of longevity in an era of transience.
            </p>
          </div>
        </div>
      </section>

      {/* Bergner-Style Best Sellers Section */}
      <section className="py-24 bg-[#faf9f7]">
        <div className="px-6 md:px-16 max-w-[1440px] mx-auto">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-heritage-red" />
                <span className="font-mono text-xs uppercase tracking-widest text-heritage-red font-bold">
                  Curated Customer Favorites
                </span>
              </div>
              <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl text-charcoal-matte uppercase tracking-tight mt-1 leading-none">
                Our Best Sellers
              </h2>
            </div>
            <button 
              onClick={() => onNavigate('stainless-steel')}
              className="text-xs font-bold uppercase tracking-widest text-charcoal-matte border-b border-charcoal-matte pb-1 hover:text-heritage-red hover:border-heritage-red transition-colors"
            >
              View Full Collection
            </button>
          </div>

          {/* Product Grid */}
          <div className="flex sm:grid overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory scrollbar-none gap-4 sm:gap-6 pb-4 sm:pb-0 sm:grid-cols-2 lg:grid-cols-4 -mx-6 px-6 sm:mx-0 sm:px-0">
            {bestSellers.map((product) => {
              const activeSize = selectedSizes[product.id] || product.sizes[0];
              const displaySize = (hoveredSize && hoveredSize.productId === product.id) ? hoveredSize.size : activeSize;
              const activeImage = (product.sizeImages && product.sizeImages[displaySize]) || product.image;
              const price = product.prices ? (product.prices[displaySize] || product.prices[activeSize]) : 2299;

              return (
                <div 
                  key={product.id}
                  onMouseEnter={() => setHoveredCardId(product.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  className="min-w-[82%] sm:min-w-0 snap-start bg-white rounded-2xl border border-platinum-gray/30 overflow-hidden flex flex-col justify-between hover:border-heritage-red/40 group transition-all shadow-xs hover:shadow-md shrink-0 sm:shrink"
                >
                  
                  {/* Card Header Media area */}
                  <div 
                    onClick={() => onNavigate('product-detail', product.id, activeSize)}
                    className="relative aspect-square w-full bg-[#fcfbf9] overflow-hidden flex items-center justify-center cursor-pointer"
                  >
                    {/* Badge */}
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-charcoal-matte text-white font-mono text-[8px] font-black uppercase tracking-wider rounded-md z-10">
                      {product.tag}
                    </span>

                    {/* Quick SKU display */}
                    <span className="absolute top-3 right-3 font-mono text-[8px] text-charcoal-matte/45 bg-neutral-100 px-2 py-0.5 rounded uppercase z-10">
                      {formatSku(product.sku, activeSize)}
                    </span>

                    <ProductImageZoom 
                      src={activeImage} 
                      alt={product.name} 
                      productId={product.id}
                      isParentHovered={hoveredCardId === product.id}
                      className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-[1.03]" 
                      containerClassName="w-full h-full flex items-center justify-center p-4"
                      style={{ mixBlendMode: 'multiply' }}
                    />
                  </div>

                  {/* Product Details Area */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Rating stars */}
                      <div className="flex items-center gap-1.5">
                        <div className="flex text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={11} fill="currentColor" />
                          ))}
                        </div>
                        <span className="font-mono text-[10px] text-charcoal-matte/50 font-bold">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>

                      {/* Title */}
                      <h3 
                        onClick={() => onNavigate('product-detail', product.id)}
                        className="font-sans font-semibold text-sm text-charcoal-matte uppercase tracking-tight mt-2 leading-tight hover:text-heritage-red transition-colors cursor-pointer"
                      >
                        {product.name}
                      </h3>

                      {/* Small Category details */}
                      <span className="text-[9px] font-bold text-heritage-red uppercase tracking-widest block mt-1">
                        {product.category === 'Tri-ply' ? 'Trinity' : product.category === 'Cookware' ? 'Trident' : product.category === 'Honeycomb Cookware' ? 'Tricomb' : product.category === 'Stainless Steel' ? 'Stello' : product.category === 'Heritage Aluminum' ? 'Alex' : product.category} Series
                      </span>

                      {/* Size Selector dropdown/chips */}
                      <div className="mt-4 space-y-1.5">
                        <span className="text-[10px] font-bold text-charcoal-matte/60 block">
                          Select Capacity:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {product.sizes.map((sz) => (
                            <button
                               key={sz}
                               onClick={(e) => {
                                 e.stopPropagation();
                                 handleSizeChange(product.id, sz);
                               }}
                               onMouseEnter={() => setHoveredSize({ productId: product.id, size: sz })}
                               onMouseLeave={() => setHoveredSize(null)}
                               className={`px-2 py-1 rounded text-[10px] font-bold font-mono transition-all ${
                                 activeSize === sz
                                   ? 'bg-heritage-red text-white shadow-xs'
                                   : 'bg-neutral-100 hover:bg-neutral-200 text-charcoal-matte'
                               }`}
                            >
                              {sz}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Price Area */}
                    <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between gap-2">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-mono text-charcoal-matte/40 uppercase">MRP</span>
                        <span className="font-mono text-base font-extrabold text-heritage-red leading-none">
                          ₹{price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Introducing Heading & Custom Launches Section */}
      <section id="introducing-launches" className="py-24 border-t border-b border-platinum-gray/30 bg-[#FAF9F5] transition-colors">
        <div className="px-6 md:px-16 max-w-[1440px] mx-auto text-center">
          
          {/* Artistic Introducing Header */}
          <div className="mb-16 relative">
            <span className="font-serif italic text-5xl md:text-7xl font-extralight text-heritage-red block tracking-wide select-none">
              Introducing
            </span>
            <span className="font-mono text-xs text-charcoal-matte/50 block mt-2 uppercase tracking-[0.3em] font-bold">
              (our signature new launches)
            </span>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[-16px] w-16 h-[1.5px] bg-heritage-red/30"></div>
          </div>

          {/* 1. TOP BIG LAUNCH: Mega Meal Series */}
          <div className="bg-white rounded-3xl border border-platinum-gray/35 p-6 md:p-10 lg:p-12 shadow-xs mb-16 text-left">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Photo: Tri-ply Inner Lid Classic */}
              <a 
                href="#product-detail"
                className="lg:col-span-4 flex flex-col items-center cursor-pointer group"
                onMouseEnter={() => {
                  setSelectedMegaModel('classic');
                  setHoveredMegaContura(true);
                }}
                onMouseLeave={() => setHoveredMegaContura(false)}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('product-detail', 'tp-classic', selectedMegaSize);
                }}
              >
                <div className={`bg-[#FAF9F5] rounded-2xl border p-6 w-full aspect-square flex items-center justify-center relative overflow-hidden shadow-xs transition-all ${
                  selectedMegaModel === 'classic' ? 'border-heritage-red ring-2 ring-heritage-red/10' : 'border-platinum-gray/20 hover:border-heritage-red/30'
                }`}>
                  <span className={`absolute top-3 left-3 text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-1 rounded transition-colors ${
                    selectedMegaModel === 'classic' ? 'bg-heritage-red text-white' : 'bg-heritage-red/15 text-heritage-red'
                  } z-10`}>
                    Inner Lid Series
                  </span>
                  <img 
                    src="https://lh3.googleusercontent.com/d/1l7Tu4rNBUjlEqPsHF5VvNnBbnd9Ic_lw" 
                    alt="Tri-ply Inner Lid Classic Cooker"
                    className="max-h-[280px] w-auto object-contain scale-110 md:scale-115 transition-transform duration-500 group-hover:scale-118"
                    referrerPolicy="no-referrer"
                    style={{ mixBlendMode: 'multiply' }}
                  />
                </div>
                <h4 className={`font-sans font-semibold text-xs uppercase tracking-widest mt-3 text-center transition-colors ${
                  selectedMegaModel === 'classic' ? 'text-heritage-red' : 'text-charcoal-matte'
                }`}>
                  Classic Inner Lid
                </h4>
                <span className="block text-xs font-serif font-bold italic text-heritage-red uppercase tracking-wider mt-0.5 text-center">
                  Trinity Series
                </span>
                <p className="text-[10px] text-charcoal-matte/50 font-mono text-center mt-1">Premium Heavy-Gauge Body</p>
              </a>

              {/* Center Details & Pricing/Sizes */}
              <div className="lg:col-span-4 text-center px-4 space-y-6">
                <div className="space-y-2">
                  <h3 className="font-display font-semibold text-2xl md:text-3xl lg:text-4xl text-charcoal-matte uppercase tracking-tight leading-none">
                    Mega Meal Series
                  </h3>
                </div>

                <p className="text-xs text-charcoal-matte/75 leading-relaxed">
                  Designed for grand culinary feasts, festive gatherings, and professional excellence. Built with heavy-duty Tri-Ply clad construction to ensure flawless, uniform heat retention and maximum durability under intense cooking conditions.
                </p>

                {/* Size Swapper */}
                <div className="space-y-4 pt-2 border-t border-b border-platinum-gray/20 py-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-charcoal-matte/60 uppercase tracking-wider block">
                      1. Choose Capacity:
                    </span>
                    <div className="flex justify-center gap-2">
                      {(['8.0L', '10.0L', '12.0L', '22.0L'] as const).map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setSelectedMegaSize(sz)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
                            selectedMegaSize === sz
                              ? 'bg-heritage-red text-white shadow-md'
                              : 'bg-neutral-100 hover:bg-neutral-200 text-charcoal-matte border border-platinum-gray/10'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-charcoal-matte/60 uppercase tracking-wider block">
                      2. Choose Model:
                    </span>
                    <div className="flex flex-col sm:flex-row justify-center gap-2">
                      <button
                        onClick={() => setSelectedMegaModel('classic')}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          selectedMegaModel === 'classic'
                            ? 'bg-heritage-red text-white shadow-md'
                            : 'bg-neutral-100 hover:bg-neutral-200 text-charcoal-matte border border-platinum-gray/10'
                        }`}
                      >
                        Inner Lid Classic
                      </button>
                      <button
                        onClick={() => setSelectedMegaModel('regular')}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          selectedMegaModel === 'regular'
                            ? 'bg-heritage-red text-white shadow-md'
                            : 'bg-neutral-100 hover:bg-neutral-200 text-charcoal-matte border border-platinum-gray/10'
                        }`}
                      >
                        Outer Lid Regular
                      </button>
                    </div>
                  </div>

                  {/* Pricing Output */}
                  <div className="mt-4 pt-2 border-t border-platinum-gray/15">
                    <span className="text-[9px] font-mono text-charcoal-matte/40 uppercase block">MRP</span>
                    <span className="font-mono text-2xl font-black text-heritage-red">
                      ₹{finalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Inquiry CTA */}
                <div>
                  <a 
                    href={`https://wa.me/919205293094?text=Hello,%20I%20am%20interested%20in%20inquiring%20about%20the%20Mega%20Meal%20Series%20(${selectedMegaSize}%20${selectedMegaModel === 'classic' ? 'Inner%20Lid%20Classic' : 'Regular%20Outer%20Lid'})`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-charcoal-matte text-white hover:bg-heritage-red transition-all px-8 py-4 rounded-xl text-xs font-black uppercase tracking-wider shadow-md hover:shadow-lg transform active:scale-95"
                  >
                    <span>Send Bulk / OEM Inquiry</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>

              {/* Right Photo: Tri-ply Regular Outer Lid */}
              <a 
                href="#product-detail"
                className="lg:col-span-4 flex flex-col items-center cursor-pointer group"
                onMouseEnter={() => {
                  setSelectedMegaModel('regular');
                  setHoveredMegaRegular(true);
                }}
                onMouseLeave={() => setHoveredMegaRegular(false)}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('product-detail', 'tp-regular', selectedMegaSize);
                }}
              >
                <div className={`bg-[#FAF9F5] rounded-2xl border p-6 w-full aspect-square flex items-center justify-center relative overflow-hidden shadow-xs transition-all ${
                  selectedMegaModel === 'regular' ? 'border-heritage-red ring-2 ring-heritage-red/10' : 'border-platinum-gray/20 hover:border-heritage-red/30'
                }`}>
                  <span className={`absolute top-3 left-3 text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-1 rounded transition-colors ${
                    selectedMegaModel === 'regular' ? 'bg-heritage-red text-white' : 'bg-heritage-red/15 text-heritage-red'
                  } z-10`}>
                    Outer Lid Series
                  </span>
                  <img 
                    src="https://lh3.googleusercontent.com/d/1K5qDnDytOHOT1RkfSfjLhOPpTCMrb3oi" 
                    alt="Tri-ply Regular Outer Lid Cooker"
                    className="max-h-[280px] w-auto object-contain scale-110 md:scale-115 transition-transform duration-500 group-hover:scale-118"
                    referrerPolicy="no-referrer"
                    style={{ mixBlendMode: 'multiply' }}
                  />
                </div>
                <h4 className={`font-sans font-semibold text-xs uppercase tracking-widest mt-3 text-center transition-colors ${
                  selectedMegaModel === 'regular' ? 'text-heritage-red' : 'text-charcoal-matte'
                }`}>
                  Regular Outer Lid
                </h4>
                <span className="block text-xs font-serif font-bold italic text-heritage-red uppercase tracking-wider mt-0.5 text-center">
                  Trinity Series
                </span>
                <p className="text-[10px] text-charcoal-matte/50 font-mono text-center mt-1">Classic High-Capacity Build</p>
              </a>

            </div>
          </div>

          {/* TWO LAUNCHES SIDE-BY-SIDE */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
            
            {/* 2. Honeycomb Series (Left Launch Card) */}
            <div 
              className="rounded-3xl border border-white/10 p-6 md:p-8 flex flex-col justify-between shadow-2xl transition-all duration-500 group relative overflow-hidden text-white"
              style={{
                backgroundImage: "linear-gradient(rgba(10, 10, 10, 0.82), rgba(15, 15, 15, 0.94)), url('https://lh3.googleusercontent.com/d/1-FMRYQDaak4h_J-OevHWr6epZMTHv3p3')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between z-10 relative">
                  <span className="px-2.5 py-1 bg-heritage-red/20 text-heritage-red font-mono text-[9px] font-black uppercase tracking-widest rounded border border-heritage-red/30 backdrop-blur-xs animate-pulse">
                    ★ Revolutionary Tech
                  </span>
                  <span className="font-mono text-[9px] text-white/50 font-bold uppercase tracking-wider">
                    Hybrid Cookware
                  </span>
                </div>

                <div className="z-10 relative">
                  <h3 className="font-display font-black text-2xl md:text-3xl text-white uppercase tracking-tight text-shadow-sm">
                    Tricomb Series
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed mt-2.5">
                    A revolutionary breakthrough in culinary metallurgy. Our premium Tricomb Series combines the heavy-duty searing capabilities of master-crafted <span className="font-semibold text-white underline decoration-heritage-red/50">triply clad layers</span> with the effortless release of an advanced, PFOA-free non-stick grid. Meticulously etched hexagonal steel ridges rise proudly to shield the low-lying non-stick valley, rendering the surface <span className="font-semibold text-white">100% scratch-proof and metal-spatula friendly</span>.
                  </p>
                </div>

                {/* 4 Photos: Honeycomb Dosa Tawa & Roti Tawa on top, Honeycomb Kadhai & Frypan on bottom */}
                <div className="grid grid-cols-2 gap-4 pt-1 z-10 relative">
                  {/* Top Row Item 1: Dosa Tawa */}
                  <a 
                    href="#product-detail"
                    onMouseEnter={() => setHoveredHoneycombId('hc-dosatawa')}
                    onMouseLeave={() => setHoveredHoneycombId(null)}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('product-detail', 'hc-dosatawa');
                    }}
                    className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-3 text-center hover:border-heritage-red/40 hover:bg-black/60 hover:shadow-[0_0_15px_rgba(239,68,68,0.15)] transition-all duration-300 relative overflow-hidden flex flex-col justify-between group cursor-pointer"
                  >
                    <span className="absolute top-2 right-2 bg-heritage-red/25 text-white text-[7px] font-mono font-black uppercase tracking-wider px-1.5 py-0.5 rounded border border-heritage-red/30 z-10">
                      Exclusive
                    </span>
                    <div className="h-28 flex items-center justify-center mt-3 relative overflow-hidden rounded-lg">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)] pointer-events-none" />
                      <img 
                        src="https://lh3.googleusercontent.com/d/1sqPVzUBixHwAfQZ5g-6zZgmXrVhH5kCq" 
                        alt="Honeycomb Dosa Tawa" 
                        className="max-h-24 w-auto object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.05]"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="mt-2">
                      <span className="block font-sans font-semibold text-xs text-white uppercase group-hover:text-heritage-red transition-colors">Dosa Tawa</span>
                      <span className="block font-mono text-[8px] text-heritage-red uppercase tracking-widest font-extrabold mt-0.5">Tricomb Series</span>
                      <span className="block font-sans text-[8px] text-white/50 mt-1">Flat Wide Cooking Area</span>
                    </div>
                  </a>

                  {/* Top Row Item 2: Roti Tawa */}
                  <a 
                    href="#product-detail"
                    onMouseEnter={() => setHoveredHoneycombId('hc-rotitawa')}
                    onMouseLeave={() => setHoveredHoneycombId(null)}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('product-detail', 'hc-rotitawa');
                    }}
                    className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-3 text-center hover:border-heritage-red/40 hover:bg-black/60 hover:shadow-[0_0_15px_rgba(239,68,68,0.15)] transition-all duration-300 relative overflow-hidden flex flex-col justify-between group cursor-pointer"
                  >
                    <span className="absolute top-2 right-2 bg-heritage-red/25 text-white text-[7px] font-mono font-black uppercase tracking-wider px-1.5 py-0.5 rounded border border-heritage-red/30 z-10">
                      Exclusive
                    </span>
                    <div className="h-28 flex items-center justify-center mt-3 relative overflow-hidden rounded-lg">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)] pointer-events-none" />
                      <img 
                        src="https://lh3.googleusercontent.com/d/1OY5DBQ717wT7gHj5Tp2rWYfexJumJ4lQ" 
                        alt="Honeycomb Roti Tawa" 
                        className="max-h-24 w-auto object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.05]"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="mt-2">
                      <span className="block font-sans font-semibold text-xs text-white uppercase group-hover:text-heritage-red transition-colors">Roti Tawa</span>
                      <span className="block font-mono text-[8px] text-heritage-red uppercase tracking-widest font-extrabold mt-0.5">Tricomb Series</span>
                      <span className="block font-sans text-[8px] text-white/50 mt-1">Perfect Even Heat Protection</span>
                    </div>
                  </a>

                  {/* Bottom Row Item 1: Honeycomb Kadhai */}
                  <a 
                    href="#product-detail"
                    onMouseEnter={() => setHoveredHoneycombId('hc-kadhai')}
                    onMouseLeave={() => setHoveredHoneycombId(null)}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('product-detail', 'hc-kadhai');
                    }}
                    className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-3 text-center hover:border-heritage-red/40 hover:bg-black/60 hover:shadow-[0_0_15px_rgba(239,68,68,0.15)] transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
                  >
                    <div className="h-28 flex items-center justify-center mt-3 relative overflow-hidden rounded-lg">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)] pointer-events-none" />
                      <img 
                        src="https://lh3.googleusercontent.com/d/188EKwnvP8EKVvJCFgoRd_atX9BH8oUki" 
                        alt="Honeycomb Kadhai" 
                        className="max-h-24 w-auto object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.05]"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="mt-2">
                      <span className="block font-sans font-semibold text-xs text-white uppercase group-hover:text-heritage-red transition-colors">Kadhai</span>
                      <span className="block font-mono text-[8px] text-heritage-red uppercase tracking-widest font-extrabold mt-0.5">Tricomb Series</span>
                      <span className="block font-sans text-[8px] text-white/50 mt-1">Premium Induction Ready</span>
                    </div>
                  </a>

                  {/* Bottom Row Item 2: Honeycomb Frypan */}
                  <a 
                    href="#product-detail"
                    onMouseEnter={() => setHoveredHoneycombId('hc-frypan')}
                    onMouseLeave={() => setHoveredHoneycombId(null)}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('product-detail', 'hc-frypan');
                    }}
                    className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-3 text-center hover:border-heritage-red/40 hover:bg-black/60 hover:shadow-[0_0_15px_rgba(239,68,68,0.15)] transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
                  >
                    <div className="h-28 flex items-center justify-center mt-3 relative overflow-hidden rounded-lg">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)] pointer-events-none" />
                      <img 
                        src="https://lh3.googleusercontent.com/d/1Fa_rCMs-g7JC8VkH5Ibgg4cvyGzUXhiE" 
                        alt="Honeycomb Frypan" 
                        className="max-h-24 w-auto object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.05]"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="mt-2">
                      <span className="block font-sans font-semibold text-xs text-white uppercase group-hover:text-heritage-red transition-colors">Frypan</span>
                      <span className="block font-mono text-[8px] text-heritage-red uppercase tracking-widest font-extrabold mt-0.5">Tricomb Series</span>
                      <span className="block font-sans text-[8px] text-white/50 mt-1">100% Scratch-Safe Grid</span>
                    </div>
                  </a>
                </div>

                {/* Feature highlight labels for Honeycomb to balance with Palette Card */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-white/5 rounded-2xl p-4 md:p-5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-3xs flex flex-col justify-center items-center">
                    <span className="block text-[10px] font-bold text-heritage-red uppercase tracking-widest font-mono">Compatible</span>
                    <span className="block text-sm font-black text-white uppercase mt-1.5 leading-tight text-center">Gas, Induction</span>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 md:p-5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-3xs flex flex-col justify-center items-center">
                    <span className="block text-[10px] font-bold text-heritage-red uppercase tracking-widest font-mono">Certified</span>
                    <span className="block text-sm font-black text-white uppercase mt-1.5 leading-tight text-center">304 Triply Clad</span>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 md:p-5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-3xs flex flex-col justify-center items-center">
                    <span className="block text-[10px] font-bold text-heritage-red uppercase tracking-widest font-mono">Durable</span>
                    <span className="block text-sm font-black text-white uppercase mt-1.5 leading-tight text-center">5 Yr Warranty</span>
                  </div>
                </div>
              </div>

              {/* Honeycomb Footer - Matches structure of Palette exactly */}
              <div className="pt-6 border-t border-white/10 mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 z-10 relative">
                <div className="bg-white/5 text-white px-4 py-2.5 rounded-xl border border-white/10 shadow-xs flex items-center gap-3">
                  <div className="w-2 h-2 bg-heritage-red rounded-full animate-ping shrink-0" />
                  <div className="text-left">
                    <span className="text-[8px] font-bold text-heritage-red uppercase tracking-widest font-mono block">Direct Order</span>
                    <span className="font-mono text-xs font-black text-white uppercase tracking-wider block">From ₹2,499 only</span>
                  </div>
                </div>
                <button 
                  onClick={() => onNavigate('cookware-honeycomb')}
                  className="bg-white text-charcoal-matte hover:bg-heritage-red hover:text-white hover:scale-[1.02] active:scale-[0.98] text-[10px] font-black uppercase tracking-wider px-6 py-3.5 rounded-lg transition-all shadow-md hover:shadow-lg w-full sm:w-auto text-center"
                >
                  View Collection
                </button>
              </div>
            </div>

            {/* 3. Palette Series (Right Launch Card) */}
            <div 
              className="rounded-3xl border border-[#d3ecd2] p-6 md:p-8 flex flex-col justify-between shadow-lg hover:shadow-xl hover:border-emerald-400/30 transition-all duration-500 group relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #f7fdf6 0%, #ebf8e9 100%)",
              }}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between z-10 relative">
                  <span className="px-2.5 py-1 bg-white/85 text-emerald-800 border border-emerald-200/50 font-mono text-[9px] font-black uppercase tracking-widest rounded shadow-2xs animate-pulse">
                    ★ Aesthetic Finishes
                  </span>
                  <span className="font-mono text-[9px] text-charcoal-matte/50 font-bold uppercase tracking-wider">
                    Custom Color Cookers
                  </span>
                </div>

                <div className="z-10 relative">
                  <h3 className="font-display font-black text-2xl md:text-3xl text-charcoal-matte uppercase tracking-tight">
                    Palette Series
                  </h3>
                  <p className="text-xs text-charcoal-matte/80 leading-relaxed mt-2.5">
                    Elevate kitchen aesthetics with custom-formulated vibrant finishes. Engineered specifically for OEMs, the Palette Series combines heavy-gauge pressure cooking hardware with advanced heat-resistant exterior coatings. Available in bespoke colors, it empowers brands to offer unique premium aesthetics. Every cooker features a highly durable, scratch-resistant outer layer that withstands extreme thermal cycles, ensuring maximum safety and absolute food-grade purity.
                  </p>
                </div>

                {/* Single Image Frame - Height matching the Honeycomb 2x2 grid precisely */}
                <div className="bg-white rounded-2xl border border-[#d2edd0]/60 p-4 flex items-center justify-center relative overflow-hidden h-[360px] sm:h-[400px] lg:h-[420px] shadow-sm w-full">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,transparent_100%)] pointer-events-none" />
                  <img 
                    src="https://lh3.googleusercontent.com/d/1tHqja6r-ArBGAS9PurV8cPQq9gT2RXZe" 
                    alt="Palette Series Cooker" 
                    className="h-72 sm:h-80 lg:h-88 w-auto object-contain scale-105 md:scale-110 transition-transform duration-500 group-hover:scale-115"
                    style={{ mixBlendMode: 'normal' }}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-3 right-3 bg-charcoal-matte/85 text-white text-[9px] font-mono tracking-widest uppercase px-3 py-1 rounded backdrop-blur-xs shadow-xs">
                    Vibrant & Safe Finishes
                  </div>
                </div>

                {/* Feature highlight labels styled to match the overall premium set vibe perfectly */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-white/95 rounded-2xl p-4 md:p-5 border border-slate-200/80 hover:bg-white hover:border-heritage-red/20 transition-all duration-300 shadow-3xs flex flex-col justify-center items-center">
                    <span className="block text-[10px] font-bold text-heritage-red/85 uppercase tracking-widest font-mono">Series Range</span>
                    <span className="block text-sm font-black text-charcoal-matte uppercase mt-1.5 leading-tight text-center">All Cooker Ranges</span>
                  </div>
                  <div className="bg-white/95 rounded-2xl p-4 md:p-5 border border-slate-200/80 hover:bg-white hover:border-heritage-red/20 transition-all duration-300 shadow-3xs flex flex-col justify-center items-center">
                    <span className="block text-[10px] font-bold text-heritage-red/85 uppercase tracking-widest font-mono">Certified Safety</span>
                    <span className="block text-sm font-black text-charcoal-matte uppercase mt-1.5 leading-tight text-center">100% Food Grade</span>
                  </div>
                  <div className="bg-white/95 rounded-2xl p-4 md:p-5 border border-slate-200/80 hover:bg-white hover:border-heritage-red/20 transition-all duration-300 shadow-3xs flex flex-col justify-center items-center">
                    <span className="block text-[10px] font-bold text-heritage-red/85 uppercase tracking-widest font-mono">Bespoke Colors</span>
                    <span className="block text-sm font-black text-charcoal-matte uppercase mt-1.5 leading-tight text-center">Any Custom Shade</span>
                  </div>
                </div>
              </div>

              {/* Palette Footer - Matches structure of Honeycomb exactly, with premium non-green button and clean badge */}
              <div className="pt-6 border-t border-[#d3ecd2] mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 z-10 relative">
                <div className="bg-white text-charcoal-matte px-4 py-2.5 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping shrink-0" />
                  <div className="text-left">
                    <span className="text-[8px] font-bold text-heritage-red uppercase tracking-widest font-mono block">OEM Special Request</span>
                    <span className="font-mono text-xs font-black text-charcoal-matte uppercase tracking-wider block">Available on Order</span>
                  </div>
                </div>
                <a 
                  href="https://wa.me/919205293094?text=Hello,%20I%20am%20interested%20in%20discussing%20the%20OEM%20Color%20Customization%20options%20for%20the%20Palette%20Series."
                  target="_blank"
                  rel="noreferrer"
                  className="bg-charcoal-matte text-white hover:bg-heritage-red hover:scale-[1.02] active:scale-[0.98] text-[10px] font-black uppercase tracking-wider px-6 py-3.5 rounded-lg transition-all shadow-md hover:shadow-lg w-full sm:w-auto text-center"
                >
                  OEM Customization Inquiry
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* "Must Have" Cooker Combo Section */}
      <section className="py-24 bg-white border-t border-platinum-gray/30">
        <div className="px-6 md:px-16 max-w-[1440px] mx-auto">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-heritage-red/10 text-heritage-red text-[10px] font-mono tracking-widest uppercase font-bold rounded-full mb-3">
              <Award size={12} />
              <span>Signature Family Pack Series</span>
            </span>
            <h2 className="font-display font-semibold text-2xl md:text-3.5xl text-charcoal-matte uppercase tracking-tight">
              The Family Pack Series
            </h2>
            <p className="text-[11px] md:text-xs text-gray-400 font-mono uppercase tracking-widest mt-1.5 font-bold">
              pressure cooker combo pack
            </p>
            <p className="text-xs md:text-sm text-charcoal-matte/60 mt-3">
              Our flagship cookware combinations, pre-selected to complete your heritage kitchen setup at an exceptional value.
            </p>
          </div>

          {/* Combo Showcase Block */}
          <div className="bg-[#f4f3f1] rounded-3xl border border-platinum-gray/35 p-6 md:p-10 lg:p-12 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Side: Product Image (Single elegant frame) */}
              <div 
                className="lg:col-span-6 flex items-center justify-center w-full"
                onMouseEnter={() => setIsComboHovered(true)}
                onMouseLeave={() => setIsComboHovered(false)}
                onTouchStart={() => setIsComboHovered(true)}
              >
                <div className="bg-white rounded-3xl border border-platinum-gray/25 p-6 w-full aspect-square md:aspect-[4/3] flex items-center justify-center relative shadow-md group overflow-hidden">
                  <span className="absolute top-4 left-4 bg-heritage-red text-white text-[9px] font-mono font-black uppercase tracking-widest px-3 py-1 rounded-md shadow-xs z-10">
                    Bundle Offer
                  </span>
                  {isComboHovered ? (
                    <div className="w-full h-full flex items-center justify-center relative">
                      {comboImages.map((img, idx) => {
                        const isVisible = idx === comboCycleIndex;
                        return (
                          <img
                            key={idx}
                            src={img.src}
                            alt={`${selectedComboType === 'trinity' ? 'Trinity Tri-ply' : 'Stello Stainless Steel'} Family Pack Series - ${img.capacity}`}
                            className="max-h-[280px] w-auto object-contain absolute inset-0 m-auto transition-opacity duration-300 ease-in-out pointer-events-none"
                            style={{
                              opacity: isVisible ? 1 : 0,
                              zIndex: isVisible ? 2 : 1,
                              mixBlendMode: 'multiply'
                            }}
                            referrerPolicy="no-referrer"
                          />
                        );
                      })}
                      {/* Write capacity of the cooker in the image in right bottom */}
                      <span className="absolute bottom-4 right-4 bg-charcoal-matte/85 backdrop-blur-xs text-white text-[10px] font-sans font-bold uppercase tracking-wider px-2.5 py-1.5 rounded shadow-sm z-20">
                        {comboImages[comboCycleIndex]?.capacity || '1.5L'} Capacity
                      </span>
                    </div>
                  ) : (
                    <img 
                      src={selectedComboType === 'trinity' ? "https://lh3.googleusercontent.com/d/1Gs7lyUATykB8wY8Ro_RjLgwgmYVSsvbK" : "https://lh3.googleusercontent.com/d/1I8fwvzsi9K60cuKA-Dw_EC-7-UFWEVOu"} 
                      alt={`${selectedComboType === 'trinity' ? 'Trinity Tri-ply' : 'Stello Stainless Steel'} Family Pack Series`}
                      className="max-h-[320px] w-auto object-contain transition-transform duration-700 group-hover:scale-103"
                      style={{ mixBlendMode: 'multiply' }}
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>
              </div>

              {/* Right Side: Combo Description, Savings, CTA */}
              <div className="lg:col-span-6 space-y-6">
                <span className="font-mono text-xs font-bold text-amber-500 uppercase tracking-widest block">
                  Best Value Kitchen Upgrade
                </span>
                
                <div className="space-y-1">
                  <h3 className="font-sans font-semibold text-2xl md:text-3xl text-charcoal-matte uppercase tracking-tight leading-none">
                    {selectedComboType === 'trinity' ? 'Trinity' : 'Stello'} Family Pack Series
                  </h3>
                  <p className="text-[11px] md:text-xs text-gray-400 font-mono uppercase tracking-widest font-bold">
                    pressure cooker combo pack
                  </p>
                </div>

                {/* Selection 1: Type Selection */}
                <div className="space-y-2">
                  <label className="text-[11px] uppercase font-mono tracking-wider text-charcoal-matte/60 block font-bold">
                    Select Cooker Series
                  </label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setSelectedComboType('trinity');
                        setComboCycleIndex(0);
                      }}
                      className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all duration-300 text-center cursor-pointer ${
                        selectedComboType === 'trinity'
                          ? 'bg-heritage-red text-white border-heritage-red shadow-sm'
                          : 'bg-white text-charcoal-matte border-platinum-gray/50 hover:border-heritage-red/50'
                      }`}
                    >
                      Trinity (Tri-Ply)
                    </button>
                    <button
                      onClick={() => {
                        setSelectedComboType('stello');
                        setComboCycleIndex(0);
                      }}
                      className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all duration-300 text-center cursor-pointer ${
                        selectedComboType === 'stello'
                          ? 'bg-heritage-red text-white border-heritage-red shadow-sm'
                          : 'bg-white text-charcoal-matte border-platinum-gray/50 hover:border-heritage-red/50'
                      }`}
                    >
                      Stello (Stainless Steel)
                    </button>
                  </div>
                </div>

                {/* Selection 2: Capacity Selection */}
                <div className="space-y-2">
                  <label className="text-[11px] uppercase font-mono tracking-wider text-charcoal-matte/60 block font-bold">
                    Select Capacity Pack
                  </label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setSelectedComboCapacity('1.5L-2L-3L');
                        setComboCycleIndex(0);
                      }}
                      className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all duration-300 text-center cursor-pointer ${
                        selectedComboCapacity === '1.5L-2L-3L'
                          ? 'bg-charcoal-matte text-white border-charcoal-matte shadow-sm'
                          : 'bg-white text-charcoal-matte border-platinum-gray/50 hover:border-charcoal-matte/40'
                      }`}
                    >
                      1.5L + 2L + 3L Pack
                    </button>
                    <button
                      onClick={() => {
                        setSelectedComboCapacity('2L-3L-5L');
                        setComboCycleIndex(0);
                      }}
                      className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all duration-300 text-center cursor-pointer ${
                        selectedComboCapacity === '2L-3L-5L'
                          ? 'bg-charcoal-matte text-white border-charcoal-matte shadow-sm'
                          : 'bg-white text-charcoal-matte border-platinum-gray/50 hover:border-charcoal-matte/40'
                      }`}
                    >
                      2L + 3L + 5L Pack
                    </button>
                  </div>
                </div>

                <p className="text-xs md:text-sm text-charcoal-matte/70 leading-relaxed">
                  {selectedComboType === 'trinity'
                    ? `The ultimate culinary upgrade featuring our top-tier Trinity Series Tri-ply Pressure Cooker collection. This combo contains three highly versatile capacities: the ${selectedComboCapacity === '1.5L-2L-3L' ? '1.5L, 2.0L, and 3.0L' : '2.0L, 3.0L, and 5.0L'} Regular Outer Lid Cookers, engineered with SAS (Stainless Steel - Aluminum - Stainless Steel) 3-layer bonding for even heat distribution, zero hot-spots, and maximum energy efficiency.`
                    : `The ultimate kitchen upgrade featuring our top-tier Stello Series Pressure Cooker collection. This combo contains three highly versatile capacities: the ${selectedComboCapacity === '1.5L-2L-3L' ? '1.5L, 2.0L, and 3.0L' : '2.0L, 3.0L, and 5.0L'} Regular Outer Lid Cookers, built for different cooking volumes. Crafted with premium 304 food-grade stainless steel and induction-compatible sandwich bottoms for uniform heating and outstanding durability.`
                  }
                </p>

                {/* Savings Highlights */}
                <div className="grid grid-cols-2 gap-4 border-t border-b border-platinum-gray/30 py-5">
                  <div className="space-y-1">
                    <span className="text-[10px] text-charcoal-matte/50 uppercase font-mono">Individual Total (MRP Sum)</span>
                    <p className="text-sm font-mono text-charcoal-matte/70 line-through">
                      ₹{selectedComboType === 'trinity'
                        ? (selectedComboCapacity === '1.5L-2L-3L' ? '8,447' : '9,197')
                        : (selectedComboCapacity === '1.5L-2L-3L' ? '7,397' : '8,097')
                      }
                    </p>
                    <span className="text-[8px] font-mono text-charcoal-matte/40 block leading-tight">
                      {selectedComboType === 'trinity'
                        ? (selectedComboCapacity === '1.5L-2L-3L' ? '(1.5L: ₹2,649 + 2L: ₹2,799 + 3L: ₹2,999)' : '(2L: ₹2,799 + 3L: ₹2,999 + 5L: ₹3,399)')
                        : (selectedComboCapacity === '1.5L-2L-3L' ? '(1.5L: ₹2,299 + 2L: ₹2,449 + 3L: ₹2,649)' : '(2L: ₹2,449 + 3L: ₹2,649 + 5L: ₹2,999)')
                      }
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-emerald-600 uppercase font-mono font-bold">Bundle MRP</span>
                    <p className="text-xl font-mono font-black text-heritage-red">
                      ₹{selectedComboType === 'trinity'
                        ? (selectedComboCapacity === '1.5L-2L-3L' ? '6,999' : '7,699')
                        : (selectedComboCapacity === '1.5L-2L-3L' ? '5,999' : '6,700')
                      }
                    </p>
                    <span className="inline-block px-1.5 py-0.5 bg-emerald-500/10 text-emerald-600 text-[8px] font-black uppercase rounded">
                      Save ₹{selectedComboType === 'trinity'
                        ? (selectedComboCapacity === '1.5L-2L-3L' ? '1,448' : '1,498')
                        : (selectedComboCapacity === '1.5L-2L-3L' ? '1,398' : '1,397')
                      } (Flat Off)
                    </span>
                  </div>
                </div>

                {/* Features list */}
                <ul className="space-y-2 text-xs text-charcoal-matte/80">
                  <li className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-heritage-red" />
                    <span>{selectedComboType === 'trinity' ? 'Professional-grade SAS Tri-ply cladding construction' : 'Heavy-duty 304 Food-Grade Stainless Steel construction'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-heritage-red" />
                    <span>Thick-gauge induction & gas base compatible with all cooktops</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-heritage-red" />
                    <span>Double ISI Safety Hologram Certification & 5-year warranty</span>
                  </li>
                </ul>

                {/* Action Button */}
                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={() => onNavigate('contact')}
                    className="bg-heritage-red hover:bg-primary text-white transition-all px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md active:scale-95 text-center flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Enquire on WhatsApp
                  </button>
                  <button 
                    onClick={() => {
                      onNavigate(selectedComboType === 'trinity' ? 'tri-ply' : 'stainless-steel');
                    }}
                    className="border border-charcoal-matte text-charcoal-matte hover:bg-charcoal-matte hover:text-white transition-all px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-center cursor-pointer"
                  >
                    View {selectedComboType === 'trinity' ? 'Trinity' : 'Stello'} Series
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* The Permanent Collection Segment (Original Cards preserved) */}
      <section id="permanent-collection" className="bg-surface-container-low py-20 md:py-28 border-t border-platinum-gray/25">
        <div className="px-6 md:px-16 max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-6">
            <div>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-heritage-red">
                The Permanent Collection
              </h2>
              <p className="font-karla text-[10px] tracking-widest uppercase text-tertiary mt-2">
                Curated Professional Instruments
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* Exhibit 1: Pressure Cookers */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <div 
                onClick={() => onNavigate('pressure-cookers')}
                className="relative overflow-hidden bg-white museum-border aspect-[4/3] w-full shadow-sm rounded-2xl cursor-pointer hover:shadow-md transition-shadow duration-300 border border-platinum-gray/30"
              >
                <img 
                  className="w-full h-full object-contain p-6 md:p-8 transition-transform duration-700 group-hover:scale-[1.03]" 
                  alt="Heritage Pressure Series Premium Cooker"
                  src="https://lh3.googleusercontent.com/d/1LxdRCaKW5oqQbthgHe2n3kCFcjxZkyAa"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-16 text-white">
                  <h3 className="font-headline-sm text-headline-sm font-semibold text-white tracking-wide">
                    The Heritage Pressure Series
                  </h3>
                </div>
              </div>
              <div className="mt-4 px-2">
                <p className="font-body-md text-charcoal-matte/80">
                  Engineered for precision. Crafted for the multi-generational kitchen. A synthesis of safety and timeless form.
                </p>
              </div>
            </motion.div>

            {/* Exhibit 2: Cookware */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <div 
                onClick={() => onNavigate('cookware')}
                className="relative overflow-hidden bg-white museum-border aspect-[4/3] w-full shadow-sm rounded-2xl cursor-pointer hover:shadow-md transition-shadow duration-300 border border-platinum-gray/30"
              >
                <img 
                  className="w-full h-full object-contain p-6 md:p-8 transition-transform duration-700 group-hover:scale-[1.03]" 
                  alt="An elegant professional product arrangement of a stainless steel cookware set."
                  src="https://lh3.googleusercontent.com/d/1qB3M62LYPxQKjZL-u5zU7ss2-T3nVyyk"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-16 text-white">
                  <h3 className="font-headline-sm text-headline-sm font-semibold text-white tracking-wide">
                    Master Cookware
                  </h3>
                </div>
              </div>
              <div className="mt-4 px-2">
                <p className="font-body-md text-charcoal-matte/80">
                  Thermal equilibrium achieved through 3-ply construction. Professional performance for the private estate.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lifestyle Banner: Culinary Sanctuaries */}
      <section className="relative w-full h-[65vh] sm:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            className="w-full h-full object-cover select-none" 
            alt="A warm, atmospheric close-up of vegetable curry preparing in a polished stainless steel pan."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJoCuo4uSgHJHu4e-vRQRePolgigYBk4kPVVf2r_FX-a4J5TMilrCtjH-4RNHMWvnxbg-NIuj8FjYqI3YCqf3PoX8074-A4mo5kF3UI0RSzRTDRp2KQuEYB-KWbhzegRY9cnjfKfVBF-1LTgK8CS_BWZ8ksdHtuvobG98g6j9MblrQxwPt9LI_Dh7PhjExinBdbRDvNzLpO0v9RjPTKzcxmFpBAkIUIZodFHoU_kd6fQeewoTGArOKcgyb4uXoTh5vwWT9rpMXBWym"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="relative z-10 px-6 text-center max-w-2xl">
          <div className="bg-white/95 backdrop-blur px-8 py-12 md:px-12 md:py-16 shadow-2xl rounded-2xl">
            <span className="font-karla text-[10px] text-secondary tracking-[0.4em] uppercase mb-4 block">
              The Living Art
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-6 italic text-heritage-red">
              Culinary Sanctuaries
            </h2>
            <p className="font-body-md text-charcoal-matte/90 mb-8 leading-relaxed text-xs sm:text-sm">
              Transforming the daily ritual of preparation into a moment of intentional beauty. Our tools don't just cook; they elevate the sanctuary of the home.
            </p>
            <button 
              onClick={() => onNavigate('contact')}
              className="inline-block bg-heritage-red text-white px-8 py-4 font-sans font-medium text-xs tracking-widest uppercase hover:bg-primary transition-all rounded-xl focus:outline-none shadow-md active:scale-95"
            >
              Experience the Lifestyle
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
