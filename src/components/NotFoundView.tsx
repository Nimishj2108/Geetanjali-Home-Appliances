import React from 'react';
import { PageType } from '../types';
import { Home, Flame, Utensils, PhoneCall, AlertCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface NotFoundViewProps {
  onNavigate: (page: PageType) => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ onNavigate }) => {
  return (
    <div className="w-full bg-background min-h-[70vh] flex flex-col items-center justify-center py-16 px-6 text-center text-charcoal-matte">
      <Helmet>
        <title>404 - Page Not Found | Geetanjali Home Appliances</title>
        <meta name="description" content="The requested page could not be found. Explore Geetanjali's pressure cookers and triply cookware collections." />
      </Helmet>

      <div className="max-w-xl mx-auto space-y-6">
        <div className="w-16 h-16 bg-heritage-red/10 text-heritage-red rounded-full flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>

        <span className="px-3 py-1 bg-surface-container-high font-mono text-xs font-bold text-charcoal-matte/60 uppercase tracking-widest rounded-full">
          404 Error
        </span>

        <h1 className="font-display font-black text-3xl md:text-4xl uppercase tracking-tight text-charcoal-matte">
          Recipe Not Found
        </h1>

        <p className="text-xs md:text-sm text-charcoal-matte/70 font-sans leading-relaxed">
          The page or product link you clicked may have moved or no longer exists. Let us guide you back to our core kitchen collections.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 max-w-md mx-auto">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center justify-center gap-2 bg-charcoal-matte text-white hover:bg-heritage-red text-xs font-bold uppercase tracking-wider py-3.5 px-5 rounded-xl transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Go to Home</span>
          </button>

          <button
            onClick={() => onNavigate('pressure-cookers')}
            className="flex items-center justify-center gap-2 bg-white text-charcoal-matte border border-platinum-gray hover:border-heritage-red hover:text-heritage-red text-xs font-bold uppercase tracking-wider py-3.5 px-5 rounded-xl transition-all cursor-pointer shadow-xs"
          >
            <Flame className="w-4 h-4 text-heritage-red" />
            <span>Pressure Cookers</span>
          </button>

          <button
            onClick={() => onNavigate('cookware')}
            className="flex items-center justify-center gap-2 bg-white text-charcoal-matte border border-platinum-gray hover:border-heritage-red hover:text-heritage-red text-xs font-bold uppercase tracking-wider py-3.5 px-5 rounded-xl transition-all cursor-pointer shadow-xs"
          >
            <Utensils className="w-4 h-4 text-heritage-red" />
            <span>Cookware Series</span>
          </button>

          <button
            onClick={() => onNavigate('contact')}
            className="flex items-center justify-center gap-2 bg-white text-charcoal-matte border border-platinum-gray hover:border-heritage-red hover:text-heritage-red text-xs font-bold uppercase tracking-wider py-3.5 px-5 rounded-xl transition-all cursor-pointer shadow-xs"
          >
            <PhoneCall className="w-4 h-4 text-heritage-red" />
            <span>Contact Support</span>
          </button>
        </div>
      </div>
    </div>
  );
};
