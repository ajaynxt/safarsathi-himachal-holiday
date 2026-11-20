import { useState } from 'react';
import {
  ArrowRight,
  BedDouble,
  CakeSlice,
  Camera,
  CarFront,
  Check,
  Flame,
  Flower2,
  Heart,
  Sparkles,
  Utensils,
} from 'lucide-react';

interface HoneymoonPackagesProps {
  onEnquire: (itemName: string) => void;
}

const routes = [
  {
    id: 'shimla',
    name: 'Shimla',
    note: 'Quiet hill-station moments',
    route: 'Shimla · Kufri',
    image: 'images/destinations/shimla.jpg',
    imageAlt: 'Mountain town of Shimla surrounded by Himalayan hills',
    description: 'A relaxed mountain escape with time for the Ridge, Mall Road and Kufri. The pace and stay can be shaped around your travel dates.',
    highlights: ['Leisure time around Shimla', 'Kufri and nearby viewpoints', 'A stay suited to your preferences'],
    enquiry: 'Shimla honeymoon enquiry',
  },
  {
    id: 'manali',
    name: 'Manali',
    note: 'Valley views and cosy stays',
    route: 'Manali · Solang Valley',
    image: 'images/destinations/manali.jpg',
    imageAlt: 'Mountain scenery around Manali in Himachal Pradesh',
    description: 'Plan a Manali break around mountain views, local sightseeing and the experiences you both enjoy. Snow and high-altitude excursions depend on season and access.',
    highlights: ['Old Manali and Hadimba area', 'Solang Valley when accessible', 'Leisure time for the two of you'],
    enquiry: 'Manali honeymoon enquiry',
  },
  {
    id: 'shimla-manali',
    name: 'Shimla & Manali',
    note: 'A classic Himachal road trip',
    route: 'Shimla · Kufri · Kullu · Manali',
    image: 'images/packages/shimla_manali_5_nights_6_days.png',
    imageAlt: 'Shimla and Manali Himalayan holiday route',
    description: 'Combine two much-loved hill destinations in one holiday, with scenic travel through the Kullu valley and time to explore both towns.',
    highlights: ['Shimla and Kufri sightseeing', 'Scenic journey through Kullu', 'Manali and Solang area'],
    enquiry: 'Shimla and Manali honeymoon enquiry',
  },
  {
    id: 'kerala',
    name: 'Kerala',
    note: 'Tea gardens and backwaters',
    route: 'Kochi · Munnar · Thekkady · Alleppey',
    image: 'images/packages/kerala_5_nights_6_days_package.png',
    imageAlt: 'Kerala backwater and green tropical landscape',
    description: 'Choose a different kind of escape with Munnar tea-country, Thekkady and Alleppey backwaters. Houseboat and resort details are confirmed in your quotation.',
    highlights: ['Munnar tea-estate scenery', 'Thekkady and spice-country stops', 'Alleppey backwaters'],
    enquiry: 'Kerala honeymoon enquiry',
  },
] as const;

type RouteId = (typeof routes)[number]['id'];

const optionalTouches = [
  { icon: BedDouble, title: 'Couple-friendly stay', detail: 'Choose a hotel or room category that suits your comfort and budget.' },
  { icon: CarFront, title: 'Private travel', detail: 'Ask for a dedicated vehicle for the agreed route and sightseeing.' },
  { icon: Flame, title: 'Bonfire evening', detail: 'Can be requested where the property and local rules permit.' },
  { icon: Utensils, title: 'Candlelight dinner', detail: 'A special dinner can be checked with the selected hotel or venue.' },
  { icon: Flower2, title: 'Room decoration', detail: 'Flower or room décor can be discussed with the property.' },
  { icon: CakeSlice, title: 'Cake and celebration', detail: 'Add a birthday, anniversary or honeymoon surprise on request.' },
  { icon: Camera, title: 'Couple photography', detail: 'Ask about a local scenic photo session.' },
  { icon: Sparkles, title: 'Your own ideas', detail: 'Share the little details that would make the trip personal.' },
];

