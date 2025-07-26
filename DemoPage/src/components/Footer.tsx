import { Mail, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-background border-t border-border py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="text-3xl font-bold font-poppins mb-4">
                <span className="text-foreground">Askit</span>
                <span className="text-primary"> India</span>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md">
                The peer-to-peer service marketplace designed exclusively for college students. 
                Your skills. Your campus. Your earnings.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                <a 
                  href="https://www.instagram.com/askit.india/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-colors group"
                >
                  <Instagram className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                </a>
                <a 
                  href="https://www.linkedin.com/company/askitindia/posts/?feedView=all" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-colors group"
                >
                  <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold font-poppins mb-4 text-foreground">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="/about"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('how-it-works')}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    How It Works
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('faq')}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    FAQ
                  </button>
                </li>
                <li>
                  <a 
                    href="/privacy-policy"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a 
                    href="/terms-of-use"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Terms of Use
                  </a>
                </li>
                <li>
                  <a 
                    href="/safety"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Safety
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold font-poppins mb-4 text-foreground">Contact</h3>
              <div className="space-y-3">
                <a 
                  href="mailto:askit.socials@gmail.com"
                  className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <Mail className="w-4 h-4" />
                  <span>askit.socials@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-border mt-12 pt-8 text-center">
            <p className="text-muted-foreground">
              © 2025 Askit India. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;