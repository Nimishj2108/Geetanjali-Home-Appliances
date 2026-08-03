export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  sizes: string[];
  prices?: Record<string, number>;
  features?: string[];
  type?: 'inner' | 'outer' | 'other';
  sku?: string;
  sizeImages?: Record<string, string>;
}

export const PRODUCTS: Product[] = [
  // Stainless Steel Collection (screen_7)
  {
    id: "ss-regular",
    name: "Regular Outer Lid",
    category: "Stainless Steel",
    image: "https://lh3.googleusercontent.com/d/185Df8Wcoaa-YqmG7iJ91qpngY-F6oC0e",
    description: "Our signature regular shape pressure cooker with an outer lid, crafted from 304 food-grade stainless steel. Engineered for efficient heat transfer and maximum durability.",
    sizes: ["1.5L", "2.0L", "3.0L", "5.0L", "8.0L", "10.0L"],
    prices: {
      "1.5L": 2299,
      "2.0L": 2449,
      "3.0L": 2649,
      "5.0L": 2999,
      "8.0L": 5219,
      "10.0L": 5399
    },
    sizeImages: {
      "1.5L": "https://lh3.googleusercontent.com/d/1PlN9AspbLkG9sazPUJH54m2FUJ2k4WTs",
      "2.0L": "https://lh3.googleusercontent.com/d/185Df8Wcoaa-YqmG7iJ91qpngY-F6oC0e",
      "3.0L": "https://lh3.googleusercontent.com/d/1r2bIcXMxgktzOAxM87F8jG-MXYg7Np5O",
      "5.0L": "https://lh3.googleusercontent.com/d/185Df8Wcoaa-YqmG7iJ91qpngY-F6oC0e",
      "8.0L": "https://lh3.googleusercontent.com/d/185Df8Wcoaa-YqmG7iJ91qpngY-F6oC0e",
      "10.0L": "https://lh3.googleusercontent.com/d/185Df8Wcoaa-YqmG7iJ91qpngY-F6oC0e"
    },
    features: ["304 Food Grade", "Mirror Finish", "ISI Certified", "Outer Lid"],
    type: "outer",
    sku: "PC-ST-OLRG"
  },
  {
    id: "ss-handi",
    name: "Handi Outer Lid",
    category: "Stainless Steel",
    image: "https://lh3.googleusercontent.com/d/1uavK27bMjrDXGLXmah0YVaZF383aLukm",
    description: "Traditional Handi shape outer lid pressure cooker, marrying classical aesthetics with high-grade stainless steel performance. Features thick-gauge sandwich bottom.",
    sizes: ["2.0L", "3.0L", "5.0L"],
    prices: {
      "2.0L": 2549,
      "3.0L": 2799,
      "5.0L": 3050
    },
    sizeImages: {
      "2.0L": "https://lh3.googleusercontent.com/d/1uavK27bMjrDXGLXmah0YVaZF383aLukm",
      "3.0L": "https://lh3.googleusercontent.com/d/1uavK27bMjrDXGLXmah0YVaZF383aLukm",
      "5.0L": "https://lh3.googleusercontent.com/d/1uavK27bMjrDXGLXmah0YVaZF383aLukm"
    },
    features: ["304 Food Grade", "Traditional Form", "ISI Certified", "Outer Lid"],
    type: "outer",
    sku: "PC-ST-OLHN"
  },
  {
    id: "ss-contura",
    name: "Contura Inner Lid",
    category: "Stainless Steel",
    image: "https://lh3.googleusercontent.com/d/1yHVinAI_Z_VW2Gqs8Dh4wNHMLWjmJFmS",
    description: "Premium food-grade 304 stainless steel in a sleek Contura shape with an inner lid. Optimized for heavy-duty daily use with an induction-compatible base.",
    sizes: ["1.5L", "2.0L", "3.0L", "5.0L", "6.0L"],
    prices: {
      "1.5L": 2749,
      "2.0L": 2899,
      "3.0L": 3099,
      "5.0L": 3449,
      "6.0L": 3699
    },
    sizeImages: {
      "1.5L": "https://lh3.googleusercontent.com/d/1yHVinAI_Z_VW2Gqs8Dh4wNHMLWjmJFmS",
      "2.0L": "https://lh3.googleusercontent.com/d/1yHVinAI_Z_VW2Gqs8Dh4wNHMLWjmJFmS",
      "3.0L": "https://lh3.googleusercontent.com/d/1yHVinAI_Z_VW2Gqs8Dh4wNHMLWjmJFmS",
      "5.0L": "https://lh3.googleusercontent.com/d/1yHVinAI_Z_VW2Gqs8Dh4wNHMLWjmJFmS",
      "6.0L": "https://lh3.googleusercontent.com/d/1yHVinAI_Z_VW2Gqs8Dh4wNHMLWjmJFmS"
    },
    features: ["304 Food Grade", "Mirror Finish", "ISI Certified", "Inner Lid"],
    type: "inner",
    sku: "PC-ST-ILCN"
  },

  // Tri-ply Collection (screen_9)
  {
    id: "tp-classic",
    name: "Classic Inner Lid",
    category: "Tri-ply",
    image: "https://lh3.googleusercontent.com/d/1l7Tu4rNBUjlEqPsHF5VvNnBbnd9Ic_lw",
    description: "Classic straight-wall Inner Lid pressure cooker forged with premium Tri-ply SAS cladding for even heat distribution, maximum durability, and professional cooking precision.",
    sizes: ["1.5L", "2.0L", "3.0L", "5.0L", "6.5L", "8.0L", "10.0L", "12.0L"],
    prices: {
      "1.5L": 3199,
      "2.0L": 3349,
      "3.0L": 3599,
      "5.0L": 3899,
      "6.5L": 6299,
      "8.0L": 6799,
      "10.0L": 6999,
      "12.0L": 7499
    },
    sizeImages: {
      "1.5L": "https://lh3.googleusercontent.com/d/1l7Tu4rNBUjlEqPsHF5VvNnBbnd9Ic_lw",
      "2.0L": "https://lh3.googleusercontent.com/d/1l7Tu4rNBUjlEqPsHF5VvNnBbnd9Ic_lw",
      "3.0L": "https://lh3.googleusercontent.com/d/1l7Tu4rNBUjlEqPsHF5VvNnBbnd9Ic_lw",
      "5.0L": "https://lh3.googleusercontent.com/d/1l7Tu4rNBUjlEqPsHF5VvNnBbnd9Ic_lw",
      "6.5L": "https://lh3.googleusercontent.com/d/1l7Tu4rNBUjlEqPsHF5VvNnBbnd9Ic_lw",
      "8.0L": "https://lh3.googleusercontent.com/d/1l7Tu4rNBUjlEqPsHF5VvNnBbnd9Ic_lw",
      "10.0L": "https://lh3.googleusercontent.com/d/1l7Tu4rNBUjlEqPsHF5VvNnBbnd9Ic_lw",
      "12.0L": "https://lh3.googleusercontent.com/d/1l7Tu4rNBUjlEqPsHF5VvNnBbnd9Ic_lw"
    },
    features: ["SAS Technology", "Heavy-Gauge Body", "Inner Lid Classic", "Induction Base"],
    type: "inner",
    sku: "PC-TR-ILCL"
  },
  {
    id: "tp-contura",
    name: "Contura Inner Lid",
    category: "Tri-ply",
    image: "https://lh3.googleusercontent.com/d/1KgZjXo6cLiiszJYX4U1ZzJRMes4DoaKJ",
    description: "Engineered with SAS (Stainless Steel - Aluminum - Stainless Steel) 3-layer construction. Heat spreads evenly with zero hot-spots, ensuring superb energy efficiency.",
    sizes: ["1.5L", "2.0L", "3.0L", "5.0L", "6.5L", "8.0L"],
    prices: {
      "1.5L": 3099,
      "2.0L": 3249,
      "3.0L": 3499,
      "5.0L": 3799,
      "6.5L": 6199,
      "8.0L": 6899
    },
    sizeImages: {
      "1.5L": "https://lh3.googleusercontent.com/d/1kZqLVh1CmPfq7K_JtVL3CRFjeUY9hUJt",
      "2.0L": "https://lh3.googleusercontent.com/d/1kZqLVh1CmPfq7K_JtVL3CRFjeUY9hUJt",
      "3.0L": "https://lh3.googleusercontent.com/d/1l4qdyg6e1tzCwUuiD1TkVMcxpSomln4l",
      "5.0L": "https://lh3.googleusercontent.com/d/1KgZjXo6cLiiszJYX4U1ZzJRMes4DoaKJ",
      "6.5L": "https://lh3.googleusercontent.com/d/1KgZjXo6cLiiszJYX4U1ZzJRMes4DoaKJ",
      "8.0L": "https://lh3.googleusercontent.com/d/1KgZjXo6cLiiszJYX4U1ZzJRMes4DoaKJ"
    },
    features: ["SAS Technology", "Induction Compatible", "Mirror Finish", "Cool-Touch Handles"],
    type: "inner",
    sku: "PC-TR-ILCN"
  },
  {
    id: "tp-regular",
    name: "Regular Outer Lid",
    category: "Tri-ply",
    image: "https://lh3.googleusercontent.com/d/1LqV8U51TWCZSa1mG_g3lNr6CuxIMYjCJ",
    description: "Classic outer lid design forged in a true tri-ply core. Incredible pressure retention and culinary precision with professional grade heavy-gauge lid.",
    sizes: ["1.5L", "2.0L", "3.0L", "5.0L", "8.0L", "10.0L"],
    prices: {
      "1.5L": 2649,
      "2.0L": 2799,
      "3.0L": 2999,
      "5.0L": 3399,
      "8.0L": 5799,
      "10.0L": 5999
    },
    sizeImages: {
      "1.5L": "https://lh3.googleusercontent.com/d/1WeBqK7CmmMU1xgzkwPh6y83FwrXElGls",
      "2.0L": "https://lh3.googleusercontent.com/d/1J44cyP2sND_IFUVZ43YYTwzYB59BvqmY",
      "3.0L": "https://lh3.googleusercontent.com/d/19oso-U7yyxZLuuRCRJzJLUNSezucL5XR",
      "5.0L": "https://lh3.googleusercontent.com/d/1LqV8U51TWCZSa1mG_g3lNr6CuxIMYjCJ",
      "8.0L": "https://lh3.googleusercontent.com/d/1K5qDnDytOHOT1RkfSfjLhOPpTCMrb3oi",
      "10.0L": "https://lh3.googleusercontent.com/d/1K5qDnDytOHOT1RkfSfjLhOPpTCMrb3oi"
    },
    features: ["SAS Technology", "Induction Base", "Even Heating", "Ergonomic Handles"],
    type: "outer",
    sku: "PC-TR-OLRG"
  },
  {
    id: "tp-handi",
    name: "Handi Outer Lid",
    category: "Tri-ply",
    image: "https://lh3.googleusercontent.com/d/1IcBSOQyy7YHpZzmLZF9Quy0tXmP9T80B",
    description: "Traditional handi style with state-of-the-art SAS tri-ply material. Enhances flavor infusion and allows for gentle simmering, retaining moisture.",
    sizes: ["2.0L", "3.0L", "5.0L"],
    prices: {
      "2.0L": 3049,
      "3.0L": 3149,
      "5.0L": 3499
    },
    sizeImages: {
      "2.0L": "https://lh3.googleusercontent.com/d/1IcBSOQyy7YHpZzmLZF9Quy0tXmP9T80B",
      "3.0L": "https://lh3.googleusercontent.com/d/1IcBSOQyy7YHpZzmLZF9Quy0tXmP9T80B",
      "5.0L": "https://lh3.googleusercontent.com/d/1IcBSOQyy7YHpZzmLZF9Quy0tXmP9T80B"
    },
    features: ["SAS Technology", "Traditional Silhouette", "Mirror Finish", "Eco-Friendly Design"],
    type: "outer",
    sku: "PC-TR-OLHN"
  },

  // Black Beauty Collection (screen_10)
  {
    id: "bb-inner",
    name: "Black Beauty Inner Lid",
    category: "Black Beauty",
    image: "https://lh3.googleusercontent.com/d/1UyMgAip7WpZnvg00iHpxquTr9SypMs01",
    description: "Stunning hard-anodized black finish with a high-grade inner lid. Stronger than steel, thermal-efficient, scratch-resistant, and non-reactive with acidic foods.",
    sizes: ["2.0L", "3.0L", "5.0L"],
    prices: {
      "2.0L": 2199,
      "3.0L": 2399,
      "5.0L": 2799
    },
    features: ["Hard Anodized", "Non-Reactive", "Scratch Resistant", "Inner Lid"],
    type: "inner",
    sku: "PC-BB-ILCN"
  },

  // Heritage Aluminum Series (screen_11)
  {
    id: "al-regular",
    name: "Heritage Aluminum Regular",
    category: "Heritage Aluminum",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGzWUBERMBKY17yvhsVHNUjBx_JcKYWYfsBjjQH3D7NYCETLgbhq0ZQJ2RKeDtzx0Ugw8fBtmNVICzo_hcljpU6HsgkSnzd7tXoTegwJFBUFlojU_1F0Bz6GtczBps5xJ0Qu7oJtPKodTPejwHghCwrhN0_1UqSZHJIDZ1jvPIm-EolwIA3smcEmdTAlMyzK9HW_q5J3HHM-A1HvtMV43koElT426d_O0TdBQhuE9PaUnjQmWo_yY5EkmFPh0JWV5g5iwFHId14E1F",
    description: "Our classic workhorse made from high-grade virgin aluminum. High durability, heavy base, and rapid thermal distribution, certified for secure operations.",
    sizes: ["2.0L", "3.0L", "5.0L"],
    prices: {
      "2.0L": 1349,
      "3.0L": 1499,
      "5.0L": 1799
    },
    sizeImages: {
      "2.0L": "https://lh3.googleusercontent.com/aida-public/AB6AXuAGzWUBERMBKY17yvhsVHNUjBx_JcKYWYfsBjjQH3D7NYCETLgbhq0ZQJ2RKeDtzx0Ugw8fBtmNVICzo_hcljpU6HsgkSnzd7tXoTegwJFBUFlojU_1F0Bz6GtczBps5xJ0Qu7oJtPKodTPejwHghCwrhN0_1UqSZHJIDZ1jvPIm-EolwIA3smcEmdTAlMyzK9HW_q5J3HHM-A1HvtMV43koElT426d_O0TdBQhuE9PaUnjQmWo_yY5EkmFPh0JWV5g5iwFHId14E1F",
      "3.0L": "https://lh3.googleusercontent.com/aida-public/AB6AXuAGzWUBERMBKY17yvhsVHNUjBx_JcKYWYfsBjjQH3D7NYCETLgbhq0ZQJ2RKeDtzx0Ugw8fBtmNVICzo_hcljpU6HsgkSnzd7tXoTegwJFBUFlojU_1F0Bz6GtczBps5xJ0Qu7oJtPKodTPejwHghCwrhN0_1UqSZHJIDZ1jvPIm-EolwIA3smcEmdTAlMyzK9HW_q5J3HHM-A1HvtMV43koElT426d_O0TdBQhuE9PaUnjQmWo_yY5EkmFPh0JWV5g5iwFHId14E1F",
      "5.0L": "https://lh3.googleusercontent.com/aida-public/AB6AXuAGzWUBERMBKY17yvhsVHNUjBx_JcKYWYfsBjjQH3D7NYCETLgbhq0ZQJ2RKeDtzx0Ugw8fBtmNVICzo_hcljpU6HsgkSnzd7tXoTegwJFBUFlojU_1F0Bz6GtczBps5xJ0Qu7oJtPKodTPejwHghCwrhN0_1UqSZHJIDZ1jvPIm-EolwIA3smcEmdTAlMyzK9HW_q5J3HHM-A1HvtMV43koElT426d_O0TdBQhuE9PaUnjQmWo_yY5EkmFPh0JWV5g5iwFHId14E1F"
    },
    features: ["Virgin Aluminum", "Heavy Duty Base", "ISI Certified", "Outer Lid"],
    type: "outer",
    sku: "PC-AL-OLRG"
  },

  // Cookware Collection (screen_8)
  {
    id: "cw-saucepan",
    name: "Heritage Saucepan",
    category: "Cookware",
    image: "https://lh3.googleusercontent.com/d/1q2g6P_FJbTBm91X48AkfEKcLfLPcZZFG",
    description: "Premium tri-ply construction for even heat distribution, perfect for delicate sauces, tea, coffee, and liquid reductions.",
    sizes: ["14cm", "16cm", "18cm", "20cm"],
    prices: {
      "14cm": 1699,
      "16cm": 2199,
      "18cm": 2999,
      "20cm": 4199
    },
    features: ["Tri-ply Series", "Cool-touch Handle", "Heavy Gauge"],
    type: "other",
    sku: "TC-SC"
  },
  {
    id: "cw-frypan",
    name: "Heritage Frypan",
    category: "Cookware",
    image: "https://lh3.googleusercontent.com/d/1DKfAS8SErj7JV-9kVl5n1Yptc3pPccYQ",
    description: "Effortless food release and quick cleanup with our robust, scratch-resistant non-stick coating and thick sturdy core.",
    sizes: ["18cm", "20cm", "22cm", "24cm", "26cm"],
    prices: {
      "18cm": 1899,
      "20cm": 2199,
      "22cm": 2799,
      "24cm": 3699,
      "26cm": 5899
    },
    features: ["Non-stick Coating", "Induction Friendly", "Uniform Base"],
    type: "other",
    sku: "TC-FP"
  },
  {
    id: "cw-saucepot",
    name: "Heritage Sauce Pot / Stew Pan",
    category: "Cookware",
    image: "https://lh3.googleusercontent.com/d/1CAnXd12tGeD7WMbfSnfPjUN6ck3Qfp98",
    description: "Versatile heavy-gauge pot designed for slow cooking, robust curries, braising, and serving large family preparations.",
    sizes: ["18cm", "20cm", "22cm", "24cm", "26cm", "28cm"],
    prices: {
      "18cm": 2199,
      "20cm": 2799,
      "22cm": 3399,
      "24cm": 4199,
      "26cm": 5299,
      "28cm": 6599
    },
    features: ["Heavy Gauge", "Double Handle", "Tight Lid Included"],
    type: "other",
    sku: "TC-SP"
  },
  {
    id: "cw-kadhai",
    name: "Heritage Kadhai",
    category: "Cookware",
    image: "https://lh3.googleusercontent.com/d/11c58R81MCJotw6x7b491YM1LibFUVIw8",
    description: "The essential cornerstone of Indian cooking. Tri-ply construction is ideal for deep frying, stir-frying, and retaining heat during cooking.",
    sizes: ["18cm", "20cm", "22cm", "24cm", "26cm", "28cm", "30cm", "34cm", "40cm"],
    prices: {
      "18cm": 1999,
      "20cm": 2399,
      "22cm": 2799,
      "24cm": 3299,
      "26cm": 3999,
      "28cm": 4799,
      "30cm": 5799,
      "34cm": 6999,
      "40cm": 8399
    },
    features: ["Tri-ply Series", "Traditional Shape", "Sturdy Loops"],
    type: "other",
    sku: "TC-TK"
  },
  {
    id: "cw-tope",
    name: "Heritage Tope",
    category: "Cookware",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtfOHw0JjAsIW3eihkYs7mZKVnNTVtT5rLF4Pc7Nto0PxC6k5lRWKepfJSnckQqiIKgHtd4mODnAXNqV5MdgZtuPHCN-UJ68eqKOfixlO41MKdfxfWKJ8zNU4GNjYffbP2lZcoqPoX4qGpwnWulrlQlNKNLpU3ybZh5Soe63AZy32vKBbjEc_9C449eR-Lv9gSSeoJ_9J0XJWOe1FQFHYErHv-RmsADvDoet462RvTwPIACs-bGU4dDjjxPwHebkWjAeE94IszJnUA",
    description: "An absolute essential for boiling milk, preparing tea, or simmering lentils. High-quality heavy-gauge construction with custom rimming.",
    sizes: ["14cm", "18cm", "22cm", "26cm", "30cm", "32cm"],
    prices: {
      "14cm": 1499,
      "18cm": 2199,
      "22cm": 3099,
      "26cm": 4499,
      "30cm": 5999,
      "32cm": 6899
    },
    features: ["Heavy Gauge Stainless", "Easy Pouring Rim", "Flat Base"],
    type: "other",
    sku: "TC-TP"
  },
  {
    id: "cw-tasla",
    name: "Heritage Tasla",
    category: "Cookware",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDu7IfBMfVK6r_6_90oP3cHWTIbiZ_ar4bYv0GbMAcX_1Y91YhFB1hCgAJAljGKCaU9SqK9H4OtYj6MfD_sA3fjHVSZA5Gxcv1V2ykOojEKTY6VG1xABW6EXsV5p3uOTwpMZ430oWNgGVaipnYfvtoRnNX5NLkTnF39tTtiRODyV6_BbBb8Jp2D1R8HvOXRk-U6Cc9qw_d3L8pYmgj5ffu1gUW6GStj0kFEcWYoHYOxnEjjuG9vOKrDSFfdNOpX-wUbIPhlVeT6OEJt",
    description: "Expertly crafted wide-mouthed tasla, ideal for kneading fresh dough, sautéing vegetables, or organizing pre-cooking steps.",
    sizes: ["18cm", "22cm", "26cm", "30cm", "34cm", "40cm"],
    prices: {
      "18cm": 1899,
      "22cm": 2599,
      "26cm": 3699,
      "30cm": 5199,
      "34cm": 6399,
      "40cm": 7999
    },
    features: ["Traditional Wide Mouth", "Rust-Proof Core", "Food-Safe Polish"],
    type: "other",
    sku: "TC-TS"
  },
  // Honeycomb Cookware Series (Replica of Cookware)
  {
    id: "hc-kadhai",
    name: "Kadhai",
    category: "Honeycomb Cookware",
    image: "https://lh3.googleusercontent.com/d/188EKwnvP8EKVvJCFgoRd_atX9BH8oUki",
    description: "Our premium traditional Indian kadhai enhanced with advanced honeycomb cladding technology. Perfectly suited for high-heat stir frying, deep frying, and braising with effortless cleanup.",
    sizes: ["18 cm", "20 cm", "22 cm", "24 cm", "26 cm", "28 cm", "30 cm", "32 cm"],
    prices: {
      "18 cm": 2499,
      "20 cm": 2999,
      "22 cm": 3499,
      "24 cm": 4099,
      "26 cm": 4999,
      "28 cm": 5999,
      "30 cm": 7199,
      "32 cm": 7999
    },
    features: ["Honeycomb Cladding", "Deep Curvature", "Heavy Loop Handles"],
    type: "other",
    sku: "HC-KD"
  },
  {
    id: "hc-rotitawa",
    name: "Roti Tawa",
    category: "Honeycomb Cookware",
    image: "https://lh3.googleusercontent.com/d/1OY5DBQ717wT7gHj5Tp2rWYfexJumJ4lQ",
    description: "Designed for perfect golden rotis, phulkas, and chapatis with uniform heat transfer and raised honeycomb protection.",
    sizes: ["23 cm", "25 cm", "28 cm"],
    prices: {
      "23 cm": 2699,
      "25 cm": 3499,
      "28 cm": 4599
    },
    features: ["Honeycomb Protection", "Even Heat Distribution", "Cool-touch Handle"],
    type: "other",
    sku: "HC-RT"
  },
  {
    id: "hc-dosatawa",
    name: "Dosa Tawa",
    category: "Honeycomb Cookware",
    image: "https://lh3.googleusercontent.com/d/1sqPVzUBixHwAfQZ5g-6zZgmXrVhH5kCq",
    description: "Wide flat surface ideal for crispy restaurant-style dosas, uttapams, and crepes with rapid heat distribution.",
    sizes: ["28 cm", "30 cm", "32 cm"],
    prices: {
      "28 cm": 3199,
      "30 cm": 3999,
      "32 cm": 5099
    },
    features: ["Honeycomb Defense", "Wide Cooking Area", "Metal Spoon Safe"],
    type: "other",
    sku: "HC-DT"
  },
  {
    id: "hc-frypan",
    name: "Frypan",
    category: "Honeycomb Cookware",
    image: "https://lh3.googleusercontent.com/d/1Fa_rCMs-g7JC8VkH5Ibgg4cvyGzUXhiE",
    description: "Features a raised stainless steel honeycomb grid that protects the premium non-stick layer from scratches. 100% metal-spoon friendly, ideal for crispy searing and uniform shallow-frying.",
    sizes: ["20 cm", "22 cm", "24 cm"],
    prices: {
      "20 cm": 2699,
      "22 cm": 3499,
      "24 cm": 4599
    },
    features: ["Raised Honeycomb Grid", "Metal Spoon Friendly", "Induction Compatible"],
    type: "other",
    sku: "HC-FP"
  },
  {
    id: "hc-tasla",
    name: "Tasla",
    category: "Honeycomb Cookware",
    image: "https://lh3.googleusercontent.com/d/10fk82HMIO-uCK0W1M2Z60VTQVeYbf5-z",
    description: "Premium wide-mouth Tasla with modern honeycomb textured layers. Ideal for effortless sauteing, dough prep, and everyday kitchen use with pristine style.",
    sizes: ["18 cm", "20 cm", "22 cm", "24 cm", "26 cm", "28 cm", "30 cm", "32 cm"],
    prices: {
      "18 cm": 2399,
      "20 cm": 2799,
      "22 cm": 3199,
      "24 cm": 3899,
      "26 cm": 4599,
      "28 cm": 5499,
      "30 cm": 6499,
      "32 cm": 7299
    },
    features: ["Sturdy Wide Flare", "Reinforced Texture Defense", "Highly Polished Exterior"],
    type: "other",
    sku: "HC-TA"
  }
];

