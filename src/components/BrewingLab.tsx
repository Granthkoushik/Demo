import React, { useState, useEffect } from 'react';
import { Play, Sparkles, Sliders, RefreshCw, Award, Coffee, Beaker, CheckCircle2 } from 'lucide-react';
import { BREWING_METHODS } from '../data';
import { BrewingMethod } from '../types';

export default function BrewingLab() {
  const [selectedMethod, setSelectedMethod] = useState<BrewingMethod>(BREWING_METHODS[0]);
  
  // Adjusted custom state
  const [grindSize, setGrindSize] = useState<'Fine' | 'Medium-Fine' | 'Medium' | 'Coarse'>('Medium-Fine');
  const [temperature, setTemperature] = useState(93); // Celsius
  const [pourSpeed, setPourSpeed] = useState<'Slow' | 'Balanced' | 'Fast'>('Balanced');

  // Brewing Animation State
  const [isBrewing, setIsBrewing] = useState(false);
  const [brewStep, setBrewStep] = useState<number>(0); // 0: Idle, 1: Pre-Infuse (Bloom), 2: Extracting, 3: Completed
  const [brewProgress, setBrewProgress] = useState(0);

  // Computed Flavor Profiles based on sliders
  const [profile, setProfile] = useState({
    acidity: selectedMethod.profile.acidity,
    body: selectedMethod.profile.body,
    sweetness: selectedMethod.profile.sweetness,
    aroma: selectedMethod.profile.aroma,
  });

  // Sync profile when method changes
  useEffect(() => {
    setGrindSize(selectedMethod.grindSize);
    setTemperature(selectedMethod.temperature);
    setProfile({
      acidity: selectedMethod.profile.acidity,
      body: selectedMethod.profile.body,
      sweetness: selectedMethod.profile.sweetness,
      aroma: selectedMethod.profile.aroma,
    });
  }, [selectedMethod]);

  // Handle live recalculation of taste parameters based on sliders
  const recalculateProfile = () => {
    let acidFactor = 0;
    let bodyFactor = 0;
    let sweetFactor = 0;
    let aromaFactor = 0;

    // Grind Size adjustments
    if (grindSize === 'Fine') {
      bodyFactor += 15;
      acidFactor -= 10;
    } else if (grindSize === 'Coarse') {
      bodyFactor -= 20;
      acidFactor += 15;
    }

    // Temperature adjustments (ideal is around 92-95C)
    if (temperature > 95) {
      acidFactor -= 10;
      bodyFactor += 10; // slightly over-extracted/bitter
    } else if (temperature < 88) {
      acidFactor += 15; // sour/under-extracted
      sweetFactor -= 15;
    } else {
      sweetFactor += 10;
      aromaFactor += 15;
    }

    // Pour Speed adjustments
    if (pourSpeed === 'Slow') {
      bodyFactor += 10;
      sweetFactor += 5;
    } else if (pourSpeed === 'Fast') {
      bodyFactor -= 15;
      acidFactor += 10;
    }

    setProfile({
      acidity: Math.min(Math.max(selectedMethod.profile.acidity + acidFactor, 5), 100),
      body: Math.min(Math.max(selectedMethod.profile.body + bodyFactor, 5), 100),
      sweetness: Math.min(Math.max(selectedMethod.profile.sweetness + sweetFactor, 5), 100),
      aroma: Math.min(Math.max(selectedMethod.profile.aroma + aromaFactor, 5), 100),
    });
  };

  useEffect(() => {
    recalculateProfile();
  }, [grindSize, temperature, pourSpeed, selectedMethod]);

  // Start simulated extraction animation
  const startExtraction = () => {
    if (isBrewing) return;
    setIsBrewing(true);
    setBrewStep(1);
    setBrewProgress(0);

    const interval = setInterval(() => {
      setBrewProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2.5; // reaches 100 in ~4 seconds
      });
    }, 100);
  };

  // Move step markers based on progress
  useEffect(() => {
    if (brewProgress >= 100) {
      setBrewStep(3);
      setTimeout(() => {
        setIsBrewing(false);
        setBrewStep(0);
        setBrewProgress(0);
      }, 3500); // return to normal after displaying results
    } else if (brewProgress > 30 && brewProgress < 100) {
      setBrewStep(2);
    }
  }, [brewProgress]);

  const getStepText = () => {
    switch (brewStep) {
      case 1: return 'Wetting Coffee Puck & Releasing Aroma (Blooming)';
      case 2: return 'Extracting Specialty Oils & Acids...';
      case 3: return 'Extraction Completed Perfectly!';
      default: return 'Awaiting calibration...';
    }
  };

  return (
    <section className="py-24 bg-primary text-white overflow-hidden scroll-mt-20" id="experience">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="font-sans text-xs uppercase tracking-[0.4em] text-secondary font-semibold">
            Virtual Atelier
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            The Coffee <span className="italic font-normal">Extraction</span> Lab
          </h2>
          <p className="text-surface-dim/70 text-sm leading-relaxed">
            Calibrate, extract, and master flavor structures. Select your brewing apparatus below, tweak parameters, and trigger the physical chemistry of the perfect cup.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Methods Selection Column */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-sans text-[11px] uppercase tracking-widest font-bold text-secondary/80">
              Select Apparatus
            </h3>
            <div className="space-y-3">
              {BREWING_METHODS.map((method) => {
                const isSelected = selectedMethod.id === method.id;
                return (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method)}
                    disabled={isBrewing}
                    className={`w-full p-4.5 rounded-xl text-left border transition-all flex items-center gap-4 cursor-pointer disabled:opacity-50 ${
                      isSelected
                        ? 'bg-white text-primary border-white shadow-lg'
                        : 'border-white/10 hover:border-white/30 hover:bg-white/5'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-primary text-white' : 'bg-white/5 text-white'}`}>
                      <Coffee className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-bold block">{method.name}</h4>
                      <span className={`text-[10px] uppercase font-semibold block mt-0.5 ${isSelected ? 'text-secondary' : 'text-white/50'}`}>
                        Grind: {method.grindSize} • {method.brewTime} mins
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2 mt-6">
              <span className="text-[10px] uppercase tracking-widest font-bold text-secondary block">
                Atelier Guarantee
              </span>
              <p className="text-xs text-white/70 leading-relaxed">
                We calibrate extraction pressure and water hardness to exactly <span className="font-semibold text-white">150 TDS</span> for absolute purity.
              </p>
            </div>
          </div>

          {/* Interactive Calibration Panel (Sliders) */}
          <div className="lg:col-span-5 bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl space-y-8 relative">
            <div className="flex justify-between items-center">
              <span className="font-sans text-xs uppercase tracking-widest font-bold text-secondary flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5" />
                <span>Live Calibration</span>
              </span>
              <span className="text-[10px] font-mono bg-white/10 text-white/90 px-2 py-0.5 rounded">
                Manual Calibration Mode
              </span>
            </div>

            {/* Grind selector */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-white/60 font-medium">Grind Profile</span>
                <span className="font-bold text-secondary">{grindSize}</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {(['Fine', 'Medium-Fine', 'Medium', 'Coarse'] as const).map((g) => (
                  <button
                    key={g}
                    disabled={isBrewing}
                    onClick={() => setGrindSize(g)}
                    className={`py-1.5 px-1 rounded font-sans text-[10px] uppercase font-bold text-center border transition-all cursor-pointer ${
                      grindSize === g
                        ? 'bg-secondary text-white border-secondary'
                        : 'border-white/10 text-white/70 hover:bg-white/5'
                    }`}
                  >
                    {g.split('-')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Temperature Slider */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-white/60 font-medium">Water Temperature</span>
                <span className="font-mono font-bold text-secondary">{temperature}°C</span>
              </div>
              <input
                type="range"
                min="80"
                max="100"
                disabled={isBrewing}
                value={temperature}
                onChange={(e) => setTemperature(parseInt(e.target.value))}
                className="w-full accent-secondary bg-white/10 h-1 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-white/40 font-semibold font-mono">
                <span>80°C (Sweet/Low Acid)</span>
                <span>93°C (Optimal)</span>
                <span>100°C (Bold/Bitter)</span>
              </div>
            </div>

            {/* Pour Rate selector */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-white/60 font-medium">Pour Speed Rate</span>
                <span className="font-bold text-secondary">{pourSpeed}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['Slow', 'Balanced', 'Fast'] as const).map((rate) => (
                  <button
                    key={rate}
                    disabled={isBrewing}
                    onClick={() => setPourSpeed(rate)}
                    className={`py-1.5 rounded font-sans text-[10px] uppercase font-bold text-center border transition-all cursor-pointer ${
                      pourSpeed === rate
                        ? 'bg-secondary text-white border-secondary'
                        : 'border-white/10 text-white/70 hover:bg-white/5'
                    }`}
                  >
                    {rate}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Trigger */}
            <div className="pt-4 border-t border-white/10">
              <button
                onClick={startExtraction}
                disabled={isBrewing}
                className={`w-full py-4 rounded-xl text-xs uppercase tracking-widest font-bold font-sans transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isBrewing
                    ? 'bg-white/10 text-white/40 cursor-not-allowed'
                    : 'bg-secondary text-white hover:bg-secondary/90 shadow-lg shadow-secondary/25'
                }`}
              >
                {isBrewing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-secondary" />
                    <span>Extracting...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Initiate Extraction Process</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Simulated Lab Output Screen */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white text-primary p-6 rounded-2xl shadow-2xl relative overflow-hidden flex flex-col justify-between h-[380px]">
              
              {/* Glass container representation */}
              <div className="absolute inset-x-0 bottom-0 bg-secondary/15 transition-all duration-300 rounded-b-2xl"
                style={{ height: `${brewProgress}%` }}
              />

              {/* Lab Title */}
              <div className="relative z-10 flex justify-between items-center pb-3 border-b border-primary/10">
                <div className="flex items-center gap-1.5 text-secondary">
                  <Beaker className="w-4 h-4" />
                  <span className="font-sans text-[9px] uppercase tracking-widest font-bold">
                    Extraction Chamber
                  </span>
                </div>
                <div className="w-2 h-2 rounded-full animate-ping bg-secondary" />
              </div>

              {/* Live Status overlay */}
              <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center py-6">
                {isBrewing ? (
                  <div className="space-y-4">
                    <div className="w-12 h-12 border-3 border-secondary border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="font-display italic text-sm text-primary font-semibold">
                      {getStepText()}
                    </p>
                    <div className="w-32 bg-primary/10 h-1 rounded-full overflow-hidden mx-auto">
                      <div className="bg-secondary h-full transition-all duration-300" style={{ width: `${brewProgress}%` }} />
                    </div>
                  </div>
                ) : brewStep === 3 ? (
                  <div className="space-y-2 animate-pulse">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                    <p className="font-display font-semibold text-base text-primary">Recipe Complete!</p>
                    <p className="text-[11px] text-on-surface-variant/80">Calibration Saved in State</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Coffee className="w-12 h-12 text-primary/30 mx-auto stroke-[1.2]" />
                    <p className="font-display text-base text-primary italic font-semibold">Ready to Extract</p>
                    <p className="text-xs text-on-surface-variant/70 max-w-[180px] leading-relaxed mx-auto">
                      Tweak your temperature and grind selectors, then trigger the pour.
                    </p>
                  </div>
                )}
              </div>

              {/* Dynamic Profiles */}
              <div className="relative z-10 pt-4 border-t border-primary/10 space-y-2.5 text-xs text-on-surface-variant">
                <div>
                  <div className="flex justify-between text-[10px] font-bold text-primary mb-1 uppercase tracking-wider">
                    <span>Acidity</span>
                    <span>{profile.acidity}%</span>
                  </div>
                  <div className="w-full bg-primary/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-yellow-600 h-full transition-all duration-500" style={{ width: `${profile.acidity}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-bold text-primary mb-1 uppercase tracking-wider">
                    <span>Sweetness</span>
                    <span>{profile.sweetness}%</span>
                  </div>
                  <div className="w-full bg-primary/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-orange-500 h-full transition-all duration-500" style={{ width: `${profile.sweetness}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-bold text-primary mb-1 uppercase tracking-wider">
                    <span>Espresso Body</span>
                    <span>{profile.body}%</span>
                  </div>
                  <div className="w-full bg-primary/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-secondary h-full transition-all duration-500" style={{ width: `${profile.body}%` }} />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
