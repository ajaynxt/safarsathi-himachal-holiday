import React from 'react';

const assetBase = import.meta.env.BASE_URL;
const asset = (path: string) => `${assetBase}${path.replace(/^\\/+/, '')}`;

const destinations = [
  { name: 'India Tour Packages', detail: 'Custom holidays across destinations in India', href: '/india-tour-packages/', image: asset('/images/packages/full_himachal_tour_package.png'), tag: 'EXPLORE INDIA' },
  { name: 'Himachal Pradesh', detail: 'Shimla, Manali, Dharamshala & Dalhousie', href: '/himachal-tour-packages/', image: asset('/images/packages/himachal_shimla_manali_dharmshala_dalhousie_8_nights_9_days.png'), tag: 'HIMALAYAN CLASSICS' },
  { name: 'Shimla & Manali', detail: 'A 5-night mountain road trip idea', href: '/shimla-manali-tour/', image: asset('/images/packages/shimla_manali_5_nights_6_days.png'), tag: 'POPULAR ROUTE' },
  { name: 'Spiti Valley', detail: 'Kinnaur, Kaza and high-village circuit', href: '/spiti-valley-tour/', image: asset('/images/packages/shimla_manali_spti_tour_package_7_night_8_days.png'), tag: 'ADVENTURE ROUTE' },
  { name: 'Kashmir', detail: 'Srinagar, Gulmarg and Pahalgam', href: '/kashmir-tour-packages/', image: asset('/images/packages/jammu_and_kashmir_6_nights_7_days.png'), tag: 'VALLEY ESCAPE' },
  { name: 'Kerala', detail: 'Munnar, Thekkady and Alleppey', href: '/kerala-tour-packages/', image: asset('/images/packages/kerala_5_nights_6_days_package.png'), tag: 'SOUTH INDIA' },
];

export const DestinationGuides: React.FC = () => (
  <section className="py-16 sm:py-24 bg-white border-y border-slate-100" aria-labelledby="destination-guides-title">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mb-10 sm:mb-12">
        <p className="text-xs font-extrabold tracking-[.18em] text-brand-orange uppercase">Find your next route</p>
        <h2 id="destination-guides-title" className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-navy">Explore holidays by destination</h2>
        <p className="mt-3 text-sm sm:text-base text-slate-600">Browse dedicated trip guides, suggested routes and planning answers before you request a customised quote.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {destinations.map((destination) => (
          <a key={destination.href} href={destination.href} className="group block bg-white border border-slate-200 hover:border-brand-orange/50 transition-all duration-200">
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
              <img src={destination.image} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              <span className="absolute left-4 top-4 px-3 py-1 bg-white/95 text-brand-navy text-[10px] font-extrabold tracking-wider">{destination.tag}</span>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-extrabold text-brand-navy">{destination.name}</h3>
              <p className="mt-1.5 text-sm text-slate-600">{destination.detail}</p>
              <span className="inline-block mt-4 text-xs font-extrabold text-brand-orange">Explore destination guide ↗</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);
