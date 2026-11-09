import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageCircle, Phone, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';

interface FaqItem {
  question: string;
  answer: string;
  tag: string;
}

const FAQS: FaqItem[] = [
  {
    tag: 'Fleet & Cabs',
    question: 'Are all your cabs and taxis strictly white in color?',
    answer: 'Yes, 100%! All SafarSathi tourist vehicles (Swift Dzire, Toyota Etios, Honda City, Toyota Glanza, Maruti Ertiga, Toyota Innova Crysta, and Force Tempo Travellers) are pristine commercial white with valid Himachal / All-India Tourist Yellow Permit plates. We never assign private or colored vehicles to our guests.'
  },
  {
    tag: 'Pricing & Taxes',
    question: 'Are state toll taxes, green tax, parking, and driver allowances included in your package quotes?',
    answer: 'Yes! We follow a 100% transparent pricing policy. Every confirmed tour package quote explicitly includes fuel, all inter-state border taxes (Delhi, Haryana, Punjab, Himachal), toll plaza charges, green tax/environmental entry fee, and driver daily food & night accommodation allowances. Zero surprise charges during your journey.'
  },
  {
    tag: 'Snow & Permits',
    question: 'How do Rohtang Pass and Atal Tunnel permits work in winter/snow seasons?',
    answer: 'Our local Shimla & Manali desk coordinates real-time road status with Himachal Police and district administration. For Rohtang Pass, we guide and facilitate the online NGT permits. In winter when Rohtang is snow-bound, our 4x4 / hill-specialist snow drivers navigate safely through Atal Tunnel to Sissu (Lahaul Valley) and Solang Valley.'
  },
  {
    tag: 'Customization',
    question: 'Can we customize our day-by-day itinerary or upgrade our hotel stays?',
    answer: 'Absolutely! Every family and group is unique. You can customize pickup times, add extra sightseeing spots (e.g. Manikaran, Bir Billing, Tirthan Valley, Kaza), choose between 3-Star Deluxe, 4-Star Mountain View resorts, or riverside luxury cottages, and decide your preferred pace.'
  },
  {
    tag: 'Booking & Payment',
    question: 'What is the booking procedure and payment schedule?',
    answer: 'To confirm your dates, cab, and hotel reservation, we take a nominal booking advance (20-25%). The remaining balance is payable conveniently during your tour — part upon pickup and the rest after hotel check-in. We accept UPI, Google Pay, Net Banking, and Bank Transfer with instant official invoice receipts.'
  },
  {
    tag: 'Drivers & Safety',
    question: 'Are your drivers trained for high-altitude mountain hairpins and family safety?',
    answer: 'All our chauffeurs are native Pahadi drivers with a minimum of 8+ years of mountain highway driving experience on roads like Kalka-Shimla, Kiratpur-Manali, Jalori Pass, and Rohtang. They are polite, non-smokers, verified with police credentials, and trained to assist senior citizens, children, and honeymooners.'
  }
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
            Frequently Asked Questions by Himalayan Travelers
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Everything you need to know about our all-white cabs, hill driving safety, customized stays, and transparent booking policy.
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
              <p className="text-xs text-slate-300 mt-0.5">Talk directly with our Shimla tour manager. Real local advice in 2 minutes.</p>
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
