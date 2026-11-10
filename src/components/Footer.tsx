import React from 'react';
import { Phone, Mail, MapPin, Heart, ShieldCheck } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';
import { COMPANY_INFO, TOUR_PACKAGES, VEHICLE_FLEET } from '../data/travelData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="h-11 px-3 py-1 bg-white rounded-xl shadow-md inline-flex items-center">
              <img
                src={`${import.meta.env.BASE_URL}images/logo.png`}
                alt="Safar Sathi logo - Your Journey, Our Responsibility"
                className="h-8 w-auto object-contain"
              />
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              <strong>Safar Sathi</strong> is India&apos;s trusted online travel platform. Specializing in custom tour packages across all Indian states, 100% commercial sanitized white cabs, Volvo bus services, and handpicked luxury hotels.
            </p>

            <div className="flex items-center gap-2 text-xs text-amber-400 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Verified Online Bookings &amp; 24x7 Road Support</span>
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
              24x7 Online Desk (All States)
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

              <p className="flex items-center gap-2 pt-1">
                <InstagramIcon className="w-4 h-4 text-pink-500 flex-shrink-0" />
                <a
                  href={COMPANY_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 font-semibold text-slate-200 transition-colors"
                >
                  {COMPANY_INFO.instagramHandle}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} <strong>Safar Sathi</strong>. All Rights Reserved.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <p className="flex items-center gap-1">
              <span>Crafted with</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>for Safar Sathi travellers</span>
            </p>
            <span className="hidden sm:inline text-slate-700">|</span>
            <p className="flex items-center gap-1 text-slate-400">
              <span>Designed by</span>
              <a
                href="https://ajaynxt.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-brand-orange hover:text-white transition-colors underline-offset-2 hover:underline"
              >
                ajaynxt.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
