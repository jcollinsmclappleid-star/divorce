import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Building2, AlertTriangle, CheckSquare, AlertCircle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const approaches = [
  { title: "One spouse keeps the business and offsets value", desc: "The most common outcome. The business owner retains the company in full and the other spouse receives equivalent value from other assets — typically a larger share of the home, savings, or pension. The challenge is fixing the offset value." },
  { title: "Sale of the business", desc: "Where neither party wants (or can run) the business, sale to a third party converts it into liquid funds that can be split. This is rare for owner-managed businesses because of the disruption and tax cost." },
  { title: "Continued joint ownership", desc: "Sometimes both spouses retain shareholdings — particularly in family businesses where they had different roles. This usually requires a robust shareholders' agreement to manage future disagreements." },
  { title: "Structured payments over time", desc: "Where there isn't enough liquidity to offset immediately, the business owner may pay the other spouse over a number of years from business income. This carries credit risk and is usually combined with security." },
  { title: "Transfer of part of the business", desc: "Sometimes a particular trade, asset or property held by the business is transferred to the non-owner spouse. This can trigger CGT and SDLT considerations." },
  { title: "Maintenance funded by business income", desc: "Where capital offset isn't possible, ongoing spousal maintenance from the business owner's drawings or salary may form part of the picture. Reviewable if business income changes." },
];

const faqItems = [
  {
    question: "How is a private business valued in divorce?",
    answer: "Most cases use a single joint expert (SJE) — an independent forensic accountant agreed by both parties — to value the business. Common methods include earnings multiples (EBITDA × multiple), discounted cash flow, and net asset value, depending on the type of business. The valuation also typically considers liquidity (can value actually be extracted?) and tax (what would be left after extraction?).",
  },
  {
    question: "Will I have to sell the business to fund a settlement?",
    answer: "Often not. UK courts recognise that forced sale of a business can be destructive to both parties — and to employees and customers. The more common outcome is for the business owner to retain it and offset value through other assets, structured payments, or maintenance. Sale is usually a last resort.",
  },
  {
    question: "What about the director's loan account?",
    answer: "If you've drawn money from the company through a director's loan account, the balance is a personal liability owed to the company. This is typically a disclosable asset/liability on Form E and can affect both the personal balance sheet and the company valuation.",
  },
  {
    question: "Is a business started before the marriage non-matrimonial?",
    answer: "It depends. The pre-marital portion of the business may be argued as non-matrimonial, but growth during the marriage is normally matrimonial — particularly where the business is owner-operated and grew through that party's work. This is a heavily contested area and benefits from specialist advice.",
  },
  {
    question: "What if my spouse and I both work in the business?",
    answer: "This is much more complex. Both parties have a financial and operational stake in the business. Options range from one party buying out the other, to selling the business, to a structured separation of operations. Specialist family law and corporate advice is essential.",
  },
  {
    question: "How long does business valuation typically take?",
    answer: "A single joint expert valuation typically takes 8–16 weeks from instruction to final report. Complex businesses with international operations or multiple subsidiaries can take longer. Building this into the financial settlement timetable avoids surprises.",
  },
];

const relatedPages = [
  { title: "Self-Employed Divorce UK", description: "Companion guide for sole traders and partnerships.", href: "/self-employed-divorce-uk", badge: "Income" },
  { title: "Form E Financial Disclosure", description: "What disclosure is required for business interests.", href: "/form-e-financial-disclosure-uk", badge: "Disclosure" },
  { title: "Capital Gains Tax on Divorce", description: "CGT implications when transferring business interests.", href: "/capital-gains-tax-on-divorce-uk", badge: "Tax" },
  { title: "Preview the Full Financial Report", description: "Model business value scenarios in the modeller.", href: "/unlock", badge: "Report" },
];

export default function DivorceAndTheFamilyBusinessPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Divorce and the Family Business UK: Valuation, Splitting and Tax"
      subtitle="Where one or both spouses own a business, valuation and division become significantly more complex. Here's how the process typically works — and the options for resolving it without destroying the business."
      documentTitle="Divorce and the Family Business UK | DivorceCalculatorUK"
      metaDescription="How private businesses are valued and divided in UK divorce — single joint expert valuations, offsetting, structured payments, sale, and the tax implications."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Divorce and the Family Business UK", href: "/divorce-and-the-family-business-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Where the family business is one of the major matrimonial assets, valuing and dividing it is one of the most challenging aspects of any settlement. Unlike a pension or a property, business value is often illiquid, dependent on the owner's continued involvement, and uncertain. UK courts generally try to find solutions that preserve the business as a going concern while delivering fair value to both parties.
        </p>

        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">Business valuation in divorce is technical and almost always contested. A single joint expert (SJE) valuation is the norm. Specialist family law advice — and often forensic accounting input — is essential where a business is one of the main assets.</p>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">Approaches to Splitting Business Value</h2>
        <div className="space-y-4 mb-6">
          {approaches.map((a, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-start gap-2">
                  <Building2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{a.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{a.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Model Offset Scenarios Including Business Value" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">Figures to Capture in the Calculator</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {[
            "Estimated business value (range — best case, base case, worst case)",
            "Last 3 years' EBITDA or operating profit",
            "Net asset value of the business at the latest balance sheet",
            "Director's loan account balance (positive or negative)",
            "Each party's salary, dividends and benefits drawn from the business",
            "Any pre-marital value of the business if relevant",
            "Other matrimonial assets available for offset",
            "Estimated tax cost if value were extracted (CGT, BPR, dividend tax)",
          ].map((f, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border">
              <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {f}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mb-4">Common Pressure Points</h2>
        <div className="space-y-3 mb-6">
          {[
            { label: "Valuation range, not point estimate", desc: "Business valuations are inherently uncertain — particularly for SME owner-managed businesses. Treating a single number as definitive misrepresents the position. The negotiation should reflect a realistic range." },
            { label: "Liquidity vs paper value", desc: "A business may be 'worth' a large amount on paper but actually generate very limited cash for the owner. The court typically recognises this gap — fully extracting paper value can be impossible without selling." },
            { label: "Tax leakage on extraction", desc: "Extracting cash from a private company typically triggers tax — CGT on share sales, dividend tax on distributions, and so on. The other spouse's offset value may need to reflect this." },
            { label: "Disruption to the business itself", desc: "Drawn-out litigation, removal of the owner's focus, and the threat of forced sale can all damage the business itself. Alternative dispute resolution (mediation, arbitration, collaborative law) is often a better fit for business cases." },
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
            "The actual valuation a court would adopt — that requires expert evidence",
            "Whether forced sale of your business is a realistic outcome",
            "How tax would land on a particular extraction strategy",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>What's a realistic valuation range for our business?</li>
          <li>How should the pre-marital portion of the business be treated?</li>
          <li>What offset structures are realistic given our liquidity position?</li>
          <li>What tax planning is possible around the settlement?</li>
          <li>Is there a way to structure this that preserves the business for the next generation?</li>
        </ul>
        <InlineCTA label="Model the Settlement With a Range of Business Values" />
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
