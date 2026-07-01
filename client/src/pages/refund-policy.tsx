import { useDocumentTitle } from "@/hooks/use-document-title";
import { useMetaTags } from "@/hooks/use-meta-tags";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function RefundPolicyPage() {
  useDocumentTitle("Refund Policy | DivorceCalculatorUK");
  useMetaTags({
    description: "DivorceCalculatorUK refund policy. Details of your rights under UK Consumer Contracts Regulations 2013 and how to request a refund.",
    canonical: "https://divorcecalculatoruk.co.uk/refund-policy",
  });
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

        <h1 className="text-3xl font-display font-bold mb-8" data-testid="text-refund-title">
          Refund Policy
        </h1>

        <div className="prose prose-sm max-w-none space-y-6 text-muted-foreground">
          <p className="text-foreground font-medium">Last updated: March 2026</p>

          <p>
            This Refund Policy applies to all purchases made on DivorceCalculatorUK
            (<strong>divorcecalculatoruk.co.uk</strong>). Please read it carefully before completing
            your purchase. This policy does not affect your statutory rights as a consumer under
            UK law.
          </p>

          <section>
            <h2 className="text-xl font-semibold text-foreground">1. What You Are Purchasing</h2>
            <p>
              When you pay for access to DivorceCalculatorUK, you are purchasing a licence to
              access a digital financial modelling tool. Access is granted immediately upon
              successful payment. The product is digital content supplied over the internet — it
              is not a physical good and cannot be returned.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">2. Your Right to Cancel</h2>
            <p>
              <strong className="text-foreground">7-Day Money-Back Refund:</strong> We offer a full
              no-questions-asked refund within 7 days of purchase. Email{" "}
              <a href="mailto:support@divorcecalculatoruk.co.uk" className="text-primary underline underline-offset-2">
                support@divorcecalculatoruk.co.uk
              </a>{" "}
              with your purchase details and we will process the refund promptly.
            </p>
            <p>
              In addition to our commercial refund policy, you have statutory rights under the
              Consumer Contracts (Information, Cancellation and Additional Charges) Regulations
              2013. These provide a right to cancel a distance purchase and receive a full
              refund, without giving any reason.
            </p>
            <p>
              <strong className="text-foreground">Important:</strong> The statutory cancellation
              right does not apply once you have accessed the full digital analysis. By
              proceeding through payment and accessing the results, you consent to the immediate
              supply of digital content and acknowledge that the statutory right to cancel is
              waived at that point — consistent with standard practice for immediately delivered
              digital products under UK consumer law. Our 7-day commercial refund policy applies
              regardless.
            </p>
            <p>
              If you pay but do not access the results, your statutory cancellation right
              remains intact. Contact us at{" "}
              <a href="mailto:support@divorcecalculatoruk.co.uk" className="text-primary underline underline-offset-2">
                support@divorcecalculatoruk.co.uk
              </a>{" "}
              before accessing the full analysis to request a cancellation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">3. Technical Issues</h2>
            <p>
              If you experience a technical issue that prevents you from accessing or using the
              calculator after payment, please contact our support team as soon as possible. We
              will investigate and aim to resolve the issue promptly.
            </p>
            <p>
              If a verified technical fault on our part prevents the service from being used and
              the issue cannot be resolved within a reasonable timeframe, a refund may be issued
              at our discretion.
            </p>
            <p>
              Please note: loss of access caused by clearing your browser data, switching
              devices, or using a private/incognito window does not constitute a technical fault.
              If you have lost your access link, please use the{" "}
              <Link href="/recover" className="text-primary underline underline-offset-2">
                Recover Access
              </Link>{" "}
              page before contacting support.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">4. Billing Errors</h2>
            <p>
              If you believe you have been charged incorrectly, charged more than once, or
              notice an unauthorised transaction on your payment card, please contact us
              immediately. We will review the matter and, where a billing error is confirmed,
              issue a full refund of the overcharged amount as quickly as possible.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">5. Your Statutory Rights</h2>
            <p>
              Under the Consumer Rights Act 2015, if digital content is not of satisfactory
              quality, not fit for purpose, or not as described, you may be entitled to a
              repair, replacement, or refund. Nothing in this Refund Policy affects or limits
              your statutory rights as a UK consumer.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">6. How to Request a Refund</h2>
            <p>To request a refund for any reason, please email:</p>
            <p>
              <a
                href="mailto:support@divorcecalculatoruk.co.uk"
                className="text-primary font-semibold underline underline-offset-2"
              >
                support@divorcecalculatoruk.co.uk
              </a>
            </p>
            <p>Please include:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>The email address you used at checkout</li>
              <li>The approximate date and time of your purchase</li>
              <li>A brief description of the reason for your request</li>
            </ul>
            <p>We aim to respond to all refund requests within one working day.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">7. Refund Processing</h2>
            <p>
              Where a refund is approved, it will be processed via Stripe back to the original
              payment method used at checkout. Refunds typically appear within 5–10 working
              days depending on your card issuer. We do not charge any fees for processing
              refunds.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">8. Policy Updates</h2>
            <p>
              We may update this policy from time to time. Any changes will be published on
              this page with an updated date. Continued use of the service following any
              update constitutes acceptance of the revised policy.
            </p>
          </section>

          <div className="rounded-lg bg-muted/40 border border-border/50 p-4 mt-6">
            <p className="text-xs text-muted-foreground leading-relaxed">
              This policy should be read alongside our{" "}
              <Link href="/terms" className="text-primary underline underline-offset-2">Terms of Use</Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary underline underline-offset-2">Privacy Policy</Link>.
              DivorceCalculatorUK is a financial modelling tool only and does not provide legal,
              tax, or financial advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
