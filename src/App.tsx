import React, { useState, useEffect } from 'react';
import { PageType, CartItem } from './types';
import { PRODUCTS, formatSku } from './products';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Sidebar } from './components/Sidebar';
import { HomeView } from './components/HomeView';
import { PressureCookersView } from './components/PressureCookersView';
import { CookwareView } from './components/CookwareView';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { EnquiryListView } from './components/EnquiryListView';
import { FaqsView } from './components/FaqsView';
import { BlogView } from './components/BlogView';
import { PoliciesView } from './components/PoliciesView';
import { ManualsView } from './components/ManualsView';
import { DealerView } from './components/DealerView';
import { WarrantyView } from './components/WarrantyView';
import { PanIndiaView } from './components/PanIndiaView';
import { NotFoundView } from './components/NotFoundView';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { WhatsAppSuccessModal } from './components/WhatsAppSuccessModal';
import { ProductDetailView } from './components/ProductDetailView';
import { playTactileSound } from './utils/audio';

const getPageCanonical = (page: PageType) => {
  switch (page) {
    case 'home': return 'https://geetanjalihomeappliances.com/';
    case 'pressure-cookers': return 'https://geetanjalihomeappliances.com/pressure-cookers';
    case 'stainless-steel': return 'https://geetanjalihomeappliances.com/stello-series-stainless-steel-pressure-cooker';
    case 'tri-ply': return 'https://geetanjalihomeappliances.com/trinity-series-triply-pressure-cooker';
    case 'black-beauty': return 'https://geetanjalihomeappliances.com/black-beauty-series-hard-anodized-pressure-cooker';
    case 'heritage-aluminum': return 'https://geetanjalihomeappliances.com/alex-series-aluminium-pressure-cooker';
    case 'cookware': return 'https://geetanjalihomeappliances.com/cookware';
    case 'cookware-tri-ply': return 'https://geetanjalihomeappliances.com/trident-series-triply-cookware';
    case 'cookware-honeycomb': return 'https://geetanjalihomeappliances.com/tricomb-series-honeycomb-non-stick-cookware';
    case 'about': return 'https://geetanjalihomeappliances.com/about';
    case 'contact': return 'https://geetanjalihomeappliances.com/contact';
    case 'dealer': return 'https://geetanjalihomeappliances.com/dealer';
    case 'manuals': return 'https://geetanjalihomeappliances.com/manuals';
    case 'warranty': return 'https://geetanjalihomeappliances.com/warranty';
    case 'pan-india': return 'https://geetanjalihomeappliances.com/pan-india';
    case 'faqs': return 'https://geetanjalihomeappliances.com/faqs';
    case 'blog': return 'https://geetanjalihomeappliances.com/blog';
    case 'policies': return 'https://geetanjalihomeappliances.com/policies';
    case 'enquiry-list': return 'https://geetanjalihomeappliances.com/enquiry-list';
    default: return 'https://geetanjalihomeappliances.com/';
  }
};

