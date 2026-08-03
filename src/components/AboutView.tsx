import React from 'react';
import { PageType } from '../types';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Mail, Award, CheckCircle2, ShieldCheck } from 'lucide-react';

interface AboutViewProps {
  onNavigate: (page: PageType) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Geetanjali Home Appliances",
    "legalName": "Harsh Home Appliances",
    "url": "https://geetanjalihomeappliances.com/about",
    "logo": "https://lh3.googleusercontent.com/d/1quPptK4LJc0Aw--sAW0y2d4CMUlR-WTQ",
    "foundingDate": "1997",
    "founders": [
      {
        "@type": "Person",
        "name": "Harsh Home Appliances Management"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "K-11, Sector-2, Bawana Industrial Area",
      "addressLocality": "Delhi",
      "postalCode": "110039",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9205293094",
      "contactType": "customer service",
      "email": "geetanjalihomeappliances.india@gmail.com",
      "areaServed": "IN",
      "availableLanguage": ["en", "hi"]
    }
  };

  return (
    <div className="w-full bg-background overflow-hidden">
      <Helmet>
        <title>About Us | Geetanjali Home Appliances (Harsh Home Appliances Delhi)</title>
        <meta 
          name="description" 
          content="Discover Geetanjali Home Appliances - manufactured by Harsh Home Appliances, K-11 Bawana Industrial Area Sector-2 Delhi. 30+ years of industrial pressure cooker & cookware manufacturing mastery." 
        />
        <meta 
          name="keywords" 
          content="Geetanjali Home Appliances, Harsh Home Appliances, pressure cooker manufacturer Delhi, Bawana industrial area cookware, 30 years cookware experience India" 
        />
        <link rel="canonical" href="https://geetanjalihomeappliances.com/about" />
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>
      {/* Hero Banner with Ken Burns effect and luxurious title */}
      <section className="relative w-full h-[65vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <motion.img 
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="w-full h-full object-cover select-none" 
            alt="Minimalist modern kitchen with soft lighting."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCw3kSBQbfdITqKjD7PzTow6fpS_Y2PtlNEIM2nf-MDLUsrlWr_zgdLGw78N91gkbVP1S5mzm94dp6ET18AhVzP_RdYD3JI3C66f1_6CrDA5RQNB6u3OShXf41Fn9H30NBx-c_-RfWUMVhWg8CFbMcYmPILfOrjY8lkR3KmIt6bgQpfyxCaa5pIlds36IgeTkotZacRzSHxkYqJ1kvEDC9ZwAf_MEWJhQgWMTgCRCjkk5CZXwm2o0Xde8kDXA0CmJxcP6s-LwlUwii5"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-matte/90 via-charcoal-matte/55 to-charcoal-matte/10"></div>
        </div>
        <div className="relative z-10 w-full px-6 md:px-16 pb-16 max-w-[1440px] mx-auto text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="space-y-4"
          >
            <span className="font-karla text-xs text-golden-ochre uppercase tracking-[0.25em] block font-bold">
              Our Legacy
            </span>
            <h1 className="font-display text-4xl md:text-6.5xl text-white tracking-tight leading-tight max-w-3xl">
              A Quarter Century of <span className="text-heritage-red italic font-medium">Living Art</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Philosophy block */}
      <section className="py-24 px-6 md:px-16 max-w-[1000px] mx-auto text-center">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-karla text-xs text-golden-ochre tracking-[0.2em] uppercase mb-4 block font-bold"
        >
          Established in 1997
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-display text-3xl md:text-4.5xl italic text-charcoal-matte mb-8 leading-relaxed font-light"
        >
          "We do not merely assemble vessels. We forge the <span className="text-heritage-red not-italic font-semibold font-display">permanent artifacts</span> of domestic life."
        </motion.h2>
        <div className="w-20 h-[2px] bg-heritage-red mx-auto mb-10"></div>
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="font-sans text-charcoal-matte/80 max-w-3xl mx-auto leading-loose text-base md:text-lg"
        >
          From our founding in 1997, Geetanjali has held a quiet, humble ambition: to elevate the everyday tools of preparation into physical statements of durability and beauty. Rejecting transient design trends, our architectural silhouettes are built to endure across generations.
        </motion.p>
      </section>

