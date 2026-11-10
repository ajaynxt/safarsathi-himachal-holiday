import React, { useState, useEffect } from 'react';
import { X, Calendar, Users, Phone, User, Send, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'package' | 'cab' | 'hotel' | 'volvo';
  itemName?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialType = 'package',
  itemName = ''
}) => {
  const [bookingType, setBookingType] = useState<'package' | 'cab' | 'hotel' | 'volvo'>(initialType);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [destination, setDestination] = useState(itemName || 'Shimla & Manali');
  const [dates, setDates] = useState('');
  const [guests, setGuests] = useState('2 Persons');
  const [cabPreference, setCabPreference] = useState('Toyota Innova Crysta');
  const [hotelCategory, setHotelCategory] = useState('3-Star Deluxe');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialType) setBookingType(initialType);
    if (itemName) setDestination(itemName);
  }, [initialType, itemName, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const typeLabel = bookingType === 'package' ? 'Tour Package' : bookingType === 'cab' ? 'Taxi / Cab Booking' : bookingType === 'hotel' ? 'Hotel Stay' : 'Volvo Bus';
    const message = `*New Booking Inquiry - SafarSathi Website*
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden my-6 border border-slate-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-navy to-brand-navy-light text-white p-5 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-block px-3 py-1 rounded-full bg-brand-orange text-white text-[10px] font-bold uppercase tracking-wider mb-2">
            Travel Enquiry
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">Book Your Himalayan Journey</h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Share your travel preferences. The team can discuss availability and send a quotation on WhatsApp.
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
              {/* Type Switcher */}
              <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-bold text-slate-600">
                <button
                  type="button"
                  onClick={() => setBookingType('package')}
                  className={`py-2 rounded-lg transition-all ${bookingType === 'package' ? 'bg-brand-orange text-white shadow' : 'hover:text-slate-900'}`}
                >
                  Package
                </button>
                <button
                  type="button"
                  onClick={() => setBookingType('cab')}
                  className={`py-2 rounded-lg transition-all ${bookingType === 'cab' ? 'bg-brand-orange text-white shadow' : 'hover:text-slate-900'}`}
                >
                  Taxi / Cab
                </button>
                <button
                  type="button"
                  onClick={() => setBookingType('hotel')}
                  className={`py-2 rounded-lg transition-all ${bookingType === 'hotel' ? 'bg-brand-orange text-white shadow' : 'hover:text-slate-900'}`}
                >
                  Hotel
                </button>
                <button
                  type="button"
                  onClick={() => setBookingType('volvo')}
                  className={`py-2 rounded-lg transition-all ${bookingType === 'volvo' ? 'bg-brand-orange text-white shadow' : 'hover:text-slate-900'}`}
                >
                  Volvo
                </button>
              </div>

              {/* Destination / Package / Vehicle */}
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
                    type="text"
                    value={dates}
                    onChange={(e) => setDates(e.target.value)}
                    placeholder="e.g. 15th December"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-brand-orange" />
                    Total Travelers
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange font-medium"
                  >
                    <option value="2 Adults (Couple)">2 Adults (Couple)</option>
                    <option value="3-4 Persons (Family)">3-4 Persons (Family)</option>
                    <option value="5-7 Persons (Innova)">5-7 Persons (Innova/Ertiga)</option>
                    <option value="8+ Persons (Tempo Traveller)">8+ Persons (Tempo)</option>
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

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-brand-orange hover:bg-brand-orange-dark text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit & Receive Quote on WhatsApp</span>
                </button>
              </div>

              <p className="text-[10px] text-center text-slate-500">
                This is an enquiry only. Availability, fare and booking terms will be confirmed by the Safar Sathi team.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
