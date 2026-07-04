export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'Coffee' | 'Tea Selection' | 'Patisserie' | 'Brunch';
  image: string;
  tags?: string[];
}

export interface SeasonalFavorite {
  id: string;
  name: string;
  tag: string;
  tagColor: string;
  image: string;
  desc: string;
}

export interface GalleryImage {
  url: string;
  title: string;
  desc: string;
  category: string; // added to allow filtering tabs in the enhanced masonry layout!
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  rating: number; // 5-star rating support
  avatar?: string; // profile pictures for premium look
}

export interface InstagramPost {
  id: string;
  image: string;
  likes: number;
  comments: number;
  caption: string;
}

export interface MapLandmark {
  name: string;
  x: number;
  y: number;
  type: 'shop' | 'park' | 'store' | 'subway' | 'culture';
  desc: string;
}

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
  ogType: string;
  ogUrl: string;
  ogImage: string;
  faviconUrl: string;
  structuredData: {
    name: string;
    description: string;
    image: string;
    telephone: string;
    priceRange: string;
    address: {
      streetAddress: string;
      addressLocality: string;
      addressRegion: string;
      postalCode: string;
      addressCountry: string;
    };
    openingHours: string[];
    geo: {
      latitude: string;
      longitude: string;
    };
  };
}

export interface CafeConfig {
  name: string;
  shortDescription: string;
  detailedDescription1: string;
  detailedDescription2: string;
  establishedYear: string;
  establishedLocation: string;
  
  // Contacts
  address: string;
  addressLine1: string;
  addressLine2: string;
  phone: string;
  phoneFormatted: string;
  email: string;
  whatsappNumber: string; // e.g., '+919876543210' or '+12125550198'
  whatsappMessage: string; // prefilled whatsapp template text
  instagramUsername: string;
  instagramUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  
  // Map urls
  googleMapsUrl: string;
  googleMapsEmbedUrl: string; // standard embed iframe url or a placeholder that simulates
  
  // Opening Hours
  hours: {
    weekdays: string;
    weekends: string;
    summary: string;
  };
  
  // 3D Tour Placeholder
  tour: {
    title: string;
    badge: string;
    description: string;
    ctaText: string;
    mockImageUrl: string;
  };

  // Data
  menuItems: MenuItem[];
  seasonalFavorites: SeasonalFavorite[];
  galleryImages: GalleryImage[];
  testimonials: Testimonial[];
  instagramPosts: InstagramPost[];
  mapLandmarks: MapLandmark[];
  seo: SEOConfig;
}

