import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { 
  CheckCircle, 
  Trash2, 
  Plus, 
  Minus, 
  ChevronRight, 
  ChevronDown, 
  Star, 
  Share2, 
  ShieldCheck, 
  Info, 
  RotateCcw, 
  Clock, 
  Check, 
  ArrowLeft,
  Settings,
  Flame,
  Award,
  BookOpen,
  Sliders,
  HelpCircle,
  PlayCircle,
  Video,
  X,
  Mail
} from 'lucide-react';
import { PRODUCTS, Product, formatSku } from '../products';
import { CartItem } from '../types';
import { ProductShareModal } from './ProductShareModal';
import { SizeDimensionsOverlay } from './SizeDimensionsOverlay';
import { ProductImageZoom } from './ProductImageZoom';
import { TrustBadges } from './TrustBadges';

interface VideoGuide {
  title: string;
  embedUrl: string;
  tips: string[];
}

const getVideoGuide = (product: Product): VideoGuide => {
  const isHoneycomb = product.category.toLowerCase().includes('honeycomb') || product.id.includes('hc-');
  const isCookware = product.category.toLowerCase().includes('cookware') || product.id.startsWith('hc-') || product.category === 'Cookware';
  
  if (isHoneycomb) {
    return {
      title: 'How to Use Honeycomb Cookware',
      embedUrl: 'https://www.youtube.com/embed/yVvW7S3903Y',
      tips: [
        'Preheat on medium-low heat for 1-2 minutes before adding oil or butter.',
        'Metal-spoon friendly! You can use stainless steel spatulas without scratching.',
        'Avoid high-temperature cooking sprays; use natural cooking oils or butter instead.',
        'Let the cookware cool down completely before washing to preserve non-stick layers.',
      ]
    };
  }
  
  if (isCookware) {
    return {
      title: 'How to Cook with Tri-ply Stainless Steel Cookware',
      embedUrl: 'https://www.youtube.com/embed/C6VOnbALv8Y',
      tips: [
        'Perform the "water droplet test" to check if the preheat temperature is correct.',
        'Tri-ply core distributes heat 3x faster; use low-to-medium heat settings.',
        'Add oil or butter only after preheating to create a natural, semi-nonstick surface.',
        'Avoid bleach, chlorine-based cleaners, or highly abrasive steel scrub pads.',
      ]
    };
  }
  
  if (product.type === 'inner') {
    return {
      title: 'How to Safely Use Inner Lid Pressure Cookers',
      embedUrl: 'https://www.youtube.com/embed/O85u5KAnl5k',
      tips: [
        'Tilt the lid at a 45° angle, and insert it sideways into the mouth of the cooker.',
        'Pull the lid upward so that the sealing rubber/gasket aligns with the rim.',
        'Line up the lid handle with the body handle, and slide the lock ring securely.',
        'Always check that the pressure gasket is soft, crack-free, and snug in place.',
      ]
    };
  }
  
  // Outer lid pressure cookers or default
  return {
    title: 'How to Safely Use Outer Lid Pressure Cookers',
    embedUrl: 'https://www.youtube.com/embed/rK8g7Z6Vp6A',
    tips: [
      'Ensure the vent tube is completely clean and clear of food blocks before closing.',
      'Place the lid on the body, align the arrow markers, and turn clockwise to seal.',
      'Wait for a steady stream of steam to vent from the tube before placing the weight.',
      'Never force open the lid when hot; wait for the pressure indicator to drop completely.',
    ]
  };
};

const getProductSEO = (product: Product, size?: string) => {
  const brandName = "Geetanjali Cookware";
  const sizeSuffix = size ? ` - Size: ${size}` : "";
  const name = product.name;
  const category = product.category;
  
  // Custom SEO configurations based on product characteristics or product.id
  let metaTitle = `${name}${sizeSuffix} | ${category} Premium Collection | ${brandName}`;
  let metaDescription = `${product.description} Shop high-quality 304 food-grade stainless steel & durable Tri-ply ${category} kitchen essentials. Made in India.`;
  let ogTitle = `Buy ${name}${sizeSuffix} Online - ${brandName}`;
  let ogDescription = `Check out the ${name} by ${brandName}. Crafted with ${product.features?.join(', ') || 'premium materials'} for professional home cooking.`;
  let keywords = `${name.toLowerCase()}, ${category.toLowerCase()}, pressure cooker, geetanjali cookware, indian kitchen utensils, ${product.features?.map(f => f.toLowerCase()).join(', ') || ''}`;

  if (product.id === 'tp-handi') {
    metaTitle = `Tri-ply Outer Lid Handi Pressure Cooker${sizeSuffix} | Geetanjali Cookware`;
    metaDescription = `Experience culinary excellence with the Tri-ply Outer Lid Handi. Classic Handi silhouette meets advanced SAS cladding technology (SS 304 + Aluminum + SS 430) for perfect heat retention.`;
    ogTitle = `Tri-ply Outer Lid Handi Pressure Cooker - Premium SAS Cladding`;
    ogDescription = `Classic Handi silhouette combined with advanced SAS Tri-Ply cladding. Retains natural food flavors, ensures zero hot-spots, and cuts cooking time by 30%.`;
    keywords = `tri-ply handi, sas technology, outer lid handi cooker, geetanjali handi, non-stick stainless steel handi, fast cooking handi`;
  } else if (product.id === 'hc-frypan') {
    metaTitle = `Premium Honeycomb Non-Stick Frypan${sizeSuffix} | Metal Spoon Friendly | Geetanjali`;
    metaDescription = `Sauté, fry, and sear to perfection with the Geetanjali Honeycomb Frypan. Features a patented stainless steel honeycomb mesh shield that protects premium food-grade non-stick surfaces.`;
    ogTitle = `Honeycomb Frypan - 100% Metal Spoon Friendly & Non-Stick`;
    ogDescription = `No scratches, no worries. Patented honeycomb protective grid combined with commercial-grade multi-layer non-stick technology. Compatible with induction & gas.`;
    keywords = `honeycomb frypan, metal spoon friendly pan, hybrid non stick frypan, scratch resistant skillet, geetanjali pan`;
  } else if (product.id === 'hc-kadhai') {
    metaTitle = `Premium Honeycomb Non-Stick Kadhai${sizeSuffix} | Metal Spoon Friendly | Geetanjali`;
    metaDescription = `Sauté, deep-fry, and simmer delicious curries with the Geetanjali Honeycomb Kadhai. Features a patented stainless steel honeycomb mesh shield that protects premium food-grade non-stick surfaces.`;
    ogTitle = `Honeycomb Kadhai - 100% Metal Spoon Friendly & Non-Stick`;
    ogDescription = `No scratches, no worries. Patented honeycomb protective grid combined with commercial-grade multi-layer non-stick technology. Premium deep-well curvature for authentic Indian cooking.`;
    keywords = `honeycomb kadhai, metal spoon friendly kadhai, hybrid non stick kadhai, scratch resistant kadhai, geetanjali deep kadhai`;
  } else if (product.id === 'hc-rotitawa') {
    metaTitle = `Premium Honeycomb Non-Stick Roti Tawa${sizeSuffix} | Metal Spoon Friendly | Geetanjali`;
    metaDescription = `Bake perfect soft rotis, phulkas, and chapatis with the Geetanjali Honeycomb Roti Tawa. Features a patented stainless steel honeycomb mesh shield that protects premium food-grade non-stick surfaces.`;
    ogTitle = `Honeycomb Roti Tawa - 100% Metal Spoon Friendly & Non-Stick`;
    ogDescription = `No scratches, no worries. Patented honeycomb protective grid combined with commercial-grade multi-layer non-stick technology. Flat premium surface designed for the softest rotis.`;
    keywords = `honeycomb roti tawa, metal spoon friendly tawa, hybrid non stick roti tawa, scratch resistant tawa, geetanjali roti tawa`;
  } else if (product.id === 'hc-dosatawa') {
    metaTitle = `Premium Honeycomb Non-Stick Dosa Tawa${sizeSuffix} | Metal Spoon Friendly | Geetanjali`;
    metaDescription = `Make crispy restaurant-style dosas, uttapams, and crepes with the Geetanjali Honeycomb Dosa Tawa. Features a patented stainless steel honeycomb mesh shield that protects premium food-grade non-stick surfaces.`;
    ogTitle = `Honeycomb Dosa Tawa - 100% Metal Spoon Friendly & Non-Stick`;
    ogDescription = `No scratches, no worries. Patented honeycomb protective grid combined with commercial-grade multi-layer non-stick technology. Extra wide surface for folding perfect dosas.`;
    keywords = `honeycomb dosa tawa, metal spoon friendly dosa tawa, hybrid non stick dosa tawa, scratch resistant tawa, geetanjali dosa tawa`;
  } else if (product.id === 'hc-tasla') {
    metaTitle = `Premium Honeycomb Non-Stick Tasla${sizeSuffix} | Metal Spoon Friendly | Geetanjali`;
    metaDescription = `Prepare perfect dough, stir-fries, and everyday curries with the Geetanjali Honeycomb Tasla. Features a patented stainless steel honeycomb mesh shield that protects premium food-grade non-stick surfaces.`;
    ogTitle = `Honeycomb Tasla - 100% Metal Spoon Friendly & Non-Stick`;
    ogDescription = `No scratches, no worries. Patented honeycomb protective grid combined with commercial-grade multi-layer non-stick technology. Wide shallow mouth designed for multi-purpose kitchen prep.`;
    keywords = `honeycomb tasla, honeycomb tasra, metal spoon friendly tasla, hybrid non stick tasla, scratch resistant tasla, geetanjali tasla`;
  } else if (product.id === 'bb-inner') {
    metaTitle = `Black Beauty Hard Anodized Inner Lid Pressure Cooker${sizeSuffix} | Geetanjali`;
    metaDescription = `Sleek, heat-absorbent, and stronger than steel. The Geetanjali Black Beauty Inner Lid pressure cooker delivers incredible fuel savings and robust kitchen safety.`;
    ogTitle = `Black Beauty Inner Lid Hard Anodized Pressure Cooker`;
    ogDescription = `Incredible fuel savings combined with premium matte-black hard-anodized durability. Features high-retention inner lid, extra-thick base, and ISI dual-safety valve.`;
    keywords = `black beauty cooker, hard anodized cooker, inner lid pressure cooker, geetanjali black beauty, matte black pressure cooker, fuel saving cooker`;
  } else if (product.id === 'ss-regular') {
    metaTitle = `Regular Stainless Steel Pressure Cooker${sizeSuffix} | 304 Food-Grade | Geetanjali`;
    metaDescription = `High-durability 304 food-grade Stainless Steel Regular Shape Pressure Cooker with mirror finish. ISI certified safety mechanisms and thick-gauge sandwich base for even heat.`;
    ogTitle = `Geetanjali Regular Stainless Steel Outer Lid Cooker`;
    ogDescription = `Professional quality 304 stainless steel regular shape cooker. Built with reliable double-safety valve, heat-resistant handles, and premium heavy-gauge base.`;
    keywords = `stainless steel cooker, regular shape pressure cooker, isi certified cooker, food grade 304 cooker, geetanjali steel cooker`;
  }

  return {
    metaTitle,
    metaDescription,
    ogTitle,
    ogDescription,
    keywords,
    ogImage: product.image,
    ogUrl: typeof window !== 'undefined' ? window.location.href : '',
  };
};

const getDefaultSize = (prod: any) => {
  if (prod.id === 'ss-regular') return '5.0L';
  if (prod.id === 'tp-classic') return '5.0L';
  if (prod.id === 'tp-contura') return '8.0L';
  if (prod.id === 'tp-handi') return '3.0L';
  if (prod.id === 'tp-regular') return '5.0L';
  return prod.sizes[0] || 'Standard';
};