const getPageSEO = (page: PageType) => {
  switch (page) {
    case 'home':
      return {
        title: 'Geetanjali Home Appliances | Delhi NCR Pressure Cooker & Triply Cookware Manufacturer',
        description: 'Geetanjali Home Appliances (Harsh Home Appliances) - 30+ years leading manufacturer of ISI certified pressure cookers & triply honeycomb cookware in Bawana Industrial Area, Delhi NCR.',
        keywords: 'pressure cooker manufacturer Delhi, Geetanjali Home Appliances, Harsh Home Appliances, triply pressure cooker, ISI certified cooker, Bawana industrial area, wholesale cookware Delhi NCR',
      };
    case 'pressure-cookers':
      return {
        title: 'Pressure Cooker Series (1.5L - 22L) | Geetanjali Home Appliances',
        description: 'Explore Trinity Triply, Stello SS 304, Black Beauty Hard Anodized, and Alex Aluminium pressure cookers. Sizes 1.5 Litre to 22 Litre from Delhi NCR\'s premier factory.',
        keywords: 'pressure cooker 3 litre, pressure cooker 5 litre, triply pressure cooker, hard anodized cooker, 22 litre cooker, ISI pressure cooker Delhi',
      };
    case 'stainless-steel':
      return {
        title: 'Stello SS 304 Stainless Steel Pressure Cookers | Geetanjali Home Appliances',
        description: 'Heavy-gauge SS 304 mirror polished pressure cookers with sandwich bottom base. Durable regular, handi, and contura shapes with ISI mark.',
        keywords: '304 stainless steel pressure cooker, SS handi cooker, stainless steel contura cooker, induction bottom cooker',
      };
    case 'tri-ply':
      return {
        title: 'Trinity Triply Stainless Steel Pressure Cookers | Geetanjali Home Appliances',
        description: 'Advanced 3-layer SAS technology (SS 304 - Aluminum - SS 430) for 360-degree even heating and zero bottom burning.',
        keywords: 'triply pressure cooker, SAS technology cooker, 3 ply steel cooker, even heating pressure cooker',
      };
    case 'black-beauty':
      return {
        title: 'Black Beauty Hard Anodized Pressure Cookers | Geetanjali Home Appliances',
        description: 'Sleek matte-black hard-anodized pressure cookers. 2.4x harder than steel, scratch-resistant, non-reactive to food acids.',
        keywords: 'hard anodized pressure cooker, black inner lid cooker, scratch proof cooker, non reactive cookware',
      };
    case 'heritage-aluminum':
      return {
        title: 'Alex Series Pure Aluminium Pressure Cookers | Geetanjali Home Appliances',
        description: 'Heavy-gauge food-safe virgin aluminium pressure cookers designed for rapid thermal conductivity and value.',
        keywords: 'aluminium pressure cooker, virgin aluminium cooker, outer lid pressure cooker, affordable cooker Delhi',
      };
    case 'cookware':
      return {
        title: 'Triply & Honeycomb Non-Stick Cookware | Geetanjali Home Appliances',
        description: 'Discover Trident Triply Clad steel cookware and Tricomb Honeycomb hybrid non-stick kadhai, frypan, tawa, tope & saucepots.',
        keywords: 'triply cookware set, triply kadhai, honeycomb dosa tawa, non stick frypan, induction cookware Delhi',
      };
    case 'cookware-tri-ply':
      return {
        title: 'Trident 3-Ply Stainless Steel Cookware | Geetanjali Home Appliances',
        description: 'Professional grade tri-ply kadhai, tasra, tope, saucepan, frypan & stewpots built for lifetime heavy cooking.',
        keywords: 'triply kadhai, triply saucepan, stainless steel tasra, heavy duty cookware Delhi',
      };
    case 'cookware-honeycomb':
      return {
        title: 'Tricomb Honeycomb Hybrid Non-Stick Cookware | Geetanjali Home Appliances',
        description: 'Patented laser-etched stainless steel honeycomb mesh protects PFOA-free non-stick surface. 100% metal spatula safe.',
        keywords: 'honeycomb dosa tawa, metal spoon safe non stick, triply honeycomb frypan, scratch proof non stick',
      };
    case 'dealer':
      return {
        title: 'Become a Dealer & Wholesale Partner | Geetanjali Home Appliances Delhi NCR',
        description: 'Join Geetanjali\'s Pan-India B2B distribution network. Direct factory wholesale pricing, maximum dealer margins, ISI quality certification, and complete supply chain support.',
        keywords: 'cookware dealership, pressure cooker distributor India, wholesale cookware manufacturer Bawana Delhi, B2B pressure cooker supplier, Geetanjali dealer application',
      };
    case 'manuals':
      return {
        title: 'User Care Manuals & Component Safety Guides | Geetanjali Home Appliances',
        description: 'Explore step-by-step user care manuals, safety valve operation, vent weight cleaning guides, gasket care, and interactive component safety guides for pressure cookers & triply cookware.',
        keywords: 'pressure cooker user manual, safety valve operation, vent weight cleaning guide, triply cookware maintenance tips, Geetanjali care manual, pressure cooker parts guide',
      };
    case 'warranty':
      return {
        title: 'Warranty Guarantee & Product Catalog PDF | Geetanjali Home Appliances',
        description: 'Official 5-year guarantee details, ISI quality standards, user care guides, and downloadable product catalog PDF.',
        keywords: 'Geetanjali warranty claim, pressure cooker care guide, download cookware catalog PDF',
      };
    case 'pan-india':
      return {
        title: 'We Deliver All Over India | Geetanjali Home Appliances Supply Chain',
        description: 'Direct factory shipping to Delhi NCR, Punjab, Haryana, UP, Maharashtra, Gujarat, South India & East India.',
        keywords: 'cookware shipping India, pressure cooker Pan India delivery, wholesale supply hubs India',
      };
    case 'about':
      return {
        title: 'About Us - 30+ Years Experience | Geetanjali Home Appliances',
        description: 'Manufactured by Harsh Home Appliances in Bawana Industrial Area, Sector-2, Delhi - 110039. Over 3 decades of cookware engineering.',
        keywords: 'Harsh Home Appliances Bawana, Geetanjali Home Appliances history, cookware factory Delhi',
      };
    case 'contact':
      return {
        title: 'Contact Us | Geetanjali Home Appliances Bawana Delhi NCR',
        description: 'Visit our plant at K-11, Sector-2, Bawana Industrial Area, Delhi - 110039. Call/WhatsApp: +91 9205293094.',
        keywords: 'contact Geetanjali, Bawana industrial area location, cookware factory phone number',
      };
    case 'faqs':
      return {
        title: 'Frequently Asked Questions & Care Guides | Geetanjali Home Appliances',
        description: 'Answers about pressure cooker safety, triply maintenance, induction compatibility, and spare parts.',
        keywords: 'pressure cooker FAQ, triply care tips, gasket safety, induction bottom guidance',
      };
    case 'blog':
      return {
        title: 'The Geetanjali Journal | Pressure Cooker & Cookware Guides',
        description: 'Expert articles on triply vs stainless steel cookers, ISI safety standards, honeycomb non-stick tech, and family size guides.',
        keywords: 'pressure cooker blog, triply cookware guide, cookware metallurgy articles India',
      };
    case 'policies':
      return {
        title: 'Privacy Policy & Terms of Service | Geetanjali Home Appliances',
        description: 'Read Geetanjali Home Appliances terms of service, privacy policy, shipping & return guidelines, and warranty policies.',
        keywords: 'Geetanjali privacy policy, shipping terms, return policy, warranty terms',
      };
    case 'enquiry-list':
      return {
        title: 'B2B Inquiry List & Wholesale Quote Request | Geetanjali Home Appliances',
        description: 'Review your selected pressure cookers and cookware for bulk wholesale quotation, direct factory pricing, and distributor inquiries.',
        keywords: 'wholesale quote request, B2B cookware enquiry, pressure cooker bulk order Geetanjali',
      };
    default:
      return {
        title: 'Geetanjali Home Appliances | Pressure Cookers & Cookware Delhi',
        description: 'Geetanjali Home Appliances - 30+ years leading manufacturer of ISI certified pressure cookers and triply cookware in Delhi NCR.',
        keywords: 'pressure cooker, triply cookware, Geetanjali Home Appliances, Harsh Home Appliances Delhi',
      };
  }
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [initialProductSize, setInitialProductSize] = useState<string | null>(null);
  const [navHistory, setNavHistory] = useState<{ page: PageType; productId?: string | null }[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [whatsAppMessageText, setWhatsAppMessageText] = useState('');
  const [activePolicyTab, setActivePolicyTab] = useState<string>('refund');

  useEffect(() => {
    const handleWhatsAppSent = (e: Event) => {
      const customEvent = e as CustomEvent<{ text: string }>;
      if (customEvent.detail && customEvent.detail.text) {
        setWhatsAppMessageText(customEvent.detail.text);
      } else {
        setWhatsAppMessageText('');
      }
      setIsWhatsAppModalOpen(true);
      
      // Play tactile premium audio feedback for WhatsApp inquiry transmission
      playTactileSound('whatsapp');
    };

    window.addEventListener('whatsapp-inquiry-sent', handleWhatsAppSent);
    return () => {
      window.removeEventListener('whatsapp-inquiry-sent', handleWhatsAppSent);
    };
  }, []);

  // Monitor scroll height to show/hide "Back to Top" floating button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Load Enquiry List from localStorage on startup
  useEffect(() => {
    try {
      const stored = localStorage.getItem('geetanjali_enquiry_list');
      if (stored) {
        setCartItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Error reading localStorage data', e);
    }
    
    // Automatically scroll to top on initial mount
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Save Enquiry List to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('geetanjali_enquiry_list', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error writing localStorage data', e);
    }
  }, [cartItems]);

  // Handle page transitions and auto-scroll to top for pristine UX
  const handleNavigate = (page: PageType | 'back', targetProductId?: string, initialSize?: string) => {
    if (page === 'back') {
      if (navHistory.length > 0) {
        // Pop the last page from history
        const previous = navHistory[navHistory.length - 1];
        setNavHistory(prev => prev.slice(0, -1));
        
        setCurrentPage(previous.page);
        if (previous.productId) {
          setSelectedProductId(previous.productId);
        } else {
          setSelectedProductId(null);
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Fallback default back behavior: go back to home
        setCurrentPage('home');
        setSelectedProductId(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    // Normal forward navigation
    if (page !== currentPage || (page === 'product-detail' && targetProductId !== selectedProductId)) {
      setNavHistory(prev => {
        // Prevent pushing duplicate state as the last item
        const last = prev[prev.length - 1];
        if (last && last.page === currentPage && last.productId === selectedProductId) {
          return prev;
        }
        return [...prev, { page: currentPage, productId: selectedProductId }];
      });
    }

    setCurrentPage(page);
    if (page === 'policies') {
      setSelectedProductId(null);
      if (targetProductId) {
        setActivePolicyTab(targetProductId);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'product-detail' && targetProductId) {
      setSelectedProductId(targetProductId);
      setInitialProductSize(initialSize || null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (targetProductId) {
      setSelectedProductId(null);
      // Smooth scroll to product after allowing React to render the page
      setTimeout(() => {
        const el = document.getElementById(`prod-card-${targetProductId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Highlight flash effect
          el.classList.add('ring-4', 'ring-heritage-red/40', 'scale-[1.01]', 'shadow-lg');
          setTimeout(() => {
            el.classList.remove('ring-4', 'ring-heritage-red/40', 'scale-[1.01]', 'shadow-lg');
          }, 2000);
        }
      }, 300);
    } else {
      setSelectedProductId(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Add Item to Inquiry List
  const handleAddToCart = (productId: string, size: string, quantity: number = 1) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.productId === productId && item.size === size
      );

      if (existingIndex > -1) {
        // If exact item & size exists, increment quantity
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        // Otherwise, append new item
        const newItem: CartItem = {
          id: `${productId}_${size.replace(/\s+/g, '')}`,
          productId: product.id,
          name: product.name,
          category: product.category,
          image: product.image,
          size: size,
          sku: formatSku(product.sku, size),
          quantity: quantity,
        };
        return [...prevItems, newItem];
      }
    });

    // Automatically open Enquiry Sidebar to give responsive user feedback
    setIsSidebarOpen(true);
    
    // Play tactile premium audio feedback
    playTactileSound('cart');
  };

  // Remove individual item from Enquiry list
  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  // Update item quantity in the list
  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
    );
  };

  // Clear all selections
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Render the correct content based on routing state
  const renderPageContent = () => {
    switch (currentPage) {
      case 'home':
        return <HomeView onNavigate={handleNavigate} onAddToCart={handleAddToCart} />;
      
      case 'pressure-cookers':
        return (
          <PressureCookersView
            initialSubCategory="all"
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigate}
          />
        );
      
      case 'stainless-steel':
        return (
          <PressureCookersView
            initialSubCategory="stainless-steel"
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigate}
          />
        );
      
      case 'tri-ply':
        return (
          <PressureCookersView
            initialSubCategory="tri-ply"
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigate}
          />
        );
      
      case 'black-beauty':
        return (
          <PressureCookersView
            initialSubCategory="black-beauty"
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigate}
          />
        );
      
      case 'heritage-aluminum':
        return (
          <PressureCookersView
            initialSubCategory="heritage-aluminum"
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigate}
          />
        );
      
      case 'cookware':
        return <CookwareView onAddToCart={handleAddToCart} onNavigate={handleNavigate} />;
      
      case 'cookware-tri-ply':
        return <CookwareView initialTab="tri-ply" onAddToCart={handleAddToCart} onNavigate={handleNavigate} />;
      
      case 'cookware-honeycomb':
        return <CookwareView initialTab="honeycomb" onAddToCart={handleAddToCart} onNavigate={handleNavigate} />;
      
      case 'about':
        return <AboutView onNavigate={handleNavigate} />;
      
      case 'contact':
        return <ContactView />;
      
      case 'enquiry-list':
        return (
          <EnquiryListView
            cartItems={cartItems}
            onRemoveItem={handleRemoveItem}
            onUpdateQuantity={handleUpdateQuantity}
            onClearCart={handleClearCart}
            onNavigate={handleNavigate}
          />
        );
      
      case 'faqs':
        return <FaqsView />;

      case 'blog':
        return <BlogView onNavigate={handleNavigate} />;

      case 'policies':
        return <PoliciesView initialPolicyTab={activePolicyTab} key={activePolicyTab} />;

      case 'manuals':
        return <ManualsView onNavigate={handleNavigate} />;

      case 'dealer':
        return <DealerView onNavigate={handleNavigate} />;

      case 'warranty':
        return <WarrantyView onNavigate={handleNavigate} />;

      case 'pan-india':
        return <PanIndiaView onNavigate={handleNavigate} />;

      case '404':
        return <NotFoundView onNavigate={handleNavigate} />;

      case 'product-detail':
        return (
          <ProductDetailView
            productId={selectedProductId || ''}
            onAddToCart={handleAddToCart}
            cartItems={cartItems}
            onRemoveItem={handleRemoveItem}
            onNavigate={handleNavigate}
            initialSize={initialProductSize || undefined}
          />
        );
      
      default:
        return <NotFoundView onNavigate={handleNavigate} />;
    }
  };

  const seo = getPageSEO(currentPage);
  const canonicalUrl = getPageCanonical(currentPage);

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-background text-charcoal-matte flex flex-col font-sans transition-all duration-300">
        <Helmet>
          <title>{seo.title}</title>
          <meta name="description" content={seo.description} />
          <meta name="keywords" content={seo.keywords} />
          <link rel="canonical" href={canonicalUrl} />
          
          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content={seo.title} />
          <meta property="og:description" content={seo.description} />
          <meta property="og:url" content={canonicalUrl} />
          <meta property="og:image" content="https://lh3.googleusercontent.com/d/1quPptK4LJc0Aw--sAW0y2d4CMUlR-WTQ" />
          
          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={seo.title} />
          <meta name="twitter:description" content={seo.description} />
          <meta name="twitter:image" content="https://lh3.googleusercontent.com/d/1quPptK4LJc0Aw--sAW0y2d4CMUlR-WTQ" />
        </Helmet>
      {/* Top Glass Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartItems={cartItems}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Screen Content Frame */}
      <main className="flex-grow w-full flex flex-col items-center overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage === 'product-detail' ? `${currentPage}_${selectedProductId}` : currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col items-center"
          >
            {renderPageContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Slideout Sidebar Drawer */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onNavigate={handleNavigate}
      />

      {/* WhatsApp Inquiry Success Confirmation Modal */}
      <WhatsAppSuccessModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        messageText={whatsAppMessageText}
      />

      {/* Footer Details */}
      <Footer onNavigate={handleNavigate} onClearCart={handleClearCart} />

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            id="back-to-top-btn"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 bg-heritage-red text-white p-3.5 md:p-4 rounded-full shadow-2xl hover:bg-primary transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-heritage-red cursor-pointer flex items-center justify-center group"
            title="Back to Top"
            aria-label="Back to Top"
          >
            <ArrowUp size={20} className="transition-transform group-hover:-translate-y-1 duration-300" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
    </HelmetProvider>
  );
}
