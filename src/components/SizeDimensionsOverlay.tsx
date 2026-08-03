import React from 'react';
import { motion } from 'motion/react';
import { Info, Users, Ruler, Weight, ShieldCheck } from 'lucide-react';

export interface SizeDimensionInfo {
  size: string;
  type: 'liter' | 'diameter';
  capacityLiters?: number;
  diameterCm: number;
  heightCm: number;
  weightKg: number;
  servings: string;
  thicknessMm: number;
}

export function getSizeDimensionInfo(sizeStr: string): SizeDimensionInfo {
  const normalized = sizeStr.trim().toLowerCase();
  
  if (normalized.endsWith('l')) {
    const numericPart = parseFloat(normalized);
    switch (numericPart) {
      case 1.5:
        return {
          size: sizeStr,
          type: 'liter',
          capacityLiters: 1.5,
          diameterCm: 15.0,
          heightCm: 12.5,
          weightKg: 1.25,
          servings: "1-2 Persons (Solo / Couples)",
          thicknessMm: 3.2
        };
      case 2.0:
        return {
          size: sizeStr,
          type: 'liter',
          capacityLiters: 2.0,
          diameterCm: 16.5,
          heightCm: 13.5,
          weightKg: 1.55,
          servings: "2-3 Persons (Small Family)",
          thicknessMm: 3.2
        };
      case 3.0:
        return {
          size: sizeStr,
          type: 'liter',
          capacityLiters: 3.0,
          diameterCm: 18.0,
          heightCm: 15.0,
          weightKg: 1.85,
          servings: "3-4 Persons (Medium Family)",
          thicknessMm: 3.5
        };
      case 5.0:
        return {
          size: sizeStr,
          type: 'liter',
          capacityLiters: 5.0,
          diameterCm: 22.0,
          heightCm: 17.5,
          weightKg: 2.35,
          servings: "5-7 Persons (Large Family)",
          thicknessMm: 3.6
        };
      case 6.0:
        return {
          size: sizeStr,
          type: 'liter',
          capacityLiters: 6.0,
          diameterCm: 22.0,
          heightCm: 18.5,
          weightKg: 2.50,
          servings: "6-8 Persons (Heavy Daily Cooking)",
          thicknessMm: 3.6
        };
      case 6.5:
        return {
          size: sizeStr,
          type: 'liter',
          capacityLiters: 6.5,
          diameterCm: 24.0,
          heightCm: 19.5,
          weightKg: 2.70,
          servings: "7-9 Persons (Joint Family)",
          thicknessMm: 3.8
        };
      case 7.0:
        return {
          size: sizeStr,
          type: 'liter',
          capacityLiters: 7.0,
          diameterCm: 24.0,
          heightCm: 20.0,
          weightKg: 2.85,
          servings: "8-10 Persons (Festive Cooking)",
          thicknessMm: 3.8
        };
      case 8.0:
        return {
          size: sizeStr,
          type: 'liter',
          capacityLiters: 8.0,
          diameterCm: 26.0,
          heightCm: 21.0,
          weightKg: 3.20,
          servings: "10-12 Persons (Commercial/Joint)",
          thicknessMm: 4.0
        };
      case 10.0:
        return {
          size: sizeStr,
          type: 'liter',
          capacityLiters: 10.0,
          diameterCm: 28.0,
          heightCm: 23.5,
          weightKg: 3.80,
          servings: "12-15 Persons (Commercial / Banquets)",
          thicknessMm: 4.2
        };
      case 12.0:
        return {
          size: sizeStr,
          type: 'liter',
          capacityLiters: 12.0,
          diameterCm: 30.0,
          heightCm: 25.0,
          weightKg: 4.25,
          servings: "15-20 Persons (Extra Large Groups)",
          thicknessMm: 4.5
        };
      default:
        return {
          size: sizeStr,
          type: 'liter',
          capacityLiters: numericPart || 3.0,
          diameterCm: 18.0,
          heightCm: 15.0,
          weightKg: 1.80,
          servings: "Standard household serving size",
          thicknessMm: 3.5
        };
    }
  } else {
    const numericPart = parseFloat(normalized);
    switch (numericPart) {
      case 14:
        return {
          size: sizeStr,
          type: 'diameter',
          diameterCm: 14.0,
          heightCm: 7.5,
          weightKg: 0.85,
          servings: "Tea, Coffee, Boil-ups (1-2 portions)",
          thicknessMm: 2.5
        };
      case 16:
        return {
          size: sizeStr,
          type: 'diameter',
          diameterCm: 16.0,
          heightCm: 8.0,
          weightKg: 1.05,
          servings: "Simmering Soups & Gravies (2-3 portions)",
          thicknessMm: 2.5
        };
      case 18:
        return {
          size: sizeStr,
          type: 'diameter',
          diameterCm: 18.0,
          heightCm: 8.5,
          weightKg: 1.25,
          servings: "Standard Searing & Frying (3-4 portions)",
          thicknessMm: 2.5
        };
      case 20:
        return {
          size: sizeStr,
          type: 'diameter',
          diameterCm: 20.0,
          heightCm: 9.0,
          weightKg: 1.45,
          servings: "Standard Home Cooking (4-5 portions)",
          thicknessMm: 2.5
        };
      case 22:
        return {
          size: sizeStr,
          type: 'diameter',
          diameterCm: 22.0,
          heightCm: 9.5,
          weightKg: 1.70,
          servings: "Medium Gravies & Sauté (5-6 portions)",
          thicknessMm: 3.0
        };
      case 23:
        return {
          size: sizeStr,
          type: 'diameter',
          diameterCm: 23.0,
          heightCm: 2.5,
          weightKg: 1.20,
          servings: "Perfect for Daily Roti & Tawa Parathas",
          thicknessMm: 3.0
        };
      case 24:
        return {
          size: sizeStr,
          type: 'diameter',
          diameterCm: 24.0,
          heightCm: 10.0,
          weightKg: 1.95,
          servings: "Sautéing & Curry preparation (6-8 portions)",
          thicknessMm: 3.0
        };
      case 25:
        return {
          size: sizeStr,
          type: 'diameter',
          diameterCm: 25.0,
          heightCm: 2.5,
          weightKg: 1.40,
          servings: "Crepes, Golden Dosas & Fluffier Parathas",
          thicknessMm: 3.0
        };
      case 26:
        return {
          size: sizeStr,
          type: 'diameter',
          diameterCm: 26.0,
          heightCm: 10.5,
          weightKg: 2.25,
          servings: "Spacious family meals (8-10 portions)",
          thicknessMm: 3.0
        };
      case 28:
        return {
          size: sizeStr,
          type: 'diameter',
          diameterCm: 28.0,
          heightCm: 11.0,
          weightKg: 2.60,
          servings: "Large Dinner & Slow Stewing (10-12 portions)",
          thicknessMm: 3.0
        };
      case 30:
        return {
          size: sizeStr,
          type: 'diameter',
          diameterCm: 30.0,
          heightCm: 12.0,
          weightKg: 3.10,
          servings: "Banquets & heavy household cooking (12-15 portions)",
          thicknessMm: 3.5
        };
      case 32:
        return {
          size: sizeStr,
          type: 'diameter',
          diameterCm: 32.0,
          heightCm: 12.5,
          weightKg: 3.50,
          servings: "Professional / Catering Scale (15-18 portions)",
          thicknessMm: 3.5
        };
      case 34:
        return {
          size: sizeStr,
          type: 'diameter',
          diameterCm: 34.0,
          heightCm: 13.0,
          weightKg: 4.10,
          servings: "Catering & Bulk cooking (18-22 portions)",
          thicknessMm: 3.5
        };
      case 40:
        return {
          size: sizeStr,
          type: 'diameter',
          diameterCm: 40.0,
          heightCm: 15.0,
          weightKg: 5.60,
          servings: "Large-scale community events (25+ portions)",
          thicknessMm: 4.0
        };
      default:
        return {
          size: sizeStr,
          type: 'diameter',
          diameterCm: numericPart || 24.0,
          heightCm: 9.5,
          weightKg: 1.70,
          servings: "Versatile kitchen recipes",
          thicknessMm: 3.0
        };
    }
  }
}