interface ProductDetailViewProps {
  productId: string;
  onAddToCart: (productId: string, size: string, quantity?: number, isLidSelected?: boolean) => void;
  cartItems: CartItem[];
  onRemoveItem: (itemId: string) => void;
  onNavigate: (page: any, targetId?: string) => void;
  initialSize?: string;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  productId,
  onAddToCart,
  cartItems,
  onRemoveItem,
  onNavigate,
  initialSize,
}) => {
  const product = PRODUCTS.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="py-20 text-center max-w-md mx-auto">
        <h2 className="text-2xl font-display font-bold text-charcoal-matte mb-4">Product Not Found</h2>
        <p className="text-xs text-charcoal-matte/70 mb-8">The requested cookware or pressure cooker item does not exist or has been discontinued.</p>
        <button 
          onClick={() => onNavigate('home')}
          className="bg-heritage-red text-white px-6 py-2.5 rounded text-xs font-semibold hover:bg-primary transition-all"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const isCookware = 
    product.category.toLowerCase().includes('cookware') || 
    product.id.startsWith('hc-') || 
    product.category === 'Cookware';

  // State Management
  const [selectedSize, setSelectedSize] = useState<string>(initialSize || getDefaultSize(product));
  const [quantity, setQuantity] = useState<number>(1);
  const [withLid, setWithLid] = useState<boolean>(true); // Cookware specific: SS Lid option
  const [selectedThumbIndex, setSelectedThumbIndex] = useState<number>(0);
  const [activeCollageIndex, setActiveCollageIndex] = useState<number>(0);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0); // Default open first one
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const [hoveredSize, setHoveredSize] = useState<string | null>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  // Dynamic Slicing States for Honeycomb multi-tile images
  const [tileCols, setTileCols] = useState<number>(3);
  const [tileRows, setTileRows] = useState<number>(4);
  const [tileAdjustments, setTileAdjustments] = useState<Record<string, { x: number; y: number; zoom: number }>>(() => {
    const initial: Record<string, { x: number; y: number; zoom: number }> = {};
    for (let i = 1; i <= 24; i++) {
      const r = Math.floor((i - 1) / 3);
      // Pre-set high-precision default alignments for rows 0, 1, 2 of 3x4 layout
      if (r === 0) {
        initial[`hc-frypan-tile-${i}`] = { x: 0, y: 3.5, zoom: 104 };
      } else if (r === 1) {
        initial[`hc-frypan-tile-${i}`] = { x: 0, y: 1.8, zoom: 102 };
      } else if (r === 2) {
        initial[`hc-frypan-tile-${i}`] = { x: 0, y: -0.2, zoom: 101 };
      } else {
        initial[`hc-frypan-tile-${i}`] = { x: 0, y: -1.2, zoom: 100 };
      }
    }
    return initial;
  });

  // E-commerce interactive detail states
  const [activeAnatomyComponent, setActiveAnatomyComponent] = useState<string>('body');
  const [activeSafetyFeature, setActiveSafetyFeature] = useState<string>('grs');
  const [activeEcomTab, setActiveEcomTab] = useState<'components' | 'safety' | 'features'>('components');

  // Update Recently Viewed products
  useEffect(() => {
    try {
      const stored = localStorage.getItem('recently_viewed_products');
      let ids: string[] = stored ? JSON.parse(stored) : [];
      if (!Array.isArray(ids)) {
        ids = [];
      }
      
      const updatedIds = [productId, ...ids.filter((id) => id !== productId)].slice(0, 6);
      localStorage.setItem('recently_viewed_products', JSON.stringify(updatedIds));
      
      const list = updatedIds
        .filter((id) => id !== productId)
        .map((id) => PRODUCTS.find((p) => p.id === id))
        .filter((p): p is Product => !!p)
        .slice(0, 4);
      
      setRecentlyViewed(list);
    } catch (e) {
      console.error('Error updating recently viewed items', e);
    }
  }, [productId]);

  // Reset states on product change
  useEffect(() => {
    setSelectedSize(initialSize || getDefaultSize(product));
    setQuantity(1);
    setWithLid(true);
    setSelectedThumbIndex(0);
    setActiveCollageIndex(0);
    setImageLoading(true);
  }, [productId, product, initialSize]);

  // Reset collage index when thumbnails are switched
  useEffect(() => {
    setActiveCollageIndex(0);
  }, [selectedThumbIndex]);

  // Dynamic SEO and Open Graph Tag Injection
  useEffect(() => {
    if (!product) return;
    
    const seo = getProductSEO(product, selectedSize);
    
    // 1. Update Document Title
    document.title = seo.metaTitle;
    
    // Helper function to create or update meta tags safely
    const updateOrCreateMeta = (nameOrProperty: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${nameOrProperty}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, nameOrProperty);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Update Standard Meta Tags
    updateOrCreateMeta('description', seo.metaDescription);
    updateOrCreateMeta('keywords', seo.keywords);
    
    // 3. Update Open Graph (OG) Tags
    updateOrCreateMeta('og:title', seo.ogTitle, true);
    updateOrCreateMeta('og:description', seo.ogDescription, true);
    updateOrCreateMeta('og:image', seo.ogImage, true);
    updateOrCreateMeta('og:url', seo.ogUrl, true);
    updateOrCreateMeta('og:type', 'product', true);
    updateOrCreateMeta('og:site_name', 'Geetanjali Cookware', true);
    
    // 4. Update Twitter Card Tags
    updateOrCreateMeta('twitter:card', 'summary_large_image');
    updateOrCreateMeta('twitter:title', seo.ogTitle);
    updateOrCreateMeta('twitter:description', seo.ogDescription);
    updateOrCreateMeta('twitter:image', seo.ogImage);

    return () => {
      document.title = 'Geetanjali Cookware | Premium Kitchenware & Pressure Cookers';
    };
  }, [product, selectedSize]);

  // Pricing calculations
  const baseDiscountedPrice = product.prices?.[selectedSize] ?? 1999;
  const priceAdjustment = isCookware && withLid ? 500 : 0;
  const finalDiscountedPrice = baseDiscountedPrice + priceAdjustment;
  
  // Strikethrough (Original Price) is roughly 55% higher to simulate massive dealer savings
  const finalOriginalPrice = Math.round(finalDiscountedPrice * 1.55);
  const savingsAmount = finalOriginalPrice - finalDiscountedPrice;

  // Check if this exact variation is already in the Enquiry list
  const cartItemId = `${product.id}_${selectedSize.replace(/\s+/g, '')}${isCookware ? (withLid ? 'WithLid' : 'NoLid') : ''}`;
  const isCurrentlyInList = cartItems.some((item) => item.id === cartItemId || (item.productId === product.id && item.size.startsWith(selectedSize)));

  // Generate 12 distinct photo/views programmatically using filters, overlays and visual adjustments
  const generateViews = (): any[] => {
    const defaultImg = (selectedSize && product.sizeImages && product.sizeImages[selectedSize])
      ? product.sizeImages[selectedSize]
      : (product.image || 'https://lh3.googleusercontent.com/d/1MovYM6_G-segYPpW5poewW4j-dVYM8ov');
    
    if (product.id === 'ss-regular') {
      return [
        {
          id: 'ss-regular-seq-1',
          title: 'Complete Assembled Regular Cooker',
          subtitle: 'Classic regular shape body showcasing the mirror-polished stainless steel and robust outer lid safety',
          img: 'https://lh3.googleusercontent.com/d/185Df8Wcoaa-YqmG7iJ91qpngY-F6oC0e',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'ss-regular-seq-2',
          title: 'Seamless Cooker Interior Cavity',
          subtitle: 'Food-grade 304 stainless steel interior layer ensuring ultra-hygienic rust-free healthy cooking',
          img: 'https://lh3.googleusercontent.com/d/1hOPORnbm3COGtMfB8uGRQbl9MJab-E8R',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'ss-regular-seq-3',
          title: 'Gasket Release Safety Window',
          subtitle: 'Precision engineered rim slot acting as a secondary pressure-relieving exit window for extra safety',
          img: 'https://lh3.googleusercontent.com/d/1RXtO5GK5rw7_uKeuhOwzrbCmqZSg-WF2',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'ss-regular-seq-4',
          title: 'Precision Outer Lid Assembly',
          subtitle: 'Heavy-gauge stainless steel outer lid designed for high-pressure durability and seamless lock fit',
          img: 'https://lh3.googleusercontent.com/d/1NQddYeXDg5uH8UUgteMkU6_yETXgVdp2',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'ss-regular-seq-5',
          title: 'Whistle Weight & Safety Valve',
          subtitle: 'Optimal pressure-regulating whistle weight paired with spring safety valve core backup',
          img: 'https://lh3.googleusercontent.com/d/1QzAKpzaVbEU_-1fwftljyrryXaPzbqPH',
          style: { transform: 'scale(1)' },
          overlay: null
        },

        {
          id: 'ss-regular-seq-7',
          title: 'SAS Tri-Ply Induction Base',
          subtitle: 'Three-layer clad base with pure aluminum core sandwiched for rapid and perfectly uniform heat spread',
          img: 'https://lh3.googleusercontent.com/d/1ItUaoeDK9cKHOJFReZ10l6ZwhjIDWOmc',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'ss-regular-seq-8',
          title: 'Secured High-Strength Handle Anchor',
          subtitle: 'Double-riveted brackets engineered to anchor the heat-resistant handles with zero movement',
          img: 'https://lh3.googleusercontent.com/d/1Mn6aiw1_vKZdnOLRIalDrHsTlE9B2OOa',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'ss-regular-seq-9',
          title: 'Heavy-Gauge Sealing Rim',
          subtitle: 'Perfectly aligned lock rim profile allowing easy slide-open lid motion and supreme durability',
          img: 'https://lh3.googleusercontent.com/d/1Ehyer9T1yGRsvQxOHW0n7US-bTck0JX6',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'ss-regular-seq-10',
          title: 'Classic Regular Lifestyle Profile',
          subtitle: 'Luxurious kitchen aesthetic marrying classical design with modern high-performance cooking efficiency',
          img: 'https://lh3.googleusercontent.com/d/1C4R4Wv-Pt1iDyPy9tNNX4nHwIiY0MrVe',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'ss-regular-seq-11',
          title: 'Advanced Induction Base Design',
          subtitle: 'Heavy-duty sandwich bottom base optimized for rapid and uniform heat distribution on all cooktops',
          img: 'https://lh3.googleusercontent.com/d/1i6XzJXvY5NkM0TZlUaf-ngl0qssE0D8y',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'ss-regular-seq-14',
          title: 'Premium Mirror-Polished Outer Lid',
          subtitle: 'Impeccable high-grade stainless steel lid engineered for long-lasting performance and high pressure retention',
          img: 'https://lh3.googleusercontent.com/d/1BcrOE7H9_K-T3KjnLekrk5UlS98c5mP7',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'ss-regular-seq-15',
          title: 'Stello Regular Outer Lid View 15',
          subtitle: 'Heavy-gauge stainless steel outer lid pressure cooker showcase view',
          img: 'https://lh3.googleusercontent.com/d/1Oul5ZwsSvz1dLyEanEJ7Prhd6bpUmadr',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'ss-regular-seq-16',
          title: 'Stello Regular Outer Lid View 16',
          subtitle: 'Precision engineered mirror finish cookware detail',
          img: 'https://lh3.googleusercontent.com/d/1APpXr8tbxeqm9OVIx0vC89hzUlF-wwZL',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'ss-regular-collage-new',
          title: 'Regular Outer Lid Collage',
          subtitle: 'Professional multi-angle regular outer lid cooker catalog presentation and parts layout',
          img: 'https://lh3.googleusercontent.com/d/1DUDJBRm7sRtfIe-SauvEzpLsF-NWJOWS',
          isCollage: true,
          collageSize: 'Regular Sizes: 1.5L, 2.0L, 3.0L, 5.0L, 8.0L, 10.0L',
          collageImages: [
            'https://lh3.googleusercontent.com/d/1DUDJBRm7sRtfIe-SauvEzpLsF-NWJOWS',
            'https://lh3.googleusercontent.com/d/1Z9UeQFukQppmRfr3E9ngRLl7NG0rQlT4',
            'https://lh3.googleusercontent.com/d/17FZXvpywGNQfvYoQLnR6VZ0KtzEhk8qb',
            'https://lh3.googleusercontent.com/d/1D4yMf_qWXDckoecChqPkJTvk_u5_eNfV',
            'https://lh3.googleusercontent.com/d/1PlN9AspbLkG9sazPUJH54m2FUJ2k4WTs'
          ],
          mainLabel: 'Assembled Regular Outer Lid Cooker',
          collageLabels: [
            'Mirror-Polished Front View',
            'Seamless Steel Interior',
            'Heavy SAS Tri-Ply Base',
            'Calibrated Weight Whistle',
            'Pressure Tight Outer Lid'
          ],
          collageZoomStyles: [
            { transform: 'scale(1)' },
            { transform: 'scale(1)' },
            { transform: 'scale(1)' },
            { transform: 'scale(1)' },
            { transform: 'scale(1)' }
          ],
          style: { transform: 'scale(1)' },
          overlay: null
        }
      ];
    }
    
    if (product.id === 'ss-contura') {
      return [
        {
          id: 'ss-contura-seq-1',
          title: 'Complete Assembled Contura Cooker',
          subtitle: 'Graceful Contura curved body showcasing the mirror-polished stainless steel and robust lid lock',
          img: 'https://lh3.googleusercontent.com/d/1yHVinAI_Z_VW2Gqs8Dh4wNHMLWjmJFmS',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'ss-contura-seq-2',
          title: 'Seamless Contura Interior Cavity',
          subtitle: 'Food-grade 304 stainless steel interior layer ensuring ultra-hygienic rust-free healthy cooking',
          img: 'https://lh3.googleusercontent.com/d/1lS5ftYDMxgRDrWHU4R2oBJK6Zs5fjt15',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'ss-contura-seq-4',
          title: 'Secure Double-Riveted Handles',
          subtitle: 'Sturdy heat-resistant bakelite handle alignment anchored with heavy-duty dual rivets for reliable lift',
          img: 'https://lh3.googleusercontent.com/d/1APpXr8tbxeqm9OVIx0vC89hzUlF-wwZL',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'ss-contura-seq-5',
          title: 'Whistle Weight & Safety Valve',
          subtitle: 'Optimal pressure-regulating whistle weight paired with spring safety valve core backup',
          img: 'https://lh3.googleusercontent.com/d/1f7NfN0OGi1k0b9QVLtIIJzMUSFV_Lac3',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'ss-contura-seq-6',
          title: 'SAS Tri-Ply Induction Base',
          subtitle: 'Three-layer clad base with pure aluminum core sandwiched for rapid and perfectly uniform heat spread',
          img: 'https://lh3.googleusercontent.com/d/1WwEFeby86YbtxqJB4Z5R1xq4kMNiVuhe',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'ss-contura-seq-7',
          title: 'Food-Grade Silicone Gasket',
          subtitle: 'Highly durable air-tight seal maintaining stable internal pressure without flavor loss',
          img: 'https://lh3.googleusercontent.com/d/18B6zQTtgaYJn3ZXAzojnu29MxSH_6d4S',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'ss-contura-seq-8',
          title: 'Heavy-Gauge Sealing Rim',
          subtitle: 'Perfectly aligned lock rim profile allowing easy slide-open lid motion and supreme durability',
          img: 'https://lh3.googleusercontent.com/d/1McXhv_EzSSs1GS8CR-jjlSHVaMFBKf-x',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'ss-contura-seq-9',
          title: 'Gasket Release Safety Window',
          subtitle: 'Precision engineered rim slot acting as a secondary pressure-relieving exit window for extra safety',
          img: 'https://lh3.googleusercontent.com/d/1zhF95bb02EqlPHRynuecQA0EGALB_DPI',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'ss-contura-seq-10',
          title: 'Classic Contura Lifestyle Profile',
          subtitle: 'Luxurious kitchen aesthetic marrying classical curves with modern high-performance cooking efficiency',
          img: 'https://lh3.googleusercontent.com/d/1J-80VsR8rXXNxwxx0vc_9mhTKFzrLzGy',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'ss-contura-seq-11',
          title: 'Premium Polished Inner Lid',
          subtitle: 'Impeccable mirror-polished stainless steel lid surface engineered to withstand domestic cooking wear',
          img: 'https://lh3.googleusercontent.com/d/1ZMK8myDcsV5I4xK9eMmBWHmANj5mzM50',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'ss-contura-seq-12',
          title: 'Secured High-Strength Handle Anchor',
          subtitle: 'Double-riveted brackets engineered to anchor the heat-resistant handles with zero movement',
          img: 'https://lh3.googleusercontent.com/d/1kcwq0xdEXg40NQBsTakoaY4TFu1TeWnS',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'ss-contura-collage-new',
          title: 'Contura Inner Lid Collage',
          subtitle: 'Professional multi-angle Contura inner lid cooker catalog presentation and parts layout',
          img: 'https://lh3.googleusercontent.com/d/1gOJlVmAVNIohseF6S1bTbjhoq6niXyRS',
          isCollage: true,
          collageSize: 'Contura Sizes: 1.5L, 2.0L, 3.0L, 5.0L, 6.0L',
          specialtyHighlight: 'Speciality: 1.5L Compact Fuel-Saver',
          collageImages: [
            'https://lh3.googleusercontent.com/d/1gOJlVmAVNIohseF6S1bTbjhoq6niXyRS',
            'https://lh3.googleusercontent.com/d/1wDpvrGv3acMz0LWLooaIP3zlG6uMR0rF',
            'https://lh3.googleusercontent.com/d/1zK8uHmcWnhTAICQqrTw7PACkDgQbc1dI',
            'https://lh3.googleusercontent.com/d/12wO3HOnB5IVfvSRy1Ef3FZDH1_a12H9b',
            'https://lh3.googleusercontent.com/d/1EYdHCFVkQQ1GZTkwWRqtS1cFKbsRmYN8',
            'https://lh3.googleusercontent.com/d/1GGM1c-1TAAUGDT9paK1NRY7eKmJ8rdXq'
          ],
          mainLabel: 'Assembled Contura 1.5L Cooker',
          collageLabels: [
            'Polished Side Angle View',
            'Premium Contura Profile',
            'Calibrated Weight Whistle',
            'Robust Double Handle Anchor',
            'Heat-Regulating Base Core',
            'Interior Cavity & Rim Lock'
          ],
          collageZoomStyles: [
            { transform: 'scale(1)' },
            { transform: 'scale(1)' },
            { transform: 'scale(1)' },
            { transform: 'scale(1)' },
            { transform: 'scale(1)' },
            { transform: 'scale(1)' }
          ],
          style: { transform: 'scale(1)' },
          overlay: null
        }
      ];
    }
    
    if (product.id === 'tp-handi') {
      return [
        {
          id: 'handi-main',
          title: 'Tri-Ply Handi Outer Lid',
          subtitle: 'Traditional handi style with state-of-the-art SAS tri-ply material',
          img: defaultImg,
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'handi-fresh-1',
          title: 'Tri-Ply Handi Outer Lid - View 1',
          subtitle: 'Traditional curved handi body with high-luster polished finish',
          img: 'https://lh3.googleusercontent.com/d/1diq-KE9P4aC399JIqcWr_nXGHBhPf9Ec',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'handi-fresh-2',
          title: 'Tri-Ply Handi Outer Lid - View 2',
          subtitle: 'Precision outer lid fit with heavy-duty steam regulator',
          img: 'https://lh3.googleusercontent.com/d/1fI6f1UE_6EZaPHAVFOrQkYrVa9UZ6-9E',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'handi-fresh-3',
          title: 'Tri-Ply Handi Outer Lid - View 3',
          subtitle: 'Ergonomic dual-riveted side handles for balanced handling',
          img: 'https://lh3.googleusercontent.com/d/100zA3PHVNyf6cEWqRATxPsNaTr-XdMXG',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'handi-fresh-4',
          title: 'Tri-Ply Handi Outer Lid - View 4',
          subtitle: 'Seamless food-grade stainless steel interior cooking cavity',
          img: 'https://lh3.googleusercontent.com/d/1r5rITO_XXk6VOEtk3dJPTqYvXPLTc81o',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'handi-fresh-5',
          title: 'Tri-Ply Handi Outer Lid - View 5',
          subtitle: 'Whistle weight valve and safety release mechanism',
          img: 'https://lh3.googleusercontent.com/d/10CzNGCSgONgvD7fmbByclh4PH0PWU-ie',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'handi-fresh-6',
          title: 'Tri-Ply Handi Outer Lid - View 6',
          subtitle: 'Optimized thermal absorption base performance',
          img: 'https://lh3.googleusercontent.com/d/1YbQ7N6zEEVTVxF47A7xDhTeJxOoCugZj',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'handi-fresh-7',
          title: 'Tri-Ply Handi Outer Lid - View 7',
          subtitle: 'SAS tri-ply bonding core technology diagram',
          img: 'https://lh3.googleusercontent.com/d/1jCDISzimOviRXdmxg0x2M2AVG4Xfm26P',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'handi-fresh-8',
          title: 'Tri-Ply Handi Outer Lid - View 8',
          subtitle: 'Professional multi-angle studio showcase view',
          img: 'https://lh3.googleusercontent.com/d/1dYpUUf08f07I54JKzr8QhQI6HoVbn6Ot',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'handi-fresh-9',
          title: 'Tri-Ply Handi Outer Lid - View 9',
          subtitle: 'Full assembled Tri-ply handi outer lid cooker profile',
          img: 'https://lh3.googleusercontent.com/d/1oSoxSU9E_HwjOUM-KI5mB0T3l3LO9l1f',
          style: { transform: 'scale(1)' },
          overlay: null
        }
      ];
    }

    if (product.id === 'ss-handi') {
      const handiViews: any[] = [
        {
          id: 'handi-seq-1',
          title: 'Complete Assembled Handi Cooker',
          subtitle: 'Graceful Handi shape body showcasing the mirror-polished exterior and robust lid safety',
          img: 'https://lh3.googleusercontent.com/d/1uavK27bMjrDXGLXmah0YVaZF383aLukm',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'handi-seq-2',
          title: 'Seamless Handi Interior Cavity',
          subtitle: 'Food-grade 304 stainless steel interior layer ensuring ultra-hygienic rust-free healthy cooking',
          img: 'https://lh3.googleusercontent.com/d/1wg7LtjOw-A5LSSNLW9a1ZNnZAUOu8WJB',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'handi-seq-3',
          title: 'Precision Outer Lid Assembly',
          subtitle: 'Heavy-gauge stainless steel outer lid designed for high-pressure durability and seamless lock fit',
          img: 'https://lh3.googleusercontent.com/d/1Oul5ZwsSvz1dLyEanEJ7Prhd6bpUmadr',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'handi-seq-4',
          title: 'Secure Double-Riveted Handles',
          subtitle: 'Sturdy heat-resistant bakelite handle alignment anchored with heavy-duty dual rivets for reliable lift',
          img: 'https://lh3.googleusercontent.com/d/11SyrHKUXiNOSy5pnqKzaZp4SkU4QB807',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'handi-seq-5',
          title: 'Whistle Weight & Safety Valve',
          subtitle: 'Optimal pressure-regulating whistle weight paired with spring safety valve core backup',
          img: 'https://lh3.googleusercontent.com/d/1x3RZYz74EoZK9xdqrst1_1snkWV1E3Dn',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'handi-seq-7',
          title: 'Food-Grade Silicone Gasket',
          subtitle: 'Highly durable air-tight seal maintaining stable internal pressure without flavor loss',
          img: 'https://lh3.googleusercontent.com/d/1JOOf-OQ1FOIjYoy_89KfdRFpleu0R-8j',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'handi-seq-8',
          title: 'Heavy-Gauge Sealing Rim',
          subtitle: 'Perfectly aligned lock rim profile allowing easy slide-open lid motion and supreme durability',
          img: 'https://lh3.googleusercontent.com/d/15ncFr9L1C5b-Lvm3W_t_8IuCzWQrdc9z',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'handi-seq-9',
          title: 'Gasket Release Safety Window',
          subtitle: 'Precision engineered rim slot acting as a secondary pressure-relieving exit window for extra safety',
          img: 'https://lh3.googleusercontent.com/d/1RVuCJFWxgf8qW94BdHA6PFjlhEc5iuRH',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'handi-seq-10',
          title: 'Classic Handi Lifestyle Profile',
          subtitle: 'Luxurious kitchen aesthetic marrying classical curves with modern high-performance cooking efficiency',
          img: 'https://lh3.googleusercontent.com/d/1vr0LKoDpruBfthRdzKtMtHlh8GF-f0hI',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'handi-seq-11',
          title: 'Premium Polished Outer Lid',
          subtitle: 'Impeccable mirror-polished stainless steel lid surface engineered to withstand domestic cooking wear',
          img: 'https://lh3.googleusercontent.com/d/1BcrOE7H9_K-T3KjnLekrk5UlS98c5mP7',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'handi-seq-12',
          title: 'Secured High-Strength Handle Anchor',
          subtitle: 'Double-riveted brackets engineered to anchor the heat-resistant handles with zero movement',
          img: 'https://lh3.googleusercontent.com/d/1APpXr8tbxeqm9OVIx0vC89hzUlF-wwZL',
          style: { transform: 'scale(1)' },
          overlay: null
        }
      ];
      if (product.id === 'ss-handi') {
        handiViews.push({
          id: 'ss-handi-collage-new',
          title: 'Handi Outer Lid Collage',
          subtitle: 'Professional multi-angle Handi outer lid cooker catalog presentation and parts layout',
          img: 'https://lh3.googleusercontent.com/d/1uavK27bMjrDXGLXmah0YVaZF383aLukm',
          isCollage: true,
          collageSize: 'Handi Sizes: 2.0L, 3.0L, 5.0L',
          collageImages: [
            'https://lh3.googleusercontent.com/d/1uavK27bMjrDXGLXmah0YVaZF383aLukm',
            'https://lh3.googleusercontent.com/d/1hEaWlj9UBvG_lmHV5RWdoWHFkFaWR2jw',
            'https://lh3.googleusercontent.com/d/1pCwrRXjVC5u4FGrns8iwuMsqCo_n74QM',
            'https://lh3.googleusercontent.com/d/1xTd9XDTYpl71bR68Gg3AZ8buJELFDkQQ',
            'https://lh3.googleusercontent.com/d/13UH2rerKoL-uarJ7e0e2kl2o2AOK6CEt',
            'https://lh3.googleusercontent.com/d/113Ehe5uIC98cSlrP1Vn3gXurn3ikCbqo'
          ],
          mainLabel: 'Assembled Handi Outer Lid Cooker',
          collageLabels: [
            'Traditional Handi Design',
            'Premium Sealing Lid',
            'SAS Tri-Ply Bottom Base',
            'Secure Dual Handle Anchor',
            'Controlled Gasket Window'
          ],
          collageZoomStyles: [
            { transform: 'scale(1)' },
            { transform: 'scale(1)' },
            { transform: 'scale(1)' },
            { transform: 'scale(1)' },
            { transform: 'scale(1)' }
          ],
          style: { transform: 'scale(1)' },
          overlay: null
        });
      }
      return handiViews;
    }

    if (product.id === 'tp-regular') {
      return [
        {
          id: 'reg-main',
          title: 'Tri-Ply Outer Lid - Regular',
          subtitle: 'Professional grade classic shape engineered with true tri-ply cladding',
          img: defaultImg,
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'reg-fresh-2',
          title: 'Tri-Ply Regular Outer Lid - View 2',
          subtitle: 'High sheen mirror-polished exterior body',
          img: 'https://lh3.googleusercontent.com/d/11v9Z-xj4jBl5Rjml_hhK3cPca7LiLveP',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'reg-fresh-1',
          title: 'Tri-Ply Regular Outer Lid - View 1',
          subtitle: 'Professional grade classic outer lid shape engineered with true tri-ply cladding',
          img: 'https://lh3.googleusercontent.com/d/1snCORDvPT_1Qd-sRysXssky-T5WEr78x',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'reg-add-gas',
          title: 'On Active Gas Stove',
          subtitle: 'Optimized heat absorption and safety performance on high-flame gas cooktops',
          img: 'https://lh3.googleusercontent.com/d/1YbQ7N6zEEVTVxF47A7xDhTeJxOoCugZj',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'reg-add-studio',
          title: '3-Angle Studio Showcase',
          subtitle: 'Multiple catalog views illustrating proportions, safety lid, and mirror-polished finish',
          img: 'https://lh3.googleusercontent.com/d/1dYpUUf08f07I54JKzr8QhQI6HoVbn6Ot',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'reg-fresh-3',
          title: 'Tri-Ply Regular Outer Lid - View 3',
          subtitle: 'Ergonomic dual handle assembly with heat-resistant grips',
          img: 'https://lh3.googleusercontent.com/d/1YgPxNyb2I-CtK-Pcwxi9RnP6Yg8P1EVe',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'reg-fresh-4',
          title: 'Tri-Ply Regular Outer Lid - View 4',
          subtitle: 'Heavy-duty brass weight regulator valve detail',
          img: 'https://lh3.googleusercontent.com/d/1CAXVteL6C5K9b5Ni8_9bsbpz38iUOOAb',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'reg-fresh-6',
          title: 'Tri-Ply Regular Outer Lid - View 6',
          subtitle: 'Precision induction-compatible base construction',
          img: 'https://lh3.googleusercontent.com/d/1fmNc-elZ0saF26Zy1cOc_NGqimocrG0z',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'reg-fresh-7',
          title: 'Tri-Ply Regular Outer Lid - View 7',
          subtitle: 'Heavy-gauge outer lid seal alignment',
          img: 'https://lh3.googleusercontent.com/d/11-34BKWtzL4m_ijnVw5pqsBiwbzAcBOq',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'reg-fresh-8',
          title: 'Tri-Ply Regular Outer Lid - View 8',
          subtitle: 'Durable dual-riveted side bracket handles',
          img: 'https://lh3.googleusercontent.com/d/10ulPkGUr4Ez7XRIvi2ycZYRsMsH8Z6U9',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'reg-fresh-9',
          title: 'Tri-Ply Regular Outer Lid - View 9',
          subtitle: 'Gasket release safety mechanism window',
          img: 'https://lh3.googleusercontent.com/d/1BwnHCKGP1M5GbsFFpCmiNXt2NiERDPo1',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'reg-fresh-10',
          title: 'Tri-Ply Regular Outer Lid - View 10',
          subtitle: 'Spacious high-capacity cooker body profile',
          img: 'https://lh3.googleusercontent.com/d/1M9UPk6ncj4X_mVTI5001eytOh02CKX_Z',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'reg-fresh-11',
          title: 'Tri-Ply Regular Outer Lid - View 11',
          subtitle: 'Polished lid locking mechanism and rim',
          img: 'https://lh3.googleusercontent.com/d/1eLElV1Ok73TnEzANJa58UWDDeu2DSUC-',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'reg-fresh-12',
          title: 'Tri-Ply Regular Outer Lid - View 12',
          subtitle: 'Premium tri-ply SAS metallic sheen showcase',
          img: 'https://lh3.googleusercontent.com/d/17W7-pvaNGGfJiuENIl7k6X2H8HM5o5x5',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'reg-fresh-13',
          title: 'Tri-Ply Regular Outer Lid - View 13',
          subtitle: 'Under-lid rubber gasket seating channel',
          img: 'https://lh3.googleusercontent.com/d/1eI4Kzc4NqT3m8jk60NcJj6hUaQYCS-ff',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'reg-fresh-14',
          title: 'Tri-Ply Regular Outer Lid - View 14',
          subtitle: 'Flat induction bottom and outer rim details',
          img: 'https://lh3.googleusercontent.com/d/11-UQJAWWf9lqilUGXABX8I_PF9gkVIoA',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'reg-fresh-15',
          title: 'Tri-Ply Regular Outer Lid - View 15',
          subtitle: 'High thermal conductivity bottom view',
          img: 'https://lh3.googleusercontent.com/d/1ZUfQfbjh2tCsB8VDXDQDy8R7kHD5fGXF',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'reg-fresh-17',
          title: 'Tri-Ply Regular Outer Lid - View 17',
          subtitle: 'Professional kitchen studio showcase angle',
          img: 'https://lh3.googleusercontent.com/d/1v6DTxmSw05mJ3vOAQ-FjaUfsTTZjauzd',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'reg-fresh-18',
          title: 'Tri-Ply Regular Outer Lid - View 18',
          subtitle: 'Sleek geometric proportions and mirror finish',
          img: 'https://lh3.googleusercontent.com/d/1P-DT9He5qTjt5PLa5BMR1c2vmk675n-D',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'reg-fresh-19',
          title: 'Tri-Ply Regular Outer Lid - View 19',
          subtitle: 'Full assembled Tri-ply regular outer lid pressure cooker',
          img: 'https://lh3.googleusercontent.com/d/1zRtUEpY4mm3f7xb0z3f0cZwU0qQFILD3',
          style: { transform: 'scale(1)' },
          overlay: null
        }
      ];
    }

    if (product.id === 'tp-classic') {
      return [
        {
          id: 'classic-main',
          title: 'Tri-ply Inner Lid - Classic (Main View)',
          subtitle: 'Straight-wall classic shape combined with heavy-gauge SAS tri-ply cladding',
          img: defaultImg,
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'classic-fresh-1',
          title: 'Tri-ply Inner Lid Classic - View 1',
          subtitle: 'Straight-wall classic body profile with mirror-finish shine',
          img: 'https://lh3.googleusercontent.com/d/1JF630OHZ-fUKUg3qIg_I86StO13yxdkr',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'classic-fresh-2',
          title: 'Tri-ply Inner Lid Classic - View 2',
          subtitle: 'High sheen side profile showing pristine handle alignment',
          img: 'https://lh3.googleusercontent.com/d/1kg2v1dkqgD2KyOEaCEsMKMJQi9quDYO7',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'classic-fresh-3',
          title: 'Tri-ply Inner Lid Classic - View 3',
          subtitle: 'Heavy-gauge brass whistle regulator detail',
          img: 'https://lh3.googleusercontent.com/d/1Ro83OkN3-1WAc8zZfsV4DEKGtDtPW4T5',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'classic-fresh-4',
          title: 'Tri-ply Inner Lid Classic - View 4',
          subtitle: 'Under-lid collar rim detail with precision locking mechanism',
          img: 'https://lh3.googleusercontent.com/d/1zSu6lTcD_9uLg4UzWVZ1PYWCXM7x-EJ0',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'classic-fresh-5',
          title: 'Tri-ply Inner Lid Classic - View 5',
          subtitle: 'Spacious food-grade SS 304 interior cooking cavity',
          img: 'https://lh3.googleusercontent.com/d/1TLL5X1SYi3TcFC3V2JuHwBDs40uuqc6A',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'classic-fresh-6',
          title: 'Tri-ply Inner Lid Classic - View 6',
          subtitle: 'Precision induction-compatible encapsulated base view',
          img: 'https://lh3.googleusercontent.com/d/17Y93X6opLW0Ie8qwly-4LBmZdpc72N3E',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'classic-fresh-7',
          title: 'Tri-ply Inner Lid Classic - View 7',
          subtitle: 'Sleek geometric proportions and polished metallic sheen',
          img: 'https://lh3.googleusercontent.com/d/1-Wqto6OYZDvfTLY5s5e4eznTeCS4EP4f',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'classic-fresh-8',
          title: 'Tri-ply Inner Lid Classic - View 8',
          subtitle: 'Ergonomic dual-riveted cool-touch handle bracket',
          img: 'https://lh3.googleusercontent.com/d/19afKKKxWs_W_rN0Dxltv-9E-lomAOwpx',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'classic-fresh-9',
          title: 'Tri-ply Inner Lid Classic - View 9',
          subtitle: 'Full assembled Tri-ply Classic inner lid pressure cooker',
          img: 'https://lh3.googleusercontent.com/d/1afD_owhSU3bdesw80EcV9RS59f5Mi-4Q',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'classic-fresh-10',
          title: 'Tri-ply Inner Lid Classic - View 10',
          subtitle: 'High capacity straight-wall studio showcase angle',
          img: 'https://lh3.googleusercontent.com/d/1WsYlEdJTL7chVSKF_Q3nVQthd2RJHCbe',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'classic-fresh-11',
          title: 'Tri-ply Inner Lid Classic - View 11',
          subtitle: 'Heavy-gauge inner lid locking seal and safety vent',
          img: 'https://lh3.googleusercontent.com/d/1OkXQzU2oLrhpSgeywEsWHjIAZWX7CqQP',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'classic-fresh-12',
          title: 'Tri-ply Inner Lid Classic - View 12',
          subtitle: 'Complete classic cooker setup ready for domestic and commercial kitchen use',
          img: 'https://lh3.googleusercontent.com/d/1Q6PUCG05M1Uz36qwKuG7NdE3pcfrp715',
          style: { transform: 'scale(1)' },
          overlay: null
        }
      ];
    }

    if (product.id === 'tp-contura') {
      return [
        {
          id: 'contura-main',
          title: 'Tri-ply Inner Lid - Contura',
          subtitle: 'Elegant Contura shape combined with premium tri-ply cladding',
          img: defaultImg,
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'contura-fresh-1',
          title: 'Tri-ply Inner Lid - Contura - View 1',
          subtitle: 'Elegant Contura shape combined with premium tri-ply cladding',
          img: 'https://lh3.googleusercontent.com/d/1B9BgL5q_CmDZOSVu3YCI0XeefSwHgM36',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'contura-fresh-2',
          title: 'Tri-ply Inner Lid - Contura - View 2',
          subtitle: 'Polished mirror-sheen body with pristine dual-rivet handle alignment',
          img: 'https://lh3.googleusercontent.com/d/166m6v1K4dcT3FqnlxOIjvY7Yrghipx8h',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'contura-fresh-3',
          title: 'Tri-ply Inner Lid - Contura - View 3',
          subtitle: 'Under-lid inner collar locking rim precision detail',
          img: 'https://lh3.googleusercontent.com/d/1UhllDAF31UgAkdj9p7_huZfzJscQjp1L',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'contura-fresh-4',
          title: 'Tri-ply Inner Lid - Contura - View 4',
          subtitle: 'Heavy-duty brass weight regulator assembly',
          img: 'https://lh3.googleusercontent.com/d/11SzqcP_CRRegKEOM7y4cSFO8w-MfT0NN',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'contura-fresh-5',
          title: 'Tri-ply Inner Lid - Contura - View 5',
          subtitle: 'Curved Contura belly profile for easy stirring',
          img: 'https://lh3.googleusercontent.com/d/17VANiny2rr6D3uJUhSzxbxurgtkQVVNo',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'contura-fresh-6',
          title: 'Tri-ply Inner Lid - Contura - View 6',
          subtitle: 'Heat-resistant cool-touch handle ergonomics',
          img: 'https://lh3.googleusercontent.com/d/1rkVXCaYZrKYetHVMEJunPvs63grrwFmN',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'contura-fresh-7',
          title: 'Tri-ply Inner Lid - Contura - View 7',
          subtitle: 'Internal food-grade stainless steel cavity',
          img: 'https://lh3.googleusercontent.com/d/1572GTbE9-fmKP40keBVBMYoi3D_PXnXN',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'contura-fresh-8',
          title: 'Tri-ply Inner Lid - Contura - View 8',
          subtitle: 'Precision induction-compatible base detail',
          img: 'https://lh3.googleusercontent.com/d/1xa5oNPfji9xWbswuxyoSLJVgfrgLk35M',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'contura-fresh-9',
          title: 'Tri-ply Inner Lid - Contura - View 9',
          subtitle: 'Mirror-polished metallic sheen profile view',
          img: 'https://lh3.googleusercontent.com/d/1xc0M5u1JofDdz4qsPBq7y7LFoQlUF-k8',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'contura-fresh-10',
          title: 'Tri-ply Inner Lid - Contura - View 10',
          subtitle: 'Durable riveted handle bracket detail',
          img: 'https://lh3.googleusercontent.com/d/1wbWkpW66t0ADNKauj3w9JuxQiUiKh-8M',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'contura-fresh-11',
          title: 'Tri-ply Inner Lid - Contura - View 11',
          subtitle: 'Complete assembled Tri-ply Contura inner lid pressure cooker',
          img: 'https://lh3.googleusercontent.com/d/1YoojQ-opGF7XV3G75vDP-mQcCM0R0jL_',
          style: { transform: 'scale(1)' },
          overlay: null
        }
      ];
    }

    if (product.id === 'al-regular') {
      return [
        {
          id: 'al-regular-seq-0',
          title: 'Heritage Aluminum Regular Cooker',
          subtitle: 'Our classic high-durability workhorse crafted from 99.5% pure virgin-grade aluminum for reliable pressure containment',
          img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGzWUBERMBKY17yvhsVHNUjBx_JcKYWYfsBjjQH3D7NYCETLgbhq0ZQJ2RKeDtzx0Ugw8fBtmNVICzo_hcljpU6HsgkSnzd7tXoTegwJFBUFlojU_1F0Bz6GtczBps5xJ0Qu7oJtPKodTPejwHghCwrhN0_1UqSZHJIDZ1jvPIm-EolwIA3smcEmdTAlMyzK9HW_q5J3HHM-A1HvtMV43koElT426d_O0TdBQhuE9PaUnjQmWo_yY5EkmFPh0JWV5g5iwFHId14E1F',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'al-regular-seq-1',
          title: 'High-Durability Heavy Base Build',
          subtitle: 'Thick, flat-bottomed base distributes heat rapidly and prevents hotspot scorching',
          img: 'https://lh3.googleusercontent.com/d/1EWkJhMqekpUJUiaFNj25ARXlveRTl1vN',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'al-regular-seq-2',
          title: 'Sturdy Outer Lid Design',
          subtitle: 'High-grade metallic finish outer lid engineered for airtight locking and premium protection',
          img: 'https://lh3.googleusercontent.com/d/1a4nKMLLd3GdiUkW08UQlRpqZkNgpnjPZ',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'al-regular-seq-3',
          title: 'Airtight High-Grade Gasket',
          subtitle: 'Long-lasting food-grade silicone ring seals pressure perfectly for consistent results',
          img: 'https://lh3.googleusercontent.com/d/1UEef-iUd2LmJdpejX1-5wa1fzXlKaSsx',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'al-regular-seq-4',
          title: 'Secure Double-Riveted Bracket',
          subtitle: 'Heavy-duty handles secured by robust rivets to ensure wobble-free, ergonomic grip',
          img: 'https://lh3.googleusercontent.com/d/1ZMJNJsufFs0McSpIbgWZTlA5U7FK_8z1',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'al-regular-seq-5',
          title: 'Precision Safety Release Valve',
          subtitle: 'ISI certified backup dual-safety valve offers fail-safe emergency pressure venting',
          img: 'https://lh3.googleusercontent.com/d/1Qr8qJHyT_-_Se_SG-kMRfOtOSo22vvPH',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'al-regular-seq-6',
          title: 'Durable Cool-Touch Secondary Grip',
          subtitle: 'Ergonomic helper handle made from heat-resistant material for dual-handed, comfortable lifting',
          img: 'https://lh3.googleusercontent.com/d/1S0gOdNIVU-0iRQY9S0hGkQ8OHnzdid7c',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'al-regular-seq-7',
          title: 'Polished Mirror Aluminum Body',
          subtitle: 'High-shine, scratch-resistant surface adds a classic professional look to any stove setup',
          img: 'https://lh3.googleusercontent.com/d/1EO2p91v4WAgEZw-CVlSoEiTzbUd_mf3w',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'al-regular-seq-8',
          title: 'Heavy Metallic Vent Weight',
          subtitle: 'Carefully weighted brass-core vent regulator maintains standard pressure dynamically',
          img: 'https://lh3.googleusercontent.com/d/1MhOL1zMS3e_bUlqVAgzEPjlat1CJZ826',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'al-regular-seq-9',
          title: 'Classic Versatility',
          subtitle: 'Perfect for deep sautéing, pressure cooking high-density grains, or standard lentils',
          img: 'https://lh3.googleusercontent.com/d/1Ia1mVW-M8vYQY4KrlEyqJD1jMPvuMeJB',
          style: { transform: 'scale(1)' },
          overlay: null
        }
      ];
    }

    if (product.id === 'cw-tasla') {
      return [
        {
          id: 'cw-tasla-seq-1',
          title: 'Premium Tri-Ply Tasla Front View',
          subtitle: 'Exquisite mirror finish showcasing the perfect curves and seamless multi-clad walls',
          img: 'https://lh3.googleusercontent.com/d/12xrAKIFsZI3wbbE7T_yW2lNnRS5APorw',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-tasla-seq-2',
          title: 'Gleaming Interior Profile',
          subtitle: 'Highly-polished food-grade 304 stainless steel interior layer ensuring zero-contamination cooking',
          img: 'https://lh3.googleusercontent.com/d/18oMX0Cqn22ewQbfDGyp5lEmtkCGbG4W6',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-tasla-seq-3',
          title: 'Sturdy Double Handle Riveting',
          subtitle: 'Precision-engineered heavy duty loop handles anchored with high-yield rivets for a lifetime of safe lifting',
          img: 'https://lh3.googleusercontent.com/d/1TP8w0CpDmHEVno81Spc0I0qnQmsHN6bd',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-tasla-seq-4',
          title: 'Encapsulated Heat-Conduction Base',
          subtitle: 'Thick flat-bottom base optimized for uniform 360° heat distribution on both gas stoves and induction cooktops',
          img: 'https://lh3.googleusercontent.com/d/178kn6PqiZ4s55fDv93iHCERP9uewxssg',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-tasla-seq-5',
          title: 'Traditional Wide-Flare Lip Design',
          subtitle: 'Beautiful wide-mouth contour crafted for easy tossing, blending, and seamless pouring of culinary creations',
          img: 'https://lh3.googleusercontent.com/d/1Ip_-0VMmmChmTQ1xCOvvp65ZSXEJ2zt_',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-tasla-seq-6',
          title: 'Ergonomic Balance & Stability',
          subtitle: 'Superbly weighted structure offering perfect stove-top stability and ease of daily handling',
          img: 'https://lh3.googleusercontent.com/d/1LUwkH944IDKKBV4ZTZdJmy-wW6Li3VYV',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-tasla-seq-7',
          title: 'Mirror Polished Exterior Sheen',
          subtitle: 'Signature high-gloss outer layer designed to withstand domestic wear while adding elegance to your kitchen',
          img: 'https://lh3.googleusercontent.com/d/1ys_C1wi9VtHGJ6wb7x9uKOCf6kNEpOIY',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-tasla-seq-8',
          title: 'Uniform Multi-Clad Wall Thickness',
          subtitle: 'Cladding layers extending smoothly from the bottom to the top rim for uniform heat without scorching',
          img: 'https://lh3.googleusercontent.com/d/1-Z3y5QohoEg9RkdNW7pWLSpUBeC2VttT',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-tasla-seq-9',
          title: 'Authentic Indian Culinary Companion',
          subtitle: 'The ultimate heavy-duty tasla engineered for kneading dough, slow simmering, and sautéing',
          img: 'https://lh3.googleusercontent.com/d/1lFWm0mZLP-pvp4MB_So3tW1L8GFSIzOr',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-tasla-seq-10',
          title: 'Premium Geetanjali Cookware Packaging',
          subtitle: 'Arrives safely packed in a high-density transit protection box with complete usage & care manual',
          img: 'https://lh3.googleusercontent.com/d/1hSFU1YG2aYpgHWQIRsVCkWYENDXpqh-M',
          style: { transform: 'scale(1)' },
          overlay: null
        }
      ];
    }

    if (product.id === 'cw-kadhai') {
      return [
        {
          id: 'cw-kadhai-seq-1',
          title: 'Premium Tri-Ply Kadhai',
          subtitle: 'Traditional deep-well Indian kadhai engineered with advanced SAS tri-ply cladding',
          img: 'https://lh3.googleusercontent.com/d/1Ncx_pSaqogMrR3dwmrxKCRNPPgsdmvyv',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-kadhai-seq-2',
          title: 'Pristine Stainless Steel Interior',
          subtitle: 'Crafted from 100% food-safe SS 304 alloy, protecting flavors and nutrients',
          img: 'https://lh3.googleusercontent.com/d/1dPCnEBrX5NYeJC6j8Ezru6lgQ-FwaPiD',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-kadhai-seq-3',
          title: 'Robust Riveted Loop Handles',
          subtitle: 'Beautifully curved dual side handles anchored with heavy steel rivets for supreme support',
          img: 'https://lh3.googleusercontent.com/d/1fgX0f3_0MwUDFcSfFTa6R7Ehat1z60tN',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-kadhai-seq-4',
          title: 'Induction-Compatible Base Detail',
          subtitle: 'Heavy-duty impact bonded base ensuring flat stability on hobs, induction and gas',
          img: 'https://lh3.googleusercontent.com/d/1xt0-KMuUoIddg3T22uPV0nOyLCp8VKYt',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-kadhai-seq-5',
          title: 'Uniform Thermal Wall Thickness',
          subtitle: 'True 3-ply thickness throughout the body avoids local hot-spots or burning during deep frying',
          img: 'https://lh3.googleusercontent.com/d/1ZnOtMeCQpTRM1G4s_Lz8NLPL0dBGWI68',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-kadhai-seq-6',
          title: 'Tempered SS Lid Fit',
          subtitle: 'Perfectly fitting heavy-gauge stainless steel dome lid to conserve steam and speed up slow cooking',
          img: 'https://lh3.googleusercontent.com/d/10WdTbqPGZd2LZzfLcJbHRLtO9XIDk5i7',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-kadhai-seq-7',
          title: 'Mirror Finished Outer Splendor',
          subtitle: 'Lustrous high-gloss polish adds a touch of royal luxury to your modern stovetop',
          img: 'https://lh3.googleusercontent.com/d/1JBHUKXakuHe1aP42-YZIR4ZcpZY3oZMA',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-kadhai-seq-8',
          title: 'Easy Tossing Deep Curvature',
          subtitle: 'Optimized side flare and deep cavity structure designed for mess-free stir frying and sautéing',
          img: 'https://lh3.googleusercontent.com/d/1jakmSRAhJ921WMOnMCe7M8TA9sMephLH',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-kadhai-seq-9',
          title: 'Nutritious Indian Curry Preparation',
          subtitle: 'Excellent heat retention keeps gravies, dals, and vegetable stir-fries fresh and warm',
          img: 'https://lh3.googleusercontent.com/d/1hPDOlx_KxaktcC6htIhM7kZskRxLNXxA',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-kadhai-seq-10',
          title: 'Thick Solid Multi-Layer Construction',
          subtitle: 'Three integrated layers bonded together for 2x faster heating and cooking precision',
          img: 'https://lh3.googleusercontent.com/d/1_KyhQa9NA1KJ3kUSGjKUcVxpWTOKw7_R',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-kadhai-seq-11',
          title: 'Heavy Duty Loop Handle Angle',
          subtitle: 'Comfortable cool-touch distance prevents heat transfer to handles during long simmering sessions',
          img: 'https://lh3.googleusercontent.com/d/1byPvedxdmTT3fvovdSED2YoaRPxiscVC',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-kadhai-seq-12',
          title: 'Double-Rivet Anchor Close-up',
          subtitle: 'Industrial grade high-strength steel rivets ensure zero handle wobble forever',
          img: 'https://lh3.googleusercontent.com/d/1XQpsjFFY1v1uyW0GPX7MIuit3MSNSIt5',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-kadhai-seq-13',
          title: 'Smooth Pouring Rim Design',
          subtitle: 'Flanged flare rim profile allows spill-proof pouring of gravies and oil reductions',
          img: 'https://lh3.googleusercontent.com/d/12sBMCWEobh0XhagLjBg7FJ6rlja0eOqa',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-kadhai-seq-14',
          title: 'Flat-Bottom Hob Stability',
          subtitle: 'Perfectly flat base engineered to resist warping or bending under extreme temperatures',
          img: 'https://lh3.googleusercontent.com/d/1x_VmiI6n5nXBleK7Z9ogWm9XU6EU8C64',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-kadhai-seq-15',
          title: 'Signature Premium Geetanjali Packaging',
          subtitle: 'Packed with maximum transit cushioning, manual guide and authentic ISI hologram certifications',
          img: 'https://lh3.googleusercontent.com/d/1mJeLFDyAHxQcu_BhtXCkVQSjtEJxF2kX',
          style: { transform: 'scale(1)' },
          overlay: null
        }
      ];
    }

    if (product.id === 'cw-saucepot') {
      return [
        {
          id: 'cw-saucepot-seq-1',
          title: 'Premium Tri-Ply Stewpan & Sauce Pot',
          subtitle: 'Professional grade deep stewpan designed with a true clad multi-layer core for ultimate heat retention',
          img: 'https://lh3.googleusercontent.com/d/1aE24O7k0-SUjaxdXtb0TIvTzesgpanx9',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-saucepot-seq-2',
          title: 'Pure SS 304 Food-Grade Cavity',
          subtitle: 'Mirror-polished interior preserves minerals and maintains maximum food hygiene',
          img: 'https://lh3.googleusercontent.com/d/1haaxe0BSEXVKMACcn0-sFGMm8x0fxxtM',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-saucepot-seq-3',
          title: 'Tight-Fitting Stainless Steel Lid',
          subtitle: 'Heavy-gauge lid locks in steam, aroma, and nutrients during slow cooking and braising',
          img: 'https://lh3.googleusercontent.com/d/157iCJ1DGkvKqFtj1cE3TQPLbQsPEX4nU',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-saucepot-seq-4',
          title: 'Sturdy Dual Side Grip Handles',
          subtitle: 'Sleek and robust cast stainless steel handles anchored with secure rivets for heavy-load lift',
          img: 'https://lh3.googleusercontent.com/d/1sDMABisTTA34EHsRJPcJuRl2RPWfChmS',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-saucepot-seq-5',
          title: 'Ultra-Flat Multi-Cooktop Base',
          subtitle: 'Thick magnetic steel outer layer optimized for immediate induction and gas stove response',
          img: 'https://lh3.googleusercontent.com/d/1KbzeWxqpnv7FSgnn7o3FBh2YuohQr0qR',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-saucepot-seq-6',
          title: 'Advanced Heat Distribution Wall',
          subtitle: 'Even thermal wall prevents hot-spots, allowing perfectly balanced simmering of soups and broths',
          img: 'https://lh3.googleusercontent.com/d/1EhkAxVXJDFKxC8aVxVkKJSQUgFGgqqHv',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-saucepot-seq-7',
          title: 'Mirror-Polished Elegance Angle',
          subtitle: 'High-gloss chrome-like outer finish remains pristine and is easy to clean after intensive cooking',
          img: 'https://lh3.googleusercontent.com/d/11dbC9fts8mKUAUsYtO8c7z1fJ4K5wvaP',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-saucepot-seq-8',
          title: 'Precision Flanged Rim Profile',
          subtitle: 'Specially designed rim profile ensures drip-free pouring and easy liquid reductions',
          img: 'https://lh3.googleusercontent.com/d/1IDPFB9YMbVuvayhrkZ8ZjGvGPt398sp5',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-saucepot-seq-9',
          title: 'Authentic Slow Cooking Companion',
          subtitle: 'Excellent depth and thermal mass perfect for cooking biryanis, gravies, and serving fresh warm meals',
          img: 'https://lh3.googleusercontent.com/d/1ih3OgyEBWRf26SeFtjcOUovcUxnPJt6g',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-saucepot-seq-10',
          title: 'Cast Stainless Steel Handle Anchors',
          subtitle: 'Sturdy industrial grade rivets safeguard against loose fittings, ensuring lifelong structural strength',
          img: 'https://lh3.googleusercontent.com/d/1-jpzGAxnJfQllmQloLe4iz9R-u1067lt',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-saucepot-seq-11',
          title: 'Consistent Temperature Holding',
          subtitle: 'Heavy core retains heat long after cooking, keeping dishes warm on the dining table',
          img: 'https://lh3.googleusercontent.com/d/1pvVUSlfMOH6E7ClVgZ3hauB8tjTOFlep',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-saucepot-seq-12',
          title: 'Double Riveting System Detail',
          subtitle: 'An up-close look at the high-strength double rivets supporting the ergonomic cast handles',
          img: 'https://lh3.googleusercontent.com/d/1liIq3o6yvTjjDRC8_om-t2BZQXB0yV9w',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-saucepot-seq-13',
          title: 'Smooth Seamless Inner Joints',
          subtitle: 'The seamless edge-to-edge finish prevents food accumulation, promoting hygienic kitchen upkeep',
          img: 'https://lh3.googleusercontent.com/d/1THOpsY-qiQ3AVC0HrogpZEifJPZ9KwZk',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-saucepot-seq-14',
          title: 'Scratch-Resistant Structural Durability',
          subtitle: 'Resilient construction withstands daily metal whisk, spoon scraping, and high heating',
          img: 'https://lh3.googleusercontent.com/d/1Lvfd7Rs3ZpIYrxudjAXIYPmdUFKU-caV',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-saucepot-seq-15',
          title: 'Signature Geetanjali Premium Box Packaging',
          subtitle: 'Shipped in elegant custom gift box packaging with a secure product user manual',
          img: 'https://lh3.googleusercontent.com/d/1lvqzOblNe_YupqHMFh7sQSkXVq6PoDqi',
          style: { transform: 'scale(1)' },
          overlay: null
        }
      ];
    }

    if (product.id === 'cw-saucepan') {
      return [
        {
          id: 'cw-saucepan-seq-1',
          title: 'Premium Tri-Ply Saucepan',
          subtitle: 'Elite single-handle saucepan crafted with custom clad core for instant and uniform heat response',
          img: 'https://lh3.googleusercontent.com/d/1kfLlLVgfuogeQgeyfqcn-Py_ZbmQilPN',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-saucepan-seq-2',
          title: 'Pristine Non-Reactive Stainless Steel Interior',
          subtitle: 'Hygienic SS 304 cooking surface, completely rust-proof and free from harmful chemicals',
          img: 'https://lh3.googleusercontent.com/d/1nRjozue_-oRfm4AZt_UHrMVeBPxHqlOk',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-saucepan-seq-3',
          title: 'Ergonomic Long Stay-Cool Handle',
          subtitle: 'Specially curved, heat-resistant long handle for comfortable stovetop control and secure grip',
          img: 'https://lh3.googleusercontent.com/d/1iojbSvrW8r4S-ybjesZQ7ypFchTFopd0',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-saucepan-seq-4',
          title: 'Heavy SS Lid with Handle',
          subtitle: 'Perfect lid containment preserves heat, moisture, and reduces tea and sauce cooking time',
          img: 'https://lh3.googleusercontent.com/d/1LSZvtVInzSqspvXTF-OuOiMQgLiQ9N33',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-saucepan-seq-5',
          title: 'Induction-Compatible High-Performance Base',
          subtitle: 'Magnetic stainless steel base layer offers universal compatibility on hobs and stoves',
          img: 'https://lh3.googleusercontent.com/d/1u_62vY5l9-4cNNCSusiNMvSSZI2aaKsl',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-saucepan-seq-6',
          title: 'Seamless Edge-to-Edge Tri-Clad Body',
          subtitle: 'Three-layer cladding throughout ensures heat travels up the walls, preventing bottom scorching',
          img: 'https://lh3.googleusercontent.com/d/1tqTub5EUplUj0k-6dDtYpKGb-qADF2N4',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-saucepan-seq-7',
          title: 'Mirror-Polished Luxury Body',
          subtitle: 'Gleaming exterior sheen adds an upscale aesthetic while ensuring high stain resistance',
          img: 'https://lh3.googleusercontent.com/d/1bwEuaIKMVbGQ_0y5lcdeo9acOvog2wIS',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-saucepan-seq-8',
          title: 'Spill-Proof Pouring Rim Design',
          subtitle: 'Precision-engineered flared rim allows smooth, drip-free pouring of warm milk, tea, or sauces',
          img: 'https://lh3.googleusercontent.com/d/1bpwWUAzWFRSqc2eZ6Y1oNZWO9eQ9WVBX',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-saucepan-seq-9',
          title: 'Double-Riveted Sturdy Handle Joint',
          subtitle: 'High-strength steel rivets lock the long handle securely to avoid wobbling or loosening',
          img: 'https://lh3.googleusercontent.com/d/1krjeQ8iYUvxWKFeiSrbw4S8n7i_3uQGK',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-saucepan-seq-10',
          title: 'Optimized Thermal Mass for Quick Boiling',
          subtitle: 'Specially balanced weight helps liquids boil rapidly while maintaining consistent heat',
          img: 'https://lh3.googleusercontent.com/d/165_Scl3S3TREAzaaXeeVm28cdmIZXQ8w',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-saucepan-seq-11',
          title: 'Easy Staging Close-Up View',
          subtitle: 'Flawless proportions perfect for everyday preparations like tea, coffee, sauces, and infant food',
          img: 'https://lh3.googleusercontent.com/d/1trHmRcF7W0Nk52mjA8cNCbbuWqLrEbz3',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-saucepan-seq-12',
          title: 'Stay-Cool Handle Comfort Design',
          subtitle: 'Unique structural gap reduces thermal flow, keeping the handle cool even on gas stoves',
          img: 'https://lh3.googleusercontent.com/d/1uF1ZGCgScWLAZd1wScXWxM6z3H1DsGxZ',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-saucepan-seq-13',
          title: 'Durable Solid Cast Stainless Fittings',
          subtitle: 'Designed for heavy-duty household tasks with lifelong rust-proof durability',
          img: 'https://lh3.googleusercontent.com/d/1sK9ez7PYsknHUP2bUy_tSy5FzvfhbSJD',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-saucepan-seq-14',
          title: 'Flat Warpage-Resistant Bottom Profile',
          subtitle: 'Rigid flat-bottom base stays stable on gas grates, electric glass, and induction plates',
          img: 'https://lh3.googleusercontent.com/d/1sEhvpZEukXXJxjP-Pfg6KmsQmaTV3SUn',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-saucepan-seq-15',
          title: 'Easy Cleaning Smooth Joints',
          subtitle: 'The completely seamless interior cavity makes removing dairy or tea residues easy',
          img: 'https://lh3.googleusercontent.com/d/1rZ84I_08uUh64Ol9LkXqIzODlUIxkg_b',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-saucepan-seq-16',
          title: 'Robust Everyday Culinary Workhorse',
          subtitle: 'Engineered to withstand sudden temperature changes without bending or micro-cracking',
          img: 'https://lh3.googleusercontent.com/d/1f9ElUPmSw0tc8nBJJ3E2BFlPoOI-y9mX',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-saucepan-seq-17',
          title: 'Signature Geetanjali Premium Box Packaging',
          subtitle: 'Arrives nested inside our dense transit-safe storage box with owner instructions and ISI labels',
          img: 'https://lh3.googleusercontent.com/d/117Ss8jQb9PDbd4xu9pT5Vfds_qG7_iMQ',
          style: { transform: 'scale(1)' },
          overlay: null
        }
      ];
    }

    if (product.id === 'cw-tope') {
      return [
        {
          id: 'cw-tope-seq-1',
          title: 'Premium Tri-Ply Tope Front View',
          subtitle: 'Traditional Indian flat-bottom tope redesigned with high-tech 3-layer cladding',
          img: 'https://lh3.googleusercontent.com/d/14hOnEsbLkStLB5H-4cSDbeC-wD_MO4dx',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-tope-seq-2',
          title: 'Hygienic Pure SS 304 Interior',
          subtitle: '100% food-safe interior prevents food reaction, preserving natural minerals and flavors',
          img: 'https://lh3.googleusercontent.com/d/1Dkg8EG1ipkLkVBh2PCvXFl3CrtCxBz1C',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-tope-seq-3',
          title: 'Polished Mirror-Sheen Exterior',
          subtitle: 'Durable outer layer with high stain resistance that maintains its gleam for years',
          img: 'https://lh3.googleusercontent.com/d/1KzBwo4r8rVdPTKprQhR410fGAqPIkvnA',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-tope-seq-4',
          title: 'Universal Induction Compatible Base',
          subtitle: 'Magnetic stainless steel base layer optimized for modern induction hobs and gas stoves',
          img: 'https://lh3.googleusercontent.com/d/1xWyx-1TX9-oEAPtPT1ZfyOWUiZOGBszq',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-tope-seq-5',
          title: 'Even Heat Dissipation Core',
          subtitle: 'Cladding layers distribute thermal energy rapidly and eliminate hot-spots during boiling',
          img: 'https://lh3.googleusercontent.com/d/1YhAsUSCAbbZDSe2UZBv0OYfNa-A5Ws6c',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-tope-seq-6',
          title: 'Flared Outward Sealing Rim',
          subtitle: 'Gracefully rolled rim designed for spill-free liquid pouring and secure lid placement',
          img: 'https://lh3.googleusercontent.com/d/15JAep8M8v29lJGiBvhS7yn3YwOlhFGhS',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-tope-seq-7',
          title: 'Heavy Duty Solid Culinary Build',
          subtitle: 'Sturdy structure built to withstand heavy volume boiling of milk, tea, or cooking dals',
          img: 'https://lh3.googleusercontent.com/d/1I_iEIYdlgei5Efhk0n5vNCn8e5gS5yNe',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-tope-seq-8',
          title: 'Warp-Resistant Thick Flat Base',
          subtitle: 'Engineered flat bottom provides complete surface contact and stove stability',
          img: 'https://lh3.googleusercontent.com/d/11AfqTIbxeaLvY5FcXWqp8eDRvmY4AIMZ',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-tope-seq-9',
          title: 'Seamless One-Piece Body Cavity',
          subtitle: 'No joints or corners inside, ensuring absolute ease of cleaning and food safety',
          img: 'https://lh3.googleusercontent.com/d/1oCTIBXvCoOvIpusGJk3A0qkAUubyrr4f',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-tope-seq-10',
          title: 'Consistent Temperature Simmering',
          subtitle: 'Excellent thermal storage helps liquids simmer gently without sudden boiling spills',
          img: 'https://lh3.googleusercontent.com/d/17ij7rBqg49HhV7WFgDi-k2_CPnvuBpbz',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-tope-seq-11',
          title: 'Multi-Purpose Domestic Companion',
          subtitle: 'The absolute standard for boiling water, preparing milk, and storing freshly cooked food',
          img: 'https://lh3.googleusercontent.com/d/101KRzaEUvvvqfFPKW1scsroi6YGpv3Cm',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-tope-seq-12',
          title: 'Signature Premium Geetanjali Packaging',
          subtitle: 'Delivered in thick protective transit box packaging with our instruction card and warranty guidelines',
          img: 'https://lh3.googleusercontent.com/d/1QhTbJ1HDF7MZ37YGLNZ0WDIDJOUSg-Uz',
          style: { transform: 'scale(1)' },
          overlay: null
        }
      ];
    }

    if (product.id === 'cw-frypan') {
      return [
        {
          id: 'cw-frypan-seq-1',
          title: 'Premium Tri-Ply Frypan Front View',
          subtitle: 'Exquisitely designed frypan combining standard-setting ergonomics with even heat retention',
          img: 'https://lh3.googleusercontent.com/d/1_1eHApXbFq5lw-c1dszvtKSWyI_ZzeLN',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-frypan-seq-2',
          title: 'Sleek Non-Reactive Surface',
          subtitle: '100% food-safe interior allows healthy frying, searing, and sauteing with minimum oil',
          img: 'https://lh3.googleusercontent.com/d/1t8eH1gZ-arnNqg-zUyD6eKDAtqzoD9yi',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-frypan-seq-3',
          title: 'Long Stay-Cool Bakelite Handle',
          subtitle: 'Sturdy, heat-resistant handle ensures maximum comfort and reliable pan tossing control',
          img: 'https://lh3.googleusercontent.com/d/1vPECbzdU2uZHA5h29ZsCVSHzJjvuR60e',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-frypan-seq-4',
          title: 'Encapsulated Core High Thermal Flow',
          subtitle: 'Advanced clad body conducts heat rapidly, preventing burning and localized hot-spots',
          img: 'https://lh3.googleusercontent.com/d/1IUkE0jZIV9Mfx6XwbDmEvp4EreJcufEm',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-frypan-seq-5',
          title: 'Universal Induction Compatible Bottom',
          subtitle: 'Premium magnetic steel bottom layer runs smooth on induction cooktops and gas burners',
          img: 'https://lh3.googleusercontent.com/d/1Q1Z6tPiWX9vv5wKJZirfeJMQlVgDpj9w',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-frypan-seq-6',
          title: 'Even Temperature Distribution Wall',
          subtitle: 'Cladding layers spread heat evenly, ensuring perfect caramelization of your recipes',
          img: 'https://lh3.googleusercontent.com/d/1MzYLZO9cuyPhWQDU62RFkQ75biQWYp2Y',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-frypan-seq-7',
          title: 'Mirror-Polished Luxury Rim Profile',
          subtitle: 'Beautiful outward flare rim lets you slide omelets and crepes onto your plate with ease',
          img: 'https://lh3.googleusercontent.com/d/1xwn9KayUBk_XZBr8-aeeBvoDDzGnEqBu',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-frypan-seq-8',
          title: 'Durable Double Riveting Assembly',
          subtitle: 'Anchored by high-strength rivets that stay firm and safe, avoiding handle wobble',
          img: 'https://lh3.googleusercontent.com/d/17F29PJXSaKu7EdqMS89sm_dqZDEeE20W',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-frypan-seq-9',
          title: 'Flawless Balance on Stove Grates',
          subtitle: 'Weighted base ensures the pan remains perfectly level and stable during active cooking',
          img: 'https://lh3.googleusercontent.com/d/1CYSLJDKKAvCZD5wYmBog088LM616MQ-k',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-frypan-seq-10',
          title: 'Scratch-Resistant Polished Exterior',
          subtitle: 'Outer shine resists kitchen stain buildup and stays polished and clean easily',
          img: 'https://lh3.googleusercontent.com/d/1ox9KbyAnmX1KoLqx6XwCbcnxflwzQtu4',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-frypan-seq-11',
          title: 'Professional Searing Performance',
          subtitle: 'Retains optimal heat to create crispy edges and high-retention caramel flavor',
          img: 'https://lh3.googleusercontent.com/d/1cuhzLNLsAX_4cmK-3uhhcEb7zn0bjSNt',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-frypan-seq-12',
          title: 'Hygienic Easy-to-Clean Joint Surface',
          subtitle: 'Seamless curvature inside ensures no grease residues can build up',
          img: 'https://lh3.googleusercontent.com/d/1h0cehVh_b7ehW0UOjCjpAg-STxfaiahA',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-frypan-seq-13',
          title: 'Smooth Slanted Pan Walls',
          subtitle: 'Optimized wall angle allows effortless tossing, spatula scraping, and flipping of dishes',
          img: 'https://lh3.googleusercontent.com/d/1pPoiRAChRNNhfl4NgG3ME4G6_zUjoBzU',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-frypan-seq-14',
          title: 'Heavy-Gauge Scratch-Resistant Build',
          subtitle: 'Resilient construction engineered to withstand daily domestic kitchen use',
          img: 'https://lh3.googleusercontent.com/d/1ZyWiP-I6KY43XF0SBTwmRGVT-OBG10Jx',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-frypan-seq-15',
          title: 'Perfect Sautéing & Shallow Frying',
          subtitle: 'Highly responsive cooking control for shallow frying fish, stir-frying veggies, or making eggs',
          img: 'https://lh3.googleusercontent.com/d/1HKm0UUAEdC3iaKLW-vB6FChP0kyW5oqo',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-frypan-seq-16',
          title: 'Stay-Cool Distance Bracket',
          subtitle: 'Extended handle mount prevents direct stovetop flame from heating the grip surface',
          img: 'https://lh3.googleusercontent.com/d/1o0RaUtX5odQLeZLLUJejMMZJggihzEpR',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-frypan-seq-17',
          title: 'Induction Ready Magnetic Flat Base',
          subtitle: 'Flat outer base ensures immediate thermal connection for energy efficiency',
          img: 'https://lh3.googleusercontent.com/d/1pwilKywbv8FtNGVRALnkZ--ZlGUny1Xu',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-frypan-seq-18',
          title: 'Consistent Uniform Heating Cycle',
          subtitle: 'Quick temperature adjustment allows you to go from searing to gentle simmering instantly',
          img: 'https://lh3.googleusercontent.com/d/1-N8tJPHcvWXiY6TEJKULMbN2RFWCVWdF',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-frypan-seq-19',
          title: 'Warp-Proof Heavy Duty Construction',
          subtitle: 'Rigid composite core prevents warping under extreme thermal shocks',
          img: 'https://lh3.googleusercontent.com/d/1DK3-m4Y_z0-JchonLsUN8nrQSTQE75tl',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-frypan-seq-20',
          title: 'Versatile Multi-Hob Utility',
          subtitle: 'Ideal for modern induction hobs, electric cooktops, traditional gas, and halogen glass',
          img: 'https://lh3.googleusercontent.com/d/1sp46Ul10IS_U0yx7ntIwAkoXNV7fJd3J',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-frypan-seq-21',
          title: 'Professional Studio Showcase Look',
          subtitle: 'Sleek proportions and beautiful layout designed for the contemporary gourmet kitchen',
          img: 'https://lh3.googleusercontent.com/d/1T4VG0G9llAPF9TcqxJDobK6XsiEKeIs3',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'cw-frypan-seq-22',
          title: 'Signature Geetanjali Cookware Box Packaging',
          subtitle: 'Arrives nested inside our dense transit-safe storage box with owner instructions and ISI labels',
          img: 'https://lh3.googleusercontent.com/d/15NvzHOokPD6ktX8Pclou5dA1mwLIBv4W',
          style: { transform: 'scale(1)' },
          overlay: null
        }
      ];
    }

    if (product.id === 'hc-frypan') {
      return [
        {
          id: 'hc-frypan-seq-1',
          title: 'Premium Honeycomb Frypan',
          subtitle: 'Our premium flat-bottom frypan enhanced with patented honeycomb cladding technology',
          img: 'https://lh3.googleusercontent.com/d/1Fa_rCMs-g7JC8VkH5Ibgg4cvyGzUXhiE',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-frypan-seq-2',
          title: 'Patented Honeycomb Protection Grid',
          subtitle: 'Raised hexagonal steel matrix shields the premium non-stick layer from metal spatulas and cutlery',
          img: 'https://lh3.googleusercontent.com/d/1Vkzd9DM8QdExO-iKwCe41tHKmXbtJdfw',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-frypan-seq-3',
          title: 'High-Performance Tri-Ply Cladding',
          subtitle: 'Pure heat-diffusing aluminum core fused between dual premium stainless steel layers',
          img: 'https://lh3.googleusercontent.com/d/1BJxH-wLTVtZvZv_U5Z-BBXGZ3a8fGgo1',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-frypan-seq-4',
          title: 'Perfect Searing & Sautéing Surface',
          subtitle: 'High-efficiency heating profile allows rapid searing of meats and perfect crisping of vegetables',
          img: 'https://lh3.googleusercontent.com/d/1mjtF0A70X9FWn_CIf90__Nww1p2JR5Qm',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-frypan-seq-5',
          title: 'Ergonomic Premium Cool-Touch Handle',
          subtitle: 'Cast stainless steel handle remains comfortably cool during long stovetop cooking sessions',
          img: 'https://lh3.googleusercontent.com/d/1sV5B3LMqeiHT_zEolNAFf94u6-GC34u5',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-frypan-seq-6',
          title: 'Scratch-Resistant Non-Stick Technology',
          subtitle: 'Commercial-grade PFOA-free coating allows effortless cooking with little to no oil',
          img: 'https://lh3.googleusercontent.com/d/1z7uMrDMgTlZyatpeX524Z-rMgsnFIW61',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-frypan-seq-7',
          title: '100% Metal Spoon & Spatula Friendly',
          subtitle: 'Cook with absolute freedom using standard metal kitchen tools without worrying about scratches',
          img: 'https://lh3.googleusercontent.com/d/1ar6Wx2eH9E1UzVYdmFLGXrZJxbtXctwX',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-frypan-seq-8',
          title: 'Rapid Even Heat Distribution',
          subtitle: 'Tri-ply clad construction spreads heat uniformly up to the edges, avoiding hot spots',
          img: 'https://lh3.googleusercontent.com/d/1xF8uFs3rh4KN_phHYgEcQCymLMhq2Zex',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-frypan-seq-9',
          title: 'Deep Curved Wall Geometry',
          subtitle: 'Designed with perfectly sloped outer walls to facilitate seamless flipping and tossing of ingredients',
          img: 'https://lh3.googleusercontent.com/d/19uhKw3ZDRB-MN8yp-fgSEkf6Z7-7ClmC',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-frypan-seq-10',
          title: 'Polished Mirror Finish Outer Rim',
          subtitle: 'Elegant highly polished stainless steel rim provides premium accents and easy edge cleaning',
          img: 'https://lh3.googleusercontent.com/d/1yR0Yp7pAPRal0M8nFKUJSeZ2SbOK_-rm',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-frypan-seq-11',
          title: 'Heavy-Duty Double-Riveted Anchor',
          subtitle: 'Solid heavy rivets provide secure, wobble-free handling and lifetime structural integrity',
          img: 'https://lh3.googleusercontent.com/d/1dUHA14Q33mWPixOHa1tkGk-FWLHfOqVp',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-frypan-seq-12',
          title: 'Sturdy Anti-Warp Flat Base',
          subtitle: 'Specially engineered bottom stays flush against induction cooktops, gas, and glass cooktops',
          img: 'https://lh3.googleusercontent.com/d/1LGGsTtQE74lGfbTT95etNXHmbCg1MkFZ',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-frypan-seq-13',
          title: 'All-Stove Compatible Magnetic Bottom',
          subtitle: 'Premium magnetic induction-ready outer plate ensures speedy thermal response and energy savings',
          img: 'https://lh3.googleusercontent.com/d/1tfbv-YX9l-Y0iyJuiUkdToVrXKgH187o',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-frypan-seq-14',
          title: 'Steady Heat Retention Cycles',
          subtitle: 'Retains steady heat to achieve that perfect golden-brown crispness for every culinary creation',
          img: 'https://lh3.googleusercontent.com/d/19SMWTSE5BUNeS0YcLWmBB1JosWVD3F42',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-frypan-seq-15',
          title: 'Signature Premium Transit Box Packaging',
          subtitle: 'Shipped securely in high-density transit-safe box packaging with usage guide and warranty card',
          img: 'https://lh3.googleusercontent.com/d/1ql0yVzMFw9pXAAjydUZkSmLqrlz2MsoO',
          style: { transform: 'scale(1)' },
          overlay: null
        }
      ];
    }

    if (product.id === 'hc-kadhai') {
      return [
        {
          id: 'hc-kadhai-seq-1',
          title: 'Premium Honeycomb Kadhai',
          subtitle: 'Our premium traditional Indian kadhai enhanced with advanced honeycomb cladding technology',
          img: 'https://lh3.googleusercontent.com/d/188EKwnvP8EKVvJCFgoRd_atX9BH8oUki',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-kadhai-seq-2',
          title: 'Patented Honeycomb Protection Grid',
          subtitle: 'Raised hexagonal steel mesh acts as a physical shield protecting the healthy non-stick layer',
          img: 'https://lh3.googleusercontent.com/d/1vBNe2T81CSFNyCh8rcG6Inh_09Be1zw4',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-kadhai-seq-3',
          title: 'SS 304 Multi-Layer Hybrid Cladding',
          subtitle: 'Three-layer construction with pure aluminum core sandwiched between premium stainless steel layers',
          img: 'https://lh3.googleusercontent.com/d/1SetWtBdA4UZki1GhVfUwvgfiEXEaxcId',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-kadhai-seq-4',
          title: 'Ergonomic Cool-Touch Riveted Handles',
          subtitle: 'Beautifully curved dual side loop handles anchored securely with heavy-duty rivets',
          img: 'https://lh3.googleusercontent.com/d/1mkEDB3yt03xjGnm-UuMJGYgRvDN25hnf',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-kadhai-seq-5',
          title: 'Induction-Compatible Heavy Base',
          subtitle: 'Specially designed flat-bottom base runs flawlessly on induction hobs, gas, and electric stoves',
          img: 'https://lh3.googleusercontent.com/d/1X5vzZZ2GNowJBuqIoe_TVgUbVzDoTSdU',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-kadhai-seq-6',
          title: '100% Metal Spoon Friendly Durability',
          subtitle: 'Extremely resilient cooking surface designed to withstand metal spatulas and everyday kitchen tools',
          img: 'https://lh3.googleusercontent.com/d/1WbW5M3kC8qttmGGfsA0DpKXLzYujlQoB',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-kadhai-seq-7',
          title: 'Even Heat Distribution & Retention',
          subtitle: 'Rapid heating without localized hot-spots prevents food from sticking or burning',
          img: 'https://lh3.googleusercontent.com/d/1B6jwBnBVacH7iISwABpqk2n_ITrVWwl6',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-kadhai-seq-8',
          title: 'Gourmet Deep-Well Curvature',
          subtitle: 'Optimized side flare and deep cavity structure designed for mess-free stir-frying and sautéing',
          img: 'https://lh3.googleusercontent.com/d/1eV381NtYejdCHJSoQHBQswCuvnV09H7U',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-kadhai-seq-9',
          title: 'Pristine Polished Outer Finish',
          subtitle: 'Lustrous high-gloss outer polish adds a touch of royal luxury to your modern stovetop',
          img: 'https://lh3.googleusercontent.com/d/1gT7cwbImUfFfe1kU_VFaEXkK70OhylZC',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-kadhai-seq-10',
          title: 'Mirror Finished Stainless Steel Lid',
          subtitle: 'Heavy-gauge snug-fit dome lid locks in moisture and steam for rapid cooking',
          img: 'https://lh3.googleusercontent.com/d/18c_BGB0UHyBcViwsAPn6P4D_tQj3dh6P',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-kadhai-seq-12',
          title: 'Commercial Grade Hybrid Performance',
          subtitle: 'Perfect for deep frying, sautéing, searing, and simmering delicious Indian curries',
          img: 'https://lh3.googleusercontent.com/d/1lnAVBg1vf4FUJDo0zyK1dGgBtKYsG-uj',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-kadhai-seq-13',
          title: 'Signature Protective Gift Packaging',
          subtitle: 'Arrives safely nested in a high-density transit-safe box with complete care manual',
          img: 'https://lh3.googleusercontent.com/d/1P3lH481G-nfSTKlfiRMtu9A9xWTmhoS-',
          style: { transform: 'scale(1)' },
          overlay: null
        }
      ];
    }

    if (product.id === 'hc-dosatawa') {
      return [
        {
          id: 'hc-dosatawa-seq-1',
          title: 'Premium Honeycomb Dosa Tawa',
          subtitle: 'Our premium flat-bottom Dosa Tawa enhanced with patented honeycomb cladding technology',
          img: 'https://lh3.googleusercontent.com/d/1sqPVzUBixHwAfQZ5g-6zZgmXrVhH5kCq',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-dosatawa-seq-2',
          title: 'Patented Honeycomb Protection Grid',
          subtitle: 'Raised hexagonal steel matrix shields the premium non-stick layer from metal spatulas',
          img: 'https://lh3.googleusercontent.com/d/1ESWORfAmJhw1MdEuwssRGcK_lrkipfDj',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-dosatawa-seq-3',
          title: 'High-Performance Tri-Ply Cladding',
          subtitle: 'Pure heat-diffusing aluminum core fused between dual premium stainless steel layers',
          img: 'https://lh3.googleusercontent.com/d/11pcj6HtgYvOpAGDWRrQxQQ0GpHXOYdEs',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-dosatawa-seq-4',
          title: 'Perfect Flatness for Thin Crepes',
          subtitle: 'Engineered thick heavy base prevents warping to ensure perfectly thin, uniform crepes and dosas',
          img: 'https://lh3.googleusercontent.com/d/1yu2uwzLYmvaMYFOIuz2llflEw7hdn4Rc',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-dosatawa-seq-5',
          title: 'Ergonomic Premium Riveted Handle',
          subtitle: 'Cast stainless steel handle remains comfortably cool during long stovetop cooking sessions',
          img: 'https://lh3.googleusercontent.com/d/1_8zr6e0rxusF8WmVR9aHue55XMB_rCN0',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-dosatawa-seq-6',
          title: 'Scratch-Resistant Non-Stick Technology',
          subtitle: 'Commercial-grade PFOA-free coating allows effortless cooking with little to no oil',
          img: 'https://lh3.googleusercontent.com/d/1eHw01BJcvmCEvgXsaM02GvoiaoIRzaNx',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-dosatawa-seq-7',
          title: '100% Metal Spoon & Spatula Friendly',
          subtitle: 'Cook with absolute freedom using standard metal kitchen tools without worrying about scratches',
          img: 'https://lh3.googleusercontent.com/d/1-Vem5L5QTFM1Drt2LGC_Qix2FiZJTJlM',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-dosatawa-seq-8',
          title: 'Rapid Even Heat Distribution',
          subtitle: 'Tri-ply clad construction spreads heat uniformly up to the edges, avoiding hot spots',
          img: 'https://lh3.googleusercontent.com/d/1X0oTjLcsVFdlJxmqPk7WD-lxHu6MyoHM',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-dosatawa-seq-9',
          title: 'Wide Cooking Surface Diameter',
          subtitle: 'Generously proportioned flat-bed area is perfect for folding extra-large restaurant-style dosas',
          img: 'https://lh3.googleusercontent.com/d/1F5ia7MUGWoJ8Yytwqi6l8yNfZyiKdBfm',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-dosatawa-seq-10',
          title: 'Polished Mirror Finish Outer Rim',
          subtitle: 'Elegant highly polished stainless steel rim provides premium accents and easy edge cleaning',
          img: 'https://lh3.googleusercontent.com/d/1oAg_h3_8pnpSTMZzCz3l_MznPLaINWC0',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-dosatawa-seq-11',
          title: 'Heavy-Duty Double-Riveted Anchor',
          subtitle: 'Solid heavy rivets provide secure, wobble-free handling and lifetime structural integrity',
          img: 'https://lh3.googleusercontent.com/d/1BL1cEhhXP7NAXP_GKgCPyQdJdpgiFQ9w',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-dosatawa-seq-12',
          title: 'Sturdy Flat Base Design',
          subtitle: 'Specially engineered bottom stays flush against induction cooktops, gas, and glass cooktops',
          img: 'https://lh3.googleusercontent.com/d/1V8MizcmlzO6WWnktOEhPfwQVsfNwTl9J',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-dosatawa-seq-13',
          title: 'Universal Induction Compatible Bottom',
          subtitle: 'Premium magnetic induction-ready outer plate ensures speedy thermal response and energy savings',
          img: 'https://lh3.googleusercontent.com/d/1A7Ksoyu-suFcRcRlttgAxvE97UkHBNaj',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-dosatawa-seq-14',
          title: 'Excellent Heat Retention Cycles',
          subtitle: 'Retains steady heat to achieve that perfect golden-brown crispness for every single dosa',
          img: 'https://lh3.googleusercontent.com/d/1_nWBeL3rC1TfmgZdZvxWugiiZPqhdi_x',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-dosatawa-seq-15',
          title: 'Perfect for Healthy Low-Oil Cooking',
          subtitle: 'Enjoy delicious uttapams, omelets, and parathas cooked using just a drop of butter or oil',
          img: 'https://lh3.googleusercontent.com/d/1bKyacSdt-jrGvyPmdTfdCJN3BD0nSb4M',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-dosatawa-seq-16',
          title: 'Warp-Resistant Lifetime Build',
          subtitle: 'Heavy gauge multi-layer build prevents warping or bowing under rapid temperature adjustments',
          img: 'https://lh3.googleusercontent.com/d/11AJK_9oCeoKRpp0gG98THtVoc61BM9UI',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-dosatawa-seq-17',
          title: 'Gourmet Utility Beyond Dosas',
          subtitle: 'Versatile enough for fluffy pancakes, French toasts, flatbreads, and searing vegetables',
          img: 'https://lh3.googleusercontent.com/d/1gL33LzunPqQ--BWV9g7XEqZk8U46I78C',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-dosatawa-seq-18',
          title: 'Easy Cleanup & Low Maintenance',
          subtitle: 'The protective steel mesh allows easy food release and hassle-free soap water scrubbing',
          img: 'https://lh3.googleusercontent.com/d/1lFViTKIDCHn6Y0pATj1H670-KA4bXZUC',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-dosatawa-seq-19',
          title: 'Signature Premium Transit Box Packaging',
          subtitle: 'Shipped securely in high-density transit-safe box packaging with usage guide and warranty card',
          img: 'https://lh3.googleusercontent.com/d/1J5J5KLMcNjuHFVjhu6OcyK7kC3lorXf7',
          style: { transform: 'scale(1)' },
          overlay: null
        }
      ];
    }

    if (product.id === 'hc-rotitawa') {
      return [
        {
          id: 'hc-rotitawa-seq-1',
          title: 'Premium Honeycomb Roti Tawa',
          subtitle: 'Designed for perfect golden rotis, phulkas, and chapatis with uniform heat transfer and raised honeycomb protection',
          img: 'https://lh3.googleusercontent.com/d/1OY5DBQ717wT7gHj5Tp2rWYfexJumJ4lQ',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-rotitawa-seq-2',
          title: 'Patented Honeycomb Protection Grid',
          subtitle: 'Raised hexagonal steel matrix shields the premium non-stick layer from metal spatulas',
          img: 'https://lh3.googleusercontent.com/d/1AwHsEpo6EIGmkr2hzTXTS0oZdqZiFIRz',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-rotitawa-seq-3',
          title: 'Advanced Tri-Ply Heat Cladding',
          subtitle: 'Pure heat-diffusing aluminum core fused between dual premium stainless steel layers',
          img: 'https://lh3.googleusercontent.com/d/1WVI_BIzUT56Rvjo1gNLvFbr2Cl3wNUhj',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-rotitawa-seq-4',
          title: 'Flat Base for Everyday Cookware',
          subtitle: 'Optimized flat surface ensures stable, warp-resistant daily performance on all stovetops',
          img: 'https://lh3.googleusercontent.com/d/1bpUqRMqrHh_vKmDLge5eyU5WW7Y7HXbp',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-rotitawa-seq-5',
          title: 'Ergonomic Premium Cool-Touch Handle',
          subtitle: 'Cast stainless steel handle remains comfortably cool during long stovetop cooking sessions',
          img: 'https://lh3.googleusercontent.com/d/18XT46Hd0ZzEc00uHJUTn9fdCIF01t_9_',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-rotitawa-seq-6',
          title: 'Effortless Healthy Low-Oil Cooking',
          subtitle: 'Commercial-grade PFOA-free coating allows effortless cooking with little to no oil',
          img: 'https://lh3.googleusercontent.com/d/1923YDE-V0it7ommWTMYmycAp-anLS-3H',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-rotitawa-seq-7',
          title: '100% Metal Spoon & Spatula Friendly',
          subtitle: 'Cook with absolute freedom using standard metal kitchen tools without worrying about scratches',
          img: 'https://lh3.googleusercontent.com/d/18X3r_S3M-WH5QlqMLKWf8wU-wQ3RQGw5',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-rotitawa-seq-8',
          title: 'Fast Even Heating Without Hot-Spots',
          subtitle: 'Tri-ply clad construction spreads heat uniformly up to the edges, avoiding hot spots',
          img: 'https://lh3.googleusercontent.com/d/1s93diZGOEwlSvNsS8qL3K2eccQFGnceK',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-rotitawa-seq-9',
          title: 'Perfect Rim Flare & Curvature',
          subtitle: 'Engineered subtle slope makes it easy to slide, flip, and turn parathas or pancakes',
          img: 'https://lh3.googleusercontent.com/d/1H62H2nf6S-bVBNtnZ8Do_dfJ1kDNKZER',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-rotitawa-seq-10',
          title: 'Mirror Finish High-Gloss Rim',
          subtitle: 'Elegant highly polished stainless steel rim provides premium accents and easy edge cleaning',
          img: 'https://lh3.googleusercontent.com/d/1Dsgb2SGyMftTWwh1zxPZT97h7d3wRD2n',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-rotitawa-seq-11',
          title: 'Secure Dual-Riveted Handle Anchor',
          subtitle: 'Solid heavy rivets provide secure, wobble-free handling and lifetime structural integrity',
          img: 'https://lh3.googleusercontent.com/d/1hprM_hZBaa824l3lLSj_Aj6vOSelAjAv',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-rotitawa-seq-12',
          title: 'Sturdy Anti-Warp Flat Base',
          subtitle: 'Specially engineered bottom stays flush against induction cooktops, gas, and glass cooktops',
          img: 'https://lh3.googleusercontent.com/d/1hXP1_ZmPRCu0tFyzlF2a6tfTszkpk-i6',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-rotitawa-seq-13',
          title: 'All-Stove Compatible Magnetic Bottom',
          subtitle: 'Premium magnetic induction-ready outer plate ensures speedy thermal response and energy savings',
          img: 'https://lh3.googleusercontent.com/d/1y7aB7BylBZb7f1sC_R0k2xCeBGqPzWf2',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-rotitawa-seq-14',
          title: 'Steady Heat Retention Cycles',
          subtitle: 'Retains steady heat to achieve that perfect golden-brown crispness for every single paratha',
          img: 'https://lh3.googleusercontent.com/d/1y2Jm4nhM8jMSTQKD3CFcXsKOkUrBEIJp',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-rotitawa-seq-15',
          title: 'Premium Transit Safe Packaging',
          subtitle: 'Shipped securely in high-density transit-safe box packaging with usage guide and warranty card',
          img: 'https://lh3.googleusercontent.com/d/1Yf-5JXKOBxUW-Ir7S8bhrH7Ado2VSAVC',
          style: { transform: 'scale(1)' },
          overlay: null
        }
      ];
    }

    if (product.id === 'hc-tasla') {
      return [
        {
          id: 'hc-tasla-seq-1',
          title: 'Premium Honeycomb Tasla',
          subtitle: 'Our premium flat-bottom Tasla/Tasra enhanced with patented honeycomb cladding technology',
          img: 'https://lh3.googleusercontent.com/d/10fk82HMIO-uCK0W1M2Z60VTQVeYbf5-z',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-tasla-seq-2',
          title: 'Patented Honeycomb Protection Grid',
          subtitle: 'Raised hexagonal steel matrix shields the premium non-stick layer from metal spatulas',
          img: 'https://lh3.googleusercontent.com/d/1WoZ_tDhc8M048-F0qrEZnssQFFs_H7Ut',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-tasla-seq-3',
          title: 'High-Performance Tri-Ply Cladding',
          subtitle: 'Pure heat-diffusing aluminum core fused between dual premium stainless steel layers',
          img: 'https://lh3.googleusercontent.com/d/1dhSKSbT6dPH31vRQuHJ39l_W1JIr01i3',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-tasla-seq-4',
          title: 'Ergonomic Premium Dual Loop Handles',
          subtitle: 'Cast stainless steel handles remain comfortably cool during long stovetop cooking sessions',
          img: 'https://lh3.googleusercontent.com/d/1BUoNPL_faFDw-xnFJ4tPt8I6qBUOu0Be',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-tasla-seq-5',
          title: 'Perfect Flat-Bottom Stovetop Base',
          subtitle: 'Engineered thick heavy base prevents warping to ensure stable daily performance on all stovetops',
          img: 'https://lh3.googleusercontent.com/d/12fTXo7Xs-Acgv0Y-p62XhcTKZnvmIqZI',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-tasla-seq-6',
          title: 'Scratch-Resistant Non-Stick Technology',
          subtitle: 'Commercial-grade PFOA-free coating allows effortless cooking with little to no oil',
          img: 'https://lh3.googleusercontent.com/d/1QmybD3toYcyoFE98P459AeqBejyrgV2Z',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-tasla-seq-7',
          title: '100% Metal Spoon & Spatula Friendly',
          subtitle: 'Cook with absolute freedom using standard metal kitchen tools without worrying about scratches',
          img: 'https://lh3.googleusercontent.com/d/1kZzlo0YiQApfRlHoUDVauRr93AhJEjkn',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-tasla-seq-8',
          title: 'Gourmet Wide-Mouth Curvature',
          subtitle: 'Designed with perfectly sloped outer walls to facilitate seamless mixing, tossing, and serving',
          img: 'https://lh3.googleusercontent.com/d/18wNAXWTnCUDyqF-4CvJuBtixC6PDGMto',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-tasla-seq-9',
          title: 'Polished Mirror Finish Outer Rim',
          subtitle: 'Elegant highly polished stainless steel rim provides premium accents and easy edge cleaning',
          img: 'https://lh3.googleusercontent.com/d/1ddWdCBrioeJH4Fa3GMeCPFpO7p8YAAvN',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-tasla-seq-10',
          title: 'Extra-Thick Flanged Flare Rim',
          subtitle: 'Seamless flanged rim allows spill-proof, smooth pouring of liquids and gravies',
          img: 'https://lh3.googleusercontent.com/d/1ieqIKBAZhNFq9gFhi-XFkRxxLg1A0YqW',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-tasla-seq-11',
          title: 'Heavy-Duty Double-Riveted Anchor',
          subtitle: 'Solid heavy rivets provide secure, wobble-free handling and lifetime structural integrity',
          img: 'https://lh3.googleusercontent.com/d/1f5TCiqkMKzQz6vAcwFV3d0IXkdVfuWsY',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-tasla-seq-12',
          title: 'Universal Induction Compatible Bottom',
          subtitle: 'Premium magnetic induction-ready outer plate ensures speedy thermal response and energy savings',
          img: 'https://lh3.googleusercontent.com/d/1ENbyv0_ZJ3672fggIhvFMCY1idEuxxai',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'hc-tasla-seq-13',
          title: 'Signature Premium Transit Box Packaging',
          subtitle: 'Shipped securely in high-density transit-safe box packaging with usage guide and warranty card',
          img: 'https://lh3.googleusercontent.com/d/1L41egvAp68ofzvfovhT_QmANn2a6T5Z_',
          style: { transform: 'scale(1)' },
          overlay: null
        }
      ];
    }

    if (product.id === 'bb-inner') {
      return [
        {
          id: 'bb-inner-seq-0',
          title: 'Black Beauty Inner Lid Cooker View 1',
          subtitle: 'Stunning hard-anodized black finish with premium high-grade inner lid construction',
          img: 'https://lh3.googleusercontent.com/d/1UyMgAip7WpZnvg00iHpxquTr9SypMs01',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'bb-inner-seq-1',
          title: 'Black Beauty Inner Lid Cooker View 2',
          subtitle: 'High-grade hard anodized material absorbs heat incredibly fast, saving cooking time',
          img: 'https://lh3.googleusercontent.com/d/18HfudBShNlBrmMVzYyLpzNi9D3dIPIAA',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'bb-inner-seq-2',
          title: 'Black Beauty Inner Lid Cooker View 3',
          subtitle: 'Engineered to seal airtight from the inside for ultimate pressure containment and safety',
          img: 'https://lh3.googleusercontent.com/d/1ov7Lo7D35Yfu6beX5qMzGxQSZDt9VQi6',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'bb-inner-seq-3',
          title: 'Black Beauty Inner Lid Cooker View 4',
          subtitle: 'Dual backup safety release valve for ultimate peace of mind',
          img: 'https://lh3.googleusercontent.com/d/1Izm-edFpGFVXEeNJpvHbxy6xmuq-Spky',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'bb-inner-seq-4',
          title: 'Black Beauty Inner Lid Cooker View 5',
          subtitle: 'Ergonomic cool-touch handle for safe and stable lifting',
          img: 'https://lh3.googleusercontent.com/d/1qaCQPU1C67oP6-danbLD96YXi4axLW9H',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'bb-inner-seq-5',
          title: 'Black Beauty Inner Lid Cooker View 6',
          subtitle: 'Sleek matte black surface highly resistant to kitchen scratches and daily wear',
          img: 'https://lh3.googleusercontent.com/d/14NSyMOulE_zr3yU7P3M9l1KhhFm04F5D',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'bb-inner-seq-6',
          title: 'Black Beauty Inner Lid Cooker View 7',
          subtitle: 'Heavy-gauge flat base ensures uniform thermal conduction',
          img: 'https://lh3.googleusercontent.com/d/1U9f0rnOrHmTavWNoVpoee-GMHGrNlxyi',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'bb-inner-seq-7',
          title: 'Black Beauty Inner Lid Cooker View 8',
          subtitle: 'High-integrity durable food-grade silicone ring maintains optimal steam',
          img: 'https://lh3.googleusercontent.com/d/1tXmpYAkwTVSRvwaeTC_kcZYvwyojOKWD',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'bb-inner-seq-8',
          title: 'Black Beauty Inner Lid Cooker View 9',
          subtitle: 'Heavy-gauge vent weight precisely regulates and vents steam',
          img: 'https://lh3.googleusercontent.com/d/1FQm4srfE4DK0hXMArVaN7ZqHcZEM3ATi',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'bb-inner-seq-9',
          title: 'Black Beauty Inner Lid Cooker View 10',
          subtitle: 'Specially engineered base compatible with gas, halogen, and coil stoves',
          img: 'https://lh3.googleusercontent.com/d/1Lt4UAir8B7QNK5yfxpFwg_Tn5VewFG-q',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'bb-inner-seq-10',
          title: 'Black Beauty Inner Lid Cooker View 11',
          subtitle: 'Advanced black-anodized heat absorption technology cuts down energy consumption',
          img: 'https://lh3.googleusercontent.com/d/1wefnOM904wMNLXPFz1ykJrzvSUwTEPSN',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'bb-inner-seq-11',
          title: 'Black Beauty Inner Lid Cooker View 12',
          subtitle: 'Healthy non-reactive cooking environment preserving original flavors',
          img: 'https://lh3.googleusercontent.com/d/1NCzJ-Ld4efGIvEg1zO_2A-ZHFqqUbIXn',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'bb-inner-seq-12',
          title: 'Black Beauty Inner Lid Cooker View 13',
          subtitle: 'Sleek dark design serves as a modern visual centerpiece for the contemporary kitchen',
          img: 'https://lh3.googleusercontent.com/d/1ldvB6jGw0jahjHOl6RHfETV1lhefUX-l',
          style: { transform: 'scale(1)' },
          overlay: null
        },
        {
          id: 'bb-inner-seq-13',
          title: 'Black Beauty Inner Lid Cooker View 14',
          subtitle: 'Wide opening allows comfortable ingredient addition and smooth pressure stirring',
          img: 'https://lh3.googleusercontent.com/d/1QFhcYQqX1EclI6_foTG1_lWfwwJlNhLa',
          style: { transform: 'scale(1)' },
          overlay: null
        }
      ];
    }

    return [
      {
        id: 'front',
        title: 'Full Frontal View',
        subtitle: 'Main perspective detailing mirror finish & ergonomic handle design',
        img: defaultImg,
        style: { transform: 'scale(1)' },
        overlay: null
      },
      {
        id: 'top-lid',
        title: 'Precision Outer/Inner Lid',
        subtitle: 'Closer angle on high-retention lock rim & safe release valves',
        img: defaultImg,
        style: { transform: 'scale(1.45) translateY(12%)' },
        overlay: null
      },
      {
        id: 'base-core',
        title: 'Heavy Induction Base',
        subtitle: 'Thick-gauge sandwich cladding bottom for uniform 360° heat transfer',
        img: defaultImg,
        style: { transform: 'scale(1.5) translateY(-15%) rotate(-5deg)', filter: 'contrast(1.15) brightness(1.05)' },
        overlay: null
      },
      {
        id: 'handle',
        title: 'Ergonomic Cool-Touch Handle',
        subtitle: 'High-density phenolic bakelite handle engineered to remain cool during cooking',
        img: defaultImg,
        style: { transform: 'scale(1.7) translateX(-18%)' },
        overlay: null
      },
      {
        id: 'safety-valve',
        title: 'Metallic Safety Valve',
        subtitle: 'Spring-loaded safety release mechanism trigger point',
        img: defaultImg,
        style: { transform: 'scale(2.1) translateY(8%) translateX(10%)' },
        overlay: null
      },
      {
        id: 'rim',
        title: 'Food-Grade Silicone Gasket',
        subtitle: 'Pure food-safe ring ensures hermetic air-tight pressure seal longevity',
        img: defaultImg,
        style: { transform: 'scale(1.6) translateY(20%)', filter: 'hue-rotate(20deg)' },
        overlay: null
      },
      {
        id: 'layers',
        title: 'Tri-Ply Structural Schematic',
        subtitle: 'SAS Bonding details: SS 304 (Interior) + Aluminum Core + Magnetic SS 430 (Interior)',
        img: defaultImg,
        style: { transform: 'scale(1.15)', filter: 'saturate(0.5) contrast(1.2)' },
        overlay: null
      },
      {
        id: 'kitchen',
        title: 'Premium Kitchen Context',
        subtitle: 'Pristine aesthetic profile blending in premium contemporary kitchens',
        img: defaultImg,
        style: { transform: 'scale(1)' },
        overlay: null
      },
      {
        id: 'steam',
        title: 'Precision Whistle & Steam Test',
        subtitle: 'Controlled steam release weight valve designed for silent operation',
        img: defaultImg,
        style: { transform: 'scale(1.3) translateY(10%) translateX(5%)' },
        overlay: null
      },
      {
        id: 'packaging',
        title: 'Signature Gift Box Packaging',
        subtitle: 'Arrives in high-density premium safe transit storage box with owner manual',
        img: defaultImg,
        style: { transform: 'scale(0.95)' },
        overlay: null
      },
      {
        id: 'isi',
        title: 'Bureau of Indian Standards Certified',
        subtitle: 'Rigorous safety approval matching IS 2347 criteria parameters',
        img: defaultImg,
        style: { transform: 'scale(1.2)' },
        overlay: null
      },
      {
        id: 'thermal',
        title: 'Thermal Heat Uniformity Map',
        subtitle: 'Visual simulation of 100% heat dissipation across the surface base',
        img: defaultImg,
        style: { transform: 'scale(1.05)', filter: 'hue-rotate(180deg) saturate(1.8)' },
        overlay: null
      }
    ];
  };;

  const getProcessedViews = (): any[] => {
    const rawViews = generateViews();
    if (product.category === 'Cookware' || product.category === 'Honeycomb Cookware') {
      const defaultImg = (selectedSize && product.sizeImages && product.sizeImages[selectedSize])
        ? product.sizeImages[selectedSize]
        : (product.image || 'https://lh3.googleusercontent.com/d/1MovYM6_G-segYPpW5poewW4j-dVYM8ov');
      
      const filteredViews = rawViews.filter(v => v.img !== defaultImg);
      
      const mainView = {
        id: `${product.id}-main-catalog-view`,
        title: product.name,
        subtitle: product.description || 'Pristine professional grade design engineered for supreme heat transfer and performance',
        img: defaultImg,
        style: { transform: 'scale(1)' },
        overlay: null
      };
      
      return [mainView, ...filteredViews];
    }
    return rawViews;
  };

  const views = getProcessedViews();
  const currentView = views[selectedThumbIndex];

  // Slideshow Timer Setup (10s intervals by default, can be 30s when a collage sub-photo is clicked)
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const slideshowDurationRef = useRef<number>(10000);

  const resetSlideshowTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setSelectedThumbIndex((prev) => (prev + 1) % views.length);
      slideshowDurationRef.current = 10000; // Reset next slide duration back to 10s
    }, slideshowDurationRef.current);
  }, [views.length]);

  useEffect(() => {
    resetSlideshowTimer();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [resetSlideshowTimer, selectedThumbIndex]);

  useEffect(() => {
    if (isVideoModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isVideoModalOpen]);

  const handleSelectThumbnail = (idx: number) => {
    slideshowDurationRef.current = 10000; // reset to default 10s
    setSelectedThumbIndex(idx);
    resetSlideshowTimer();
    const targetView = views[idx] as any;
    if (targetView && targetView.isCollage) {
      setImageLoading(false);
    }
  };

  const handleCollageSubphotoClick = (idx: number) => {
    setActiveCollageIndex(idx);
    slideshowDurationRef.current = 30000; // 30 seconds for clicked photo
    resetSlideshowTimer();
  };

  // Actions
  const handleQuantityChange = (increment: boolean) => {
    setQuantity((prev) => {
      if (increment) return prev + 1;
      return prev > 1 ? prev - 1 : 1;
    });
  };

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  const handleAddToEnquiry = () => {
    // Generate a custom size description indicating lid if cookware
    const sizeDescription = isCookware 
      ? `${selectedSize} (${withLid ? 'With SS Lid' : 'Without SS Lid'})`
      : selectedSize;
    
    onAddToCart(product.id, sizeDescription, quantity, withLid);
  };

  const handleRemoveFromEnquiry = () => {
    const sizeDescription = isCookware 
      ? `${selectedSize} (${withLid ? 'With SS Lid' : 'Without SS Lid'})`
      : selectedSize;
    const itemId = `${product.id}_${sizeDescription.replace(/\s+/g, '')}`;
    onRemoveItem(itemId);
  };

  const handleWhatsAppEnquiry = () => {
    const referenceNum = Math.floor(100000 + Math.random() * 900000);
    const lidText = isCookware ? (withLid ? 'including Stainless Steel Lid (+₹500 MRP)' : 'without Stainless Steel Lid') : '';
    const text = `Hello Geetanjali Home Appliances Portal,
I am highly interested in inquiring about:
• Product: ${product.name}
• Category: ${product.category}
• Selected Size: ${selectedSize} ${lidText ? `(${lidText})` : ''}
• Quantity: ${quantity} Unit(s)
• Total MRP: ₹${(finalDiscountedPrice * quantity).toLocaleString('en-IN')} INR

Reference Inquiry Code: GH-2026-${referenceNum}
Please share delivery timeline, official dealer pricing discounts and catalog brochures. Thank you!`;

    window.open(`https://wa.me/919205293094?text=${encodeURIComponent(text)}`, '_blank');
    window.dispatchEvent(new CustomEvent('whatsapp-inquiry-sent', { detail: { text } }));
  };

  const handleEmailEnquiry = () => {
    const referenceNum = Math.floor(100000 + Math.random() * 900000);
    const lidText = isCookware ? (withLid ? 'including Stainless Steel Lid (+₹500 MRP)' : 'without Stainless Steel Lid') : '';
    const formattedSku = formatSku(product.sku, selectedSize);
    
    const text = `Hello Geetanjali Sales Desk,

I would like to make an inquiry regarding the following product:

• Product Name: ${product.name}
• Model SKU: ${formattedSku}
• Category: ${product.category}
• Selected Size: ${selectedSize} ${lidText ? `(${lidText})` : ''}
• Quantity Required: ${quantity} Unit(s)
• Total MRP: ₹${(finalDiscountedPrice * quantity).toLocaleString('en-IN')} INR

Reference Inquiry Code: GH-2026-${referenceNum}

Please send me the official dealer pricing, bulk order discounts, availability, and product brochure.

Thank you!`;

    const subject = encodeURIComponent(`Product Inquiry - ${product.name} (${formattedSku})`);
    window.open(`mailto:geetanjalihomeappliances.india@gmail.com?subject=${subject}&body=${encodeURIComponent(text)}`, '_blank');
  };

  const handleShareProduct = async () => {
    const shareData = {
      title: product.name,
      text: `Check out this premium ${isCookware ? 'Heritage Cookware' : 'Geetanjali Premium Pressure Cooker'} from Geetanjali Home Appliances: ${product.name}`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
        setIsShareModalOpen(true);
      }
    } else {
      setIsShareModalOpen(true);
    }
  };

  const handleWhatsAppShare = () => {
    const shareUrl = window.location.href;
    const productName = product.name;
    const productCategory = isCookware ? 'Heritage Cookware' : 'Geetanjali Premium Pressure Cooker';
    const lidText = isCookware ? (withLid ? 'with Stainless Steel Lid' : 'without Lid') : '';
    const details = `${selectedSize} ${lidText ? `(${lidText})` : ''}`;
    
    const shareMessage = `Check out this premium ${productCategory} from Geetanjali Home Appliances:\n✨ *${productName}*\n📏 Size/Specs: ${details}\n🏷️ Price: ₹${finalDiscountedPrice.toLocaleString('en-IN')}\n\nView details and place inquiry:\n${shareUrl}`;
    
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`, '_blank', 'noopener,noreferrer');
  };

  // Dynamic Technology Accordion Content
  const getTechnologyDetails = () => {
    const category = product.category || "";
    const name = (product.name || "").toLowerCase();
    const id = (product.id || "").toLowerCase();
    const features = product.features || [];

    const isTriply = category === "Tri-ply" || 
                     features.includes("Tri-ply Series") || 
                     name.includes("tri-ply") || 
                     id.startsWith("tp-");

    const isHoneycomb = category === "Honeycomb Cookware" || 
                        name.includes("honeycomb") || 
                        id.startsWith("hc-");

    const isBlackBeauty = category === "Black Beauty" || 
                          name.includes("black beauty") || 
                          name.includes("black") || 
                          id.startsWith("bb-");

    const isAluminum = category === "Heritage Aluminum" || 
                       category.toLowerCase().includes("aluminum") || 
                       id.startsWith("al-") || 
                       name.includes("aluminum");

    const isStainlessSteel = category === "Stainless Steel" || 
                             name.includes("stainless steel") || 
                             id.startsWith("ss-") || 
                             name.includes("stainless");

    if (isTriply) {
      return {
        title: 'SAS Tri-Ply Technology Details',
        icon: <Flame size={16} className="text-amber-500" />,
        content: (
          <div className="space-y-3 font-sans text-xs text-charcoal-matte/80 leading-relaxed">
            <p>
              This model leverages premium <strong className="text-charcoal-matte font-semibold">SAS (Stainless Steel - Aluminum - Stainless Steel)</strong> tri-ply cladding. Rather than just placing a heavy slab at the bottom, the 3-ply core runs all the way from the base up the walls.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-surface-container-low p-3 rounded border border-platinum-gray/20">
                <span className="font-bold text-[10px] text-emerald-700 block uppercase tracking-wider mb-1">SS 304 Inner Layer</span>
                Protects food minerals from reacting. Extremely hygienic, anti-corrosive and rust-free forever.
              </div>
              <div className="bg-surface-container-low p-3 rounded border border-platinum-gray/20">
                <span className="font-bold text-[10px] text-golden-ochre block uppercase tracking-wider mb-1">Pure Aluminum Core</span>
                High conductive thermal conductor. Rapidly draws and distributes heat evenly, removing scorched hot-spots.
              </div>
              <div className="bg-surface-container-low p-3 rounded border border-platinum-gray/20">
                <span className="font-bold text-[10px] text-heritage-red block uppercase tracking-wider mb-1">SS 430 Magnetic Base</span>
                Magnetic exterior shielding engineered for modern induction hobs, electric, halogen and traditional gas cooktops.
              </div>
            </div>
          </div>
        )
      };
    }

    if (isHoneycomb) {
      return {
        title: 'Honeycomb Laser Etched Technology',
        icon: <Flame size={16} className="text-amber-500" />,
        content: (
          <div className="space-y-3 font-sans text-xs text-charcoal-matte/80 leading-relaxed">
            <p>
              This model leverages premium <strong className="text-charcoal-matte font-semibold">Honeycomb Protective Technology</strong>, featuring a hexagonal stainless steel mesh laser-etched onto a premium food-safe non-stick coating. This design ensures absolute safety and durability by keeping metal spatulas away from the delicate non-stick surface.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-surface-container-low p-3 rounded border border-platinum-gray/20">
                <span className="font-bold text-[10px] text-emerald-700 block uppercase tracking-wider mb-1">Laser-Etched Mesh</span>
                Raised SS hexagonal ridges guard the non-stick surface from scratches, allowing metal spatula use.
              </div>
              <div className="bg-surface-container-low p-3 rounded border border-platinum-gray/20">
                <span className="font-bold text-[10px] text-golden-ochre block uppercase tracking-wider mb-1">Premium Food-Safe Coat</span>
                Toxin-free, PFOA-free dual coat for healthy low-oil cooking and easy cleanups.
              </div>
              <div className="bg-surface-container-low p-3 rounded border border-platinum-gray/20">
                <span className="font-bold text-[10px] text-heritage-red block uppercase tracking-wider mb-1">Induction-Bonded Base</span>
                Thick impact-bonded bottom ensures rapid heat absorption and full compatibility on all cooktops.
              </div>
            </div>
          </div>
        )
      };
    }

    if (isBlackBeauty) {
      return {
        title: 'Hard Anodized Aerodise Technology',
        icon: <Flame size={16} className="text-amber-500" />,
        content: (
          <div className="space-y-3 font-sans text-xs text-charcoal-matte/80 leading-relaxed">
            <p>
              The Black Beauty collection features <strong className="text-charcoal-matte font-semibold">Hard Anodized Aerodise Technology</strong>, transforming premium aluminum into an ultra-durable oxide surface harder than stainless steel.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-surface-container-low p-3 rounded border border-platinum-gray/20">
                <span className="font-bold text-[10px] text-emerald-700 block uppercase tracking-wider mb-1">Aerodise Oxidized Surface</span>
                Hard anodized finish is non-reactive with food, highly scratch-resistant, and won't peel or chip.
              </div>
              <div className="bg-surface-container-low p-3 rounded border border-platinum-gray/20">
                <span className="font-bold text-[10px] text-golden-ochre block uppercase tracking-wider mb-1">Superb Thermal Transfer</span>
                Conducts heat 2x faster than steel, conserving fuel/energy and distributing warmth uniformly.
              </div>
              <div className="bg-surface-container-low p-3 rounded border border-platinum-gray/20">
                <span className="font-bold text-[10px] text-heritage-red block uppercase tracking-wider mb-1">Ergonomic Matte Finish</span>
                Bold matte black aesthetic matches any modern kitchen, built to endure heavy-duty scraping and high heat.
              </div>
            </div>
          </div>
        )
      };
    }

    if (isAluminum) {
      return {
        title: 'Virgin-Grade Aluminum Efficiency',
        icon: <Flame size={16} className="text-amber-500" />,
        content: (
          <div className="space-y-3 font-sans text-xs text-charcoal-matte/80 leading-relaxed">
            <p>
              Our Heritage Aluminum series is engineered using <strong className="text-charcoal-matte font-semibold">99.5% pure virgin-grade Aluminum</strong>, delivering unparalleled thermal efficiency and lightning-fast cooking cycles.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-surface-container-low p-3 rounded border border-platinum-gray/20">
                <span className="font-bold text-[10px] text-emerald-700 block uppercase tracking-wider mb-1">Virgin-Grade Purity</span>
                100% virgin-grade aluminum prevents impurities and preserves original nutritional content.
              </div>
              <div className="bg-surface-container-low p-3 rounded border border-platinum-gray/20">
                <span className="font-bold text-[10px] text-golden-ochre block uppercase tracking-wider mb-1">Lightning-Fast Heating</span>
                Excellent thermal conductivity cooks food in half the time, saving fuel and conserving steam pressure.
              </div>
              <div className="bg-surface-container-low p-3 rounded border border-platinum-gray/20">
                <span className="font-bold text-[10px] text-heritage-red block uppercase tracking-wider mb-1">Sturdy Thick Walls</span>
                Engineered with a heavy gauge wall thickness to withstand extreme pressure without deforming.
              </div>
            </div>
          </div>
        )
      };
    }

    if (isStainlessSteel) {
      return {
        title: 'Premium Stainless Steel Integrity',
        icon: <Flame size={16} className="text-amber-500" />,
        content: (
          <div className="space-y-3 font-sans text-xs text-charcoal-matte/80 leading-relaxed">
            <p>
              This model is crafted from high-purity <strong className="text-charcoal-matte font-semibold">304 Food-Grade Stainless Steel</strong>, chosen specifically for its outstanding durability, corrosion resistance, and complete chemical inertness.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-surface-container-low p-3 rounded border border-platinum-gray/20">
                <span className="font-bold text-[10px] text-emerald-700 block uppercase tracking-wider mb-1">304 Food-Grade Alloy</span>
                Highly hygienic, 100% toxin-free material that won't leach chemicals or alter food flavors.
              </div>
              <div className="bg-surface-container-low p-3 rounded border border-platinum-gray/20">
                <span className="font-bold text-[10px] text-golden-ochre block uppercase tracking-wider mb-1">Heavy Sandwich Base</span>
                Features an extra-thick sandwich base with an aluminum core encapsulated in stainless steel for swift, uniform heating.
              </div>
              <div className="bg-surface-container-low p-3 rounded border border-platinum-gray/20">
                <span className="font-bold text-[10px] text-heritage-red block uppercase tracking-wider mb-1">Mirror Polished Sheen</span>
                Premium high-gloss mirror finish resists tarnishing, scaling, and stains for effortless maintenance.
              </div>
            </div>
          </div>
        )
      };
    }

    // Default Fallback
    return {
      title: 'Culinary-Grade Materials',
      icon: <Flame size={16} className="text-amber-500" />,
      content: (
        <div className="space-y-3 font-sans text-xs text-charcoal-matte/80 leading-relaxed">
          <p>
            Crafted to Geetanjali's premium standards, ensuring long-lasting durability, even heat retention, and safe, healthy cooking for your family.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="bg-surface-container-low p-3 rounded border border-platinum-gray/20">
              <span className="font-bold text-[10px] text-emerald-700 block uppercase tracking-wider mb-1">Ergonomic Design</span>
              Heavy-duty structural base prevents tipping and stays perfectly flat on stove grates.
            </div>
            <div className="bg-surface-container-low p-3 rounded border border-platinum-gray/20">
              <span className="font-bold text-[10px] text-golden-ochre block uppercase tracking-wider mb-1">Uniform Thermal Spread</span>
              Designed to cook food evenly, retaining moisture and preventing burning.
            </div>
            <div className="bg-surface-container-low p-3 rounded border border-platinum-gray/20">
              <span className="font-bold text-[10px] text-heritage-red block uppercase tracking-wider mb-1">Robust Fixtures</span>
              Comes with high-yield double handle rivets or cool-touch grip handles for absolute safety.
            </div>
          </div>
        </div>
      )
    };
  };

  const techAccordionItem = getTechnologyDetails();

  // 6 Accordions structured elegantly
  const accordions = [
    {
      id: 0,
      title: 'Product Description',
      icon: <BookOpen size={16} className="text-heritage-red" />,
      content: (
        <div className="space-y-3 font-sans text-xs text-charcoal-matte/80 leading-relaxed">
          <p>
            Experience ultimate culinary precision with the <strong className="text-charcoal-matte font-semibold">{product.name}</strong>, carefully sculpted to fulfill rigorous professional and domestic kitchen standards. Built from heavy-duty raw metals, it provides elite thermal performance that reduces traditional Indian cooking times by up to 45%.
          </p>
          <p>
            Its heavy-gauge configuration ensures perfect stability, minimizing base bulges even after years of high-flame cooking. A meticulous mirror-polished outer glaze keeps it looking pristine on dinner tables while offering effortless sponge washing.
          </p>
        </div>
      )
    },
    {
      id: 1,
      title: 'Legacy Overview & Heritage Integrity',
      icon: <Award size={16} className="text-golden-ochre" />,
      content: (
        <div className="space-y-3 font-sans text-xs text-charcoal-matte/80 leading-relaxed">
          <p>
            Since 1997, Geetanjali Home Appliances has designed premium kitchen treasures that outlast generations. Our brand philosophy marries timeless geometry with advanced metallurgy.
          </p>
          <ul className="list-disc pl-4.5 space-y-1.5 text-charcoal-matte/75">
            <li><strong className="text-charcoal-matte font-semibold">ISO 9001 Certified Quality</strong>: Tested extensively in automated hydraulic high-pressure environments.</li>
            <li><strong className="text-charcoal-matte font-semibold">ISI Safety Mark</strong>: Confirms strictly to national safety standard IS 2347 codes.</li>
            <li><strong className="text-charcoal-matte font-semibold">Toxin-Free Food Safe</strong>: 100% nickel/lead-free welds with medical-grade steel lining preventing metallic tang transfers.</li>
          </ul>
        </div>
      )
    },
    {
      id: 2,
      title: techAccordionItem.title,
      icon: techAccordionItem.icon,
      content: techAccordionItem.content
    },
    {
      id: 3,
      title: 'Safety Mechanisms & Lock Systems',
      icon: <ShieldCheck size={16} className="text-emerald-600" />,
      content: (
        <div className="space-y-3 font-sans text-xs text-charcoal-matte/80 leading-relaxed">
          <p>
            Your safety is our absolute priority. This design houses a multi-tier backup release architecture that prevents pressure build-up accidents:
          </p>
          <ul className="list-decimal pl-4.5 space-y-2 text-charcoal-matte/75">
            <li><strong className="text-charcoal-matte font-semibold">Precision Calibrated Weight Valve</strong>: Heavy brass whistle regulates steam at optimum safety parameters.</li>
            <li><strong className="text-charcoal-matte font-semibold">Gasket Release System (GRS)</strong>: If vent pipe becomes blocked, the gasket deflects to vent excess steam downwards safely away from the cook.</li>
            <li><strong className="text-charcoal-matte font-semibold">Safety Metallic Valve</strong>: Meltable alloy valve fused at the lid core acts as secondary instant relief if pressure rises beyond maximum boundaries.</li>
            <li><strong className="text-charcoal-matte font-semibold">Double Locking Handles</strong>: Sturdy rivets securely bind the heavy-gauge lid and base handle, locking the cooker body shut during steam expansion.</li>
          </ul>
        </div>
      )
    },
    {
      id: 4,
      title: 'Care & Cleaning Instructions',
      icon: <Settings size={16} className="text-blue-500" />,
      content: (
        <div className="space-y-3 font-sans text-xs text-charcoal-matte/80 leading-relaxed">
          <p>
            Preserve your cookware's sparkling mirror-like shine for decades by following these easy care guidelines:
          </p>
          <ul className="list-disc pl-4.5 space-y-1.5 text-charcoal-matte/75">
            <li>Allow the cooker to cool down completely before washing; plunging a hot metal body in cold water can cause warping.</li>
            <li>Use soft nylon sponges and mild liquid detergents. Avoid steel wool scrubbing pad grids.</li>
            <li>To remove tough mineral deposits or white hard-water scaling, boil a mixture of water and 1 tablespoon of white vinegar or lemon juice inside the base for 10 minutes.</li>
            <li>Always dry thoroughly immediately after washing to prevent water spotting.</li>
            <li>Remove the silicone gasket and clean it under running water after every single session. Store separately to preserve elasticity.</li>
          </ul>
        </div>
      )
    },
    {
      id: 5,
      title: 'Warranty & Registered Dealer Network',
      icon: <HelpCircle size={16} className="text-violet-600" />,
      content: (
        <div className="space-y-3 font-sans text-xs text-charcoal-matte/80 leading-relaxed">
          <p>
            Backed by an ironclad guarantee of excellence, Geetanjali products include direct customer-care warranties:
          </p>
          <p>
            Enjoy a <strong className="text-charcoal-matte font-semibold">5-Year Manufacturing Warranty</strong> on all Stello Series & Trinity Series cooker models, and 2-Year warranty on non-stick surfaces, shielding against metal defects or leakage.
          </p>
          <p>
            Replacement gaskets, safety fuses, and whistle weights can be easily procured through our network of <strong className="text-charcoal-matte font-semibold">over 2,500 authorized dealers</strong> across India. For custom assistance or regional service center details, please connect directly using our support helpline.
          </p>
        </div>
      )
    }
  ];

  const renderCollage = (view: any) => {
    const imgs = view.collageImages || [];
    const isNewCollage = view.id && view.id.endsWith('-new');

    const getZoomStyle = (idx: number) => {
      if (view.collageZoomStyles && view.collageZoomStyles[idx]) {
        return view.collageZoomStyles[idx];
      }
      if (!isNewCollage) return {};
      if (view.id.includes('3l')) {
        switch (idx) {
          case 0: return { transform: 'scale(1.1) translateY(4%)' };
          case 1: return { transform: 'scale(1.35) translateY(-3%)' };
          case 2: return { transform: 'scale(1.4) translateY(6%)' };
          case 3: return { transform: 'scale(1.3)' };
          case 4: return { transform: 'scale(1.1) translateY(-2%)' };
          case 5: return { transform: 'scale(1.5) translateY(-8%)' };
          default: return {};
        }
      } else {
        switch (idx) {
          case 0: return { transform: 'scale(1.15) translateY(2%)' };
          case 1: return { transform: 'scale(1.25) translateY(4%)' };
          case 2: return { transform: 'scale(1.45) translateY(-5%)' };
          case 3: return { transform: 'scale(1.3)' };
          case 4: return { transform: 'scale(1.1) translateY(-3%)' };
          case 5: return { transform: 'scale(1.48) translateY(-6%)' };
          default: return {};
        }
      }
    };

    const getCaptionLabel = (idx: number) => {
      if (view.collageLabels && view.collageLabels[idx]) {
        return view.collageLabels[idx];
      }
      if (!isNewCollage) return `Angle ${idx + 2}`;
      if (view.id.includes('3l')) {
        switch (idx) {
          case 0: return 'Stainless Steel Inner Lid';
          case 1: return 'SAS Tri-Ply Induction Base';
          case 2: return 'Seamless SS 304 Interior';
          case 3: return 'Whistle Weight & Safety Valve';
          case 4: return 'Silicon Gasket Seal';
          case 5: return 'Cool-Touch Double Riveted Handle';
          default: return `Angle ${idx + 2}`;
        }
      } else {
        switch (idx) {
          case 0: return 'Stainless Steel Inner Lid';
          case 1: return 'Seamless SS 304 Interior';
          case 2: return 'SAS Tri-Ply Induction Base';
          case 3: return 'Whistle Weight & Safety Valve';
          case 4: return 'Silicon Gasket Seal';
          case 5: return 'Cool-Touch Double Riveted Handle';
          default: return `Angle ${idx + 2}`;
        }
      }
    };

    // Keep activeCollageIndex bounded to actual collage images length
    const activeIndex = activeCollageIndex < imgs.length ? activeCollageIndex : 0;
    const activeImgSrc = imgs[activeIndex];
    const activeZoomStyle = activeIndex === 0 ? {} : getZoomStyle(activeIndex - 1);
    const activeLabel = activeIndex === 0 
      ? (view.mainLabel || (view.id.includes('3l') ? 'Complete Assembled 3L Cooker' : 'Complete Assembled 5L Cooker')) 
      : getCaptionLabel(activeIndex - 1);

    return (
      <div className="w-full h-full p-4 flex flex-col relative bg-gradient-to-br from-white to-surface-container-lowest overflow-hidden select-none">
        {/* Subtle background glow effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8),transparent)] pointer-events-none" />

        {/* 2-column layout: Left column has the main featured image, right has a grid */}
        <div className="grid grid-cols-12 gap-3 h-[85%] w-full relative z-1">
          {/* Main big featured image with Zoom feature for new collages */}
          <div className="col-span-7 relative bg-white border border-platinum-gray/10 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex items-center justify-center p-4 group/item hover:shadow-md transition-all duration-300">
            {/* Glossy shine glare overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none mix-blend-overlay opacity-0 group-hover/item:opacity-100 transition-opacity duration-700" />
            
            {isNewCollage ? (
              <ProductImageZoom 
                src={activeImgSrc} 
                alt={activeLabel}
                className="max-h-[92%] max-w-[92%] object-contain"
                containerClassName="w-full h-full"
                style={{ filter: 'contrast(1.08) brightness(1.01) saturate(0.98)', ...activeZoomStyle }}
                zoomScale={2.2}
              />
            ) : (
              <img 
                src={activeImgSrc} 
                alt={activeLabel} 
                className="max-h-[92%] max-w-[92%] object-contain transition-transform duration-500 group-hover/item:scale-[1.03]"
                referrerPolicy="no-referrer"
                style={{ mixBlendMode: 'multiply', filter: 'contrast(1.08) brightness(1.01) saturate(0.98)', ...activeZoomStyle }}
              />
            )}
            <span className="absolute bottom-2.5 left-2.5 font-sans font-bold text-[8px] tracking-wider uppercase bg-heritage-red/10 text-heritage-red px-2 py-0.5 rounded shadow-2xs z-10">
              {activeLabel}
            </span>
            {isNewCollage && (
              <span className="absolute top-2.5 left-2.5 font-sans font-bold text-[7px] tracking-wider uppercase bg-emerald-500/10 text-emerald-600 px-1.5 py-0.5 rounded shadow-3xs z-10 animate-pulse">
                Interactive Zoom Enabled
              </span>
            )}
          </div>

          {/* Right side grid of smaller angles - Clicking any changes the active image */}
          <div className="col-span-5 grid grid-cols-2 gap-2 h-full overflow-y-auto pr-1">
            {imgs.map((imgUrl: string, idx: number) => {
              const isSelected = activeIndex === idx;
              const zoomStyle = idx === 0 ? {} : getZoomStyle(idx - 1);
              const label = idx === 0 
                ? (view.mainLabel || (view.id.includes('3l') ? 'Complete Assembled 3L Cooker' : 'Complete Assembled 5L Cooker')) 
                : getCaptionLabel(idx - 1);
              return (
                <button 
                  key={idx}
                  onClick={() => handleCollageSubphotoClick(idx)}
                  onMouseEnter={() => handleCollageSubphotoClick(idx)}
                  className={`relative bg-white border ${
                    isSelected ? 'border-heritage-red ring-1 ring-heritage-red/35' : 'border-platinum-gray/10 hover:border-platinum-gray/30'
                  } ${idx === 0 ? 'col-span-2 h-[48px]' : 'col-span-1 h-[42px]'} rounded-md shadow-2xs overflow-hidden flex items-center justify-center p-1 group/subitem transition-all duration-300`}
                >
                  {/* Subtle shine on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none mix-blend-overlay opacity-0 group-hover/subitem:opacity-100 transition-opacity duration-500" />
                  <img 
                    src={imgUrl} 
                    alt={label} 
                    className="max-h-[85%] max-w-[85%] object-contain transition-transform duration-500 group-hover/subitem:scale-[1.05]"
                    referrerPolicy="no-referrer"
                    style={{ mixBlendMode: 'multiply', filter: 'contrast(1.08) brightness(1.01) saturate(0.98)', ...zoomStyle }}
                  />
                  <span className="absolute bottom-0.5 left-1 font-sans text-[6px] font-bold tracking-wider uppercase bg-charcoal-matte/5 text-charcoal-matte/60 px-1 py-0.5 rounded transition-colors group-hover/subitem:bg-heritage-red/5 group-hover/subitem:text-heritage-red max-w-[92%] truncate">
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Specialty Highlight Callout */}
        {view.specialtyHighlight && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-sans text-[9px] font-bold px-2.5 py-1 rounded-md shadow-md z-20 uppercase tracking-wider flex items-center gap-1.5 animate-pulse border border-amber-400/20">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
            <span>{view.specialtyHighlight}</span>
          </div>
        )}

        {/* Dynamic Catalog Labels in bottom corner as requested */}
        <div className="absolute bottom-16 right-3 bg-white/95 backdrop-blur-md border border-platinum-gray/25 py-2.5 px-4 rounded-lg shadow-md flex flex-col text-right font-sans select-none z-10 transition-transform hover:scale-[1.02] max-w-[290px]">
          <span className="font-display font-bold text-[10px] uppercase tracking-widest text-heritage-red">
            {product.category} {product.name.replace(/Shape/i, '')}
          </span>
          <span className="font-sans text-[8px] font-medium text-tertiary uppercase tracking-wider">
            {product.type === 'inner' ? 'Inner Lid Cooker' : 'Outer Lid Cooker'}
          </span>
          <div className="flex items-start justify-end gap-1.5 mt-1.5 border-t border-platinum-gray/10 pt-1.5">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse mt-1 shrink-0" />
            <span className="font-mono text-[10px] font-extrabold text-charcoal-matte text-right leading-relaxed">
              {view.collageSize}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const seoData = getProductSEO(product, selectedSize);
  const currentPrice = product.prices?.[selectedSize] || 2299;

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": `Geetanjali ${product.name}${selectedSize ? ` (${selectedSize})` : ''}`,
    "image": [product.image],
    "description": product.description,
    "sku": product.sku || product.id,
    "mpn": product.id,
    "brand": {
      "@type": "Brand",
      "name": "Geetanjali Home Appliances"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "Harsh Home Appliances",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Bawana Industrial Area, Delhi",
        "addressCountry": "IN"
      }
    },
    "offers": {
      "@type": "Offer",
      "url": typeof window !== 'undefined' ? window.location.href : `https://geetanjalihomeappliances.com/product/${product.id}`,
      "priceCurrency": "INR",
      "price": currentPrice,
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Geetanjali Home Appliances"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "184"
    }
  };

  return (
    <div className="w-full bg-background pt-20 sm:pt-24 pb-28 md:pb-16 px-4 md:px-8 max-w-7xl mx-auto">
      <Helmet>
        <title>{seoData.metaTitle}</title>
        <meta name="description" content={seoData.metaDescription} />
        <meta name="keywords" content={seoData.keywords} />
        <meta property="og:title" content={seoData.ogTitle} />
        <meta property="og:description" content={seoData.ogDescription} />
        <meta property="og:image" content={seoData.ogImage} />
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
      </Helmet>
      {/* Back to Browse Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-platinum-gray/20 pb-4">
        <button
          onClick={() => {
            // Smart navigation back using the flow history
            onNavigate('back');
          }}
          className="flex items-center gap-1.5 text-xs text-tertiary hover:text-heritage-red font-semibold transition-colors group font-sans"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          <span>Back to Collection</span>
        </button>

        {/* Share and SKU Details */}
        <div className="flex items-center gap-4 text-xs font-mono text-tertiary">
          <span>MODEL ID: <strong className="text-charcoal-matte font-bold">{formatSku(product.sku, selectedSize)}</strong></span>
          <span className="text-platinum-gray/60">|</span>
          <button 
            onClick={handleShare}
            className="flex items-center gap-1.5 hover:text-heritage-red transition-colors text-xs font-semibold font-sans"
          >
            {copiedLink ? (
              <>
                <Check size={14} className="text-emerald-600 animate-bounce" />
                <span className="text-emerald-600">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 size={14} />
                <span>Share Item</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Grid: Thumbnails + Main Photo + Config Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        
        {/* Left Side: Thumbnail Sidebar (10-12 Photos) & Big Display Frame */}
        <div className="lg:col-span-8 flex flex-col md:flex-row gap-4 h-full">
          
          {/* Vertical Thumbnail Column */}
          <div className="w-full md:w-24 flex flex-row md:flex-col gap-2.5 overflow-x-auto md:overflow-y-auto max-h-[550px] md:max-h-[700px] scrollbar-thin scrollbar-thumb-platinum-gray scrollbar-track-transparent pr-1.5 flex-shrink-0 order-2 md:order-1 select-none">
            {views.map((view, idx) => {
              const isSelected = selectedThumbIndex === idx;
              return (
                <button
                  key={view.id}
                  onClick={() => handleSelectThumbnail(idx)}
                  onMouseEnter={() => handleSelectThumbnail(idx)}
                  className={`relative flex items-center justify-center p-1.5 rounded-md border flex-shrink-0 transition-all ${
                    isSelected 
                      ? 'border-heritage-red bg-heritage-red/5 shadow-sm ring-1 ring-heritage-red/40' 
                      : 'border-platinum-gray/40 hover:border-charcoal-matte/60 bg-white hover:bg-surface-container-lowest'
                  } w-14 md:w-full aspect-square`}
                >
                  {/* Thumbnail Image Wrapper with corresponding visual styles */}
                  <div className="w-full h-full bg-surface-container-low rounded overflow-hidden flex items-center justify-center bg-white relative">
                    {view.isTile ? (
                      <div className="w-full h-full p-0.5 rounded border border-white bg-white overflow-hidden relative shadow-3xs">
                        <img 
                          src={view.img} 
                          alt={view.title} 
                          className="absolute max-w-none pointer-events-none"
                          style={{
                            width: `${view.cols * 100}%`,
                            height: 'auto',
                            left: `-${view.col * 100}%`,
                            top: `-${view.row * 100}%`,
                            transform: tileAdjustments[view.id] 
                              ? `scale(${tileAdjustments[view.id].zoom / 100}) translate(${tileAdjustments[view.id].x}%, ${tileAdjustments[view.id].y}%)` 
                              : undefined,
                            transformOrigin: 'center center',
                            mixBlendMode: 'multiply'
                          }}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ) : (
                      <img 
                        src={view.img} 
                        alt={view.title} 
                        className="max-w-full max-h-full object-contain pointer-events-none transition-transform"
                        style={{
                          ...view.style,
                          mixBlendMode: (view.img?.includes('googleusercontent.com') || view.img?.includes('hc-frypan')) ? 'multiply' : undefined
                        }}
                        referrerPolicy="no-referrer"
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Main Large Display Frame */}
          <div className="flex-1 relative aspect-square bg-white border border-platinum-gray/30 rounded-lg p-2.5 flex flex-col items-center justify-center overflow-hidden order-1 md:order-2 h-[400px] md:h-[600px] lg:h-[700px] shadow-sm group">
            {/* Background Aesthetic Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.01] select-none">
              <span className="font-display text-[150px] font-bold tracking-tighter">GEETANJALI</span>
            </div>

            {/* Selected View Graphic Overlays */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedThumbIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="w-full h-full flex items-center justify-center relative"
              >
                {currentView && (currentView as any).isCollage ? (
                  renderCollage(currentView)
                ) : (currentView as any).isTile ? (
                  /* Sliced Tile view with a minimized border and maximized spacing to fit perfectly! */
                  <div className="w-full h-full flex items-center justify-center p-2.5 bg-surface-container-lowest">
                    <div className="relative aspect-square w-full max-w-[640px] bg-white p-0 rounded-lg border-2 border-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] ring-1 ring-platinum-gray/15 overflow-hidden flex items-center justify-center group-hover:scale-[1.01] transition-transform duration-500">
                      <div className="relative w-full h-full overflow-hidden bg-white">
                        <img 
                          src={currentView.img} 
                          alt={currentView.title} 
                          className="absolute max-w-none transition-all duration-300 pointer-events-none animate-fade-in"
                          style={{
                            width: `${(currentView as any).cols * 100}%`,
                            height: 'auto',
                            left: `-${(currentView as any).col * 100}%`,
                            top: `-${(currentView as any).row * 100}%`,
                            transform: tileAdjustments[currentView.id] 
                              ? `scale(${tileAdjustments[currentView.id].zoom / 100}) translate(${tileAdjustments[currentView.id].x}%, ${tileAdjustments[currentView.id].y}%)` 
                              : undefined,
                            transformOrigin: 'center center',
                            mixBlendMode: 'multiply'
                          }}
                          referrerPolicy="no-referrer"
                          onLoad={() => setImageLoading(false)}
                        />
                      </div>
                    </div>
                  </div>
                ) : selectedThumbIndex === 0 ? (
                  <ProductImageZoom 
                    src={currentView ? currentView.img : ''} 
                    alt={currentView ? currentView.title : ''} 
                    onLoad={() => setImageLoading(false)}
                    className={`max-w-full max-h-[96%] object-contain select-none transition-all duration-300 ${
                      imageLoading ? 'opacity-30 blur-xs scale-98' : 'opacity-100 blur-none scale-100'
                    }`}
                    style={currentView ? currentView.style : {}}
                    zoomScale={2.4}
                    containerClassName="w-full h-full"
                  />
                ) : (
                  <img 
                    src={currentView ? currentView.img : ''} 
                    alt={currentView ? currentView.title : ''} 
                    onLoad={() => setImageLoading(false)}
                    className={`max-w-full max-h-[96%] object-contain select-none transition-all duration-300 ${
                      imageLoading ? 'opacity-30 blur-xs scale-98' : 'opacity-100 blur-none scale-100'
                    }`}
                    style={{
                      ...(currentView ? currentView.style : {}),
                      mixBlendMode: (currentView?.img?.includes('googleusercontent.com') || currentView?.img?.includes('hc-frypan')) ? 'multiply' : undefined
                    }}
                    referrerPolicy="no-referrer"
                  />
                )}
                
                {/* Visual Overlays for Technical Diagrams */}
                {currentView && !imageLoading && !(currentView as any).isCollage && currentView.overlay}
              </motion.div>
            </AnimatePresence>

            {/* Premium Loading Overlay State */}
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-[1px] z-10 transition-all duration-300">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 border-2 border-heritage-red/25 border-t-heritage-red rounded-full animate-spin" />
                  <span className="text-[9px] font-mono text-charcoal-matte/60 uppercase tracking-widest animate-pulse">Loading View...</span>
                </div>
              </div>
            )}

            {/* Dynamic View Title & Detailed Caption */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal-matte/95 via-charcoal-matte/85 to-transparent text-white p-5 pt-12 text-left font-sans select-none z-10">
              <p className="text-[11px] text-white/85 leading-relaxed font-light">
                {currentView.subtitle}
              </p>
            </div>


          </div>
        </div>

        {/* Right Side: Product Parameters Panel */}
        <div className="lg:col-span-4 flex flex-col justify-between font-sans">
          
          <div className="space-y-6">
            
            {/* Category Breadcrumb & Ratings */}
            <div className="space-y-1.5 text-left">
              <h1 className="font-display text-2xl md:text-3xl text-charcoal-matte font-semibold leading-tight tracking-tight">
                {product.name}
              </h1>
              <span className="text-sm font-bold text-heritage-red uppercase tracking-wider block mt-1">
                {product.id.startsWith('hc-') 
                  ? 'Tricomb Series' 
                  : (product.category === 'Cookware' || product.id.startsWith('cw-')) 
                    ? 'Trident Series' 
                    : product.category === 'Tri-ply' 
                      ? 'Trinity Series' 
                      : product.category === 'Stainless Steel' 
                        ? 'Stello Series' 
                        : product.category === 'Black Beauty'
                          ? 'Black Beauty Series'
                          : product.category === 'Heritage Aluminum'
                            ? 'Alex Series'
                            : `${product.category} Series`}
              </span>
              
              {/* Stars & Reviews */}
              <div className="flex items-center gap-2.5 pt-1">
                <div className="flex items-center gap-0.5 text-golden-ochre">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" className="stroke-none" />
                  ))}
                </div>
                <span className="text-xs font-mono font-bold text-charcoal-matte">4.9 / 5.0</span>
                <span className="text-platinum-gray/60 text-xs">|</span>
                <span className="text-xs text-tertiary">142 verified dealer reviews</span>
                <span className="text-platinum-gray/60 text-xs">|</span>
                <span className="text-[10px] font-karla text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span>In Stock</span>
                </span>
              </div>
            </div>

            <hr className="border-platinum-gray/20" />

            {/* MRP & Pricing Display Grid */}
            <div className="bg-surface-container-low p-4 rounded-md border border-platinum-gray/20 text-left">
              <span className="text-[10px] font-karla text-tertiary uppercase tracking-wider block mb-1">Maximum Retail Price (MRP)</span>
              
              <div className="flex items-baseline gap-3">
                <span className="font-display text-3xl font-extrabold text-heritage-red">
                  ₹{finalDiscountedPrice.toLocaleString('en-IN')}
                </span>
                
                <span className="text-xs text-tertiary uppercase font-mono tracking-wider">
                  (Inclusive of all taxes)
                </span>
              </div>
              
              <p className="text-[10px] text-tertiary font-sans mt-2">
                *Prices indicated are maximum retail values inclusive of all GST taxes. Special dealer bulk volume pricing available on enquiry.
              </p>
            </div>

            {/* Sizing Panel Selector */}
            <div className="text-left space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-karla text-xs md:text-sm text-charcoal-matte uppercase tracking-wider block font-bold">
                  Select Cooker Sizing Capacity
                </span>
              </div>

              {/* Sizing badges */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                {product.sizes.map((sz) => {
                  const isSel = selectedSize === sz;
                  const isHovered = hoveredSize === sz;
                  return (
                    <div key={sz} className="relative">
                      <button
                        onClick={() => setSelectedSize(sz)}
                        onMouseEnter={() => setHoveredSize(sz)}
                        onMouseLeave={() => setHoveredSize(null)}
                        className={`w-full py-2.5 px-3.5 text-xs md:text-sm font-bold rounded border text-center transition-all ${
                          isSel
                            ? 'bg-heritage-red text-white border-heritage-red shadow-md active:scale-95'
                            : 'bg-white hover:bg-surface-container-low border-platinum-gray text-charcoal-matte active:scale-95'
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

            {/* Cookware Lid Options Component (SS Lid Option) */}
            {isCookware && (
              <div className="text-left space-y-3 p-4 bg-surface-container-low border border-platinum-gray/15 rounded-md">
                <span className="font-karla text-xs md:text-sm text-charcoal-matte uppercase tracking-wider block font-bold">
                  Cookware Protection Options
                </span>
                
                <div className="grid grid-cols-2 gap-3.5">
                  {/* Without Lid */}
                  <button
                    onClick={() => setWithLid(false)}
                    className={`p-3.5 rounded border text-left transition-all flex items-center gap-3 bg-white ${
                      !withLid 
                        ? 'border-heritage-red shadow-sm ring-1 ring-heritage-red/30' 
                        : 'border-platinum-gray hover:border-charcoal-matte/40'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${!withLid ? 'border-heritage-red bg-heritage-red' : 'border-platinum-gray'}`}>
                      {!withLid && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <div className="flex-1 text-xs md:text-sm">
                      <span className="font-bold text-charcoal-matte block">Without Lid</span>
                      <span className="text-[10px] md:text-xs text-tertiary">Standard packaging pricing</span>
                    </div>
                  </button>

                  {/* With SS Lid */}
                  <button
                    onClick={() => setWithLid(true)}
                    className={`p-3.5 rounded border text-left transition-all flex items-center gap-3 bg-white ${
                      withLid 
                        ? 'border-heritage-red shadow-sm ring-1 ring-heritage-red/30' 
                        : 'border-platinum-gray hover:border-charcoal-matte/40'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${withLid ? 'border-heritage-red bg-heritage-red' : 'border-platinum-gray'}`}>
                      {withLid && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <div className="flex-1 text-xs md:text-sm">
                      <span className="font-bold text-charcoal-matte block flex items-center gap-1.5">
                        With SS Lid
                      </span>
                      <span className="text-[10px] md:text-xs text-tertiary">Standard heavy-duty steel lid</span>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Quantity select bar with plus-minus */}
            <div className="text-left space-y-3">
              <span className="font-karla text-xs md:text-sm text-charcoal-matte uppercase tracking-wider block font-bold">
                Select Purchase Quantity
              </span>
              
              <div className="flex items-center gap-4">
                {/* Pill container */}
                <div className="flex items-center border border-platinum-gray/60 rounded-md bg-white overflow-hidden shadow-sm h-12">
                  <button
                    onClick={() => handleQuantityChange(false)}
                    className="px-4.5 h-full hover:bg-surface-container-low text-charcoal-matte hover:text-heritage-red transition-all active:bg-platinum-gray/20 flex items-center justify-center border-r border-platinum-gray/20"
                    title="Decrease quantity"
                  >
                    <Minus size={16} className="stroke-[2]" />
                  </button>
                  <span className="px-6 font-mono font-bold text-base text-charcoal-matte text-center select-none min-w-[55px]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(true)}
                    className="px-4.5 h-full hover:bg-surface-container-low text-charcoal-matte hover:text-heritage-red transition-all active:bg-platinum-gray/20 flex items-center justify-center border-l border-platinum-gray/20"
                    title="Increase quantity"
                  >
                    <Plus size={16} className="stroke-[2]" />
                  </button>
                </div>
              </div>
            </div>

            <hr className="border-platinum-gray/20" />

            {/* Action Buttons Matrix */}
            <div className="space-y-3 text-left">
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Add to Enquire list */}
                {isCurrentlyInList ? (
                  <button
                    onClick={handleRemoveFromEnquiry}
                    className="flex-1 h-13 bg-surface-container-low hover:bg-heritage-red/5 border border-heritage-red text-heritage-red text-xs md:text-sm font-bold py-3.5 px-4 rounded transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <Trash2 size={16} />
                    <span>Remove from List</span>
                  </button>
                ) : (
                  <button
                    onClick={handleAddToEnquiry}
                    className="flex-1 h-13 bg-charcoal-matte hover:bg-heritage-red text-white text-xs md:text-sm font-bold py-3.5 px-4 rounded transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-sm shadow-charcoal-matte/10 group"
                  >
                    <CheckCircle size={16} className="group-hover:scale-110 transition-transform" />
                    <span>Add to Enquiry List</span>
                  </button>
                )}
              </div>

              {/* Direct WhatsApp Enquiry Button */}
              <button
                onClick={handleWhatsAppEnquiry}
                className="w-full h-13 bg-emerald-600 hover:bg-emerald-700 text-white text-xs md:text-sm font-bold py-3.5 px-4 rounded transition-all active:scale-[0.98] flex items-center justify-center gap-2.5 shadow-md shadow-emerald-600/10 cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.058 5.348 5.4 0 12.008 0c3.202.001 6.212 1.248 8.477 3.514 2.266 2.265 3.51 5.273 3.51 8.478 0 6.652-5.343 12-11.95 12h-.002c-2.005-.001-3.973-.503-5.714-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451h.005c5.523 0 10.017-4.493 10.02-10.02.002-2.674-1.03-5.188-2.907-7.067C16.614 1.639 14.113.6 11.512.6c-5.525 0-10.02 4.494-10.023 10.021 0 1.742.47 3.442 1.358 4.954L1.83 20.884l5.514-1.442c.003-.001.003 0 0 0z" />
                </svg>
                <span>Inquire Directly on WhatsApp</span>
              </button>

              {/* Direct Email Enquiry Button */}
              <button
                onClick={handleEmailEnquiry}
                className="w-full h-13 bg-charcoal-matte hover:bg-heritage-red text-white text-xs md:text-sm font-bold py-3.5 px-4 rounded transition-all active:scale-[0.98] flex items-center justify-center gap-2.5 shadow-md cursor-pointer"
              >
                <Mail size={16} />
                <span>Email Product Spec Inquiry</span>
              </button>

              {/* Share Actions Grid */}
              <div className="grid grid-cols-2 gap-3">
                {/* Share Product Button */}
                <button
                  onClick={handleShareProduct}
                  className="h-11 bg-white hover:bg-surface-container-low border border-platinum-gray/60 hover:border-charcoal-matte/50 text-charcoal-matte text-xs font-semibold py-2 px-3 rounded transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-sm"
                >
                  <Share2 size={15} className="text-heritage-red" />
                  <span>Share Product</span>
                </button>

                {/* Share to WhatsApp Button */}
                <button
                  onClick={handleWhatsAppShare}
                  className="h-11 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 hover:border-emerald-400 text-emerald-800 text-xs font-semibold py-2 px-3 rounded transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current text-emerald-600" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.058 5.348 5.4 0 12.008 0c3.202.001 6.212 1.248 8.477 3.514 2.266 2.265 3.51 5.273 3.51 8.478 0 6.652-5.343 12-11.95 12h-.002c-2.005-.001-3.973-.503-5.714-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451h.005c5.523 0 10.017-4.493 10.02-10.02.002-2.674-1.03-5.188-2.907-7.067C16.614 1.639 14.113.6 11.512.6c-5.525 0-10.02 4.494-10.023 10.021 0 1.742.47 3.442 1.358 4.954L1.83 20.884l5.514-1.442c.003-.001.003 0 0 0z" />
                  </svg>
                  <span>Share to WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Compact Trust Badges Strip */}
            <TrustBadges variant="compact" />

            {/* Quick trust metrics */}
            <div className="pt-3">
              <div className="bg-surface-container-low rounded p-2.5 border border-platinum-gray/15 flex items-center gap-2 text-left w-full">
                <ShieldCheck size={14} className="text-emerald-600" />
                <div className="font-sans">
                  <span className="block text-[9px] font-bold text-charcoal-matte uppercase tracking-wider leading-none mb-0.5">5 Year Warranty</span>
                  <span className="text-[10px] text-tertiary">Indian Standards IS 2347 Certified Premium Safety</span>
                </div>
              </div>

              {/* Compatibility & Care Badges below the 5 Year Warranty */}
              <div className="mt-4 pt-4 border-t border-platinum-gray/15">
                <span className="block text-[9px] font-bold text-charcoal-matte uppercase tracking-wider mb-2.5 text-left">Compatibility & Care</span>
                <div className="grid grid-cols-5 gap-2">
                  <div className="bg-surface-container-low border border-platinum-gray/10 rounded p-2 flex flex-col items-center justify-center text-center transition-all hover:border-heritage-red/30 group">
                    <Flame size={16} className="text-charcoal-matte group-hover:text-heritage-red transition-colors mb-1" />
                    <span className="text-[8px] font-bold text-charcoal-matte/70 uppercase tracking-wider">Gas</span>
                  </div>
                  <div className="bg-surface-container-low border border-platinum-gray/10 rounded p-2 flex flex-col items-center justify-center text-center transition-all hover:border-heritage-red/30 group">
                    <svg className="w-4 h-4 text-charcoal-matte group-hover:text-heritage-red transition-colors mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 12h2a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3H2" />
                      <path d="M6 12h4a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3H6" />
                      <path d="M10 12h4a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3h-4" />
                      <path d="M14 12h4a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3h-2" />
                    </svg>
                    <span className="text-[8px] font-bold text-charcoal-matte/70 uppercase tracking-wider">Induction</span>
                  </div>
                  <div className="bg-surface-container-low border border-platinum-gray/10 rounded p-2 flex flex-col items-center justify-center text-center transition-all hover:border-heritage-red/30 group">
                    <svg className="w-4 h-4 text-charcoal-matte group-hover:text-heritage-red transition-colors mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="4" />
                      <path d="M12 2v2" />
                      <path d="M12 20v2" />
                      <path d="M4 12H2" />
                      <path d="M22 12h-2" />
                      <path d="m19.07 4.93-1.41 1.41" />
                      <path d="m6.34 17.66-1.41 1.41" />
                      <path d="m19.07 19.07-1.41-1.41" />
                      <path d="m6.34 6.34-1.41-1.41" />
                    </svg>
                    <span className="text-[8px] font-bold text-charcoal-matte/70 uppercase tracking-wider">Halogen</span>
                  </div>
                  <div className="bg-surface-container-low border border-platinum-gray/10 rounded p-2 flex flex-col items-center justify-center text-center transition-all hover:border-heritage-red/30 group">
                    <svg className="w-4 h-4 text-charcoal-matte group-hover:text-heritage-red transition-colors mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9" />
                      <circle cx="12" cy="12" r="5" />
                      <path d="M12 2v20" />
                      <path d="M2 12h20" />
                    </svg>
                    <span className="text-[8px] font-bold text-charcoal-matte/70 uppercase tracking-wider">Ceramic</span>
                  </div>
                  <div className="bg-surface-container-low border border-platinum-gray/10 rounded p-2 flex flex-col items-center justify-center text-center transition-all hover:border-heritage-red/30 group">
                    <svg className="w-4 h-4 text-charcoal-matte group-hover:text-heritage-red transition-colors mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18M3 12h18M3 18h18" strokeDasharray="2 2" />
                      <path d="M7 6v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V6" strokeWidth="2" />
                    </svg>
                    <span className="text-[8px] font-bold text-charcoal-matte/70 uppercase tracking-wider">Dishwasher</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Premium E-Commerce Product Section for Heritage Aluminum */}
      {product.id === 'al-regular' && (
        <div className="mt-24 max-w-5xl mx-auto border border-platinum-gray/25 rounded-xl bg-white shadow-lg overflow-hidden font-sans">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-charcoal-matte via-charcoal-matte/90 to-charcoal-matte/85 p-6 md:p-8 text-white relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5 pointer-events-none select-none">
              <span className="text-[120px] font-display font-extrabold tracking-tighter">AL-995</span>
            </div>
            <div className="relative z-1 max-w-2xl text-left">
              <span className="text-[10px] font-bold uppercase tracking-widest bg-heritage-red/25 text-red-300 px-2.5 py-1 rounded-full border border-heritage-red/20 mb-3.5 inline-block">
                Pure Virgin Aluminum
              </span>
              <h2 className="text-xl md:text-2xl font-display font-bold tracking-tight">
                Heritage Aluminum Cooker Engineering
              </h2>
              <p className="text-xs text-white/70 leading-relaxed mt-2.5">
                Our legacy pressure cooker, meticulously optimized with ISI certification and 99.5% pure raw virgin metals. Explored through our premium interactive visual layout details.
              </p>
            </div>

            {/* Tab Controls */}
            <div className="flex gap-1 border-t border-white/10 pt-5 mt-6.5 overflow-x-auto">
              <button
                onClick={() => setActiveEcomTab('components')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 shrink-0 ${
                  activeEcomTab === 'components'
                    ? 'bg-white text-charcoal-matte shadow-md'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Settings size={14} className={activeEcomTab === 'components' ? 'text-heritage-red animate-spin-slow' : ''} />
                <span>Anatomy of Cooker</span>
              </button>
              <button
                onClick={() => setActiveEcomTab('safety')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 shrink-0 ${
                  activeEcomTab === 'safety'
                    ? 'bg-white text-charcoal-matte shadow-md'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <ShieldCheck size={14} className={activeEcomTab === 'safety' ? 'text-emerald-600' : ''} />
                <span>Multi-Tier Safety Shield</span>
              </button>
              <button
                onClick={() => setActiveEcomTab('features')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 shrink-0 ${
                  activeEcomTab === 'features'
                    ? 'bg-white text-charcoal-matte shadow-md'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Flame size={14} className={activeEcomTab === 'features' ? 'text-amber-500' : ''} />
                <span>Heritage Performance</span>
              </button>
            </div>
          </div>

          {/* Tab Content Panels */}
          <div className="p-6 md:p-8 bg-surface-container-lowest">
            <AnimatePresence mode="wait">
              {activeEcomTab === 'components' && (
                <motion.div
                  key="components"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
                >
                  {/* Left Anatomy Diagram/Interactive Selector */}
                  <div className="md:col-span-5 space-y-2 text-left">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-tertiary">
                      Select Cooker Component:
                    </span>
                    <div className="flex flex-col gap-1.5">
                      {[
                        { id: 'body', name: 'Heavy-Gauge Cooker Body', desc: 'Virgin-grade thick-gauge vessel' },
                        { id: 'lid', name: 'Precision Slide-Lock Lid', desc: 'Secure outer locking mechanism' },
                        { id: 'gasket', name: 'Silicone Pressure Gasket', desc: 'Air-tight food-grade steam seal' },
                        { id: 'whistle', name: 'Calibrated Brass Whistle', desc: 'Regulates stable steam release' },
                        { id: 'safety', name: 'Fusible Safety Metallic Valve', desc: 'Secondary emergency relief valve' },
                        { id: 'handles', name: 'Double-Riveted Cool Handles', desc: 'Bakelite grips anchored securely' },
                        { id: 'base', name: 'Thermal Dissipating Flat Base', desc: 'Heavy stable bottom distributes heat' },
                      ].map((comp) => (
                        <button
                          key={comp.id}
                          onClick={() => setActiveAnatomyComponent(comp.id)}
                          className={`p-3 rounded-lg border text-left transition-all ${
                            activeAnatomyComponent === comp.id
                              ? 'bg-heritage-red/5 border-heritage-red ring-1 ring-heritage-red/20 shadow-xs'
                              : 'bg-white border-platinum-gray/15 hover:border-charcoal-matte/20 hover:bg-surface-container-lowest/50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`text-xs font-bold ${activeAnatomyComponent === comp.id ? 'text-heritage-red' : 'text-charcoal-matte'}`}>
                              {comp.name}
                            </span>
                            <ChevronRight size={12} className={activeAnatomyComponent === comp.id ? 'text-heritage-red' : 'text-tertiary'} />
                          </div>
                          <span className="text-[10px] text-tertiary block mt-0.5">{comp.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right Display detail panel */}
                  <div className="md:col-span-7 bg-white rounded-xl border border-platinum-gray/20 p-6 shadow-xs relative text-left">
                    <div className="absolute top-4 right-4 text-platinum-gray/30 font-display font-extrabold text-5xl pointer-events-none select-none uppercase">
                      Detail
                    </div>

                    <div className="flex items-center gap-3 mb-4.5">
                      <div className="w-8 h-8 rounded-lg bg-heritage-red/5 border border-heritage-red/15 flex items-center justify-center text-heritage-red">
                        <Settings size={16} className="animate-spin-slow" />
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-heritage-red uppercase tracking-widest block font-mono">
                          Cooker Component Specifications
                        </span>
                        <h4 className="text-base font-display font-bold text-charcoal-matte">
                          {activeAnatomyComponent === 'body' && 'Heavy-Gauge Cooker Body'}
                          {activeAnatomyComponent === 'lid' && 'Precision Slide-Lock Lid'}
                          {activeAnatomyComponent === 'gasket' && 'Silicone Pressure Gasket'}
                          {activeAnatomyComponent === 'whistle' && 'Calibrated Brass Whistle'}
                          {activeAnatomyComponent === 'safety' && 'Fusible Safety Metallic Valve'}
                          {activeAnatomyComponent === 'handles' && 'Double-Riveted Cool Handles'}
                          {activeAnatomyComponent === 'base' && 'Thermal Dissipating Flat Base'}
                        </h4>
                      </div>
                    </div>

                    <div className="space-y-4 font-sans text-xs text-charcoal-matte/80 leading-relaxed min-h-[160px]">
                      {activeAnatomyComponent === 'body' && (
                        <>
                          <p>
                            The cooker body is deep-drawn from premium <strong className="text-charcoal-matte font-semibold">99.5% pure virgin-grade structural aluminum sheets</strong>. Since it is virgin-grade metal, it is completely free from lead, heavy-metal impurities, and alloys that can leech and harm raw nutrients.
                          </p>
                          <ul className="list-disc pl-4.5 space-y-1.5 text-charcoal-matte/75 pt-1 text-[11px]">
                            <li><strong className="text-charcoal-matte">Heavy-Duty Construction</strong>: Built to handle a minimum test pressure of 2.5 kg/cm² without physical bulge.</li>
                            <li><strong className="text-charcoal-matte">Preserves Nutrients</strong>: Fast heating maintains original chemical profiles of legumes and vegetables.</li>
                            <li><strong className="text-charcoal-matte">Impeccable Polish</strong>: Outer surface is mirror-buffed to resist stains and allow easy scrubbing.</li>
                          </ul>
                        </>
                      )}
                      {activeAnatomyComponent === 'lid' && (
                        <>
                          <p>
                            The outer-fitting lid is stamped with an extra-thick aluminum gauge. Its unique slide-lock rim teeth align perfectly with the cooker body collar, sealing internal steam with supreme mechanical integrity.
                          </p>
                          <ul className="list-disc pl-4.5 space-y-1.5 text-charcoal-matte/75 pt-1 text-[11px]">
                            <li><strong className="text-charcoal-matte">Leak-Proof Tight Fit</strong>: Slides on clockwise easily, holding pressure safely within bounds.</li>
                            <li><strong className="text-charcoal-matte">Solid Outer Fitting</strong>: Simple handling with ergonomic grip contours.</li>
                            <li><strong className="text-charcoal-matte">High Rim Strength</strong>: Reinforced edge profile stands up to drop bumps.</li>
                          </ul>
                        </>
                      )}
                      {activeAnatomyComponent === 'gasket' && (
                        <>
                          <p>
                            Molded using food-grade silicone rubber, our gasket is engineered to withstand high temperatures up to 250°C. It sits perfectly inside the lid rim channel, creating a uniform, hermetic seal that traps steam pressure instantly.
                          </p>
                          <ul className="list-disc pl-4.5 space-y-1.5 text-charcoal-matte/75 pt-1 text-[11px]">
                            <li><strong className="text-charcoal-matte">Toxin-Free Compound</strong>: Odorless, hygienic silicone prevents metallic tastes.</li>
                            <li><strong className="text-charcoal-matte font-semibold">Longer Elasticity Life</strong>: High retention compound resists hardening or tearing.</li>
                            <li><strong className="text-charcoal-matte font-semibold">Perfect Thickness</strong>: Sized specifically to allow controlled deflection during GRS triggers.</li>
                          </ul>
                        </>
                      )}
                      {activeAnatomyComponent === 'whistle' && (
                        <>
                          <p>
                            The weight valve operates on a gravitational whistle system. It features a heavy brass core encapsulated with polished stainless steel, designed to sit snugly on top of the vertical steam vent pipe.
                          </p>
                          <ul className="list-disc pl-4.5 space-y-1.5 text-charcoal-matte/75 pt-1 text-[11px]">
                            <li><strong className="text-charcoal-matte">Precision Weight</strong>: Calibrated exactly to lift at standard safety pressure threshold (1.0 kg/cm²).</li>
                            <li><strong className="text-charcoal-matte font-semibold">Controlled Steam Exit</strong>: Channels excess steam in vertical directions safely.</li>
                            <li><strong className="text-charcoal-matte font-semibold">Easy Cleaning</strong>: Lift weight off vent tube to flush out food residues.</li>
                          </ul>
                        </>
                      )}
                      {activeAnatomyComponent === 'safety' && (
                        <>
                          <p>
                            Acting as the secondary passive safety barrier, the fusible safety plug is threaded through the center plate of the outer lid. In the rare event that the vent tube becomes blocked and steam pressure builds too high, the special alloy melts automatically.
                          </p>
                          <ul className="list-disc pl-4.5 space-y-1.5 text-charcoal-matte/75 pt-1 text-[11px]">
                            <li><strong className="text-charcoal-matte">Automatic Thermal Fuse</strong>: Low melting-point metallic alloy ensures instant relief.</li>
                            <li><strong className="text-charcoal-matte font-semibold">Threaded Gasket Seal</strong>: Safe, heat-resistant seal prevents minor steam escapes during normal use.</li>
                            <li><strong className="text-charcoal-matte font-semibold">Easy Replacement</strong>: Easily screw on a new certified metallic plug in seconds.</li>
                          </ul>
                        </>
                      )}
                      {activeAnatomyComponent === 'handles' && (
                        <>
                          <p>
                            Our cooker features dual cool-touch Bakelite handles designed with ergonomic finger grooves. The body handle and lid handle line up perfectly, locking together as a solid, sturdy lifting point when closed.
                          </p>
                          <ul className="list-disc pl-4.5 space-y-1.5 text-charcoal-matte/75 pt-1 text-[11px]">
                            <li><strong className="text-charcoal-matte">Heavy-Duty Steel Rivets</strong>: Rigid brackets anchored to the cooker walls with zero rattle.</li>
                            <li><strong className="text-charcoal-matte font-semibold">Cool-Touch Bakelite</strong>: High temperature resistance protects hands during hot lifts.</li>
                            <li><strong className="text-charcoal-matte font-semibold">Lid Lock Safety Ring</strong>: Prevents accidental lid openings under steam expansion.</li>
                          </ul>
                        </>
                      )}
                      {activeAnatomyComponent === 'base' && (
                        <>
                          <p>
                            The base of the Heritage cooker is engineered with a solid, thick-gauge configuration that remains flat over thousands of high-heat cooking sessions.
                          </p>
                          <ul className="list-disc pl-4.5 space-y-1.5 text-charcoal-matte/75 pt-1 text-[11px]">
                            <li><strong className="text-charcoal-matte">Anti-Bulge Technology</strong>: Specially contoured flat bottom avoids buckling under thermal expansion.</li>
                            <li><strong className="text-charcoal-matte font-semibold">Rapid Thermal Heat Dissipation</strong>: Extremely high heat transfer rate reduces cooking times.</li>
                            <li><strong className="text-charcoal-matte font-semibold">Secure Hob Stability</strong>: Stays perfectly balanced on traditional gas burners and electric hot plates.</li>
                          </ul>
                        </>
                      )}
                    </div>

                    <div className="mt-5 pt-4 border-t border-platinum-gray/10 flex items-center justify-between text-[11px] font-mono text-tertiary">
                      <span>MATERIAL: <strong>99.5% VIRGIN ALUMINUM</strong></span>
                      <span>COMPATIBILITY: <strong>GAS, HALOGEN, CERAMIC</strong></span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeEcomTab === 'safety' && (
                <motion.div
                  key="safety"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6 text-left"
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                      {
                        id: 'grs',
                        title: 'Gasket Release (GRS)',
                        desc: 'The ultimate safety backup. Senses over-pressure and pushes gasket out of rim slot.',
                        icon: <ShieldCheck className="text-emerald-600" size={18} />,
                        points: ['Controlled release window', 'Directs steam downwards', 'Failsafe automatic trigger']
                      },
                      {
                        id: 'whistle',
                        title: 'Weight Valve (Whistle)',
                        desc: 'Calibrated gravitational weight valve for uniform, automatic steam regulation.',
                        icon: <Settings className="text-blue-500" size={18} />,
                        points: ['Heavy brass core', 'Lifts at precise 1.0 kg/cm²', 'Easy manual cleaning access']
                      },
                      {
                        id: 'fuse',
                        title: 'Fusible Safety Valve',
                        desc: 'Secondary protection fuse that melts instantly to let steam bleed if vent pipe blocks.',
                        icon: <Flame className="text-red-500" size={18} />,
                        points: ['Certified alloy fuse', 'Centralized placement', 'Failsafe thermal melting']
                      },
                      {
                        id: 'lock',
                        title: 'Ergonomic Handle Lock',
                        desc: 'Dual structural handles line up and lock shut, preventing lid pop-offs during cook.',
                        icon: <Award className="text-amber-500" size={18} />,
                        points: ['Sturdy double-rivets', 'Cool-touch Bakelite', 'Secure alignment check']
                      }
                    ].map((feature) => (
                      <button
                        key={feature.id}
                        onClick={() => setActiveSafetyFeature(feature.id)}
                        className={`p-4 rounded-xl border transition-all text-left flex flex-col justify-between ${
                          activeSafetyFeature === feature.id
                            ? 'bg-emerald-50/40 border-emerald-500 ring-1 ring-emerald-500/20 shadow-xs'
                            : 'bg-white border-platinum-gray/15 hover:border-charcoal-matte/20 hover:bg-surface-container-lowest/50'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-2.5">
                            <div className="p-1.5 rounded-lg bg-surface-container-low border border-platinum-gray/10">
                              {feature.icon}
                            </div>
                            <h4 className="text-xs font-bold text-charcoal-matte leading-tight">{feature.title}</h4>
                          </div>
                          <p className="text-[11px] text-charcoal-matte/70 leading-relaxed mb-3">{feature.desc}</p>
                        </div>
                        <ul className="space-y-1 text-[10px] text-tertiary">
                          {feature.points.map((p, i) => (
                            <li key={i} className="flex items-center gap-1">
                              <span className="w-1 h-1 rounded-full bg-emerald-500" />
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </button>
                    ))}
                  </div>

                  {/* Deep Dive on active safety feature */}
                  <div className="bg-emerald-50/15 border border-emerald-500/20 rounded-xl p-5 md:p-6 flex flex-col md:flex-row gap-5 items-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 flex-shrink-0 animate-pulse">
                      <ShieldCheck size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider block font-mono mb-1">
                        Failsafe Integration Showcase
                      </h4>
                      <p className="text-xs text-charcoal-matte/80 leading-relaxed">
                        {activeSafetyFeature === 'grs' && (
                          'The Gasket Release System (GRS) is Geetanjali\'s premier safety hallmark. If the main vent pipe gets clogged by solid food particles like lentils, the internal steam pressure forces the silicone gasket to deflect outwards through a precision-cut window slot on the lid rim, discharging steam downwards safely away from your face.'
                        )}
                        {activeSafetyFeature === 'whistle' && (
                          'Every weight whistle valve undergoes computerized testing. The gravitational weight is machined to micrometer precision, ensuring that the cooker operates continuously at optimized pressure ranges. Steam discharges cleanly in vertical streams, avoiding messy food sprays.'
                        )}
                        {activeSafetyFeature === 'fuse' && (
                          'The central safety valve is equipped with a certified fusible alloy plug. In extreme circumstances where the primary whistle and GRS are both physically obstructed, the valve core melts within milliseconds once internal temperatures reach critical levels, serving as a vital tertiary pressure-relief valve.'
                        )}
                        {activeSafetyFeature === 'lock' && (
                          'Our double-locking Bakelite handle design is mechanically sound. The handles are secured to the aluminum cooker wall with robust steel bracket rivets, keeping the cooker locked shut under high-pressure expansion to ensure absolute safety during transport or high-flame cooking.'
                        )}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeEcomTab === 'features' && (
                <motion.div
                  key="features"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left"
                >
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal-matte mb-1">
                      Heritage Series Core Value Features
                    </h3>
                    
                    {[
                      {
                        title: '99.5% Pure Virgin Grade Aluminum',
                        desc: 'We never use recycled scraps. Our 100% pure virgin grade sheets are free from toxic alloys, ensuring high chemical purity and food safety.'
                      },
                      {
                        title: 'Anti-Bulge Heavy Stable Base',
                        desc: 'The flat base is mechanically contoured with a heavy gauge wall thickness, preventing bottom warping or bulging under thermal expansion.'
                      },
                      {
                        title: 'Bureau of Indian Standards Approved',
                        desc: 'Certified with ISI mark matching strict IS 2347 criteria parameters, proving that it has passed rigorous automatic computerized testing.'
                      },
                      {
                        title: 'High-Thermal Heating Efficiency',
                        desc: 'Pure aluminum is an excellent thermal conductor, distributing heat 2.5 times faster than steel, which cuts fuel/gas costs and saves time.'
                      }
                    ].map((feature, idx) => (
                      <div key={idx} className="flex gap-3 bg-white p-4 rounded-lg border border-platinum-gray/15">
                        <span className="w-5 h-5 rounded-full bg-heritage-red/10 border border-heritage-red/20 flex items-center justify-center text-heritage-red text-[10px] font-bold font-mono shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <div>
                          <h4 className="text-xs font-bold text-charcoal-matte mb-1">{feature.title}</h4>
                          <p className="text-[11px] text-charcoal-matte/70 leading-relaxed">{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Large Graphic/Highlight Block */}
                  <div className="bg-surface-container-low border border-platinum-gray/20 rounded-xl p-6 flex flex-col justify-between h-full relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 top-1/2 w-1/2 opacity-5 pointer-events-none select-none">
                      <Flame size={240} className="text-heritage-red" />
                    </div>
                    
                    <div>
                      <span className="text-[9px] font-bold text-heritage-red uppercase tracking-widest block font-mono mb-2">
                        Timeless Kitchen Longevity
                      </span>
                      <h4 className="text-base font-display font-bold text-charcoal-matte tracking-tight leading-snug mb-3">
                        Why the Heritage Aluminum Cooker outlasts ordinary cookware
                      </h4>
                      <p className="text-xs text-charcoal-matte/75 leading-relaxed">
                        For over three decades, Indian households have trusted the Geetanjali Home Appliances series because of its relentless craftsmanship. Engineered with thick-gauge walls, heavy-duty handle rivets, and certified safety valves, this cooker is designed to remain an active culinary partner in your kitchen for generations.
                      </p>
                    </div>

                    <div className="bg-white border border-platinum-gray/25 p-4 rounded-lg mt-6 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600 flex-shrink-0">
                        <Award size={20} />
                      </div>
                      <div className="text-left font-sans">
                        <span className="block text-xs font-bold text-charcoal-matte">
                          2-Year Manufacturing Guarantee
                        </span>
                        <span className="text-[10px] text-tertiary">
                          Ironclad warranty guarding against structural metal defects or leaks.
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Slide Down Collapsible Sections (Accordions) */}
      <div id="accordions-section" className="mt-20 max-w-4xl mx-auto border border-platinum-gray/30 rounded-md overflow-hidden bg-white">
        {accordions.map((acc, index) => {
          const isOpen = openAccordion === acc.id;
          return (
            <div 
              key={acc.id} 
              className={`border-b border-platinum-gray/20 last:border-0 transition-colors ${
                isOpen ? 'bg-surface-container-lowest' : 'bg-white'
              }`}
            >
              {/* Heading Bar Clickable */}
              <button
                onClick={() => setOpenAccordion(isOpen ? null : acc.id)}
                className="w-full flex items-center justify-between p-4.5 hover:bg-surface-container-low/40 transition-colors focus:outline-none text-left"
                id={`accordion-btn-${acc.id}`}
              >
                <div className="flex items-center gap-3">
                  {acc.icon}
                  <h3 className="font-display font-semibold text-charcoal-matte text-sm md:text-base">
                    {acc.title}
                  </h3>
                </div>
                {/* Rotating arrow indicator */}
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="text-tertiary"
                >
                  <ChevronDown size={18} />
                </motion.div>
              </button>

              {/* Collapsed content container */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 md:p-6 pt-0 border-t border-platinum-gray/10">
                      {acc.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Recently Viewed Section */}
      {recentlyViewed.length > 0 && (
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="flex items-center gap-2.5 mb-6 border-b border-platinum-gray/15 pb-3">
            <Clock size={16} className="text-heritage-red" />
            <h3 className="font-display font-bold text-charcoal-matte text-sm md:text-base uppercase tracking-wider">
              Recently Viewed
            </h3>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {recentlyViewed.map((p) => {
              const prices = Object.values(p.prices || {}) as number[];
              const minPrice = prices.length ? Math.min(...prices) : null;
              
              return (
                <div
                  key={p.id}
                  onClick={() => onNavigate('product-detail', p.id)}
                  className="bg-white rounded border border-platinum-gray/20 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer group"
                >
                  <div className="relative h-32 w-full bg-white p-4 flex items-center justify-center border-b border-platinum-gray/10">
                    <img
                      src={p.image}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                      style={{
                        mixBlendMode: (p.image?.includes('googleusercontent.com') || p.image?.includes('hc-frypan')) ? 'multiply' : undefined
                      }}
                    />
                    <span className="font-karla text-[9px] bg-white border border-platinum-gray/50 px-1.5 py-0.5 rounded uppercase text-charcoal-matte/70 absolute top-2 left-2">
                      {p.category}
                    </span>
                  </div>
                  
                  <div className="p-3 flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="font-display font-semibold text-xs text-charcoal-matte group-hover:text-heritage-red transition-colors line-clamp-2 leading-snug">
                        {p.name}
                      </h4>
                    </div>
                    {minPrice && (
                      <div className="mt-3 flex items-baseline justify-between pt-2 border-t border-platinum-gray/5">
                        <span className="text-[8px] font-bold text-tertiary uppercase tracking-wider">From</span>
                        <span className="font-display text-xs font-bold text-heritage-red">
                          ₹{minPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <ProductShareModal 
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        product={product}
        selectedSize={selectedSize}
        price={finalDiscountedPrice}
        isCookware={isCookware}
      />

      {/* Product "How to Use" Video Demonstration Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute inset-0 bg-black/65 backdrop-blur-xs"
            />

            {/* Modal Card content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative bg-white rounded-lg shadow-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row border border-platinum-gray/30 z-10 max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible"
            >
              {/* Desktop close button */}
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 z-50 bg-white hover:bg-surface-container-low text-charcoal-matte hover:text-heritage-red p-2 rounded-full shadow border border-platinum-gray/20 transition-all hidden md:flex active:scale-95"
                title="Close Video Guide"
              >
                <X size={16} />
              </button>

              {/* Video Player Section */}
              <div className="w-full md:w-3/5 bg-black relative aspect-video md:aspect-auto md:min-h-[420px] flex-shrink-0">
                <iframe
                  src={getVideoGuide(product).embedUrl}
                  title={getVideoGuide(product).title}
                  className="absolute inset-0 w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              {/* Instructions and Details Sidebar */}
              <div className="w-full md:w-2/5 p-6 flex flex-col justify-between bg-surface-container-lowest text-left overflow-y-auto">
                <div>
                  <div className="flex items-center justify-between border-b border-platinum-gray/15 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Video size={18} className="text-heritage-red" />
                      <h3 className="font-display font-bold text-charcoal-matte text-xs md:text-sm uppercase tracking-wider">
                        {getVideoGuide(product).title}
                      </h3>
                    </div>
                    <button
                      onClick={() => setIsVideoModalOpen(false)}
                      className="text-tertiary hover:text-charcoal-matte p-1.5 hover:bg-surface-container-low rounded-full transition-all md:hidden"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="space-y-4 pt-1">
                    {getVideoGuide(product).tips.map((tip, idx) => (
                      <div key={idx} className="flex gap-3">
                        <span className="w-5 h-5 rounded-full bg-heritage-red/10 border border-heritage-red/25 flex items-center justify-center text-heritage-red text-[10px] font-mono font-bold flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-xs text-charcoal-matte/85 leading-relaxed font-medium">
                          {tip}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-platinum-gray/15 text-left space-y-2">
                  <span className="text-[9px] font-bold text-charcoal-matte/50 uppercase tracking-widest block font-sans">
                    Safety & Longevity Standards
                  </span>
                  <p className="text-[10px] text-tertiary leading-normal font-sans">
                    All Krashit kitchenware products adhere strictly to BIS IS 2347 criteria guidelines. Please refer to the packaged instruction booklet for complete handling instructions.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Sticky Mobile "Add to Enquiry" & "WhatsApp" CTA Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-platinum-gray/30 p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.12)] flex items-center justify-between gap-2.5">
        <div className="min-w-0 flex-1">
          <h4 className="font-sans font-bold text-xs text-charcoal-matte truncate leading-tight">{product.name}</h4>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="font-mono text-[10px] text-charcoal-matte/60 uppercase">{selectedSize}</span>
            <span className="font-mono text-xs font-black text-heritage-red">₹{currentPrice.toLocaleString('en-IN')}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={isCurrentlyInList ? handleRemoveFromEnquiry : handleAddToEnquiry}
            className={`h-11 px-3.5 rounded text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-95 min-h-[44px] ${
              isCurrentlyInList 
                ? 'bg-heritage-red/10 text-heritage-red border border-heritage-red/30' 
                : 'bg-charcoal-matte text-white hover:bg-heritage-red shadow-sm'
            }`}
          >
            {isCurrentlyInList ? <Trash2 size={15} /> : <CheckCircle size={15} />}
            <span>{isCurrentlyInList ? 'In List' : 'Add to List'}</span>
          </button>

          <button
            onClick={handleWhatsAppEnquiry}
            className="h-11 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-95 min-h-[44px]"
            title="WhatsApp Enquiry"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.058 5.348 5.4 0 12.008 0c3.202.001 6.212 1.248 8.477 3.514 2.266 2.265 3.51 5.273 3.51 8.478 0 6.652-5.343 12-11.95 12h-.002c-2.005-.001-3.973-.503-5.714-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451h.005c5.523 0 10.017-4.493 10.02-10.02.002-2.674-1.03-5.188-2.907-7.067C16.614 1.639 14.113.6 11.512.6c-5.525 0-10.02 4.494-10.023 10.021 0 1.742.47 3.442 1.358 4.954L1.83 20.884l5.514-1.442c.003-.001.003 0 0 0z" />
            </svg>
            <span className="hidden sm:inline">WhatsApp</span>
          </button>
        </div>
      </div>

    </div>
  );
};
