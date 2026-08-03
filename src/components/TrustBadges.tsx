import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  MapPin, 
  Truck, 
  Shield, 
  Globe 
} from 'lucide-react';

interface TrustBadgesProps {
  variant?: 'full' | 'compact';
  className?: string;
}

export const BADGES_DATA = [
  {
    id: 'isi-certified',
    icon: ShieldCheck,
    title: 'ISI Certified',
    subtitle: 'Quality assured by BIS standards',
    seoAlt: 'ISI Certified Pressure Cooker Manufacturer',
    colorClass: 'text-emerald-600 bg-emerald-50 border-emerald-200'
  },
  {
    id: 'manufacturing-experience',
    icon: Award,
    title: '30+ Years Experience',
    subtitle: 'Cookware manufacturing legacy',
    seoAlt: '30 Plus Years Cookware Manufacturing Experience',
    colorClass: 'text-golden-ochre bg-amber-50 border-amber-200'
  },
  {
    id: 'made-in-india',
    icon: MapPin,
    title: '100% Made in India',
    subtitle: 'Crafted in Delhi NCR',
    seoAlt: '100 Percent Made in India Cookware Manufacturer',
    colorClass: 'text-heritage-red bg-red-50 border-red-200'
  },
  {
    id: 'pan-india-delivery',
    icon: Truck,
    title: 'Pan India Delivery',
    subtitle: 'Shipping to all pincodes',
    seoAlt: 'Pan India Pressure Cooker and Cookware Delivery',
    colorClass: 'text-blue-600 bg-blue-50 border-blue-200'
  },
  {
    id: 'maximum-warranty',
    icon: Shield,
    title: 'Maximum Warranty',
    subtitle: 'Comprehensive factory coverage',
    seoAlt: 'Maximum Factory Warranty Coverage',
    colorClass: 'text-indigo-600 bg-indigo-50 border-indigo-200'
  },
  {
    id: 'export-quality',
    icon: Globe,
    title: 'Export Quality',
    subtitle: 'International standards',
    seoAlt: 'Export Quality Pressure Cooker and Triply Cookware',
    colorClass: 'text-teal-600 bg-teal-50 border-teal-200'
  }
];

export const TrustBadges: React.FC<TrustBadgesProps> = ({ 
  variant = 'full', 
  className = '' 
}) => {
  if (variant === 'compact') {
    return (
      <div className={`w-full bg-surface-container-low/70 border border-platinum-gray/30 rounded-xl p-3 sm:p-4 my-4 ${className}`}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {BADGES_DATA.map((badge) => {
            const Icon = badge.icon;
            return (
              <div 
                key={badge.id}
                className="flex items-center gap-2.5 p-2 rounded-lg bg-white border border-platinum-gray/20 hover:border-heritage-red/40 transition-all duration-200 shadow-xs"
                title={badge.seoAlt}
              >
                <div className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 border ${badge.colorClass}`}>
                  <Icon size={16} aria-label={badge.seoAlt} />
                </div>
                <div className="text-left min-w-0">
                  <h4 className="font-sans font-bold text-[11px] text-charcoal-matte truncate leading-tight">
                    {badge.title}
                  </h4>
                  <p className="text-[9px] text-tertiary truncate leading-tight font-karla">
                    {badge.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <section className={`w-full py-10 px-6 md:px-16 bg-surface-container-low border-b border-platinum-gray/30 ${className}`}>
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {BADGES_DATA.map((badge) => {
            const Icon = badge.icon;
            return (
              <div 
                key={badge.id}
                className="flex flex-col items-center text-center p-4 rounded-xl bg-white border border-platinum-gray/30 hover:border-heritage-red/50 hover:shadow-md hover:-translate-y-1 transition-all duration-200 group cursor-default"
                title={badge.seoAlt}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 border shadow-xs transition-transform group-hover:scale-105 ${badge.colorClass}`}>
                  <Icon size={24} className="stroke-[1.75]" aria-label={badge.seoAlt} />
                </div>
                <h3 className="font-sans font-bold text-xs md:text-sm text-charcoal-matte mb-1 leading-snug">
                  {badge.title}
                </h3>
                <p className="text-[10px] md:text-xs text-tertiary leading-normal font-karla">
                  {badge.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
