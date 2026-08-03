import React, { useState } from 'react';
import { PageType } from '../types';
import { Building2, ShieldCheck, Truck, Award, Phone, Mail, MapPin, CheckCircle, Send, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';

interface DealerViewProps {
  onNavigate?: (page: PageType) => void;
}

export const DealerView: React.FC<DealerViewProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    phone: '',
    email: '',
    city: '',
    state: '',
    experience: '1-3 years',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const text = `*GEETANJALI DEALERSHIP INQUIRY*%0A*Business:* ${formData.businessName}%0A*Contact:* ${formData.contactPerson}%0A*Phone:* ${formData.phone}%0A*Email:* ${formData.email}%0A*Location:* ${formData.city}, ${formData.state}%0A*Experience:* ${formData.experience}%0A*Message:* ${formData.message}`;
    window.open(`https://wa.me/919205293094?text=${text}`, '_blank');
  };

  const handleEmailInquiry = () => {
    setSubmitted(true);
    const text = `Hello Geetanjali Sales & Dealership Desk,

I would like to apply for a Geetanjali Home Appliances Dealership / Distributorship:

• Business Name: ${formData.businessName || 'N/A'}
• Contact Person: ${formData.contactPerson || 'N/A'}
• Phone Number: ${formData.phone || 'N/A'}
• Email Address: ${formData.email || 'N/A'}
• City / Location: ${formData.city || 'N/A'}, ${formData.state || 'N/A'}
• Business Experience: ${formData.experience}
• Target Market / Message: ${formData.message || 'N/A'}

Please send us your B2B wholesale pricing structure, minimum order quantities (MOQ), dealership terms, and product catalogs.

Thank you!`;

    const subject = encodeURIComponent(`GEETANJALI DEALERSHIP INQUIRY - ${formData.businessName || formData.contactPerson || 'Business Partner'}`);
    window.open(`mailto:geetanjalihomeappliances.india@gmail.com?subject=${subject}&body=${encodeURIComponent(text)}`, '_blank');
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Geetanjali Home Appliances",
    "legalName": "Harsh Home Appliances",
    "description": "Leading Pressure Cooker and Cookware Manufacturer in Bawana Industrial Area, Delhi NCR.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "K-11, Sector-2, Bawana Industrial Area",
      "addressLocality": "Delhi",
      "addressRegion": "Delhi NCR",
      "postalCode": "110039",
      "addressCountry": "IN"
    },
    "telephone": "+91-9205293094",
    "email": "geetanjalihomeappliances.india@gmail.com",
    "url": "https://geetanjalihomeappliances.com/dealer"
  };

  return (
    <div className="w-full bg-background min-h-screen py-12 md:py-16 px-4 md:px-12 lg:px-16 text-charcoal-matte">
      <Helmet>
        <title>Become a Dealer & Distributor | Geetanjali Home Appliances Delhi</title>
        <meta 
          name="description" 
          content="Partner with Geetanjali Home Appliances (Harsh Home Appliances). Pan-India B2B dealership & distributor opportunities for ISI certified pressure cookers & triply cookware." 
        />
        <meta 
          name="keywords" 
          content="pressure cooker wholesale manufacturer, cookware distributor India, pressure cooker dealer Delhi, Geetanjali dealership, Bawana industrial area manufacturer" 
        />
        <link rel="canonical" href="https://geetanjalihomeappliances.com/dealer" />
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>

      <div className="max-w-[1280px] mx-auto space-y-12">
        {/* Header Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="px-3.5 py-1.5 bg-heritage-red/10 text-heritage-red font-mono text-xs font-bold uppercase tracking-widest rounded-full inline-block border border-heritage-red/20">
            Pan-India B2B Opportunities
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-charcoal-matte uppercase tracking-tight">
            Become an Authorized Dealer or Distributor
          </h1>
          <p className="text-sm md:text-base text-charcoal-matte/70 font-sans leading-relaxed">
            Expand your retail portfolio with 30+ years of manufacturing excellence from <strong className="text-charcoal-matte">Geetanjali Home Appliances</strong> (manufactured by Harsh Home Appliances, K-11, Bawana Industrial Area, Delhi - 110039). Direct factory pricing, maximum margins, and ISI certified quality.
          </p>
        </div>

        {/* 4 Value Proposition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-platinum-gray/60 shadow-sm space-y-3">
            <Building2 className="w-8 h-8 text-heritage-red" />
            <h2 className="font-display font-bold text-lg text-charcoal-matte">Factory Direct Pricing</h2>
            <p className="text-xs text-charcoal-matte/70 leading-relaxed">
              No middleman commissions. Buy directly from our Bawana Delhi manufacturing plant with high profit margins for dealers.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-platinum-gray/60 shadow-sm space-y-3">
            <Award className="w-8 h-8 text-heritage-red" />
            <h2 className="font-display font-bold text-lg text-charcoal-matte">ISI Certified Quality</h2>
            <p className="text-xs text-charcoal-matte/70 leading-relaxed">
              Every pressure cooker and triply cookware piece complies with Bureau of Indian Standards (IS 2347) safety guidelines.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-platinum-gray/60 shadow-sm space-y-3">
            <Truck className="w-8 h-8 text-heritage-red" />
            <h2 className="font-display font-bold text-lg text-charcoal-matte">Pan-India Supply Chain</h2>
            <p className="text-xs text-charcoal-matte/70 leading-relaxed">
              Robust logistics network dispatching wholesale orders swiftly across Delhi NCR, Punjab, UP, Maharashtra, Gujarat & All India.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-platinum-gray/60 shadow-sm space-y-3">
            <ShieldCheck className="w-8 h-8 text-heritage-red" />
            <h2 className="font-display font-bold text-lg text-charcoal-matte">Marketing & Sales Support</h2>
            <p className="text-xs text-charcoal-matte/70 leading-relaxed">
              Receive complete brand catalogs, POS display assets, promotional banners, and dedicated B2B relationship managers.
            </p>
          </div>
        </div>

        {/* Dealer Application Form & Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl border border-platinum-gray/80 shadow-md space-y-6">
            <div>
              <h2 className="font-display font-black text-2xl text-charcoal-matte uppercase tracking-wide">
                B2B Dealership Application
              </h2>
              <p className="text-xs text-charcoal-matte/60 mt-1">
                Fill in your company details below. Our wholesale team will respond within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-matte/80 mb-1.5">
                    Business / Firm Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g. Royal Kitchenware Pvt Ltd"
                    className="w-full px-4 py-3 bg-surface-container-low rounded-xl border border-platinum-gray text-xs focus:ring-2 focus:ring-heritage-red focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-matte/80 mb-1.5">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    placeholder="e.g. Ramesh Chand"
                    className="w-full px-4 py-3 bg-surface-container-low rounded-xl border border-platinum-gray text-xs focus:ring-2 focus:ring-heritage-red focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-matte/80 mb-1.5">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 9876543210"
                    className="w-full px-4 py-3 bg-surface-container-low rounded-xl border border-platinum-gray text-xs focus:ring-2 focus:ring-heritage-red focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-matte/80 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. rameshchand123@gmail.com"
                    className="w-full px-4 py-3 bg-surface-container-low rounded-xl border border-platinum-gray text-xs focus:ring-2 focus:ring-heritage-red focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-matte/80 mb-1.5">
                    City / Town *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Ludhiana / Ahmedabad"
                    className="w-full px-4 py-3 bg-surface-container-low rounded-xl border border-platinum-gray text-xs focus:ring-2 focus:ring-heritage-red focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-matte/80 mb-1.5">
                    State / Union Territory *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="e.g. Punjab / Gujarat / Delhi"
                    className="w-full px-4 py-3 bg-surface-container-low rounded-xl border border-platinum-gray text-xs focus:ring-2 focus:ring-heritage-red focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-matte/80 mb-1.5">
                  Business Message / Anticipated Monthly Order Volume
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Mention your target market, store type, or initial quantity requirements..."
                  className="w-full px-4 py-3 bg-surface-container-low rounded-xl border border-platinum-gray text-xs focus:ring-2 focus:ring-heritage-red focus:outline-none"
                />
              </div>

              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#25D366] text-white hover:bg-[#20ba5a] text-xs font-black uppercase tracking-widest py-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Dealership Inquiry via WhatsApp</span>
                </button>

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-platinum-gray/40"></div>
                  <span className="flex-shrink mx-4 font-karla text-[10px] text-tertiary font-bold">OR</span>
                  <div className="flex-grow border-t border-platinum-gray/40"></div>
                </div>

                <button
                  type="button"
                  onClick={handleEmailInquiry}
                  className="w-full bg-charcoal-matte text-white hover:bg-heritage-red text-xs font-black uppercase tracking-widest py-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Dealership Proposal</span>
                </button>
              </div>

              {submitted && (
                <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded-xl text-xs flex items-center gap-2 font-medium">
                  <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                  <span>Inquiry sent! Opening direct WhatsApp session with Geetanjali Sales Desk...</span>
                </div>
              )}
            </form>
          </div>

          {/* Plant & Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-charcoal-matte text-white p-8 rounded-3xl space-y-6 shadow-xl">
              <h3 className="font-display font-black text-xl uppercase tracking-wider text-white">
                Office &amp; Plant Details
              </h3>

              <div className="space-y-4 text-xs leading-relaxed text-platinum-gray/90 font-sans">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-heritage-red shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-sm font-bold">Harsh Home Appliances</strong>
                    <span>(Geetanjali Home Appliances)</span>
                    <p className="mt-1 text-white/80">K-11, Bawana Industrial Area, Sector-2, Delhi - 110039, India</p>
                    <a 
                      href="https://maps.app.goo.gl/grN486gj6NaSXp7r8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-heritage-red font-bold hover:underline mt-2"
                    >
                      <span>View Office Location on Google Maps →</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-heritage-red shrink-0" />
                  <div>
                    <strong className="text-white block text-sm font-bold">Sales & Dealership Phone:</strong>
                    <a href="tel:+919205293094" className="hover:text-heritage-red text-white transition-colors">
                      +91 9205293094
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-heritage-red shrink-0" />
                  <div>
                    <strong className="text-white block text-sm font-bold">Official B2B Email:</strong>
                    <a href="mailto:geetanjalihomeappliances.india@gmail.com" className="hover:text-heritage-red text-white transition-colors break-all">
                      geetanjalihomeappliances.india@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 text-xs text-white/70 space-y-2">
                <p><strong>Minimum Order Quantity (MOQ):</strong> Flexible for certified retail store owners and distributors.</p>
                <p><strong>Shipping:</strong> Safe wooden crate / heavy box packing dispatched via top national logistics partners.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-platinum-gray/80 shadow-sm space-y-3">
              <h4 className="font-display font-bold text-sm text-charcoal-matte uppercase tracking-wide">
                Product Catalog & Series
              </h4>
              <ul className="text-xs space-y-2 text-charcoal-matte/75 font-sans">
                <li>• <strong>Pressure Cookers:</strong> Trinity (Triply), Stello (SS 304), Black Beauty (Anodized), Alex (Aluminium). Sizes 1.5L to 22L.</li>
                <li>• <strong>Triply Cookware:</strong> Trident Series (Kadhai, Tasra, Tope, Saucepan, Stewpan, Frypan).</li>
                <li>• <strong>Honeycomb Cookware:</strong> Tricomb Series (Roti Tawa, Dosa Tawa, Frypan, Kadhai, Tasra).</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
