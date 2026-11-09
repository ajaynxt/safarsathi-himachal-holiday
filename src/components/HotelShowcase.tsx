import { useState } from 'react';
import { Star, MapPin, Check, MessageCircle, Building2, Sparkles, Images, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { HOTEL_STAYS, Hotel, COMPANY_INFO } from '../data/travelData';

interface HotelShowcaseProps {
  onBookHotel: (hotelName: string) => void;
}

export const HotelShowcase: React.FC<HotelShowcaseProps> = ({ onBookHotel }) => {
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [activeGalleryHotel, setActiveGalleryHotel] = useState<Hotel | null>(null);
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState<number>(0);

  const cities = ['All', 'Shimla', 'Manali', 'Kasol', 'Amritsar', 'Srinagar'];

  const filteredHotels = HOTEL_STAYS.filter((h) => {
    if (selectedCity === 'All') return true;
    return h.city === selectedCity;
  });

  const openGallery = (hotel: Hotel, idx: number = 0) => {
    setActiveGalleryHotel(hotel);
    setCurrentPhotoIdx(idx);
  };

  const nextPhoto = () => {
    if (!activeGalleryHotel) return;
    setCurrentPhotoIdx((prev) => (prev + 1) % activeGalleryHotel.gallery.length);
  };

  const prevPhoto = () => {
    if (!activeGalleryHotel) return;
    setCurrentPhotoIdx((prev) => (prev - 1 + activeGalleryHotel.gallery.length) % activeGalleryHotel.gallery.length);
  };

  return (
    <section id="hotels" className="py-16 sm:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Actual Real Hotel Photos</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Verified Partner Hotels Across 5 Destinations
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Browse authentic room, view, and bathroom photos from our actual partner properties in <strong className="text-slate-800">Shimla (39 photos), Manali (22 photos), Amritsar (14 photos) & Srinagar (16 photos)</strong>.
          </p>

          {/* City Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCity === city
                    ? 'bg-brand-navy text-white shadow-md'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {city === 'All' ? 'All Destinations (5)' : city}
              </button>
            ))}
          </div>
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 flex flex-col justify-between group transform hover:-translate-y-1"
            >
              <div>
                {/* Hotel Image with Badges */}
                <div className="relative h-56 overflow-hidden bg-slate-900">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className="bg-brand-orange text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow uppercase tracking-wider">
                      {hotel.city}
                    </span>
                    <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-2 py-1 rounded-md">
                      {hotel.category}
                    </span>
                  </div>

                  {/* View Gallery Badge button */}
                  <button
                    onClick={() => openGallery(hotel, 0)}
                    className="absolute top-3 right-3 bg-black/60 hover:bg-brand-orange backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1.5 transition-colors shadow"
                  >
                    <Images className="w-3.5 h-3.5" />
                    <span>{hotel.totalPhotosCount} Real Photos</span>
                  </button>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <span className="flex items-center gap-1 text-amber-300 text-xs font-bold bg-black/50 backdrop-blur-md px-2 py-1 rounded-md">
                      <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                      {hotel.rating} / 5.0 (Verified)
                    </span>
                    <span className="text-xs bg-emerald-700/80 backdrop-blur-md px-2 py-1 rounded-md font-semibold">
                      Mountain / River View
                    </span>
                  </div>
                </div>

                {/* Thumbnail Strip preview */}
                <div className="grid grid-cols-4 gap-1 p-2 bg-slate-100 border-b border-slate-200">
                  {hotel.gallery.slice(0, 4).map((thumb, tIdx) => (
                    <button
                      key={tIdx}
                      onClick={() => openGallery(hotel, tIdx)}
                      className="h-14 overflow-hidden rounded-md relative group/thumb border border-slate-300 hover:border-brand-orange"
                    >
                      <img src={thumb} alt="" className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform" />
                      {tIdx === 3 && hotel.gallery.length > 4 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-[11px] font-bold">
                          +{hotel.gallery.length - 3}
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Hotel Content */}
                <div className="p-5">
                  <div className="flex items-center gap-1 text-xs text-slate-500 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-orange flex-shrink-0" />
                    <span className="line-clamp-1">{hotel.location}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-orange transition-colors">
                    <span className="text-brand-orange font-extrabold">SafarSathi.in</span> {hotel.name.replace(/^SafarSathi\.in\s*/, '')}
                  </h3>

                  {/* Amenities */}
                  <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-600">
                    {hotel.amenities.slice(0, 4).map((am, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span className="line-clamp-1">{am}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Package Inclusion & Booking Footer (No standalone price) */}
              <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider block flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Tour Package Stay
                  </span>
                  <span className="text-xs font-bold text-slate-800">Included in Tour Packages</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <a
                    href={COMPANY_INFO.whatsappUrl(`Hello SafarSathi, I want to include ${hotel.name} in my tour package.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl border border-green-600/30 text-green-700 bg-green-50 hover:bg-green-600 hover:text-white transition-colors"
                    title="Enquire on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => onBookHotel(`${hotel.name} - Package Stay`)}
                    className="px-3.5 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-dark text-white text-xs font-bold transition-all shadow-sm whitespace-nowrap"
                  >
                    Enquire Package
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Stay Consultation Banner */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-brand-orange-light text-brand-orange rounded-xl">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-base">Want Riverside Cottages, Luxury Swiss Tents, or Heritage Stays?</h4>
              <p className="text-xs sm:text-sm text-slate-500">We have direct tie-ups with 80+ hill properties with pre-negotiated discount rates.</p>
            </div>
          </div>
          <button
            onClick={() => onBookHotel('Custom Hotel / Camp Booking')}
            className="px-5 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-navy-dark text-white text-xs sm:text-sm font-bold whitespace-nowrap"
          >
            Request Hotel Options
          </button>
        </div>
      </div>

      {/* Full Photo Lightbox Gallery Modal */}
      {activeGalleryHotel && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-5xl h-full max-h-[90vh] flex flex-col justify-between">
            {/* Top Bar */}
            <div className="flex items-center justify-between text-white pb-3 border-b border-white/20">
              <div>
                <h3 className="font-bold text-base sm:text-lg">{activeGalleryHotel.name}</h3>
                <span className="text-xs text-brand-orange font-semibold">
                  {activeGalleryHotel.city} • Photo {currentPhotoIdx + 1} of {activeGalleryHotel.gallery.length}
                </span>
              </div>
              <button
                onClick={() => setActiveGalleryHotel(null)}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Active Photo */}
            <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
              <img
                src={activeGalleryHotel.gallery[currentPhotoIdx]}
                alt="Hotel Photo"
                className="max-w-full max-h-[65vh] object-contain rounded-xl shadow-2xl"
              />

              {/* Prev / Next Arrows */}
              <button
                onClick={prevPhoto}
                className="absolute left-2 bg-black/60 hover:bg-brand-orange p-3 rounded-full text-white transition-all transform hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextPhoto}
                className="absolute right-2 bg-black/60 hover:bg-brand-orange p-3 rounded-full text-white transition-all transform hover:scale-110"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Thumbnail Strip */}
            <div className="flex gap-2 overflow-x-auto pb-2 border-t border-white/10 pt-3">
              {activeGalleryHotel.gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPhotoIdx(idx)}
                  className={`h-16 w-24 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                    currentPhotoIdx === idx ? 'border-brand-orange scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
