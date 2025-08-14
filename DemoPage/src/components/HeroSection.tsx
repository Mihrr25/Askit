import { Button } from '@/components/ui/button';
import { ArrowRight, Smartphone } from 'lucide-react';
const HeroSection = () => {
  return <section id="hero" className="min-h-screen bg-gradient-hero flex items-center justify-center relative overflow-hidden">
      {/* Background gradient circles for visual interest */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Main Tagline */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-8 animate-fade-in-up hover:scale-105 transition-transform duration-300">
              <span className="text-foreground">The Smarter Way To Get Things Done.</span>
              <br />
              <span className="text-blue-500 font-bold">Just Askit.</span>
            </h2>
            <div className="animate-fade-in-up">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300" onClick={() => window.location.href = '/beta-access'}>
                Join Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="text-left lg:pr-8 animate-fade-in-up">
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                The peer-to-peer service marketplace designed exclusively for college students. 
                <span className="text-primary font-semibold"> Your skills. Your convenience.
Your earnings.</span>
              </p>
            </div>

            {/* Right side - App Screen Preview */}
            <div className="flex justify-center lg:justify-end">
              <div className="max-w-lg mx-auto lg:mx-0 transform hover:scale-105 transition-transform duration-500 animate-fade-in-up">
                <img src="/lovable-uploads/fee3ac75-bef9-4fc6-98a9-39bfc5921164.png" alt="Askit app screens showing task listings and logo" className="w-full h-auto rounded-2xl shadow-lg" />
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 animate-bounce">
            <div className="w-6 h-10 border-2 border-primary rounded-full mx-auto flex justify-center">
              <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;