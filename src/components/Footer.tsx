import React from 'react';
import { Phone, Mail, MapPin, Heart, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO, TOUR_PACKAGES, VEHICLE_FLEET } from '../data/travelData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="h-12 flex items-center">
              <img
                src="/images/logo.svg"
                alt="SafarSathi"
                className="h-full w-auto object-contain filter brightness-110 drop-shadow"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src.endsWith('.svg')) target.src = '/images/logo.png';
                }}
              />
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              <strong>SafarSathi (Himachal Holiday)</strong> is your premier Himalayan travel agency based directly at Tutikandi, Shimla. Specializing in All-India tours, sanitized mountain cabs, Volvo bus services, and handpicked luxury hotels.
            </p>

            <div className="flex items-center gap-2 text-xs text-brand-orange font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Government Registered & HP Tourism Approved</span>
            </div>
          </div>

          {/* Popular Tour Packages */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-brand-orange pl-2.5">
              Top Tour Packages
            </h4>
            <ul className="space-y-2 text-xs">
              {TOUR_PACKAGES.map((pkg) => (
                <li key={pkg.id}>
                  <a href="#packages" className="hover:text-brand-orange transition-colors flex items-center justify-between">
                    <span>{pkg.title}</span>
                    <span className="text-slate-500">{pkg.duration.split('/')[0]}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Taxi & Cabs Fleet */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-brand-orange pl-2.5">
              Taxi & Fleet Rental
            </h4>
            <ul className="space-y-2 text-xs">
              {VEHICLE_FLEET.map((v) => (
                <li key={v.id}>
                  <a href="#cabs" className="hover:text-brand-orange transition-colors flex items-center justify-between">
                    <span>{v.name}</span>
                    <span className="text-slate-500">{v.category}</span>
                  </a>
                </li>
              ))}
              <li className="pt-2 text-slate-400 text-[11px]">
                Available in: <strong>Delhi, Chandigarh, Kalka, Shimla, Manali</strong>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-brand-orange pl-2.5">
              Shimla Head Office
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </p>

              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-orange flex-shrink-0" />
                <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-white font-bold text-brand-orange">
                  {COMPANY_INFO.phoneDisplay}
                </a>
              </p>

              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-orange flex-shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white">
                  {COMPANY_INFO.email}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} <strong>SafarSathi (Himachal Holiday)</strong>. All Rights Reserved.
          </p>

          <p className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Himalayan Travelers</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
