import React from 'react';
import { ShieldCheck, Compass, HeartHandshake, PhoneCall, Clock, CheckCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-brand-orange" />,
      title: "100% Shimla Local Advantage",
      description: "Our physical head office is right at New Bus Stand, Tutikandi, Shimla. When weather changes or mountain roads get blocked, our local network resolves it instantly."
    },
    {
      icon: <Compass className="w-6 h-6 text-brand-orange" />,
      title: "Certified Pahadi Drivers",
      description: "All our chauffeurs are born and raised in the mountains with 7+ years of driving on high passes like Rohtang, Atal Tunnel, and Spiti. Patient, courteous, and safe."
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-brand-orange" />,
      title: "Zero Hidden Charges",
      description: "Clear and transparent quotations. All toll taxes, state permits, green taxes, night driver charges, and parking fees are upfront. No surprises midway."
    },
    {
      icon: <PhoneCall className="w-6 h-6 text-brand-orange" />,
      title: "Dedicated On-Trip Support Manager",
      description: "You receive a personal trip coordinator who tracks your journey daily, coordinates with hotels, and remains available on WhatsApp and phone 24 hours a day."
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-brand-orange" />,
      title: "Customized Itineraries for Families & Couples",
      description: "No hurried, rigid schedules. Enjoy leisure time at riversides, apple orchards, cafes, and scenic photopoints at your own pace."
    },
    {
      icon: <Clock className="w-6 h-6 text-brand-orange" />,
      title: "Instant Booking & Easy Token Payment",
      description: "Confirm your dream holiday with a small advance token. Flexible payment modes and hassle-free cancellation policies."
    }
  ];

  return (
    <section id="why-us" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <span>The SafarSathi Promise</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Why Thousands of Travelers Trust Himachal Holiday
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            From the bustling plains of Delhi & Chandigarh to the serene snow peaks of the Himalayas, we take full responsibility of your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:border-brand-orange/40 group"
            >
              <div className="p-3 bg-white rounded-xl shadow-sm inline-block mb-4 group-hover:scale-110 transition-transform">
                {r.icon}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-orange transition-colors">
                {r.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {r.description}
              </p>
            </div>
          ))}
        </div>

        {/* Local Office Address Card */}
        <div className="mt-14 bg-gradient-to-r from-slate-900 via-brand-navy to-slate-900 rounded-3xl p-6 sm:p-10 text-white flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center lg:text-left">
            <span className="text-brand-orange text-xs font-bold uppercase tracking-wider">
              Walk Into Our Office In Shimla
            </span>
            <h3 className="text-xl sm:text-2xl font-bold">
              {COMPANY_INFO.address}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Directly opposite the Tutikandi New Bus Stand. Have a cup of Pahadi chai with us while we plan your tour!
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="px-6 py-3 rounded-xl bg-brand-orange hover:bg-brand-orange-dark text-white font-bold text-xs sm:text-sm shadow-lg transition-all"
            >
              Call: {COMPANY_INFO.phoneDisplay}
            </a>
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