      {/* Figured Exhibits Section (Asymmetrical Editorial Grid) */}
      <section className="py-24 px-6 md:px-16 max-w-[1440px] mx-auto bg-surface-container-low border-y border-platinum-gray/30">
        <div className="space-y-32 md:space-y-48">
          {/* Exhibit A: Tactile Interaction */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 order-2 lg:order-1 bg-white p-6 md:p-8 museum-border rounded-2xl shadow-md border border-platinum-gray/20 hover:shadow-xl transition-all duration-300"
            >
              <img 
                src="https://lh3.googleusercontent.com/d/1u97jp0KPqVuzDicS5J7b_OJRxovWAl0O" 
                alt="Tactile Interaction with premium components" 
                className="w-full h-auto max-h-[450px] object-cover rounded-xl mx-auto"
                referrerPolicy="no-referrer"
              />
              <span className="block font-mono text-[10px] text-tertiary mt-4 text-center tracking-wider">
                Fig. 01 — Tactile Interaction. A study of human connection with high-grade stainless steel components.
              </span>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-start-8 lg:col-span-4 order-1 lg:order-2 space-y-6"
            >
              <span className="font-karla text-xs text-golden-ochre uppercase tracking-[0.2em] block font-bold">
                Chapter I
              </span>
              <h3 className="font-display text-2xl md:text-3xl text-charcoal-matte tracking-tight">
                The Touch of Permanence
              </h3>
              <p className="font-sans text-sm md:text-base text-charcoal-matte/80 leading-relaxed">
                Our design cycle begins not with blueprints, but with raw touch. The curvature of our cool-touch bakelite handles is meticulously contoured to reduce wrist strain while offering an authoritative, balanced grip.
              </p>
              <p className="font-sans text-sm md:text-base text-charcoal-matte/70 leading-relaxed">
                We believe that premium cooking tools should speak in silence—communicating structural integrity through density, weight, and the precise mechanical snap of safety locks.
              </p>
            </motion.div>
          </div>

          {/* Exhibit B: Micron-Perfect Seals */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-4 space-y-6"
            >
              <span className="font-karla text-xs text-golden-ochre uppercase tracking-[0.2em] block font-bold">
                Chapter II
              </span>
              <h3 className="font-display text-2xl md:text-3xl text-charcoal-matte tracking-tight">
                Micron-Perfect Seals
              </h3>
              <p className="font-sans text-sm md:text-base text-charcoal-matte/80 leading-relaxed">
                Under pressure, there is zero tolerance for error. Our lid grooves and premium food-grade gaskets are manufactured to tolerances under 5 microns. This ensures immediate pressure retention and maximum nutrient preservation.
              </p>
              <p className="font-sans text-sm md:text-base text-charcoal-matte/70 leading-relaxed">
                Featuring double safety release mechanisms, including a spring-loaded auxiliary valve, our cookers safeguard your household while reducing energy usage by up to 40%.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-start-7 lg:col-span-6 bg-white p-6 md:p-8 museum-border rounded-2xl shadow-md border border-platinum-gray/20 hover:shadow-xl transition-all duration-300"
            >
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDU_Drewz4jTvnl6KSVmudt-3nE1aSj80dZO7O5lNmTyAG0iOIrlNh_3XyBaQwDw8EYM7S-shQRRj53XZQdFQj6-aHN2y-aY3SXY67-fFLmFcigj8_-r0sUgX_sKitMkS4anMa9Tn_lfrjgy4-tevggZczReDkvwQUi2KSGoI4jvrX6ibBQnPpCHvJf0lmF1zkmxqAt0qbiwFMxVrrqqZZhmRtqvdCTBPiHp5UXYbsQb9daknYu2Ypin24c8NGjoULqK3iW4x99hPPU" 
                alt="Gaskets and sealing valves detail" 
                className="w-full h-auto max-h-[450px] object-cover rounded-xl mx-auto"
                referrerPolicy="no-referrer"
              />
              <span className="block font-mono text-[10px] text-tertiary mt-4 text-center tracking-wider">
                Fig. 02 — Micron-Perfect Seals. Pressure retention optimized through precision gaskets and aerospace-grade valves.
              </span>
            </motion.div>
          </div>

          {/* Exhibit C: Architectural Utility */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 order-2 lg:order-1 bg-white p-6 md:p-8 museum-border rounded-2xl shadow-md border border-platinum-gray/20 hover:shadow-xl transition-all duration-300"
            >
              <img 
                src="https://lh3.googleusercontent.com/d/1YjXYHgcHg-Ryi2uDHv2Ikq1b2_NGytmo" 
                alt="Finished vessel with architectural silhouettes" 
                className="w-full h-auto max-h-[450px] object-cover rounded-xl mx-auto"
                referrerPolicy="no-referrer"
              />
              <span className="block font-mono text-[10px] text-tertiary mt-4 text-center tracking-wider">
                Fig. 03 — Architectural Utility. The definitive statement in pressure cooking technology.
              </span>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-start-8 lg:col-span-4 order-1 lg:order-2 space-y-6"
            >
              <span className="font-karla text-xs text-golden-ochre uppercase tracking-[0.2em] block font-bold">
                Chapter III
              </span>
              <h3 className="font-display text-2xl md:text-3xl text-charcoal-matte tracking-tight">
                Timeless Geometry
              </h3>
              <p className="font-sans text-sm md:text-base text-charcoal-matte/80 leading-relaxed">
                From high-polish mirror stainless steels to bold, matte black anodized bodies, our vessels serve as permanent centerpieces in contemporary culinary sanctuaries.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('pressure-cookers')}
                  className="bg-charcoal-matte text-white py-4 px-8 font-sans text-[10px] font-bold tracking-widest rounded-full hover:bg-heritage-red hover:shadow-lg transition-all duration-300 focus:outline-none cursor-pointer uppercase"
                >
                  BROWSE ARCHIVAL MODELS
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brand Facts & Official Specifications Section */}
      <section className="py-20 px-6 md:px-16 max-w-[1440px] mx-auto bg-white border-t border-platinum-gray/20">
        <div className="space-y-12">
          {/* Factual Statement Card & Brand Specifications */}
          <div className="bg-surface-container-low rounded-2xl border border-platinum-gray/40 p-8 md:p-12 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-platinum-gray/20 pb-6">
              <div>
                <span className="font-karla text-xs text-heritage-red uppercase tracking-[0.2em] font-bold block">
                  Official Manufacturer Profile & Brand Specifications
                </span>
                <h3 className="font-display text-2xl md:text-3xl text-charcoal-matte font-bold mt-1">
                  Geetanjali Home Appliances (Harsh Home Appliances)
                </h3>
              </div>
              <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3.5 py-1.5 rounded-full text-xs font-semibold border border-emerald-200 w-fit shrink-0">
                <ShieldCheck size={16} />
                <span>ISI Marked & BIS IS 2347 Certified</span>
              </div>
            </div>

            <p className="font-sans text-sm md:text-base text-charcoal-matte/85 leading-relaxed font-medium">
              Geetanjali Home Appliances, manufactured by Harsh Home Appliances, is a pressure cooker and cookware manufacturer based in Bawana, Delhi, with over 30 years of manufacturing experience. Geetanjali Home Appliances is the flagship brand of Harsh Home Appliances. Geetanjali products are ISI certified and shipped pan-India. Geetanjali manufactures pressure cookers ranging from 1.5 litres to 22 litres across four series: Trinity (Triply), Stello (Stainless Steel), Black Beauty (Hard Anodized), and Alex (Aluminium).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="bg-surface-container-lowest p-5 rounded-xl border border-platinum-gray/30">
                <span className="font-bold text-xs uppercase tracking-wider text-heritage-red block mb-2">
                  Product Range
                </span>
                <p className="text-xs text-charcoal-matte/80 leading-relaxed">
                  Geetanjali manufactures pressure cookers ranging from 1.5 litres to 22 litres across four series: Trinity (Triply), Stello (Stainless Steel), Black Beauty (Hard Anodized), and Alex (Aluminium).
                </p>
              </div>

              <div className="bg-surface-container-lowest p-5 rounded-xl border border-platinum-gray/30">
                <span className="font-bold text-xs uppercase tracking-wider text-golden-ochre block mb-2">
                  Cookware Innovation
                </span>
                <p className="text-xs text-charcoal-matte/80 leading-relaxed">
                  Trident Series 3-ply clad cookware (SS 304 + Aluminum + SS 430) and Tricomb hybrid Honeycomb non-stick cookware (100% metal spatula safe & scratch-proof).
                </p>
              </div>

              <div className="bg-surface-container-lowest p-5 rounded-xl border border-platinum-gray/30">
                <span className="font-bold text-xs uppercase tracking-wider text-emerald-700 block mb-2">
                  Office &amp; Shipping Details
                </span>
                <p className="text-xs text-charcoal-matte/80 leading-relaxed">
                  Plant &amp; Office Address: K-11, Sector-2, Bawana Industrial Area, Delhi - 110039. Pan-India shipping coverage for wholesale, retail, and direct factory orders.
                </p>
                <a 
                  href="https://maps.app.goo.gl/grN486gj6NaSXp7r8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-heritage-red font-bold hover:underline mt-2"
                >
                  <MapPin size={12} />
                  <span>View Office Location on Google Maps</span>
                </a>
              </div>
            </div>
          </div>

          {/* Press & Industry Accolades */}
          <div className="space-y-6">
            <h3 className="font-display text-2xl text-charcoal-matte font-bold">
              Press, Accolades & Quality Certifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-surface-container-lowest rounded-xl border border-platinum-gray/30 space-y-2">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                  <Award size={18} />
                  <span>BIS IS 2347 Certification</span>
                </div>
                <h4 className="font-sans font-semibold text-sm text-charcoal-matte">
                  Official ISI Quality Seal
                </h4>
                <p className="text-xs text-charcoal-matte/75 leading-relaxed">
                  Every Geetanjali pressure cooker is tested and certified under Indian Standard IS 2347, ensuring multi-tier safety release mechanisms and food-grade metallurgy.
                </p>
              </div>

              <div className="p-6 bg-surface-container-lowest rounded-xl border border-platinum-gray/30 space-y-2">
                <div className="flex items-center gap-2 text-golden-ochre font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 size={18} />
                  <span>ISO 9001:2015 Compliant</span>
                </div>
                <h4 className="font-sans font-semibold text-sm text-charcoal-matte">
                  Quality Management Excellence
                </h4>
                <p className="text-xs text-charcoal-matte/75 leading-relaxed">
                  Automated hydraulic deep-drawing, 100% pneumatic pressure testing, and precision laser etching procedures in Bawana Industrial Area, Delhi.
                </p>
              </div>

              <div className="p-6 bg-surface-container-lowest rounded-xl border border-platinum-gray/30 space-y-2">
                <div className="flex items-center gap-2 text-heritage-red font-bold text-xs uppercase tracking-wider">
                  <MapPin size={18} />
                  <span>Pan-India Distribution</span>
                </div>
                <h4 className="font-sans font-semibold text-sm text-charcoal-matte">
                  Industrial Heritage Recognition
                </h4>
                <p className="text-xs text-charcoal-matte/75 leading-relaxed">
                  Recognized as a premier pressure cooker and triply cookware manufacturing unit in Delhi NCR, supplying wholesale distributors and retail partners across India.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
