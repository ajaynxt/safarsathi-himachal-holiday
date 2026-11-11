import { useCallback, useState } from 'react';
import { IntroLoader } from './components/IntroLoader';
import { TopBanner } from './components/TopBanner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { PopularDestinations } from './components/PopularDestinations';
import { TripPlans } from './components/TripPlans';
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

const INTRO_SESSION_KEY = 'safar-sathi-intro-seen';

export function App() {
  const [showIntro, setShowIntro] = useState(() => {
    try {
      if (window.sessionStorage.getItem(INTRO_SESSION_KEY) === '1') return false;
      window.sessionStorage.setItem(INTRO_SESSION_KEY, '1');
      return true;
    } catch {
      // Skip the intro when session storage is unavailable so it cannot repeat on reload.
      return false;
    }
  });
  const handleIntroComplete = useCallback(() => setShowIntro(false), []);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingType, setBookingType] = useState<'package' | 'cab' | 'hotel' | 'volvo'>('package');
  const [selectedItemName, setSelectedItemName] = useState('');

  const handleOpenBooking = (type: 'package' | 'cab' | 'hotel' | 'volvo' = 'package', itemName = '') => {
    setBookingType(type);
    setSelectedItemName(itemName);
    setIsBookingOpen(true);
  };

  const handleDestinationSelect = (destName: string) => {
    handleOpenBooking('package', `${destName} Tour Enquiry`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {showIntro && <IntroLoader onComplete={handleIntroComplete} />}
      <TopBanner />
      <Navbar onOpenBooking={(type, item) => handleOpenBooking(type || 'package', item || '')} />
      <main className="flex-1">
        <Hero
          onOpenBooking={(type, item) => handleOpenBooking(type || 'package', item || '')}
          onSearchPackages={(dest) => handleOpenBooking('package', dest)}
        />
        <TrustBar />
        <PopularDestinations onSelectDestination={handleDestinationSelect} />
        <TripPlans onBookTrip={(tripName) => handleOpenBooking('package', tripName)} />
        <VehicleFleet onBookCab={(carName) => handleOpenBooking('cab', carName)} />
        <PopularRoutes onBookRoute={(routeName) => handleOpenBooking('cab', routeName)} />
        <BentoExperience onOpenBooking={handleOpenBooking} />
        <WhyChooseUs />
        <FaqSection />
        <AdventureBanner />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <StickyMobileBar onOpenBooking={() => handleOpenBooking('package', 'Custom India Tour Enquiry')} />
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialType={bookingType}
        itemName={selectedItemName}
      />
    </div>
  );
}

export default App;