export const CAFE_CONFIG: CafeConfig = {
  name: "Your Café Name Here",
  shortDescription: "Experience Artisanal Mastery",
  detailedDescription1: "At Your Café, we believe that coffee is more than a quick morning caffeine fix—it is a sacred medium for personal connection and a canvas for meticulous artisanal craftsmanship. Our journey began over a decade ago with a simple focus: to source the rarest micro-lots from sustainable high-altitude farms and roast them with extreme reverent precision.",
  detailedDescription2: "Every single cup we pour is a testament to our obsessive attention to detail, from the exact curves of our roast temperature profiles to the meticulously mineral-balanced brewing waters. We unlock complex flavor profiles of roasted cocoa, dark stone plum, wild jasmine, and toasted organic almond.",
  establishedYear: "2012",
  establishedLocation: "West Village",
  
  // Contacts & Location
  address: "42nd Artisanal Ave, Greenwich Village, NY 10014",
  addressLine1: "42nd Artisanal Ave",
  addressLine2: "Greenwich Village, NY 10014",
  phone: "+12125550198",
  phoneFormatted: "+1 (212) 555-0198",
  email: "hello@yourcafe.com",
  whatsappNumber: "12125550198", // No spaces, perfect for https://wa.me/
  whatsappMessage: "Hello! I would like to inquire about a reservation or order from your premium menu.",
  instagramUsername: "YourCafe",
  instagramUrl: "https://instagram.com",
  twitterUrl: "https://twitter.com",
  linkedinUrl: "https://linkedin.com",
  
  googleMapsUrl: "https://maps.google.com/?q=West+Village,+New+York,+NY",
  // Standard embeddable google map iframe URL with zero keys needed
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.111867140816!2d-74.00414772342578!3d40.737568571389445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259929532e8d3%3A0xe726bc0b6c6bfa15!2sGreenwich%20Village%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus",
  
  // Opening Hours
  hours: {
    weekdays: "Monday - Friday: 7:00 AM - 8:00 PM",
    weekends: "Saturday - Sunday: 8:00 AM - 9:00 PM",
    summary: "Mon - Sun (8:00 AM - 8:00 PM)"
  },
  
  // 3D Tour
  tour: {
    title: "Immersive 3D Café Tour",
    badge: "Coming Soon",
    description: "Step inside our master roastery from anywhere in the world. We are crafting a fully interactive, virtual 3D journey that allows you to explore our brewing alcoves, inspect our vintage roasters, and experience the sanctuary in high-definition virtual reality.",
    ctaText: "Get Notified When Live",
    mockImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFIDLTOku2sfhrM8rPpXhFNUNXVqdf2FoCkbp8plu70slxa5vAQrrLFNQJNbXdqJIvCsurAQlRb1JdqNgjJECiXj0ZWgjw-IY0SykPWKFfkcqwcgHW9XIYKSRVfKs_42JsV6gYuiYxLXkGY1WR26mmO6pe1CcnV4GiPxtFk8HitPll9hfzcfqtkL_UybTZXw-40ELSaAfNLilglijvH9b3b9cQVlibCyGpeH332LzD7b_Hcei5nF1d"
  },

  // Menu items - Highly optimized hotlink imagery
  menuItems: [
    {
      id: 'smoked-macchiato',
      name: 'Smoked Macchiato',
      price: 8.50,
      description: 'Double shot of Ethiopian Yirgacheffe, cold-smoked with oak chips and topped with velvety, oak-infused micro-foam.',
      category: 'Coffee',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKOjV0zhkHZQsl09PqwaGlhit9w8KR4v0tsW7Vsunm8hemRgEenQvSaOugDUcYOyDjw3ZW7NGZm0M9RueHmYxB6Wt3hCjIsdjvoz3EU9luj6rieZW4ac0m3Lmu3MG516bl_eSd9vLXEDA_lYKZxICtRwHFFBIdGvS2uzLszdn4fKe28K3mtoV5Kuh19yggGit1g7sHvurp4ij2FTrTpM1WVAj-JhKht-YUXUXAxo7TfAyf49TtA1IW',
      tags: ['Best Seller', 'Signature', 'Oak Smoked']
    },
    {
      id: 'single-origin-v60',
      name: 'Single Origin V60',
      price: 12.00,
      description: 'Rotating seasonal micro-lot, hand-poured through V60 to highlight delicate acidity and floral jasmine notes.',
      category: 'Coffee',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaivNCCHTrxSY8kjf2m5VFCquC2iAbLpNx-tCcFnYAz6JmU0ixjb3Rcw-Thlt-P9OtQ8J4mbCmdVc2eUb9tqDKjH_h60clH-pehf6-GGguVoGA76sabjISH4m_E5amRxVJtgalcLfo7wGI3MihbFOxtwetRY7TQcniQ9SZetrBvnAOJg-Xgk6PsSJhkY6ZvciMqN_IH8k0k31Wi8n0L4iL-XXDMkwg9lq3ZHkZI7G_Kv60YkjH-KIQ',
      tags: ['Single Origin', 'Hand Poured', 'Seasonal']
    },
    {
      id: 'gold-spiced-latte',
      name: 'Gold Spiced Latte',
      price: 9.50,
      description: 'Rich espresso with real roasted pumpkin purée, dusted with 24k organic gold leaf and freshly grated organic nutmeg.',
      category: 'Coffee',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4_kv1626JAP_31C4n0wIROBF8ir2sjJTCrgMlzMbfnqYDS-3zll3OjIiZ_skP2MK6On8XsOyENUneDslnaetbFs7EtnFiF6RK3eAO123IepLopX33wtp8FQfQR_vg9AKIt6uoWMcKxJXE9FU_7TXXpirlmBoOYPnt2W3hJxTNrkj91HlzEOieCPA1uwy8ae5mr2c479-B_1qIT_GB5FQNGUhfqMJIJQJtreQwbn504KBW53fhy4Tn',
      tags: ['Winter Special', 'Award Winning']
    },
    {
      id: 'ceremonial-matcha-latte',
      name: 'Uji Matcha Latte',
      price: 11.00,
      description: 'Premium stone-ground ceremonial Uji matcha whisked to velvet perfection, served with sweet organic house macadamia milk.',
      category: 'Tea Selection',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAalRswdkWL-7wlEcqwZzZoE9ZRcIigpFTn3EkeroMBIbWGI-fh4Jy9ygFIlaN0u3JZY4KJ3xUjtH4Pbk27wfE2g-OlMZx9acnSHfdoPceWT1yUeXvk2ctXeXsQg1_uFhl-pgL72rK_UAhY1ojaf3Ye4WlQ6vOF7N-g1pFPxpH55f_eCq_lqVcn3qL17hXMX5jPe9U7ZtpNSuMYnxEE4KG0C2BUUeOFUFvHoNcp_6LMbBqdWjR-Ks-c',
      tags: ['Ceremonial', 'Organic', 'Sweetened']
    },
    {
      id: 'elderflower-infusion',
      name: 'Elderflower Infusion',
      price: 10.00,
      description: 'Vibrant, refreshing cold-brewed tea infused with organic wild hibiscus, fresh garden mint, and elderflower liqueur splash.',
      category: 'Tea Selection',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzcumzamcZuLThbygzVRo9Jr2OCc84KODxmeAtTBl_NJZzRDYF_8M2qWjAj5yYdtlaAlL_0m7s7m8rgIv3L_Xl4sAaQjN46pNeu3kiy0-LkQI_dHbH_tIsELBkuLAFsruFOWht55g_aatuQUoiNHjvEuvtHkibr18w1If8gTWk5Ovmpj_k3F7x58x5N2NIri9pP6vjHF2wefX_vhbA11DZDAiMEBUqMYmD0UtYloBThoZJHH8WCu1c',
      tags: ['Summer Special', 'Refreshing', 'Iced']
    },
    {
      id: 'pistachio-croissant',
      name: 'Pistachio Croissant',
      price: 7.50,
      description: 'Extremely flaky twice-baked sourdough pastry filled with house-made premium Bronte pistachio frangipane and slivers.',
      category: 'Patisserie',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFlaKdLH2iMPplozLKD8ANYRJq-a6_TncIS5MmPoZy-Nspt0WRUxoAeqFMzGJaCQg7dXDOFAcv7loFxaqzKClYfFJuwmb0NntzwK8MdS4a_X4dz1p_Oz_PTD2apq6x1_xuIgnl7JBm9f84lwdUa91I1Nk9ZcOw2d8w3K26VAZiymFleQRWh3gvVmigiyNuhIoPAsu-wLZ1p6BoEGTNc5bjnXaRheX6thY6q0HLY7Rjm80vcrqBstBC',
      tags: ['Freshly Baked', 'Voted Best Pastry']
    },
    {
      id: 'dark-chocolate-babka',
      name: 'Dark Chocolate Babka',
      price: 8.00,
      description: 'Rich, buttery brioche bread braided meticulously with 72% Madagascar single-origin chocolate and orange zest notes.',
      category: 'Patisserie',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGTWhHloufZ7Vxb4nifW0OcKTUUr6we88QuE1AsJf8qIECpsy03LRZOui3ieWkO3NqsJNQMmEyLALn8cs4AqG_D3ntCspgmCVAGwLprwac3mk1TXszhR6LInldhysZFpYo-dCViDqNwfMy-6cDp_RnTEnMPR5TDl8EMLSNO5oivOx0AS4qsOMmgiNABxe1i0197hCmKj4bqsOlSf7y4eGykL8bi8NBt93bYS2rssVWHZhkAn5DvPif',
      tags: ['Chocolate', 'Artisanal']
    },
    {
      id: 'truffle-avocado',
      name: 'Truffle Avocado Sourdough',
      price: 18.00,
      description: 'Artisan country sourdough, hand-smashed premium Hass avocado, black winter truffle oil, micro-greens, and a slow-poached organic egg.',
      category: 'Brunch',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_o6ua4nFAJKDq2PVUqZySgM2CdPdtNvuugklE4KqnJjKWwt4e3pTfHJvzXrEwLPcOrf5C48Gs6p30689NChYcTHpgAZb6L4qyHnYs3iz5NTuJ3h4V2B-Y-AhobCzDKxEGreywrPGwtdwyeLKBLiUbL3jCFs2RHpLC2PMSuMWMyKyrRwlLh9MZPeICthqfQAgW9hWhRLQbPTLoJscfEk--EBNcYsRlPQIQwMDziWX-eiVU4m9ShysX',
      tags: ['Brunch Classic', 'Truffle-Infused']
    }
  ],

  seasonalFavorites: [
    {
      id: 'gold-spiced-latte',
      name: 'Gold Spiced Latte',
      tag: 'Winter Special',
      tagColor: 'bg-secondary/15 text-secondary border border-secondary/30',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4_kv1626JAP_31C4n0wIROBF8ir2sjJTCrgMlzMbfnqYDS-3zll3OjIiZ_skP2MK6On8XsOyENUneDslnaetbFs7EtnFiF6RK3eAO123IepLopX33wtp8FQfQR_vg9AKIt6uoWMcKxJXE9FU_7TXXpirlmBoOYPnt2W3hJxTNrkj91HlzEOieCPA1uwy8ae5mr2c479-B_1qIT_GB5FQNGUhfqMJIJQJtreQwbn504KBW53fhy4Tn',
      desc: 'Our seasonal espresso reimagined with roasted organic pumpkin mash, gold dust leaf, and micro-foam.'
    },
    {
      id: 'elderflower-infusion',
      name: 'Elderflower Infusion',
      tag: 'Refreshing',
      tagColor: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzcumzamcZuLThbygzVRo9Jr2OCc84KODxmeAtTBl_NJZzRDYF_8M2qWjAj5yYdtlaAlL_0m7s7m8rgIv3L_Xl4sAaQjN46pNeu3kiy0-LkQI_dHbH_tIsELBkuLAFsruFOWht55g_aatuQUoiNHjvEuvtHkibr18w1If8gTWk5Ovmpj_k3F7x58x5N2NIri9pP6vjHF2wefX_vhbA11DZDAiMEBUqMYmD0UtYloBThoZJHH8WCu1c',
      desc: 'Cold brew tea with botanical elderflower, wild garden mint, and clean crystal ice grids.'
    },
    {
      id: 'pistachio-croissant',
      name: 'Pistachio Croissant',
      tag: 'Hand-crafted',
      tagColor: 'bg-amber-100 text-amber-800 border border-amber-200',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFlaKdLH2iMPplozLKD8ANYRJq-a6_TncIS5MmPoZy-Nspt0WRUxoAeqFMzGJaCQg7dXDOFAcv7loFxaqzKClYfFJuwmb0NntzwK8MdS4a_X4dz1p_Oz_PTD2apq6x1_xuIgnl7JBm9f84lwdUa91I1Nk9ZcOw2d8w3K26VAZiymFleQRWh3gvVmigiyNuhIoPAsu-wLZ1p6BoEGTNc5bjnXaRheX6thY6q0HLY7Rjm80vcrqBstBC',
      desc: 'Golden-brown, flaky croissant layers filled with premium roasted pistachio butter custard.'
    }
  ],

  // Expanded gallery images with tabs so users can filter by Interior, Espresso Art, Brunch, etc.! (Highly professional gallery update)
  galleryImages: [
    {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFIDLTOku2sfhrM8rPpXhFNUNXVqdf2FoCkbp8plu70slxa5vAQrrLFNQJNbXdqJIvCsurAQlRb1JdqNgjJECiXj0ZWgjw-IY0SykPWKFfkcqwcgHW9XIYKSRVfKs_42JsV6gYuiYxLXkGY1WR26mmO6pe1CcnV4GiPxtFk8HitPll9hfzcfqtkL_UybTZXw-40ELSaAfNLilglijvH9b3b9cQVlibCyGpeH332LzD7b_Hcei5nF1d',
      title: 'The Sanctuary Interior',
      desc: 'Double-height ceilings with custom hand-applied beige plaster, custom white oak and brass espresso counters.',
      category: 'Interior'
    },
    {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuVXjItefNinhsEPHllfiayzmAlGKKMiGq4JTN7XKVa8-sOHCNeX58FbtDfWW_cDvsBN9eBHmv-pP6IpgitF6FoTYZ1e8uM0-p5hDbdY6w0hRUkgRmwKLXXzMxMlpraEbp3iEwZfOxdR6cyUrvSclzSdRKraI8uGxSDqnnOoeq2Ir0qq7df_WrxkjcGofWJd9387v7ddm1Q3tEMyWFmGZyJoVROa4DK3hPV8jxGG8D5E_B7WC1VFFj',
      title: 'Espresso Alchemy',
      desc: 'Commercial-grade custom chrome espresso machinery calibrated dynamically for extraction perfection.',
      category: 'Brewing'
    },
    {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGTWhHloufZ7Vxb4nifW0OcKTUUr6we88QuE1AsJf8qIECpsy03LRZOui3ieWkO3NqsJNQMmEyLALn8cs4AqG_D3ntCspgmCVAGwLprwac3mk1TXszhR6LInldhysZFpYo-dCViDqNwfMy-6cDp_RnTEnMPR5TDl8EMLSNO5oivOx0AS4qsOMmgiNABxe1i0197hCmKj4bqsOlSf7y4eGykL8bi8NBt93bYS2rssVWHZhkAn5DvPif',
      title: 'The Breakfast Ritual',
      desc: 'Flaky artisanal croissants paired with Swan-inspired free-pour micro-foam latte art.',
      category: 'Brunch'
    },
    {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAalRswdkWL-7wlEcqwZzZoE9ZRcIigpFTn3EkeroMBIbWGI-fh4Jy9ygFIlaN0u3JZY4KJ3xUjtH4Pbk27wfE2g-OlMZx9acnSHfdoPceWT1yUeXvk2ctXeXsQg1_uFhl-pgL72rK_UAhY1ojaf3Ye4WlQ6vOF7N-g1pFPxpH55f_eCq_lqVcn3qL17hXMX5jPe9U7ZtpNSuMYnxEE4KG0C2BUUeOFUFvHoNcp_6LMbBqdWjR-Ks-c',
      title: 'Cozy Solitude',
      desc: 'Soft sunlight falling across our warm-textured stone tables and hand-sewn leather accents.',
      category: 'Interior'
    },
    {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1a06GvkkSw4lYTy7nTOkaFw8lLKKpxXw-WtN7W4fuJgV70ZSFgGCB9m7x3RuK-meobFcmi5UMeYR13qtl940jvh376_8dnDyh5ZDO_ql6ewr8S8JoiFoltcnI-QtFWkyZYGYxdwAl548vuzKEP5aa8Xyro16JNLSohOQ-80n1mFiRyxnwLoa0-3VU9kjqpKwn8FxTv2hwajKgZEh6jcUb3VqLD_ojYhcSQLmWFcsakftt8HTG4WN3',
      title: 'Dusk at Your Café',
      desc: 'The iconic backlit serif typography glowing softly as day transitions to premium jazz night sessions.',
      category: 'Interior'
    },
    {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCX5RpmNAG34acY4q2YyZxVz3IZt43c-Akhv_NBXwRIq6bcWDGtTqDTRqCNS-xdaczowzsiN1lJifU3_6446hzHsU51660BWvr5bj6xz6Xtirf-2IpSknI6YD1k70f8NHYKIzVwvvZ-GmkpAv5Y1XGNr2nj4wMCTUuU3GrpQbJwnsPF_q06CEXRy1sf-eQs8_N5u4Nq3XFggcOF39SfVFYMbSwqta563ILoBDRTx11909jtSA0Lmx6m',
      title: 'Hand Sorted Batches',
      desc: 'Every single micro-lot is carefully selected and hand-screened to ensure flawless physical density and grade.',
      category: 'Brewing'
    }
  ],

  // Premium customer testimonials with 5-star ratings, avatars, and detailed roles
  testimonials: [
    {
      id: '1',
      quote: "Quite simply the most refined coffee experience in the city. The absolute attention to the bean's micro-lot origin is unparalleled. The sanctuary design is second to none.",
      author: "Julian Vane",
      role: "Lifestyle Critic",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80"
    },
    {
      id: '2',
      quote: "An oasis of complete aesthetic calm. Whether for a morning focus ritual or a quiet afternoon design consultation, it never fails to impress. Exceptional service and pastries.",
      author: "Eleanor Rigby",
      role: "Principal Architect",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80"
    },
    {
      id: '3',
      quote: "The Gold Spiced Latte is a complete liquid masterpiece. Your Café has redefined what a neighborhood premium cafe can achieve. A masterpiece of branding and craft.",
      author: "Marcus Thorne",
      role: "Local Regular & Creator",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80"
    }
  ],

  // Curated recent visual posts for easily editable instagram simulation
  instagramPosts: [
    {
      id: '1',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiJHLBrFnmT5yJtk6yrcmcnbptI02qghNAraKwOskpBiTkRu0Rx2wQpKZdx2u5wU-dn-j1W2999QNoDOTBTTO562IELf-DZlScvx0uSuGwD6EW-SuKDUksz3crxeLI6jtFc3ulJFeUrrTAKNxfQIQPuFsfFPYj8RRfFDCA3eTPrwNdGNdARv1Y27_GxSXcPHM6JRBd6pZKTYzeY2Zmb7lsoXeqpyqOM4UFLilK9iybyUtSfB6_MGd2',
      likes: 1240,
      comments: 42,
      caption: 'Morning sun grids illuminating the perfect Saturday brunch table. ✨🥐☕️ #artisanal #saturdaymorning #coffeeshopvibes'
    },
    {
      id: '2',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJSixuo597TnFe7XHg00oRqE9ou7uB6kWMYJBCsnHq9MjO2rs4E6TUa0rjcSd_pvTtTURXmlxoBfzGXlQERy5ES5WJWDQBits5AAiJSpb-I5CMelGexTbFRnUTEnPuf_TccnauIVCdvoP8DaHmjYQlWTpUKjZ-pHv8qupG2ZTQwQXYx7DYuqJBsPkcAiS9V60AyPvlAAmaohhRI0vJj6IZH2-Q1dscXRht1yzuURDc31oMa_WU5v-T',
      likes: 854,
      comments: 19,
      caption: 'Focus, precision, and a lot of warmth. Sorting the latest Gesha lot from Costa Rica. 🇨🇷🤎 #coffeeroaster #origin #specialtycoffee'
    },
    {
      id: '3',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABR0ANkJ5s9pGWXeuPxgHHSPJqxmmOZ0S6t8CzYApUyjOhSZdn4Z9ibTc_s7bXDz_il_tI2o3OGHDk_1h9FKzXjTB3_-SKealxif-EkyFVXgdFL33ACXZSqYHxtRkRc82-J6AptjfSwZvrKYqOLaebLtSgRDctWRRHvZjQMxV98Hv9qdDWf-7IXUtyapj1DKS5iMxYacNj_V-j3jmto2_LFtzWePEhFiFj-7Q04vA4EJIcOlGjV8te',
      likes: 1533,
      comments: 67,
      caption: 'Rainy West Village days require leather journals and steaming mugs. 🌧️📖☕️ #rainydays #cosyspot #coffeelover'
    },
    {
      id: '4',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXv1sWcLKrBymkuq8-Z9xnC6x4Zxl9pOMNVwoe5Wqqudc9C2aGo3iurnH7zvMuQcMDv0vE7xhymlNlgv_WtlOPuFix_8PxbDo8NujrBsMS1EFKuoYavuaDSQ9lI3p0Zocgyg3LuQadC6yCBMuVGU-VDJlxUhh-KXTzCRFcgaiG-KVSYC6_lgi0b7pXaZhl40E64bH356WT_VTcQJeTnbItkX6G4kL-eir3Rlf4h0OalXKjHC9ZFrE4',
      likes: 922,
      comments: 22,
      caption: 'Clean lines, precise temperatures. Calibrating the custom-plated espresso group heads. ⚙️📐 #designculture #coffeetech'
    },
    {
      id: '5',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmhVhUb9_8UVtTZrVc1hP1lQFxGMezwnKzQJowznXMB6uwG_174dLHoe_JTDr6ZH_yG-B_8easG5AgmIHvLzTzSChVNbV0C_LlAksu5FBiSCdU9xXcdcGzFo786SBWOdiygH6CHTtytT5Xqv73RhQ0hpQ5MAqZn91mEF7sof4Wi7rzAS1Dxjg92jCzNrOFfa6uIsCEp2ahep7o8E1mv4nlJjSi7Orruim_RWrvmOsXcl_WpAJQVAes',
      likes: 1109,
      comments: 31,
      caption: 'The crackle of the roast. Unlocking the honey and caramelized stone fruit notes. 🔥🍒 #specialtyroaster #craftsmanship'
    },
    {
      id: '6',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA74Ob2zrtyXB5T3Kx1rXHrJrnjj1OQ6uSTtITXBcsxlXEfXRlh1C0_C4DnD_-VKr6kwduE8FuU6UjhFs9NUQ_O49tKUYG6nhSM5xnsgN-6eyGn2w-6UiHOQUuNY7qAwHjSJuwUVxE-ZA0KChfbK6nw_wx1kLyLAZ6VoAdFVofXWcE7VH2Xgb9Yyt13mXnbnZL55bClZMxhlf24oI6tX-FV5NyRiH7gcFGOjpaFJrUJfR6UlIdu8JB7',
      likes: 1782,
      comments: 89,
      caption: 'Phoenix art. Unrivaled micro-foam control by our lead master barista. 🦜☕️ #latteart #freepour #coffeeart'
    }
  ],

  // Landmarks for the localized Greenwich Village neighborhood interactive vector map
  mapLandmarks: [
    { name: 'Your Café Name Here', x: 50, y: 55, type: 'shop', desc: '42nd Artisanal Ave, West Village' },
    { name: 'Washington Square Arch', x: 80, y: 35, type: 'park', desc: 'Iconic neighborhood marble archway' },
    { name: 'Bleecker Street Records', x: 30, y: 70, type: 'store', desc: 'Vintage analog music hub' },
    { name: 'West 4th subway station', x: 45, y: 25, type: 'subway', desc: 'Direct transit gateway' },
    { name: 'Jefferson Market Library', x: 20, y: 30, type: 'culture', desc: 'Stately gothic public landmark' }
  ],

  // SEO & OpenGraph Configuration - perfectly ready for real deployment SEO optimizations!
  seo: {
    title: "Your Café Name Here | Artisanal Master Coffee & Patisserie NYC",
    description: "Welcome to Your Café Name Here, Greenwich Village's premium specialty coffee roastery & artisan patisserie. Experience handcrafted micro-lots, award-winning lattes, and classic brunch classics.",
    keywords: "specialty coffee NYC, artisanal coffee, Greenwich Village cafe, premium brunch New York, V60 pour over, local cafe Manhattan, high-quality cafe template",
    ogType: "website",
    ogUrl: "https://yourcafe.com",
    ogImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuL7mppNErBe9dy5wTWVuqvRauwCgi39aztTtQfzBVBiFQCgf1sM9SvumjJtqP6RYINM_Uqn_Oi2BYclORYsgQAwFZiehjfXt1P2vsrXPOqgKWtMabIT4gmU7SHK1QpkFO1_F7aeLVVm5xQu3KOmsn3XqHcaJNWnJxrJ8BMdV1jRkF6hiMW-0m50g0nm08JWhI7xTRoprZop4SIMeEzgYCHK2RL-kNySu6HO4Al_COBJ9cGPI5PvKB",
    faviconUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKOjV0zhkHZQsl09PqwaGlhit9w8KR4v0tsW7Vsunm8hemRgEenQvSaOugDUcYOyDjw3ZW7NGZm0M9RueHmYxB6Wt3hCjIsdjvoz3EU9luj6rieZW4ac0m3Lmu3MG516bl_eSd9vLXEDA_lYKZxICtRwHFFBIdGvS2uzLszdn4fKe28K3mtoV5Kuh19yggGit1g7sHvurp4ij2FTrTpM1WVAj-JhKht-YUXUXAxo7TfAyf49TtA1IW",
    structuredData: {
      name: "Your Café Name Here",
      description: "Artisanal specialty coffee roastery and premium patisserie based in West Village, New York.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuL7mppNErBe9dy5wTWVuqvRauwCgi39aztTtQfzBVBiFQCgf1sM9SvumjJtqP6RYINM_Uqn_Oi2BYclORYsgQAwFZiehjfXt1P2vsrXPOqgKWtMabIT4gmU7SHK1QpkFO1_F7aeLVVm5xQu3KOmsn3XqHcaJNWnJxrJ8BMdV1jRkF6hiMW-0m50g0nm08JWhI7xTRoprZop4SIMeEzgYCHK2RL-kNySu6HO4Al_COBJ9cGPI5PvKB",
      telephone: "+12125550198",
      priceRange: "$$",
      address: {
        streetAddress: "42nd Artisanal Ave",
        addressLocality: "Greenwich Village",
        addressRegion: "NY",
        postalCode: "10014",
        addressCountry: "US"
      },
      openingHours: [
        "Mo-Fr 07:00-20:00",
        "Sa-Su 08:00-21:00"
      ],
      geo: {
        latitude: "40.737568",
        longitude: "-74.004147"
      }
    }
  }
};
