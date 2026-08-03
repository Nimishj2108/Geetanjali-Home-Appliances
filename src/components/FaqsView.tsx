import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { 
  Search, 
  ChevronDown, 
  ShieldAlert, 
  Utensils, 
  Sparkles, 
  HelpCircle, 
  ChevronUp,
  MessageSquare,
  Mail,
  Building2,
  Award
} from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  items: FAQ[];
}

export const FaqsView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('brand');
  const [expandedIndex, setExpandedIndex] = useState<string | null>(null);

  const faqData: FAQCategory[] = [
    {
      id: 'brand',
      title: 'Brand & Manufacturer',
      icon: <Building2 size={16} />,
      items: [
        {
          question: 'What is Geetanjali Home Appliances?',
          answer: 'Geetanjali Home Appliances is an Indian kitchenware brand specializing in ISI-certified pressure cookers and triply cookware. Manufactured by Harsh Home Appliances in Delhi NCR, the brand provides export-quality cookware direct from the factory.'
        },
        {
          question: 'Who manufactures Geetanjali pressure cookers?',
          answer: 'Geetanjali pressure cookers and cookware are manufactured by Harsh Home Appliances at K-11, Sector-2, Bawana Industrial Area, Delhi - 110039, India.'
        },
        {
          question: 'Where is Geetanjali Home Appliances located?',
          answer: 'The primary manufacturing plant and office of Geetanjali Home Appliances is located at K-11, Sector-2, Bawana Industrial Area, Delhi - 110039, India.'
        },
        {
          question: 'Is Geetanjali Home Appliances ISI certified?',
          answer: 'Yes. Geetanjali pressure cookers are ISI certified by the Bureau of Indian Standards (BIS) under IS 2347, ensuring strict adherence to thermal safety, hydrostatic testing, and pressure release protocols.'
        },
        {
          question: 'How many years of experience does Geetanjali have in cookware manufacturing?',
          answer: 'Geetanjali Home Appliances (manufactured by Harsh Home Appliances) brings over 30 years of industrial metal processing and cookware manufacturing expertise since 1997.'
        },
        {
          question: 'Is Geetanjali a good brand for pressure cookers compared to Hawkins or Prestige?',
          answer: 'Geetanjali offers export-quality, ISI-certified pressure cookers built with the same premium food-grade materials (SS 304, triply clad steel, heavy-gauge aluminium) as leading brands like Hawkins or Prestige. Because Geetanjali ships directly from its Bawana factory without expensive retail markups, it provides equal or superior durability, safety, and warranty coverage at significantly more affordable pricing.'
        }
      ]
    },
    {
      id: 'cookers',
      title: 'Pressure Cookers',
      icon: <ShieldAlert size={16} />,
      items: [
        {
          question: 'What types of pressure cookers does Geetanjali make?',
          answer: 'Geetanjali manufactures four distinct series of pressure cookers: Trinity Series (Triply Stainless Steel), Stello Series (SS 304 Stainless Steel), Black Beauty Series (Hard Anodized), and Alex Series (Pure Virgin Aluminium).'
        },
        {
          question: 'What is the difference between Geetanjali\'s Trinity and Stello series?',
          answer: 'The Trinity Series features 3-layer triply steel (SS 304 inner + Aluminium core + SS 430 outer) across the entire body for 360-degree heat distribution. The Stello Series features a heavy SS 304 stainless steel body with a heavy sandwich base attached at the bottom for induction compatibility.'
        },
        {
          question: 'What sizes of pressure cookers are available from Geetanjali?',
          answer: 'Geetanjali pressure cookers range from 1.5 Litres to 22 Litres capacity. Domestic sizes include 1.5L, 2L, 3L, 5L, and 7.5L. Commercial and institutional sizes include 10L, 12L, 16L, 20L, and 22L.'
        },
        {
          question: 'Is it completely safe to use Geetanjali pressure cookers?',
          answer: 'Yes. Every Geetanjali pressure cooker features multi-layered safety mechanisms including a weight pressure regulator, Gasket Release System (GRS), Gasket Vent System (GVS), and a metallic safety valve with a fusible alloy plug.'
        },
        {
          question: 'Can I use Geetanjali pressure cookers on induction cooktops?',
          answer: 'Yes. All Trinity Triply, Stello Stainless Steel, and select Black Beauty induction models feature magnetic stainless steel bases compatible with induction, gas, halogen, and ceramic cooktops.'
        }
      ]
    },
    {
      id: 'cookware',
      title: 'Tri-Ply & Cookware',
      icon: <Utensils size={16} />,
      items: [
        {
          question: 'Does Geetanjali make triply cookware?',
          answer: 'Yes. Geetanjali manufactures the Trident Series (Triply Stainless Steel Cookware), which includes Kadhais, Tasras, Topes, Saucepans, Frypans, and Stewpots made with 3-ply clad steel.'
        },
        {
          question: 'What is Tricomb series cookware?',
          answer: 'The Tricomb Series is Geetanjali\'s patented hybrid non-stick cookware featuring a laser-etched stainless steel honeycomb grid protecting a PFOA-free non-stick surface. It allows 100% metal spatula safety and requires 80% less oil.'
        },
        {
          question: 'Is your non-stick cookware range safe and PFOA-free?',
          answer: 'Yes. All non-stick coatings used by Geetanjali are 100% PFOA-free, heavy metal-free, lead-free, and food-safe.'
        }
      ]
    },
    {
      id: 'supply',
      title: 'Shipping & Dealers',
      icon: <HelpCircle size={16} />,
      items: [
        {
          question: 'Does Geetanjali Home Appliances ship all over India?',
          answer: 'Yes. Geetanjali provides Pan-India delivery covering Delhi NCR, Punjab, Haryana, UP, Rajasthan, Maharashtra, Gujarat, Karnataka, Tamil Nadu, West Bengal, and all other Indian states and union territories.'
        },
        {
          question: 'How do I contact Geetanjali Home Appliances for bulk/wholesale orders?',
          answer: 'For B2B wholesale, distributorship, or institutional bulk procurement, contact the factory sales team via call/WhatsApp at +91 9205293094 or email geetanjalihomeappliances.india@gmail.com.'
        }
      ]
    }
  ];

  // Flatten all Q&As for FAQPage JSON-LD schema
  const allFaqs = faqData.flatMap(cat => cat.items);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allFaqs.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  // Search filter
  const filteredCategories = faqData.map(category => {
    const filteredItems = category.items.filter(item => 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...category, items: filteredItems };
  }).filter(category => category.items.length > 0);

  const toggleAccordion = (id: string) => {
    if (expandedIndex === id) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(id);
    }
  };

  const handleWhatsAppSupport = () => {
    const text = "Hello Geetanjali Home Appliances team, I am looking for support regarding your cookware / pressure cooker range. Please assist.";
    window.open(`https://wa.me/919205293094?text=${encodeURIComponent(text)}`, '_blank');
    window.dispatchEvent(new CustomEvent('whatsapp-inquiry-sent', { detail: { text } }));
  };

  const handleEmailSupport = () => {
    const subject = encodeURIComponent("Geetanjali Support Inquiry");
    const body = encodeURIComponent("Hello Geetanjali Home Appliances Support Team,\n\nI have a query regarding...");
    window.open(`mailto:geetanjalihomeappliances.india@gmail.com?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="w-full animate-fade-in bg-surface-container-lowest/20">
      <Helmet>
        <title>Frequently Asked Questions | Geetanjali Home Appliances</title>
        <meta 
          name="description" 
          content="Find answers to all questions about Geetanjali Home Appliances pressure cookers, triply cookware, ISI safety certifications, sizes (1.5L-22L), and dealer distribution." 
        />
        <link rel="canonical" href="https://geetanjalihomeappliances.com/faqs" />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      {/* Header section */}
      <section className="bg-surface-container-high py-16 md:py-24 border-b border-platinum-gray/30 text-center px-6">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="font-karla text-[10px] text-heritage-red uppercase tracking-widest font-semibold">
            Support Center & FAQ
          </span>
          <h1 className="font-headline-lg text-3xl md:text-4xl text-charcoal-matte font-semibold">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-charcoal-matte/70 max-w-xl mx-auto leading-relaxed">
            Get factual information regarding Geetanjali pressure cookers, triply technology, manufacturing standards, and dealer alliances.
          </p>

          {/* Search bar */}
          <div className="max-w-md mx-auto pt-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search queries e.g. 'ISI', 'manufactured', 'sizes', 'dealer'..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-platinum-gray rounded-full text-xs shadow-sm focus:border-heritage-red focus:outline-none transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-matte/40" size={16} />
            </div>
          </div>
        </div>
      </section>

      {/* Main FAQs Grid */}
      <section className="max-w-[1200px] mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Category Tabs (Desktop Left Panel) */}
        <div className="lg:col-span-3 space-y-2">
          <h3 className="font-karla text-[10px] text-tertiary uppercase tracking-wider mb-4 px-3">
            Categories
          </h3>
          <div className="flex overflow-x-auto lg:flex-col gap-2 pb-4 lg:pb-0 scrollbar-none">
            {faqData.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    setSearchQuery('');
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md text-left transition-all duration-300 whitespace-nowrap text-xs font-semibold uppercase font-sans focus:outline-none cursor-pointer ${
                    isActive 
                      ? 'bg-charcoal-matte text-white shadow' 
                      : 'bg-white hover:bg-surface-container-low border border-platinum-gray/50 text-charcoal-matte/80'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-heritage-red'}>
                    {category.icon}
                  </span>
                  {category.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQs List Accordion Panel */}
        <div className="lg:col-span-9 space-y-4">
          <AnimatePresence mode="wait">
            {searchQuery ? (
              // Search view
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between border-b border-platinum-gray/30 pb-2 mb-4">
                  <span className="text-xs font-semibold font-karla text-tertiary uppercase tracking-wider">
                    Search Results ({filteredCategories.reduce((acc, cat) => acc + cat.items.length, 0)})
                  </span>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-heritage-red hover:underline font-semibold cursor-pointer"
                  >
                    Clear Search
                  </button>
                </div>

                {filteredCategories.length === 0 ? (
                  <div className="bg-white rounded-lg border border-platinum-gray/50 p-12 text-center space-y-4 shadow-sm">
                    <p className="text-sm text-charcoal-matte/75">
                      No matching FAQs found for "{searchQuery}".
                    </p>
                    <p className="text-xs text-tertiary">
                      Try searching another keyword or write to our support desk below.
                    </p>
                  </div>
                ) : (
                  filteredCategories.map((category) => (
                    <div key={category.id} className="space-y-3">
                      <h4 className="font-karla text-[10px] text-heritage-red uppercase tracking-widest font-semibold px-1 mt-6">
                        {category.title}
                      </h4>
                      {category.items.map((item, idx) => {
                        const uniqueId = `${category.id}-${idx}`;
                        const isExpanded = expandedIndex === uniqueId;
                        return (
                          <div 
                            key={uniqueId}
                            className="bg-white rounded border border-platinum-gray/60 overflow-hidden shadow-sm hover:border-platinum-gray transition-colors"
                          >
                            <button
                              onClick={() => toggleAccordion(uniqueId)}
                              className="w-full flex justify-between items-center px-5 py-4 text-left font-sans font-semibold text-charcoal-matte text-sm focus:outline-none cursor-pointer"
                            >
                              <span>{item.question}</span>
                              <span className="text-heritage-red transition-transform duration-300">
                                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                              </span>
                            </button>
                            {isExpanded && (
                              <div className="px-5 pb-5 pt-1 text-xs text-charcoal-matte/80 leading-relaxed border-t border-platinum-gray/30 bg-surface-container-lowest/10">
                                {item.answer}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))
                )}
              </motion.div>
            ) : (
              // Category view
              faqData.filter(cat => cat.id === activeCategory).map((category) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <h3 className="font-karla text-xs text-charcoal-matte font-bold uppercase tracking-widest border-b border-platinum-gray/40 pb-3">
                    {category.title} Guide
                  </h3>
                  
                  <div className="space-y-3">
                    {category.items.map((item, idx) => {
                      const uniqueId = `${category.id}-${idx}`;
                      const isExpanded = expandedIndex === uniqueId;
                      return (
                        <div 
                          key={uniqueId}
                          className="bg-white rounded border border-platinum-gray/60 overflow-hidden shadow-sm hover:border-platinum-gray transition-colors"
                        >
                          <button
                            onClick={() => toggleAccordion(uniqueId)}
                            className="w-full flex justify-between items-center px-5 py-4 text-left font-sans font-semibold text-charcoal-matte text-sm focus:outline-none cursor-pointer"
                          >
                            <span>{item.question}</span>
                            <span className="text-heritage-red transition-transform duration-300">
                              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </span>
                          </button>
                          {isExpanded && (
                            <div className="px-5 pb-5 pt-1 text-xs text-charcoal-matte/80 leading-relaxed border-t border-platinum-gray/30 bg-surface-container-lowest/10">
                              {item.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Support CTA cards at bottom */}
      <section className="bg-white border-t border-platinum-gray/40 py-16 px-6">
        <div className="max-w-[1200px] mx-auto text-center space-y-8">
          <div className="space-y-2">
            <h3 className="font-headline-sm text-2xl text-charcoal-matte font-semibold">
              Still have questions?
            </h3>
            <p className="text-xs text-charcoal-matte/70 max-w-lg mx-auto">
              Our direct support team at Harsh Home Appliances is ready to guide you. Connect with us through the channels below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto pt-4">
            {/* WhatsApp */}
            <div className="bg-surface-container-lowest rounded p-6 border border-platinum-gray/40 flex flex-col items-center gap-4 text-center">
              <div className="w-12 h-12 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center">
                <MessageSquare size={20} />
              </div>
              <div>
                <h4 className="font-sans font-semibold text-xs uppercase tracking-wider text-charcoal-matte">
                  WhatsApp Helpline
                </h4>
                <p className="text-[11px] text-charcoal-matte/60 mt-1">
                  Get instant product spec guides via chat.
                </p>
              </div>
              <button 
                onClick={handleWhatsAppSupport}
                className="w-full bg-[#25D366] text-white py-3 rounded text-[11px] font-sans tracking-wider uppercase hover:bg-[#20ba5a] transition-all cursor-pointer font-semibold"
              >
                Chat on WhatsApp
              </button>
            </div>

            {/* Email Support */}
            <div className="bg-surface-container-lowest rounded p-6 border border-platinum-gray/40 flex flex-col items-center gap-4 text-center">
              <div className="w-12 h-12 rounded-full bg-heritage-red/10 text-heritage-red flex items-center justify-center">
                <Mail size={20} />
              </div>
              <div>
                <h4 className="font-sans font-semibold text-xs uppercase tracking-wider text-charcoal-matte">
                  Email Desk
                </h4>
                <p className="text-[11px] text-charcoal-matte/60 mt-1">
                  Drop us an email for wholesale or custom demands.
                </p>
              </div>
              <button 
                onClick={handleEmailSupport}
                className="w-full bg-charcoal-matte text-white py-3 rounded text-[11px] font-sans tracking-wider uppercase hover:bg-heritage-red transition-all cursor-pointer font-semibold"
              >
                Send Email
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
