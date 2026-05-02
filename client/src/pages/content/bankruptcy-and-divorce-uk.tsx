import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertTriangle, CheckSquare, AlertCircle, Scale } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const points = [
  { title: "Bankruptcy of either party complicates everything", desc: "Where one spouse becomes bankrupt during or shortly after divorce, much of their estate vests in the trustee in bankruptcy. The trustee — not the bankrupt party — controls those assets and may pursue creditors' interests over the divorce settlement." },
  { title: "Property transfers can be reversed", desc: "Property transfers from a bankrupt party in the period before bankruptcy can be set aside as 'transactions at an undervalue' (under section 339 Insolvency Act 1986). The look-back period is up to five years where the transferee was an associate (e.g. spouse)." },
  { title: "Pre-bankruptcy settlements at risk", desc: "A divorce settlement made shortly before one party's bankruptcy can be challenged by the trustee. The receiving spouse may have to give back assets received if the transfer was at an undervalue and the bankrupt was insolvent at the time or rendered so by the transfer." },
  { title: "Pension protection", desc: "Pensions in approved schemes are generally protected from the trustee in bankruptcy under section 11 Welfare Reform and Pensions Act 1999. This protection extends to most occupational and personal pensions, providing critical post-bankruptcy security." },
  { title: "Joint property and the family home", desc: "The bankrupt's share of jointly-owned property vests in the trustee, who may apply to court for sale. The non-bankrupt spouse can sometimes buy out the trustee's interest. After 12 months from bankruptcy, the trustee's interest in the family home may revert if no sale has been pursued." },
  { title: "Maintenance is not generally provable", desc: "Periodical maintenance payments to a former spouse are usually not provable in the bankruptcy. They continue regardless of the bankruptcy. Lump sum and property orders, however, are different — they can be partly written off in the bankruptcy if not yet paid." },
];

const figures = [
  "Date of any bankruptcy petition or order",
  "Date of any prior divorce settlement or transfer",
  "Schedule of all property transfers in the past 5 years",
  "Solvency position of the transferring spouse at the time of each transfer",
  "Pension scheme details (to confirm protection from creditors)",
  "Joint property valuations (for trustee's interest assessment)",
  "Maintenance order details (lump sum vs periodical)",
  "Any IVA or Debt Relief Order in prospect (alternatives to bankruptcy)",
];

const faqItems = [
  { question: "What happens to a divorce settlement if my ex goes bankrupt?", answer: "Most assets in the bankrupt party's name vest in the trustee in bankruptcy. The trustee then administers them for the benefit of creditors. Property transfers made to you in the period before bankruptcy can be challenged as 'transactions at an undervalue' under section 339 Insolvency Act 1986 — and potentially reversed. Pension benefits in approved schemes are generally protected." },
  { question: "How long can the trustee look back at past transfers?", answer: "The standard look-back period for transactions at an undervalue is two years before the bankruptcy petition. Where the transferee is an 'associate' of the bankrupt (which includes a spouse, ex-spouse, and various family relationships), the look-back extends to five years if the bankrupt was insolvent at the time of transfer or made insolvent by it." },
  { question: "Can my ex's bankruptcy take the family home?", answer: "Possibly. The bankrupt's share vests in the trustee, who can apply for sale of jointly-owned property. The non-bankrupt spouse may be able to buy out the trustee's interest. Special rules apply to the family home: after 12 months from bankruptcy, the trustee's interest may revert to the bankrupt if no sale has been pursued (the 'use it or lose it' rule under section 283A Insolvency Act 1986)." },
  { question: "Are pensions protected in bankruptcy?", answer: "Generally yes. Approved pension schemes (most workplace pensions, SIPPs, personal pensions) are protected from the trustee under section 11 Welfare Reform and Pensions Act 1999. This means even after bankruptcy the bankrupt party retains their pension. However, very large pension contributions made shortly before bankruptcy can sometimes be challenged as 'excessive contributions'." },
  { question: "Should I file for divorce before or after my ex's likely bankruptcy?", answer: "There is no easy answer — both timing routes have risks. Settling before a likely bankruptcy can be challenged as a transaction at undervalue. Settling after means the assets are largely controlled by the trustee. Specialist legal input from both family law and insolvency law professionals is essential where bankruptcy is in prospect on either side." },
  { question: "Does maintenance stop if my ex is bankrupt?", answer: "Periodical maintenance generally continues — it is paid out of post-bankruptcy income, not out of the assets that vested in the trustee. The court can vary maintenance to reflect changed circumstances if needed. Lump sum or capital orders that were unpaid at bankruptcy may be largely written off, leaving the receiving party as an unsecured creditor in the bankruptcy." },
];

