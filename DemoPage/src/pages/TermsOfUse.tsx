import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-inter">
      <Navigation />
      
      <main className="pt-20">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold font-poppins mb-8 text-center">
                Terms of Use for Askit (MVP Version)
              </h1>
              
              <div className="bg-card border border-border rounded-xl p-8 mb-8">
                <p className="text-muted-foreground mb-8">
                  <strong>Effective Date:</strong> 25th July, 2025
                </p>

                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold font-poppins mb-4 text-foreground">PLEASE READ THESE TERMS CAREFULLY</h2>
                  <p className="text-muted-foreground mb-6">
                    By creating an account and using our MVP platform (askit-zeta.vercel.app), you confirm that:
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-muted-foreground">
                    <li>You have read, understood, and agree to be bound by these Terms of Use and related policies.</li>
                    <li>You are of legal age to form a binding agreement or have obtained necessary permissions.</li>
                    <li>You have the authority to agree personally or on behalf of your organization.</li>
                  </ul>

                  <h2 className="text-2xl font-bold font-poppins mb-4 text-foreground">1. SCOPE OF ASKIT'S PLATFORM AND SERVICES</h2>
                  
                  <h3 className="text-xl font-semibold mb-3 text-foreground">1.1</h3>
                  <p className="text-muted-foreground mb-4">
                    Askit MVP offers a basic platform for Service Requesters to post tasks and for Service Providers to respond.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 text-foreground">1.2</h3>
                  <p className="text-muted-foreground mb-4">
                    Some details of tasks will be publicly visible. Responses and communications between users are facilitated via in-platform messaging.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 text-foreground">1.3</h3>
                  <p className="text-muted-foreground mb-4">
                    A Service Requester may modify or remove a task at any time before accepting an offer. Askit may also remove offers upon task modification.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 text-foreground">1.4</h3>
                  <p className="text-muted-foreground mb-4">
                    When a Service Requester accepts an offer, that task becomes closed to new offers. Askit may reopen it in its sole discretion.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 text-foreground">1.5</h3>
                  <p className="text-muted-foreground mb-4">
                    Upon accepting an offer, a basic informal arrangement ("Temporary Employment Affidavit") is formed between the two parties outlining service terms like start/end time, scope, and compensation.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 text-foreground">1.6</h3>
                  <p className="text-muted-foreground mb-4">
                    Parties are encouraged to use Askit's chat feature to update agreements. Modifications are binding if fair and agreed upon.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 text-foreground">1.7</h3>
                  <p className="text-muted-foreground mb-6">
                    Since this MVP <strong>does not manage payments, hold funds (escrow), or offer refunds</strong>, users are fully responsible for managing any financial transactions externally.
                  </p>

                  <h2 className="text-2xl font-bold font-poppins mb-4 text-foreground">2. ASKIT'S ROLE AND RESPONSIBILITIES</h2>
                  
                  <h3 className="text-xl font-semibold mb-3 text-foreground">2.1</h3>
                  <p className="text-muted-foreground mb-4">
                    Askit <strong>only offers a tech platform</strong> and is not involved in service execution or payment handling.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 text-foreground">2.2</h3>
                  <p className="text-muted-foreground mb-4">
                    Users must be real individuals or registered businesses. Businesses are liable for actions of their employees using the platform.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 text-foreground">2.3</h3>
                  <p className="text-muted-foreground mb-4">
                    We reserve the right to deny, suspend, or remove accounts for any reason, especially misconduct.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 text-foreground">2.4</h3>
                  <p className="text-muted-foreground mb-4">
                    We may update or change the platform without prior notice. It's your responsibility to stay informed.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 text-foreground">2.5</h3>
                  <p className="text-muted-foreground mb-4">
                    Registering is free. Posting and viewing tasks incurs no charge.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 text-foreground">2.6</h3>
                  <p className="text-muted-foreground mb-4">
                    We are not responsible for the quality, outcome, or legality of services exchanged.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 text-foreground">2.7</h3>
                  <p className="text-muted-foreground mb-4">
                    We do not verify or guarantee user-provided information.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 text-foreground">2.8</h3>
                  <p className="text-muted-foreground mb-4">
                    The Askit MVP platform is offered <strong>"as is"</strong> without any warranties.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 text-foreground">2.9</h3>
                  <p className="text-muted-foreground mb-6">
                    We are not obligated to mediate disputes but may choose to intervene to improve experience.
                  </p>

                  <h2 className="text-2xl font-bold font-poppins mb-4 text-foreground">3. USER OBLIGATIONS</h2>
                  
                  <h3 className="text-xl font-semibold mb-3 text-foreground">3.1</h3>
                  <p className="text-muted-foreground mb-2">Users must:</p>
                  <ul className="list-disc pl-6 mb-4 text-muted-foreground">
                    <li>Follow all laws and platform terms</li>
                    <li>Post only accurate and honest information</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3 text-foreground">3.2</h3>
                  <p className="text-muted-foreground mb-2">Users may not:</p>
                  <ul className="list-disc pl-6 mb-4 text-muted-foreground">
                    <li>Copy, reproduce, or resell platform content</li>
                    <li>Use platform for illegal or abusive activity</li>
                    <li>Mislead, impersonate, harass, or discriminate</li>
                    <li>Upload harmful code or violate intellectual property</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3 text-foreground">3.3</h3>
                  <p className="text-muted-foreground mb-4">
                    Users must maintain control of their account and provide truthful, up-to-date information.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 text-foreground">3.4</h3>
                  <p className="text-muted-foreground mb-4">
                    If location services are added in future, users will be informed. Location access is currently <strong>not active</strong> in the MVP.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 text-foreground">3.5</h3>
                  <p className="text-muted-foreground mb-4">
                    Service Providers must have legal right to perform services. They must not charge over the agreed price.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 text-foreground">3.6</h3>
                  <p className="text-muted-foreground mb-4">
                    Any subcontracting must be disclosed. Responsibility still lies with the original provider.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 text-foreground">3.7</h3>
                  <p className="text-muted-foreground mb-6">
                    Askit may take action against users who breach terms, including suspension or task removal.
                  </p>

                  <h2 className="text-2xl font-bold font-poppins mb-4 text-foreground">4. PAYMENTS, FEES, CANCELLATIONS & REFUNDS</h2>
                  
                  <h3 className="text-xl font-semibold mb-3 text-foreground">4.1</h3>
                  <p className="text-muted-foreground mb-4">
                    <strong>Askit MVP does not manage, collect, or process any payments.</strong> There is no escrow or payment gateway integration.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 text-foreground">4.2</h3>
                  <p className="text-muted-foreground mb-4">
                    All payments must be handled independently by users outside the platform.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 text-foreground">4.3</h3>
                  <p className="text-muted-foreground mb-4">
                    Because of this, <strong>Askit is not liable</strong> for any transaction failures, payment disputes, or refund demands. Users are solely responsible.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 text-foreground">4.4</h3>
                  <p className="text-muted-foreground mb-6">
                    No platform-based cancellations, refunds, or automatic deductions apply. We do not enforce or mediate financial outcomes.
                  </p>

                  <h2 className="text-2xl font-bold font-poppins mb-4 text-foreground">5. THIRD PARTY SERVICES</h2>
                  
                  <h3 className="text-xl font-semibold mb-3 text-foreground">5.1</h3>
                  <p className="text-muted-foreground mb-4">
                    Askit may link or offer third-party tools, governed by their own terms. Use them at your own risk.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 text-foreground">5.2</h3>
                  <p className="text-muted-foreground mb-6">
                    We are not liable for third-party errors, security breaches, or damages.
                  </p>

                  <h2 className="text-2xl font-bold font-poppins mb-4 text-foreground">6. IDENTITY VERIFICATION</h2>
                  
                  <h3 className="text-xl font-semibold mb-3 text-foreground">6.1</h3>
                  <p className="text-muted-foreground mb-4">
                    We may implement identity checks. Results may not always be accurate.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 text-foreground">6.2</h3>
                  <p className="text-muted-foreground mb-6">
                    Users are responsible for confirming authenticity of others. We do not guarantee profiles.
                  </p>

                  <h2 className="text-2xl font-bold font-poppins mb-4 text-foreground">7. LIMITATION OF LIABILITY</h2>
                  
                  <h3 className="text-xl font-semibold mb-3 text-foreground">7.1</h3>
                  <p className="text-muted-foreground mb-4">
                    Askit and its team are <strong>not liable for any direct or indirect damages</strong> related to use of the platform. Use is at your own risk.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 text-foreground">7.2</h3>
                  <p className="text-muted-foreground mb-6">
                    We do not guarantee task completion, quality of service, or outcome.
                  </p>

                  <h2 className="text-2xl font-bold font-poppins mb-4 text-foreground">8. PRIVACY</h2>
                  <p className="text-muted-foreground mb-6">
                    Your information is governed by our Privacy Policy. Please refer to it separately.
                  </p>

                  <h2 className="text-2xl font-bold font-poppins mb-4 text-foreground">9. CHANGES TO TERMS</h2>
                  
                  <h3 className="text-xl font-semibold mb-3 text-foreground">9.1</h3>
                  <p className="text-muted-foreground mb-6">
                    We may change these terms without notice. Continued use implies acceptance.
                  </p>

                  <h2 className="text-2xl font-bold font-poppins mb-4 text-foreground">10. GOVERNING LAW</h2>
                  <p className="text-muted-foreground mb-6">
                    These terms are governed by Indian law. Legal disputes must be handled independently between users.
                  </p>

                  <h2 className="text-2xl font-bold font-poppins mb-4 text-foreground">11. TERMINATION</h2>
                  <p className="text-muted-foreground mb-6">
                    We reserve the right to remove users or terminate access for violations, without liability.
                  </p>

                  <h2 className="text-2xl font-bold font-poppins mb-4 text-foreground">12. NO AGENCY</h2>
                  <p className="text-muted-foreground mb-6">
                    There is no employee-employer, agency, or legal partnership between users and Askit.
                  </p>

                  <h2 className="text-2xl font-bold font-poppins mb-4 text-foreground">13. SEVERABILITY</h2>
                  <p className="text-muted-foreground mb-6">
                    If any clause is found unenforceable, others still remain valid.
                  </p>

                  <h2 className="text-2xl font-bold font-poppins mb-4 text-foreground">14. CONTACT</h2>
                  <p className="text-muted-foreground">
                    <strong>Email:</strong> <a href="mailto:askit.socials@gmail.com" className="text-primary hover:underline font-semibold">askit.socials@gmail.com</a>
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

export default TermsOfUse;