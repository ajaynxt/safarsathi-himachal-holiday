import React, { useEffect, useState } from 'react';
import { MapPin, CalendarDays, Users, Search, ChevronDown, ArrowRight, Building2, Car } from 'lucide-react';

interface HeroProps {
  onOpenBooking: (type?: 'package' | 'cab' | 'hotel' | 'volvo', item?: string) => void;
  onSearchPackages?: (destination: string) => void;
}

const assetBase = import.meta.env.BASE_URL;

const heroImages = [
  { src: `${assetBase}images/destinations/manali.jpg`, alt: 'Snow-covered Himalayan peaks and valley near Manali' },
  { src: `${assetBase}images/destinations/shimla.jpg`, alt: 'Mountain scenery and pine-covered slopes around Shimla' },
  { src: `${assetBase}images/destinations/spiti.jpg`, alt: 'High-altitude mountain landscape in Spiti Valley' },
  { src: `${assetBase}images/destinations/ladakh.jpg`, alt: 'Wide Himalayan mountain landscape in Ladakh' },
  { src: `${assetBase}images/destinations/shimla_night.jpg`, alt: 'Shimla hillside illuminated after sunset' },
];

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onSearchPackages }) => {
  const [activeTab, setActiveTab] = useState<'package' | 'hotel' | 'cab'>('package');
  const [destination, setDestination] = useState('Shimla & Manali (Himachal)');
  const [travelDate, setTravelDate] = useState('Pick a Date');
  const [travellers, setTravellers] = useState('2 Adults');
  const [hotelCity, setHotelCity] = useState('Shimla (Near Mall Road)');
  const [hotelCategory, setHotelCategory] = useState('3-Star Deluxe Room');
  const [cabRoute, setCabRoute] = useState('Chandigarh to Shimla / Manali');
  const [cabVehicle, setCabVehicle] = useState('Toyota Innova Crysta');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [heroImageIndex, setHeroImageIndex] = useState(() => Math.floor(Math.random() * heroImages.length));

  // Preload only the next destination image, keeping the first paint lightweight.
  useEffect(() => {
    const nextIndex = (heroImageIndex + 1) % heroImages.length;
    const preload = new Image();
    preload.src = heroImages[nextIndex].src;
  }, [heroImageIndex]);

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setPrefersReducedMotion(motionPreference.matches);
    updateMotionPreference();
    motionPreference.addEventListener('change', updateMotionPreference);
    return () => motionPreference.removeEventListener('change', updateMotionPreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const rotation = window.setInterval(() => {
      setHeroImageIndex((current) => (current + 1) % heroImages.length);
    }, 7000);
    return () => window.clearInterval(rotation);
  }, [prefersReducedMotion]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'hotel') {
      onOpenBooking('hotel', `${hotelCity} | Category: ${hotelCategory} | Travel dates: ${travelDate}`);
    } else if (activeTab === 'cab') {
      onOpenBooking('cab', `${cabRoute} | Vehicle: ${cabVehicle} | Travel dates: ${travelDate}`);
    } else {
      const enquiryDetails = `${destination} | Travel date: ${travelDate} | Travellers: ${travellers}`;
      if (onSearchPackages) onSearchPackages(enquiryDetails);
      else onOpenBooking('package', enquiryDetails);
    }
  };

  return (
    <>
      <section className="relative isolate flex h-[calc(100svh-4.5rem)] min-h-[620px] max-h-[860px] items-end overflow-hidden bg-slate-950 pb-28 pt-20 sm:min-h-[680px] sm:pb-32 lg:min-h-[720px]">
        <div className="absolute inset-0 -z-20">
          <img
            key={heroImages[heroImageIndex].src}
            src={heroImages[heroImageIndex].src}
            alt={heroImages[heroImageIndex].alt}
            fetchPriority="high"
            loading="eager"
            decoding="async"
            sizes="100vw"
            className="hero-background-change h-full w-full object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-950/15 via-slate-950/25 to-slate-950/85" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/35 via-slate-950/5 to-slate-950/20" />

        <div className="mx-auto w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-white">
            <p className="hero-enter inline-flex items-center rounded-full border border-white/30 bg-slate-950/25 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/95 backdrop-blur-sm sm:text-xs">
              Himachal Holidays <span className="mx-2 text-amber-300">•</span> India Tours <span className="mx-2 text-amber-300">•</span> Verified Hotels <span className="mx-2 text-amber-300">•</span> Private Cabs
            </p>

            <h1 className="hero-enter mt-5 font-serif-title text-[2.65rem] font-bold leading-[1.04] tracking-tight drop-shadow-[0_4px_22px_rgba(0,0,0,.55)] sm:text-6xl lg:text-7xl">
              Discover Himachal. <span className="text-amber-300">Explore India.</span>
            </h1>

            <p className="hero-enter mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/90 drop-shadow sm:text-base sm:leading-7">
              Private cabs, verified partner hotels, personalised tour plans and 24x7 travel assistance across Himachal and India.
            </p>

            <a
              href="#hero-trip-search"
              className="hero-enter mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-amber-400 px-8 py-3.5 text-sm font-extrabold text-slate-950 shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Plan Your Trip <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <div className="relative z-20 -mt-16 px-4 pb-9 sm:-mt-20 sm:px-6 lg:px-8">
        {/* Service Selector Tabs */}
        <div role="group" aria-label="Choose a travel service" className="mx-auto mb-2 flex max-w-5xl flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('package')}
            aria-pressed={activeTab === 'package'}
            className={`inline-flex min-w-[88px] flex-1 items-center justify-center gap-1.5 rounded-full px-2 py-2 text-[11px] font-bold leading-tight transition-all sm:flex-none sm:px-3.5 sm:py-1.5 sm:text-xs ${
              activeTab === 'package'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'bg-slate-900/70 text-white/90 backdrop-blur-md hover:bg-slate-800'
            }`}
          >
            <span className="whitespace-normal text-center leading-tight">🏔️ Tour Packages</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('hotel')}
            aria-pressed={activeTab === 'hotel'}
            className={`inline-flex min-w-[88px] flex-1 items-center justify-center gap-1.5 rounded-full px-2 py-2 text-[11px] font-bold leading-tight transition-all sm:flex-none sm:px-3.5 sm:py-1.5 sm:text-xs ${
              activeTab === 'hotel'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'bg-slate-900/70 text-white/90 backdrop-blur-md hover:bg-slate-800'
            }`}
          >
            <span className="whitespace-normal text-center leading-tight">🏨 Verified Hotels</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('cab')}
            aria-pressed={activeTab === 'cab'}
            className={`inline-flex min-w-[88px] flex-1 items-center justify-center gap-1.5 rounded-full px-2 py-2 text-[11px] font-bold leading-tight transition-all sm:flex-none sm:px-3.5 sm:py-1.5 sm:text-xs ${
              activeTab === 'cab'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'bg-slate-900/70 text-white/90 backdrop-blur-md hover:bg-slate-800'
            }`}
          >
            <span className="whitespace-normal text-center leading-tight">🚖 Taxi &amp; Cabs</span>
          </button>
        </div>

        <form
          id="hero-trip-search"
          onSubmit={handleSearch}
          className="hero-enter mx-auto grid max-w-5xl grid-cols-1 gap-2 rounded-2xl border border-slate-200/80 bg-white/95 p-3 text-left shadow-[0_24px_70px_rgba(15,23,42,.22)] backdrop-blur-xl sm:grid-cols-[1.25fr_1fr_1fr_auto] sm:items-center sm:gap-0 sm:p-3"
        >
          {activeTab === 'hotel' ? (
            <>
              <div className="min-w-0 px-3 py-2 sm:px-4">
                <label htmlFor="hero-hotel-city" className="block text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">Hotel City / Destination</label>
                <div className="mt-1 flex items-center gap-2">
                  <Building2 className="h-4 w-4 shrink-0 text-amber-600" />
                  <select id="hero-hotel-city" value={hotelCity} onChange={(e) => setHotelCity(e.target.value)} className="w-full min-w-0 appearance-none rounded-sm bg-transparent text-sm font-bold text-slate-800 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600">
                    <option value="Shimla (39 Real Photos Available)">Shimla (Near Mall Road)</option>
                    <option value="Manali (22 Real Photos Available)">Manali (Riverside Cottages)</option>
                    <option value="Kasol (Parvati Valley)">Kasol (Alpine Retreat)</option>
                    <option value="Amritsar (Near Golden Temple)">Amritsar (Heritage Boutique)</option>
                    <option value="Srinagar (Dal Lake Houseboat & Resort)">Srinagar (Dal Lake &amp; Houseboat)</option>
                    <option value="Dharamshala & McLeodganj">Dharamshala &amp; McLeodganj</option>
                    <option value="Dalhousie Hill Stays">Dalhousie</option>
                  </select>
                  <ChevronDown className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                </div>
              </div>

              <div className="min-w-0 border-t border-slate-100 px-3 py-2 sm:border-l sm:border-t-0 sm:px-4">
                <label htmlFor="hero-hotel-date" className="block text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">Check-in dates</label>
                <div className="mt-1 flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 shrink-0 text-amber-600" />
                  <select id="hero-hotel-date" value={travelDate} onChange={(e) => setTravelDate(e.target.value)} className="w-full min-w-0 appearance-none rounded-sm bg-transparent text-sm font-bold text-slate-800 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600">
                    <option value="Pick a Date">Any date</option>
                    <option value="This Week (Immediate)">This week</option>
                    <option value="Next 30 Days">Next 30 days</option>
                    <option value="Summer Season">Summer season</option>
                    <option value="Winter & Snow Season">Winter &amp; snow</option>
                  </select>
                  <ChevronDown className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                </div>
              </div>

              <div className="min-w-0 border-t border-slate-100 px-3 py-2 sm:border-l sm:border-t-0 sm:px-4">
                <label htmlFor="hero-hotel-cat" className="block text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">Room / Stay Category</label>
                <div className="mt-1 flex items-center gap-2">
                  <Users className="h-4 w-4 shrink-0 text-amber-600" />
                  <select id="hero-hotel-cat" value={hotelCategory} onChange={(e) => setHotelCategory(e.target.value)} className="w-full min-w-0 appearance-none rounded-sm bg-transparent text-sm font-bold text-slate-800 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600">
                    <option value="3-Star Deluxe Room">3-Star Deluxe Room</option>
                    <option value="4-Star Luxury Resort">4-Star Luxury Resort</option>
                    <option value="Riverside Cottage / Swiss Camp">Riverside Cottage / Camp</option>
                    <option value="Family Suite (2 Rooms)">Family Suite (2 Rooms)</option>
                    <option value="Honeymoon Special Room">Honeymoon Special Room</option>
                  </select>
                  <ChevronDown className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                </div>
              </div>

              <div className="pt-1 sm:pl-2 sm:pt-0">
                <button type="submit" className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-extrabold text-slate-950 shadow-lg shadow-amber-900/15 transition hover:bg-amber-400 active:scale-[.98] sm:w-auto">
                  <Search className="h-4 w-4" /> Find Hotels
                </button>
              </div>
            </>
          ) : activeTab === 'cab' ? (
            <>
              <div className="min-w-0 px-3 py-2 sm:px-4">
                <label htmlFor="hero-cab-route" className="block text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">Pickup &amp; Route</label>
                <div className="mt-1 flex items-center gap-2">
                  <Car className="h-4 w-4 shrink-0 text-amber-600" />
                  <select id="hero-cab-route" value={cabRoute} onChange={(e) => setCabRoute(e.target.value)} className="w-full min-w-0 appearance-none rounded-sm bg-transparent text-sm font-bold text-slate-800 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600">
                    <option value="Chandigarh to Shimla / Manali">Chandigarh to Shimla / Manali</option>
                    <option value="Delhi to Shimla / Manali">Delhi to Shimla / Manali</option>
                    <option value="Kalka to Shimla (Toy Train / Station)">Kalka to Shimla</option>
                    <option value="Manali Local Sightseeing & Rohtang">Manali Local &amp; Solang/Atal Tunnel</option>
                    <option value="Shimla Local & Kufri Sightseeing">Shimla Local &amp; Kufri</option>
                    <option value="Complete Himachal 5-7 Days Cab">Complete Himachal Tour Cab</option>
                  </select>
                  <ChevronDown className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                </div>
              </div>

              <div className="min-w-0 border-t border-slate-100 px-3 py-2 sm:border-l sm:border-t-0 sm:px-4">
                <label htmlFor="hero-cab-date" className="block text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">Travel dates</label>
                <div className="mt-1 flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 shrink-0 text-amber-600" />
                  <select id="hero-cab-date" value={travelDate} onChange={(e) => setTravelDate(e.target.value)} className="w-full min-w-0 appearance-none rounded-sm bg-transparent text-sm font-bold text-slate-800 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600">
                    <option value="Pick a Date">Any date</option>
                    <option value="This Week (Immediate)">This week</option>
                    <option value="Next 30 Days">Next 30 days</option>
                    <option value="Summer Season">Summer season</option>
                    <option value="Winter & Snow Season">Winter &amp; snow</option>
                  </select>
                  <ChevronDown className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                </div>
              </div>

              <div className="min-w-0 border-t border-slate-100 px-3 py-2 sm:border-l sm:border-t-0 sm:px-4">
                <label htmlFor="hero-cab-vehicle" className="block text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">Vehicle Type</label>
                <div className="mt-1 flex items-center gap-2">
                  <Users className="h-4 w-4 shrink-0 text-amber-600" />
                  <select id="hero-cab-vehicle" value={cabVehicle} onChange={(e) => setCabVehicle(e.target.value)} className="w-full min-w-0 appearance-none rounded-sm bg-transparent text-sm font-bold text-slate-800 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600">
                    <option value="Swift Dzire / Etios (Sedan)">Swift Dzire / Etios (Sedan)</option>
                    <option value="Maruti Ertiga (6-Seater MUV)">Maruti Ertiga (6-Seater MUV)</option>
                    <option value="Toyota Innova Crysta (Luxury SUV)">Toyota Innova Crysta (SUV)</option>
                    <option value="Tempo Traveller (12-16 Seater)">Tempo Traveller (Group)</option>
                  </select>
                  <ChevronDown className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                </div>
              </div>

              <div className="pt-1 sm:pl-2 sm:pt-0">
                <button type="submit" className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-extrabold text-slate-950 shadow-lg shadow-amber-900/15 transition hover:bg-amber-400 active:scale-[.98] sm:w-auto">
                  <Search className="h-4 w-4" /> Find Cabs
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="min-w-0 px-3 py-2 sm:px-4">
                <label htmlFor="hero-destination" className="block text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">Destination</label>
                <div className="mt-1 flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-amber-600" />
                  <select id="hero-destination" value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full min-w-0 appearance-none rounded-sm bg-transparent text-sm font-bold text-slate-800 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600">
                    <option value="Shimla & Manali (Himachal)">Shimla &amp; Manali</option>
                    <option value="Spiti Valley Expedition">Spiti Valley</option>
                    <option value="Leh Ladakh Nubra & Pangong">Leh Ladakh</option>
                    <option value="Jammu & Kashmir Paradise">Jammu &amp; Kashmir</option>
                    <option value="Kerala Backwaters">Kerala</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Goa">Goa</option>
                    <option value="North East India">North East India</option>
                    <option value="Custom India Tour">Custom India Tour</option>
                  </select>
                  <ChevronDown className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                </div>
              </div>

              <div className="min-w-0 border-t border-slate-100 px-3 py-2 sm:border-l sm:border-t-0 sm:px-4">
                <label htmlFor="hero-travel-date" className="block text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">Travel dates</label>
                <div className="mt-1 flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 shrink-0 text-amber-600" />
                  <select id="hero-travel-date" value={travelDate} onChange={(e) => setTravelDate(e.target.value)} className="w-full min-w-0 appearance-none rounded-sm bg-transparent text-sm font-bold text-slate-800 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600">
                    <option value="Pick a Date">Any date</option>
                    <option value="This Week (Immediate)">This week</option>
                    <option value="Next 30 Days">Next 30 days</option>
                    <option value="Summer Season">Summer season</option>
                    <option value="Winter & Snow Season">Winter &amp; snow</option>
                  </select>
                  <ChevronDown className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                </div>
              </div>

              <div className="min-w-0 border-t border-slate-100 px-3 py-2 sm:border-l sm:border-t-0 sm:px-4">
                <label htmlFor="hero-travellers" className="block text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">Travellers</label>
                <div className="mt-1 flex items-center gap-2">
                  <Users className="h-4 w-4 shrink-0 text-amber-600" />
                  <select id="hero-travellers" value={travellers} onChange={(e) => setTravellers(e.target.value)} className="w-full min-w-0 appearance-none rounded-sm bg-transparent text-sm font-bold text-slate-800 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600">
                    <option value="1 Traveller (Solo)">1 Traveller (Solo)</option>
                    <option value="2 Adults">2 Adults</option>
                    <option value="Family (3-4 Persons)">Family (3–4)</option>
                    <option value="Group (5-8 Persons)">Group (5–8)</option>
                    <option value="Large Group (Tempo / Bus)">9+ travellers</option>
                  </select>
                  <ChevronDown className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                </div>
              </div>

              <div className="pt-1 sm:pl-2 sm:pt-0">
                <button type="submit" className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-extrabold text-slate-950 shadow-lg shadow-amber-900/15 transition hover:bg-amber-400 active:scale-[.98] sm:w-auto">
                  <Search className="h-4 w-4" /> Find my trip
                </button>
              </div>
            </>
          )}
        </form>

        <p className="mt-4 text-center text-[10px] font-medium tracking-wide text-slate-500 sm:text-xs">
          Shimla <span className="mx-1 text-amber-600">·</span> Manali <span className="mx-1 text-amber-600">·</span> Spiti <span className="mx-1 text-amber-600">·</span> Ladakh <span className="mx-1 text-amber-600">·</span> Kashmir <span className="mx-1 text-amber-600">·</span> Kerala <span className="mx-1 text-amber-600">·</span> Tours across India
        </p>
      </div>
    </>
  );
};
