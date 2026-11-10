import { useState } from 'react';
import { Calendar, Users, MapPin, Car, Compass, Building, Bus, ArrowRight } from 'lucide-react';

interface BookingBarProps {
  onQuickBook: (details: {
    type: 'package' | 'cab' | 'hotel' | 'volvo';
    destination?: string;
    pickup?: string;
    dates?: string;
    guests?: string;
    vehicle?: string;
  }) => void;
}

export const BookingBar: React.FC<BookingBarProps> = ({ onQuickBook }) => {
  const [activeTab, setActiveTab] = useState<'package' | 'cab' | 'hotel' | 'volvo'>('package');
  
  // Package state
  const [packageDest, setPackageDest] = useState('Shimla & Manali');
  const [packageMonth, setPackageMonth] = useState('Next 30 Days');
  const [packageGuests, setPackageGuests] = useState('2 Adults');

  // Cab state
  const [cabPickup, setCabPickup] = useState('Delhi');
  const [cabDrop, setCabDrop] = useState('Manali / Shimla (Complete Tour)');
  const [cabVehicle, setCabVehicle] = useState('Toyota Innova Crysta');

  // Hotel state
  const [hotelCity, setHotelCity] = useState('Shimla');
  const [hotelRooms, setHotelRooms] = useState('1 Room (2 Guests)');

  // Volvo state
  const [volvoRoute, setVolvoRoute] = useState('Delhi to Manali (Overnight AC)');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'package') {
      onQuickBook({
        type: 'package',
        destination: packageDest,
        dates: packageMonth,
        guests: packageGuests
      });
    } else if (activeTab === 'cab') {
      onQuickBook({
        type: 'cab',
        pickup: cabPickup,
        destination: cabDrop,
        vehicle: cabVehicle
      });
    } else if (activeTab === 'hotel') {
      onQuickBook({
        type: 'hotel',
        destination: hotelCity,
        guests: hotelRooms
      });
    } else {
      onQuickBook({
        type: 'volvo',
        destination: volvoRoute
      });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/60 p-3 sm:p-5 text-slate-800 -mt-16 sm:-mt-20 relative z-30">
      {/* Category Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto no-scrollbar gap-2 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('package')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'package'
              ? 'bg-brand-orange text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Tour Packages</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('cab')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'cab'
              ? 'bg-brand-orange text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Car className="w-4 h-4" />
          <span>Taxi & Cab Service</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('hotel')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'hotel'
              ? 'bg-brand-orange text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Hotels & Stays</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('volvo')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'volvo'
              ? 'bg-brand-orange text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Bus className="w-4 h-4" />
          <span>Volvo Bus</span>
        </button>
      </div>

      {/* Dynamic Tab Form */}
      <form onSubmit={handleSubmit} className="pt-4">
        {activeTab === 'package' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                Select Destination
              </label>
              <select
                value={packageDest}
                onChange={(e) => setPackageDest(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-orange"
              >
                <option value="Shimla & Manali">Shimla & Manali (5N/6D)</option>
                <option value="Spiti Valley Circuit">Spiti Valley Circuit (6N/7D)</option>
                <option value="Heavenly Kashmir">Kashmir Paradise (5N/6D)</option>
                <option value="Dharamshala & Dalhousie">Dharamshala & Dalhousie (4N/5D)</option>
                <option value="Amritsar & Himachal">Amritsar & Himachal Combo</option>
                <option value="Custom Himachal Tour">Custom Tour (Tailor-made)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-brand-orange" />
                Travel Month / Dates
              </label>
              <select
                value={packageMonth}
                onChange={(e) => setPackageMonth(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-orange"
              >
                <option value="This Month">This Month (Immediate)</option>
                <option value="Next 30 Days">Next 30 Days</option>
                <option value="Summer Holidays (April - June)">Summer Holidays (April - June)</option>
                <option value="Autumn / Dussehra / Diwali">Autumn / Festivals</option>
                <option value="Winter Snow Season (Dec - Feb)">Winter Snow Season (Dec - Feb)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-brand-orange" />
                Travelers / Group
              </label>
              <select
                value={packageGuests}
                onChange={(e) => setPackageGuests(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-orange"
              >
                <option value="Couple / 2 Adults">Couple / 2 Adults</option>
                <option value="Family with Kids (3-4)">Family (3-4 Persons)</option>
                <option value="Group of 5-8 Persons">Group of 5-8 Persons (Innova / Ertiga)</option>
                <option value="Large Group 9-17 Persons">Large Group (Tempo Traveller)</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-brand-orange hover:bg-brand-orange-dark text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                <span>Get Instant Quote</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'cab' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                Pickup Location
              </label>
              <select
                value={cabPickup}
                onChange={(e) => setCabPickup(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-orange"
              >
                <option value="Delhi Airport / Station">Delhi (Airport / Rly Station)</option>
                <option value="Chandigarh Airport / Station">Chandigarh (Airport / Station)</option>
                <option value="Shimla (ISBT / Mall Road)">Shimla (ISBT / Mall Road)</option>
                <option value="Kalka Railway Station">Kalka Railway Station</option>
                <option value="Manali">Manali Local</option>
                <option value="Amritsar">Amritsar</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                Drop / Destination
              </label>
              <input
                type="text"
                value={cabDrop}
                onChange={(e) => setCabDrop(e.target.value)}
                placeholder="e.g. Manali, Shimla, Spiti"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-orange"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                <Car className="w-3.5 h-3.5 text-brand-orange" />
                Select Vehicle
              </label>
              <select
                value={cabVehicle}
                onChange={(e) => setCabVehicle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-orange"
              >
                <option value="Toyota Innova Crysta">Toyota Innova Crysta (White SUV)</option>
                <option value="Maruti Ertiga">Maruti Ertiga (White 7-Seater)</option>
                <option value="Maruti Swift Dzire">Maruti Swift Dzire (White Sedan)</option>
                <option value="Toyota Etios">Toyota Etios (White Sedan)</option>
                <option value="Honda City">Honda City (White Luxury Sedan)</option>
                <option value="Toyota Glanza">Toyota Glanza (White Premium)</option>
                <option value="Force Tempo Traveller">Tempo Traveller (9-17 Seater White Coach)</option>
                <option value="Luxury Volvo Bus">Luxury Volvo AC Bus (Indian Coach)</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-brand-orange hover:bg-brand-orange-dark text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                <span>Check Cab Rates</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'hotel' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-brand-orange" />
                Destination City
              </label>
              <select
                value={hotelCity}
                onChange={(e) => setHotelCity(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-orange"
              >
                <option value="Shimla">Shimla (Pine Valley Views)</option>
                <option value="Manali">Manali (Riverside Cottages)</option>
                <option value="Kasol">Kasol (Parvati River Stays)</option>
                <option value="Amritsar">Amritsar (Near Golden Temple)</option>
                <option value="Srinagar">Srinagar (Dal Lake Houseboat)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-brand-orange" />
                Check-in Duration
              </label>
              <select
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-orange"
              >
                <option>2 Nights / 3 Days</option>
                <option>3 Nights / 4 Days</option>
                <option>4 Nights / 5 Days</option>
                <option>Weekly Stay / Workation</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-brand-orange" />
                Rooms & Occupancy
              </label>
              <select
                value={hotelRooms}
                onChange={(e) => setHotelRooms(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-orange"
              >
                <option value="1 Room (2 Guests)">1 Deluxe Room (2 Adults)</option>
                <option value="1 Family Suite (4 Guests)">1 Family Suite (4 Adults)</option>
                <option value="2 Rooms (4-5 Guests)">2 Rooms (4-5 Guests)</option>
                <option value="3+ Rooms (Group)">3+ Rooms (Group / Bulk)</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-brand-orange hover:bg-brand-orange-dark text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                <span>Check Availability</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'volvo' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                <Bus className="w-3.5 h-3.5 text-brand-orange" />
                Select Luxury Volvo Route
              </label>
              <select
                value={volvoRoute}
                onChange={(e) => setVolvoRoute(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-orange"
              >
                <option value="Delhi to Manali (Overnight AC Multi-Axle)">Delhi ⇄ Manali (Overnight Luxury AC Semi-Sleeper)</option>
                <option value="Delhi to Shimla (Overnight / Day Service)">Delhi ⇄ Shimla (Luxury Volvo AC)</option>
                <option value="Chandigarh to Manali">Chandigarh ⇄ Manali Daily</option>
                <option value="Delhi to Dharamshala / McLeodganj">Delhi ⇄ Dharamshala / McLeodganj</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-brand-orange hover:bg-brand-orange-dark text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                <span>Book Volvo Seats</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