export function HoneymoonPackages({ onEnquire }: HoneymoonPackagesProps) {
  const [selectedRouteId, setSelectedRouteId] = useState<RouteId>('shimla-manali');
  const selectedRoute = routes.find((route) => route.id === selectedRouteId) ?? routes[2];

  const handleEnquire = () => {
    onEnquire(
      `${selectedRoute.enquiry} — preferred route: ${selectedRoute.route}. Please share a customised itinerary and quotation, including stay, vehicle, inclusions, exclusions and optional experiences.`
    );
  };

  return (
    <section id="honeymoon" className="overflow-hidden bg-[#f8f5f1] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 border-b border-[#e6ddd3] pb-8 md:grid-cols-[1fr_auto] md:items-end md:gap-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[.2em] text-[#8a633d]">
              <Heart className="h-3.5 w-3.5" aria-hidden="true" /> Made for the two of you
            </span>
            <h2 className="mt-3 font-serif-title text-3xl font-bold leading-tight text-[#421e29] sm:text-5xl">
              Start your next chapter somewhere beautiful.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Choose the kind of escape you have in mind. Safar Sathi can help shape the route, stay and travel around your dates, comfort and budget.
            </p>
          </div>
          <p className="max-w-xs text-xs leading-5 text-slate-500 md:text-right">
            Personalised quotations only. Final prices and inclusions are confirmed before you book.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[.78fr_1.05fr_1fr] lg:items-stretch">
          <div>
            <p className="mb-3 text-[10px] font-extrabold uppercase tracking-[.18em] text-[#8a633d]">01 / Choose your destination</p>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
              {routes.map((route) => {
                const active = selectedRoute.id === route.id;
                return (
                  <button
                    key={route.id}
                    type="button"
                    onClick={() => setSelectedRouteId(route.id)}
                    aria-pressed={active}
                    className={`group min-h-[88px] rounded-xl border p-3 text-left transition-colors sm:p-4 ${
                      active
                        ? 'border-[#421e29] bg-[#421e29] text-white shadow-sm'
                        : 'border-[#e5dbd1] bg-white text-slate-800 hover:border-[#b58a58]'
                    }`}
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className="text-sm font-bold sm:text-base">{route.name}</span>
                      {active && <Check className="h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" />}
                    </span>
                    <span className={`mt-1 block text-[11px] leading-4 sm:text-xs ${active ? 'text-white/75' : 'text-slate-500'}`}>
                      {route.note}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative min-h-[340px] overflow-hidden rounded-2xl bg-[#421e29] sm:min-h-[440px]">
            <img
              key={selectedRoute.image}
              src={`${import.meta.env.BASE_URL}${selectedRoute.image}`}
              alt={selectedRoute.imageAlt}
              loading="lazy"
              decoding="async"
              width={900}
              height={1100}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1f1217]/90 via-[#1f1217]/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
              <span className="text-[10px] font-bold uppercase tracking-[.18em] text-amber-300">Selected honeymoon route</span>
              <h3 className="mt-2 font-serif-title text-3xl font-bold leading-tight sm:text-4xl">{selectedRoute.name}</h3>
              <p className="mt-2 flex items-start gap-2 text-xs leading-5 text-white/85 sm:text-sm">
                <span className="mt-0.5 shrink-0">⌖</span>{selectedRoute.route}
              </p>
            </div>
          </div>

          <div className="flex flex-col rounded-2xl border border-[#e6ddd3] bg-white p-5 sm:p-7">
            <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#8a633d]">02 / Make it yours</p>
            <h3 className="mt-2 font-serif-title text-2xl font-bold leading-tight text-[#421e29] sm:text-3xl">
              {selectedRoute.name}, your way.
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{selectedRoute.description}</p>

            <div className="mt-5 border-t border-slate-100 pt-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-800">A few trip highlights</p>
              <ul className="mt-3 space-y-2.5">
                {selectedRoute.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2 text-sm leading-5 text-slate-600">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#967044]" aria-hidden="true" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto pt-6">
              <button
                type="button"
                onClick={handleEnquire}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#421e29] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#5b293a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#421e29]"
              >
                Get my honeymoon quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <p className="mt-2 text-center text-[11px] leading-5 text-slate-500">Opens a WhatsApp enquiry with your selected destination.</p>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-[#e6ddd3] pt-9">
          <div className="grid gap-3 md:grid-cols-[.75fr_1.25fr] md:gap-8">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#8a633d]">03 / Add a personal touch</p>
              <h3 className="mt-2 font-serif-title text-2xl font-bold text-[#421e29] sm:text-3xl">The little details matter.</h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600">
                Tell us what would make the trip special. We will check what can be arranged and confirm any extra cost in advance.
              </p>
            </div>
            <div className="grid gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
              {optionalTouches.map(({ icon: Icon, title, detail }) => (
                <div key={title} className="flex gap-3 border-b border-[#e6ddd3] py-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eee5da] text-[#80572c]">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{title}</h4>
                    <p className="mt-1 text-xs leading-5 text-slate-500">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-4 rounded-lg bg-[#eee8e1] px-4 py-3 text-[11px] leading-5 text-slate-600">
            Bonfire, candlelight dinner, room decoration, cake and photography are optional requests—not standard inclusions. Availability depends on the hotel, venue, season, local permissions and additional charges.
          </p>
        </div>

        <div className="mt-10 grid gap-5 rounded-2xl bg-[#421e29] p-5 text-white sm:grid-cols-[1fr_auto] sm:items-center sm:p-7">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-amber-300">Before you confirm</p>
            <h3 className="mt-2 font-serif-title text-2xl font-bold">Know exactly what your quote includes.</h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75">
              Ask us to confirm the hotel name and category, vehicle, meals, sightseeing, exclusions, cancellation terms and final amount in writing.
            </p>
          </div>
          <button
            type="button"
            onClick={handleEnquire}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-extrabold text-[#25171a] transition-colors hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Plan together <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-10 grid gap-5 border-t border-[#e6ddd3] pt-8 md:grid-cols-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Can we customise the destination and duration?</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">Yes. Share your dates, preferred destinations, number of nights and budget to request a tailored plan.</p>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Are romantic arrangements included?</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">They are optional. We confirm availability, venue rules and any additional charges before you decide.</p>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">When is my booking confirmed?</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">Your enquiry is not a booking. The team will confirm availability, final price and booking terms with you first.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
