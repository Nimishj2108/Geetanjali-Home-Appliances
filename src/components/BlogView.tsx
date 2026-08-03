import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, User, ArrowRight, ArrowLeft, Share2, Tag, CheckCircle2, MessageSquare } from 'lucide-react';
import { PageType } from '../types';
import { Helmet } from 'react-helmet-async';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  metaDescription: string;
  category: string;
  targetPage: PageType;
  date: string;
  readTime: string;
  author: string;
  image: string;
  content: {
    intro: string;
    sections: {
      heading: string;
      body: string;
      bullets?: string[];
    }[];
    conclusion: string;
  };
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Triply vs Stainless Steel Pressure Cooker: Which Should You Buy?',
    slug: 'triply-vs-stainless-steel-pressure-cooker',
    summary: 'A detailed metallurgical comparison between 3-ply clad steel and single-ply SS 304 pressure cookers to help you choose the best vessel for your kitchen.',
    metaDescription: 'Triply vs Stainless Steel Pressure Cooker comparison guide by Geetanjali Home Appliances. Discover heat distribution differences, fuel efficiency, and cooking speed.',
    category: 'Pressure Cookers',
    targetPage: 'tri-ply',
    date: 'July 28, 2026',
    readTime: '6 min read',
    author: 'Geetanjali Home Appliances',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80',
    content: {
      intro: 'When selecting an industrial-grade pressure cooker for your kitchen, two premier metallurgical options dominate the market: Triply Stainless Steel (SAS technology) and Heavy-Gauge SS 304 Stainless Steel. Understanding the subtle heat transfer physics between these materials ensures you make a smart, lifelong investment.',
      sections: [
        {
          heading: 'What is Triply (SAS) Construction?',
          body: 'Triply cookware consists of a 3-layer bonded sandwich structure running continuously from the base to the upper rim: 304 Food-Grade Stainless Steel inside, an encapsulated pure Aluminum core in the middle for rapid thermal conduction, and 430 Magnetic Stainless Steel on the outside for induction stove compatibility.',
          bullets: [
            'Uniform 360-degree heat distribution eliminating bottom scorching',
            'Saves up to 30% fuel due to high thermal retention',
            'Prevents food sticking during heavy milk or dal simmering'
          ]
        },
        {
          heading: 'Heavy-Gauge Single-Ply SS 304 Pressure Cookers',
          body: 'Single-ply SS 304 cookers feature a thick, heavy-duty stainless steel body with a heavy encapsulated sandwich base. SS 304 is 100% non-reactive to food acids, extremely resistant to denting, and mirror-polished for an elegant finish.',
          bullets: [
            'Ideal for high-heat boiling, soups, and traditional biryani',
            'Unmatched structural rigidity and scratch resistance',
            'Highly cost-effective for daily family meals'
          ]
        },
        {
          heading: 'Final Verdict: Which One Fits Your Cooking Style?',
          body: 'If you cook thick gravies, milk-based puddings, or delicate kheer that prone to burning, Geetanjali Trinity Series Triply Pressure Cookers offer superior multi-layer thermal balance. If you prioritize rugged daily durability for everyday pulses and rice, our Stello SS 304 Series is an exceptional, value-packed choice.'
        }
      ],
      conclusion: 'Explore both the Trinity Triply Series and Stello Stainless Steel Series at Geetanjali Home Appliances, manufactured with 30+ years of industrial precision in Bawana, Delhi.'
    }
  },
  {
    id: 'post-2',
    title: 'Inner Lid vs Outer Lid Pressure Cooker: Key Differences Explained',
    slug: 'inner-lid-vs-outer-lid-pressure-cooker',
    summary: 'Discover the safety, mechanism, and capacity differences between inner lid and outer lid pressure cookers for home cooking.',
    metaDescription: 'Inner lid vs outer lid pressure cooker guide. Learn which pressure cooker lid type is safer, easier to clean, and best suited for dal, rice, or meats.',
    category: 'Buying Guide',
    targetPage: 'pressure-cookers',
    date: 'July 25, 2026',
    readTime: '5 min read',
    author: 'Geetanjali Home Appliances',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80',
    content: {
      intro: 'One of the most frequent questions from home cooks and commercial kitchens is whether to choose an Inner Lid or Outer Lid pressure cooker. While both build high steam pressure to cook food up to 70% faster, their structural design dictates safety mechanisms, maximum liquid capacity, and ease of cleaning.',
      sections: [
        {
          heading: 'Inner Lid Pressure Cooker Mechanics',
          body: 'In an inner lid pressure cooker, the lid fits inside the rim of the cooker body. The internal steam pressure forces the lid gasket upward against the rim flange, creating an ultra-secure mechanical lock that cannot be opened until internal pressure drops safely.',
          bullets: [
            'Fail-safe locking mechanism: cannot pop open while pressurized',
            'Compact footprint ideal for small to medium family sizes',
            'Perfect for dishes requiring high pressure retention like lentils & meat'
          ]
        },
        {
          heading: 'Outer Lid Pressure Cooker Advantage',
          body: 'Outer lid pressure cookers feature a lid that slides onto exterior lugs on top of the cooker body. This design leaves the entire interior volume completely unobstructed, maximizing available cooking space for bulky vegetables, large cuts, or separator sets.',
          bullets: [
            'Maximum usable interior volume for tier cooking',
            'Easier to scoop out rice and large ingredients without lid obstruction',
            'Preferred for large commercial catering cookers (up to 22 Litres)'
          ]
        }
      ],
      conclusion: 'Geetanjali offers both Inner Lid (Black Beauty & Trinity Contura) and Outer Lid (Stello, Alex, Trinity Regular) models certified with ISI quality marks.'
    }
  },
  {
    id: 'post-3',
    title: 'Why ISI Certification Matters When Buying a Pressure Cooker',
    slug: 'why-isi-certification-matters-pressure-cooker',
    summary: 'Understand the rigorous safety standards, pressure limit tests, and food-grade material certifications required by Bureau of Indian Standards (BIS IS 2347).',
    metaDescription: 'Why ISI certification (IS 2347) is crucial for pressure cooker safety in India. Read about Geetanjali Home Appliances ISI certified manufacturing standards.',
    category: 'Safety & Standards',
    targetPage: 'about',
    date: 'July 20, 2026',
    readTime: '5 min read',
    author: 'Geetanjali Home Appliances',
    image: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=1200&q=80',
    content: {
      intro: 'A pressure cooker operates under significant internal steam pressure (typically 1 kg/cm² or 15 PSI). Buying an uncertified or low-grade pressure cooker without official ISI marking poses severe safety hazards. Here is why Bureau of Indian Standards (BIS) certification is essential.',
      sections: [
        {
          heading: 'What Does BIS IS 2347 Certification Entail?',
          body: 'IS 2347 is the mandatory Indian Quality Standard governing domestic pressure cookers. To earn the ISI mark, every batch must pass hydrostatic pressure resistance tests, thermal shock tests, gasket release safety verification, and food-grade metallurgical analysis.',
          bullets: [
            'Dual Safety Release Systems: Weight valve + fusible alloy safety plug',
            'Gasket Release System (GRS) to vent excess pressure safely',
            'Virgin food-grade aluminum or SS 304 steel free from heavy metal toxins'
          ]
        },
        {
          heading: 'Geetanjali’s 30+ Years Quality Guarantee',
          body: 'At Harsh Home Appliances (K-11, Bawana Industrial Area, Sector-2, Delhi), every single Geetanjali pressure cooker is manufactured under strict quality audits, ensuring 100% compliance with national safety laws.'
        }
      ],
      conclusion: 'Never compromise family safety for uncertified local cookers. Always insist on ISI certified Geetanjali pressure cookers.'
    }
  },
  {
    id: 'post-4',
    title: 'Hard Anodized vs Aluminium Cookware: A Complete Comparison',
    slug: 'hard-anodized-vs-aluminium-cookware',
    summary: 'Compare hard-anodized electro-chemical treated cookware with pure virgin aluminium to determine durability, scratch resistance, and cooking performance.',
    metaDescription: 'Hard anodized vs aluminium cookware comparison. Learn about non-reactive black anodized finish, scratch resistance, and thermal efficiency.',
    category: 'Materials',
    targetPage: 'black-beauty',
    date: 'July 15, 2026',
    readTime: '6 min read',
    author: 'Geetanjali Home Appliances',
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=1200&q=80',
    content: {
      intro: 'Aluminum is renowned in culinary manufacturing for its outstanding heat conductivity. However, untreated raw aluminum can react with highly acidic foods. Enter Hard-Anodization—an advanced electrochemical process that transforms aluminum into a non-reactive, diamond-hard cooking surface.',
      sections: [
        {
          heading: 'How Hard-Anodization Works',
          body: 'During anodizing, pure aluminum is immersed in an electrolyte bath under freezing temperatures and high electric voltage. This creates an oxide layer that is 2.4 times harder than stainless steel.',
          bullets: [
            '100% Non-reactive surface: Safe for tamarind, lemon, and tomato gravies',
            'Scratch-resistant dark charcoal finish that never peels',
            'High heat absorption leading to faster cooking times'
          ]
        },
        {
          heading: 'When to Choose Virgin Aluminium (Alex Series)',
          body: 'Virgin heavy-gauge aluminium cookers remain the world standard for economical, lightning-fast heat transfer and daily heavy cooking.'
        }
      ],
      conclusion: 'Geetanjali manufactures both Black Beauty Hard-Anodized and Alex Virgin Aluminium pressure cookers for every household preference.'
    }
  },
  {
    id: 'post-5',
    title: 'How to Choose the Right Pressure Cooker Size for Your Family (1.5L to 22L Guide)',
    slug: 'how-to-choose-pressure-cooker-size-family-guide',
    summary: 'A complete capacity chart helping you select the perfect pressure cooker size from compact 1.5L personal cookers to 22L catering models.',
    metaDescription: 'Pressure cooker capacity selection guide (1.5L to 22L) by Geetanjali Home Appliances. Find the right litre size for 2 to 20+ members.',
    category: 'Size Guide',
    targetPage: 'pressure-cookers',
    date: 'July 10, 2026',
    readTime: '4 min read',
    author: 'Geetanjali Home Appliances',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    content: {
      intro: 'Selecting the correct pressure cooker capacity is vital for optimal steam generation and cooking efficiency. Filling a cooker beyond two-thirds full can block the vent tube, while underfilling leads to excessive steam dissipation.',
      sections: [
        {
          heading: 'Capacity Chart by Family Size',
          body: 'Here is our general guide based on 30+ years of kitchen experience across India:',
          bullets: [
            '1.5L - 2.0L: Bachelors, couples, or baby food prep (1-2 persons)',
            '3.0L - 3.5L: Nuclear families (3-4 members) - Most popular size',
            '5.0L - 5.5L: Medium joint families (5-7 members) or party meals',
            '7.5L - 10.0L: Large joint families, festive cooking (8-12 members)',
            '12.0L - 22.0L: Commercial catering, hostels, dhaba & hotel kitchens'
          ]
        }
      ],
      conclusion: 'Explore Geetanjali’s entire range from 1.5L to 22L across Trinity Triply, Stello Stainless Steel, Black Beauty, and Alex Aluminium series.'
    }
  },
  {
    id: 'post-6',
    title: 'What is Honeycomb Non-Stick Coating and Why It\'s Better',
    slug: 'what-is-honeycomb-non-stick-coating',
    summary: 'Discover the patented laser-etched hexagonal stainless steel mesh that protects non-stick coating from metal spatulas and scratching.',
    metaDescription: 'Learn about Tricomb Honeycomb non-stick cookware by Geetanjali Home Appliances. Scratch-proof, metal spoon friendly tri-ply cookware technology.',
    category: 'Cookware Innovation',
    targetPage: 'cookware-honeycomb',
    date: 'July 05, 2026',
    readTime: '5 min read',
    author: 'Geetanjali Home Appliances',
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=1200&q=80',
    content: {
      intro: 'Traditional non-stick cookware wears off quickly when used with steel spatulas or harsh scrubbers. Geetanjali’s Tricomb Series solves this problem with hybrid laser-etched Honeycomb technology.',
      sections: [
        {
          heading: 'How the Stainless Steel Honeycomb Mesh Works',
          body: 'A raised stainless steel hexagonal honeycomb grid is laser-etched over the non-stick valleys. When you use a metal spatula or fork, the utensil glides exclusively over the raised stainless steel peaks, completely shielding the recessed non-stick surface beneath.',
          bullets: [
            '100% Metal Spatula & Spoon Safe',
            'Requires 80% less cooking oil for healthy dosas, roti & searing',
            'Triply body ensures edge-to-edge induction heat distribution'
          ]
        }
      ],
      conclusion: 'Experience the longevity of steel with the ease of non-stick in Geetanjali Tricomb Series Roti Tawa, Dosa Tawa, Frypan & Kadhai.'
    }
  },
  {
    id: 'post-7',
    title: '30 Years of Manufacturing Excellence: The Geetanjali Story',
    slug: '30-years-manufacturing-excellence-geetanjali-story',
    summary: 'The journey of Harsh Home Appliances in Bawana, Delhi—building one of India’s most trusted pressure cooker and cookware manufacturing plants.',
    metaDescription: 'The history and manufacturing legacy of Geetanjali Home Appliances (Harsh Home Appliances) in Delhi NCR. 30+ years of cookware manufacturing mastery.',
    category: 'Brand Story',
    targetPage: 'about',
    date: 'June 28, 2026',
    readTime: '6 min read',
    author: 'Geetanjali Home Appliances',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    content: {
      intro: 'Founded in 1997 in Delhi, Harsh Home Appliances set out with a singular mission: to engineer safe, export-quality cookware and pressure cookers accessible to every Indian household at direct factory prices.',
      sections: [
        {
          heading: 'State-of-the-Art Plant in Bawana Industrial Area',
          body: 'Located at K-11, Sector-2, Bawana Industrial Area, Delhi, our manufacturing facility houses hydraulic deep-drawing presses, automated spinning machines, laser etching rigs, and rigorous pressure testing labs.',
          bullets: [
            '100% Made in India manufacturing',
            'Direct employment for skilled artisans and metallurgical engineers',
            'Pan-India distribution network supporting thousands of retail partners'
          ]
        }
      ],
      conclusion: 'Thank you for trusting Geetanjali Home Appliances as your partner in culinary heritage for over three decades.'
    }
  },
  {
    id: 'post-8',
    title: 'Care & Maintenance Guide for Triply Cookware',
    slug: 'care-and-maintenance-guide-triply-cookware',
    summary: 'Pro tips on cleaning stainless steel, removing heat stains, seasoning tri-ply pans, and maintaining lifelong mirror shine.',
    metaDescription: 'How to clean and care for triply stainless steel cookware. Learn how to remove heat spots, water marks, and maintain mirror finish.',
    category: 'Maintenance',
    targetPage: 'cookware-tri-ply',
    date: 'June 20, 2026',
    readTime: '4 min read',
    author: 'Geetanjali Home Appliances',
    image: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1200&q=80',
    content: {
      intro: 'Geetanjali Trident Triply Cookware is engineered to last a lifetime. Following a few simple maintenance protocols keeps your tri-ply kadhai, saucepans, and topes shining like new.',
      sections: [
        {
          heading: 'Removing White Mineral Spots and Rainbow Heat Stains',
          body: 'Calcium in hard water or sudden extreme heat can leave white spots or rainbow hues on stainless steel. Simply boil water mixed with a tablespoon of vinegar or lemon juice inside the pan for 3 minutes, then wipe clean with a soft sponge.',
          bullets: [
            'Never plunge a red-hot triply pan into cold water to prevent thermal warp',
            'Use soft nylon scrubbers or microfiber cloth with mild dishwashing detergent',
            'Preheat the pan on medium heat before adding oil for natural non-stick performance'
          ]
        }
      ],
      conclusion: 'Proper care ensures your Geetanjali Triply Cookware remains a treasured kitchen heirloom for generations.'
    }
  },
  {
    id: 'post-9',
    title: 'Top Pressure Cooker Manufacturer in India: Triply vs Stainless Steel vs Hard Anodized vs Aluminium Guide',
    slug: 'top-pressure-cooker-manufacturer-india-material-guide',
    summary: 'A definitive comparison guide covering Indian pressure cooker manufacturing standards, material differences, safety mechanisms, and why Geetanjali Home Appliances leads in quality.',
    metaDescription: 'Complete pressure cooker buying guide comparing Triply, Stainless Steel, Hard Anodized, and Aluminium cookers. Manufactured by Geetanjali Home Appliances (Harsh Home Appliances Bawana Delhi).',
    category: 'Industry Guide',
    targetPage: 'about',
    date: 'July 30, 2026',
    readTime: '7 min read',
    author: 'Geetanjali Home Appliances',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80',
    content: {
      intro: 'When evaluating pressure cooker brands and manufacturers in India, discerning buyers focus on four essential pillars: metallurgical purity, safety engineering, ISI certification compliance, and manufacturing legacy. Geetanjali Home Appliances, manufactured by Harsh Home Appliances in Bawana, Delhi, brings over 30 years of manufacturing experience across four flagship material series.',
      sections: [
        {
          heading: '1. Trinity Series (Triply Clad Stainless Steel)',
          body: 'Built with 3-layer SAS cladding (SS 304 food-grade interior + pure aluminum thermal core + SS 430 magnetic induction exterior). Eliminates bottom hot-spots, distributes heat 360° up the sidewalls, and saves up to 30% fuel.',
          bullets: [
            'Best for: Heavy gravies, milk puddings, daily rice & lentils',
            'Available in: 1.5L to 12L (Inner & Outer Lid options)'
          ]
        },
        {
          heading: '2. Stello Series (Heavy-Gauge SS 304 Stainless Steel)',
          body: 'Features a solid SS 304 body with a thick-gauge sandwich bottom. Completely rust-proof, non-reactive to food acids, and highly dent-resistant.',
          bullets: [
            'Best for: Everyday family meals, soups, and high-heat boiling',
            'Available in: 1.5L to 10L'
          ]
        },
        {
          heading: '3. Black Beauty Series (Hard Anodized Aluminium)',
          body: 'Electrochemically treated surface that is 2.4x harder than stainless steel. Heat-absorbent matte black body reduces cooking time and fuel consumption.',
          bullets: [
            'Best for: Acidic tamarind/curry dishes, rapid high-flame cooking',
            'Available in: 1.5L to 10L'
          ]
        },
        {
          heading: '4. Alex Series (Virgin Aluminium)',
          body: 'Lightweight, budget-friendly pressure cookers crafted from high-purity virgin aluminum for maximum thermal conductivity.',
          bullets: [
            'Best for: Commercial kitchens, catering, and economical home cooking',
            'Available in: 1.5L up to 22L commercial sizes'
          ]
        }
      ],
      conclusion: 'Geetanjali Home Appliances is the flagship brand of Harsh Home Appliances, delivering ISI certified pressure cookers shipped pan-India with factory-direct quality assurance.'
    }
  }
];

