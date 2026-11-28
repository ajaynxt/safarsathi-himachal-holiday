import { useCallback, useEffect, useState } from 'react';
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
import { IntroLoader } from './components/IntroLoader';

const INTRO_SESSION_KEY = 'safar-sathi-intro-seen';

function shouldShowIntro() {
  if (typeof window === 'undefined') return false;

  try {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return !prefersReducedMotion && window.sessionStorage.getItem(INTRO_SESSION_KEY) !== '1';
  } catch {
    // If session persistence is unavailable, skip the intro rather than replay it on every visit.
    return false;
  }
}

export function App() {
  const [showIntro, setShowIntro] = useState(shouldShowIntro);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingType, setBookingType] = useState<'package' | 'cab' | 'hotel' | 'volvo' | 'ticket'>('package');
  const [selectedItemName, setSelectedItemName] = useState('');

  useEffect(() => {
    if (!showIntro) return;

    try {
      window.sessionStorage.setItem(INTRO_SESSION_KEY, '1');
    } catch {
      setShowIntro(false);
    }
  }, [showIntro]);

  const handleIntroComplete = useCallback(() => setShowIntro(false), []);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches || !('IntersectionObserver' in window)) return;
    const selector = 'main section[id] h2, #destinations .group, #packages article, #hotels .group';
    const targets = Array.from(document.querySelectorAll<HTMLElement>(selector));
    const observer = new IntersectionObserver(entries => {
      let stagger = 0;
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        observer.unobserve(element);
        if (preference.matches) return;
        element.style.setProperty('--safar-motion-delay', Math.min(stagger++ * 55, 165) + 'ms');
        element.classList.add('safar-editorial-enter');
      });
    }, { threshold: 0.12 });
    targets.forEach(element => {
      if (element.getBoundingClientRect().top > window.innerHeight * 0.9) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

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
      {showIntro && <IntroLoader onComplete={handleIntroComplete} />}
      <style>{"@keyframes safarEditorialEnter{from{translate:0 15px;opacity:.78}to{translate:0 0;opacity:1}}\n@keyframes safarMountainDrift{from{scale:1}to{scale:1.035}}\n@media(prefers-reduced-motion:no-preference){.safar-editorial-enter{animation:safarEditorialEnter .68s cubic-bezier(.2,.75,.2,1) var(--safar-motion-delay,0ms) both}main>section:first-child>div:first-child>img{animation:safarMountainDrift 7s ease-out both}}\n@media(prefers-reduced-motion:reduce){.safar-editorial-enter,main>section:first-child>div:first-child>img{animation:none!important}}\n"}</style>
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
