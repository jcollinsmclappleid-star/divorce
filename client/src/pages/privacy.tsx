import { useDocumentTitle } from "@/hooks/use-document-title";
import { useMetaTags } from "@/hooks/use-meta-tags";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  useDocumentTitle("Privacy Policy | DivorceCalculatorUK");
  useMetaTags({
    description: "DivorceCalculatorUK privacy policy. How we collect, use, and protect your personal data in accordance with UK GDPR and the Data Protection Act 2018.",
    canonical: "https://divorcecalculatoruk.co.uk/privacy",
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

        <h1 className="text-3xl font-display font-bold mb-8" data-testid="text-privacy-title">Privacy Policy</h1>

        <div className="prose prose-sm max-w-none space-y-6 text-muted-foreground">
          <p className="text-foreground font-medium">Last updated: February 2026</p>
          <p>This Privacy Policy explains how DivorceCalculatorUK ("we", "us", "our") collects, uses, stores, and protects your personal data when you use our website and financial modelling tool ("the Service"). It applies to all visitors and users of the Service.</p>
          <p>This policy is provided in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018. By using the Service, you acknowledge that you have read and understood this Privacy Policy. This Privacy Policy should be read in conjunction with our <Link href="/terms" className="underline text-primary">Terms of Use</Link>.</p>

          <section>
            <h2 className="text-xl font-semibold text-foreground">1. Data Controller</h2>
            <p>The data controller responsible for your personal data is the operator of DivorceCalculatorUK. For data protection enquiries, including exercising your rights under UK GDPR, please contact us at: <strong>privacy@divorcecalculatoruk.co.uk</strong>.</p>
            <p>We will respond to all data protection enquiries within one month of receipt.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">2. What Personal Data We Collect</h2>
            <p>We collect and process the following categories of personal data:</p>

            <p className="font-medium mt-2">Data processed locally in your browser (not transmitted to our servers):</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Financial modelling data:</strong> Asset values, liabilities, income figures, expense figures, property details, pension values, and other financial information you enter into the modelling tool. This data is processed entirely within your web browser using client-side JavaScript and is stored in your browser's localStorage. It is not transmitted to, received by, or stored on our servers at any time.</li>
            </ul>

            <p className="font-medium mt-2">Data processed and stored on our servers:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Session tokens:</strong> Anonymised, randomly generated identifiers stored in your browser's localStorage and transmitted to our server to verify access entitlements. Session tokens do not contain personal financial data and cannot be used to identify you personally.</li>
              <li><strong>Email address:</strong> We collect and store your email address in the following circumstances: (1) When you make a purchase, Stripe provides your email address from the checkout form; (2) When you use the access recovery page and enter your email to regain access. Your email is stored with your purchase record and used solely for sending transactional emails (purchase confirmation, access recovery links, and access expiry notifications).</li>
              <li><strong>Payment records:</strong> When you make a purchase, we store a record of the transaction including: Stripe checkout session ID, payment status, purchase timestamp, access expiry date, and your email address. We do not receive, process, or store your payment card number, CVV, or bank account details — these are processed exclusively by Stripe.</li>
              <li><strong>Server access logs:</strong> Standard web server logs including IP address, browser user agent string, pages accessed, referring URL, and access timestamps. These are collected automatically for security monitoring, fraud prevention, and operational purposes.</li>
            </ul>

            <p className="font-medium mt-2">Data we do not collect:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>We do not collect your name, telephone number, or postal address (unless you choose to include them in emails to us)</li>
              <li>We do not require account registration or login</li>
              <li>We do not use tracking cookies, advertising cookies, or third-party analytics services</li>
              <li>We do not collect biometric data, location data, or device identifiers beyond standard server logs</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">3. Lawful Basis for Processing</h2>
            <p>Under Article 6 of the UK GDPR, we process your personal data on the following lawful bases:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Contract (Article 6(1)(b)):</strong> Processing of session tokens, payment records, and email addresses is necessary for the performance of our contract with you — specifically, to provide and manage access to the Service following your purchase, send transactional emails (confirmations, recovery links, expiry notifications), and support your access recovery requests.</li>
              <li><strong>Legitimate interests (Article 6(1)(f)):</strong> Processing of server access logs is necessary for our legitimate interests in maintaining the security, stability, and integrity of the Service, and for fraud prevention. We have assessed that this processing does not override your rights and freedoms given the limited and non-identifying nature of the data collected.</li>
              <li><strong>Legal obligation (Article 6(1)(c)):</strong> We may retain certain records (such as payment transaction records) where required to comply with applicable tax, accounting, or regulatory obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">4. Client-Side Processing</h2>
            <p>All financial modelling calculations are performed entirely within your web browser. The financial data you enter — including income, assets, liabilities, expenses, and property details — is processed using client-side JavaScript and stored in your browser's localStorage.</p>
            <p>This data is never transmitted to our servers, and we have no technical ability to access, view, or recover it. You may delete this data at any time by clearing your browser's localStorage or site data for this website.</p>
            <p>This architectural design is intentional: it ensures that your sensitive financial information remains under your sole control at all times.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">5. How We Use Your Data</h2>
            <p>We use the personal data we process for the following specific purposes only:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Service delivery:</strong> To verify your access entitlement and provide the financial modelling functionality you have purchased</li>
              <li><strong>Payment processing:</strong> To record and manage your purchase transaction via Stripe</li>
              <li><strong>Transactional emails:</strong> To send you purchase confirmation, access recovery links, and access expiry notifications at the email address you provide or which is provided by Stripe during checkout</li>
              <li><strong>Access recovery:</strong> To store and verify your email address when you request access recovery, enabling you to regain access to your purchase across devices</li>
              <li><strong>Security and fraud prevention:</strong> To monitor for unauthorised access, abuse, or fraudulent activity using server access logs</li>
              <li><strong>Legal and regulatory compliance:</strong> To retain records where required by applicable law</li>
            </ul>
            <p>We do not use your data for marketing, profiling, or any purpose not listed above. We do not send marketing emails or newsletters.</p>
            <p><strong>Automated decision-making:</strong> The Service does not carry out automated decision-making or profiling that produces legal or similarly significant effects on you, as defined under Article 22 of the UK GDPR. All financial modelling calculations are performed locally in your browser and do not involve any server-side automated processing of your personal data.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">6. Data Sharing and Third Parties</h2>
            <p>We do not sell, rent, trade, or otherwise share your personal data with third parties for their own purposes. Your data is shared only in the following limited circumstances:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Stripe (payment processor):</strong> When you make a payment, your payment card details and email address are submitted directly from your browser to Stripe. We do not receive or handle your card details. Stripe processes your payment data as an independent data controller under its own <a href="https://stripe.com/gb/privacy" target="_blank" rel="noopener noreferrer" className="underline text-primary">Privacy Policy</a>.</li>
              <li><strong>Resend (email service provider):</strong> To send you transactional emails (purchase confirmations and access recovery links), we share your email address with Resend, a third-party email service provider. Resend processes your email address solely for the purpose of delivering transactional emails and does not use it for marketing or other purposes. Resend acts as a data processor under their <a href="https://resend.com/privacy" target="_blank" rel="noopener noreferrer" className="underline text-primary">Privacy Policy</a>.</li>
              <li><strong>Hosting infrastructure:</strong> The Service is hosted on cloud infrastructure. Our hosting provider processes server access logs and other data as a data processor acting on our instructions. They do not have independent access to or use of your data.</li>
              <li><strong>Legal requirements:</strong> We may disclose personal data where required to do so by law, regulation, legal process, or enforceable governmental request, or to protect our rights, property, or safety, or the rights, property, or safety of others.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">7. International Data Transfers</h2>
            <p>Our hosting infrastructure and payment processor (Stripe) may process data outside the United Kingdom. Where personal data is transferred outside the UK, we ensure that appropriate safeguards are in place in accordance with Chapter V of the UK GDPR. These safeguards may include:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Transfers to countries subject to a UK adequacy decision</li>
              <li>International Data Transfer Agreements (IDTAs) or standard contractual clauses approved by the ICO</li>
              <li>Other approved transfer mechanisms under UK data protection law</li>
            </ul>
            <p>You may request details of the specific safeguards applied to international transfers of your data by contacting us at the address in Section 14.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">8. Data Retention</h2>
            <p>We retain personal data only for as long as necessary for the purposes for which it was collected:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Email addresses:</strong> Retained for the duration of your access period (12 months from purchase) plus 6 years thereafter for accounting purposes. After your access expires, we retain your email address in encrypted form to enable access recovery if you repurchase. You may request deletion of your email address at any time by contacting us at privacy@divorcecalculatoruk.co.uk.</li>
              <li><strong>Payment records:</strong> Retained for the duration of your access period (12 months from purchase) plus 6 years thereafter, as required for UK tax and accounting obligations under HMRC record-keeping requirements.</li>
              <li><strong>Session tokens:</strong> Retained on our server for the duration of the access period. The corresponding token in your browser persists until you clear your browser data.</li>
              <li><strong>Server access logs:</strong> Retained for up to 90 days for security monitoring purposes, after which they are automatically deleted.</li>
              <li><strong>Browser-stored financial data:</strong> This data is stored locally on your device and is not subject to our retention policies. You may delete it at any time by clearing your browser data.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">9. Data Security</h2>
            <p>We implement appropriate technical and organisational measures to protect the personal data we process, including:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>All data transmitted between your browser and our servers is encrypted using TLS (HTTPS)</li>
              <li>Payment processing is handled entirely by Stripe, a PCI DSS Level 1 certified payment processor</li>
              <li>Financial modelling data is processed locally in your browser and is never transmitted to or stored on our servers</li>
              <li>Session tokens are randomly generated and contain no personal information</li>
              <li>Server access is restricted and monitored</li>
            </ul>
            <p>No method of electronic transmission or storage is completely secure. While we take reasonable precautions to protect your data, we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">10. Your Rights Under UK GDPR</h2>
            <p>Under the UK General Data Protection Regulation and the Data Protection Act 2018, you have the following rights in relation to your personal data:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Right of access (Article 15):</strong> You have the right to request a copy of the personal data we hold about you.</li>
              <li><strong>Right to rectification (Article 16):</strong> You have the right to request correction of any inaccurate or incomplete personal data we hold about you.</li>
              <li><strong>Right to erasure (Article 17):</strong> You have the right to request deletion of your personal data, subject to any legal obligations requiring us to retain it.</li>
              <li><strong>Right to restriction of processing (Article 18):</strong> You have the right to request that we restrict the processing of your personal data in certain circumstances.</li>
              <li><strong>Right to data portability (Article 20):</strong> Where processing is based on consent or contract and carried out by automated means, you have the right to receive your personal data in a structured, commonly used, and machine-readable format.</li>
              <li><strong>Right to object (Article 21):</strong> You have the right to object to processing based on legitimate interests. We will cease processing unless we can demonstrate compelling legitimate grounds that override your interests, rights, and freedoms.</li>
            </ul>
            <p>To exercise any of these rights, please contact us using the details provided in Section 14. We will respond to your request within one month, as required by UK GDPR. In complex cases, we may extend this period by up to two further months, in which case we will inform you of the extension and the reasons for it.</p>
            <p>There is no fee for exercising your rights in most circumstances. If your request is manifestly unfounded or excessive, we may charge a reasonable fee or refuse to act on the request, in accordance with Article 12(5) of the UK GDPR.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">11. Right to Complain</h2>
            <p>If you are not satisfied with how we handle your personal data or respond to your rights request, you have the right to lodge a complaint with the Information Commissioner's Office (ICO), the UK's independent supervisory authority for data protection:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Website: <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="underline text-primary">ico.org.uk</a></li>
              <li>Telephone: 0303 123 1113</li>
              <li>Address: Information Commissioner's Office, Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF</li>
            </ul>
            <p>We would appreciate the opportunity to address your concerns before you approach the ICO.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">12. Cookies and Local Storage</h2>
            <p>This Service does not use cookies for tracking, advertising, or analytics purposes.</p>
            <p>We use browser localStorage (a client-side storage mechanism) for the following essential purposes only:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Session token:</strong> To identify your browser session and verify access entitlements</li>
              <li><strong>Application state:</strong> To store your financial modelling data locally so that your progress is preserved between visits</li>
              <li><strong>User preferences:</strong> To store display preferences such as light/dark mode</li>
            </ul>
            <p>These are classified as strictly necessary for the functioning of the Service under the Privacy and Electronic Communications Regulations 2003 (PECR) and do not require consent.</p>
            <p>Stripe, our payment processor, may set its own cookies when you interact with the payment page. These are governed by Stripe's cookie policy.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">13. Children's Data</h2>
            <p>This Service is not directed at individuals under the age of 18. We do not knowingly collect personal data from children. If you believe that a child has provided personal data to us, please contact us and we will take steps to delete such data.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">14. Contact Us</h2>
            <p>For any questions about this Privacy Policy, to exercise your data protection rights, or to raise a concern about how your data is being handled, please contact us:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Email:</strong> privacy@divorcecalculatoruk.co.uk</li>
              <li><strong>Website:</strong> divorcecalculatoruk.co.uk</li>
            </ul>
            <p>We aim to respond to all enquiries within one month of receipt.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">15. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. Changes will be posted on this page with an updated revision date. Where changes materially affect your rights or how we process your personal data, we will endeavour to provide reasonable notice.</p>
            <p>Your continued use of the Service after any changes to this Privacy Policy constitutes your acknowledgement of the updated policy.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
