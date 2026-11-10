import { useState } from 'react';
import { ArrowRight, CalendarDays, ChevronDown, MapPin } from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';

interface TripPlansProps {
  onBookTrip: (tripName: string) => void;
}

const plans = [
  {
    id: 'shimla-manali',
    name: 'Shimla & Manali Escape',
    region: 'Himachal Pradesh',
    duration: '6 days / 5 nights',
    route: 'Chandigarh · Shimla · Manali · Chandigarh',
    image: '/images/destinations/shimla.jpg',
    imageAlt: 'Shimla hill town in Himachal Pradesh',
    note: 'A relaxed first-time Himachal route with hill-town sightseeing and a day around Solang Valley.',
    days: [
      ['Day 1', 'Chandigarh to Shimla', 'Drive to Shimla, settle in and explore the Ridge and Mall Road if time permits.'],
      ['Day 2', 'Shimla and Kufri', 'Explore Kufri, viewpoints and central Shimla. Sightseeing depends on weather and local access.'],
      ['Day 3', 'Shimla to Manali', 'Travel through the Kullu valley with scenic stops along the way.'],
      ['Day 4', 'Solang Valley', 'Keep the day for Solang Valley; optional activities are chosen and paid for separately.'],
      ['Day 5', 'Manali local', 'Visit Hadimba Temple, Old Manali and Vashisht, subject to your interests.'],
      ['Day 6', 'Departure', 'Return transfer towards Chandigarh.']
    ]
  },
  {
    id: 'himachal-grand',
    name: 'Himachal Grand Circuit',
    region: 'Himachal Pradesh',
    duration: '9 days / 8 nights',
    route: 'Shimla · Manali · Dharamshala · Dalhousie',
    image: '/images/destinations/manali.jpg',
    imageAlt: 'Mountain scenery around Manali',
    note: 'A longer overland route linking four well-known Himachal destinations.',
    days: [
      ['Day 1', 'Arrive in Shimla', 'Transfer to Shimla and enjoy a relaxed evening.'],
      ['Day 2', 'Shimla and Kufri', 'Explore Shimla town, Kufri and nearby viewpoints.'],
      ['Day 3', 'Shimla to Manali', 'Drive via the Kullu valley; allow most of the day for the journey.'],
      ['Day 4', 'Manali and Solang', 'Explore the Manali area and visit Solang Valley when accessible.'],
      ['Day 5', 'Manali to Dharamshala', 'Travel to Dharamshala with suitable rest stops.'],
      ['Day 6', 'Dharamshala and McLeodganj', 'Explore the town, monastery area and Bhagsu surroundings.'],
      ['Day 7', 'Dharamshala to Dalhousie', 'Transfer to Dalhousie and enjoy the hill-station views.'],
      ['Day 8', 'Khajjiar excursion', 'Visit Khajjiar and nearby places depending on road and weather conditions.'],
      ['Day 9', 'Departure', 'Transfer to the agreed drop-off point.']
    ]
  },
  {
    id: 'spiti',
    name: 'Spiti Valley Road Journey',
    region: 'Himachal Pradesh',
    duration: '8 days / 7 nights',
    route: 'Shimla · Kalpa · Tabo · Kaza · Manali',
    image: '/images/destinations/spiti.jpg',
    imageAlt: 'Spiti Valley mountain landscape',
    note: 'A high-altitude journey. Route direction, road status and acclimatisation days must be confirmed before booking.',
    days: [
      ['Day 1', 'Shimla to Kalpa', 'Drive into Kinnaur and rest after the long mountain journey.'],
      ['Day 2', 'Kalpa to Tabo', 'Continue through Nako towards Tabo, with stops as road conditions allow.'],
      ['Day 3', 'Tabo to Kaza', 'Visit Tabo and Dhankar areas before reaching Kaza.'],
      ['Day 4', 'Kaza local', 'Explore Key Monastery and nearby villages at a comfortable pace.'],
      ['Day 5', 'Hikkim, Komic and Langza', 'Visit the high villages if weather, road and health conditions permit.'],
      ['Day 6', 'Kaza to Chandratal area', 'Travel towards the lake only when the seasonal road is officially open; otherwise use a safer alternate night stop.'],
      ['Day 7', 'Towards Manali', 'Cross the high mountain route only after current road-status confirmation.'],
      ['Day 8', 'Departure', 'Continue to the agreed drop-off point.']
    ]
  },
  {
    id: 'kashmir',
    name: 'Kashmir Valley Highlights',
    region: 'Jammu & Kashmir',
    duration: '7 days / 6 nights',
    route: 'Srinagar · Gulmarg · Pahalgam · Sonamarg',
    image: 'https://www.introtravelsindia.com/images/kashmir-dal-lake-tour-package.webp',
    imageAlt: 'Dal Lake in Srinagar, Kashmir',
    note: 'A flexible valley itinerary; local union-taxi rules, weather and access restrictions can affect excursions.',
    days: [
      ['Day 1', 'Arrive in Srinagar', 'Arrival transfer and time around Dal Lake.'],
      ['Day 2', 'Srinagar local', 'Explore the Mughal Gardens and nearby city sights.'],
      ['Day 3', 'Gulmarg excursion', 'Spend the day in Gulmarg; cable-car tickets and activities are subject to availability.'],
      ['Day 4', 'Srinagar to Pahalgam', 'Travel via the valley and check in around Pahalgam.'],
      ['Day 5', 'Pahalgam sightseeing', 'Explore local valleys with transport arranged as per local rules.'],
      ['Day 6', 'Return to Srinagar', 'Return to Srinagar with time for shopping or a lake visit.'],
      ['Day 7', 'Departure', 'Transfer to Srinagar Airport.']
    ]
  },
  {
    id: 'kerala',
    name: 'Kerala Hills & Backwaters',
    region: 'Kerala',
    duration: '6 days / 5 nights',
    route: 'Kochi · Munnar · Thekkady · Alleppey',
    image: 'https://www.diwas.in/wp-content/uploads/2017/11/houseboat_kerala.jpg',
    imageAlt: 'Kerala backwater houseboat',
    note: 'A sample route combining hill scenery, spice-country experiences and the backwaters.',
    days: [
      ['Day 1', 'Arrive in Kochi', 'Arrival and transfer towards Munnar, with waterfall stops if time allows.'],
      ['Day 2', 'Munnar', 'Explore tea-country viewpoints and selected local attractions.'],
      ['Day 3', 'Munnar to Thekkady', 'Drive to Thekkady and explore the spice-growing region.'],
      ['Day 4', 'Thekkady to Alleppey', 'Travel to Alleppey and board a houseboat only if separately confirmed.'],
      ['Day 5', 'Alleppey to Kochi', 'Enjoy the backwater area before returning towards Kochi.'],
      ['Day 6', 'Departure', 'Transfer to the airport or railway station.']
    ]
  },
  {
    id: 'uttarakhand',
    name: 'Uttarakhand Mountain Break',
    region: 'Uttarakhand',
    duration: '6 days / 5 nights',
    route: 'Dehradun · Mussoorie · Rishikesh · Haridwar',
    image: 'https://images.unsplash.com/photo-1618661057370-7cf87dfad271?auto=format&fit=crop&fm=jpg&q=80&w=1200',
    imageAlt: 'Snow covered Himalayan mountains in Uttarakhand',
    note: 'A mix of hill views and riverside towns; can be adjusted for a quieter or more activity-focused holiday.',
    days: [
      ['Day 1', 'Arrive in Dehradun', 'Meet and transfer to Mussoorie.'],
      ['Day 2', 'Mussoorie', 'Explore the town, viewpoints and nearby waterfalls where accessible.'],
      ['Day 3', 'Mussoorie to Rishikesh', 'Drive to Rishikesh and explore the riverside area.'],
      ['Day 4', 'Rishikesh', 'Choose local sightseeing or pre-booked activities with licensed operators.'],
      ['Day 5', 'Haridwar', 'Visit Haridwar and attend the Ganga Aarti if timings permit.'],
      ['Day 6', 'Departure', 'Transfer to Dehradun or the agreed drop-off point.']
    ]
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan Heritage Trail',
    region: 'Rajasthan',
    duration: '5 days / 4 nights',
    route: 'Jaipur · Ajmer · Pushkar',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Jaipur-Hawa-Mahal.jpg?width=960',
    imageAlt: 'Hawa Mahal in Jaipur, Rajasthan',
    note: 'A short heritage-focused trip with forts, old-city landmarks and the Pushkar area.',
    days: [
      ['Day 1', 'Jaipur arrival', 'Explore the old city and Hawa Mahal area.'],
      ['Day 2', 'Jaipur heritage', 'Visit Amber Fort, City Palace and Jantar Mantar, subject to opening hours.'],
      ['Day 3', 'Jaipur to Ajmer and Pushkar', 'Travel to Ajmer and continue to Pushkar.'],
      ['Day 4', 'Pushkar', 'Explore Pushkar Lake, the market and nearby sights.'],
      ['Day 5', 'Departure', 'Return to Jaipur for onward travel.']
    ]
  },
  {
    id: 'goa',
    name: 'Goa Coastal Getaway',
    region: 'Goa',
    duration: '4 days / 3 nights',
    route: 'North Goa · Panaji · South Goa',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Goa_beach_view.jpg?width=960',
    imageAlt: 'Goa beach and Arabian Sea coastline',
    note: 'A relaxed coastal outline that can be tailored around beaches, heritage or family time.',
    days: [
      ['Day 1', 'Arrive in Goa', 'Transfer to your selected stay area and enjoy the nearby beach.'],
      ['Day 2', 'North Goa', 'Explore selected beaches, Fort Aguada area and local markets.'],
      ['Day 3', 'Panaji and South Goa', 'Explore Panaji and choose a South Goa beach or heritage stop.'],
      ['Day 4', 'Departure', 'Transfer to the airport or railway station.']
    ]
  }
];

