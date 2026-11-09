import { useState } from 'react';
import { IntroFlightAnimation } from './components/IntroFlightAnimation';
import { TopBanner } from './components/TopBanner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedPackages } from './components/FeaturedPackages';
import { VehicleFleet } from './components/VehicleFleet';
import { PopularRoutes } from './components/PopularRoutes';
import { HotelShowcase } from './components/HotelShowcase';
import { WhyChooseUs } from './components/WhyChooseUs';
import { FaqSection } from './components/FaqSection';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { StickyMobileBar } from './components/StickyMobileBar';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingType, setBookingType] = useState<'package' | 'cab' | 'hotel' | 'volvo'>('package');
  const [selectedItemName, setSelectedItemName] = useState('');

  const handleOpenBooking = (type: 'package' | 'cab' | 'hotel' | 'volvo' = 'package', itemName: string = '') => {
    setBookingType(type);
    setSelectedItemName(itemName);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Intro Animated Flight with Logo on Page Load */}
      <IntroFlightAnimation />

      {/* Top Urgent Offer / Seasonal Banner */}
      <TopBanner />

      {/* Top Navbar */}
      <Navbar onOpenBooking={(type, item) => handleOpenBooking(type || 'package', item || '')} />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section with Search Engine */}
        <Hero onOpenBooking={(type, item) => handleOpenBooking(type || 'package', item || '')} />

        {/* Handpicked Tour Packages */}
        <FeaturedPackages onBookPackage={(title) => handleOpenBooking('package', title)} />

        {/* Taxi, Cab & Volvo Fleet */}
        <VehicleFleet onBookCab={(carName) => handleOpenBooking('cab', carName)} />

        {/* Popular Himalayan Taxi Routes & Doorstep Pickups */}
        <PopularRoutes onBookRoute={(routeName) => handleOpenBooking('cab', routeName)} />

        {/* Verified Hotels in Shimla, Manali, Kasol, Amritsar, Srinagar */}
        <HotelShowcase onBookHotel={(hotelName) => handleOpenBooking('hotel', hotelName)} />

        {/* Why Choose SafarSathi / Himachal Holiday */}
        <WhyChooseUs />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Google & Traveler Reviews */}
        <ReviewsSection />

        {/* Contact Us & Shimla Office */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

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
    </div>
  );
}

export default App;
