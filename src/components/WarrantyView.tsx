import React from 'react';
import { PageType } from '../types';
import { ShieldCheck, Download, FileText, CheckCircle2, Wrench, HelpCircle, Phone, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface WarrantyViewProps {
  onNavigate?: (page: PageType) => void;
}

export const WarrantyView: React.FC<WarrantyViewProps> = ({ onNavigate }) => {
  return (
    <div className="w-full bg-background min-h-screen py-12 md:py-16 px-4 md:px-12 lg:px-16 text-charcoal-matte">
      <Helmet>
        <title>Warranty Guarantee & Catalog Download | Geetanjali Home Appliances</title>
        <meta 
          name="description" 
          content="Official warranty terms, user care guidelines, and product catalog download for Geetanjali pressure cookers and triply cookware manufactured in Delhi NCR." 
        />
        <meta 
          name="keywords" 
          content="Geetanjali warranty, pressure cooker guarantee, ISI certified cooker care, triply cookware maintenance, download catalog PDF" 
        />
        <link rel="canonical" href="https://geetanjalihomeappliances.com/warranty" />
      </Helmet>

      <div className="max-w-[1280px] mx-auto space-y-12">
        {/* Hero Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="px-3.5 py-1.5 bg-heritage-red/10 text-heritage-red font-mono text-xs font-bold uppercase tracking-widest rounded-full inline-block border border-heritage-red/20">
            ISI Certified Reliability
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-charcoal-matte uppercase tracking-tight">
            Warranty & Product Catalog
          </h1>
          <p className="text-sm md:text-base text-charcoal-matte/70 font-sans leading-relaxed">
            At <strong className="text-charcoal-matte">Geetanjali Home Appliances</strong> (manufactured by Harsh Home Appliances), every pressure cooker and triply cookware vessel undergoes rigorous hydrostatic and metallurgical pressure testing to guarantee maximum safety and a long lifespan.
          </p>
        </div>

        {/* Download PDF Catalog Action Card */}
        <div className="bg-gradient-to-r from-charcoal-matte to-surface-container-highest text-white p-8 md:p-10 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
          <div className="space-y-2 text-left max-w-2xl">
            <span className="text-heritage-red font-mono text-xs font-bold uppercase tracking-widest">
              Official Master Catalog
            </span>
            <h2 className="font-display font-black text-2xl md:text-3xl uppercase tracking-tight text-white">
              Download Geetanjali Product Catalog (PDF)
            </h2>
            <p className="text-xs md:text-sm text-white/80 leading-relaxed font-sans">
              Explore complete product specifications, technical line drawings, size variants (1.5L to 22L), and metallurgical details across Trinity, Stello, Black Beauty, Alex, Trident, and Tricomb series.
            </p>
          </div>

          <a
            href="https://wa.me/919205293094?text=Hello%20Geetanjali%20Team%2C%20please%20send%20me%20the%20latest%20product%20catalog%20PDF."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-heritage-red hover:bg-white hover:text-charcoal-matte text-white font-black text-xs uppercase tracking-wider px-8 py-4 rounded-2xl transition-all shadow-lg flex items-center gap-3 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Request Catalog PDF</span>
          </a>
        </div>

        {/* Warranty Coverage Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-platinum-gray/80 shadow-sm space-y-3">
            <ShieldCheck className="w-8 h-8 text-heritage-red" />
            <h3 className="font-display font-bold text-lg text-charcoal-matte">5-Year Manufacturer Guarantee</h3>
            <p className="text-xs text-charcoal-matte/70 leading-relaxed">
              Covers manufacturing defects, body welding integrity, and material flaws under standard domestic cooking conditions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-platinum-gray/80 shadow-sm space-y-3">
            <CheckCircle2 className="w-8 h-8 text-heritage-red" />
            <h3 className="font-display font-bold text-lg text-charcoal-matte">ISI Mark Compliance</h3>
            <p className="text-xs text-charcoal-matte/70 leading-relaxed">
              All pressure cookers strictly conform to Bureau of Indian Standards IS 2347 protocols with dual safety valves and gasket release slots.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-platinum-gray/80 shadow-sm space-y-3">
            <Wrench className="w-8 h-8 text-heritage-red" />
            <h3 className="font-display font-bold text-lg text-charcoal-matte">Genuine Spare Parts</h3>
            <p className="text-xs text-charcoal-matte/70 leading-relaxed">
              Food-grade silicon gaskets, weight valves, safety plugs, and heat-resistant Bakelite handle replacements available pan-India.
            </p>
          </div>
        </div>

        {/* How to Claim Warranty & Care Steps */}
        <div className="bg-white p-8 md:p-10 rounded-3xl border border-platinum-gray/80 shadow-sm space-y-6">
          <h3 className="font-display font-black text-xl text-charcoal-matte uppercase tracking-wide">
            How to Register or Claim Warranty
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-charcoal-matte/80 leading-relaxed">
            <div className="space-y-2">
              <span className="w-7 h-7 bg-heritage-red/10 text-heritage-red font-bold rounded-full flex items-center justify-center font-mono">1</span>
              <strong className="block text-sm text-charcoal-matte">Keep Purchase Invoice</strong>
              <p>Retain your original GST invoice or dealer purchase receipt showing the date and series details.</p>
            </div>

            <div className="space-y-2">
              <span className="w-7 h-7 bg-heritage-red/10 text-heritage-red font-bold rounded-full flex items-center justify-center font-mono">2</span>
              <strong className="block text-sm text-charcoal-matte">Contact Customer Care</strong>
              <p>Email geetanjalihomeappliances.india@gmail.com with photos of the vessel and defect.</p>
            </div>

            <div className="space-y-2">
              <span className="w-7 h-7 bg-heritage-red/10 text-heritage-red font-bold rounded-full flex items-center justify-center font-mono">3</span>
              <strong className="block text-sm text-charcoal-matte">Rapid Resolution</strong>
              <p>Our Delhi plant team will verify and dispatch free replacement parts or inspect the unit promptly.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
