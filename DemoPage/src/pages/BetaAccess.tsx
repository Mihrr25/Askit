import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Instagram, Linkedin, Rocket, CheckCircle, Target, Award, ArrowRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const BetaAccess = () => {
  const [email, setEmail] = useState('');
  
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    // Store email (for documentation)
    console.log('Beta access requested by:', email);

    toast({
      title: "Welcome to Askit Beta!",
      description: "Redirecting you to the platform... Don't forget to add Askit to your homescreen for quick access!",
    });

    setEmail('');
    
    // Redirect to the main platform
    setTimeout(() => {
      window.open('https://askit-zeta.vercel.app/', '_blank');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-inter">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-hero">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8">
                <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-6">
                  <Rocket className="inline w-16 h-16 text-primary mb-4" />
                  <br />
                  Join the <span className="text-primary">Askit Beta Tribe</span>
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              
              {/* Introduction */}
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-8">
                  Be Among the First to Experience Askit
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  We're building a platform where students help students by completing real tasks using real skills. 
                  Now, we're opening our doors to a limited number of <span className="text-primary font-semibold">early users</span> to 
                  test the beta version of Askit.
                </p>
              </div>

              {/* Benefits */}
              <div className="mb-16">
                <h3 className="text-2xl font-bold font-poppins mb-8 text-center">
                  As a <span className="text-primary">Beta Tester</span>, you'll get:
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-4 p-6 bg-card border border-border rounded-xl">
                    <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-2">Early Access</h4>
                      <p className="text-muted-foreground">Access to the platform before public launch</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-6 bg-card border border-border rounded-xl">
                    <Rocket className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-2">Priority Task Matching</h4>
                      <p className="text-muted-foreground">Connect with top student service providers first</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-6 bg-card border border-border rounded-xl">
                    <Target className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-2">Exclusive Feedback Circle</h4>
                      <p className="text-muted-foreground">Shape future features with your input</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-6 bg-card border border-border rounded-xl">
                    <Award className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-2">Founding Member Status</h4>
                      <p className="text-muted-foreground">Recognition as a founding member of the Askit community</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mb-16">
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Whether you need help with everyday tasks or simply want to explore how Askit works, 
                  this is your chance to be part of something built for students, by students.
                </p>
              </div>

              {/* Email Signup */}
              <div className="bg-card border border-border rounded-2xl p-8 mb-16">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold font-poppins mb-4">
                    🔓 Get Early Access
                  </h3>
                  <p className="text-muted-foreground">
                    Enter your email below and get access to the platform
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                  <div className="flex gap-4">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1"
                    />
                    <Button type="submit" className="bg-primary hover:bg-primary/80">
                      Get Beta Access
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4 text-center">
                    By joining the platform, you agree with our{" "}
                    <a href="/terms-of-use" className="text-primary hover:underline">Terms of Use</a>
                    {" "}and{" "}
                    <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>
                  </p>
                </form>
              </div>

              {/* Service Provider Section */}
              <div className="text-center bg-card border border-border rounded-2xl p-8 mb-16">
                <h3 className="text-2xl font-bold font-poppins mb-6">
                  🔧 Join as a Verified Service Provider
                </h3>
                <p className="text-muted-foreground mb-6">
                  Are you skilled and ready to offer services to fellow students? Join our verified service provider program.
                </p>
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => window.open('https://docs.google.com/forms/d/1m_pSTXVp-sczIw5V67C4oc_trCH4pJmwh3c-xidLa14/edit?pli=1', '_blank')}
                >
                  Become a Service Provider
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              {/* Contact Section */}
              <div className="text-center bg-card border border-border rounded-2xl p-8">
                <h3 className="text-2xl font-bold font-poppins mb-6">
                  💬 Got Questions?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Reach out to us at{' '}
                  <a 
                    href="mailto:askit.socials@gmail.com" 
                    className="text-primary hover:underline font-semibold"
                  >
                    askit.socials@gmail.com
                  </a>
                </p>
                <p className="text-muted-foreground mb-6">
                  Connect with us on social media - we'd love to hear from you.
                </p>
                
                <div className="flex justify-center space-x-4">
                  <a 
                    href="https://www.instagram.com/askit.india/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors group"
                  >
                    <Instagram className="w-6 h-6 text-primary" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/company/askitindia/posts/?feedView=all" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors group"
                  >
                    <Linkedin className="w-6 h-6 text-primary" />
                  </a>
                  <a 
                    href="mailto:askit.socials@gmail.com"
                    className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors group"
                  >
                    <Mail className="w-6 h-6 text-primary" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BetaAccess;