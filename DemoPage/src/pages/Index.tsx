import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import FAQ from '@/components/FAQ';
import WhyAskit from '@/components/WhyAskit';
import Categories from '@/components/Categories';
import BetaTesting from '@/components/BetaTesting';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-inter">
      <Navigation />
      <HeroSection />
      <HowItWorks />
      <WhyAskit />
      <FAQ />
      <Categories />
      <BetaTesting />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
