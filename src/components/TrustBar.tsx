import React from 'react';
import { ShieldCheck, Award, Headphones, Mountain } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const trustItems = [
    {
      icon: ShieldCheck,
      title: 'Trusted Travel Partner',
      subtitle: 'Safe & Reliable',
    },
    {
      icon: Award,
      title: 'Best Price Guarantee',
      subtitle: 'Value for Your Money',
    },
    {
      icon: Headphones,
      title: '24x7 Support',
      subtitle: 'Always with You',
    },
    {
      icon: Mountain,
      title: 'Local Experiences',
      subtitle: 'Discover the Real Himalayas',
    },
  ];

  return (
    <section className="bg-white border-y border-stone-200/80 py-6 sm:py-8 shadow-sm relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-stone-200">
          {trustItems.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={idx} 
                className="flex items-center gap-3.5 sm:gap-4 px-2 sm:px-6 lg:justify-center group"
              >
                {/* Golden Badge Icon */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-amber-100/70 transition-all duration-300">
                  <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-amber-600 group-hover:text-amber-700 transition-colors" />
                </div>

                {/* Text */}
                <div className="text-left">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
