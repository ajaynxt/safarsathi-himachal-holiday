import React from 'react';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';
import { COMPANY_INFO, VEHICLE_FLEET } from '../data/travelData';

export const Footer: React.FC = () => (
  <footer className="border-t border-slate-800 bg-slate-950 pb-24 pt-14 text-slate-300 md:pb-10">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_.8fr_1fr]">
        <div>
          <div className="inline-flex h-11 items-center rounded-xl bg-white px-3 py-1">
            <img src={`${import.meta.env.BASE_URL}images/logo.png`} alt="Safar Sathi logo" className="h-8 w-auto object-contain" />
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">Travel enquiries, customised trip planning and transport options for destinations across India.</p>
          <p className="mt-4 text-xs font-semibold text-amber-300">9 years of travel experience</p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Explore</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#destinations" className="hover:text-amber-300">Destinations</a></li>
            <li><a href="#cabs" className="hover:text-amber-300">Vehicle options</a></li>
            <li><a href="#routes" className="hover:text-amber-300">Popular routes</a></li>
            <li><a href="#contact" className="hover:text-amber-300">Contact</a></li>
          </ul>
          <h4 className="mb-3 mt-7 text-sm font-bold uppercase tracking-wider text-white">Transport enquiries</h4>
          <p className="text-xs leading-6 text-slate-400">{VEHICLE_FLEET.map((v) => v.name.split(' (')[0]).join(' · ')}</p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Contact Safar Sathi</h4>
          <div className="space-y-3 text-sm">
            <p className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" /><span>{COMPANY_INFO.address}</span></p>
            <p className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0 text-amber-400" /><a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-white">{COMPANY_INFO.phoneDisplay}</a></p>
            <p className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0 text-amber-400" /><a href={`mailto:${COMPANY_INFO.email}`} className="break-all hover:text-white">{COMPANY_INFO.email}</a></p>
            <p className="flex items-center gap-2"><InstagramIcon className="h-4 w-4 shrink-0 text-pink-400" /><a href={COMPANY_INFO.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white">{COMPANY_INFO.instagramHandle}</a></p>
            <p className="pt-2"><a href={COMPANY_INFO.whatsappUrl('Hello Safar Sathi, I have a travel enquiry.')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold text-emerald-400 hover:text-emerald-300"><MessageCircle className="h-4 w-4" /> Chat on WhatsApp</a></p>
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-3 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Safar Sathi. All rights reserved.</p>
        <p>Website by <a href="https://ajaynxt.com" target="_blank" rel="noopener noreferrer" className="font-bold text-amber-300 hover:text-white">AJAYNXT</a></p>
      </div>
    </div>
  </footer>
);