export const BlogView: React.FC<{ onNavigate: (page: PageType) => void }> = ({ onNavigate }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const handleShare = (post: BlogPost) => {
    const shareText = `${post.title} - Read on Geetanjali Home Appliances Journal`;
    const url = `https://geetanjalihomeappliances.com/blog/${post.slug}`;
    if (navigator.share) {
      navigator.share({ title: post.title, text: shareText, url }).catch(() => {});
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + url)}`, '_blank');
    }
  };

  if (selectedPost) {
    const blogJsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": selectedPost.title,
      "description": selectedPost.metaDescription,
      "author": {
        "@type": "Organization",
        "name": "Geetanjali Home Appliances",
        "url": "https://geetanjalihomeappliances.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Geetanjali Home Appliances",
        "logo": {
          "@type": "ImageObject",
          "url": "https://lh3.googleusercontent.com/d/1quPptK4LJc0Aw--sAW0y2d4CMUlR-WTQ"
        }
      },
      "datePublished": selectedPost.date,
      "image": selectedPost.image,
      "mainEntityOfPage": `https://geetanjalihomeappliances.com/blog/${selectedPost.slug}`
    };

    return (
      <div className="min-h-screen bg-surface-container-lowest py-12 px-4 md:px-16 font-sans text-charcoal-matte">
        <Helmet>
          <title>{selectedPost.title} | Geetanjali Journal</title>
          <meta name="description" content={selectedPost.metaDescription} />
          <meta name="keywords" content={`${selectedPost.category}, pressure cooker guide, triply cookware, Geetanjali Home Appliances`} />
          <link rel="canonical" href={`https://geetanjalihomeappliances.com/blog/${selectedPost.slug}`} />
          <script type="application/ld+json">
            {JSON.stringify(blogJsonLd)}
          </script>
        </Helmet>

        <div className="max-w-3xl mx-auto space-y-8">
          {/* Back Button */}
          <button 
            onClick={() => setSelectedPost(null)}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-charcoal-matte/70 hover:text-heritage-red transition-colors group cursor-pointer"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Journal Articles</span>
          </button>

          {/* Article Header */}
          <div className="space-y-4 text-left">
            <div className="flex items-center justify-between gap-4">
              <span className="px-3 py-1 bg-heritage-red/10 text-heritage-red text-xs font-bold uppercase tracking-widest rounded-full border border-heritage-red/20">
                {selectedPost.category}
              </span>
              <button
                onClick={() => handleShare(selectedPost)}
                className="flex items-center gap-1.5 text-xs font-bold text-charcoal-matte/60 hover:text-heritage-red transition-colors cursor-pointer"
              >
                <Share2 size={14} />
                <span>Share Article</span>
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-black tracking-tight text-charcoal-matte uppercase leading-tight">
              {selectedPost.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-charcoal-matte/60 border-y border-platinum-gray/50 py-3 mt-4">
              <span className="flex items-center gap-1.5 font-medium">
                <User size={14} className="text-heritage-red" />
                {selectedPost.author}
              </span>
              <span className="flex items-center gap-1.5 font-mono">
                <Calendar size={14} />
                {selectedPost.date}
              </span>
              <span className="flex items-center gap-1.5 font-mono">
                <Clock size={14} />
                {selectedPost.readTime}
              </span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden aspect-video border border-platinum-gray/30 shadow-md">
            <img 
              src={selectedPost.image} 
              alt={selectedPost.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Article Body */}
          <div className="space-y-6 text-charcoal-matte/90 leading-relaxed text-sm md:text-base text-left font-sans">
            <p className="text-base md:text-lg font-medium text-charcoal-matte leading-relaxed border-l-4 border-heritage-red pl-4 py-1">
              {selectedPost.content.intro}
            </p>

            {selectedPost.content.sections.map((section, idx) => (
              <div key={idx} className="space-y-3 pt-4">
                <h2 className="text-lg md:text-xl font-display font-bold text-charcoal-matte uppercase tracking-wide">
                  {section.heading}
                </h2>
                <p className="text-charcoal-matte/80 leading-relaxed">
                  {section.body}
                </p>
                {section.bullets && (
                  <ul className="space-y-2 pt-1 pl-2">
                    {section.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2 text-xs md:text-sm text-charcoal-matte/85">
                        <CheckCircle2 size={16} className="text-heritage-red shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <div className="bg-surface-container p-6 rounded-2xl border border-platinum-gray/40 space-y-3 mt-8">
              <h3 className="font-display font-bold text-base text-charcoal-matte uppercase">
                Explore Related Series
              </h3>
              <p className="text-xs text-charcoal-matte/75">
                {selectedPost.content.conclusion}
              </p>
              <button
                onClick={() => onNavigate(selectedPost.targetPage)}
                className="inline-flex items-center gap-2 bg-heritage-red text-white text-xs font-black uppercase tracking-wider px-5 py-2.5 rounded-xl hover:bg-charcoal-matte transition-all cursor-pointer shadow-xs"
              >
                <span>View Product Range</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Social Share & Contact Banner */}
          <div className="border-t border-platinum-gray/60 pt-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-platinum-gray/60">
              <div>
                <strong className="block text-sm font-bold text-charcoal-matte">Found this guide helpful?</strong>
                <span className="text-xs text-charcoal-matte/60">Share with home chefs and kitchenware dealers</span>
              </div>
              <button
                onClick={() => handleShare(selectedPost)}
                className="bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-[#1fb853] transition-colors cursor-pointer"
              >
                <MessageSquare size={14} />
                <span>Share via WhatsApp</span>
              </button>
            </div>

            <div className="text-center pt-4">
              <button 
                onClick={() => setSelectedPost(null)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-charcoal-matte text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-heritage-red transition-all cursor-pointer"
              >
                <ArrowLeft size={16} />
                <span>Back to Journal</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-container-lowest py-16 px-4 md:px-12 lg:px-16 font-sans text-charcoal-matte">
      <Helmet>
        <title>The Geetanjali Journal | Pressure Cooker & Cookware Guides</title>
        <meta name="description" content="Read expert articles on triply stainless steel vs aluminium cookers, ISI safety standards, honeycomb non-stick tech, and cookware maintenance from Geetanjali Home Appliances." />
        <meta name="keywords" content="pressure cooker blog, triply cookware guide, Geetanjali home appliances articles, cookware metallurgy India" />
        <link rel="canonical" href="https://geetanjalihomeappliances.com/blog" />
      </Helmet>

      <div className="max-w-[1280px] mx-auto space-y-12">
        {/* Page Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-heritage-red/10 rounded-full text-heritage-red text-xs font-bold uppercase tracking-widest border border-heritage-red/20">
            <BookOpen size={12} />
            <span>The Geetanjali Journal</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-black tracking-tight text-charcoal-matte uppercase">
            Culinary Metallurgical Archive
          </h1>
          <p className="text-xs md:text-sm text-charcoal-matte/70 leading-relaxed font-sans">
            Explore 30+ years of industrial cookware expertise—from triply stainless steel physics and inner vs outer lid mechanics to ISI certification standards and honeycomb non-stick innovations.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <div 
              key={post.id}
              className="bg-white border border-platinum-gray/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              {/* Image Header */}
              <div className="relative aspect-video overflow-hidden bg-platinum-gray/20">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-charcoal-matte font-bold text-[10px] px-2.5 py-1 rounded-md uppercase tracking-wider shadow-xs border border-platinum-gray/40">
                  {post.category}
                </span>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4 text-left">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-[11px] text-charcoal-matte/60 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="text-base md:text-lg font-display font-bold text-charcoal-matte leading-snug group-hover:text-heritage-red transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-xs text-charcoal-matte/70 line-clamp-3 leading-relaxed font-sans">
                    {post.summary}
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center justify-between border-t border-platinum-gray/40">
                  <button 
                    onClick={() => setSelectedPost(post)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-heritage-red hover:text-charcoal-matte transition-colors group/btn cursor-pointer"
                  >
                    <span>Read Guide</span>
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => onNavigate(post.targetPage)}
                    className="text-[10px] font-bold text-charcoal-matte/60 hover:text-heritage-red uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                  >
                    <Tag size={10} />
                    <span>View Series</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="bg-charcoal-matte text-white rounded-3xl p-8 md:p-10 text-center max-w-4xl mx-auto shadow-xl space-y-4">
          <h3 className="text-xl md:text-2xl font-display font-black uppercase tracking-wide text-white">
            Need Bulk Cookware Specifications or Factory Quotes?
          </h3>
          <p className="text-xs md:text-sm text-platinum-gray/80 leading-relaxed max-w-2xl mx-auto font-sans">
            Connect directly with our Bawana Delhi engineering &amp; sales desk for custom product catalogs, dealer price lists, and technical material test reports.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-heritage-red text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-white hover:text-charcoal-matte transition-all shadow-md cursor-pointer"
            >
              <span>Contact Factory Desk</span>
              <ArrowRight size={14} />
            </button>

            <button
              onClick={() => onNavigate('dealer')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white border border-white/20 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-white hover:text-charcoal-matte transition-all cursor-pointer"
            >
              <span>Become a Dealer</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
