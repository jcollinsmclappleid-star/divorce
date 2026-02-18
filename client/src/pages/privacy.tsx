import { useDocumentTitle } from "@/hooks/use-document-title";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  useDocumentTitle("Privacy Policy | DivorceCalculatorUK");
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Button
          variant="ghost"
          onClick={() => setLocation("/")}
          className="mb-6"
          data-testid="button-back-home"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Button>

        <h1 className="text-3xl font-display font-bold mb-8" data-testid="text-privacy-title">Privacy Policy</h1>

        <div className="prose prose-sm max-w-none space-y-6 text-muted-foreground">
          <p className="text-foreground font-medium">Last updated: February 2026</p>

          <section>
            <h2 className="text-xl font-semibold text-foreground">1. Who We Are</h2>
            <p>DivorceCalculatorUK provides an online financial modelling tool designed to help individuals understand potential financial outcomes during separation and divorce proceedings. This tool does not constitute legal, tax, or financial advice.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">2. What Information We Collect</h2>
            <p>We collect minimal information necessary to provide our service:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Financial data you enter:</strong> Asset values, liabilities, income, and expense figures entered into the modelling tool. This data is processed in your browser and stored locally on your device.</li>
              <li><strong>Session tokens:</strong> Anonymous identifiers stored in your browser to manage access to purchased reports.</li>
              <li><strong>Payment information:</strong> Processed securely by Stripe. We do not store card details. We retain a record of your purchase status for access management.</li>
              <li><strong>Technical data:</strong> Standard server logs including IP address, browser type, and access times for security and performance purposes.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>To provide financial modelling calculations in your browser</li>
              <li>To manage access to purchased reports</li>
              <li>To process payments via Stripe</li>
              <li>To maintain security and prevent fraud</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">4. Client-Side Processing</h2>
            <p>All financial calculations are performed in your browser. Your financial data (assets, liabilities, income, expenses) is not transmitted to our servers. This data remains on your device in your browser's local storage and can be cleared at any time by clearing your browser data.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">5. Data Sharing</h2>
            <p>We do not sell, trade, or share your personal information with third parties except:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Stripe:</strong> For payment processing, subject to Stripe's privacy policy.</li>
              <li><strong>Legal obligations:</strong> Where required by law or regulation.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">6. Data Retention</h2>
            <p>Purchase records are retained for the duration of your access period (6 months from purchase) plus a reasonable period for accounting and legal compliance. Browser-stored data persists until you clear it.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">7. Your Rights</h2>
            <p>Under UK data protection law (UK GDPR), you have the right to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">8. Cookies</h2>
            <p>We use essential browser storage (localStorage) for the functioning of the application. We do not use tracking cookies or third-party analytics cookies.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">9. Changes to This Policy</h2>
            <p>We may update this policy from time to time. Changes will be posted on this page with an updated revision date.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">10. Contact</h2>
            <p>For privacy-related enquiries, please contact us through the information provided on the website.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
