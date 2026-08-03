import React, { useState } from 'react';
import { ShoppingCart, Menu, X, ClipboardList, Search, FolderOpen, Tag } from 'lucide-react';
import { PageType, CartItem } from '../types';
import { PRODUCTS, Product } from '../products';

const SUGGESTED_SEARCHES = [
  { label: 'Trinity Series', term: 'Tri-ply' },
  { label: 'Stello Series', term: 'Stainless Steel' },
  { label: 'Contura Lids', term: 'Contura' },
  { label: 'Handi Cookers', term: 'Handi' },
  { label: 'Black Beauty Series', term: 'Black' },
  { label: 'Induction Base', term: 'Induction' },
];

const highlightMatch = (text: string, query: string) => {
  if (!query) return <span>{text}</span>;
  const escapedQuery = query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escapedQuery})`, 'gi'));
  return (
    <span>
      {parts.map((part, index) => 
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={index} className="bg-golden-ochre/25 text-heritage-red font-semibold px-0.5 rounded">
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </span>
  );
};

interface NavbarProps {
  currentPage: PageType;
  onNavigate: (page: PageType, targetProductId?: string) => void;
  cartItems: CartItem[];
  onToggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  cartItems,
  onToggleSidebar,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [mobileHighlightedIndex, setMobileHighlightedIndex] = useState(-1);
  
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { label: 'Home', page: 'home' as PageType },
    { 
      label: 'Pressure Cookers', 
      page: 'pressure-cookers' as PageType,
      subLinks: [
        { label: 'Trinity Series', page: 'tri-ply' as PageType },
        { label: 'Stello Series', page: 'stainless-steel' as PageType },
        { label: 'Black Beauty Series', page: 'black-beauty' as PageType },
        { label: 'Alex Series', page: 'heritage-aluminum' as PageType },
      ]
    },
    { 
      label: 'Cookware', 
      page: 'cookware' as PageType,
      subLinks: [
        { label: 'Trident Series', page: 'cookware-tri-ply' as PageType },
        { label: 'Tricomb Series', page: 'cookware-honeycomb' as PageType },
      ]
    },
    { label: 'About Us', page: 'about' as PageType },
    { label: 'Contact Us', page: 'contact' as PageType },
  ];

  const handleLinkClick = (page: PageType) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const handleBlur = () => {
    // Delay blur action to let mouse clicks on search dropdown complete
    setTimeout(() => setShowDropdown(false), 200);
  };

  const getPageForCategory = (category: string): PageType => {
    switch (category) {
      case 'Cookware':
      case 'Trident Series':
      case 'Tricomb Series':
        return 'cookware';
      case 'Stainless Steel':
      case 'Stello Series':
        return 'stainless-steel';
      case 'Tri-ply':
      case 'Trinity Series':
        return 'tri-ply';
      case 'Black Beauty':
      case 'Black Beauty Series':
        return 'black-beauty';
      case 'Heritage Aluminum':
      case 'Alex Series':
        return 'heritage-aluminum';
      default:
        return 'pressure-cookers';
    }
  };

  const CATEGORY_MAP = [
    { name: 'Stello Series', page: 'stainless-steel' },
    { name: 'Trinity Series', page: 'tri-ply' },
    { name: 'Black Beauty Series', page: 'black-beauty' },
    { name: 'Alex Series', page: 'heritage-aluminum' },
    { name: 'Trident Series', page: 'cookware-tri-ply' },
    { name: 'Tricomb Series', page: 'cookware-honeycomb' }
  ];

  const POPULAR_KEYWORDS = [
    'SAS Technology', 'Mirror Finish', 'ISI Certified', 'Inner Lid', 'Outer Lid',
    'Hard Anodized', 'Induction', 'Saucepan', 'Frypan', 'Kadhai', 'Traditional Handi'
  ];

  const handleProductClick = (product: Product) => {
    const targetPage = getPageForCategory(product.category);
    onNavigate(targetPage, product.id);
    setSearchQuery('');
    setShowDropdown(false);
    setMobileMenuOpen(false);
  };

  const handleCategoryClick = (catName: string, catPage: string) => {
    onNavigate(catPage as PageType);
    setSearchQuery('');
    setShowDropdown(false);
    setMobileMenuOpen(false);
  };

  const handleKeywordClick = (keyword: string) => {
    setSearchQuery(keyword);
    setShowDropdown(true);
  };

  const cleanQuery = searchQuery.trim().toLowerCase();

  // Match categories in real-time
  const matchedCategories = cleanQuery === ''
    ? []
    : CATEGORY_MAP.filter(cat => 
        cat.name.toLowerCase().includes(cleanQuery)
      );

  // Match keywords dynamically from POPULAR_KEYWORDS and product features
  const allKeywords = Array.from(new Set([
    ...POPULAR_KEYWORDS,
    ...PRODUCTS.flatMap(p => p.features || [])
  ]));

  const matchedKeywords = cleanQuery === ''
    ? []
    : allKeywords.filter(kw => 
        kw.toLowerCase().includes(cleanQuery) &&
        !CATEGORY_MAP.some(cat => cat.name.toLowerCase() === kw.toLowerCase())
      ).slice(0, 4);

  // Filter products globally by name, category, features, description, or SKU
  const filteredProducts = cleanQuery === ''
    ? []
    : PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(cleanQuery) ||
        p.category.toLowerCase().includes(cleanQuery) ||
        (p.sku && p.sku.toLowerCase().includes(cleanQuery)) ||
        (p.features && p.features.some(f => f.toLowerCase().includes(cleanQuery))) ||
        p.description.toLowerCase().includes(cleanQuery)
      ).slice(0, 6);

  // Flat list of dropdown items for unified keyboard arrow keys selection
  const dropdownItems = [
    ...matchedCategories.map(cat => ({ type: 'category' as const, data: cat, id: `cat-${cat.page}` })),
    ...matchedKeywords.map(kw => ({ type: 'keyword' as const, data: kw, id: `kw-${kw}` })),
    ...filteredProducts.map(prod => ({ type: 'product' as const, data: prod, id: `prod-${prod.id}` }))
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md w-full border-b border-platinum-gray/30">
      <nav className="flex justify-between items-center w-full px-6 md:px-16 py-3 max-w-[1440px] mx-auto">
        {/* Brand Logo & Desktop Links */}
        <div className="flex items-center gap-6 lg:gap-10">
          <button 
            onClick={() => onNavigate('home')} 
            className="flex items-center text-left focus:outline-none transition-transform duration-300 hover:scale-[1.02]"
          >
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBL5_fy5MxIVkX0PNgd6apWaHPG8zy43jLq_uTiJ8BvTzN8IIXJXseU2D3B7QAGUUT1K3054CZ3FQdQ0Huc6e8l59gpXMLrFiyukMudbN_bKbQePA8sma3RV81_8UmkSgv_koczbki9k31M0-fbSu737B4E_3ztqRKiN8BJDwZgMg1TZK5oZNr3iGskE9wSH-WHPNIQlPsVubNWOQDOaO1qBv-j9Xg9tguJvXZuEV7OgH9QCw18D38WTiWv0vphsf2UGpKuSYyM84HA"
              alt="Geetanjali Home Appliances Logo" 
              className="h-8 md:h-11 w-auto object-contain transition-transform duration-500 hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex gap-6 lg:gap-8 items-center">
            {navLinks.map((link) => {
              const hasSubLinks = !!link.subLinks;
              const isActive = currentPage === link.page || 
                (link.page === 'pressure-cookers' && 
                  ['stainless-steel', 'tri-ply', 'black-beauty', 'heritage-aluminum'].includes(currentPage)) ||
                (link.page === 'cookware' && 
                  ['cookware-tri-ply', 'cookware-honeycomb'].includes(currentPage));

              return (
                <div key={link.page} className="relative group py-2">
                  <button
                    onClick={() => handleLinkClick(link.page)}
                    className={`font-sans font-medium text-xs uppercase tracking-widest transition-colors duration-300 nav-link-underline flex items-center gap-1 ${
                      isActive
                        ? 'text-heritage-red active' 
                        : 'text-charcoal-matte hover:text-golden-ochre'
                    }`}
                  >
                    <span>{link.label}</span>
                    {hasSubLinks && (
                      <svg className="w-3 h-3 text-current transform transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {hasSubLinks && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50 pointer-events-none group-hover:pointer-events-auto">
                      <div className="bg-white border border-platinum-gray/30 rounded shadow-2xl py-2 w-48 text-left overflow-hidden">
                        {link.subLinks.map((subLink) => (
                          <button
                            key={subLink.page}
                            onClick={() => handleLinkClick(subLink.page)}
                            className={`w-full block px-4 py-2.5 text-left text-xs font-sans font-medium transition-all hover:bg-surface-container-low hover:text-heritage-red ${
                              currentPage === subLink.page
                                ? 'text-heritage-red bg-heritage-red/5 border-l-2 border-heritage-red pl-3'
                                : 'text-charcoal-matte'
                            }`}
                          >
                            {subLink.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Search Input, Actions & Mobile Menu */}
        <div className="flex items-center gap-4 md:gap-6 flex-shrink-0">

          {/* Desktop Search Input with Dropdown (Aligned in between buttons) */}
          <div className="hidden md:block relative w-48 lg:w-64 ml-4 mr-2">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowDropdown(true);
                  setHighlightedIndex(-1);
                }}
                onFocus={() => {
                  setShowDropdown(true);
                  setHighlightedIndex(-1);
                }}
                onBlur={handleBlur}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setHighlightedIndex(prev => (prev + 1) % (dropdownItems.length || 1));
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setHighlightedIndex(prev => (prev - 1 + (dropdownItems.length || 1)) % (dropdownItems.length || 1));
                  } else if (e.key === 'Enter') {
                    if (highlightedIndex >= 0 && highlightedIndex < dropdownItems.length) {
                      e.preventDefault();
                      const selection = dropdownItems[highlightedIndex];
                      if (selection.type === 'category') {
                        handleCategoryClick(selection.data.name, selection.data.page);
                      } else if (selection.type === 'keyword') {
                        handleKeywordClick(selection.data);
                      } else if (selection.type === 'product') {
                        handleProductClick(selection.data);
                      }
                    }
                  } else if (e.key === 'Escape') {
                    setShowDropdown(false);
                    setHighlightedIndex(-1);
                  }
                }}
                placeholder="Search products..."
                className="w-full bg-surface-container-low border border-platinum-gray/60 rounded px-3 py-1.5 pl-8 text-xs focus:border-heritage-red focus:outline-none transition-colors font-sans"
              />
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-charcoal-matte/45" size={14} />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setHighlightedIndex(-1);
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-charcoal-matte/45 hover:text-heritage-red"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Suggested Searches when input is empty */}
            {showDropdown && searchQuery.trim() === '' && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-md shadow-2xl border border-platinum-gray/30 p-4.5 z-50 animate-fade-in">
                <h5 className="font-sans text-[9px] uppercase tracking-widest text-charcoal-matte/50 mb-3 font-semibold">
                  Suggested Searches
                </h5>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_SEARCHES.map((item, idx) => (
                    <button
                      key={idx}
                      onMouseDown={() => {
                        setSearchQuery(item.term);
                        setShowDropdown(true);
                        setHighlightedIndex(-1);
                      }}
                      className="px-2.5 py-1.5 bg-surface-container-low hover:bg-heritage-red/10 hover:text-heritage-red rounded text-[10px] font-sans font-semibold text-charcoal-matte/80 transition-all focus:outline-none active:scale-95"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Desktop live dropdown search results */}
            {showDropdown && searchQuery.trim() !== '' && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-md shadow-2xl border border-platinum-gray/30 max-h-96 overflow-y-auto z-50 animate-fade-in divide-y divide-platinum-gray/10">
                {dropdownItems.length > 0 ? (
                  <div className="py-1">
                    {/* Render Category Matches */}
                    {matchedCategories.length > 0 && (
                      <div className="py-1.5">
                        <div className="px-3 py-1 text-[9px] font-bold text-charcoal-matte/50 uppercase tracking-wider flex items-center gap-1.5">
                          <FolderOpen size={11} className="text-heritage-red" />
                          <span>Matching Categories</span>
                        </div>
                        {matchedCategories.map((cat) => {
                          const itemIndex = dropdownItems.findIndex(item => item.id === `cat-${cat.page}`);
                          const isHighlighted = itemIndex === highlightedIndex;
                          return (
                            <button
                              key={`cat-${cat.page}`}
                              onMouseDown={() => handleCategoryClick(cat.name, cat.page)}
                              onMouseEnter={() => setHighlightedIndex(itemIndex)}
                              className={`w-full text-left px-4 py-2 transition-all duration-150 flex items-center justify-between text-xs font-medium text-charcoal-matte ${
                                isHighlighted ? 'bg-surface-container-low border-l-2 border-heritage-red' : 'hover:bg-surface-container-low/40'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-heritage-red" />
                                <span>{highlightMatch(cat.name, searchQuery)}</span>
                              </div>
                              <span className="text-[9px] text-tertiary uppercase tracking-wider font-semibold">View Products</span>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Render Keyword Matches */}
                    {matchedKeywords.length > 0 && (
                      <div className="py-1.5 border-t border-platinum-gray/10">
                        <div className="px-3 py-1 text-[9px] font-bold text-charcoal-matte/50 uppercase tracking-wider flex items-center gap-1.5">
                          <Tag size={11} className="text-heritage-red" />
                          <span>Suggested Keywords</span>
                        </div>
                        <div className="px-3 py-1.5 flex flex-wrap gap-1.5">
                          {matchedKeywords.map((kw) => {
                            const itemIndex = dropdownItems.findIndex(item => item.id === `kw-${kw}`);
                            const isHighlighted = itemIndex === highlightedIndex;
                            return (
                              <button
                                key={`kw-${kw}`}
                                onMouseDown={() => handleKeywordClick(kw)}
                                onMouseEnter={() => setHighlightedIndex(itemIndex)}
                                className={`px-2.5 py-1 rounded text-[10px] font-sans font-semibold transition-all flex items-center gap-1 ${
                                  isHighlighted 
                                    ? 'bg-heritage-red/10 text-heritage-red ring-1 ring-heritage-red/30' 
                                    : 'bg-surface-container-low hover:bg-heritage-red/5 text-charcoal-matte/80'
                                }`}
                              >
                                <Tag size={8} />
                                <span>{highlightMatch(kw, searchQuery)}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Render Product Matches */}
                    {filteredProducts.length > 0 && (
                      <div className="py-1.5 border-t border-platinum-gray/10">
                        <div className="px-3 py-1 text-[9px] font-bold text-charcoal-matte/50 uppercase tracking-wider flex items-center gap-1.5">
                          <Search size={11} className="text-heritage-red" />
                          <span>Matching Products</span>
                        </div>
                        {filteredProducts.map((prod) => {
                          const itemIndex = dropdownItems.findIndex(item => item.id === `prod-${prod.id}`);
                          const isHighlighted = itemIndex === highlightedIndex;
                          return (
                            <button
                              key={`prod-${prod.id}`}
                              onMouseDown={() => handleProductClick(prod)}
                              onMouseEnter={() => setHighlightedIndex(itemIndex)}
                              className={`w-full text-left p-3 transition-all duration-150 flex items-center gap-3 group focus:outline-none ${
                                isHighlighted ? 'bg-surface-container-low border-l-2 border-heritage-red' : 'hover:bg-surface-container-low/50'
                              }`}
                            >
                              <div className="w-10 h-10 bg-white rounded p-1 flex-shrink-0 flex items-center justify-center border border-platinum-gray/15">
                                {prod.image ? (
                                  <img 
                                    src={prod.image} 
                                    alt={prod.name} 
                                    className="max-w-full max-h-full object-contain" 
                                    referrerPolicy="no-referrer" 
                                    style={{
                                      mixBlendMode: (prod.image?.includes('googleusercontent.com') || prod.image?.includes('hc-frypan')) ? 'multiply' : undefined
                                    }}
                                  />
                                ) : (
                                  <span className="font-mono text-[8px] text-charcoal-matte/40 font-bold">O/O</span>
                                )}
                              </div>
                              <div className="min-w-0 flex-grow">
                                <h4 className="font-label-md text-xs font-bold text-charcoal-matte group-hover:text-heritage-red transition-colors truncate">
                                  {highlightMatch(prod.name, searchQuery)}
                                </h4>
                                <span className="font-mono text-[9px] text-tertiary block truncate">
                                  {highlightMatch(prod.category, searchQuery)} {prod.sku && <>• SKU: {highlightMatch(prod.sku, searchQuery)}</>}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4 text-center text-xs text-charcoal-matte/50 italic">
                    No matching results found.
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            {/* Enquiry List Button (Icon only) */}
            <button
              onClick={() => onNavigate('enquiry-list')}
              aria-label="View Enquiry List"
              className={`min-w-[44px] min-h-[44px] flex items-center justify-center p-2 transition-all duration-300 relative focus:outline-none hover:-translate-y-0.5 active:scale-95 ${
                currentPage === 'enquiry-list'
                  ? 'text-golden-ochre scale-110'
                  : 'text-heritage-red hover:text-golden-ochre'
              }`}
            >
              <ClipboardList size={22} />
            </button>

            {/* Cart Button */}
            <button
              onClick={onToggleSidebar}
              aria-label="Toggle Enquiry Sidebar"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-heritage-red hover:text-golden-ochre transition-all duration-300 relative focus:outline-none hover:-translate-y-0.5 active:scale-95"
            >
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-heritage-red text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold animate-bounce shadow-md">
                  {totalItems}
                </span>
              )}
            </button>


            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-heritage-red hover:text-golden-ochre transition-colors md:hidden focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-platinum-gray/30 px-6 py-6 space-y-4 shadow-xl transition-all duration-300 ease-in-out">
          {/* Mobile Search Bar inside overlay */}
          <div className="relative w-full">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowDropdown(true);
                  setMobileHighlightedIndex(-1);
                }}
                onFocus={() => {
                  setShowDropdown(true);
                  setMobileHighlightedIndex(-1);
                }}
                onBlur={handleBlur}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setMobileHighlightedIndex(prev => (prev + 1) % (dropdownItems.length || 1));
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setMobileHighlightedIndex(prev => (prev - 1 + (dropdownItems.length || 1)) % (dropdownItems.length || 1));
                  } else if (e.key === 'Enter') {
                    if (mobileHighlightedIndex >= 0 && mobileHighlightedIndex < dropdownItems.length) {
                      e.preventDefault();
                      const selection = dropdownItems[mobileHighlightedIndex];
                      if (selection.type === 'category') {
                        handleCategoryClick(selection.data.name, selection.data.page);
                      } else if (selection.type === 'keyword') {
                        handleKeywordClick(selection.data);
                      } else if (selection.type === 'product') {
                        handleProductClick(selection.data);
                      }
                    }
                  } else if (e.key === 'Escape') {
                    setShowDropdown(false);
                    setMobileHighlightedIndex(-1);
                  }
                }}
                placeholder="Search products..."
                className="w-full bg-surface-container-low border border-platinum-gray/60 rounded px-3 py-2 pl-9 text-xs focus:border-heritage-red focus:outline-none transition-colors font-sans"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-matte/45" size={15} />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setMobileHighlightedIndex(-1);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-matte/45 hover:text-heritage-red"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Mobile Suggested Searches */}
            {showDropdown && searchQuery.trim() === '' && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-xl border border-platinum-gray/35 p-4 z-50 animate-fade-in">
                <h5 className="font-sans text-[9px] uppercase tracking-widest text-charcoal-matte/50 mb-2.5 font-semibold">
                  Suggested Searches
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTED_SEARCHES.map((item, idx) => (
                    <button
                      key={idx}
                      onMouseDown={() => {
                        setSearchQuery(item.term);
                        setShowDropdown(true);
                        setMobileHighlightedIndex(-1);
                      }}
                      className="px-2.5 py-1 bg-surface-container-low hover:bg-heritage-red/10 hover:text-heritage-red rounded text-[10px] font-sans font-semibold text-charcoal-matte/80 transition-all focus:outline-none"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Mobile dropdown search results */}
            {showDropdown && searchQuery.trim() !== '' && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-xl border border-platinum-gray/35 max-h-80 overflow-y-auto z-50 divide-y divide-platinum-gray/10">
                {dropdownItems.length > 0 ? (
                  <div className="py-1">
                    {/* Render Category Matches */}
                    {matchedCategories.length > 0 && (
                      <div className="py-1.5">
                        <div className="px-3 py-1 text-[9px] font-bold text-charcoal-matte/50 uppercase tracking-wider flex items-center gap-1.5">
                          <FolderOpen size={11} className="text-heritage-red" />
                          <span>Matching Categories</span>
                        </div>
                        {matchedCategories.map((cat) => {
                          const itemIndex = dropdownItems.findIndex(item => item.id === `cat-${cat.page}`);
                          const isHighlighted = itemIndex === mobileHighlightedIndex;
                          return (
                            <button
                              key={`cat-${cat.page}`}
                              onMouseDown={() => handleCategoryClick(cat.name, cat.page)}
                              onMouseEnter={() => setMobileHighlightedIndex(itemIndex)}
                              className={`w-full text-left px-4 py-2 transition-all duration-150 flex items-center justify-between text-xs font-medium text-charcoal-matte ${
                                isHighlighted ? 'bg-surface-container-low border-l-2 border-heritage-red' : 'hover:bg-surface-container-low/40'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-heritage-red" />
                                <span>{highlightMatch(cat.name, searchQuery)}</span>
                              </div>
                              <span className="text-[9px] text-tertiary uppercase tracking-wider font-semibold">View</span>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Render Keyword Matches */}
                    {matchedKeywords.length > 0 && (
                      <div className="py-1.5 border-t border-platinum-gray/10">
                        <div className="px-3 py-1 text-[9px] font-bold text-charcoal-matte/50 uppercase tracking-wider flex items-center gap-1.5">
                          <Tag size={11} className="text-heritage-red" />
                          <span>Suggested Keywords</span>
                        </div>
                        <div className="px-3 py-1.5 flex flex-wrap gap-1.5">
                          {matchedKeywords.map((kw) => {
                            const itemIndex = dropdownItems.findIndex(item => item.id === `kw-${kw}`);
                            const isHighlighted = itemIndex === mobileHighlightedIndex;
                            return (
                              <button
                                key={`kw-${kw}`}
                                onMouseDown={() => handleKeywordClick(kw)}
                                onMouseEnter={() => setMobileHighlightedIndex(itemIndex)}
                                className={`px-2.5 py-1 rounded text-[10px] font-sans font-semibold transition-all flex items-center gap-1 ${
                                  isHighlighted 
                                    ? 'bg-heritage-red/10 text-heritage-red ring-1 ring-heritage-red/30' 
                                    : 'bg-surface-container-low hover:bg-heritage-red/5 text-charcoal-matte/80'
                                }`}
                              >
                                <Tag size={8} />
                                <span>{highlightMatch(kw, searchQuery)}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Render Product Matches */}
                    {filteredProducts.length > 0 && (
                      <div className="py-1.5 border-t border-platinum-gray/10">
                        <div className="px-3 py-1 text-[9px] font-bold text-charcoal-matte/50 uppercase tracking-wider flex items-center gap-1.5">
                          <Search size={11} className="text-heritage-red" />
                          <span>Matching Products</span>
                        </div>
                        {filteredProducts.map((prod) => {
                          const itemIndex = dropdownItems.findIndex(item => item.id === `prod-${prod.id}`);
                          const isHighlighted = itemIndex === mobileHighlightedIndex;
                          return (
                            <button
                              key={`prod-${prod.id}`}
                              onMouseDown={() => handleProductClick(prod)}
                              onMouseEnter={() => setMobileHighlightedIndex(itemIndex)}
                              className={`w-full text-left p-3 transition-colors flex items-center gap-3 group focus:outline-none ${
                                isHighlighted ? 'bg-surface-container-low border-l-2 border-heritage-red' : 'hover:bg-surface-container-low/50'
                              }`}
                            >
                              <div className="w-10 h-10 bg-white rounded p-1 flex-shrink-0 flex items-center justify-center border border-platinum-gray/15">
                                {prod.image ? (
                                  <img 
                                    src={prod.image} 
                                    alt={prod.name} 
                                    className="max-w-full max-h-full object-contain" 
                                    referrerPolicy="no-referrer" 
                                    style={{
                                      mixBlendMode: (prod.image?.includes('googleusercontent.com') || prod.image?.includes('hc-frypan')) ? 'multiply' : undefined
                                    }}
                                  />
                                ) : (
                                  <span className="font-mono text-[8px] text-charcoal-matte/40 font-bold">O/O</span>
                                )}
                              </div>
                              <div className="min-w-0 flex-grow">
                                <h4 className="font-label-md text-xs font-bold text-charcoal-matte group-hover:text-heritage-red transition-colors truncate">
                                  {highlightMatch(prod.name, searchQuery)}
                                </h4>
                                <span className="font-mono text-[9px] text-tertiary block truncate">
                                  {highlightMatch(prod.category, searchQuery)} {prod.sku && <>• SKU: {highlightMatch(prod.sku, searchQuery)}</>}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-3 text-center text-xs text-charcoal-matte/50 italic">
                    No matching results found.
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const hasSubLinks = !!link.subLinks;
              const isActive = currentPage === link.page || 
                (link.page === 'pressure-cookers' && 
                  ['stainless-steel', 'tri-ply', 'black-beauty', 'heritage-aluminum'].includes(currentPage)) ||
                (link.page === 'cookware' && 
                  ['cookware-tri-ply', 'cookware-honeycomb'].includes(currentPage));

              return (
                <div key={link.page} className="flex flex-col">
                  <button
                    onClick={() => handleLinkClick(link.page)}
                    className={`text-left py-2 font-sans font-medium text-xs uppercase tracking-wider flex justify-between items-center ${
                      isActive
                        ? 'text-heritage-red font-semibold'
                        : 'text-charcoal-matte'
                    }`}
                  >
                    <span>{link.label}</span>
                  </button>
                  {hasSubLinks && (
                    <div className="pl-4 border-l border-platinum-gray/30 flex flex-col gap-2.5 mt-1 mb-2">
                      {link.subLinks.map((subLink) => (
                        <button
                          key={subLink.page}
                          onClick={() => handleLinkClick(subLink.page)}
                          className={`text-left text-xs font-sans font-semibold py-1 ${
                            currentPage === subLink.page
                              ? 'text-heritage-red font-bold'
                              : 'text-charcoal-matte/75 hover:text-heritage-red'
                          }`}
                        >
                          {subLink.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <button
              onClick={() => handleLinkClick('enquiry-list')}
              className="text-left py-2 font-sans font-medium text-xs uppercase tracking-wider text-heritage-red border-t border-platinum-gray/30 pt-4 flex items-center gap-2"
            >
              <ClipboardList size={16} />
              View Enquiry Selection ({totalItems})
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
