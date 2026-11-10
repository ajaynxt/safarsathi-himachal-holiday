import React, { useEffect, useState } from 'react';
import { MapPin, CalendarDays, Users, Search, ChevronDown, ShieldCheck, CarFront, Headphones } from 'lucide-react';

interface HeroProps {
  onOpenBooking: (type?: 'package' | 'cab' | 'hotel' | 'volvo', item?: string) => void;
  onSearchPackages?: (destination: string) => void;
}

const typedLines = ['Himachal ki wadiyan', 'Manali ki barfili rahein', 'Spiti ka adventure', 'India ke yaadgaar safar'];

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onSearchPackages }) => {
  const [destination, setDestination] = useState('Shimla & Manali (Himachal)');
  const [travelDate, setTravelDate] = useState('Pick a Date');
  const [travellers, setTravellers] = useState('2 Adults');
  const [typedText, setTypedText] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = typedLines[lineIndex];
    const delay = deleting ? 42 : 82;
    const timer = window.setTimeout(() => {
      if (!deleting && typedText === phrase) {
        window.setTimeout(() => setDeleting(true), 1050);
      } else if (deleting && typedText.length === 0) {
        setDeleting(false);
        setLineIndex((current) => (current + 1) % typedLines.length);
      } else {
        setTypedText(deleting ? phrase.slice(0, typedText.length - 1) : phrase.slice(0, typedText.length + 1));
      }
    }, delay);
    return () => window.clearTimeout(timer);
  }, [typedText, deleting, lineIndex]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchPackages?.(destination);
    const packagesEl = document.getElementById('packages');
    if (packagesEl) packagesEl.scrollIntoView({ behavior: 'smooth' });
    else onOpenBooking('package', destination);
  };

  return (
    <section className="relative isolate min-h-[690px] sm:min-h-[720px] lg:min-h-[760px] flex items-center overflow-hidden bg-slate-950 pt-28 pb-10 sm:pt-32">
      <div className="absolute inset-0 -z-20">
        <img
          src="/safarsathi-himachal-holiday/images/destinations/manali.jpg"
          alt="Snow covered Himalayan mountain range"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-950/55 via-slate-950/35 to-slate-950/85" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/45 via-transparent to-slate-950/10" />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center text-white">
          <div className="hero-enter inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-white/95 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,.15)]" />
            Your journey, our responsibility
          </div>

          <h1 className="hero-enter mt-5 font-serif-title text-[2.65rem] leading-[1.04] font-bold tracking-tight drop-shadow-[0_4px_18px_rgba(0,0,0,.45)] sm:text-6xl lg:text-7xl">
            Har safar ho <span className="text-amber-300">khaas.</span>
          </h1>

          <div className="mt-3 min-h-[34px] sm:min-h-[48px] text-lg font-semibold text-white sm:text-2xl lg:text-3xl" aria-live="polite">
            <span>{typedText}</span><span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-0.5 animate-pulse bg-amber-300" />
          </div>

          <p className="hero-enter mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/90 sm:text-base sm:leading-7">
            Discover handpicked holidays, comfortable stays and trusted cabs — planned around the way you love to travel.
          </p>

          <div className="hero-enter mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] font-semibold text-white/90 sm:text-xs">
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-amber-300" /> 16 years of travel experience</span>
            <span className="inline-flex items-center gap-1.5"><CarFront className="h-4 w-4 text-amber-300" /> Private cab options</span>
            <span className="inline-flex items-center gap-1.5"><Headphones className="h-4 w-4 text-amber-300" /> Personal trip assistance</span>
          </div>
        </div>

        <form onSubmit={handleSearch} className="hero-enter mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-2 rounded-3xl border border-white/60 bg-white p-3 text-left shadow-[0_24px_70px_rgba(0,0,0,.28)] sm:grid-cols-[1.25fr_1fr_1fr_auto] sm:items-center sm:gap-0 sm:rounded-full sm:p-2">
          <div className="min-w-0 px-3 py-2 sm:px-5">
            <label className="block text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">Destination</label>
            <div className="mt-1 flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-amber-600" />
              <select value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full min-w-0 appearance-none bg-transparent text-sm font-bold text-slate-800 outline-none">
                <option value="Shimla & Manali (Himachal)">Shimla &amp; Manali</option>
                <option value="Spiti Valley Expedition">Spiti Valley</option>
                <option value="Jammu & Kashmir Paradise">Jammu &amp; Kashmir</option>
                <option value="Kerala Backwaters">Kerala</option>
                <option value="Custom India Tour">Custom India Tour</option>
              </select>
              <ChevronDown className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            </div>
          </div>

          <div className="min-w-0 border-t border-slate-100 px-3 py-2 sm:border-l sm:border-t-0 sm:px-5">
            <label className="block text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">Travel date</label>
            <div className="mt-1 flex items-center gap-2">
              <CalendarDays className="h-4 w-4 shrink-0 text-amber-600" />
              <select value={travelDate} onChange={(e) => setTravelDate(e.target.value)} className="w-full min-w-0 appearance-none bg-transparent text-sm font-bold text-slate-800 outline-none">
                <option value="Pick a Date">Any date</option>
                <option value="This Week (Immediate)">This week</option>
                <option value="Next 30 Days">Next 30 days</option>
                <option value="Summer Season">Summer season</option>
                <option value="Winter & Snow Season">Winter &amp; snow</option>
              </select>
              <ChevronDown className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            </div>
          </div>

          <div className="min-w-0 border-t border-slate-100 px-3 py-2 sm:border-l sm:border-t-0 sm:px-5">
            <label className="block text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">Travellers</label>
            <div className="mt-1 flex items-center gap-2">
              <Users className="h-4 w-4 shrink-0 text-amber-600" />
              <select value={travellers} onChange={(e) => setTravellers(e.target.value)} className="w-full min-w-0 appearance-none bg-transparent text-sm font-bold text-slate-800 outline-none">
                <option value="2 Adults">2 Adults</option>
                <option value="Family (3-4 Persons)">Family (3–4)</option>
                <option value="Group (5-8 Persons)">Group (5–8)</option>
                <option value="Large Group (Tempo / Bus)">9+ travellers</option>
              </select>
              <ChevronDown className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            </div>
          </div>

          <div className="pt-1 sm:pl-2 sm:pt-0">
            <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-amber-500 px-7 py-4 text-sm font-extrabold text-slate-950 shadow-lg shadow-amber-900/20 transition hover:bg-amber-400 active:scale-[.98] sm:w-auto sm:py-3.5">
              <Search className="h-4 w-4" /> Find my trip
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-[10px] font-medium tracking-wide text-white/75 sm:text-xs">
          Shimla · Manali · Spiti · Kashmir · Kerala · Tours across India
        </p>
      </div>
    </section>
  );
};
