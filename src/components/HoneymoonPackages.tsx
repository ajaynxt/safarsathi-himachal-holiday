import { ArrowRight, BedDouble, CakeSlice, Camera, CarFront, Flame, Flower2, Heart, Sparkles, Utensils } from 'lucide-react';

interface HoneymoonPackagesProps {
  onEnquire: (itemName: string) => void;
}

const experiences = [
  { icon: BedDouble, title: 'Private couple room', detail: 'A room reserved for the couple, with a mountain-view stay where available.' },
  { icon: CarFront, title: 'Private taxi', detail: 'A dedicated cab for your agreed route and sightseeing plan.' },
  { icon: Flame, title: 'Wood-fire bonfire', detail: 'A cosy outdoor bonfire evening, subject to hotel and local fire permissions.' },
  { icon: Utensils, title: 'Candlelight dinner', detail: 'A specially arranged dinner for two at the stay or a suitable venue.' },
  { icon: Flower2, title: 'Room decoration', detail: 'Romantic flower or room décor, planned with the property.' },
  { icon: CakeSlice, title: 'Cake & celebrations', detail: 'Add a cake or a small birthday / anniversary surprise.' },
  { icon: Camera, title: 'Couple photography', detail: 'A scenic couple photo session can be arranged on request.' },
  { icon: Sparkles, title: 'Personal surprises', detail: 'Tell us your idea and we’ll check what can be arranged.' },
];

export function HoneymoonPackages({ onEnquire }: HoneymoonPackagesProps) {
  return (
    <section id="honeymoon" className="overflow-hidden bg-[#fbf8f4] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-5 md:grid-cols-[1fr_auto] md:gap-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[.2em] text-[#9a713c]">
              <Heart className="h-3.5 w-3.5" /> Made for two
            </span>
            <h2 className="mt-3 font-serif-title text-3xl font-bold leading-tight text-[#421e29] sm:text-5xl">
              A little more romance in the mountains.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Plan a private Himachal honeymoon with a room, dedicated taxi and thoughtful experiences tailored to your dates, destination and budget.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onEnquire('Custom Himachal Honeymoon Package — private room, private taxi and romantic experiences')}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#421e29] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#5b293a] md:w-auto"
          >
            Plan our honeymoon <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-9 grid gap-4 lg:grid-cols-[1.05fr_.95fr]">
          <div className="relative min-h-[390px] overflow-hidden rounded-[1.6rem] bg-[#421e29] sm:min-h-[470px]">
            <img
              src="/images/hotels/manali/manali_resort_01.jpeg"
              alt="A cosy mountain resort stay in Manali"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#211219]/90 via-[#211219]/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-9">
              <span className="text-[10px] font-bold uppercase tracking-[.2em] text-amber-300">Your trip, your moments</span>
              <h3 className="mt-2 max-w-md font-serif-title text-3xl font-bold leading-tight sm:text-4xl">Private stays. Scenic drives. Special evenings.</h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-white/80">Choose the experiences you want. We’ll build a custom itinerary and share a quote after checking availability.</p>
            </div>
          </div>

          <div className="rounded-[1.6rem] border border-[#e9dfd5] bg-white p-5 sm:p-7">
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#9a713c]">Thoughtful details</p>
                <h3 className="mt-1 text-xl font-bold text-[#421e29]">Make it yours</h3>
              </div>
              <Heart className="h-6 w-6 text-[#9a713c]" />
            </div>
            <div className="mt-2 grid gap-x-5 sm:grid-cols-2">
              {experiences.map(({ icon: Icon, title, detail }) => (
                <div key={title} className="flex gap-3 border-b border-slate-100 py-3.5 last:border-0">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f7f0e8] text-[#80572c]">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{title}</h4>
                    <p className="mt-1 text-xs leading-5 text-slate-500">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 rounded-xl bg-[#fbf8f4] px-3.5 py-3 text-[11px] leading-5 text-slate-500">
              Experiences are optional add-ons, not automatic inclusions. Final arrangements and charges depend on the hotel, destination, season and availability.
            </p>
            <button
              type="button"
              onClick={() => onEnquire('Honeymoon enquiry — please share options for private room, private taxi, bonfire, candlelight dinner and add-ons')}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#421e29] px-4 py-3 text-sm font-bold text-[#421e29] transition hover:bg-[#421e29] hover:text-white"
            >
              Ask for a custom quote <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-14 grid gap-8 border-t border-[#e9dfd5] pt-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#9a713c]">Himachal honeymoon travel guide</p>
            <h3 className="mt-3 font-serif-title text-2xl font-bold leading-tight text-[#421e29] sm:text-3xl">
              Plan a Shimla or Manali honeymoon with Safar Sathi
            </h3>
          </div>
          <div className="space-y-4 text-sm leading-7 text-slate-600">
            <p>
              Looking for Himachal honeymoon packages for your first trip together? Safar Sathi helps couples plan a customised Shimla honeymoon package, Manali honeymoon package or a combined Shimla–Manali holiday. Share your travel dates, trip duration and budget to receive a personalised itinerary and quotation.
            </p>
            <p>
              Your Himachal honeymoon itinerary can include a private couple room, private taxi for the agreed route, scenic sightseeing, a wood-fire bonfire and a candlelight dinner. Room decoration, cake, couple photography and other special surprises can also be requested while planning. These experiences are optional and depend on property permissions, local conditions, availability and additional charges.
            </p>
            <p>
              Whether you want a quiet mountain stay in Shimla, snow-season moments around Manali or a longer Himachal trip, the route and stay can be planned around your dates. Ask us to confirm road conditions, hotel availability, inclusions and the final price before booking.
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-[#e9dfd5] bg-white p-5 sm:p-7">
          <h3 className="font-serif-title text-2xl font-bold text-[#421e29]">Himachal honeymoon package FAQs</h3>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div>
              <h4 className="text-sm font-bold text-slate-900">Can we customise a Shimla and Manali honeymoon package?</h4>
              <p className="mt-2 text-sm leading-6 text-slate-600">Yes. Share your dates, number of nights and budget so the route, stays and sightseeing can be planned around your preferences.</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Can a private taxi be arranged for the trip?</h4>
              <p className="mt-2 text-sm leading-6 text-slate-600">A private taxi can be quoted for the agreed itinerary, subject to vehicle and route availability.</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Are bonfire and candlelight dinner included?</h4>
              <p className="mt-2 text-sm leading-6 text-slate-600">They are optional arrangements, not standard inclusions. Availability, venue rules and extra charges are confirmed before booking.</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">How do we get a honeymoon package price?</h4>
              <p className="mt-2 text-sm leading-6 text-slate-600">Send your travel dates, trip duration, number of travellers and preferred experiences to request a customised quotation.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
