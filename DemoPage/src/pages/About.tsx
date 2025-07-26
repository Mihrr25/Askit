import { ArrowLeft, Instagram, Linkedin, Rocket, Target, Zap, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16 pt-24">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold font-poppins mb-6">
              About <span className="text-primary">Askit</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Empowering students across India through peer-to-peer collaboration and skill monetization
            </p>
          </div>

          {/* Our Story Section */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-8 text-center">
              Our Story
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="mb-6">
                  Askit started with a simple conversation between two friends about everyday needs and untapped potential within student communities. What began as an idea grew into a shared vision: to build a platform where students could <span className="text-primary font-semibold">earn through their skills</span> and <span className="text-primary font-semibold">help one another through peer-to-peer collaboration</span>.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <p>Cleared <span className="text-primary font-semibold">Zonals at Eureka!</span></p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <p>Connected with mentors at <span className="text-primary font-semibold">iSummit (IIT Bombay)</span></p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <p>Reached <span className="text-primary font-semibold">finals of Gujarat i-Hub's S4 initiative</span></p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  We've gained recognition at top entrepreneurial platforms, shaping Askit into a growing, student-driven ecosystem where getting work done is just one "ask" away.
                </p>
              </div>
              <div className="flex justify-center">
                <img 
                  src="/lovable-uploads/456160af-f008-4b10-8c5e-0a8f01152141.png" 
                  alt="Askit mobile app interface showing category selection"
                  className="w-full max-w-sm rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </section>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Our Mission */}
            <section className="bg-card border border-border rounded-xl p-8">
              <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-6 text-primary">
                Our Mission
              </h2>
              <p className="text-muted-foreground mb-4">
                To empower students across India by creating a platform where they can earn, connect, and grow through real-world tasks while providing accessible, trustworthy help to anyone who needs it.
              </p>
              <p className="text-muted-foreground">
                We believe that peer-to-peer support is the future and Askit is building that future, one task at a time.
              </p>
            </section>

            {/* Our Vision */}
            <section className="bg-card border border-border rounded-xl p-8">
              <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-6 text-primary">
                Our Vision
              </h2>
              <p className="text-muted-foreground mb-4">
                To build India's first, student-first service marketplace where every skill is valued, every task is an opportunity, and every student becomes part of a powerful support ecosystem.
              </p>
              <p className="text-muted-foreground">
                We envision a world where students don't just survive college, they thrive in it, together.
              </p>
            </section>
          </div>

          {/* Our Progress Section */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-12 text-center">
              Our Progress
            </h2>
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Item 1 */}
                <div className="relative group">
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6 h-full hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                      <Rocket className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold font-poppins mb-3 text-primary">MVP v1 Launch</h3>
                    <p className="text-sm text-muted-foreground mb-2 font-medium">May 2025</p>
                    <p className="text-sm text-muted-foreground">Our first version hits the market with core functionality.</p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="relative group">
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6 h-full hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold font-poppins mb-3 text-primary">100+ Tasks Posted</h3>
                    <p className="text-sm text-muted-foreground mb-2 font-medium">Real Impact</p>
                    <p className="text-sm text-muted-foreground">Real tasks completed through our platform.</p>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="relative group">
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6 h-full hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                      <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold font-poppins mb-3 text-primary">MVP v2 Live</h3>
                    <p className="text-sm text-muted-foreground mb-2 font-medium">User-Driven</p>
                    <p className="text-sm text-muted-foreground">Improved platform based on user suggestions and feedback.</p>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="relative group">
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6 h-full hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold font-poppins mb-3 text-primary">Testing Phase</h3>
                    <p className="text-sm text-muted-foreground mb-2 font-medium">Select Cities</p>
                    <p className="text-sm text-muted-foreground">Focused on major student hubs across India.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Core Team Section */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-12 text-center">
              The Askit Team
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Aryan Vaid */}
              <div className="bg-card border border-border rounded-xl p-8 text-center">
                <img 
                  src="/lovable-uploads/98044be0-7dee-47df-826d-1e16088c46a8.png" 
                  alt="Aryan Vaid" 
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-6"
                />
                <h3 className="text-xl font-bold font-poppins mb-2">Aryan Vaid</h3>
                <p className="text-primary font-semibold mb-4">The Co-founder</p>
                <p className="text-muted-foreground text-sm mb-4">
                  Pursuing Bachelors in Business Administration from Narsee Monjee Institute of Management Studies, Mumbai
                </p>
                <div className="flex justify-center gap-4">
                  <a 
                    href="https://www.instagram.com/aryanvaid01/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/aryan-vaid-23b859289/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Aadhitya Sachdeva */}
              <div className="bg-card border border-border rounded-xl p-8 text-center">
                <img 
                  src="/lovable-uploads/d5ea9db7-a032-4f9f-bd1d-59a01d0994fb.png" 
                  alt="Aadhitya Sachdeva" 
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-6"
                />
                <h3 className="text-xl font-bold font-poppins mb-2">Aadhitya Sachdeva</h3>
                <p className="text-primary font-semibold mb-4">The Co-founder</p>
                <p className="text-muted-foreground text-sm mb-4">
                  Pursuing B.Tech from Amity University, Noida
                </p>
                <div className="flex justify-center gap-4">
                  <a 
                    href="https://www.instagram.com/aadhitya01/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/aadhitya-sachdeva-03444a331/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Rehan Haider */}
              <div className="bg-card border border-border rounded-xl p-8 text-center">
                <img 
                  src="/lovable-uploads/6b82866b-2e6c-4931-a53e-175c54c5beaf.png" 
                  alt="Rehan Haider" 
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-6"
                />
                <h3 className="text-xl font-bold font-poppins mb-2">Rehan Haider</h3>
                <p className="text-primary font-semibold mb-4">Design Lead</p>
                <p className="text-muted-foreground text-sm mb-4">
                  Pursuing B.Des from National Institute of Design, Ahmedabad
                </p>
                <div className="flex justify-center gap-4">
                  <a 
                    href="https://www.instagram.com/fsnayer/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/rehanhaider7/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;