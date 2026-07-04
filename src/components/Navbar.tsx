import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Calendar, Coffee } from 'lucide-react';
import { CAFE_CONFIG } from '../config';

interface NavbarProps {
  onCartToggle: () => void;
  cartCount: number;
  onNavigateToSection: (sectionId: string) => void;
  onOpenQuickReservation: () => void;
}

export default function Navbar({
  onCartToggle,
  cartCount,
  onNavigateToSection,
  onOpenQuickReservation,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navLinks = [
    { label: 'Origin Story', id: 'about' },
    { label: 'Our Menu', id: 'menu' },
    { label: 'Brewing Lab', id: 'experience' },
    { label: 'Book Table', id: 'reserve' },
    { label: 'Find Us', id: 'location' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    navLinks.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigateToSection(id);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 h-20 ${
        isScrolled
          ? 'bg-surface/90 backdrop-blur-xl border-b border-primary/10 shadow-lg shadow-primary/3'
          : 'bg-transparent border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center h-full">
        {/* Brand Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`font-display text-2xl font-bold italic tracking-tight transition-colors duration-300 flex items-center gap-2 ${
            isScrolled ? 'text-primary' : 'text-white'
          }`}
        >
          <Coffee className="w-5 h-5 stroke-[1.5]" />
          <span>{CAFE_CONFIG.name}</span>
        </a>

        {/* Desktop Menu Links */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`font-sans text-xs uppercase tracking-[0.2em] font-medium transition-all relative py-1 group ${
                  isActive
                    ? 'text-secondary font-semibold'
                    : isScrolled
                    ? 'text-primary hover:text-secondary'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-0 h-[1.5px] transition-all duration-300 ${
                  isActive
                    ? 'w-full bg-secondary'
                    : 'w-0 group-hover:w-full ' + (isScrolled ? 'bg-secondary' : 'bg-white')
                }`} />
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenQuickReservation}
            className={`hidden lg:flex items-center gap-2 px-5 py-2.5 font-sans text-xs uppercase tracking-wider rounded-full font-medium transition-all duration-300 cursor-pointer ${
              isScrolled
                ? 'bg-primary text-on-primary hover:bg-primary-container hover:shadow-md'
                : 'bg-white/10 text-white backdrop-blur-sm border border-white/20 hover:bg-white hover:text-primary'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Reserve Table</span>
          </button>

          {/* Cart Trigger with Indicator */}
          <button
            onClick={onCartToggle}
            className={`relative p-2.5 rounded-full transition-all duration-300 ${
              isScrolled
                ? 'text-primary hover:bg-primary/5'
                : 'text-white hover:bg-white/10'
            }`}
            aria-label="Open Shopping Bag"
            id="shopping-bag-btn"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-secondary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-full transition-all duration-300 ${
              isScrolled
                ? 'text-primary hover:bg-primary/5'
                : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-primary/95 backdrop-blur-xl flex flex-col justify-center items-center gap-8 md:hidden text-center transition-all duration-500">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full text-white/75 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-display text-3xl font-bold italic text-white mb-6"
          >
            {CAFE_CONFIG.name}
          </a>

          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`font-sans text-sm uppercase tracking-[0.25em] font-semibold py-2 transition-colors ${
                  isActive ? 'text-secondary' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            );
          })}

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenQuickReservation();
            }}
            className="mt-6 flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-full font-sans text-xs uppercase tracking-widest font-bold hover:bg-primary-container hover:text-on-primary-container transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>Book a Table</span>
          </button>
        </div>
      )}
    </nav>
  );
}
