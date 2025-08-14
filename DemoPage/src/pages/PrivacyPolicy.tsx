import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-inter">
      <Navigation />
      
      <main className="pt-20">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold font-poppins mb-8 text-center">
                Privacy Policy for Askit (MVP Version)
              </h1>
              
              <div className="bg-card border border-border rounded-xl p-8 mb-8">
                <p className="text-muted-foreground mb-8">
                  <strong>Effective Date:</strong> 25th July, 2025
                </p>

                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold font-poppins mb-4 text-foreground">1. Introduction</h2>
                  <p className="text-muted-foreground mb-6">
                    At Askit, we value your privacy. This Privacy Policy outlines how we collect, use, and protect your personal data while you use our MVP platform hosted on{" "}
                    <a href="https://askit-1.onrender.com/app/" className="text-primary hover:underline">https://askit-1.onrender.com/app/</a>.
                  </p>

                  <h2 className="text-2xl font-bold font-poppins mb-4 text-foreground">2. Information We Collect</h2>
                  
                  <h3 className="text-xl font-semibold mb-3 text-foreground">2.1. Information You Provide:</h3>
                  <ul className="list-disc pl-6 mb-4 text-muted-foreground">
                    <li>Name, email, and phone number</li>
                    <li>Task descriptions or offers</li>
                    <li>Any messages exchanged within the platform</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3 text-foreground">2.2. Automatically Collected Data:</h3>
                  <ul className="list-disc pl-6 mb-6 text-muted-foreground">
                    <li>Device information (browser type, OS)</li>
                    <li>IP address</li>
                    <li>Usage statistics (e.g., task views, page visits)</li>
                    <li>Location (if enabled)</li>
                  </ul>

                  <h2 className="text-2xl font-bold font-poppins mb-4 text-foreground">3. How We Use Your Information</h2>
                  <p className="text-muted-foreground mb-2">We use your data to:</p>
                  <ul className="list-disc pl-6 mb-6 text-muted-foreground">
                    <li>Create and manage your account</li>
                    <li>Connect Service Requesters and Service Providers</li>
                    <li>Notify you of new tasks or offers</li>
                    <li>Improve our platform based on usage patterns</li>
                    <li>Communicate updates, terms, or support</li>
                  </ul>

                  <h2 className="text-2xl font-bold font-poppins mb-4 text-foreground">4. Information Sharing</h2>
                  <p className="text-muted-foreground mb-2">We do not sell or rent your personal information.</p>
                  <p className="text-muted-foreground mb-2">We may share your data:</p>
                  <ul className="list-disc pl-6 mb-6 text-muted-foreground">
                    <li>With other users (e.g., for task purposes)</li>
                    <li>With service providers (e.g., hosting, analytics)</li>
                    <li>If required by law or in case of disputes</li>
                  </ul>

                  <h2 className="text-2xl font-bold font-poppins mb-4 text-foreground">5. Data Storage and Security</h2>
                  <ul className="list-disc pl-6 mb-6 text-muted-foreground">
                    <li>Your information is stored on secure third-party servers (e.g., Firebase, Vercel)</li>
                    <li>Access is limited to core team members</li>
                    <li>No financial information is stored (since we have no integrated payments yet)</li>
                  </ul>

                  <h2 className="text-2xl font-bold font-poppins mb-4 text-foreground">6. Your Choices</h2>
                  <ul className="list-disc pl-6 mb-6 text-muted-foreground">
                    <li>You can edit your profile at any time</li>
                    <li>You can request account deletion by contacting us</li>
                    <li>You may opt out of non-essential notifications</li>
                  </ul>

                  <h2 className="text-2xl font-bold font-poppins mb-4 text-foreground">7. Children's Privacy</h2>
                  <p className="text-muted-foreground mb-6">
                    Askit is not intended for use by individuals under the age of 18. We do not knowingly collect personal data from minors.
                  </p>

                  <h2 className="text-2xl font-bold font-poppins mb-4 text-foreground">8. Changes to This Policy</h2>
                  <p className="text-muted-foreground mb-6">
                    We may update this policy occasionally. Continued use of the platform means you accept the updated terms.
                  </p>

                  <h2 className="text-2xl font-bold font-poppins mb-4 text-foreground">9. Contact Us</h2>
                  <p className="text-muted-foreground">
                    For questions, concerns, or requests:<br />
                    📧 Email: <a href="mailto:askit.socials@gmail.com" className="text-primary hover:underline font-semibold">askit.socials@gmail.com</a>
                  </p>
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

export default PrivacyPolicy;