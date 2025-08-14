import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
const Safety = () => {
  return <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold font-poppins mb-8 text-center"> Askit Safety Guidelines (MVP Edition)</h1>
          
          <div className="bg-card border border-border rounded-lg p-8">
            <div className="space-y-6">
              <div className="grid gap-4">
                <div className="flex items-start space-x-3">
                  <span className="text-primary font-bold">1.</span>
                  <p className="text-foreground">Never share personal contact details (phone number, address, socials) outside the platform.</p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-primary font-bold">2.</span>
                  <p className="text-foreground">Communicate only via the Askit platform. No DMs, no calls, no "just WhatsApp me."</p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-primary font-bold">3.</span>
                  <p className="text-foreground">Meet in safe, public locations for the first task when possible.</p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-primary font-bold">4.</span>
                  <p className="text-foreground">Verify the user's name and profile picture before starting any task.</p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-primary font-bold">5.</span>
                  <p className="text-foreground">Don't invite or go to unfamiliar homes unless necessary and you feel 100% safe.</p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-primary font-bold">6.</span>
                  <p className="text-foreground">Always clarify the task scope clearly in the chat to avoid confusion or conflict later.</p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-primary font-bold">7.</span>
                  <p className="text-foreground">Avoid bringing extra people to a task unless clearly communicated and approved.</p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-primary font-bold">8.</span>
                  <p className="text-foreground">If a user behaves oddly or makes you uncomfortable, end the task and DM the Askit team.</p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-primary font-bold">9.</span>
                  <p className="text-foreground">Don't do anything illegal or suspicious  we'll know, and it won't end well.</p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-primary font-bold">10.</span>
                  <p className="text-foreground">Use your judgment. If it feels off, it probably is. Prioritize your safety</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>;
};
export default Safety;