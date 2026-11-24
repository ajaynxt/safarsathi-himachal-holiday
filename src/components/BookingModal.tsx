import React, { useState, useEffect, useRef } from 'react';
import { X, Calendar, Users, Phone, User, Send, CheckCircle2, Ticket } from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'package' | 'cab' | 'hotel' | 'volvo' | 'ticket';
  itemName?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialType = 'package',
  itemName = ''
}) => {
  const [bookingType, setBookingType] = useState<'package' | 'cab' | 'hotel' | 'volvo' | 'ticket'>(initialType === 'ticket' ? 'package' : initialType);
  const [tourPlanFinalised, setTourPlanFinalised] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [destination, setDestination] = useState(itemName || 'Shimla & Manali');
  const [dates, setDates] = useState('');
  const [guests, setGuests] = useState('2 Persons');
  const [cabPreference, setCabPreference] = useState('Toyota Innova Crysta');
  const [hotelCategory, setHotelCategory] = useState('3-Star Deluxe');
  const [ticketMode, setTicketMode] = useState('Bus');
  const [ticketFrom, setTicketFrom] = useState('');
  const [ticketTo, setTicketTo] = useState('');
  const [ticketDate, setTicketDate] = useState('');
  const [ticketPassengers, setTicketPassengers] = useState('1 Passenger');
  const [submitted, setSubmitted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    setBookingType(initialType === 'ticket' ? 'package' : initialType || 'package');
    setTourPlanFinalised(false);
    if (itemName) setDestination(itemName);
  }, [initialType, itemName, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const previousActiveElement = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const previousBodyOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleDialogKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements?.length) {
        event.preventDefault();
        dialogRef.current?.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleDialogKeyDown);

    return () => {
      document.removeEventListener('keydown', handleDialogKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      if (previousActiveElement?.isConnected) previousActiveElement.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const typeLabel = bookingType === 'package'
      ? 'Tour Package'
      : bookingType === 'cab'
        ? 'Taxi / Cab Booking'
        : bookingType === 'hotel'
          ? 'Hotel Stay'
          : bookingType === 'volvo'
            ? 'Volvo Bus'
            : `${ticketMode} Ticket Booking`;
    const message = bookingType === 'ticket'
      ? `*New Ticket Booking Enquiry - Safar Sathi Website*
👤 *Name:* ${name}
📞 *Phone:* ${phone}
🎟️ *Ticket Type:* ${ticketMode}
🗺️ *Tour Plan:* Already finalised
📍 *From:* ${ticketFrom}
🏁 *To:* ${ticketTo}
📅 *Journey Date:* ${ticketDate}
👥 *Passengers:* ${ticketPassengers}

Please share the current ticket fare and Safar Sathi service/assistance charge separately. Do not book until I approve the total amount and booking terms.`
      : `*New Booking Inquiry - SafarSathi Website*
👤 *Name:* ${name}
📞 *Phone:* ${phone}
🏷️ *Service:* ${typeLabel}
📍 *Details/Item:* ${destination}
📅 *Dates:* ${dates || 'Tentative'}
👥 *Travelers:* ${guests}
🚖 *Cab Preference:* ${cabPreference}
🏨 *Hotel Preference:* ${hotelCategory}

Please check availability and send confirmed quotation.`;

    window.open(COMPANY_INFO.whatsappUrl(message), '_blank');
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-dialog-title"
        aria-describedby="booking-dialog-description"
        tabIndex={-1}
        className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden my-6 border border-slate-200"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-navy to-brand-navy-light text-white p-5 sm:p-6 relative">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close travel enquiry"
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-block px-3 py-1 rounded-full bg-brand-orange text-white text-[10px] font-bold uppercase tracking-wider mb-2">
            Travel Enquiry
          </div>
          <h2 id="booking-dialog-title" className="text-xl sm:text-2xl font-bold">
            {bookingType === 'ticket' ? 'Bus, Train & Flight Ticket Assistance' : 'Book Your Himalayan Journey'}
          </h2>
          <p id="booking-dialog-description" className="text-xs sm:text-sm text-slate-300 mt-1">
            {bookingType === 'ticket'
              ? "For an already-finalised tour itinerary, share your route and journey date. Ticket fare and Safar Sathi's separate service charge will be shared before you approve the booking."
              : 'Share your travel preferences. The team can discuss availability and send a quotation on WhatsApp.'}
          </p>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-6">
          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">WhatsApp enquiry prepared</h3>
              <p className="text-sm text-slate-600 max-w-sm mx-auto">
                WhatsApp is opening with your travel details. Your booking is not confirmed until the team confirms availability and terms.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Ticket assistance is offered only after the tour itinerary is finalised. */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
                <label htmlFor="tour-plan-finalised" className="flex cursor-pointer items-start gap-2.5">
                  <input
                    id="tour-plan-finalised"
                    type="checkbox"
                    checked={tourPlanFinalised}
                    onChange={(event) => {
                      const finalised = event.target.checked;
                      setTourPlanFinalised(finalised);
                      if (!finalised && bookingType === 'ticket') setBookingType('package');
                    }}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-amber-600"
                  />
                  <span className="min-w-0">
                    <span className="block text-xs font-bold text-slate-800">My tour itinerary is already finalised</span>
                    <span className="mt-0.5 block text-[11px] leading-4 text-slate-500">Bus, train or flight ticket assistance is available after your trip plan is final.</span>
                  </span>
                </label>
              </div>

              {/* Type Switcher */}
              <div
                role="group"
                aria-label="Choose travel enquiry type"
                className={`grid grid-cols-2 ${tourPlanFinalised ? 'sm:grid-cols-5' : 'sm:grid-cols-4'} gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-bold text-slate-600`}
              >
                <button
                  type="button"
                  onClick={() => setBookingType('package')}
                  aria-pressed={bookingType === 'package'}
                  className={`py-2 rounded-lg transition-all ${bookingType === 'package' ? 'bg-brand-orange text-white shadow' : 'hover:text-slate-900'}`}
                >
                  Package
                </button>
                <button
                  type="button"
                  onClick={() => setBookingType('cab')}
                  aria-pressed={bookingType === 'cab'}
                  className={`py-2 rounded-lg transition-all ${bookingType === 'cab' ? 'bg-brand-orange text-white shadow' : 'hover:text-slate-900'}`}
                >
                  Taxi / Cab
                </button>
                <button
                  type="button"
                  onClick={() => setBookingType('hotel')}
                  aria-pressed={bookingType === 'hotel'}
                  className={`py-2 rounded-lg transition-all ${bookingType === 'hotel' ? 'bg-brand-orange text-white shadow' : 'hover:text-slate-900'}`}
                >
                  Hotel
                </button>
                <button
                  type="button"
                  onClick={() => setBookingType('volvo')}
                  aria-pressed={bookingType === 'volvo'}
                  className={`py-2 rounded-lg transition-all ${bookingType === 'volvo' ? 'bg-brand-orange text-white shadow' : 'hover:text-slate-900'}`}
                >
                  Volvo
                </button>
                {tourPlanFinalised && (
                  <button
                    type="button"
                    onClick={() => setBookingType('ticket')}
                    aria-pressed={bookingType === 'ticket'}
                    className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1 ${bookingType === 'ticket' ? 'bg-brand-orange text-white shadow' : 'hover:text-slate-900'}`}
                  >
                    <Ticket className="h-3.5 w-3.5" />
                    Tickets
                  </button>
                )}
              </div>

              {/* Service-specific route details */}
              {bookingType === 'ticket' ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Ticket Type *</label>
                    <select
                      value={ticketMode}
                      onChange={(e) => setTicketMode(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange font-medium"
                    >
                      <option value="Bus">Bus Ticket</option>
                      <option value="Train">Train Ticket</option>
                      <option value="Flight">Flight Ticket</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">From *</label>
                      <input
                        type="text"
                        required
                        value={ticketFrom}
                        onChange={(e) => setTicketFrom(e.target.value)}
                        placeholder="Departure city / station"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">To *</label>
                      <input
                        type="text"
                        required
                        value={ticketTo}
                        onChange={(e) => setTicketTo(e.target.value)}
                        placeholder="Destination city / station"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange font-medium"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {bookingType === 'package' ? 'Tour / Destination' : bookingType === 'cab' ? 'Vehicle / Route' : bookingType === 'hotel' ? 'Hotel / City' : 'Volvo Bus Route'}
                  </label>
                  <input
                    type="text"
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g. Shimla Manali 5N/6D, Innova Crysta, or Kasol Stay"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange font-medium"
                  />
                </div>
              )}

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-brand-orange" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Amit Sharma"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-brand-orange" />
                    WhatsApp / Mobile *
                  </label>
                  <input
                    type="tel"
                    required
                    inputMode="tel"
                    pattern="[0-9+()\\s-]{7,20}"
                    title="Enter a valid phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange font-medium"
                  />
                </div>
              </div>

              {/* Dates & Travelers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-brand-orange" />
                    Travel Date
                  </label>
                  <input
                    type={bookingType === 'ticket' ? 'date' : 'text'}
                    required={bookingType === 'ticket'}
                    min={bookingType === 'ticket' ? new Date().toISOString().split('T')[0] : undefined}
                    value={bookingType === 'ticket' ? ticketDate : dates}
                    onChange={(e) => bookingType === 'ticket' ? setTicketDate(e.target.value) : setDates(e.target.value)}
                    placeholder={bookingType === 'ticket' ? undefined : 'e.g. 15th December'}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-brand-orange" />
                    Total Travelers
                  </label>
                  <select
                    value={bookingType === 'ticket' ? ticketPassengers : guests}
                    onChange={(e) => bookingType === 'ticket' ? setTicketPassengers(e.target.value) : setGuests(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange font-medium"
                  >
                    {bookingType === 'ticket' ? (
                      <>
                        <option value="1 Passenger">1 Passenger</option>
                        <option value="2 Passengers">2 Passengers</option>
                        <option value="3 Passengers">3 Passengers</option>
                        <option value="4 Passengers">4 Passengers</option>
                        <option value="5+ Passengers">5+ Passengers</option>
                      </>
                    ) : (
                      <>
                        <option value="1 Adult (Solo Traveler)">1 Adult (Solo Traveler)</option>
                        <option value="2 Adults (Couple)">2 Adults (Couple)</option>
                        <option value="3-4 Persons (Family)">3-4 Persons (Family)</option>
                        <option value="5-7 Persons (Innova)">5-7 Persons (Innova/Ertiga)</option>
                        <option value="8+ Persons (Tempo Traveller)">8+ Persons (Tempo)</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              {/* Show only the preference relevant to the selected service */}
              {bookingType === 'cab' && (
              <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Vehicle Preference</label>
                  <select
                    value={cabPreference}
                    onChange={(e) => setCabPreference(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  >
                    <option value="Toyota Innova Crysta">Toyota Innova Crysta (White SUV)</option>
                    <option value="Maruti Ertiga">Maruti Ertiga (White 7-Seater)</option>
                    <option value="Maruti Swift Dzire">Maruti Swift Dzire (White Sedan)</option>
                    <option value="Toyota Etios">Toyota Etios (White Sedan)</option>
                    <option value="Honda City">Honda City (White Luxury Sedan)</option>
                    <option value="Toyota Glanza">Toyota Glanza (White Premium)</option>
                    <option value="Force Tempo Traveller">Tempo Traveller (9-17 Seater White Coach)</option>
                    <option value="Luxury Volvo AC Bus">Luxury Volvo AC Bus (Indian Coach)</option>
                  </select>
              </div>
              )}
              {bookingType === 'hotel' && (
              <div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Hotel Category</label>
                  <select
                    value={hotelCategory}
                    onChange={(e) => setHotelCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  >
                    <option value="3-Star Deluxe (Standard)">3-Star Deluxe (Standard)</option>
                    <option value="4-Star Luxury Mountain View">4-Star Luxury Mountain View</option>
                    <option value="5-Star / Heritage Palace">5-Star / Heritage Palace</option>
                    <option value="Riverside Camp / Swiss Tents">Riverside Camp / Swiss Tents</option>
                    <option value="Cabs Only (No Hotel Needed)">Cabs Only (No Hotel Needed)</option>
                  </select>
                </div>
              </div>
              )}

              {bookingType === 'ticket' && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-3 text-xs leading-5 text-amber-950">
                  Ticket fare and Safar Sathi's service/assistance charge are separate. Both will be shared with you before booking, and we will proceed only after your approval.
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-brand-orange hover:bg-brand-orange-dark text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{bookingType === 'ticket' ? 'Send Ticket Enquiry on WhatsApp' : 'Submit & Receive Quote on WhatsApp'}</span>
                </button>
              </div>

              <p className="text-[10px] text-center text-slate-500">
                {bookingType === 'ticket'
                  ? 'This is a ticket enquiry, not a confirmed booking. Fare, availability, service charge and booking terms will be confirmed by the team.'
                  : 'This is an enquiry only. Availability, fare and booking terms will be confirmed by the Safar Sathi team.'}
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
