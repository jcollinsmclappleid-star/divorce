import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Briefcase, AlertTriangle, CheckSquare, AlertCircle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const considerations = [
  { title: "Income is harder to establish", desc: "Unlike PAYE earnings, self-employment income varies year to year and can include retained profits, dividends, and director's loan balances. Both parties (and any solicitors involved) typically need 2–3 years of accounts and tax returns to form a fair view of sustainable income." },
  { title: "The business itself is an asset", desc: "Where there is a limited company, partnership or substantial sole trader operation, the business is part of the matrimonial pot. Valuation usually requires a single joint expert (a forensic accountant) to produce a defensible figure." },
  { title: "Liquidity vs paper value", desc: "A business may be valuable on paper but produce limited cash to extract. Settlements often need to be structured around what cash can actually be released without damaging the business — sometimes via deferred payments, earn-outs or asset transfers in lieu of cash." },
  { title: "Director's loan accounts and retained profits", desc: "Money owed to a director, or profits retained in a company, are typically treated as part of the wealth available. Drawings strategy in the run-up to disclosure is closely scrutinised." },
  { title: "Ongoing income for maintenance", desc: "Where spousal or child maintenance is a feature, the unpredictability of self-employment income complicates the calculation. Maintenance terms may be tied to a percentage of income or include a review mechanism." },
  { title: "Pre-marital business growth", desc: "If the business pre-dates the marriage, the original value and growth during the marriage may need separate valuation and legal review." },
];

const figures = [
  "Latest 2–3 years of business accounts (limited company or sole trader)",
  "Latest 2–3 years of personal tax returns (SA302 or equivalent)",
  "Director's loan account balance (positive or negative)",
  "Retained profits in the company",
  "Realistic monthly drawings (vs accounting profit)",
  "Business assets (premises, equipment, goodwill, debtors)",
  "Business liabilities (loans, overdrafts, tax owed)",
  "Recent valuation of business shares (if available)",
];

const faqItems = [
  {
    question: "Will my business be valued as part of the divorce?",
    answer: "If the business has any meaningful value, yes. Valuation is typically performed by a single joint expert — usually a forensic accountant — who produces a defensible figure both parties can rely on. The cost of valuation is usually shared between the parties.",
  },
  {
    question: "Will I have to sell my business?",
    answer: "Not usually. Courts try to avoid forcing the sale of a business where the value can be realised in other ways — for example, the business owner keeps the business and the other party receives a larger share of cash, property or pensions. A forced sale is normally a last resort.",
  },
  {
    question: "What income will be used for maintenance calculations?",
    answer: "Sustainable income, not just last year's drawings. The court (or solicitors) typically average 2–3 years of profits, adjust for any one-off items, and consider the realistic capacity of the business going forward. Underdrawing in the year before disclosure rarely succeeds in reducing the figure.",
  },
  {
    question: "Can I take less from the business to reduce my disclosed income?",
    answer: "Attempting this is risky. Forensic accountants will look at retained profits, director's loan account movements and historical drawings patterns. Artificially suppressing income is typically detected and can damage credibility on every other point — and may amount to non-disclosure.",
  },
  {
    question: "What about my pre-marital business?",
    answer: "The original value of the business at the date of marriage may be argued as non-matrimonial. The growth in value during the marriage is typically matrimonial and subject to sharing. A forensic accountant can provide an opinion on the split between pre-marital and matrimonial value.",
  },
  {
    question: "How are dividends and bonuses paid into a company treated?",
    answer: "If profits are deliberately retained in the company to keep declared income low, the court can look through this and treat the retained profits as available wealth. The substance of the financial position matters more than the exact form in which money is held.",
  },
];