// Cookware size to Size No. mapping according to PDF Reference Guide
const COOKWARE_SIZE_MAP: Record<string, string> = {
  "14cm": "1",
  "16cm": "1",
  "18cm": "2",
  "20cm": "3",
  "22cm": "4",
  "24cm": "5",
  "26cm": "6",
  "28cm": "7",
  "30cm": "8",
  "32cm": "9",
  "34cm": "10",
  "40cm": "11"
};

export function formatSku(baseSku?: string, size?: string): string {
  if (!baseSku) return 'GH-SKU-2026';
  if (!size) return baseSku;

  const trimmedSize = size.trim();

  // If Pressure Cooker (e.g. PC-TR-ILCL)
  if (baseSku.startsWith('PC-')) {
    // Normalize e.g. "2.0L" -> "2L", "3.0L" -> "3L", "1.5L" -> "1.5L"
    let cleanLitres = trimmedSize.replace(/\s+/g, '');
    if (/^\d+\.0L$/i.test(cleanLitres)) {
      cleanLitres = cleanLitres.replace(/\.0L/i, 'L');
    }
    return `${baseSku}-${cleanLitres}`;
  }

  // If Cookware (TC- or HC-)
  if (baseSku.startsWith('TC-') || baseSku.startsWith('HC-')) {
    const compactSize = trimmedSize.toLowerCase().replace(/\s+/g, '');
    
    // Check direct map (e.g. "16cm")
    if (COOKWARE_SIZE_MAP[compactSize]) {
      return `${baseSku}-${COOKWARE_SIZE_MAP[compactSize]}`;
    }

    // Try extracting numeric cm value (e.g., "18 cm" -> 18)
    const cmMatch = compactSize.match(/(\d+)cm/);
    if (cmMatch && COOKWARE_SIZE_MAP[`${cmMatch[1]}cm`]) {
      return `${baseSku}-${COOKWARE_SIZE_MAP[`${cmMatch[1]}cm`]}`;
    }

    // If size is e.g. "Size 1" or number
    const numMatch = compactSize.match(/\d+/);
    if (numMatch) {
      return `${baseSku}-${numMatch[0]}`;
    }

    return `${baseSku}-${compactSize}`;
  }

  return `${baseSku}-${trimmedSize.replace(/\s+/g, '')}`;
}

