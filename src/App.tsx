import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  Quote, 
  Mail, 
  MapPin, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Sparkles, 
  Check, 
  ArrowUp,
  Heart,
  Award,
  BookOpen,
  ArrowRightLeft,
  Phone,
  Clock,
  ExternalLink,
  Star,
  Layers,
  Sparkle,
  MessageSquare,
  Compass,
  Smile,
  Eye,
  Send,
  Calendar,
  Coffee,
  Wifi,
  Flame,
  Zap,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Centralized configuration
import { CAFE_CONFIG } from './config';
import { CartItem, MenuItem, CartCustomization } from './types';

// Custom interactive components
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import ReservationSection from './components/ReservationSection';
import BrewingLab from './components/BrewingLab';
import NeighborhoodMap from './components/NeighborhoodMap';
import InstagramLightbox from './components/InstagramLightbox';

export default function App() {
  // Navigation & UI States
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<'Coffee' | 'Tea Selection' | 'Patisserie' | 'Brunch'>('Coffee');
  const [galleryFilter, setGalleryFilter] = useState<'All' | 'Interior' | 'Brewing' | 'Brunch'>('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeInstaPost, setActiveInstaPost] = useState<typeof CAFE_CONFIG.instagramPosts[0] | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null);
  
  // Newsletter & Form state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [tourEmail, setTourEmail] = useState('');
  const [tourSuccess, setTourSuccess] = useState(false);
  
  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);

  // Simulate loading sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // Smooth scroll handler
  const handleNavigateToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenQuickReservation = () => {
    handleNavigateToSection('reserve');
  };

  // Add Item to Cart
  const handleAddToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      // Check if item is already in cart
      const existingIdx = prevCart.findIndex(
        (cartItem) => cartItem.item.id === item.id
      );

      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += 1;
        return updated;
      } else {
        const defaultCustomization: CartCustomization = {
          milk: (item.category === 'Coffee' || item.category === 'Tea Selection') ? 'Oat' : undefined,
          sweetness: (item.category === 'Coffee' || item.category === 'Tea Selection') ? 'Normal' : undefined,
          temperature: (item.category === 'Coffee' || item.category === 'Tea Selection') ? 'Hot' : undefined,
        };

        return [
          ...prevCart,
          {
            id: `${item.id}-${Date.now()}`,
            item,
            quantity: 1,
            customization: defaultCustomization,
          },
        ];
      }
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (cartItemId: string, change: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((cartItem) => {
          if (cartItem.id === cartItemId) {
            const newQty = cartItem.quantity + change;
            return { ...cartItem, quantity: newQty };
          }
          return cartItem;
        })
        .filter((cartItem) => cartItem.quantity > 0);
    });
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== cartItemId));
  };

  const handleUpdateCustomization = (
    cartItemId: string, 
    field: 'milk' | 'sweetness' | 'temperature', 
    value: any
  ) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === cartItemId) {
          return {
            ...item,
            customization: {
              ...item.customization,
              [field]: value,
            },
          };
        }
        return item;
      })
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Newsletter Submit
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSuccess(false), 5000);
  };

  // Tour Submit
  const handleTourSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tourEmail) return;
    setTourSuccess(true);
    setTourEmail('');
    setTimeout(() => setTourSuccess(false), 5000);
  };

  // Filtered Menu Items
  const filteredMenuItems = CAFE_CONFIG.menuItems.filter(
    (item) => item.category === activeCategory
  );

  // Filtered Gallery Items
  const filteredGalleryImages = galleryFilter === 'All'
    ? CAFE_CONFIG.galleryImages
    : CAFE_CONFIG.galleryImages.filter(img => img.category === galleryFilter);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[100] bg-primary flex flex-col items-center justify-center text-white select-none">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.08)_0%,transparent_70%)] pointer-events-none animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff02_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="text-center space-y-8 max-w-md px-6 z-10">
          {/* Logo animation */}
          <div className="flex justify-center">
            <div className="relative w-20 h-20 rounded-full border border-secondary/30 flex items-center justify-center bg-white/5 shadow-2xl animate-bounce">
              <div className="absolute inset-0 rounded-full border-t-2 border-secondary animate-spin" style={{ animationDuration: '3s' }} />
              <span className="text-3xl">☕</span>
            </div>
          </div>

          <div className="space-y-3 animate-pulse">
            <h1 className="font-display text-3xl font-bold tracking-widest uppercase text-white">
              {CAFE_CONFIG.name}
            </h1>
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-secondary font-bold">
              Artisanal Roastery & Patisserie
            </p>
          </div>

          <div className="w-48 h-[1px] bg-white/10 mx-auto relative overflow-hidden rounded-full">
            <div className="absolute top-0 left-0 h-full bg-secondary w-1/2 animate-[loading_2s_infinite_ease-in-out]" />
          </div>

          <p className="font-display text-sm italic text-white/60 pt-4 leading-relaxed">
            "Crafting sensory architecture, one micro-lot at a time."
          </p>
        </div>

        {/* inline stylesheet for keyframes */}
        <style>{`
          @keyframes loading {
            0% { left: -100%; width: 50%; }
            50% { width: 70%; }
            100% { left: 100%; width: 50%; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-primary selection:bg-secondary selection:text-white flex flex-col relative">
      
      {/* 1. Header Navigation */}
      <Navbar 
        onCartToggle={() => setIsCartOpen(!isCartOpen)}
        cartCount={cart.reduce((acc, curr) => acc + curr.quantity, 0)}
        onNavigateToSection={handleNavigateToSection}
        onOpenQuickReservation={handleOpenQuickReservation}
      />

      {/* 2. Hero Presentation (with optimized background rendering & text alignments) */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-primary text-white pt-20">
        {/* Parallax Background Frame */}
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover opacity-35 scale-105 animate-[zoom_60s_infinite_alternate]" 
            alt="Artisanal Espresso Preparation" 
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=80"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#25160e_90%)]" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center py-20 space-y-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="inline-flex items-center gap-2 px-4.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-[10px] uppercase tracking-widest font-bold text-secondary-fixed"
          >
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            <span>{CAFE_CONFIG.shortDescription}</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-none max-w-5xl mx-auto"
          >
            {CAFE_CONFIG.name} <br />
            <span className="text-secondary italic font-normal tracking-normal font-display">Specialty Cafe & Roasters</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-white/70 max-w-2xl mx-auto text-sm md:text-base leading-relaxed"
          >
            {CAFE_CONFIG.detailedDescription1}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <button
              onClick={() => handleNavigateToSection('menu')}
              className="w-full sm:w-auto px-8 py-4.5 bg-secondary hover:bg-white hover:text-primary rounded-full font-sans text-xs uppercase tracking-widest font-bold transition-all duration-300 shadow-lg shadow-secondary/20 cursor-pointer flex items-center justify-center gap-2 group"
            >
              <span>Explore Visual Menu</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => handleNavigateToSection('reserve')}
              className="w-full sm:w-auto px-8 py-4.5 bg-white/10 hover:bg-white hover:text-primary rounded-full font-sans text-xs uppercase tracking-widest font-bold transition-all duration-300 backdrop-blur-sm border border-white/25 cursor-pointer flex items-center justify-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reserve Table</span>
            </button>
          </motion.div>

          {/* Scrolling Down Hint */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="pt-12 cursor-pointer inline-block"
            onClick={() => handleNavigateToSection('about')}
          >
            <div className="flex flex-col items-center gap-2 text-white/40 hover:text-white transition-colors">
              <span className="text-[10px] uppercase tracking-[0.25em]">Scroll Down</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </div>
          </motion.div>

        </div>
      </section>

      {/* 3. The Origin Story & Core Philosophy (About Section) */}
      <section className="py-24 bg-surface-container-low border-b border-primary/5 scroll-mt-20" id="about">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-5 space-y-6">
              <span className="font-sans text-xs uppercase tracking-[0.4em] text-secondary font-bold block">
                Single Origin Pursuit
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-primary leading-tight">
                Our Roastery & <br /> <span className="italic font-normal">Artisanal Patisserie</span>
              </h2>
              <div className="w-12 h-1 bg-secondary rounded-full mt-4 mb-6" />
              <p className="text-on-surface-variant text-sm leading-relaxed">
                At the heart of Greenwich Village, we operate a micro-lot roastery dedicated to transparency and taste clarity. We roast twice weekly, maintaining a shelf life of no more than 14 days for any retail pouch to capture maximum volatile aromatics.
              </p>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                {CAFE_CONFIG.detailedDescription2}
              </p>

              <div className="pt-6 grid grid-cols-3 gap-6 text-center border-t border-primary/10">
                <div>
                  <span className="block font-display text-3xl font-bold text-primary">88.5+</span>
                  <span className="block text-[9px] uppercase font-bold text-on-surface-variant/60 mt-1">SCA Score Cup Avg</span>
                </div>
                <div>
                  <span className="block font-display text-3xl font-bold text-primary">100%</span>
                  <span className="block text-[9px] uppercase font-bold text-on-surface-variant/60 mt-1">Direct Trade</span>
                </div>
                <div>
                  <span className="block font-display text-3xl font-bold text-primary">72 Hr</span>
                  <span className="block text-[9px] uppercase font-bold text-on-surface-variant/60 mt-1">Cold Ferment</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Card / Showcase Collage */}
            <div className="lg:col-span-7 grid grid-cols-12 gap-6 relative">
              <div className="col-span-8 rounded-2xl overflow-hidden shadow-xl aspect-square relative group">
                <img 
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-1000" 
                  alt="Roasting micro-lots" 
                  src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary/10" />
              </div>
              
              <div className="col-span-4 rounded-2xl overflow-hidden shadow-xl aspect-[3/4] self-end relative group">
                <img 
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-1000" 
                  alt="Dripping V60" 
                  src="https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=500&q=80"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary/10" />
              </div>

              {/* Floating Award Badge */}
              <div className="absolute -bottom-6 right-6 bg-white p-5 rounded-2xl shadow-2xl border border-primary/5 flex items-center gap-3.5 max-w-xs">
                <div className="p-3 bg-secondary/10 rounded-xl text-secondary">
                  <Award className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <span className="font-sans text-[10px] uppercase tracking-widest font-bold text-secondary block">
                    Winner 2025
                  </span>
                  <span className="font-display text-xs font-extrabold text-primary block mt-0.5">
                    Best Roastery & Lounge East Coast
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3.5 "Why Choose Us" Section (Requirement 9 & 10) */}
      <section className="py-24 bg-surface border-b border-primary/5 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <span className="font-sans text-xs uppercase tracking-[0.4em] text-secondary font-bold block">
              The Atelier Distinction
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary">Why Choose Us</h2>
            <div className="w-12 h-1 bg-secondary mx-auto mt-4 rounded-full" />
            <p className="text-on-surface-variant text-xs md:text-sm mt-3 leading-relaxed">
              Every detail is meticulously designed to refine your sensory experience, from award-winning micro-lots to elite-level hospitality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1: Fresh Coffee */}
            <div className="p-8 bg-white border border-primary/5 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-6 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                <Coffee className="w-6 h-6 stroke-[1.8]" />
              </div>
              <h3 className="font-display text-lg font-bold text-primary mb-2">Fresh Roasted Coffee</h3>
              <p className="text-xs text-on-surface-variant/80 leading-relaxed">
                Direct-trade beans rated 88.5+ SCA score, hand-selected by our master roaster and roasted twice weekly in small batches for absolute flavor clarity.
              </p>
            </div>

            {/* Feature 2: Premium Ingredients */}
            <div className="p-8 bg-white border border-primary/5 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-6 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                <Sparkles className="w-6 h-6 stroke-[1.8]" />
              </div>
              <h3 className="font-display text-lg font-bold text-primary mb-2">Premium Ingredients</h3>
              <p className="text-xs text-on-surface-variant/80 leading-relaxed">
                We utilize organic A2 dairy, house-milled gluten-free flour, artisanal direct-sourced matcha, and hand-scraped Bourbon vanilla beans.
              </p>
            </div>

            {/* Feature 3: Cozy Ambience */}
            <div className="p-8 bg-white border border-primary/5 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-6 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                <Flame className="w-6 h-6 stroke-[1.8]" />
              </div>
              <h3 className="font-display text-lg font-bold text-primary mb-2">Cozy Ambience</h3>
              <p className="text-xs text-on-surface-variant/80 leading-relaxed">
                Hand-plastered double-height plaster ceilings, custom vintage leather club chairs, warm brass details, and soft crackling fireplaces.
              </p>
            </div>

            {/* Feature 4: Free Enterprise Wi-Fi */}
            <div className="p-8 bg-white border border-primary/5 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-6 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                <Wifi className="w-6 h-6 stroke-[1.8]" />
              </div>
              <h3 className="font-display text-lg font-bold text-primary mb-2">Enterprise Gigabit Wi-Fi</h3>
              <p className="text-xs text-on-surface-variant/80 leading-relaxed">
                Seamless complimentary enterprise-grade fiber internet. Tailored specifically for modern digital nomads, creatives, and private work calls.
              </p>
            </div>

            {/* Feature 5: European Sidewalk Seating */}
            <div className="p-8 bg-white border border-primary/5 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-6 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                <Compass className="w-6 h-6 stroke-[1.8]" />
              </div>
              <h3 className="font-display text-lg font-bold text-primary mb-2">Sunlit Outdoor Terrace</h3>
              <p className="text-xs text-on-surface-variant/80 leading-relaxed">
                Beautiful European sidewalk seating featuring custom Parisian wicker chairs under sun-shaded parasols and fresh seasonal florals.
              </p>
            </div>

            {/* Feature 6: Fast Express Service */}
            <div className="p-8 bg-white border border-primary/5 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-6 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                <Zap className="w-6 h-6 stroke-[1.8]" />
              </div>
              <h3 className="font-display text-lg font-bold text-primary mb-2">Express Order Checkout</h3>
              <p className="text-xs text-on-surface-variant/80 leading-relaxed">
                Order instantly on WhatsApp to skip the queue, or enjoy swift service from our certified baristas who masterfully pull every extraction.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Highly Curated Visual Menu & Cart (Requirement 3 & 9) */}
      <section className="py-24 bg-surface scroll-mt-20" id="menu">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-6 border-b border-primary/10 pb-10">
            <div>
              <span className="font-sans text-xs uppercase tracking-[0.4em] text-secondary font-bold block">
                Sensory Discoveries
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mt-3">
                Curated Atelier Menu
              </h2>
            </div>

            {/* Category Swappers */}
            <div className="flex flex-wrap gap-2">
              {(['Coffee', 'Tea Selection', 'Patisserie', 'Brunch'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full font-sans text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-primary text-white shadow-md shadow-primary/10'
                      : 'bg-surface-container hover:bg-surface-container-high text-primary/80'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout of Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMenuItems.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-2xl p-5 border border-primary/5 shadow-md flex flex-col justify-between hover:shadow-xl hover:border-primary/10 transition-all duration-300 group"
              >
                <div>
                  <div className="aspect-[16/10] rounded-xl overflow-hidden bg-primary-container relative">
                    <img 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" 
                      alt={item.name} 
                      src={item.image}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div className="flex justify-between items-start mt-5 mb-2">
                    <h3 className="font-display text-base font-bold text-primary">
                      {item.name}
                    </h3>
                    <span className="font-sans text-sm font-extrabold text-secondary shrink-0">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                  
                  <p className="text-xs text-on-surface-variant/70 leading-relaxed min-h-[40px] mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-primary/5">
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags?.map((tag) => (
                      <span 
                        key={tag}
                        className="text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded bg-surface-container-high text-primary/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Dual CTA buttons throughout (Requirement 3: Improved CTAs) */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-primary text-on-primary py-3 px-1 rounded-lg font-sans text-[10px] uppercase tracking-wider font-bold hover:bg-secondary transition-all shadow-sm cursor-pointer"
                    >
                      Add Selection
                    </button>
                    <a
                      href={`https://wa.me/${CAFE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                        `Hi, I would like to order "${item.name}" ($${item.price.toFixed(2)}) on WhatsApp. Can you confirm availability?`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-1 rounded-lg font-sans text-[10px] uppercase tracking-wider font-bold transition-all shadow-sm cursor-pointer flex items-center justify-center gap-1"
                    >
                      <Phone className="w-3 h-3" />
                      <span>WhatsApp Order</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Today's Specials & Seasonal Masterpieces (Requirement 11) */}
      <section className="py-24 bg-surface-container-low border-y border-primary/5 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-6">
            <div>
              <span className="font-sans text-xs uppercase tracking-[0.4em] text-secondary font-bold block">
                Chef's Handcrafted Selections
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mt-3">
                Today's Specials <span className="italic font-normal">& Masterpieces</span>
              </h2>
            </div>
            
            <div className="flex gap-3">
              <span className="text-[10px] uppercase font-bold text-on-surface-variant/60">
                Freshly Sourced by Award-Winning Farmers
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CAFE_CONFIG.menuItems.filter(item => item.tags?.includes('Signature')).slice(0, 3).map((fav) => (
              <div key={fav.id} className="group flex flex-col justify-between space-y-4 bg-white p-5 rounded-2xl shadow-sm border border-primary/5">
                <div className="aspect-[16/10] overflow-hidden rounded-xl bg-surface-container-low relative">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-1000" 
                    alt={fav.name} 
                    src={fav.image}
                    loading="lazy"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-secondary text-white text-[8px] font-extrabold uppercase tracking-widest shadow-sm rounded-full">
                    Signature Cup
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-display text-lg font-bold text-primary">{fav.name}</h4>
                    <span className="font-sans font-extrabold text-secondary">${fav.price.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-on-surface-variant/70 leading-relaxed min-h-[36px]">
                    {fav.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => handleAddToCart(fav)}
                    className="w-full bg-primary text-white hover:bg-secondary py-3.5 rounded-lg font-sans text-[10px] uppercase tracking-widest font-bold transition-all border border-primary/5 cursor-pointer"
                  >
                    Quick Add
                  </button>
                  <a
                    href={`https://wa.me/${CAFE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                      `Hi! I would like to order your signature special "${fav.name}" on WhatsApp. Please guide me through payment.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-lg font-sans text-[10px] uppercase tracking-widest font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>WhatsApp Order</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Glimpses of Perfection (Requirement 5: Masonry Grid Layout with dynamic hover filters) */}
      <section className="py-24 bg-surface-container border-y border-primary/5 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <span className="font-sans text-xs uppercase tracking-[0.4em] text-secondary font-bold block">
              Atelier Interior
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary">Glimpses of Perfection</h2>
            <div className="w-12 h-1 bg-secondary mx-auto mt-4 rounded-full" />
            
            {/* Gallery Filters (Masonry filters) */}
            <div className="flex flex-wrap justify-center gap-2 pt-6">
              {(['All', 'Interior', 'Brewing', 'Brunch'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setGalleryFilter(filter)}
                  className={`px-4 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-bold transition-all cursor-pointer ${
                    galleryFilter === filter
                      ? 'bg-secondary text-white'
                      : 'bg-white text-primary border border-primary/5 hover:bg-primary/5'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredGalleryImages.map((img, index) => (
              <div 
                key={index} 
                onClick={() => setActiveGalleryIndex(index)}
                className="break-inside-avoid bg-white p-4.5 rounded-2xl border border-primary/5 shadow-sm group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
              >
                <div className="overflow-hidden rounded-xl relative">
                  <img 
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-105" 
                    alt={img.title} 
                    src={img.url}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 bg-white/90 text-primary text-[10px] uppercase tracking-widest font-bold rounded shadow-lg">
                      View Space
                    </span>
                  </div>
                </div>
                <div className="mt-4 space-y-1">
                  <span className="text-[9px] uppercase tracking-wider text-secondary font-bold block">
                    {img.category}
                  </span>
                  <h4 className="font-display text-sm font-bold text-primary">{img.title}</h4>
                  <p className="text-[11px] text-on-surface-variant/70 leading-relaxed">{img.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Virtual Atelier (Interactive Coffee Chemistry Simulation) */}
      <BrewingLab />

      {/* 8. 3D Café Virtual Tour placeholder section with coming soon label (Requirement 12) */}
      <section className="py-24 bg-primary text-white overflow-hidden scroll-mt-20 relative border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
            
            {/* Left Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-secondary text-white text-[9px] uppercase tracking-[0.2em] font-bold rounded-full">
                <Layers className="w-3 h-3 animate-spin" />
                <span>COMING SOON</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
                Interactive <br /> <span className="text-secondary italic font-normal">3D Café Tour</span>
              </h2>
              <p className="text-white/70 text-sm leading-relaxed">
                Step inside our West Village headquarters from anywhere in the world. Experience the spatial design, examine roastery equipment closer, and pre-book specific alcoves dynamically in high-fidelity 3D WebGL.
              </p>
              
              <ul className="space-y-3.5 text-xs text-white/80 pt-2 font-sans">
                <li className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span>Real-time spatial visualization in WebGL</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span>Select and reserve specific alcove tables dynamically</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span>Interactive roastery learning points & score cards</span>
                </li>
              </ul>

              {/* Newsletter notifier */}
              <form onSubmit={handleTourSubmit} className="flex gap-2 max-w-md pt-4">
                <input
                  required
                  type="email"
                  placeholder="Enter email for private beta"
                  value={tourEmail}
                  onChange={(e) => setTourEmail(e.target.value)}
                  className="bg-white/10 border-0 border-b border-white/20 text-xs text-white py-3.5 px-3 w-full focus:ring-0 focus:border-white transition-all placeholder:text-white/40 rounded"
                />
                <button
                  type="submit"
                  className="bg-secondary hover:bg-white hover:text-primary px-6 rounded text-xs font-bold uppercase tracking-widest transition-all cursor-pointer whitespace-nowrap"
                >
                  Notify Me
                </button>
              </form>

              {tourSuccess && (
                <p className="text-xs text-secondary font-bold animate-pulse">
                  ✓ Registered! You have been prioritized for our Spatial Private Beta.
                </p>
              )}
            </div>

            {/* Right Visual Representation (Atelier Mockup) */}
            <div className="lg:col-span-6 relative h-[300px] md:h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/15">
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80"
                alt="Interactive 3D Preview"
                className="w-full h-full object-cover opacity-50 blur-[1px]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              
              {/* Overlay Interactive Mock Trigger */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-secondary/90 hover:bg-white hover:text-primary transition-all flex items-center justify-center text-white cursor-pointer shadow-lg animate-pulse">
                  <Eye className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-sans text-[10px] uppercase tracking-widest font-bold text-secondary block">
                    Interactive Preview Mode
                  </span>
                  <span className="text-white/80 text-xs block mt-1">
                    Demo is currently compiling assets. Registered users will get access on 15 July 2026.
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. Premium Customer Testimonials with 5-star ratings (Requirement 4) */}
      <section className="py-24 bg-surface scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <span className="font-sans text-xs uppercase tracking-[0.4em] text-secondary font-bold block">
              Atelier Reviews
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary">Connoisseur Reviews</h2>
            <div className="w-12 h-1 bg-secondary mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CAFE_CONFIG.testimonials.map((rev, index) => {
              const isCenter = index === 1; // Center card style pop
              return (
                <div 
                  key={rev.id} 
                  className={`p-10 rounded-2xl border transition-all duration-300 flex flex-col justify-between space-y-6 ${
                    isCenter 
                      ? 'bg-primary text-white border-primary shadow-xl scale-102 z-10' 
                      : 'bg-white text-primary border-primary/5 shadow-sm hover:shadow-md hover:-translate-y-1'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Quote className={`w-8 h-8 ${isCenter ? 'text-secondary' : 'text-secondary/40'}`} />
                      
                      {/* Five Star rating */}
                      <div className="flex gap-0.5 text-secondary">
                        {Array.from({ length: rev.rating }).map((_, s) => (
                          <Star key={s} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                    
                    <p className="font-display text-sm md:text-base italic leading-relaxed">
                      "{rev.quote}"
                    </p>
                  </div>

                  <div className="pt-5 border-t border-primary/10 flex items-center gap-4">
                    <img
                      src={rev.avatar}
                      alt={rev.author}
                      className="w-10 h-10 rounded-full object-cover border border-secondary/20"
                      loading="lazy"
                    />
                    <div>
                      <p className={`font-sans text-xs uppercase tracking-widest font-bold ${isCenter ? 'text-secondary' : 'text-primary'}`}>
                        {rev.author}
                      </p>
                      <p className={`text-[9px] uppercase font-bold mt-0.5 ${isCenter ? 'text-white/50' : 'text-on-surface-variant/50'}`}>
                        {rev.role}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. Table Reservation Section */}
      <ReservationSection />

      {/* 11. Interactive Greenwich Village Map */}
      <NeighborhoodMap />

      {/* 12. Instagram Feed & Lightbox Link (Requirement 13) */}
      <section className="py-24 bg-surface scroll-mt-20 border-t border-primary/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 text-center md:text-left">
            <div>
              <span className="font-sans text-xs uppercase tracking-widest font-bold text-secondary block">
                Social Narratives
              </span>
              <h4 className="font-display text-2xl font-bold text-primary mt-2">
                Follow our daily brew @TheCoffeeCorner
              </h4>
            </div>
            
            <a 
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-on-surface-variant hover:text-secondary font-sans text-xs uppercase tracking-widest font-bold flex items-center gap-2 group transition-colors"
            >
              <span>Join 45k Enthusiasts</span>
              <span className="bg-primary/5 group-hover:bg-secondary group-hover:text-white px-2.5 py-1 rounded font-mono text-[10px] transition-all">45K</span>
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CAFE_CONFIG.instagramPosts.map((post) => (
              <button
                key={post.id}
                onClick={() => setActiveInstaPost(post)}
                className="group aspect-square rounded-xl overflow-hidden bg-primary relative cursor-pointer focus:outline-none"
              >
                {/* Image with optimized lazy loading */}
                <img 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  alt="Instagram feed" 
                  src={post.image}
                  loading="lazy"
                />
                
                {/* Hover Stats Overlays */}
                <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 text-white text-xs font-bold">
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-4 h-4 fill-current text-rose-500" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="text-[9px] uppercase tracking-widest text-white/80">
                    Interact / Comment
                  </div>
                </div>
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* 13. Enhanced Footer (Requirement 7) */}
      <footer className="w-full py-16 bg-primary text-white border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          <div className="md:col-span-5 space-y-6">
            <h2 className="font-display text-2xl font-bold italic text-white">{CAFE_CONFIG.name}</h2>
            <p className="text-white/60 text-xs max-w-sm leading-relaxed">
              {CAFE_CONFIG.detailedDescription1}
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex max-w-sm gap-2">
              <input 
                required
                type="email" 
                placeholder="Join the Newsletter" 
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="bg-white/10 border-0 border-b border-white/20 text-xs text-white py-3.5 px-3 w-full focus:ring-0 focus:border-white transition-all placeholder:text-white/40 rounded"
              />
              <button 
                type="submit"
                className="px-6 border-b border-white/20 hover:text-secondary transition-colors text-xs font-bold font-sans uppercase tracking-widest cursor-pointer"
              >
                Join
              </button>
            </form>

            {newsletterSuccess && (
              <p className="text-xs text-secondary font-bold animate-pulse">
                ✓ Success! Welcome to the inside circle of specialty coffee curation.
              </p>
            )}
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 flex flex-col gap-3 text-xs">
            <p className="font-sans text-[10px] uppercase tracking-widest text-secondary font-bold mb-2">Discover</p>
            <button onClick={() => handleNavigateToSection('menu')} className="text-white/60 hover:text-white hover:translate-x-1 transition-all text-left">Our Menu</button>
            <button onClick={() => handleNavigateToSection('about')} className="text-white/60 hover:text-white hover:translate-x-1 transition-all text-left">Origin Stories</button>
            <button onClick={() => handleNavigateToSection('experience')} className="text-white/60 hover:text-white hover:translate-x-1 transition-all text-left">The Brewery</button>
            <button onClick={() => handleNavigateToSection('reserve')} className="text-white/60 hover:text-white hover:translate-x-1 transition-all text-left">Book a Table</button>
          </div>

          {/* Opening Hours list directly in Footer */}
          <div className="md:col-span-2 flex flex-col gap-3 text-xs">
            <p className="font-sans text-[10px] uppercase tracking-widest text-secondary font-bold mb-2">Opening Hours</p>
            <div className="text-white/60 space-y-1">
              <p className="font-semibold text-white/95">Weekdays</p>
              <p>{CAFE_CONFIG.hours.weekdays.split(': ')[1]}</p>
              <p className="font-semibold text-white/95 pt-2">Weekends</p>
              <p>{CAFE_CONFIG.hours.weekends.split(': ')[1]}</p>
            </div>
          </div>

          {/* Contact Information & Socials in Footer */}
          <div className="md:col-span-3 flex flex-col gap-3 text-xs">
            <p className="font-sans text-[10px] uppercase tracking-widest text-secondary font-bold mb-2">Artisanal Address</p>
            <div className="text-white/60 space-y-2">
              <p className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
                <span>{CAFE_CONFIG.address}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-secondary" />
                <a href={`tel:${CAFE_CONFIG.phone}`} className="hover:text-white transition-colors underline">{CAFE_CONFIG.phoneFormatted}</a>
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-secondary" />
                <a href={`mailto:${CAFE_CONFIG.email}`} className="hover:text-white transition-colors underline">{CAFE_CONFIG.email}</a>
              </p>
            </div>

            {/* Social media links integrated nicely */}
            <div className="flex gap-4 pt-3">
              <a href={CAFE_CONFIG.instagramUrl} target="_blank" rel="noreferrer" className="text-white/50 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={CAFE_CONFIG.twitterUrl} target="_blank" rel="noreferrer" className="text-white/50 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href={CAFE_CONFIG.linkedinUrl} target="_blank" rel="noreferrer" className="text-white/50 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p className="text-white/40">
            © 2026 {CAFE_CONFIG.name}. Artisanal Excellence. Configured for Global Reuse.
          </p>
          <div className="flex gap-6 text-white/40 font-semibold tracking-wider font-sans text-[10px] uppercase">
            <span>New York</span>
            <span>London</span>
            <span>Tokyo</span>
          </div>
        </div>
      </footer>

      {/* 14. Requirement 1: FLOATING WHATSAPP BUTTON (Visible on all pages, right bottom) */}
      <a
        href={`https://wa.me/${CAFE_CONFIG.whatsappNumber}?text=${encodeURIComponent(CAFE_CONFIG.whatsappMessage)}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 text-white p-4 rounded-full shadow-2xl hover:bg-emerald-500 hover:scale-110 active:scale-95 transition-all flex items-center justify-center group cursor-pointer"
        aria-label="Contact us on WhatsApp"
        id="floating-whatsapp-btn"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-600/30 animate-ping -z-10" />
        <Phone className="w-5 h-5 fill-current" />
        <span className="absolute right-16 whitespace-nowrap bg-emerald-600 text-white font-sans text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full shadow-lg opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none">
          Order on WhatsApp
        </span>
      </a>

      {/* Floating Scroll-to-Top FAB */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-24 right-6 z-40 w-11 h-11 bg-white border border-primary/10 text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-md cursor-pointer group"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
      </button>

      {/* Interactive Cart sliding drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onUpdateCustomization={handleUpdateCustomization}
        onClearCart={handleClearCart}
      />

      {/* Interactive Instagram Lightbox modal */}
      <InstagramLightbox
        post={activeInstaPost}
        onClose={() => setActiveInstaPost(null)}
      />

      {/* Premium Gallery Lightbox Modal (Requirement 5) */}
      {activeGalleryIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" aria-modal="true" role="dialog">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-primary/90 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setActiveGalleryIndex(null)}
          />

          {/* Lightbox Modal Wrapper */}
          <div className="relative bg-white rounded-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row shadow-2xl z-10 border border-primary/5 h-[80vh] md:h-[550px]">
            
            {/* Left/Main Image Stage */}
            <div className="relative bg-black flex-1 flex items-center justify-center overflow-hidden h-[40vh] md:h-full group">
              <img
                src={filteredGalleryImages[activeGalleryIndex].url}
                alt={filteredGalleryImages[activeGalleryIndex].title}
                className="w-full h-full object-cover transition-transform duration-500"
              />

              {/* Next/Prev Navigation inside Image */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveGalleryIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredGalleryImages.length - 1));
                }}
                className="absolute left-4 p-2.5 rounded-full bg-primary/40 hover:bg-secondary text-white transition-all cursor-pointer backdrop-blur-sm"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveGalleryIndex((prev) => (prev !== null && prev < filteredGalleryImages.length - 1 ? prev + 1 : 0));
                }}
                className="absolute right-4 p-2.5 rounded-full bg-primary/40 hover:bg-secondary text-white transition-all cursor-pointer backdrop-blur-sm"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Right Information Pane */}
            <div className="p-8 flex flex-col justify-between bg-white w-full md:w-[320px] shrink-0 h-[40vh] md:h-full border-t md:border-t-0 md:border-l border-primary/5">
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-secondary font-extrabold block">
                      {filteredGalleryImages[activeGalleryIndex].category}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-primary mt-1 leading-tight">
                      {filteredGalleryImages[activeGalleryIndex].title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveGalleryIndex(null)}
                    className="p-1.5 rounded-full hover:bg-primary/5 text-primary/40 hover:text-primary transition-all cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="w-8 h-[2px] bg-secondary rounded-full" />

                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {filteredGalleryImages[activeGalleryIndex].desc}
                </p>

                <div className="space-y-2 text-[11px] font-sans text-on-surface-variant/70 bg-surface p-4 rounded-xl border border-primary/5">
                  <div className="flex justify-between">
                    <span className="font-bold text-primary">Location:</span>
                    <span>Greenwich Village, NYC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-primary">Vibe:</span>
                    <span>Artisanal & Cozy</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-primary">Camera:</span>
                    <span>Leica M11 • 35mm</span>
                  </div>
                </div>
              </div>

              {/* Action Button inside Lightbox */}
              <button
                onClick={() => {
                  setActiveGalleryIndex(null);
                  handleNavigateToSection('reserve');
                }}
                className="w-full bg-primary text-on-primary py-3.5 rounded-xl font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-secondary transition-all cursor-pointer shadow-md text-center"
              >
                Book Table Near Here
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
