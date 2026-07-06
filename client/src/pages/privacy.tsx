import { useDocumentTitle } from "@/hooks/use-document-title";
import { useMetaTags } from "@/hooks/use-meta-tags";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

import { clearCookieConsent } from "@/lib/cookie-consent";

function CookiePreferencesButton() {
  function handleReset() {
    clearCookieConsent();
    window.location.reload();
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleReset}
      className="mt-3"
      data-testid="button-cookie-preferences"
    >
      Manage cookie preferences
    </Button>
  );
}

function DataDeletionForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/gdpr/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMessage(data.message || 'Your data has been removed.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Unable to process your request. Please try again or email support@divorcecalculatoruk.co.uk.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3 bg-muted/40 border border-border rounded-lg p-4">
      <p className="text-sm font-medium text-foreground">Request data deletion</p>
      <p className="text-sm text-muted-foreground">Enter your email address and we will permanently delete all personal data we hold for that address.</p>
      {status === 'success' ? (
        <p className="text-sm text-green-700 font-medium" data-testid="text-gdpr-success">{message}</p>
      ) : (
        <>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            disabled={status === 'loading'}
            className="w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            data-testid="input-gdpr-email"
          />
          {status === 'error' && <p className="text-sm text-destructive" data-testid="text-gdpr-error">{message}</p>}
          <Button type="submit" variant="outline" size="sm" disabled={status === 'loading'} data-testid="button-gdpr-submit">
            {status === 'loading' ? 'Processing…' : 'Delete my data'}
          </Button>
        </>
      )}
    </form>
  );
}

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
          <p className="text-foreground font-medium">Last updated: July 2026</p>
          <p>This Privacy Policy explains how DivorceCalculatorUK ("we", "us", "our") collects, uses, stores, and protects your personal data when you use our website and financial modelling tool ("the Service"). It applies to all visitors and users of the Service.</p>
          <p>This policy is provided in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018. By using the Service, you acknowledge that you have read and understood this Privacy Policy. This Privacy Policy should be read in conjunction with our <Link href="/terms" className="underline text-primary">Terms of Use</Link>.</p>

          <section>
            <h2 className="text-xl font-semibold text-foreground">1. Data Controller</h2>
            <p>The data controller responsible for your personal data is the operator of DivorceCalculatorUK. For data protection enquiries, including exercising your rights under UK GDPR, please contact us at: <strong>support@divorcecalculatoruk.co.uk</strong>.</p>
            <p>We will respond to all data protection enquiries within one month of receipt.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">2. What Personal Data We Collect</h2>
            <p>We collect and process the following categories of personal data:</p>

            <p className="font-medium mt-2">Data processed locally in your browser (not transmitted to our servers):</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Financial modelling data:</strong> Asset values, liabilities, income figures, expense figures, property details, pension values, and other financial information you enter into the modelling tool. This data is processed entirely within your web browser using client-side JavaScript and is stored in your browser's localStorage. It is not transmitted to, received by, or stored on our servers unless you choose to use the optional Settlement Reality Check Report feature (see below).</li>
            </ul>

            <p className="font-medium mt-2">Data processed and stored on our servers:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Settlement Reality Check Report request data (optional):</strong> When you choose to generate a Settlement Reality Check Report, selected de-identified model figures are securely transmitted to our server and forwarded to OpenAI for processing. Only calculated numerical outputs are included — no names, contact details, addresses, employer information, documents, messages, or free-text content of any kind. This transmission occurs only when you explicitly click the report generation button. See Section 8 for full details.</li>
              <li><strong>Session tokens:</strong> Anonymised, randomly generated identifiers stored in your browser's localStorage and transmitted to our server to verify access entitlements. Session tokens do not contain personal financial data and cannot be used to identify you personally.</li>
              <li><strong>Email address:</strong> We collect and store your email address in the following circumstances: (1) When you make a purchase, Stripe provides your email address from the checkout form; (2) When you use the access recovery page and enter your email to regain access. Your email is stored with your purchase record and used solely for sending transactional emails (purchase confirmation, access recovery links, and access expiry notifications).</li>
              <li><strong>Payment records:</strong> When you make a purchase, we store a record of the transaction including: Stripe checkout session ID, payment status, purchase timestamp, access expiry date, and your email address. We do not receive, process, or store your payment card number, CVV, or bank account details — these are processed exclusively by Stripe.</li>
              <li><strong>Server access logs:</strong> Standard web server logs including IP address, browser user agent string, pages accessed, referring URL, and access timestamps. These are collected automatically for security monitoring, fraud prevention, and operational purposes.</li>
            </ul>

            <p className="font-medium mt-2">Data we do not collect:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>We do not collect your name, telephone number, or postal address (unless you choose to include them in emails to us)</li>
              <li>We do not require account registration or login</li>
              <li>We do not use advertising cookies or sell your data to third parties</li>
              <li>We do not collect biometric data, precise location data, or device identifiers beyond standard server logs and optional analytics (see Section 13)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">3. Lawful Basis for Processing</h2>
            <p>Under Article 6 of the UK GDPR, we process your personal data on the following lawful bases:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Contract (Article 6(1)(b)):</strong> Processing of session tokens, payment records, and email addresses is necessary for the performance of our contract with you — specifically, to provide and manage access to the Service following your purchase, send transactional emails (confirmations, recovery links, expiry notifications), and support your access recovery requests.</li>
              <li><strong>Consent (Article 6(1)(a)):</strong> When you choose to use the optional Settlement Reality Check Report feature, the transmission of de-identified model figures to our server and to our third-party language model sub-processor is based on your explicit consent, given by clicking the report generation button after being shown a clear notice of what will be processed. You may withdraw this consent at any time by not using the feature — any previously generated report is stored locally in your browser only and is not retained by us. Optional analytics cookies (Google Analytics) are also processed on the basis of your consent, which you can give or refuse via the cookie banner.</li>
              <li><strong>Legitimate interests (Article 6(1)(f)):</strong> Processing of server access logs is necessary for our legitimate interests in maintaining the security, stability, and integrity of the Service, and for fraud prevention. We have assessed that this processing does not override your rights and freedoms given the limited and non-identifying nature of the data collected.</li>
              <li><strong>Legal obligation (Article 6(1)(c)):</strong> We may retain certain records (such as payment transaction records) where required to comply with applicable tax, accounting, or regulatory obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">4. Client-Side Processing</h2>
            <p>All core financial modelling calculations are performed entirely within your web browser. The financial data you enter — including income, assets, liabilities, expenses, and property details — is processed using client-side JavaScript and stored in your browser's localStorage.</p>
            <p>This data is not transmitted to or stored on our servers as part of the core modelling tool. You may delete this data at any time by clearing your browser's localStorage or site data for this website.</p>
            <p><strong>Exception — Settlement Reality Check Report (optional):</strong> If you choose to use the Settlement Reality Check Report feature, selected de-identified model figures are transmitted to our server and processed by a third-party language model service. No names, addresses, or identifying information are included in this transmission. This occurs only when you explicitly activate the feature. See Section 8 for full details including the third-party sub-processor involved and the safeguards applied.</p>
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
              <li><strong>Website analytics (with consent):</strong> If you accept analytics cookies, to understand how visitors use the site and improve the Service. Analytics data is aggregated and does not include the financial figures you enter into the calculator</li>
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
              <li><strong>Resend (email service provider):</strong> To send you transactional emails (purchase confirmations, access recovery links, magic link sign-in emails, free guide verification, and progress summary emails), we share your email address with Resend, a third-party email service provider. We also use Resend to send internal operational alerts to our administrator email when a purchase, lead capture, or data deletion request is processed; these alerts include the relevant email address as the subject of the event. Resend processes email addresses solely for the purpose of delivering these messages and does not use them for marketing or any other purpose. Resend acts as a data processor under their <a href="https://resend.com/privacy" target="_blank" rel="noopener noreferrer" className="underline text-primary">Privacy Policy</a>.</li>
              <li><strong>OpenAI (Settlement Reality Check Report sub-processor):</strong> When you choose to use the optional Settlement Reality Check Report feature, selected de-identified model figures are forwarded to OpenAI for processing. OpenAI acts as a data processor under a data processing agreement. The figures transmitted contain no names, contact details, addresses, or free-text personal information. OpenAI does not use API-submitted data to train its models under its standard API data processing terms. See Section 8 for full details.</li>
              <li><strong>Google Analytics (analytics, with consent):</strong> If you accept analytics cookies, we use Google Analytics to collect aggregated usage data (such as pages visited, approximate location at country level, device type, and browser). Google acts as a data processor under its <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline text-primary">Privacy Policy</a>. We configure IP anonymisation. Analytics cookies are not set unless you click Accept on the cookie banner. You can decline analytics cookies and still use the Service.</li>
              <li><strong>Hosting infrastructure:</strong> The Service is hosted on cloud infrastructure. Our hosting provider processes server access logs and other data as a data processor acting on our instructions. They do not have independent access to or use of your data.</li>
              <li><strong>Legal requirements:</strong> We may disclose personal data where required to do so by law, regulation, legal process, or enforceable governmental request, or to protect our rights, property, or safety, or the rights, property, or safety of others.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">7. International Data Transfers</h2>
            <p>Our hosting infrastructure, payment processor (Stripe), and — where you use the optional Settlement Reality Check Report feature — our language model sub-processor (OpenAI, based in the United States) may process data outside the United Kingdom. Where personal data is transferred outside the UK, we ensure that appropriate safeguards are in place in accordance with Chapter V of the UK GDPR. These safeguards may include:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Transfers to countries subject to a UK adequacy decision</li>
              <li>International Data Transfer Agreements (IDTAs) or standard contractual clauses approved by the ICO</li>
              <li>Other approved transfer mechanisms under UK data protection law</li>
            </ul>
            <p>You may request details of the specific safeguards applied to international transfers of your data by contacting us at the address in Section 14.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">8. Settlement Reality Check Report & Third-Party Processing</h2>
            <p>The Settlement Reality Check Report is an optional feature available to paid users. When you choose to generate a Settlement Reality Check Report, the following applies:</p>

            <p className="font-medium mt-3">What is sent:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Asset category labels and values (e.g. "Primary residence: £420,000") — not the names you typed</li>
              <li>Liability category labels and balances (e.g. "Mortgage: £185,000")</li>
              <li>Income type labels and gross/net amounts per party (e.g. "Employment income: £45,000 gross") — not employer names</li>
              <li>Settlement split ratio, net equity, and scenario numerical outputs</li>
              <li>Number of children (not ages or names)</li>
              <li>Child maintenance weekly estimate (if modelled)</li>
              <li>Spousal maintenance amount and direction (if included)</li>
              <li>Monthly budget surplus per party</li>
              <li>Model confidence level (High / Medium / Low), computed locally</li>
            </ul>

            <p className="font-medium mt-3">What is never sent:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Your name, your partner's name, or any party names</li>
              <li>Addresses, postcodes, or location data</li>
              <li>Contact details (email, phone)</li>
              <li>Employer names or details</li>
              <li>Asset names as typed by you (only category labels are used)</li>
              <li>Free-text notes, descriptions, or personal history</li>
              <li>Documents, uploaded files, solicitor letters, bank statements</li>
              <li>Child names or ages</li>
            </ul>

            <p className="font-medium mt-3">Sub-processor: OpenAI</p>
            <p>The de-identified model figures are forwarded to OpenAI, L.L.C. (based in the United States), which processes them to generate the Settlement Reality Check Report text. OpenAI acts as a data processor under a data processing agreement with us.</p>
            <ul className="list-disc pl-6 space-y-1 mt-1">
              <li><strong>Model training:</strong> Under OpenAI's API data usage policy, data submitted via the API is not used to train or improve OpenAI's models by default.</li>
              <li><strong>International transfer safeguard:</strong> Data transferred to OpenAI in the United States is subject to standard contractual clauses (SCCs) as approved by the UK ICO, constituting an appropriate safeguard under Article 46 of the UK GDPR for international transfers.</li>
              <li><strong>OpenAI Privacy Policy:</strong> <a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline text-primary">openai.com/policies/privacy-policy</a></li>
            </ul>

            <p className="font-medium mt-3">Retention:</p>
            <p>We do not store the Settlement Reality Check Report response on our servers. Once generated, the report is returned to your browser and stored locally in your browser's localStorage alongside your other modelling data. It is not retained by us or by OpenAI beyond the processing of that single request.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">9. Data Retention</h2>
            <p>We retain personal data only for as long as necessary for the purposes for which it was collected:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Purchase email addresses:</strong> Retained for the duration of your access period (12 months from purchase) plus up to 6 years thereafter to satisfy UK tax and accounting record-keeping obligations. After this period the email address is automatically removed from purchase records by our scheduled retention process. You may request earlier deletion at any time using the form below.</li>
              <li><strong>Free guide / progress summary email addresses:</strong> Retained for up to 24 months from sign-up and then automatically deleted by our scheduled retention process. Addresses that are not confirmed via the verification email are automatically deleted within 30 days.</li>
              <li><strong>Payment records:</strong> Retained for the duration of your access period plus up to 6 years thereafter, as required for UK tax and accounting obligations under HMRC record-keeping requirements. Personal identifiers (email address) are removed from these records once the retention period ends.</li>
              <li><strong>Magic link tokens:</strong> Single-use, with a one-hour expiry. Expired tokens are automatically removed by our scheduled retention process.</li>
              <li><strong>Authenticated session cookies:</strong> Stored server-side for up to 90 days from your most recent sign-in, after which they expire and are automatically pruned.</li>
              <li><strong>Modelling data:</strong> Your wizard inputs (names, finances, etc.) never leave your browser — they live in your device's local storage and are not stored on our servers.</li>
              <li><strong>Server access logs:</strong> Retained for up to 90 days for security monitoring purposes, after which they are deleted in line with our hosting provider's standard log rotation. Application request logs do not include response bodies or other personal data.</li>
              <li><strong>Browser-stored financial data:</strong> This data is stored locally on your device and is not subject to our retention policies. You may delete it at any time by clearing your browser data.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">10. Data Security</h2>
            <p>We implement appropriate technical and organisational measures to protect the personal data we process, including:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>All data transmitted between your browser and our servers is encrypted using TLS (HTTPS)</li>
              <li>Payment processing is handled entirely by Stripe, a PCI DSS Level 1 certified payment processor</li>
              <li>Core financial modelling data is processed locally in your browser and is not transmitted to our servers</li>
              <li>Session tokens are randomly generated and contain no personal information</li>
              <li>Server access is restricted and monitored</li>
            </ul>
            <p>No method of electronic transmission or storage is completely secure. While we take reasonable precautions to protect your data, absolute security cannot be promised.</p>
            <p><strong>Personal data breaches:</strong> In the event of a personal data breach that is likely to result in a risk to your rights and freedoms, we will notify the Information Commissioner's Office within 72 hours of becoming aware, in accordance with Article 33 of the UK GDPR. Where the breach is likely to result in a high risk to you, we will also notify you directly without undue delay, in accordance with Article 34.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">11. Your Rights Under UK GDPR</h2>
            <p>Under the UK General Data Protection Regulation and the Data Protection Act 2018, you have the following rights in relation to your personal data:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Right of access (Article 15):</strong> You have the right to request a copy of the personal data we hold about you.</li>
              <li><strong>Right to rectification (Article 16):</strong> You have the right to request correction of any inaccurate or incomplete personal data we hold about you.</li>
              <li><strong>Right to erasure (Article 17):</strong> You have the right to request deletion of your personal data, subject to any legal obligations requiring us to retain it.</li>
              <li><strong>Right to restriction of processing (Article 18):</strong> You have the right to request that we restrict the processing of your personal data in certain circumstances.</li>
              <li><strong>Right to data portability (Article 20):</strong> Where processing is based on consent or contract and carried out by automated means, you have the right to receive your personal data in a structured, commonly used, and machine-readable format.</li>
              <li><strong>Right to object (Article 21):</strong> You have the right to object to processing based on legitimate interests. We will cease processing unless we can demonstrate compelling legitimate grounds that override your interests, rights, and freedoms.</li>
            </ul>
            <p>To exercise any of these rights, please contact us using the details provided in Section 15. We will respond to your request within one month, as required by UK GDPR. In complex cases, we may extend this period by up to two further months, in which case we will inform you of the extension and the reasons for it.</p>
            <p>There is no fee for exercising your rights in most circumstances. If your request is manifestly unfounded or excessive, we may charge a reasonable fee or refuse to act on the request, in accordance with Article 12(5) of the UK GDPR.</p>
            <DataDeletionForm />
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">12. Right to Complain</h2>
            <p>If you are not satisfied with how we handle your personal data or respond to your rights request, you have the right to lodge a complaint with the Information Commissioner's Office (ICO), the UK's independent supervisory authority for data protection:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Website: <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="underline text-primary">ico.org.uk</a></li>
              <li>Telephone: 0303 123 1113</li>
              <li>Address: Information Commissioner's Office, Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF</li>
            </ul>
            <p>We would appreciate the opportunity to address your concerns before you approach the ICO.</p>
          </section>

          <section id="cookies">
            <h2 className="text-xl font-semibold text-foreground">13. Cookies and Local Storage</h2>
            <p>We use a small number of cookies and browser storage mechanisms. Some are strictly necessary for the Service to work; optional analytics cookies are only set if you accept them via the cookie banner shown on your first visit.</p>

            <p className="font-medium mt-3">Strictly necessary (no consent required):</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Session token (localStorage):</strong> An anonymised identifier to verify access entitlements after purchase</li>
              <li><strong>Application state (localStorage):</strong> Your financial modelling data, stored locally so progress is preserved between visits</li>
              <li><strong>User preferences (localStorage):</strong> Display preferences such as light/dark mode</li>
              <li><strong>Cookie consent choice (localStorage):</strong> Records whether you accepted or declined optional analytics cookies</li>
              <li><strong>Authenticated session cookie (<code>dfm.sid</code>):</strong> If you use magic link sign-in, a single HttpOnly cookie maintains your session. Required for that feature only.</li>
            </ul>
            <p className="mt-2">These are classified as strictly necessary under the Privacy and Electronic Communications Regulations 2003 (PECR) and do not require consent.</p>

            <p className="font-medium mt-3">Optional analytics cookies (consent required):</p>
            <p>If you click <strong>Accept</strong> on the cookie banner, we load Google Analytics (measurement ID G-26BB9XFNH5) to understand aggregated site usage — for example which pages are visited and how users move through the wizard. Analytics does not receive the financial figures you enter into the calculator. If you click <strong>Decline</strong>, analytics cookies are not set and Google Analytics is not loaded; the site still works fully. You can change your choice at any time using the button below.</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><strong>Provider:</strong> Google Ireland Limited / Google LLC (Google Analytics)</li>
              <li><strong>Purpose:</strong> Aggregated website usage statistics to improve the Service</li>
              <li><strong>Retention:</strong> As determined by Google Analytics cookie lifetimes (typically up to 2 years for some identifiers). See <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer" className="underline text-primary">Google&apos;s cookie information</a>.</li>
              <li><strong>Lawful basis:</strong> Consent (Article 6(1)(a) UK GDPR)</li>
            </ul>
            <CookiePreferencesButton />

            <p className="font-medium mt-4">Payment cookies:</p>
            <p>Stripe, our payment processor, may set its own cookies when you interact with the checkout page. These are governed by Stripe&apos;s <a href="https://stripe.com/gb/cookie-settings" target="_blank" rel="noopener noreferrer" className="underline text-primary">cookie policy</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">14. Children's Data</h2>
            <p>This Service is not directed at individuals under the age of 18. We do not knowingly collect personal data from children. If you believe that a child has provided personal data to us, please contact us and we will take steps to delete such data.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">15. Contact Us</h2>
            <p>For any questions about this Privacy Policy, to exercise your data protection rights, or to raise a concern about how your data is being handled, please contact us:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Email:</strong> support@divorcecalculatoruk.co.uk</li>
              <li><strong>Website:</strong> divorcecalculatoruk.co.uk</li>
            </ul>
            <p>We aim to respond to all enquiries within one month of receipt.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">16. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. Changes will be posted on this page with an updated revision date. Where changes materially affect your rights or how we process your personal data, we will endeavour to provide reasonable notice.</p>
            <p>Your continued use of the Service after any changes to this Privacy Policy constitutes your acknowledgement of the updated policy.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
