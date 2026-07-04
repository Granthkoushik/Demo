import React, { useState, useEffect } from 'react';
import { Calendar, Users, Clock, Check, Trash2, ShieldCheck, Ticket, Bookmark, Phone, Gift, Star } from 'lucide-react';
import { Reservation } from '../types';
import { CAFE_CONFIG } from '../config';

interface ReservationSectionProps {
  onQuickOpenTrigger?: boolean;
}

export default function ReservationSection({ onQuickOpenTrigger }: ReservationSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [notes, setNotes] = useState('');
  const [occasion, setOccasion] = useState('');
  
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [activeReservation, setActiveReservation] = useState<Reservation | null>(null);
  const [currentTab, setCurrentTab] = useState<'book' | 'history'>('book');
  const [successMsg, setSuccessMsg] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [cancelConfirmId, setCancelConfirmId] = useState<string | null>(null);

  // Load from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('tcc_reservations');
      if (saved) {
        setReservations(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Save to local storage
  const saveReservations = (newRes: Reservation[]) => {
    setReservations(newRes);
    try {
      localStorage.setItem('tcc_reservations', JSON.stringify(newRes));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Full name is required.';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    const phoneRegex = /^\+?[\d\s\-()]{7,}$/;
    if (!phone) {
      newErrors.phone = 'Phone number is required.';
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone = 'Please enter a valid phone number (min 7 digits).';
    }

    if (!date) {
      newErrors.date = 'Reservation date is required.';
    } else {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = 'Reservation date cannot be in the past.';
      }
    }

    if (!time) {
      newErrors.time = 'Preferred time slot is required.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const newRes: Reservation = {
      id: `RES-${Math.floor(Math.random() * 90000 + 10000)}`,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      date,
      time,
      guests,
      notes: notes.trim() || undefined,
      occasion: occasion || undefined,
      tableNumber: Math.floor(Math.random() * 12 + 1),
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    const updated = [newRes, ...reservations];
    saveReservations(updated);
    setActiveReservation(newRes);
    setSuccessMsg('Booking Confirmed Successfully!');
    setCurrentTab('history');

    // Reset Form
    setName('');
    setEmail('');
    setPhone('');
    setDate('');
    setTime('');
    setGuests(2);
    setNotes('');
    setOccasion('');

    // Clear alert after some time
    setTimeout(() => {
      setSuccessMsg('');
    }, 6000);
  };

  const handleCancel = (id: string) => {
    const updated = reservations.map((r) =>
      r.id === id ? { ...r, status: 'Cancelled' as const } : r
    );
    saveReservations(updated);
    if (activeReservation?.id === id) {
      setActiveReservation({ ...activeReservation, status: 'Cancelled' as const });
    }
    setCancelConfirmId(null);
  };

  return (
    <section className="py-24 bg-surface border-y border-primary/5 scroll-mt-20" id="reserve">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Information Column */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="font-sans text-xs uppercase tracking-[0.3em] font-semibold text-secondary">Join Us</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mt-3 leading-tight">
                Reserve Your <span className="italic font-normal">Table</span>
              </h2>
            </div>
            
            <p className="text-on-surface-variant text-base leading-relaxed">
              We highly recommend booking in advance for weekend brunch, high tea rituals, or quiet afternoon brews to guarantee your preferred salon alcove or fireplace corner.
            </p>

            <div className="space-y-4 pt-4 border-t border-primary/10">
              <div className="flex items-start gap-4 text-primary">
                <Calendar className="w-5 h-5 mt-0.5 text-secondary" />
                <div>
                  <h4 className="font-sans text-xs uppercase tracking-widest font-bold">Daily Availability</h4>
                  <p className="text-sm text-on-surface-variant/80 mt-1">{CAFE_CONFIG.hours.summary}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 text-primary">
                <Users className="w-5 h-5 mt-0.5 text-secondary" />
                <div>
                  <h4 className="font-sans text-xs uppercase tracking-widest font-bold">Private Atelier Lounge</h4>
                  <p className="text-sm text-on-surface-variant/80 mt-1">Available for private gatherings up to 12 guests</p>
                </div>
              </div>
            </div>

            <div className="p-5 bg-white border border-primary/5 rounded-xl shadow-sm space-y-3">
              <div className="flex items-center gap-2.5 text-emerald-700">
                <ShieldCheck className="w-5 h-5 animate-pulse" />
                <span className="text-xs uppercase tracking-widest font-bold">Safe & Flexible Booking</span>
              </div>
              <p className="text-xs text-on-surface-variant/70 leading-relaxed">
                Need to make a modification? Access your ticket anytime from our local pass registry below to edit or cancel without penalty.
              </p>
            </div>
          </div>

          {/* Interactive Form & Ticket Column */}
          <div className="lg:col-span-7 bg-white p-6 md:p-10 shadow-xl border border-primary/5 rounded-2xl">
            {/* Tab Swapping */}
            <div className="flex border-b border-primary/10 pb-5 mb-8 gap-6">
              <button
                onClick={() => setCurrentTab('book')}
                className={`font-sans text-xs uppercase tracking-widest font-bold pb-2 border-b-2 transition-all cursor-pointer ${
                  currentTab === 'book'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-on-surface-variant/60 hover:text-primary'
                }`}
              >
                1. New Reservation
              </button>
              <button
                onClick={() => setCurrentTab('history')}
                className={`font-sans text-xs uppercase tracking-widest font-bold pb-2 border-b-2 transition-all relative cursor-pointer ${
                  currentTab === 'history'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-on-surface-variant/60 hover:text-primary'
                }`}
              >
                2. Your Passes ({reservations.length})
                {reservations.some((r) => r.status === 'Confirmed') && (
                  <span className="absolute -top-1 -right-2 w-2 h-2 bg-secondary rounded-full animate-bounce" />
                )}
              </button>
            </div>

            {currentTab === 'book' ? (
              /* Booking form */
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant flex justify-between">
                      <span>Your Full Name *</span>
                      {errors.name && <span className="text-red-500 font-medium normal-case">{errors.name}</span>}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                      }}
                      placeholder="e.g., Eleanor Rigby"
                      className={`w-full bg-surface-container-low border-0 border-b py-3 px-3 text-sm text-primary transition-all rounded placeholder:text-on-surface-variant/40 focus:ring-0 focus:border-secondary ${
                        errors.name ? 'border-red-500 bg-red-50/20' : 'border-primary/20'
                      }`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant flex justify-between">
                      <span>Email Address *</span>
                      {errors.email && <span className="text-red-500 font-medium normal-case">{errors.email}</span>}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                      }}
                      placeholder="e.g., eleanor@architects.com"
                      className={`w-full bg-surface-container-low border-0 border-b py-3 px-3 text-sm text-primary transition-all rounded placeholder:text-on-surface-variant/40 focus:ring-0 focus:border-secondary ${
                        errors.email ? 'border-red-500 bg-red-50/20' : 'border-primary/20'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant flex justify-between">
                      <span>Phone Number *</span>
                      {errors.phone && <span className="text-red-500 font-medium normal-case">{errors.phone}</span>}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                      }}
                      placeholder="e.g., +1 (212) 555-0198"
                      className={`w-full bg-surface-container-low border-0 border-b py-3 px-3 text-sm text-primary transition-all rounded placeholder:text-on-surface-variant/40 focus:ring-0 focus:border-secondary ${
                        errors.phone ? 'border-red-500 bg-red-50/20' : 'border-primary/20'
                      }`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant flex justify-between">
                      <span>Select Date *</span>
                      {errors.date && <span className="text-red-500 font-medium normal-case">{errors.date}</span>}
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => {
                        setDate(e.target.value);
                        if (errors.date) setErrors(prev => ({ ...prev, date: '' }));
                      }}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full bg-surface-container-low border-0 border-b py-3 px-3 text-sm text-primary transition-all rounded font-sans focus:ring-0 focus:border-secondary ${
                        errors.date ? 'border-red-500 bg-red-50/20' : 'border-primary/20'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant flex justify-between">
                      <span>Preferred Time *</span>
                      {errors.time && <span className="text-red-500 font-medium normal-case">{errors.time}</span>}
                    </label>
                    <select
                      value={time}
                      onChange={(e) => {
                        setTime(e.target.value);
                        if (errors.time) setErrors(prev => ({ ...prev, time: '' }));
                      }}
                      className={`w-full bg-surface-container-low border-0 border-b py-3.5 px-3 text-sm text-primary transition-all rounded font-sans focus:ring-0 focus:border-secondary ${
                        errors.time ? 'border-red-500 bg-red-50/20' : 'border-primary/20'
                      }`}
                    >
                      <option value="">Choose time slot</option>
                      <option value="08:30 AM">08:30 AM (Brunch)</option>
                      <option value="10:00 AM">10:00 AM (Brunch)</option>
                      <option value="11:30 AM">11:30 AM (Brunch)</option>
                      <option value="01:00 PM">01:00 PM (Lounge)</option>
                      <option value="03:00 PM">03:00 PM (High Tea)</option>
                      <option value="05:00 PM">05:00 PM (Dusk Jazz)</option>
                      <option value="06:30 PM">06:30 PM (Dusk Jazz)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">
                      Party Size *
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      className="w-full bg-surface-container-low border-0 border-b border-primary/20 focus:border-secondary focus:ring-0 py-3.5 px-3 text-sm text-primary transition-all rounded font-sans"
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 12].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Requirement: Occasion selection */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">
                    Celebrate an Occasion (Optional)
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full bg-surface-container-low border-0 border-b border-primary/20 focus:border-secondary focus:ring-0 py-3.5 px-3 text-sm text-primary transition-all rounded font-sans"
                  >
                    <option value="">Select occasion</option>
                    <option value="Birthday">Birthday Celebration 🎂</option>
                    <option value="Anniversary">Anniversary Dinner 💖</option>
                    <option value="Business Meeting">Business Meeting 💼</option>
                    <option value="Romantic Date">Romantic Date night 🌹</option>
                    <option value="Casual Gathering">Casual Gathering ☕</option>
                    <option value="Other">Other Celebration 🎉</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g., Fireplace alcove requested, high chair, dietary requirements, etc."
                    className="w-full bg-surface-container-low border-0 border-b border-primary/20 focus:border-secondary focus:ring-0 py-3 px-3 text-sm text-primary transition-all rounded placeholder:text-on-surface-variant/40 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-on-primary py-4.5 font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-secondary transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer transition-colors duration-300"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Request Booking Confirmation</span>
                </button>
              </form>
            ) : (
              /* History & Ticket display */
              <div className="space-y-6">
                {successMsg && (
                  <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-lg text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-pulse">
                    <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                    <span>{successMsg}</span>
                  </div>
                )}

                {reservations.length === 0 ? (
                  <div className="text-center py-12 bg-surface-container-low/50 rounded-xl border border-dashed border-primary/10">
                    <Bookmark className="w-8 h-8 mx-auto text-primary/20 mb-3" />
                    <p className="font-display text-sm text-primary italic">No reservation history found</p>
                    <p className="text-xs text-on-surface-variant/60 mt-1">Book your first table on the left tab.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Active Selected Reservation Pass Visualizer */}
                    {(() => {
                      const displayRes = activeReservation || reservations[0];
                      const isCancelled = displayRes.status === 'Cancelled';

                      return (
                        <div className="border border-primary/10 rounded-2xl overflow-hidden bg-surface shadow-md">
                          {/* Ticket Header */}
                          <div className={`p-4 text-white flex justify-between items-center ${
                            isCancelled ? 'bg-outline' : 'bg-primary'
                          }`}>
                            <div className="flex items-center gap-2">
                              <Ticket className="w-4 h-4 stroke-[2]" />
                              <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold">
                                Atelier Table Pass
                              </span>
                            </div>
                            <span className="font-mono text-xs">{displayRes.id}</span>
                          </div>

                          {/* Ticket Details */}
                          <div className="p-6 md:p-8 space-y-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-primary/5 pb-5">
                              <div>
                                <span className="block text-[9px] uppercase tracking-wider text-on-surface-variant/60 font-bold">
                                  Guest Name
                                </span>
                                <span className="font-display text-sm font-semibold text-primary truncate block mt-1">
                                  {displayRes.name}
                                </span>
                              </div>
                              <div>
                                <span className="block text-[9px] uppercase tracking-wider text-on-surface-variant/60 font-bold">
                                  Contact Phone
                                </span>
                                <span className="font-sans text-xs font-bold text-primary block mt-1">
                                  {displayRes.phone}
                                </span>
                              </div>
                              <div>
                                <span className="block text-[9px] uppercase tracking-wider text-on-surface-variant/60 font-bold">
                                  Date & Time
                                </span>
                                <span className="font-sans text-xs font-bold text-primary block mt-1">
                                  {displayRes.date} <br /> {displayRes.time}
                                </span>
                              </div>
                              <div>
                                <span className="block text-[9px] uppercase tracking-wider text-on-surface-variant/60 font-bold">
                                  Alcove Allocation
                                </span>
                                <span className="font-sans text-xs font-bold text-secondary block mt-1">
                                  Table #{displayRes.tableNumber}
                                </span>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 border-b border-primary/5 pb-5">
                              <div>
                                <span className="block text-[9px] uppercase tracking-wider text-on-surface-variant/60 font-bold">
                                  Guest Email
                                </span>
                                <span className="font-sans text-xs font-semibold text-primary block mt-1">
                                  {displayRes.email}
                                </span>
                              </div>
                              <div>
                                <span className="block text-[9px] uppercase tracking-wider text-on-surface-variant/60 font-bold">
                                  Pass Status
                                </span>
                                <span className={`inline-block text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full mt-1 ${
                                  isCancelled
                                    ? 'bg-red-50 text-red-700 border border-red-100'
                                    : 'bg-emerald-50 text-emerald-800 border border-emerald-100'
                                }`}>
                                  {displayRes.status}
                                </span>
                              </div>
                            </div>

                            {/* Ticket Occasion Details */}
                            {displayRes.occasion && (
                              <div className="text-xs bg-secondary/5 p-3 rounded border border-secondary/15 flex items-center gap-2 text-primary">
                                <Gift className="w-4 h-4 text-secondary shrink-0" />
                                <div>
                                  <span className="font-semibold">Occasion: </span>
                                  <span className="text-on-surface-variant/90">{displayRes.occasion}</span>
                                </div>
                              </div>
                            )}

                            {/* Ticket Notes */}
                            {displayRes.notes && (
                              <div className="text-xs bg-surface-container-low p-3 rounded border border-primary/5">
                                <span className="font-semibold text-primary">Special Requests: </span>
                                <span className="text-on-surface-variant/80">{displayRes.notes}</span>
                              </div>
                            )}

                            {/* Ticket Bottom QR Mock Representation */}
                            <div className="flex flex-col md:flex-row gap-6 items-center justify-between pt-2">
                              <div className="space-y-1 text-center md:text-left">
                                <span className="text-[10px] text-on-surface-variant/70 block font-medium">
                                  Scannable on Arrival
                                </span>
                                <p className="text-xs text-primary leading-relaxed max-w-xs">
                                  Present this live local state token on your smartphone. We will guide you instantly to your alcove.
                                </p>
                              </div>

                              {/* Pure CSS Premium Gold QR Mockup */}
                              <div className="w-20 h-20 p-1.5 border border-secondary/30 rounded-lg flex flex-wrap gap-1 bg-white shrink-0 shadow-sm">
                                {Array.from({ length: 49 }).map((_, i) => (
                                  <div
                                    key={i}
                                    className={`w-2 h-2 rounded-xs ${
                                      (i % 3 === 0 || i % 7 === 0 || i < 10 || i > 38) && i !== 22 && i !== 23
                                        ? 'bg-primary'
                                        : 'bg-primary/10'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>

                            {/* Cancel Option with Premium Custom Modal Confirmation (Requirement for Iframe compat) */}
                            {!isCancelled && (
                              <div className="pt-2 border-t border-primary/5">
                                {cancelConfirmId === displayRes.id ? (
                                  <div className="p-4 bg-red-50 border border-red-100 rounded-xl space-y-3">
                                    <p className="text-xs font-semibold text-red-800 leading-normal">
                                      Are you sure you want to cancel this reservation? This local token registry entry will be cancelled.
                                    </p>
                                    <div className="flex gap-2">
                                      <button
                                        type="button"
                                        onClick={() => handleCancel(displayRes.id)}
                                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-sans text-[10px] uppercase tracking-widest font-bold cursor-pointer transition-all shadow-sm"
                                      >
                                        Yes, Cancel Pass
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => setCancelConfirmId(null)}
                                        className="px-4 py-2 bg-white border border-primary/10 hover:bg-gray-50 text-primary rounded font-sans text-[10px] uppercase tracking-widest font-bold cursor-pointer transition-all"
                                      >
                                        No, Keep Table
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex justify-end">
                                    <button
                                      type="button"
                                      onClick={() => setCancelConfirmId(displayRes.id)}
                                      className="text-xs text-red-600 font-bold hover:underline flex items-center gap-1.5 cursor-pointer"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                      <span>Cancel Table Pass</span>
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })()}

                    {/* Miniature Past Passes List */}
                    {reservations.length > 1 && (
                      <div className="space-y-3">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/70">
                          Your Active Registry List
                        </span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {reservations.map((res) => (
                            <button
                              key={res.id}
                              onClick={() => {
                                setActiveReservation(res);
                                setCancelConfirmId(null);
                              }}
                              className={`p-3 border rounded-xl text-left transition-all flex justify-between items-center ${
                                (activeReservation?.id || reservations[0].id) === res.id
                                  ? 'border-primary bg-primary/3'
                                  : 'border-primary/10 hover:border-primary/30'
                              }`}
                            >
                              <div className="min-w-0">
                                <p className="font-display font-semibold text-xs text-primary truncate">
                                  {res.name}
                                </p>
                                <p className="text-[10px] text-on-surface-variant/60">
                                  {res.date} • {res.time}
                                </p>
                              </div>
                              <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded ${
                                res.status === 'Cancelled'
                                  ? 'bg-red-50 text-red-600'
                                  : 'bg-emerald-50 text-emerald-700'
                              }`}>
                                {res.status}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
