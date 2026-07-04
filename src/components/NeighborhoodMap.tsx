import React, { useState } from 'react';
import { MapPin, Compass, Navigation, Clock, Star, Landmark, Calendar, Phone, Mail, ExternalLink } from 'lucide-react';
import { CAFE_CONFIG } from '../config';

export default function NeighborhoodMap() {
  const [mapType, setMapType] = useState<'custom' | 'google'>('custom');
  const [selectedLandmark, setSelectedLandmark] = useState(CAFE_CONFIG.mapLandmarks[0]);
  const [isSimulatingRoute, setIsSimulatingRoute] = useState(false);
  const [routeDistance, setRouteDistance] = useState<string | null>(null);

  const handleLandmarkClick = (landmark: typeof CAFE_CONFIG.mapLandmarks[0]) => {
    setSelectedLandmark(landmark);
    setRouteDistance(null);
  };

  const handleSimulateRoute = () => {
    setIsSimulatingRoute(true);
    setTimeout(() => {
      setIsSimulatingRoute(false);
      // Compute mock walking distance based on coordinate distances
      const dx = Math.abs(selectedLandmark.x - 50);
      const dy = Math.abs(selectedLandmark.y - 55);
      const blocks = Math.ceil((dx + dy) / 6);
      if (selectedLandmark.name === CAFE_CONFIG.name) {
        setRouteDistance("You are already here at the sanctuary!");
      } else {
        setRouteDistance(`Walk simulated successfully: ${blocks} blocks • ${blocks * 1.5} minutes walking distance.`);
      }
    }, 1200);
  };

  return (
    <section className="py-24 bg-surface-container-low border-t border-primary/5 scroll-mt-20" id="location">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <span className="font-sans text-xs uppercase tracking-[0.4em] text-secondary font-semibold block">
            Where to Find Us
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary">Sanctuary Location</h2>
          <div className="w-12 h-1 bg-secondary mx-auto mt-4 rounded-full" />
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 bg-surface-container rounded-full border border-primary/5">
            <button
              onClick={() => setMapType('custom')}
              className={`px-6 py-2 rounded-full font-sans text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
                mapType === 'custom'
                  ? 'bg-primary text-white shadow-md'
                  : 'text-on-surface-variant/70 hover:text-primary'
              }`}
            >
              Custom Neighborhood Guide
            </button>
            <button
              onClick={() => setMapType('google')}
              className={`px-6 py-2 rounded-full font-sans text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
                mapType === 'google'
                  ? 'bg-primary text-white shadow-md'
                  : 'text-on-surface-variant/70 hover:text-primary'
              }`}
            >
              Live Google Maps
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Map Rendering Column */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <div className="flex justify-between items-center bg-white p-4.5 rounded-xl border border-primary/5 shadow-sm">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-secondary animate-spin-slow" />
                <span className="font-sans text-xs uppercase tracking-widest font-bold text-primary">
                  {mapType === 'custom' ? 'Interactive Cartography' : 'Live Google Navigation'}
                </span>
              </div>
              <span className="text-[10px] uppercase font-bold text-secondary">
                {CAFE_CONFIG.establishedLocation} Neighborhood
              </span>
            </div>

            {mapType === 'custom' ? (
              /* Stylized Vector SVG Map Container */
              <div className="relative bg-primary-container rounded-2xl h-[480px] overflow-hidden border border-primary/20 shadow-xl group">
                {/* Grid Background Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                {/* Vector Streets / Blocks drawing */}
                <svg className="absolute inset-0 w-full h-full stroke-white/5 stroke-[1.5] fill-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <line x1="0" y1="20" x2="100" y2="40" />
                  <line x1="0" y1="50" x2="100" y2="70" />
                  <line x1="0" y1="80" x2="100" y2="100" />
                  
                  <line x1="20" y1="0" x2="40" y2="100" />
                  <line x1="50" y1="0" x2="70" y2="100" />
                  <line x1="80" y1="0" x2="100" y2="100" />

                  {/* Simulated Walking Route Corridor */}
                  {isSimulatingRoute && (
                    <path
                      d={`M 50 55 L ${selectedLandmark.x} 55 L ${selectedLandmark.x} ${selectedLandmark.y}`}
                      className="stroke-secondary stroke-2 stroke-dasharray animate-[dash_2s_infinite_linear]"
                      style={{ strokeDasharray: '4,4' }}
                    />
                  )}
                </svg>

                <div className="absolute top-8 left-1/2 -translate-x-1/2 text-white/10 text-4xl font-display font-semibold select-none pointer-events-none">
                  WEST VILLAGE
                </div>

                {/* Interactive Landmark Pins */}
                {CAFE_CONFIG.mapLandmarks.map((landmark) => {
                  const isSelected = selectedLandmark.name === landmark.name;
                  const isCoffeeShop = landmark.type === 'shop';

                  return (
                    <button
                      key={landmark.name}
                      onClick={() => handleLandmarkClick(landmark)}
                      className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-20 group cursor-pointer"
                      style={{ left: `${landmark.x}%`, top: `${landmark.y}%` }}
                    >
                      <span className={`absolute -inset-4 rounded-full transition-all duration-500 scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 ${
                        isCoffeeShop ? 'bg-secondary/20 animate-ping' : 'bg-white/10'
                      }`} />

                      <div className={`p-2 rounded-full border transition-all ${
                        isSelected
                          ? 'bg-secondary text-white border-white scale-125 shadow-lg shadow-secondary/50'
                          : isCoffeeShop
                          ? 'bg-primary text-white border-secondary scale-110'
                          : 'bg-white text-primary border-primary/20 hover:scale-110'
                      }`}>
                        {isCoffeeShop ? (
                          <Star className="w-3.5 h-3.5 fill-current" />
                        ) : (
                          <MapPin className="w-3.5 h-3.5" />
                        )}
                      </div>

                      <span className="absolute left-1/2 -translate-x-1/2 bottom-8 whitespace-nowrap bg-primary text-white text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded shadow-md opacity-0 group-hover:opacity-100 pointer-events-none transition-all">
                        {landmark.name}
                      </span>
                    </button>
                  );
                })}

                <div className="absolute bottom-4 right-4 bg-primary/80 backdrop-blur-sm text-[9px] font-mono tracking-wider px-2.5 py-1 rounded text-white border border-white/10">
                  100 YARDS
                </div>
              </div>
            ) : (
              /* Real Embedded Google Maps Iframe Section with premium custom styling boundaries */
              <div className="rounded-2xl h-[480px] overflow-hidden border border-primary/10 shadow-xl relative bg-surface-container-low">
                <iframe
                  title="Google Maps Location"
                  src={CAFE_CONFIG.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(0.15) contrast(1.05) invert(0)' }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
              </div>
            )}
          </div>

          {/* Interactive Information Column */}
          <div className="lg:col-span-5 bg-white p-8 rounded-2xl border border-primary/5 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              
              {/* HQ Sanctuary Brand & Address */}
              <div>
                <span className="font-sans text-[10px] uppercase tracking-[0.25em] font-bold text-secondary block">
                  Artisanal Headquarters
                </span>
                <h3 className="font-display text-2xl font-bold text-primary mt-1">
                  {CAFE_CONFIG.name}
                </h3>
                <p className="text-xs text-on-surface-variant/80 mt-2 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                  <span>{CAFE_CONFIG.address}</span>
                </p>
              </div>

              {/* Opening Hours Section (Persistent) */}
              <div className="p-5 bg-surface-container rounded-xl border border-primary/5 space-y-3">
                <div className="flex items-center gap-2 border-b border-primary/5 pb-2 text-primary font-bold">
                  <Clock className="w-4 h-4 text-secondary" />
                  <span className="font-sans text-xs uppercase tracking-widest">Opening Hours</span>
                </div>
                <div className="space-y-2 text-xs text-on-surface-variant">
                  <div className="flex justify-between">
                    <span>Weekdays</span>
                    <span className="font-semibold">{CAFE_CONFIG.hours.weekdays.split(': ')[1]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Weekends</span>
                    <span className="font-semibold">{CAFE_CONFIG.hours.weekends.split(': ')[1]}</span>
                  </div>
                </div>
              </div>

              {/* Quick Contacts (Persistent) */}
              <div className="p-5 bg-surface-container rounded-xl border border-primary/5 space-y-3">
                <div className="flex items-center gap-2 border-b border-primary/5 pb-2 text-primary font-bold">
                  <Calendar className="w-4 h-4 text-secondary" />
                  <span className="font-sans text-xs uppercase tracking-widest">Connect Directly</span>
                </div>
                <div className="space-y-2 text-xs text-on-surface-variant">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-secondary/70" /> Phone</span>
                    <a href={`tel:${CAFE_CONFIG.phone}`} className="font-semibold hover:text-secondary transition-colors underline">{CAFE_CONFIG.phoneFormatted}</a>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-secondary/70" /> Email</span>
                    <a href={`mailto:${CAFE_CONFIG.email}`} className="font-semibold hover:text-secondary transition-colors underline">{CAFE_CONFIG.email}</a>
                  </div>
                </div>
              </div>

              {/* Interactive Custom Map Walk Guide (Only when Custom Cartography is active) */}
              {mapType === 'custom' && (
                <div className="p-5 bg-secondary/5 border border-secondary/10 rounded-xl space-y-4">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-secondary font-bold block">
                      Custom Walk Companion
                    </span>
                    <h4 className="font-display font-bold text-primary mt-1 text-sm">
                      {selectedLandmark.name}
                    </h4>
                    <p className="text-[11px] text-on-surface-variant mt-1">
                      {selectedLandmark.desc}
                    </p>
                  </div>

                  <div className="flex justify-between items-center text-[11px] border-t border-secondary/10 pt-2">
                    <span className="text-on-surface-variant/70">Category</span>
                    <span className="font-bold text-primary uppercase tracking-widest">
                      {selectedLandmark.type}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-on-surface-variant/70">Estimated Walk</span>
                    <span className="font-bold text-secondary flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {selectedLandmark.name === CAFE_CONFIG.name
                        ? '0 mins'
                        : `${Math.ceil((Math.abs(selectedLandmark.x - 50) + Math.abs(selectedLandmark.y - 55)) / 6) * 1.5} mins`}
                    </span>
                  </div>

                  {routeDistance && (
                    <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-lg text-emerald-800 text-[11px] font-semibold flex items-center gap-2">
                      <Navigation className="w-3.5 h-3.5 text-emerald-600 rotate-45" />
                      <span>{routeDistance}</span>
                    </div>
                  )}

                  <button
                    onClick={handleSimulateRoute}
                    disabled={isSimulatingRoute}
                    className="w-full bg-primary text-on-primary py-2.5 rounded-lg font-sans text-[10px] uppercase tracking-widest font-bold hover:bg-secondary disabled:bg-primary/50 transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSimulatingRoute ? (
                      <>
                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Mapping walking path...</span>
                      </>
                    ) : (
                      <>
                        <Navigation className="w-3 h-3" />
                        <span>Simulate Walking Path</span>
                      </>
                    )}
                  </button>
                </div>
              )}

            </div>

            {/* Main Universal Action (Get Driving Directions) */}
            <div className="space-y-3 pt-6 border-t border-primary/10">
              <a
                href={CAFE_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-secondary text-white py-4 font-sans text-xs uppercase tracking-widest font-bold hover:bg-primary transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all duration-300"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Get Driving Directions</span>
              </a>

              <div className="text-center">
                <span className="text-[10px] text-on-surface-variant/50">
                  {CAFE_CONFIG.address}
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