const relatedPages = [
  { title: "What Happens to Debts in Divorce UK?", description: "Debts and liabilities at separation.", href: "/what-happens-to-debts-in-divorce-uk", badge: "Debts" },
  { title: "Financial Disclosure Divorce UK", description: "Disclosure obligations including debt position.", href: "/financial-disclosure-divorce-uk", badge: "Disclosure" },
  { title: "Force Sale of House After Divorce UK", description: "When property must be sold.", href: "/can-i-force-sale-of-house-after-divorce-uk", badge: "Property" },
  { title: "Preview the Full Financial Report", description: "Model insolvency-aware scenarios.", href: "/unlock", badge: "Report" },
];

export default function BankruptcyDivorcePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Bankruptcy and Divorce UK — How Insolvency Disrupts a Settlement"
      subtitle="Bankruptcy of either party in or near a divorce raises complex issues: trustee control of assets, transactions at undervalue, family home sale, and pension protection. Specialist insolvency and family law input is normally essential."
      documentTitle="Bankruptcy and Divorce UK | DivorceCalculatorUK"
      metaDescription="Bankruptcy and divorce UK explained. Trustee in bankruptcy, transactions at undervalue, family home, pension protection, maintenance and divorce settlements where insolvency is in prospect."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Bankruptcy and Divorce UK", href: "/bankruptcy-and-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Bankruptcy of either party in or near a divorce dramatically complicates the settlement. The trustee in bankruptcy takes control of the bankrupt's estate, can challenge prior transfers to the other spouse as 'transactions at an undervalue', and may force sale of jointly-owned property. Pensions are largely protected. Periodical maintenance is generally unaffected, but capital orders can be written off. Where bankruptcy is in prospect on either side, the case becomes one of the most legally complex types of divorce — requiring specialist input from both family law and insolvency law professionals.
        </p>
        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">A divorce settlement made shortly before one party's bankruptcy can be substantially undone by the trustee. The look-back period for transactions at undervalue between spouses extends to five years. Where bankruptcy is foreseeable, do not proceed without specialist insolvency law advice alongside family law input.</p>
          </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">Six Things You Need to Know</h2>
        <div className="space-y-4 mb-6">
          {points.map((p, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-start gap-2">
                  <Scale className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{p.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Model Insolvency-Aware Scenarios" />
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
            { label: "Trustee challenges to past transfers", desc: "Property transferred to a spouse in the years before bankruptcy can be reversed as a transaction at undervalue. The receiving spouse may have to give the property back even years after the divorce." },
            { label: "Family home sale", desc: "The bankrupt's share vests in the trustee, who can apply for sale of the property. The non-bankrupt spouse may be able to negotiate a buyout but is often financially constrained." },
            { label: "Pension treatment", desc: "Most pensions are protected — but very large recent contributions may be challenged as 'excessive contributions'. The protection assumes a normal pattern of saving, not last-minute asset shielding." },
            { label: "Capital orders becoming unsecured debts", desc: "An unpaid lump sum or property adjustment order can be largely written off in the paying party's bankruptcy. The receiving party becomes an unsecured creditor for any unpaid amount, typically recovering little." },
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
            "Whether a past transfer to you can be challenged by a future trustee",
            "How to time settlement against a foreseeable bankruptcy",
            "Whether to pursue an IVA or Debt Relief Order as an alternative",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>How does the prospect of bankruptcy affect timing of our settlement?</li>
          <li>Are past transfers vulnerable to trustee challenge?</li>
          <li>Should we have separate insolvency law input alongside family law?</li>
          <li>What pension protections actually apply in our circumstances?</li>
          <li>Are there alternatives to bankruptcy (IVA, DRO) that preserve more of the settlement?</li>
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
