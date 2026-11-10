import React from 'react';
import { ArrowUpRight, Compass, ShieldCheck } from 'lucide-react';

interface PopularDestinationsProps {
  onSelectDestination: (destName: string) => void;
}

export const PopularDestinations: React.FC<PopularDestinationsProps> = ({ onSelectDestination }) => {
  const asset = (path: string) => `${import.meta.env.BASE_URL}${path.startsWith('/') ? path.slice(1) : path}`;

  const destinations = [
    { id: 'shimla', image: asset('images/destinations/shimla.jpg'), guide: 'shimla-manali', name: 'Shimla & Manali', state: 'Himachal Pradesh', highlight: 'Mall Road, mountain views and the Beas Valley.', credit: '', source: '' },
    { id: 'spiti', image: asset('images/destinations/spiti.jpg'), guide: 'spiti-valley', name: 'Spiti Valley', state: 'Himachal Pradesh', highlight: 'High-altitude villages, monasteries and dramatic mountain landscapes.', credit: '', source: '' },
    { id: 'ladakh', image: asset('images/destinations/ladakh.jpg'), guide: 'ladakh', name: 'Leh – Ladakh', state: 'Ladakh', highlight: 'High mountain passes, monasteries and Pangong Lake region.', credit: '', source: '' },
    { id: 'rajasthan', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Jaipur-Hawa-Mahal.jpg?width=960', guide: 'rajasthan', name: 'Rajasthan', state: 'Jaipur & Rajasthan', highlight: 'Hawa Mahal, Jaipur’s pink sandstone landmark.', credit: 'Photo: Brijesh Gosai / Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/File:Jaipur-Hawa-Mahal.jpg' },
    { id: 'kashmir', image: 'https://www.introtravelsindia.com/images/kashmir-dal-lake-tour-package.webp', guide: 'kashmir', name: 'Jammu & Kashmir', state: 'Srinagar & Kashmir Valley', highlight: 'Golden-hour shikara rides on Dal Lake, framed by the Himalayas.', credit: 'Photo: Intro Travels India', source: 'https://www.introtravelsindia.com/' },
    { id: 'kerala', image: 'https://www.diwas.in/wp-content/uploads/2017/11/houseboat_kerala.jpg', guide: 'kerala', name: 'Kerala', state: 'Alleppey & Munnar', highlight: 'Traditional houseboats drifting through palm-lined Alleppey backwaters.', credit: 'Photo: Diwas', source: 'https://www.diwas.in/wedding-in-kerala/' },
    { id: 'uttarakhand', image: 'https://images.unsplash.com/photo-1618661057370-7cf87dfad271?auto=format&fit=crop&fm=jpg&q=80&w=1200', guide: 'uttarakhand', name: 'Uttarakhand', state: 'Uttarakhand', highlight: 'Auli’s snow-covered slopes and Himalayan peaks in Uttarakhand.', credit: 'Photo: Unsplash', source: 'https://unsplash.com/photos/snow-covered-mountain-under-blue-sky-during-daytime-3cunzsPf3U4' },
    { id: 'goa', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Goa_beach_view.jpg?width=960', guide: 'goa', name: 'Goa', state: 'Goa', highlight: 'Coastal beaches and the Arabian Sea.', credit: 'Photo: Sajeev0101 / Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/File:Goa_beach_view.jpg' },
    { id: 'northeast', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kaziranga_National_Park.jpg?width=960', guide: 'north-east-india', name: 'North East India', state: 'Assam & North East', highlight: 'Kaziranga’s grasslands and rich wildlife landscape.', credit: 'Photo: Laavanya Sharma / Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/File:Kaziranga_National_Park.jpg' },
    { id: 'delhi', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Delhi_india_gate.jpg?width=960', guide: 'delhi-ncr', name: 'Delhi & NCR', state: 'Delhi', highlight: 'India Gate and the capital’s iconic city landmarks.', credit: 'Photo: Pavan2512 / Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/File:Delhi_india_gate.jpg' }
  ];

  return (
    <section id="destinations" className="py-14 sm:py-20 bg-stone-50 border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="w-8 sm:w-12 h-0.5 bg-gradient-to-r from-transparent to-amber-500" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif-title font-bold text-slate-900 tracking-tight">Explore Destinations</h2>
            <span className="w-8 sm:w-12 h-0.5 bg-gradient-to-l from-transparent to-amber-500" />
          </div>
          <p className="text-sm sm:text-base text-slate-600 font-medium">Explore real places across India. Share your dates and preferences to enquire about a customised trip.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {destinations.map((dest) => (
            <div key={dest.id} role="button" tabIndex={0} onClick={() => onSelectDestination(dest.name)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onSelectDestination(dest.name); } }} className="group text-left bg-white rounded-2xl border border-stone-200/90 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-amber-500">
              <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-200">
                <img src={dest.image} alt={`${dest.name} – ${dest.highlight}`} loading="lazy" decoding="async" referrerPolicy="no-referrer" className="h-full w-full object-cover saturate-110 contrast-105 transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-4 text-white text-lg font-bold drop-shadow-lg">{dest.name}</span>
              </div>
              <div className="p-4 sm:p-5">
                <span className="text-[11px] uppercase tracking-wide text-amber-700 font-bold">{dest.state}</span>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed min-h-9">{dest.highlight}</p>
                {dest.source && <a href={dest.source} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()} className="mt-2 inline-block text-[10px] text-slate-400 underline underline-offset-2"> {dest.credit} </a>}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-700"><span>Enquire for a trip</span><ArrowUpRight className="w-4 h-4" /></div>
                <a href={`/destinations/#${dest.guide}`} onClick={(event) => event.stopPropagation()} className="mt-2 inline-flex text-xs font-semibold text-slate-600 underline underline-offset-4 hover:text-amber-700">Explore destination guide</a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-stone-200/80 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1.5"><Compass className="w-4 h-4 text-amber-500" /> Tours across India</span>
          <span>•</span>
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-500" /> Enquire directly on WhatsApp</span>
          <span>•</span>
          <span>Custom itineraries discussed on request</span>
        </div>
      </div>
    </section>
  );
};