const relatedPages = [
  { title: "Form E Financial Disclosure UK", description: "What self-employed parties need to disclose.", href: "/form-e-financial-disclosure-uk", badge: "Disclosure" },
  { title: "How are Investments Divided in Divorce UK?", description: "Treatment of shareholdings and investments.", href: "/how-are-investments-divided-in-divorce-uk", badge: "Investments" },
  { title: "Bonuses and RSUs in Divorce UK", description: "How variable income components are treated.", href: "/bonuses-rsus-divorce-uk", badge: "Income" },
  { title: "Preview the Full Financial Report", description: "Model settlement scenarios with self-employment income.", href: "/unlock", badge: "Report" },
];

export default function SelfEmployedDivorcePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Self-Employed Divorce UK: Income, Business Value and Disclosure"
      subtitle="Self-employment and business interests make divorce financial settlements more complex. Income is harder to establish, the business itself is part of the pot, and disclosure requires more documentation. Here's what to expect."
      documentTitle="Self-Employed Divorce UK | DivorceCalculatorUK"
      metaDescription="A guide to UK divorce for self-employed and business owners — establishing income, valuing the business, director's loan accounts, retained profits, and how the settlement is typically structured."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Self-Employed Divorce UK", href: "/self-employed-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Self-employment and business ownership add layers to a divorce financial settlement that are not present in pure PAYE cases. Income is harder to pin down, the business itself is part of the matrimonial pot, and disclosure typically requires several years of accounts and tax returns. Settlements are often structured to preserve the business as a going concern while still meeting the receiving party's capital and income needs.
        </p>

        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">Adjusting income or drawings in the run-up to disclosure to make the financial position look weaker is a high-risk strategy. Forensic accountants are routinely instructed and will look at multi-year patterns, retained profits, and director's loan accounts. Artificial suppression of income is typically detected.</p>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">Six Things That Make Self-Employed Cases Different</h2>
        <div className="space-y-4 mb-6">
          {considerations.map((c, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-start gap-2">
                  <Briefcase className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{c.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Model Your Settlement With Variable Income" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">Figures You Will Need</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {figures.map((f, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border">
              <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {f}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mb-4">Common Pressure Points</h2>
        <div className="space-y-3 mb-6">
          {[
            { label: "Liquidity gap", desc: "A business may be valuable on paper but generate limited cash to extract. Settlements often need creative structuring — deferred payments, earn-outs, or asset transfers in lieu — to bridge the gap between fair value and what cash is available." },
            { label: "Forensic accountant cost and time", desc: "Joint expert valuations are valuable but cost typically £5,000–£15,000+ and add months to the timetable. For very small businesses, the cost may not be proportionate; for larger ones, it's usually unavoidable." },
            { label: "Future income volatility", desc: "Spousal maintenance based on a single year's profits can become unsustainable if the business has a bad year. Maintenance terms with review mechanisms or income-percentage clauses are sometimes used to manage this." },
            { label: "Pre-marital vs matrimonial business value", desc: "If the business pre-dated the marriage, the split between pre-marital value and matrimonial growth is often disputed. Forensic accountants typically address this directly in their valuation." },
          ].map((p, i) => (
            <div key={i} className="p-4 rounded-lg border">
              <p className="text-sm font-semibold mb-1">{p.label}</p>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">What the Calculator Cannot Decide</h2>
        <div className="space-y-3 mb-6">
          {[
            "The fair valuation of your business — this normally requires a forensic accountant",
            "Sustainable income for maintenance purposes — judgement is needed across multiple years",
            "How retained profits or director's loan accounts should be treated in your case",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Do we need a forensic accountant, and if so, jointly instructed or each side instructing?</li>
          <li>What's the right multi-year average to use for income in our case?</li>
          <li>How should director's loan accounts and retained profits be treated?</li>
          <li>Can the settlement be structured to preserve the business as a going concern?</li>
          <li>How should ongoing income variability be reflected in any maintenance term?</li>
        </ul>
        <InlineCTA label="Compare Settlement Scenarios" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-sm font-medium">{item.question}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ContentSection>
    </ContentPageLayout>
  );
}
