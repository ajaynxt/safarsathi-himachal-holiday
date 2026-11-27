import { useState } from 'react';
import { TopBanner } from './components/TopBanner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { PopularDestinations } from './components/PopularDestinations';
import { TripPlans } from './components/TripPlans';
import { HoneymoonPackages } from './components/HoneymoonPackages';
import { VehicleFleet } from './components/VehicleFleet';
import { PopularRoutes } from './components/PopularRoutes';
import { HotelShowcase } from './components/HotelShowcase';
import { BentoExperience } from './components/BentoExperience';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { AdventureBanner } from './components/AdventureBanner';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { StickyMobileBar } from './components/StickyMobileBar';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingType, setBookingType] = useState<'package' | 'cab' | 'hotel' | 'volvo' | 'ticket'>('package');
  const [selectedItemName, setSelectedItemName] = useState('');

  const handleOpenBooking = (type: 'package' | 'cab' | 'hotel' | 'volvo' | 'ticket' = 'package', itemName = '') => {
    setBookingType(type);
    setSelectedItemName(itemName);
    setIsBookingOpen(true);
  };

  const handleDestinationSelect = (destName: string) => {
    handleOpenBooking('package', `${destName} Tour Enquiry`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <TopBanner />
      <Navbar onOpenBooking={(type, item) => handleOpenBooking(type || 'package', item || '')} />
      <main className="flex-1">
        <Hero
          onOpenBooking={(type, item) => handleOpenBooking(type || 'package', item || '')}
          onSearchPackages={(dest) => handleOpenBooking('package', dest)}
        />
        <TrustBar />
        <PopularDestinations onSelectDestination={handleDestinationSelect} />
        <HoneymoonPackages onEnquire={(itemName) => handleOpenBooking('package', itemName)} />
        <TripPlans onBookTrip={(tripName) => handleOpenBooking('package', tripName)} />
        <VehicleFleet onBookCab={(carName) => handleOpenBooking('cab', carName)} />
        <PopularRoutes onBookRoute={(routeName) => handleOpenBooking('cab', routeName)} />
        <HotelShowcase onBookHotel={(hotelName) => handleOpenBooking('hotel', hotelName)} />
        <BentoExperience onOpenBooking={handleOpenBooking} />
        <WhyChooseUs />
        <ReviewsSection />
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
