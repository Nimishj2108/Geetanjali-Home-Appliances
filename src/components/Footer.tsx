import React, { useState } from 'react';
import { PageType } from '../types';
import { Mail, Globe, Instagram, Phone, MapPin, Download, X, BookOpen, FileCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: any, targetProductId?: string) => void;
  onClearCart: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onClearCart }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-surface-container-highest dark:bg-charcoal-matte mt-auto border-t border-platinum-gray/50 font-karla relative">
      
      {/* Main Footer Layout */}
      <div className="w-full py-16 px-6 md:px-12 lg:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16 max-w-[1440px] mx-auto items-start text-left">
        
        {/* Column 1: Brand details */}
        <div className="flex flex-col gap-6">
          <div className="space-y-4">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBL5_fy5MxIVkX0PNgd6apWaHPG8zy43jLq_uTiJ8BvTzN8IIXJXseU2D3B7QAGUUT1K3054CZ3FQdQ0Huc6e8l59gpXMLrFiyukMudbN_bKbQePA8sma3RV81_8UmkSgv_koczbki9k31M0-fbSu737B4E_3ztqRKiN8BJDwZgMg1TZK5oZNr3iGskE9wSH-WHPNIQlPsVubNWOQDOaO1qBv-j9Xg9tguJvXZuEV7OgH9QCw18D38WTiWv0vphsf2UGpKuSYyM84HA"
              alt="Geetanjali Home Appliances Logo" 
              className="h-10 md:h-12 w-auto object-contain transition-transform duration-500 hover:scale-105 origin-left"
              referrerPolicy="no-referrer"
            />
            <p className="font-karla text-xs text-charcoal-matte/80 dark:text-platinum-gray/80 leading-relaxed font-normal">
              Curating the essentials of the modern heritage home since 1997. Built for longevity. Designed for life.
            </p>
          </div>

          {/* Contact & Social lines */}
          <div className="space-y-3 text-xs text-charcoal-matte/75 dark:text-platinum-gray/75">
            <a href="mailto:geetanjalihomeappliances.india@gmail.com" className="flex items-center gap-2 hover:text-heritage-red transition-colors w-fit font-normal">
              <Mail size={13} className="text-secondary shrink-0" />
              <span className="break-all font-karla text-[11px] font-normal">geetanjalihomeappliances.india@gmail.com</span>
            </a>
            <div className="flex flex-col gap-1 font-karla text-[11px] font-normal">
              <a href="tel:+919205293094" className="flex items-center gap-2 hover:text-heritage-red transition-colors w-fit font-normal">
                <Phone size={13} className="text-secondary shrink-0" />
                <span>+91 9205293094</span>
              </a>
              <a href="tel:+918287634365" className="flex items-center gap-2 hover:text-heritage-red transition-colors w-fit pl-5 font-normal">
                <span>+91 8287634365</span>
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <a 
              href="#" 
              aria-label="Website" 
              className="text-secondary hover:text-heritage-red dark:text-platinum-gray/70 dark:hover:text-white transition-all focus:outline-none flex items-center justify-center h-8 w-8 rounded-full bg-charcoal-matte/5 hover:bg-charcoal-matte/10 dark:bg-white/5 dark:hover:bg-white/10"
            >
              <Globe size={16} />
            </a>
            <a 
              href="https://www.instagram.com/geetanjalihomeappliancesindia" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram" 
              className="text-secondary hover:text-heritage-red dark:text-platinum-gray/70 dark:hover:text-white transition-all focus:outline-none flex items-center justify-center h-8 w-8 rounded-full bg-charcoal-matte/5 hover:bg-charcoal-matte/10 dark:bg-white/5 dark:hover:bg-white/10"
            >
              <Instagram size={16} />
            </a>
            <a 
              href="https://www.facebook.com/geetanjalihomeappliancesindia" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook" 
              className="text-secondary hover:text-heritage-red dark:text-platinum-gray/70 dark:hover:text-white transition-all focus:outline-none flex items-center justify-center h-8 w-8 rounded-full bg-charcoal-matte/5 hover:bg-charcoal-matte/10 dark:bg-white/5 dark:hover:bg-white/10"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
              </svg>
            </a>
            <a 
              href="https://x.com/GeetanjaliHAI" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (formerly Twitter)" 
              className="text-secondary hover:text-heritage-red dark:text-platinum-gray/70 dark:hover:text-white transition-all focus:outline-none flex items-center justify-center h-8 w-8 rounded-full bg-charcoal-matte/5 hover:bg-charcoal-matte/10 dark:bg-white/5 dark:hover:bg-white/10"
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a 
              href="https://www.linkedin.com/in/geetanjali-home-appliances-480011426" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn" 
              className="text-secondary hover:text-heritage-red dark:text-platinum-gray/70 dark:hover:text-white transition-all focus:outline-none flex items-center justify-center h-8 w-8 rounded-full bg-charcoal-matte/5 hover:bg-charcoal-matte/10 dark:bg-white/5 dark:hover:bg-white/10"
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a 
              href="https://www.youtube.com/@GeetanjaliHomeAppliances" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube" 
              className="text-secondary hover:text-heritage-red dark:text-platinum-gray/70 dark:hover:text-white transition-all focus:outline-none flex items-center justify-center h-8 w-8 rounded-full bg-charcoal-matte/5 hover:bg-charcoal-matte/10 dark:bg-white/5 dark:hover:bg-white/10"
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.507 9.388.507 9.388.507s7.517 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a 
              href="https://wa.me/919205293094" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp" 
              className="text-secondary hover:text-heritage-red dark:text-platinum-gray/70 dark:hover:text-white transition-all focus:outline-none flex items-center justify-center h-8 w-8 rounded-full bg-charcoal-matte/5 hover:bg-charcoal-matte/10 dark:bg-white/5 dark:hover:bg-white/10"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.004 2c-5.514 0-10 4.486-10 10 0 1.914.542 3.697 1.472 5.215l-1.472 5.385 5.514-1.448c1.442.822 3.102 1.296 4.869 1.296 5.514 0 10-4.486 10-10s-4.486-10-10-10zm.013 18c-1.696 0-3.267-.481-4.606-1.31l-.33-.205-3.076.808.823-3.008-.225-.357c-.901-1.433-1.423-3.134-1.423-4.928 0-4.821 3.921-8.742 8.742-8.742s8.742 3.921 8.742 8.742-3.921 8.742-8.742 8.742zm4.186-6.104c-.23-.115-1.357-.669-1.567-.746-.21-.077-.363-.115-.517.115-.154.23-.594.746-.728.899-.134.153-.268.172-.498.057-.23-.115-.972-.358-1.851-1.142-.684-.61-1.146-1.364-1.28-1.595-.134-.23-.014-.354.101-.469.103-.103.23-.268.345-.402.115-.134.153-.23.23-.383.077-.153.038-.287-.019-.402-.057-.115-.517-1.245-.708-1.705-.186-.448-.376-.387-.517-.394-.134-.007-.287-.007-.44-.007-.153 0-.402.057-.613.287-.21.23-.804.785-.804 1.916 0 1.13.823 2.222.938 2.375.115.153 1.62 2.473 3.924 3.465.548.236.976.377 1.31.482.55.174 1.05.15 1.446.091.44-.067 1.357-.555 1.548-1.091.191-.536.191-.995.134-1.091-.057-.096-.21-.153-.44-.268z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2: Popular Categories */}
        <div className="flex flex-col animate-fade-in">
          <h4 className="font-karla uppercase tracking-wider mb-6 text-charcoal-matte dark:text-white font-medium text-xs min-h-[32px] flex items-start pt-1">
            Popular Categories
          </h4>
          <ul className="space-y-3 font-karla text-[11px] text-charcoal-matte/70 dark:text-platinum-gray/70 font-normal">
            <li>
              <button onClick={() => onNavigate('tri-ply')} className="hover:text-primary hover:font-medium transition-all text-left block w-full cursor-pointer">
                Trinity Series
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('stainless-steel')} className="hover:text-primary hover:font-medium transition-all text-left block w-full cursor-pointer">
                Stello Series
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('black-beauty')} className="hover:text-primary hover:font-medium transition-all text-left block w-full cursor-pointer">
                Black Beauty Series
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('heritage-aluminum')} className="hover:text-primary hover:font-medium transition-all text-left block w-full cursor-pointer">
                Alex Series
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('cookware-tri-ply')} className="hover:text-primary hover:font-medium transition-all text-left block w-full cursor-pointer">
                Trident Series
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('cookware-honeycomb')} className="hover:text-primary hover:font-medium transition-all text-left block w-full cursor-pointer">
                Tricomb Series
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Important Links (Actions) */}
        <div className="flex flex-col">
          <h4 className="font-karla uppercase tracking-wider mb-6 text-charcoal-matte dark:text-white font-medium text-xs min-h-[32px] flex items-start pt-1">
            Important Links
          </h4>
          <ul className="space-y-3 font-karla text-[11px] text-charcoal-matte/70 dark:text-platinum-gray/70 font-normal">
            <li>
              <button onClick={() => onNavigate('dealer')} className="hover:text-heritage-red hover:font-bold text-heritage-red transition-all text-left block w-full cursor-pointer">
                ★ Become a Dealer / Distributor
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('warranty')} className="hover:text-primary hover:font-medium transition-all text-left block w-full cursor-pointer">
                Warranty &amp; Catalog PDF
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('pan-india')} className="hover:text-primary hover:font-medium transition-all text-left block w-full cursor-pointer">
                We Deliver Pan-India
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('faqs')} className="hover:text-primary hover:font-medium transition-all text-left block w-full cursor-pointer">
                FAQs &amp; Support
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('about')} className="hover:text-primary hover:font-medium transition-all text-left block w-full cursor-pointer">
                About Us
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('manuals')} 
                className="hover:text-heritage-red hover:font-medium transition-all text-left block w-full flex items-center gap-1.5 text-charcoal-matte/80 dark:text-platinum-gray/80 font-normal cursor-pointer"
              >
                <span>Instructions Manual</span>
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('blog')} className="hover:text-primary hover:font-medium transition-all text-left block w-full cursor-pointer">
                Blog Journal
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Policies */}
        <div className="flex flex-col">
          <h4 className="font-karla uppercase tracking-wider mb-6 text-charcoal-matte dark:text-white font-medium text-xs min-h-[32px] flex items-start pt-1">
            Policies
          </h4>
          <ul className="space-y-3 font-karla text-[11px] text-charcoal-matte/70 dark:text-platinum-gray/70 font-normal">
            <li>
              <button onClick={() => onNavigate('policies', 'refund')} className="hover:text-primary hover:font-medium transition-all text-left block w-full cursor-pointer">
                Refund & Return Policy
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('policies', 'shipping')} className="hover:text-primary hover:font-medium transition-all text-left block w-full cursor-pointer">
                Shipping & Delivery Policy
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('policies', 'terms')} className="hover:text-primary hover:font-medium transition-all text-left block w-full cursor-pointer">
                Terms & Conditions
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('policies', 'privacy')} className="hover:text-primary hover:font-medium transition-all text-left block w-full cursor-pointer">
                Privacy Policy
              </button>
            </li>
          </ul>
        </div>

        {/* Column 5: Marketed & Manufactured By (Right Corner) */}
        <div className="flex flex-col justify-start">
          <h4 className="font-karla uppercase tracking-wider mb-6 text-charcoal-matte dark:text-white font-medium text-xs min-h-[32px] flex items-start pt-1">
            Marketed & Manufactured By
          </h4>
          <p className="font-karla text-[11px] font-medium text-charcoal-matte dark:text-white leading-relaxed">
            Harsh Home Appliances
          </p>
          <a 
            href="https://maps.app.goo.gl/grN486gj6NaSXp7r8"
            target="_blank"
            rel="noopener noreferrer"
            className="font-karla text-[11px] text-charcoal-matte/70 dark:text-platinum-gray/70 hover:text-heritage-red dark:hover:text-heritage-red transition-colors leading-relaxed mt-1 flex items-start gap-1.5 font-normal group"
            title="View Office Location on Google Maps"
          >
            <MapPin size={12} className="text-secondary group-hover:text-heritage-red mt-0.5 shrink-0 transition-colors" />
            <span>K-11 Sector-2 Bawana Industrial Area, Delhi-110039, India</span>
          </a>
          
          <div className="mt-5 flex items-center gap-3 border-t border-platinum-gray/30 pt-4.5">
            <img 
              src="https://lh3.googleusercontent.com/d/1SF_0ebQYvjkd1zTlZg8SviXQMe38ja4L"
              alt="Make in India"
              className="h-10 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
            <span className="font-karla text-[9px] uppercase tracking-wider text-charcoal-matte/50 dark:text-platinum-gray/50 leading-tight font-normal">
              Proudly Made<br />In India
            </span>
          </div>
        </div>

      </div>

      {/* Sub Footer Credits */}
      <div className="bg-surface-container-high/80 py-6 px-6 md:px-16 border-t border-platinum-gray/30 font-karla font-normal">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-charcoal-matte/60 dark:text-platinum-gray/60">
          <p>© {currentYear} Geetanjali Home Appliances. Since 1997. All rights reserved.</p>
          <div className="flex gap-6 font-medium">
            <span>Harsh Home Appliances</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
