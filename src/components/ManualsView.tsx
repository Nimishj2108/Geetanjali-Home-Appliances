import React, { useState } from 'react';
import { 
  BookOpen, 
  Flame, 
  ShieldAlert, 
  Sparkles, 
  Wrench, 
  Maximize2, 
  X, 
  CheckCircle2, 
  ArrowLeft,
  Info,
  Layers,
  Shield,
  Clock,
  RotateCcw,
  Check,
  AlertTriangle,
  HelpCircle,
  TrendingUp
} from 'lucide-react';
import { PageType } from '../types';

interface HotspotDetail {
  title: string;
  subtitle: string;
  desc: string;
  tips: string[];
}

interface ManualsViewProps {
  onNavigate: (page: PageType) => void;
}

export const ManualsView: React.FC<ManualsViewProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<'cooker' | 'triply' | 'honeycomb'>('cooker');
  const [selectedHotspot, setSelectedHotspot] = useState<string>('vent');

  // Interactive Hotspot definitions for categories
  const hotspotsData: Record<'cooker' | 'triply' | 'honeycomb', Record<string, HotspotDetail>> = {
    cooker: {
      vent: {
        title: 'Vent Weight & Whistle Tube',
        subtitle: 'Main Pressure Regulator Valve',
        desc: 'Constructed from heavy brass and steel, the vent weight is calibrated to lift and release steam at precisely 1.0 kg/cm² pressure, producing the characteristic safety whistle.',
        tips: [
          'Verify that the whistle tube is completely clear before every single session. Peek through the vent hole toward a light source to check for food clogging.',
          'Always place the vent weight onto the lid ONLY after steam starts issuing steadily from the tube.',
          'Routinely clean the inner steam passage with a thin metal wire or cleaning brush to clear calcium buildup.'
        ]
      },
      safety: {
        title: 'Fusible Metallic Safety Valve',
        subtitle: 'Secondary Overpressure Fuse',
        desc: 'Located safely under the handlebar or on the lid, this valve contains a special low-temperature fusible alloy. If the primary vent tube gets blocked, the alloy melts to release steam safely.',
        tips: [
          'Inspect the safety valve hex nut regularly to ensure it is tightened securely.',
          'Never attempt to block or cover the safety valve during operation.',
          'Replace the safety valve immediately if you notice the metallic alloy core has bulged, thinned, or begun to leak.'
        ]
      },
      gasket: {
        title: 'Gasket Release System (GRS)',
        subtitle: 'Tertiary Backup Steam Release',
        desc: 'Our lids feature an engineered side slot. If both the whistle and safety valve fail, the rubber gasket bulges out through this slot to vent steam downwards safely, preventing overpressure.',
        tips: [
          'Confirm that the high-density food-grade rubber gasket is perfectly seated in the lid rim groove.',
          'Replace the gasket every 12 to 18 months or if it hardens, stretches, or shows fine cracks.',
          'Wash the gasket in cold water after every meal, drying it thoroughly before re-fitting.'
        ]
      },
      handles: {
        title: 'Safety Interlock Handles',
        subtitle: 'Double Locking Engineering',
        desc: 'Ergonomically crafted handles are reinforced with premium heat-resistant Bakelite. The self-locking push-pin prevents the cooker lid from opening while there is active pressure inside.',
        tips: [
          'Slide the lid handle completely over the body handle until they align perfectly and click.',
          'NEVER try to pry the handles open. If they feel locked or stubborn, steam pressure is still present.',
          'Keep handle screws tightened with a screwdriver to avoid wobbling or unsafe carriage.'
        ]
      }
    },
    triply: {
      inner: {
        title: 'Inner 18/10 Stainless Steel (SS 304)',
        subtitle: 'Hygienic Cooking Layer',
        desc: 'The cooking surface is crafted from premium surgical-grade 18/10 Stainless Steel. It is completely non-reactive to acidic ingredients like citrus or tomatoes, preserving authentic tastes.',
        tips: [
          'Perform initial curing: Wash with soapy water, apply 1 tsp of oil, and heat on low for 2 minutes before wiping.',
          'Avoid using metal scrapers or high-abrasive powders to keep the mirror finish clean.',
          'For stubborn spots, use baking soda mixed with warm water, let sit, and scrub with a soft sponge.'
        ]
      },
      core: {
        title: 'High-Density Aluminum Core',
        subtitle: 'Thermal Distribution Core',
        desc: 'Sandwiched perfectly in the middle is a thick layer of pure high-conductivity aluminum. It transfers heat 3x faster than steel, spreading thermal energy from base to top rim evenly.',
        tips: [
          'Always cook on low to medium heat. Triply holds heat so well that high flame is rarely required and may scorch.',
          'Eliminates localized hot spots, preventing milk or delicate gravies from burning at the corners.',
          'Never dry-heat an empty triply pan, as overheating can cause the metal bonding to warp.'
        ]
      },
      outer: {
        title: 'Outer Magnetic Stainless Steel (SS 430)',
        subtitle: 'Induction-Friendly Base',
        desc: 'The external cladding is made from heavy-duty magnetic stainless steel, protecting the inner core and making the cookware compatible with all induction stoves, gas, halogen, and coil hubs.',
        tips: [
          'Compatible with all modern cooktops including high-frequency induction surfaces.',
          'Wipe the external base completely dry before placing it on an induction cooktop to avoid water spots.',
          'A soft vinegar wipe easily clears away rainbow-like heat tints from the outer mirror polish.'
        ]
      }
    },
    honeycomb: {
      peaks: {
        title: 'Raised Stainless Steel Peaks',
        subtitle: 'Mechanical Surface Armor',
        desc: 'The raised honeycomb steel ridges form a physical barrier over the non-stick surface. This armor guards the delicate non-stick cells from direct contact with spatulas and metal spoons.',
        tips: [
          'Metal-spatula friendly: You can stir freely with wooden, silicone, or light steel spatulas.',
          'Avoid cutting food inside the pan with sharp knives or using serrated tools directly on the ridges.',
          'Allows high-heat searing of meat and veggies, achieving premium browning without sticking.'
        ]
      },
      valleys: {
        title: 'Recessed Non-Stick Valleys',
        subtitle: 'Zero-Stick Release Chambers',
        desc: 'Embedded inside the laser-etched hexagonal valleys is a premium, PFOA-free non-stick coating. Because it sits below the steel ridges, food slides off effortlessly without sticking.',
        tips: [
          'Requires up to 50% less cooking oil or butter compared to standard stainless steel pans.',
          'Never use steel wool or harsh steel scouring pads, as they can strip the coating from the valleys.',
          'Wipe clean with a damp microfiber cloth or a soft sponge with mild liquid soap.'
        ]
      },
      induction: {
        title: 'Heavy Clad Triply Base',
        subtitle: 'Premium Thermal Integrity',
        desc: 'Built with a heavy-gauge multi-layer base that distributes heat evenly and maintains absolute flat stability on high-intensity cooktops, preventing wobbling or heat distortion.',
        tips: [
          'Suitable for heavy commercial stove usage as well as high-temperature gas flames.',
          'Allows rapid heat rise; always preheat on medium for 60 seconds before cooking.',
          'Cool the pan fully to room temperature before washing to prevent rapid contraction thermal shock.'
        ]
      }
    }
  };

  const currentHotspots = hotspotsData[activeCategory];
  const activeHotspotDetails = currentHotspots[selectedHotspot] || Object.values(currentHotspots)[0];

  // Auto select appropriate first hotspot when category changes
  const handleCategoryChange = (category: 'cooker' | 'triply' | 'honeycomb') => {
    setActiveCategory(category);
    if (category === 'cooker') setSelectedHotspot('vent');
    else if (category === 'triply') setSelectedHotspot('inner');
    else setSelectedHotspot('peaks');
  };

  return (
    <div className="w-full bg-[#fcfcfd] dark:bg-[#121214] py-12 px-4 md:px-12 lg:px-16 max-w-[1440px] mx-auto text-left font-sans transition-colors duration-300">
      
      {/* Premium Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-platinum-gray/25 pb-8 mb-10">
        <div>
          <button 
            onClick={() => onNavigate('home')}
            className="group flex items-center gap-2 text-xs font-bold text-heritage-red hover:text-charcoal-matte dark:hover:text-white mb-4 transition-colors uppercase tracking-widest"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            Back to Home
          </button>
          
          <div className="flex items-center gap-3.5">
            <span className="p-3 bg-heritage-red text-white rounded-2xl shadow-md shadow-heritage-red/10">
              <BookOpen size={24} />
            </span>
            <div>
              <span className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest text-charcoal-matte/50 dark:text-platinum-gray/50">
                Heritage Engineering Hub
              </span>
              <h1 className="font-display font-black text-2xl md:text-3xl lg:text-4xl text-charcoal-matte dark:text-white uppercase tracking-tight">
                Operating & Care Guides
              </h1>
            </div>
          </div>
          
          <p className="text-xs md:text-sm text-charcoal-matte/70 dark:text-platinum-gray/70 mt-3 max-w-2xl leading-relaxed">
            Skip generic PDFs. Browse our highly detailed interactive anatomy manuals, safety valve instructions, and chef seasoning tips, built directly from official Geetanjali Home Appliances manufacturing guidelines.
          </p>
        </div>

        {/* Category Navigation Bar - Premium pill tab style */}
        <div className="flex flex-wrap gap-2 bg-surface-container-low dark:bg-charcoal-matte/40 p-1.5 rounded-2xl border border-platinum-gray/35 self-start lg:self-end shadow-xs">
          <button
            onClick={() => handleCategoryChange('cooker')}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              activeCategory === 'cooker'
                ? 'bg-charcoal-matte dark:bg-white text-white dark:text-charcoal-matte shadow-md'
                : 'text-charcoal-matte/70 dark:text-platinum-gray/70 hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            <Wrench size={14} />
            Pressure Cooker
          </button>
          <button
            onClick={() => handleCategoryChange('triply')}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              activeCategory === 'triply'
                ? 'bg-charcoal-matte dark:bg-white text-white dark:text-charcoal-matte shadow-md'
                : 'text-charcoal-matte/70 dark:text-platinum-gray/70 hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            <Layers size={14} />
            Triply Cookware
          </button>
          <button
            onClick={() => handleCategoryChange('honeycomb')}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              activeCategory === 'honeycomb'
                ? 'bg-charcoal-matte dark:bg-white text-white dark:text-charcoal-matte shadow-md'
                : 'text-charcoal-matte/70 dark:text-platinum-gray/70 hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            <Sparkles size={14} />
            Honeycomb Hybrid
          </button>
        </div>
      </div>

      {/* Main Interactive Screen layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Side: Dynamic Schematic Diagram Visualizer (Cols: 5) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white dark:bg-charcoal-matte/10 rounded-3xl border border-platinum-gray/30 dark:border-platinum-gray/10 p-6 shadow-sm flex flex-col justify-between min-h-[460px] relative overflow-hidden">
            
            {/* Diagram Title Header */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-mono font-bold tracking-widest text-heritage-red uppercase">
                  Interactive Blueprint
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[9px] font-bold uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Ready
                </span>
              </div>
              <h3 className="font-display font-black text-lg text-charcoal-matte dark:text-white uppercase tracking-tight">
                {activeCategory === 'cooker' && 'Cooker Anatomy & Safe Locks'}
                {activeCategory === 'triply' && 'Triply Structural Layers'}
                {activeCategory === 'honeycomb' && 'Hybrid Honeycomb Mesh'}
              </h3>
              <p className="text-[11px] text-charcoal-matte/50 dark:text-platinum-gray/50 mt-1">
                Click on any of the highlighted hotspots on the diagram to see full maintenance guide.
              </p>
            </div>

            {/* Dynamic Render of High-Fidelity SVGs representing the Cookware */}
            <div className="my-8 flex items-center justify-center min-h-[260px]">
              
              {/* Pressure Cooker Interactive SVG */}
              {activeCategory === 'cooker' && (
                <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center">
                  <svg viewBox="0 0 400 400" className="w-full h-full text-charcoal-matte dark:text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Background Grid Accent */}
                    <circle cx="200" cy="200" r="160" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" className="opacity-15" />
                    <line x1="200" y1="40" x2="200" y2="360" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" className="opacity-15" />
                    <line x1="40" y1="200" x2="360" y2="200" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" className="opacity-15" />

                    {/* Pressure Cooker Body Outline */}
                    <path d="M100 210 Q100 190 120 190 L280 190 Q300 190 300 210 L290 310 Q290 330 270 330 L130 330 Q110 330 110 310 Z" fill="currentColor" className="opacity-5" stroke="currentColor" strokeWidth="2.5" />
                    {/* Metal Finish Accents inside body */}
                    <path d="M115 195 L285 195 M120 320 L280 320" stroke="currentColor" strokeWidth="1" className="opacity-30" />
                    <rect x="180" y="323" width="40" height="7" rx="3" fill="currentColor" className="opacity-30" />

                    {/* Cooker Lid */}
                    <path d="M100 190 C100 160 120 150 200 150 C280 150 300 160 300 190 Z" fill="currentColor" className="opacity-10" stroke="currentColor" strokeWidth="2.5" />
                    
                    {/* Vent Tube (Primary Whistle) */}
                    <rect x="193" y="115" width="14" height="35" rx="1" fill="currentColor" stroke="currentColor" strokeWidth="2" />
                    <rect x="185" y="105" width="30" height="10" rx="2" fill="currentColor" stroke="currentColor" strokeWidth="2" className={selectedHotspot === 'vent' ? 'text-heritage-red' : ''} />
                    {/* Whistle Steam release lines */}
                    {selectedHotspot === 'vent' && (
                      <g className="animate-pulse">
                        <path d="M175 95 Q180 85 178 75 M200 95 Q200 80 205 70 M225 95 Q220 85 222 75" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
                      </g>
                    )}

                    {/* Safety Valve */}
                    <circle cx="145" cy="165" r="9" fill="currentColor" stroke="currentColor" strokeWidth="2" className={selectedHotspot === 'safety' ? 'text-heritage-red' : ''} />
                    <line x1="145" y1="161" x2="145" y2="169" stroke="white" strokeWidth="1.5" />
                    <line x1="141" y1="165" x2="149" y2="165" stroke="white" strokeWidth="1.5" />

                    {/* Gasket Side Release Slot (GRS) */}
                    <rect x="92" y="175" width="10" height="20" rx="4" fill="currentColor" stroke="currentColor" strokeWidth="1.5" className={selectedHotspot === 'gasket' ? 'text-heritage-red' : ''} />
                    <rect x="298" y="175" width="10" height="20" rx="4" fill="currentColor" stroke="currentColor" strokeWidth="1.5" className={selectedHotspot === 'gasket' ? 'text-heritage-red' : ''} />

                    {/* Long Handle */}
                    <path d="M300 180 L390 180 C395 180 398 185 395 192 L388 205 C385 210 380 212 375 212 L300 212 Z" fill="currentColor" className={selectedHotspot === 'handles' ? 'text-heritage-red' : 'opacity-80'} stroke="currentColor" strokeWidth="2" />
                    <circle cx="355" cy="196" r="4" fill="white" />
                  </svg>

                  {/* Hotspot 1: Vent Weight */}
                  <button 
                    onClick={() => setSelectedHotspot('vent')}
                    className={`absolute top-[21%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-black transition-all ${
                      selectedHotspot === 'vent' 
                        ? 'bg-heritage-red text-white scale-110 ring-4 ring-heritage-red/30' 
                        : 'bg-white dark:bg-charcoal-black text-charcoal-matte dark:text-white border border-platinum-gray/60 hover:border-heritage-red shadow-md'
                    }`}
                  >
                    1
                  </button>

                  {/* Hotspot 2: Safety Valve */}
                  <button 
                    onClick={() => setSelectedHotspot('safety')}
                    className={`absolute top-[37%] left-[36%] -translate-x-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-black transition-all ${
                      selectedHotspot === 'safety' 
                        ? 'bg-heritage-red text-white scale-110 ring-4 ring-heritage-red/30' 
                        : 'bg-white dark:bg-charcoal-black text-charcoal-matte dark:text-white border border-platinum-gray/60 hover:border-heritage-red shadow-md'
                    }`}
                  >
                    2
                  </button>

                  {/* Hotspot 3: Gasket Release System */}
                  <button 
                    onClick={() => setSelectedHotspot('gasket')}
                    className={`absolute top-[43%] left-[23%] -translate-x-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-black transition-all ${
                      selectedHotspot === 'gasket' 
                        ? 'bg-heritage-red text-white scale-110 ring-4 ring-heritage-red/30' 
                        : 'bg-white dark:bg-charcoal-black text-charcoal-matte dark:text-white border border-platinum-gray/60 hover:border-heritage-red shadow-md'
                    }`}
                  >
                    3
                  </button>

                  {/* Hotspot 4: Double Locking Handles */}
                  <button 
                    onClick={() => setSelectedHotspot('handles')}
                    className={`absolute top-[46%] left-[88%] -translate-x-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-black transition-all ${
                      selectedHotspot === 'handles' 
                        ? 'bg-heritage-red text-white scale-110 ring-4 ring-heritage-red/30' 
                        : 'bg-white dark:bg-charcoal-black text-charcoal-matte dark:text-white border border-platinum-gray/60 hover:border-heritage-red shadow-md'
                    }`}
                  >
                    4
                  </button>
                </div>
              )}

              {/* Triply Structural Stack Interactive SVG */}
              {activeCategory === 'triply' && (
                <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center">
                  <svg viewBox="0 0 400 400" className="w-full h-full text-charcoal-matte dark:text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Isometric Layer Stack representing Triply material */}
                    {/* Layer 1: Inner SS 304 */}
                    <g className={selectedHotspot === 'inner' ? 'text-golden-ochre transition-all' : 'opacity-40 transition-all'}>
                      <path d="M80 120 L200 60 L320 120 L200 180 Z" fill="currentColor" className="opacity-15" stroke="currentColor" strokeWidth="2.5" />
                      <path d="M80 120 L80 135 L200 195 L200 180 Z" fill="currentColor" className="opacity-20" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M200 180 L200 195 L320 135 L320 120 Z" fill="currentColor" className="opacity-25" stroke="currentColor" strokeWidth="1.5" />
                      <text x="200" y="115" textAnchor="middle" className="font-display font-black text-xs uppercase" fill="currentColor">Inner SS 304 (Surgical)</text>
                    </g>

                    {/* Layer 2: Aluminum Core */}
                    <g className={selectedHotspot === 'core' ? 'text-amber-500 transition-all' : 'opacity-45 transition-all'}>
                      <path d="M80 200 L200 140 L320 200 L200 260 Z" fill="currentColor" className="opacity-25" stroke="currentColor" strokeWidth="2.5" />
                      <path d="M80 200 L80 215 L200 275 L200 260 Z" fill="currentColor" className="opacity-30" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M200 260 L200 275 L320 215 L320 200 Z" fill="currentColor" className="opacity-35" stroke="currentColor" strokeWidth="1.5" />
                      <text x="200" y="195" textAnchor="middle" className="font-display font-black text-xs uppercase" fill="currentColor">Aluminum Core (Heat)</text>
                    </g>

                    {/* Layer 3: Outer SS 430 */}
                    <g className={selectedHotspot === 'outer' ? 'text-slate-500 dark:text-slate-300 transition-all' : 'opacity-40 transition-all'}>
                      <path d="M80 280 L200 220 L320 280 L200 340 Z" fill="currentColor" className="opacity-15" stroke="currentColor" strokeWidth="2.5" />
                      <path d="M80 280 L80 295 L200 355 L200 340 Z" fill="currentColor" className="opacity-20" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M200 340 L200 355 L320 295 L320 280 Z" fill="currentColor" className="opacity-25" stroke="currentColor" strokeWidth="1.5" />
                      <text x="200" y="275" textAnchor="middle" className="font-display font-black text-xs uppercase" fill="currentColor">Outer SS 430 (Induction)</text>
                    </g>
                  </svg>

                  {/* Hotspot inner SS */}
                  <button 
                    onClick={() => setSelectedHotspot('inner')}
                    className={`absolute top-[28%] left-[20%] z-10 w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-black transition-all ${
                      selectedHotspot === 'inner' 
                        ? 'bg-golden-ochre text-white scale-110 ring-4 ring-golden-ochre/30' 
                        : 'bg-white dark:bg-charcoal-black text-charcoal-matte dark:text-white border border-platinum-gray/60 hover:border-golden-ochre shadow-md'
                    }`}
                  >
                    A
                  </button>

                  {/* Hotspot alu core */}
                  <button 
                    onClick={() => setSelectedHotspot('core')}
                    className={`absolute top-[48%] left-[20%] z-10 w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-black transition-all ${
                      selectedHotspot === 'core' 
                        ? 'bg-amber-500 text-white scale-110 ring-4 ring-amber-500/30' 
                        : 'bg-white dark:bg-charcoal-black text-charcoal-matte dark:text-white border border-platinum-gray/60 hover:border-amber-500 shadow-md'
                    }`}
                  >
                    B
                  </button>

                  {/* Hotspot outer SS */}
                  <button 
                    onClick={() => setSelectedHotspot('outer')}
                    className={`absolute top-[68%] left-[20%] z-10 w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-black transition-all ${
                      selectedHotspot === 'outer' 
                        ? 'bg-slate-500 text-white scale-110 ring-4 ring-slate-500/30' 
                        : 'bg-white dark:bg-charcoal-black text-charcoal-matte dark:text-white border border-platinum-gray/60 hover:border-slate-500 shadow-md'
                    }`}
                  >
                    C
                  </button>
                </div>
              )}

              {/* Honeycomb Hybrid Mesh Interactive SVG */}
              {activeCategory === 'honeycomb' && (
                <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center">
                  <svg viewBox="0 0 400 400" className="w-full h-full text-charcoal-matte dark:text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Honeycomb Hexagon Matrix */}
                    <g className="text-teal-600 dark:text-teal-400">
                      {/* Hexagon Pattern Grid */}
                      {/* Row 1 */}
                      <polygon points="120,110 160,85 200,110 200,150 160,175 120,150" fill={selectedHotspot === 'peaks' ? '#0d9488' : '#14b8a6'} fillOpacity={selectedHotspot === 'valleys' ? '0.1' : '0.4'} stroke="currentColor" strokeWidth="3" className="transition-all" />
                      <polygon points="200,110 240,85 280,110 280,150 240,175 200,150" fill={selectedHotspot === 'peaks' ? '#0d9488' : '#14b8a6'} fillOpacity={selectedHotspot === 'valleys' ? '0.1' : '0.4'} stroke="currentColor" strokeWidth="3" className="transition-all" />
                      
                      {/* Row 2 */}
                      <polygon points="80,180 120,155 160,180 160,220 120,245 80,220" fill={selectedHotspot === 'peaks' ? '#0d9488' : '#14b8a6'} fillOpacity={selectedHotspot === 'valleys' ? '0.1' : '0.4'} stroke="currentColor" strokeWidth="3" className="transition-all" />
                      <polygon points="160,180 200,155 240,180 240,220 200,245 160,220" fill={selectedHotspot === 'peaks' ? '#0d9488' : '#14b8a6'} fillOpacity={selectedHotspot === 'valleys' ? '0.1' : '0.4'} stroke="#0d9488" strokeWidth="5" className="transition-all" />
                      <polygon points="240,180 280,155 320,180 320,220 280,245 240,220" fill={selectedHotspot === 'peaks' ? '#0d9488' : '#14b8a6'} fillOpacity={selectedHotspot === 'valleys' ? '0.1' : '0.4'} stroke="currentColor" strokeWidth="3" className="transition-all" />
                      
                      {/* Row 3 */}
                      <polygon points="120,250 160,225 200,250 200,290 160,315 120,290" fill={selectedHotspot === 'peaks' ? '#0d9488' : '#14b8a6'} fillOpacity={selectedHotspot === 'valleys' ? '0.1' : '0.4'} stroke="currentColor" strokeWidth="3" className="transition-all" />
                      <polygon points="200,250 240,225 280,250 280,290 240,315 200,290" fill={selectedHotspot === 'peaks' ? '#0d9488' : '#14b8a6'} fillOpacity={selectedHotspot === 'valleys' ? '0.1' : '0.4'} stroke="currentColor" strokeWidth="3" className="transition-all" />
                    </g>

                    {/* Non-stick valley dots inside selected hexagon */}
                    <g className="text-teal-900 dark:text-teal-100 opacity-60">
                      <circle cx="200" cy="200" r="15" fill="currentColor" className="opacity-20" />
                      <circle cx="200" cy="200" r="3" fill="currentColor" />
                      <circle cx="185" cy="190" r="3" fill="currentColor" />
                      <circle cx="215" cy="190" r="3" fill="currentColor" />
                      <circle cx="185" cy="210" r="3" fill="currentColor" />
                      <circle cx="215" cy="210" r="3" fill="currentColor" />
                    </g>
                    
                    {/* Metal spatula graphic testing the ridges */}
                    <path d="M220 160 L310 100 L330 115 L240 175 Z" fill="currentColor" className="opacity-20" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="220" y1="160" x2="240" y2="175" stroke="currentColor" strokeWidth="3" className="text-amber-500" />
                  </svg>

                  {/* Hotspot steel peaks */}
                  <button 
                    onClick={() => setSelectedHotspot('peaks')}
                    className={`absolute top-[48%] left-[51%] -translate-x-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-black transition-all ${
                      selectedHotspot === 'peaks' 
                        ? 'bg-teal-600 text-white scale-110 ring-4 ring-teal-600/30' 
                        : 'bg-white dark:bg-charcoal-black text-charcoal-matte dark:text-white border border-platinum-gray/60 hover:border-teal-500 shadow-md'
                    }`}
                  >
                    1
                  </button>

                  {/* Hotspot nonstick valleys */}
                  <button 
                    onClick={() => setSelectedHotspot('valleys')}
                    className={`absolute top-[40%] left-[62%] -translate-x-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-black transition-all ${
                      selectedHotspot === 'valleys' 
                        ? 'bg-teal-600 text-white scale-110 ring-4 ring-teal-600/30' 
                        : 'bg-white dark:bg-charcoal-black text-charcoal-matte dark:text-white border border-platinum-gray/60 hover:border-teal-500 shadow-md'
                    }`}
                  >
                    2
                  </button>

                  {/* Hotspot thermal base */}
                  <button 
                    onClick={() => setSelectedHotspot('induction')}
                    className={`absolute top-[68%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-black transition-all ${
                      selectedHotspot === 'induction' 
                        ? 'bg-teal-600 text-white scale-110 ring-4 ring-teal-600/30' 
                        : 'bg-white dark:bg-charcoal-black text-charcoal-matte dark:text-white border border-platinum-gray/60 hover:border-teal-500 shadow-md'
                    }`}
                  >
                    3
                  </button>
                </div>
              )}

            </div>

            {/* Micro-Selector Bar inside Diagram Panel */}
            <div className="border-t border-platinum-gray/30 dark:border-platinum-gray/10 pt-4 flex justify-between items-center bg-platinum-gray/5 dark:bg-white/5 rounded-2xl p-3 text-xs">
              <span className="font-semibold text-charcoal-matte/70 dark:text-platinum-gray/70">
                Select Component:
              </span>
              <div className="flex gap-1">
                {activeCategory === 'cooker' && (
                  <>
                    <button onClick={() => setSelectedHotspot('vent')} className={`px-2 py-1 rounded-md text-[10px] font-bold ${selectedHotspot === 'vent' ? 'bg-heritage-red text-white' : 'hover:bg-neutral-200 dark:hover:bg-neutral-800'}`}>Whistle</button>
                    <button onClick={() => setSelectedHotspot('safety')} className={`px-2 py-1 rounded-md text-[10px] font-bold ${selectedHotspot === 'safety' ? 'bg-heritage-red text-white' : 'hover:bg-neutral-200 dark:hover:bg-neutral-800'}`}>Safety Valve</button>
                    <button onClick={() => setSelectedHotspot('gasket')} className={`px-2 py-1 rounded-md text-[10px] font-bold ${selectedHotspot === 'gasket' ? 'bg-heritage-red text-white' : 'hover:bg-neutral-200 dark:hover:bg-neutral-800'}`}>Gasket</button>
                    <button onClick={() => setSelectedHotspot('handles')} className={`px-2 py-1 rounded-md text-[10px] font-bold ${selectedHotspot === 'handles' ? 'bg-heritage-red text-white' : 'hover:bg-neutral-200 dark:hover:bg-neutral-800'}`}>Handles</button>
                  </>
                )}
                {activeCategory === 'triply' && (
                  <>
                    <button onClick={() => setSelectedHotspot('inner')} className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${selectedHotspot === 'inner' ? 'bg-golden-ochre text-white' : 'hover:bg-neutral-200 dark:hover:bg-neutral-800'}`}>SS 304</button>
                    <button onClick={() => setSelectedHotspot('core')} className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${selectedHotspot === 'core' ? 'bg-amber-500 text-white' : 'hover:bg-neutral-200 dark:hover:bg-neutral-800'}`}>Aluminum</button>
                    <button onClick={() => setSelectedHotspot('outer')} className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${selectedHotspot === 'outer' ? 'bg-slate-500 text-white' : 'hover:bg-neutral-200 dark:hover:bg-neutral-800'}`}>SS 430</button>
                  </>
                )}
                {activeCategory === 'honeycomb' && (
                  <>
                    <button onClick={() => setSelectedHotspot('peaks')} className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${selectedHotspot === 'peaks' ? 'bg-teal-600 text-white' : 'hover:bg-neutral-200 dark:hover:bg-neutral-800'}`}>SS Peaks</button>
                    <button onClick={() => setSelectedHotspot('valleys')} className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${selectedHotspot === 'valleys' ? 'bg-teal-600 text-white' : 'hover:bg-neutral-200 dark:hover:bg-neutral-800'}`}>Valleys</button>
                    <button onClick={() => setSelectedHotspot('induction')} className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${selectedHotspot === 'induction' ? 'bg-teal-600 text-white' : 'hover:bg-neutral-200 dark:hover:bg-neutral-800'}`}>Base</button>
                  </>
                )}
              </div>
            </div>

          </div>

          {/* Quick FAQ Safety Tip Card */}
          <div className="p-5 bg-charcoal-matte text-white rounded-3xl space-y-3.5 shadow-md">
            <h4 className="font-display font-black text-xs uppercase tracking-widest text-heritage-red flex items-center gap-2">
              <ShieldAlert size={14} />
              Heritage Safety Seal
            </h4>
            <p className="text-xs text-white/80 leading-relaxed">
              Geetanjali Home Appliances vessels are meticulously tested. Our pressure cookers are manufactured with heavy food-grade metallic composition and are certified ISI standard conformers.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between gap-4">
              <span className="text-[10px] uppercase font-mono tracking-wider text-white/70">
                Authorized Service Helpline:
              </span>
              <a href="mailto:geetanjalihomeappliances.india@gmail.com" className="text-xs font-mono font-bold text-heritage-red hover:underline break-all">
                geetanjalihomeappliances.india@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Specific Hotspot Maintenance Information and Step-By-Step Guidelines (Cols: 7) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Active Hotspot Full Detail View (Glow card) */}
          <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#19191d] border-2 border-charcoal-matte/10 dark:border-white/10 shadow-lg relative overflow-hidden transition-all duration-300">
            {/* Top Indicator */}
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-heritage-red mb-3">
              <Info size={14} />
              <span>Component Detail Care Sheet</span>
            </div>

            <h2 className="font-display font-black text-xl md:text-2xl text-charcoal-matte dark:text-white uppercase tracking-tight">
              {activeHotspotDetails.title}
            </h2>
            <span className="inline-block px-3 py-1 bg-neutral-100 dark:bg-white/5 text-[10px] font-mono tracking-wider font-bold text-charcoal-matte/60 dark:text-platinum-gray/60 rounded-full mt-1.5 uppercase">
              {activeHotspotDetails.subtitle}
            </span>

            {/* Description Text */}
            <p className="text-xs md:text-sm text-charcoal-matte/80 dark:text-platinum-gray/80 mt-4 leading-relaxed">
              {activeHotspotDetails.desc}
            </p>

            {/* Tips Checklist */}
            <div className="mt-6 border-t border-platinum-gray/30 dark:border-white/10 pt-6">
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-charcoal-matte dark:text-white mb-3">
                Mandatory Safety & Maintenance Guidelines
              </h4>
              
              <div className="space-y-4">
                {activeHotspotDetails.tips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 bg-neutral-50 dark:bg-white/[0.02] border border-platinum-gray/10 rounded-2xl p-4 hover:border-heritage-red/20 transition-colors">
                    <span className="h-6 w-6 rounded-full bg-heritage-red/10 dark:bg-heritage-red/20 text-heritage-red flex items-center justify-center shrink-0 font-mono text-xs font-bold">
                      {index + 1}
                    </span>
                    <p className="text-xs md:text-sm text-charcoal-matte/75 dark:text-platinum-gray/75 leading-relaxed">
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Golden Care Standard Card (General instructions) */}
          <div className="bg-white dark:bg-charcoal-matte/10 border border-platinum-gray/35 dark:border-platinum-gray/10 rounded-3xl p-6 shadow-xs space-y-4">
            <h3 className="font-display font-bold text-sm text-charcoal-matte dark:text-white uppercase tracking-tight flex items-center gap-2">
              <span className="p-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg">
                <Check size={16} />
              </span>
              Heritage Cookware General Golden Rules
            </h3>

            {/* Quick Yes/No Grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Do's Column */}
              <div className="p-4 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/10 border border-emerald-500/20 space-y-2.5">
                <h5 className="font-display font-bold text-xs text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 size={13} />
                  Recommended (Do\'s)
                </h5>
                <ul className="text-[11px] text-charcoal-matte/80 dark:text-platinum-gray/80 space-y-1.5 list-disc pl-3">
                  <li>Use low or medium heat for all cooking tasks.</li>
                  <li>Dry vessels fully before storing in shelves.</li>
                  <li>Perform wood/silicone spatula selection routinely.</li>
                  <li>Clean safety vent weights immediately after cooking.</li>
                </ul>
              </div>

              {/* Don'ts Column */}
              <div className="p-4 rounded-2xl bg-rose-50/40 dark:bg-rose-950/10 border border-rose-500/20 space-y-2.5">
                <h5 className="font-display font-bold text-xs text-rose-700 dark:text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle size={13} />
                  Prohibited (Don\'ts)
                </h5>
                <ul className="text-[11px] text-charcoal-matte/80 dark:text-platinum-gray/80 space-y-1.5 list-disc pl-3">
                  <li>Never dry-heat or leave empty pans on high heat.</li>
                  <li>Never immerse a scalding hot pan in cold water.</li>
                  <li>Avoid wire wool pads on mirror polished outer metal.</li>
                  <li>Do not use sharp steel knives inside hybrid mesh.</li>
                </ul>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
