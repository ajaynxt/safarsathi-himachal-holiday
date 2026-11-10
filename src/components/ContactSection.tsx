import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageCircle, Clock, ShieldCheck } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';
import { COMPANY_INFO } from '../data/travelData';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [destination, setDestination] = useState('Shimla Manali');
  const [dates, setDates] = useState('');
  const [guests, setGuests] = useState('2');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hello SafarSathi, my name is ${name}. Phone: ${phone}. I am planning a trip to ${destination} around ${dates || 'upcoming weeks'} for ${guests} persons. Please send package & cab quotation.`;
    window.open(COMPANY_INFO.whatsappUrl(msg), '_blank');
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange-light text-brand-orange text-xs font-bold uppercase tracking-wider mb-3">
            <span>Direct Shimla Helpdesk</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Connect With Our Mountain Tour Experts
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Have questions about road status, snow seasons, customized itineraries, or group cab bookings? We are here 24 hours a day.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Info Column */}
          <div className="lg:col-span-5 bg-gradient-to-br from-brand-navy to-brand-navy-light text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-amber-400">
                Contact &amp; travel enquiries
              </span>
              <h3 className="text-xl sm:text-2xl font-bold mt-1">SafarSathi India</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2">
                Tell us your destination, dates and group size. Contact the team to discuss trip planning, vehicle options and a quotation.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10 text-sm">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-white/10 text-amber-400 flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300">Service Coverage</h4>
                  <p className="text-slate-100 font-medium text-xs sm:text-sm mt-0.5">
                    {COMPANY_INFO.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-white/10 text-brand-orange flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300">Direct Phone Support</h4>
                  <p className="text-slate-100 font-bold text-sm sm:text-base mt-0.5">
                    <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-brand-orange transition-colors">
                      {COMPANY_INFO.phoneDisplay}
                    </a>
                  </p>
                  <span className="text-[11px] text-slate-300 block">Call or message to discuss your trip</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-white/10 text-brand-orange flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300">Email Address</h4>
                  <p className="text-slate-100 font-medium text-xs sm:text-sm mt-0.5">
                    <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-brand-orange transition-colors">
                      {COMPANY_INFO.email}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-white/10 text-brand-orange flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300">Working Hours</h4>
                  <p className="text-slate-100 font-medium text-xs sm:text-sm mt-0.5">
                    Contact us to confirm current support hours
                  </p>
                  <span className="text-[11px] text-emerald-400 font-medium">Call or WhatsApp for current assistance</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 text-pink-400 flex-shrink-0">
                  <InstagramIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300">Official Instagram</h4>
                  <p className="text-slate-100 font-bold text-xs sm:text-sm mt-0.5">
                    <a
                      href={COMPANY_INFO.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-pink-400 transition-colors flex items-center gap-1.5"
                    >
                      <span>{COMPANY_INFO.instagramHandle}</span>
                    </a>
                  </p>
                  <span className="text-[11px] text-slate-300 block">Follow live snowfall reels & guest experiences</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={COMPANY_INFO.whatsappUrl("Hello SafarSathi, I have an inquiry regarding holiday packages and cabs.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Directly on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Online Booking & Inquiry Form */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900">Request a Free Callback & Custom Quote</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Share your tentative plan. The team can check route details, vehicle options and availability before sending a quotation.
              </p>
            </div>

            {submitted && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>WhatsApp has opened with your enquiry. Send the message to share your details; this does not confirm a booking.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Destination / Circuit</label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  >
                    <option value="Shimla & Manali">Shimla & Manali</option>
                    <option value="Spiti Valley Circuit">Spiti Valley Circuit</option>
                    <option value="Kashmir (Srinagar/Gulmarg)">Kashmir (Srinagar/Gulmarg)</option>
                    <option value="Dharamshala & Dalhousie">Dharamshala & Dalhousie</option>
                    <option value="Amritsar & Himachal">Amritsar & Himachal</option>
                    <option value="Cab Rental Only">Cab Rental Only</option>
                    <option value="Hotel Booking Only">Hotel Booking Only</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Travel Dates / Month</label>
                  <input
                    type="text"
                    value={dates}
                    onChange={(e) => setDates(e.target.value)}
                    placeholder="e.g. Next weekend / Dec 25"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Total Travelers</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  >
                    <option value="Couple (2 Adults)">Couple (2 Adults)</option>
                    <option value="Family (3-4 Persons)">Family (3-4 Persons)</option>
                    <option value="Group (5-8 Persons)">Group (5-8 Persons)</option>
                    <option value="Large Group (9-17 Persons)">Large Group (9-17 Persons)</option>
                  </select>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-brand-orange hover:bg-brand-orange-dark text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Free Inquiry to Shimla Team</span>
                </button>
              </div>

              <p className="text-[11px] text-center text-slate-500">
                🔒 We respect your privacy. No spam. You will only receive genuine travel quotations and assistance.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
