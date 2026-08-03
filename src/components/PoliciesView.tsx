import React, { useState } from 'react';
import { ShieldCheck, RefreshCw, Truck, FileText, CheckCircle2, MessageSquare, AlertTriangle } from 'lucide-react';

interface PolicyTab {
  id: string;
  label: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const PoliciesView: React.FC<{ initialPolicyTab?: string }> = ({ initialPolicyTab = 'refund' }) => {
  const [activeTab, setActiveTab] = useState<string>(initialPolicyTab);

  const tabs: PolicyTab[] = [
    {
      id: 'refund',
      label: 'Refund & Return Policy',
      icon: <RefreshCw size={16} />,
      title: 'Refund, Return & Exchange Framework',
      description: 'Transparent parameters regarding order cancellations, exchanges, and verified unboxing guidelines.'
    },
    {
      id: 'shipping',
      label: 'Shipping & Delivery Policy',
      icon: <Truck size={16} />,
      title: 'WhatsApp Inquiry & Logistics Sequence',
      description: 'How we coordinate safe shipments, transit times, and regional dispatch directly via WhatsApp.'
    },
    {
      id: 'terms',
      label: 'Terms & Conditions',
      icon: <FileText size={16} />,
      title: 'Terms of Use & Ordering Standards',
      description: 'Operational guidelines regarding order matching, prices, and authorized direct sales.'
    },
    {
      id: 'privacy',
      label: 'Privacy Policy',
      icon: <ShieldCheck size={16} />,
      title: 'User Privacy & Data Security standards',
      description: 'How we manage direct messages, secure inquiries, and personal details shared via WhatsApp.'
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'refund':
        return (
          <div className="space-y-6 text-left text-charcoal-matte">
            <div className="border-l-4 border-heritage-red bg-heritage-red/5 p-4 rounded-r-lg">
              <h3 className="font-display font-bold text-sm text-heritage-red flex items-center gap-2">
                <AlertTriangle size={16} />
                CRITICAL DIRECTIVE: STRICT EXCHANGE-ONLY POLICY
              </h3>
              <p className="text-xs text-charcoal-matte/80 leading-relaxed mt-1.5">
                Please review our strict verification rules before placing any inquiry. <strong>No return, no exchange, and no refunds</strong> are possible under standard circumstances. Only pre-discussed exchanges for structural issues with verified unboxing video proof will be considered.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-display font-semibold text-base">1. The Prior Discussion & Issue Rule</h4>
              <p className="text-xs text-charcoal-matte/70 leading-relaxed">
                Returns and refunds are strictly <strong>NOT</strong> supported for subjective reasons (such as changing your mind, sizing choices made incorrectly, or design preference). We only facilitate replacements/exchanges after a <strong>prior discussion</strong> and complete review of a verified material defect or shipping damage.
              </p>

              <h4 className="font-display font-semibold text-base">2. Mandated Unboxing Video Requirement</h4>
              <p className="text-xs text-charcoal-matte/70 leading-relaxed">
                To claim an exchange under structural issue grounds, you must record a single, continuous, unedited <strong>unboxing video</strong> from the absolute start of unpacking. The video must clearly show:
              </p>
              <ul className="list-disc pl-5 text-xs text-charcoal-matte/70 space-y-2 mt-1">
                <li>The shipping label and all outer security tapes completely sealed prior to cutting.</li>
                <li>The physical removal of the vessel and all accompanying components (gasket, weight, whistle).</li>
                <li>Close-up footage proving the structural issue under clear light.</li>
              </ul>
              <p className="text-xs text-charcoal-matte/70 italic mt-2">
                *Failure to provide a continuous, high-resolution unboxing video will automatically invalidate any claims for exchange.
              </p>

              <h4 className="font-display font-semibold text-base">3. Absolutely No Refund Guarantee</h4>
              <p className="text-xs text-charcoal-matte/70 leading-relaxed">
                Under no circumstance do we issue cash or direct digital refunds. In approved cases where a product holds a validated issue, we will exclusively coordinate a direct 1-to-1 <strong>product exchange</strong> for the identical SKU or an equivalent alternative.
              </p>
            </div>
          </div>
        );

      case 'shipping':
        return (
          <div className="space-y-6 text-left text-charcoal-matte">
            <div className="border-l-4 border-golden-ochre bg-golden-ochre/5 p-4 rounded-r-lg">
              <h3 className="font-display font-bold text-sm text-golden-ochre flex items-center gap-2">
                <MessageSquare size={16} />
                WhatsApp Ordering Workflow
              </h3>
              <p className="text-xs text-charcoal-matte/80 leading-relaxed mt-1.5">
                Our premium products are handled with care. Standard orders are initiated via WhatsApp inquiry. Once the configuration, size, and destination are confirmed, the order is verified, and shipping begins.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-display font-semibold text-base">1. Dispatch Sequence</h4>
              <p className="text-xs text-charcoal-matte/70 leading-relaxed">
                After the inquiry is finalized and our direct dealer receives the order placement confirmation, your cookers/cookware packages are dispatched within 24–48 business hours from our central warehouse.
              </p>

              <h4 className="font-display font-semibold text-base">2. Regional Transit Times</h4>
              <p className="text-xs text-charcoal-matte/70 leading-relaxed">
                We utilize reliable logistics networks across India to maintain secure delivery timelines:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
                <div className="bg-surface-container-high p-3 rounded-lg border border-platinum-gray/35">
                  <span className="font-display font-bold text-xs block text-charcoal-matte">Metro Cities</span>
                  <span className="text-xs text-charcoal-matte/60">3 - 5 Business Days</span>
                </div>
                <div className="bg-surface-container-high p-3 rounded-lg border border-platinum-gray/35">
                  <span className="font-display font-bold text-xs block text-charcoal-matte">Tier 2 & 3 Cities</span>
                  <span className="text-xs text-charcoal-matte/60">5 - 7 Business Days</span>
                </div>
                <div className="bg-surface-container-high p-3 rounded-lg border border-platinum-gray/35">
                  <span className="font-display font-bold text-xs block text-charcoal-matte">North East & Islands</span>
                  <span className="text-xs text-charcoal-matte/60">7 - 10 Business Days</span>
                </div>
              </div>

              <h4 className="font-display font-semibold text-base">3. Package Tracking</h4>
              <p className="text-xs text-charcoal-matte/70 leading-relaxed">
                Once the parcel is handed over to our logistical partners, a digital consignment note with a tracking link is directly shared with your WhatsApp contact number for real-time tracking of the delivery status.
              </p>
            </div>
          </div>
        );

      case 'terms':
        return (
          <div className="space-y-6 text-left text-charcoal-matte">
            <h4 className="font-display font-semibold text-base">1. Digital Portfolio Authenticity</h4>
            <p className="text-xs text-charcoal-matte/70 leading-relaxed">
              This interactive web platform displays authentic Geetanjali kitchenware models produced and marketed by Harsh Home Appliances. Product photos, weight scales, dimensions, and visual sequences are designed to represent physical specifications as closely as possible.
            </p>

            <h4 className="font-display font-semibold text-base">2. WhatsApp Inquiries and Quotations</h4>
            <p className="text-xs text-charcoal-matte/70 leading-relaxed">
              No direct payment gateway is embedded within the catalog for secure transaction preservation. Product selections compiled in the "Enquiry List" are transmitted as formatted text payloads to our dealer representatives. Quotations and logistics fees are discussed and locked individually per order.
            </p>

            <h4 className="font-display font-semibold text-base">3. Sizing and Selection Liability</h4>
            <p className="text-xs text-charcoal-matte/70 leading-relaxed">
              Please inspect the size dimensions, weight specifications, and stovetop compatibility maps provided in the "Size & Dimensions Overlay" before finalizing an inquiry. We hold no liability for sizing mismatches or inductions compatibility mismatches once shipment is initiated.
            </p>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6 text-left text-charcoal-matte">
            <h4 className="font-display font-semibold text-base">1. Direct Inquiry Data Integrity</h4>
            <p className="text-xs text-charcoal-matte/70 leading-relaxed">
              We highly respect your personal privacy. Any user parameters (including full name, phone number, shipping address, or list of inquired products) are transmitted exclusively to initiate direct WhatsApp chat. No personal user data is stored on external databases or shared with third-party tracking services.
            </p>

            <h4 className="font-display font-semibold text-base">2. Cookie Usage and Cache</h4>
            <p className="text-xs text-charcoal-matte/70 leading-relaxed">
              This digital catalog uses standard client-side browser storage (such as <code>localStorage</code>) strictly to maintain your active "Enquiry List" items and local user preferences across session reloads. No tracking cookies or commercial telemetry scripts are utilized.
            </p>

            <h4 className="font-display font-semibold text-base">3. Confidential Communication</h4>
            <p className="text-xs text-charcoal-matte/70 leading-relaxed">
              Your chats, pricing quotes, and address coordinates discussed inside WhatsApp are completely confidential and solely used to complete the verified dispatch. No marketing messages or unsolicited newsletters are sent outside direct order updates.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest py-16 px-4 md:px-16 font-sans">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-charcoal-matte">
            Policies & Standards
          </h1>
          <p className="text-sm text-charcoal-matte/60 leading-relaxed">
            Please read our official operational policies regarding order inquiry, secure fulfillment, and direct exchanges.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Side Tabs */}
          <div className="lg:col-span-4 space-y-2 bg-white p-4 rounded-xl border border-platinum-gray/30 shadow-xs">
            {tabs.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all border text-left ${
                    isSelected
                      ? 'bg-charcoal-matte text-white border-charcoal-matte shadow-sm'
                      : 'bg-transparent text-charcoal-matte/70 hover:text-primary hover:bg-surface-container-high border-transparent'
                  }`}
                >
                  <span className={isSelected ? 'text-heritage-red' : 'text-secondary'}>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Policy Detail Panel */}
          <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-xl border border-platinum-gray/30 shadow-sm min-h-[450px] flex flex-col justify-between">
            <div className="space-y-6">
              {/* Active Tab Header */}
              <div className="border-b border-platinum-gray/50 pb-5 text-left">
                <span className="text-[10px] font-bold uppercase tracking-widest text-heritage-red">
                  Geetanjali Home Appliances Guidelines
                </span>
                <h2 className="text-xl md:text-2xl font-display font-bold text-charcoal-matte tracking-tight mt-1">
                  {tabs.find(t => t.id === activeTab)?.title}
                </h2>
                <p className="text-xs text-charcoal-matte/50 mt-1">
                  {tabs.find(t => t.id === activeTab)?.description}
                </p>
              </div>

              {/* Render Tab Content */}
              <div className="py-2">
                {renderContent()}
              </div>
            </div>

            {/* Verification Footer */}
            <div className="border-t border-platinum-gray/50 pt-6 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-charcoal-matte/50 text-left">
              <span className="flex items-center gap-1.5 font-semibold">
                <CheckCircle2 size={14} className="text-green-600" />
                <span>Harsh Home Appliances • Certified Quality Since 1997</span>
              </span>
              <span>Last Revised: July 2026</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