interface SizeDimensionsOverlayProps {
  size: string;
  isVisible: boolean;
  className?: string;
  position?: 'top' | 'bottom' | 'side';
}

export const SizeDimensionsOverlay: React.FC<SizeDimensionsOverlayProps> = ({
  size,
  isVisible,
  className = "",
  position = 'top'
}) => {
  if (!isVisible) return null;

  const info = getSizeDimensionInfo(size);

  // We determine the visual shape dimensions based on realistic scale ratios.
  // Max scale values to keep visual within bounds
  const maxDiameter = 40;
  const maxHeight = 25;
  const scaleBase = 70; // pixel size multiplier

  // Normalize widths & heights to fit nicely in 110x80px bounding frame
  const visualWidth = Math.max(35, Math.min(100, (info.diameterCm / maxDiameter) * scaleBase + 35));
  const visualHeight = Math.max(25, Math.min(75, (info.heightCm / maxHeight) * scaleBase + 20));

  return (
    <motion.div
      initial={{ opacity: 0, y: position === 'top' ? 8 : -8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute z-50 bg-charcoal-matte/98 backdrop-blur-md text-white border border-platinum-gray/30 p-4 rounded shadow-2xl w-72 pointer-events-none text-left select-none font-sans ${
        position === 'top' 
          ? 'bottom-full left-1/2 -translate-x-1/2 mb-3' 
          : position === 'bottom'
            ? 'top-full left-1/2 -translate-x-1/2 mt-3'
            : 'left-full top-1/2 -translate-y-1/2 ml-3'
      } ${className}`}
    >
      {/* Decorative Blueprint grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:10px_10px] rounded pointer-events-none" />
      
      {/* Blueprint Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-3 relative">
        <div className="flex items-center gap-1.5">
          <Info size={12} className="text-golden-ochre" />
          <span className="text-[10px] font-mono tracking-widest text-golden-ochre uppercase font-bold">
            Spec Blueprint: {size}
          </span>
        </div>
        <span className="text-[8px] font-mono text-platinum-gray/40">SCALE 1:10</span>
      </div>

      <div className="grid grid-cols-5 gap-3 relative">
        {/* Dynamic Scale Drawing representation */}
        <div className="col-span-2 flex flex-col items-center justify-center border border-white/5 bg-white/[0.02] p-2 rounded relative overflow-hidden min-h-[96px]">
          {/* Blueprint measurement grid lines */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="w-full h-[1px] bg-white border-dashed" />
            <div className="h-full w-[1px] bg-white border-dashed" />
          </div>

          {info.type === 'liter' ? (
            /* Minimal Cooker Vector Lineart */
            <div className="flex flex-col items-center relative" style={{ width: `${visualWidth}px`, height: `${visualHeight}px` }}>
              {/* Lid & Whistle handle */}
              <div className="w-1/3 h-1.5 bg-golden-ochre/80 rounded-t-sm absolute -top-1" />
              <div className="w-1.5 h-3 bg-white/40 absolute -top-3 left-[calc(50%-3px)]" />
              {/* Vessel Body */}
              <div className="w-full h-full bg-transparent border border-white rounded-b-md relative">
                {/* Horizontal interior fill */}
                <div className="absolute bottom-0 inset-x-0 bg-white/10 rounded-b-md" style={{ height: '70%' }} />
                {/* Ergonomic handle outline */}
                <div className="absolute right-full top-1 w-5 h-1.5 bg-white/60 rounded-l-md origin-right" />
              </div>
            </div>
          ) : (
            /* Minimal Pot/Pan Vector Lineart */
            <div className="flex flex-col items-center relative" style={{ width: `${visualWidth}px`, height: `${visualHeight}px` }}>
              {/* Rim */}
              <div className="w-full h-1.5 bg-white/20 border-x border-t border-white rounded-t-sm" />
              {/* Vessel Body */}
              <div className="w-full h-full bg-transparent border-x border-b border-white rounded-b-lg relative">
                <div className="absolute bottom-0 inset-x-0 bg-white/10 rounded-b-lg" style={{ height: '60%' }} />
                {/* Single/Double handle based on depth */}
                {info.heightCm < 5 ? (
                  <div className="absolute left-full top-0 w-8 h-1 bg-white/60 rounded-r" />
                ) : (
                  <>
                    <div className="absolute -left-2.5 top-1 w-2.5 h-2 bg-transparent border border-white rounded-l" />
                    <div className="absolute -right-2.5 top-1 w-2.5 h-2 bg-transparent border border-white rounded-r" />
                  </>
                )}
              </div>
            </div>
          )}

          {/* Scale indicators */}
          <div className="absolute bottom-0.5 right-1 text-[7px] font-mono text-platinum-gray/50">
            {info.diameterCm} x {info.heightCm} cm
          </div>
        </div>

        {/* Detailed Metrics Panel */}
        <div className="col-span-3 space-y-2 text-[11px] flex flex-col justify-center">
          <div className="flex items-center gap-1.5">
            <Ruler size={11} className="text-platinum-gray/50 shrink-0" />
            <div>
              <span className="text-[9px] font-mono block text-platinum-gray/50 leading-none">Dimensions</span>
              <span className="font-mono text-white leading-normal font-semibold">
                Ø {info.diameterCm.toFixed(1)} cm x H {info.heightCm.toFixed(1)} cm
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <Weight size={11} className="text-platinum-gray/50 shrink-0" />
            <div>
              <span className="text-[9px] font-mono block text-platinum-gray/50 leading-none">Net Weight & Base</span>
              <span className="font-mono text-white leading-normal font-semibold">
                ~ {info.weightKg.toFixed(2)} kg / {info.thicknessMm.toFixed(1)} mm
              </span>
            </div>
          </div>

          <div className="flex items-start gap-1.5">
            <Users size={11} className="text-platinum-gray/50 shrink-0 mt-0.5" />
            <div>
              <span className="text-[9px] font-mono block text-platinum-gray/50 leading-none">Best Suited For</span>
              <span className="text-[10px] text-golden-ochre leading-tight font-medium">
                {info.servings}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badge Footer */}
      <div className="border-t border-white/10 mt-3 pt-2 flex items-center justify-between text-[8px] font-mono text-platinum-gray/40">
        <span className="flex items-center gap-1">
          <ShieldCheck size={9} className="text-emerald-400" />
          ISI Standard Scale Conformity
        </span>
        <span>GEETANJALI METROLOGY</span>
      </div>
    </motion.div>
  );
};
