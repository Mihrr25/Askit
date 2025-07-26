import { Button } from '@/components/ui/button';
import { Rocket, ArrowRight } from 'lucide-react';
const BetaTesting = () => {
  return <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
              Be Part of Our Beta Tribe <Rocket className="inline w-12 h-12 text-primary ml-2" />
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're currently testing in <span className="text-primary font-semibold">Select Cities </span> 
              Help shape the future of student freelancing.
            </p>
          </div>


          <Button size="lg" className="bg-primary hover:bg-primary/80 text-primary-foreground font-semibold px-8 py-4 text-lg group animate-glow-pulse" onClick={() => window.location.href = '/beta-access'}>
            Sign Up for Beta Access
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          <p className="text-sm text-muted-foreground mt-4">
            Join our community of beta testers of Askit India
          </p>
        </div>
      </div>
    </section>;
};
export default BetaTesting;