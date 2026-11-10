import { useCallback, useState } from 'react';
import { IntroLoader } from './components/IntroLoader';
import { TopBanner } from './components/TopBanner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { PopularDestinations } from './components/PopularDestinations';
import { VehicleFleet } from './components/VehicleFleet';
import { PopularRoutes } from './components/PopularRoutes';
import { BentoExperience } from './components/BentoExperience';
import { WhyChooseUs } from './components/WhyChooseUs';
import { FaqSection } from './components/FaqSection';
import { AdventureBanner } from './components/AdventureBanner';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { StickyMobileBar } from './components/StickyMobileBar';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AnimatedOfferPopup } from './components/AnimatedOfferPopup';
import { Sparkles, Plane } from 'lucide-react';

export function App() {
  const [showIntro, setShowIntro] = useState(true);
  const handleIntroComplete = useCallback(() => setShowIntro(false), []);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingType, setBookingType] = useState<'package' | 'cab' | 'hotel' | 'volvo'>('package');
  const [selectedItemName, setSelectedItemName] = useState('');
  const [isOfferPopupOpen, setIsOfferPopupOpen] = useState(false);

  const handleOpenBooking = (type: 'package' | 'cab' | 'hotel' | 'volvo' = 'package', itemName: string = '') => {
    setBookingType(type);
    setSelectedItemName(itemName);
    setIsBookingOpen(true);
  };

  const handleDestinationSelect = (destName: string) => {
    handleOpenBooking('package', `${destName} Tour Package`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {showIntro && <IntroLoader onComplete={handleIntroComplete} />}
      {/* Top Urgent Offer / Seasonal Banner */}
      <TopBanner />

      {/* Top Navbar matching Reference 1 */}
      <Navbar 
        onOpenBooking={(type, item) => handleOpenBooking(type || 'package', item || '')} 
        onOpenOfferPopup={() => setIsOfferPopupOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section with Search Pill matching Reference 1 */}
        <Hero 
          onOpenBooking={(type, item) => handleOpenBooking(type || 'package', item || '')}
          onSearchPackages={(dest) => handleOpenBooking('package', dest)}
        />

        {/* 4-Item Trust Bar directly below Hero matching Reference 1 */}
        <TrustBar />

        {/* Popular Destinations section with User-Uploaded Custom Posters (Shimla, Manali, Spiti, Ladakh) */}
        <PopularDestinations 
          onSelectDestination={handleDestinationSelect} 
        />

        {/* Taxi, Cab & Volvo Fleet (100% All-White Cars) */}
        <VehicleFleet onBookCab={(carName) => handleOpenBooking('cab', carName)} />

        {/* Popular Himalayan Taxi Routes & Doorstep Pickups */}
        <PopularRoutes onBookRoute={(routeName) => handleOpenBooking('cab', routeName)} />

        {/* Bento Experience Grid & Numbers matching Reference 3 */}
        <BentoExperience onOpenBooking={handleOpenBooking} />

        {/* Why Choose SafarSathi */}
        <WhyChooseUs />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Curved Organic Adventure Banner matching Reference 2 */}
        <AdventureBanner />

        {/* Contact Us & Shimla Office */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Offer Pill to Re-open the Animated Offer Popup anytime */}
      <button
        onClick={() => setIsOfferPopupOpen(true)}
        className="fixed bottom-24 left-4 z-40 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/90 hover:bg-slate-900 text-amber-400 border border-amber-400/40 shadow-xl backdrop-blur-md text-xs font-bold transition-all hover:scale-105 active:scale-95 group"
      >
        <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center">
          <Plane className="w-3 h-3 text-amber-400 transform rotate-45 group-hover:translate-x-0.5 transition-transform" />
        </div>
        <span>Special 20% Offer</span>
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '3s' }} />
      </button>

      {/* Persistent Floating WhatsApp Help Desk */}
      <FloatingWhatsApp />

      {/* Sticky Bottom Actions on Mobile Devices */}
      <StickyMobileBar onOpenBooking={() => handleOpenBooking('package', 'Custom Himachal Tour')} />

      {/* Interactive Booking & Quote Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialType={bookingType}
        itemName={selectedItemName}
      />

      {/* Animated Flight & Special Offer Popup Modal */}
      <AnimatedOfferPopup
        isOpen={isOfferPopupOpen}
        onClose={() => setIsOfferPopupOpen(false)}
        onSelectDestination={handleDestinationSelect}
      />
    </div>
  );
}

export default App;
