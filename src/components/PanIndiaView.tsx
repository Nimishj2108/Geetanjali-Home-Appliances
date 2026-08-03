import React from 'react';
import { PageType } from '../types';
import { Truck, MapPin, CheckCircle, ShieldCheck, Phone, Mail } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface PanIndiaViewProps {
  onNavigate?: (page: PageType) => void;
}

export const PanIndiaView: React.FC<PanIndiaViewProps> = ({ onNavigate }) => {
  const regions = [
    {
      name: "Delhi NCR & North India",
      states: "Delhi, Haryana, Punjab, Uttar Pradesh, Rajasthan, Uttarakhand, Himachal Pradesh, Jammu & Kashmir",
      hubs: "New Delhi, Gurugram, Noida, Bawana Industrial Area, Ludhiana, Chandigarh, Jaipur, Lucknow, Kanpur"
    },
    {
      name: "Western India",
      states: "Maharashtra, Gujarat, Goa, Madhya Pradesh",
      hubs: "Mumbai, Pune, Ahmedabad, Surat, Rajkot, Vadodara, Indore, Bhopal"
    },
    {
      name: "Southern India",
      states: "Karnataka, Tamil Nadu, Telangana, Andhra Pradesh, Kerala",
      hubs: "Bengaluru, Chennai, Hyderabad, Coimbatore, Kochi, Vijayawada, Mysuru"
    },
    {
      name: "Eastern & Central India",
      states: "West Bengal, Odisha, Bihar, Jharkhand, Chhattisgarh, Assam, North-East States",
      hubs: "Kolkata, Patna, Ranchi, Bhubaneswar, Raipur, Guwahati"
    }
  ];

  return (
    <div className="w-full bg-background min-h-screen py-12 md:py-16 px-4 md:px-12 lg:px-16 text-charcoal-matte">
      <Helmet>
        <title>We Deliver Pan India | Geetanjali Home Appliances Wholesale & Retail</title>
        <meta 
          name="description" 
          content="Geetanjali Home Appliances ships pressure cookers & cookware all over India. Fast delivery to Delhi NCR, Punjab, UP, Maharashtra, Gujarat, South & East India." 
        />
        <meta 
          name="keywords" 
          content="pressure cooker delivery India, wholesale cookware supplier Pan India, Geetanjali delivery regions, Bawana Delhi cookware manufacturer dispatch" 
        />
        <link rel="canonical" href="https://geetanjalihomeappliances.com/pan-india" />
      </Helmet>

      <div className="max-w-[1280px] mx-auto space-y-12">
        {/* Hero Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="px-3.5 py-1.5 bg-heritage-red/10 text-heritage-red font-mono text-xs font-bold uppercase tracking-widest rounded-full inline-block border border-heritage-red/20">
            Pan-India Supply & Logistics
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-charcoal-matte uppercase tracking-tight">
            We Ship & Deliver All Over India
          </h1>
          <p className="text-sm md:text-base text-charcoal-matte/70 font-sans leading-relaxed">
            From our central state-of-the-art manufacturing plant in <strong className="text-charcoal-matte">Bawana Industrial Area, Sector-2, Delhi</strong>, Geetanjali Home Appliances dispatches premium ISI certified pressure cookers (1.5L to 22L) and triply cookware to all 28 states and 8 Union Territories across India.
          </p>
        </div>

        {/* 4 Region Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {regions.map((region, idx) => (
            <div key={idx} className="bg-white p-6 md:p-8 rounded-3xl border border-platinum-gray/80 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-heritage-red" />
                <h2 className="font-display font-bold text-xl text-charcoal-matte uppercase tracking-wide">
                  {region.name}
                </h2>
              </div>
              <div className="text-xs space-y-2 text-charcoal-matte/80 leading-relaxed">
                <p><strong>States Covered:</strong> {region.states}</p>
                <p><strong>Major Distribution Hubs:</strong> {region.hubs}</p>
              </div>
              <div className="pt-2 border-t border-platinum-gray/40 flex items-center gap-2 text-[11px] font-medium text-green-700">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Express Doorstep & B2B Cargo Dispatch Available</span>
              </div>
            </div>
          ))}
        </div>

        {/* Logistics Commitment Card */}
        <div className="bg-charcoal-matte text-white p-8 md:p-10 rounded-3xl space-y-6 shadow-xl">
          <div className="flex items-center gap-3">
            <Truck className="w-8 h-8 text-heritage-red" />
            <h3 className="font-display font-black text-2xl uppercase tracking-wide text-white">
              Safe Heavy-Duty Transit Packaging
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-platinum-gray/90 leading-relaxed max-w-3xl font-sans">
            Whether sending a single order to a home chef or bulk crates to regional distributors, every shipment is packed in multi-ply corrugated boxes with reinforced corner guards and heavy straps to ensure zero transit denting or lid damage.
          </p>
          <div className="flex flex-wrap gap-6 text-xs text-white/80">
            <div><strong>Dispatch Time:</strong> Within 24-48 hours from Bawana, Delhi</div>
            <div><strong>Tracking:</strong> Real-time WhatsApp tracking updates provided</div>
            <div><strong>Bulk Freight:</strong> Direct truckloads for distributors</div>
          </div>
        </div>
      </div>
    </div>
  );
};
