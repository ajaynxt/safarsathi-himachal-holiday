import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageCircle, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';

interface FaqItem {
  question: string;
  answer: string;
  tag: string;
}

const FAQS: FaqItem[] = [
  { tag: 'Planning', question: 'How do I start planning a trip?', answer: 'Share your destination, tentative travel dates, number of travellers and preferred pickup city through the enquiry form or WhatsApp. The team can discuss a suitable route and quotation with you.' },
  { tag: 'Transport', question: 'What vehicle options can I enquire about?', answer: 'You can ask about sedan cars, Ertiga, Innova Crysta, tempo travellers and Volvo bus options. Vehicle availability, seating and luggage capacity should be confirmed for your specific route and dates.' },
  { tag: 'Pricing', question: 'What should I check in a travel quotation?', answer: 'Before confirming, ask for the total price and a written breakdown of inclusions and exclusions such as fuel, tolls, parking, taxes, driver charges, hotel stays and meals.' },
  { tag: 'Destinations', question: 'Can I enquire about destinations outside Himachal?', answer: 'Yes. The website features destinations including Jammu & Kashmir, Uttarakhand, Rajasthan, Kerala, Goa and other parts of India. Share your preferred destination to discuss arrangements.' },
  { tag: 'Booking', question: 'When is my booking confirmed?', answer: 'Submitting this website form opens WhatsApp with your enquiry. It does not itself confirm a booking. Your dates, availability, final quotation, payment terms and cancellation conditions should be confirmed directly with the team.' },
  { tag: 'Changes', question: 'Can I customise my itinerary?', answer: 'You can share your preferred places, pace, pickup and drop locations, travel dates and hotel preferences. The team can then discuss whether the requested changes can be arranged.' }
];

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white border-t border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-brand-navy text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-brand-orange" />
            <span>Got Questions? We Have Answers</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            A few useful things to know before sending your travel enquiry.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-brand-orange/40 bg-orange-50/20 shadow-md ring-1 ring-brand-orange/20'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {faq.tag}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-brand-orange text-white rotate-180' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100/60">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-brand-navy to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md text-amber-300">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-base">Have a Question Not Listed Here?</h4>
              <p className="text-xs text-slate-300 mt-0.5">Contact the Safar Sathi team directly.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="px-4 py-2.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-brand-orange" />
              <span>Call Us</span>
            </a>
            <a
              href={COMPANY_INFO.whatsappUrl("Hello SafarSathi, I have a specific question regarding my upcoming Himachal tour.")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