export function TripPlans({ onBookTrip }: TripPlansProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="packages" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[.16em] text-amber-800">Plan your journey</span>
          <h2 className="mt-4 font-serif-title text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Trip Plans Across India</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">Explore sample day-wise routes. Tell us your travel dates and group size to customise the plan and confirm current availability.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {plans.map((plan) => {
            const isExpanded = expanded === plan.id;
            return (
              <article key={plan.id} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl">
                <div className="relative h-52 overflow-hidden bg-slate-200 sm:h-56">
                  <img src={plan.image} alt={plan.imageAlt} loading="lazy" decoding="async" referrerPolicy="no-referrer" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/5 to-transparent" />
                  <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-slate-800">{plan.region}</span>
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-800"><CalendarDays className="h-4 w-4" />{plan.duration}</div>
                  <h3 className="mt-2 text-xl font-bold leading-snug text-slate-900">{plan.name}</h3>
                  <p className="mt-2 flex items-start gap-2 text-xs leading-5 text-slate-500"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />{plan.route}</p>
                  <p className="mt-3 min-h-10 text-sm leading-6 text-slate-600">{plan.note}</p>
                  <button type="button" onClick={() => setExpanded(isExpanded ? null : plan.id)} aria-expanded={isExpanded} className="mt-5 flex w-full items-center justify-between border-t border-slate-100 pt-4 text-sm font-bold text-slate-900 hover:text-amber-800">
                    <span>{isExpanded ? 'Hide day-wise plan' : 'View day-wise plan'}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                  {isExpanded && (
                    <div className="mt-3 space-y-3 border-t border-slate-100 pt-4">
                      {plan.days.map(([day, title, detail]) => (
                        <div key={day} className="flex gap-3">
                          <span className="mt-0.5 shrink-0 rounded-md bg-slate-900 px-2 py-1 text-[10px] font-bold text-white">{day}</span>
                          <div><h4 className="text-sm font-semibold text-slate-900">{title}</h4><p className="mt-1 text-xs leading-5 text-slate-600">{detail}</p></div>
                        </div>
                      ))}
                    </div>
                  )}
                  <button type="button" onClick={() => onBookTrip(plan.name)} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#421e29] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#5b293a]">
                    Customise this trip <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 rounded-2xl bg-[#421e29] px-6 py-8 text-center text-white sm:px-10">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-amber-300">Your dates. Your pace.</p>
          <h3 className="mt-2 text-2xl font-bold">Need a different route?</h3>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-white/75">Share your destination, dates and number of travellers. We’ll help shape a practical itinerary and send a quote after checking availability.</p>
          <a href={COMPANY_INFO.whatsappUrl('Hello Safar Sathi, please help me plan a customised trip. I will share my destination, dates and group size.')} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center justify-center rounded-xl bg-amber-400 px-5 py-3 text-sm font-extrabold text-slate-950 transition-colors hover:bg-amber-300">Plan on WhatsApp</a>
        </div>
      </div>
    </section>
  );
}
