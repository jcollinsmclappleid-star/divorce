import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertTriangle, CheckSquare, AlertCircle, Briefcase } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const points = [
  { title: "Shares are matrimonial assets", desc: "Shares in a limited company — whether the family business, a personal services company or a private investment vehicle — form part of the matrimonial pot. Their value must be disclosed and (where appropriate) divided." },
  { title: "Valuation is the key challenge", desc: "Unlike listed shares, private company shares have no market price. A forensic accountant valuation is normally needed for any substantial shareholding. Methods include maintainable earnings (EBITDA multiple), net asset value, and discounted cash flow." },
  { title: "Liquidity vs paper value", desc: "A £2m business may not yield £2m in cash without selling, breaking up or borrowing against the business. Settlement structures often need to bridge the gap with deferred payments, share transfers, or offset against other matrimonial assets." },
  { title: "Minority discounts", desc: "Where the divorcing party holds a minority stake (especially under 25%), valuation often applies a minority discount reflecting the lack of control and difficulty selling. The size of the discount is frequently disputed." },
  { title: "Pre-marital and family-origin shares", desc: "Shares acquired before the marriage or inherited within the family business may have non-matrimonial character. Mingling, growth during the marriage, and contribution to value-building can all dilute the non-matrimonial argument." },
  { title: "Tax structuring matters", desc: "Transfers of shares between spouses on divorce can attract CGT, BADR (formerly Entrepreneurs' Relief) considerations, employment tax issues for owner-managers and dividend tax planning. Specialist tax input is normally essential." },
];

const figures = [
  "Latest filed accounts and management accounts",
  "Three to five years of accounts plus tax returns",
  "Shareholder register and articles of association",
  "Forensic accountant valuation report (where instructed)",
  "Dividend history (last 5 years) and director's loan account",
  "Any shareholder agreements or restrictions on transfer",
  "Customer concentration and recurring revenue analysis",
  "Any pending or recent corporate transactions (M&A, fundraising)",
];

const faqItems = [
  { question: "How are limited company shares valued in divorce?", answer: "By forensic accountant valuation. Common methods include applying a multiple to maintainable earnings (typically EBITDA × 4–8 for owner-managed businesses), net asset value, or discounted cash flow. The right method depends on the company's stage, sector and revenue model. Valuations need to be defensible and based on the specific facts of the company." },
  { question: "Can I keep my business and pay my ex out of other assets?", answer: "Yes — this is the most common approach where the business is the family's main asset. The non-business spouse takes a larger share of the house, pension, savings and other liquid assets to balance the value of the business retained. Liquidity is usually the constraint — large businesses often require deferred payments." },
  { question: "What if the business is illiquid?", answer: "Several settlement structures address illiquidity: deferred lump sums (paid over 2–5 years from business cash flow), promissory notes, share transfers to the non-business spouse (with shareholder agreement protections), or earn-out style payments tied to future business performance. Each has tax and risk implications." },
  { question: "Are shares I owned before marriage protected?", answer: "Pre-marital shares may have non-matrimonial character, but this rarely fully ringfences them in long marriages. Growth during the marriage, dividends used to support family lifestyle, and effort by either spouse to build value all dilute the non-matrimonial argument. The Court has wide discretion under Section 25." },
  { question: "What about a personal services company (PSC) used for IR35 contracting?", answer: "PSCs are matrimonial assets. Their value is typically modest (often just the retained profits in the company) but the income generated is highly relevant to maintenance assessment. Disclosure should include retained earnings, dividends taken, and salary/dividend mix." },
  { question: "How do shareholder agreements affect divorce?", answer: "Shareholder agreements typically restrict who can hold shares (often family members or employees only). This can prevent direct transfer of shares to the non-business spouse and force a different settlement structure — typically offset against other assets or deferred lump sums from the business." },
];

const relatedPages = [
  { title: "Divorce and the Family Business UK", description: "How family-owned businesses are handled.", href: "/divorce-and-the-family-business-uk", badge: "Business" },
  { title: "Self-Employed Divorce UK", description: "Income disclosure for variable earners.", href: "/self-employed-divorce-uk", badge: "Income" },
  { title: "Share Options and EMI on Divorce UK", description: "Employee share schemes and options.", href: "/share-options-and-emi-on-divorce-uk", badge: "Equity" },
  { title: "Preview the Full Financial Report", description: "Model business settlement scenarios.", href: "/unlock", badge: "Report" },
];

export default function LimitedCompanySharesPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Limited Company Shares on Divorce UK — Valuation, Liquidity and Tax"
      subtitle="Private company shares — from family businesses to personal services companies — need forensic valuation and creative settlement structuring. Liquidity is usually the constraint, and tax can decisively shape the outcome."
      documentTitle="Limited Company Shares on Divorce UK | DivorceCalculatorUK"
      metaDescription="Limited company shares on divorce UK. Forensic valuation, EBITDA multiples, minority discounts, liquidity constraints, deferred payments and tax structuring."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Limited Company Shares on Divorce UK", href: "/limited-company-shares-on-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Shares in a private limited company — whether a substantial family business, a tech start-up, or a one-person personal services company — are part of the matrimonial pot. They have to be disclosed, valued and (where appropriate) divided. The challenges are very different from listed shares: there is no market price, often limited liquidity, restrictions on who can own the shares, and substantial tax implications for any transfer or sale. Forensic accountancy and specialist tax advice are normally essential.
        </p>
        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">A 'paper value' settlement can fail at completion if there is no liquidity to pay it. The most common workable structure is to keep the business with the operating spouse, balanced by larger shares of the house, pensions and savings — plus deferred lump sums paid from business cash flow over 2–5 years.</p>
          </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">Six Defining Features</h2>
        <div className="space-y-4 mb-6">
          {points.map((p, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-start gap-2">
                  <Briefcase className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{p.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Model Business Settlement Scenarios" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">Information You Will Need</h2>
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
            { label: "Disputed valuation methods", desc: "Different forensic accountants can produce materially different valuations from the same accounts. Disagreement over EBITDA multiples, growth assumptions and minority discounts is common — and frequently the largest single dispute in HNW divorces." },
            { label: "Liquidity vs paper value", desc: "Even when valuation is agreed, extracting cash to pay a settlement is often the harder problem. Solutions include deferred lump sums, share transfers, third-party debt, and selling part of the business — each with downsides." },
            { label: "Minority discounts", desc: "Minority stakes in private companies attract discounts of 20–40% reflecting lack of control. Where one spouse is the controlling shareholder and the other a minority, the valuation discount can swing the matrimonial pot significantly." },
            { label: "Tax cost of distributions", desc: "Pulling cash out of the business to fund a settlement crystallises dividend tax (39.35% for higher-rate taxpayers above the £500 dividend allowance) or potentially corporation tax depending on structure. Factor this into 'cash available' calculations." },
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
            "What multiple should be applied to your specific business's earnings",
            "Whether minority discounts should apply and at what level",
            "How to structure deferred payments to bridge liquidity gaps",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Do we need a single joint forensic accountant or separate experts?</li>
          <li>What valuation methodology fits our specific business?</li>
          <li>How can we extract cash from the business tax-efficiently?</li>
          <li>Do shareholder agreements restrict who can hold the shares?</li>
          <li>What deferred payment structure could the business sustainably support?</li>
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
