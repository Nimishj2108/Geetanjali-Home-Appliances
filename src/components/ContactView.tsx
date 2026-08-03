import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, MessageSquare } from 'lucide-react';
import { InquiryFormState } from '../types';
import { Helmet } from 'react-helmet-async';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState<InquiryFormState>({
    fullName: '',
    email: '',
    subject: 'General Product Inquiry',
    message: '',
  });

  const [validationError, setValidationError] = useState('');

  const generateWhatsAppMessage = () => {
    let text = `*Geetanjali Home Appliances - Contact Inquiry*\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `*Subject:* ${formData.subject}\n\n`;
    text += `*Message:*\n${formData.message}\n\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `*Customer Details:*\n`;
    text += `• Name: ${formData.fullName}\n`;
    text += `• Email: ${formData.email}\n\n`;
    text += `Thank you!`;
    return text;
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setValidationError('Please enter your full name.');
      return false;
    }
    if (!formData.email.trim()) {
      setValidationError('Please enter your email address.');
      return false;
    }
    if (!formData.message.trim()) {
      setValidationError('Please enter your message details.');
      return false;
    }
    setValidationError('');
    return true;
  };

  const handleWhatsAppInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    const text = generateWhatsAppMessage();
    window.open(`https://wa.me/919205293094?text=${encodeURIComponent(text)}`, '_blank');
    window.dispatchEvent(new CustomEvent('whatsapp-inquiry-sent', { detail: { text } }));
  };

  const handleEmailInquiry = () => {
    if (!validateForm()) return;
    const text = generateWhatsAppMessage();
    const subject = encodeURIComponent(`Geetanjali Home Appliances - ${formData.subject} (${formData.fullName})`);
    window.open(`mailto:geetanjalihomeappliances.india@gmail.com?subject=${subject}&body=${encodeURIComponent(text)}`, '_blank');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (validationError) setValidationError('');
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Geetanjali Home Appliances",
    "legalName": "Harsh Home Appliances",
    "image": "https://lh3.googleusercontent.com/d/1quPptK4LJc0Aw--sAW0y2d4CMUlR-WTQ",
    "description": "Leading Pressure Cooker and Cookware Manufacturer in Delhi NCR with 30+ years manufacturing experience. ISI Certified pressure cookers and triply honeycomb cookware.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "K-11, Bawana Industrial Area, Sector-2",
      "addressLocality": "Delhi",
      "addressRegion": "Delhi NCR",
      "postalCode": "110039",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.7972,
      "longitude": 77.0422
    },
    "url": "https://geetanjalihomeappliances.com/contact",
    "telephone": "+91-9205293094",
    "email": "geetanjalihomeappliances.india@gmail.com",
    "sameAs": [
      "https://www.instagram.com/geetanjalihomeappliancesindia",
      "https://www.facebook.com/geetanjalihomeappliancesindia",
      "https://www.youtube.com/@GeetanjaliHomeAppliances",
      "https://x.com/GeetanjaliHAI",
      "https://www.linkedin.com/in/geetanjali-home-appliances-480011426"
    ],
    "priceRange": "₹₹",
    "openingHours": "Mo-Sa 09:00-19:00"
  };

  return (
    <div className="w-full">
      <Helmet>
        <title>Contact Us | Geetanjali Home Appliances Bawana Delhi NCR</title>
        <meta 
          name="description" 
          content="Contact Geetanjali Home Appliances (Harsh Home Appliances) at K-11, Bawana Industrial Area, Sector-2, Delhi - 110039. Phone: +91 9205293094 | Email: geetanjalihomeappliances.india@gmail.com" 
        />
        <meta 
          name="keywords" 
          content="contact pressure cooker manufacturer Delhi, Bawana industrial area cookware factory, Geetanjali phone number, Harsh home appliances address" 
        />
        <link rel="canonical" href="https://geetanjalihomeappliances.com/contact" />
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>

      {/* Header Banner */}
      <section className="bg-surface-container-low py-16 border-b border-platinum-gray/30 text-center">
        <div className="max-w-[800px] mx-auto px-6 leading-[26.5px]">
          <span className="font-karla text-[12px] font-bold text-secondary uppercase tracking-[0.2em] mb-3 block">
            Factory Direct Communication
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-black text-heritage-red mb-4 uppercase tracking-tight">
            Contact Geetanjali Home Appliances
          </h1>
          <p className="font-body-md text-sm text-charcoal-matte/80 leading-relaxed max-w-2xl mx-auto">
            Whether you are ordering individual kitchenware or planning a regional distribution dealership, our Bawana, Delhi manufacturing team is ready to assist.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-16 px-6 md:px-16 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 museum-border rounded-2xl shadow-sm">
            <h2 className="font-display font-bold text-2xl text-charcoal-matte mb-1">Submit an Inquiry</h2>
            <p className="font-karla text-[10px] text-tertiary uppercase mb-8 tracking-wider font-semibold">
              We respond to all verified customer &amp; dealer inquiries within 24 business hours
            </p>

            <form onSubmit={handleWhatsAppInquiry} className="space-y-6">
              <div>
                <label className="block font-karla text-[10px] uppercase tracking-wider text-charcoal-matte mb-2 font-bold">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full bg-surface-container-low border border-platinum-gray rounded-xl p-4 text-xs focus:border-heritage-red focus:outline-none transition-colors"
                  placeholder="e.g. Ramesh Chand"
                />
              </div>

              <div>
                <label className="block font-karla text-[10px] uppercase tracking-wider text-charcoal-matte mb-2 font-bold">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-surface-container-low border border-platinum-gray rounded-xl p-4 text-xs focus:border-heritage-red focus:outline-none transition-colors"
                  placeholder="e.g. rameshchand123@gmail.com"
                />
              </div>

              <div>
                <label className="block font-karla text-[10px] uppercase tracking-wider text-charcoal-matte mb-2 font-bold">
                  Subject of Inquiry
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full bg-surface-container-low border border-platinum-gray rounded-xl p-4 text-xs focus:border-heritage-red focus:outline-none transition-colors appearance-none"
                >
                  <option value="General Product Inquiry">General Product Inquiry</option>
                  <option value="Wholesale & Dealership Application">Wholesale &amp; Dealership Application</option>
                  <option value="Bulk Order & Export Request">Bulk Order &amp; Export Request</option>
                  <option value="Service & Warranty Claim">Service &amp; Warranty Claim</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block font-karla text-[10px] uppercase tracking-wider text-charcoal-matte mb-2 font-bold">
                  Message Details *
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-surface-container-low border border-platinum-gray rounded-xl p-4 text-xs focus:border-heritage-red focus:outline-none transition-colors resize-none"
                  placeholder="Please specify series, sizes (1.5L to 22L), or dealership location..."
                />
              </div>

              {validationError && (
                <p className="text-heritage-red text-xs mt-1 font-sans font-medium">
                  {validationError}
                </p>
              )}

              <div className="space-y-4 pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#25D366] text-white py-4 font-sans text-xs tracking-widest uppercase hover:bg-[#20ba5a] transition-all rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98] focus:outline-none cursor-pointer font-bold"
                >
                  <MessageSquare size={14} />
                  SEND VIA WHATSAPP
                </button>

                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-platinum-gray/40"></div>
                  <span className="flex-shrink mx-4 font-karla text-[10px] text-tertiary font-bold">OR</span>
                  <div className="flex-grow border-t border-platinum-gray/40"></div>
                </div>

                <button
                  type="button"
                  onClick={handleEmailInquiry}
                  className="w-full bg-charcoal-matte text-white py-4 font-sans text-xs tracking-widest uppercase hover:bg-heritage-red transition-all rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98] focus:outline-none cursor-pointer font-bold"
                >
                  <Mail size={14} />
                  EMAIL INQUIRY
                </button>
              </div>
            </form>
          </div>

          {/* Contact Details & Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-surface-container p-8 rounded-2xl border border-platinum-gray/30 space-y-6">
              <h3 className="font-display font-bold text-lg text-heritage-red uppercase tracking-wide">
                Office &amp; Plant Details
              </h3>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <MapPin size={22} className="text-heritage-red flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-charcoal-matte">Office &amp; Plant Address</h4>
                    <p className="text-xs text-charcoal-matte/90 leading-relaxed mt-1">
                      <strong>Harsh Home Appliances</strong> <br />
                      (Geetanjali Home Appliances) <br />
                      K-11, Bawana Industrial Area, Sector-2, Delhi - 110039, India
                    </p>
                    <a 
                      href="https://maps.app.goo.gl/grN486gj6NaSXp7r8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-heritage-red font-bold hover:underline mt-2"
                    >
                      <MapPin size={13} />
                      <span>View Office Location on Google Maps</span>
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone size={22} className="text-heritage-red flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-charcoal-matte">Phone Hotline</h4>
                    <div className="flex flex-col text-xs text-charcoal-matte/90 font-mono mt-1 space-y-1">
                      <a href="tel:+919205293094" className="hover:text-heritage-red transition-colors">
                        +91 9205293094
                      </a>
                      <a href="tel:+918287634365" className="hover:text-heritage-red transition-colors">
                        +91 8287634365
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Mail size={22} className="text-heritage-red flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-charcoal-matte">Email Support</h4>
                    <a 
                      href="mailto:geetanjalihomeappliances.india@gmail.com" 
                      className="text-xs text-heritage-red font-semibold hover:underline transition-colors mt-1 block break-all"
                    >
                      geetanjalihomeappliances.india@gmail.com
                    </a>
                  </div>
                </div>

                {/* Social Channels */}
                <div className="pt-2 border-t border-platinum-gray/40">
                  <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-charcoal-matte mb-3">Connect On Social Media</h4>
                  <div className="flex flex-wrap gap-2.5">
                    <a 
                      href="https://wa.me/919205293094"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-[#25D366] text-white hover:opacity-90 transition-opacity flex items-center justify-center shadow-xs"
                      title="WhatsApp Direct (+91 9205293094)"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12.004 2c-5.514 0-10 4.486-10 10 0 1.914.542 3.697 1.472 5.215l-1.472 5.385 5.514-1.448c1.442.822 3.102 1.296 4.869 1.296 5.514 0 10-4.486 10-10s-4.486-10-10-10zm.013 18c-1.696 0-3.267-.481-4.606-1.31l-.33-.205-3.076.808.823-3.008-.225-.357c-.901-1.433-1.423-3.134-1.423-4.928 0-4.821 3.921-8.742 8.742-8.742s8.742 3.921 8.742 8.742-3.921 8.742-8.742 8.742zm4.186-6.104c-.23-.115-1.357-.669-1.567-.746-.21-.077-.363-.115-.517.115-.154.23-.594.746-.728.899-.134.153-.268.172-.498.057-.23-.115-.972-.358-1.851-1.142-.684-.61-1.146-1.364-1.28-1.595-.134-.23-.014-.354.101-.469.103-.103.23-.268.345-.402.115-.134.153-.23.23-.383.077-.153.038-.287-.019-.402-.057-.115-.517-1.245-.708-1.705-.186-.448-.376-.387-.517-.394-.134-.007-.287-.007-.44-.007-.153 0-.402.057-.613.287-.21.23-.804.785-.804 1.916 0 1.13.823 2.222.938 2.375.115.153 1.62 2.473 3.924 3.465.548.236.976.377 1.31.482.55.174 1.05.15 1.446.091.44-.067 1.357-.555 1.548-1.091.191-.536.191-.995.134-1.091-.057-.096-.21-.153-.44-.268z" />
                      </svg>
                    </a>
                    <a 
                      href="https://www.facebook.com/geetanjalihomeappliancesindia"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-[#1877F2] text-white hover:opacity-90 transition-opacity flex items-center justify-center shadow-xs"
                      title="Facebook (@geetanjalihomeappliancesindia)"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                      </svg>
                    </a>
                    <a 
                      href="https://www.youtube.com/@GeetanjaliHomeAppliances"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-[#FF0000] text-white hover:opacity-90 transition-opacity flex items-center justify-center shadow-xs"
                      title="YouTube (@GeetanjaliHomeAppliances)"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.507 9.388.507 9.388.507s7.517 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                    <a 
                      href="https://x.com/GeetanjaliHAI"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-black text-white hover:opacity-90 transition-opacity flex items-center justify-center shadow-xs"
                      title="X (@GeetanjaliHAI)"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/geetanjali-home-appliances-480011426"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-[#0A66C2] text-white hover:opacity-90 transition-opacity flex items-center justify-center shadow-xs"
                      title="LinkedIn (geetanjali-home-appliances)"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                    <a 
                      href="https://www.instagram.com/geetanjalihomeappliancesindia"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-white hover:opacity-90 transition-opacity flex items-center justify-center shadow-xs"
                      title="Instagram (@geetanjalihomeappliancesindia)"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Embedded iframe for Bawana Industrial Area Sector-2 Delhi */}
            <div className="bg-white p-3 rounded-2xl border border-platinum-gray/80 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2 flex-wrap gap-2">
                <h4 className="font-display font-bold text-xs text-charcoal-matte uppercase tracking-wide">
                  Office Details — Bawana, Delhi NCR
                </h4>
                <a 
                  href="https://maps.app.goo.gl/grN486gj6NaSXp7r8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-heritage-red hover:underline"
                >
                  <MapPin size={12} />
                  <span>Open Maps Link</span>
                </a>
              </div>
              <div className="w-full h-64 rounded-xl overflow-hidden border border-platinum-gray/40">
                <iframe
                  title="Geetanjali Home Appliances Office Details Bawana Delhi"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3496.113289052066!2d77.04221127632616!3d28.79720497557874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d099ecbc2e4a3%3A0xc391e45995256e2e!2sBawana%20Industrial%20Area%2C%20Sector%202%2C%20Bawana%2C%20Delhi%2C%20110039!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

