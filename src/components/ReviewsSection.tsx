import React from 'react';
import { MessageCircle } from 'lucide-react';

export const ReviewsSection: React.FC = () => (
  <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
    <div className="max-w-4xl mx-auto px-4 text-center">
      <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-navy">Traveler feedback</h2>
      <p className="mt-3 text-slate-600">Planning your first trip with us? Ask our team about recent travel experiences and the details of your proposed itinerary.</p>
      <a href="https://wa.me/918351987587?text=Hello%20Safar%20Sathi%2C%20I%20would%20like%20to%20discuss%20your%20travel%20services." target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white"><MessageCircle className="w-5 h-5" aria-hidden="true"/> Speak to our team</a>
    </div>
  </section>
);
