import { useState } from 'react';
import { ScreenId, ProductItem, CartItem } from './types';
import { NavigationSidebar } from './components/NavigationSidebar';
import { TopHeader } from './components/TopHeader';
import { FooterBanner } from './components/FooterBanner';
import { CartDrawer } from './components/CartDrawer';
import { AudioTranscriberModal } from './components/AudioTranscriberModal';

// Screens
import { HomeScreen } from './views/HomeScreen';
import { GatewayScreen } from './views/GatewayScreen';
import { DoctorsScreen } from './views/DoctorsScreen';
import { GoodVibesScreen } from './views/GoodVibesScreen';
import { PeriodProductsScreen } from './views/PeriodProductsScreen';
import { CommunityScreen } from './views/CommunityScreen';
import { CycleTrackerScreen } from './views/CycleTrackerScreen';
import { NutritionScreen } from './views/NutritionScreen';
import { AiCompanionScreen } from './views/AiCompanionScreen';
import { SettingsScreen } from './views/SettingsScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Audio Transcriber Modal State (gemini-3.5-transcribe)
  const [isTranscriberOpen, setIsTranscriberOpen] = useState(false);
  const [transcriberCategory, setTranscriberCategory] = useState('Cycle Health');
  const [transcriberTitle, setTranscriberTitle] = useState('Infradian Voice Check-in');
  const [transcriberCallback, setTranscriberCallback] = useState<((text: string) => void) | undefined>(undefined);

  const handleOpenTranscriber = (
    contextCategory = 'Cycle Health',
    defaultTitle = 'Infradian Voice Check-in',
    onApply?: (text: string) => void
  ) => {
    setTranscriberCategory(contextCategory);
    setTranscriberTitle(defaultTitle);
    setTranscriberCallback(() => onApply);
    setIsTranscriberOpen(true);
  };

  const handleAddToCart = (product: ProductItem) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQty = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleCheckout = () => {
    alert('Sanctuary Kit order confirmed! First parcel dispatched with phase-matched delivery cadence.');
    setCartItems([]);
    setIsCartOpen(false);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // If Gateway screen is active, render full-screen gateway layout
  if (currentScreen === 'gateway') {
    return (
      <GatewayScreen
        onEnterSanctuary={() => setCurrentScreen('home')}
        onNavigateDirect={(screen) => setCurrentScreen(screen)}
      />
    );
  }

  // Dashboard layout for clinical care, acoustic sanctuary, period care, community, etc.
  return (
    <div className="bg-[#fff8f7] font-sans text-[#26181b] antialiased min-h-screen relative flex flex-col selection:bg-[#610011] selection:text-white">
      {/* Sidebar Navigation */}
      <NavigationSidebar
        currentScreen={currentScreen}
        onNavigate={(screen) => setCurrentScreen(screen)}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area: Responsive pl-0 on mobile, pl-72 on large desktop */}
      <div className="pl-0 lg:pl-72 flex flex-col min-h-screen transition-all">
        {/* Top Header */}
        <TopHeader
          currentScreen={currentScreen}
          onNavigate={(screen) => setCurrentScreen(screen)}
          cartCount={totalCartCount}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenAudioTranscriber={handleOpenTranscriber}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        {/* Dynamic View Component */}
        <main className="relative w-full pt-20 pb-16 bg-[#fff8f7] flex-1">
          {currentScreen === 'home' && (
            <HomeScreen
              onNavigate={(screen) => setCurrentScreen(screen)}
              onOpenTranscriber={handleOpenTranscriber}
            />
          )}
          {currentScreen === 'cycle-tracker' && (
            <CycleTrackerScreen onOpenTranscriber={handleOpenTranscriber} />
          )}
          {currentScreen === 'doctors' && (
            <DoctorsScreen onOpenTranscriber={handleOpenTranscriber} />
          )}
          {currentScreen === 'good-vibes' && <GoodVibesScreen />}
          {currentScreen === 'period-products' && (
            <PeriodProductsScreen
              onAddToCart={handleAddToCart}
              onOpenCart={() => setIsCartOpen(true)}
            />
          )}
          {currentScreen === 'community' && (
            <CommunityScreen onOpenTranscriber={handleOpenTranscriber} />
          )}
          {currentScreen === 'lifestyle-nutrition' && <NutritionScreen />}
          {currentScreen === 'ai-companion' && (
            <AiCompanionScreen onOpenTranscriber={handleOpenTranscriber} />
          )}
          {currentScreen === 'settings' && <SettingsScreen />}
        </main>

        {/* Persistent Luxury Footer */}
        <FooterBanner />
      </div>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onCheckout={handleCheckout}
      />

      {/* Audio Transcription Modal (gemini-3.5-transcribe) */}
      <AudioTranscriberModal
        isOpen={isTranscriberOpen}
        onClose={() => setIsTranscriberOpen(false)}
        contextCategory={transcriberCategory}
        defaultTitle={transcriberTitle}
        onApplyTranscript={(text) => {
          if (transcriberCallback) {
            transcriberCallback(text);
          }
        }}
      />
    </div>
  );
}
