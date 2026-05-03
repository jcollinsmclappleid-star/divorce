import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Scale, AlertCircle, CheckSquare, ExternalLink, Briefcase } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const factors = [
  { label: "The legal divorce and the financial settlement are separate", desc: "The divorce ends the marriage. The financial settlement decides how money, property and pensions are divided. You can complete the divorce yourself online via GOV.UK, but the financial settlement is a separate matter — and the area where most people benefit from professional input." },
  { label: "Without a consent order, financial claims stay open", desc: "An informal handshake agreement is not legally binding. Even after the final order ends the marriage, either party can in principle bring financial claims years later — including against assets acquired after divorce. Only a financial consent order sealed by the court closes those claims." },
  { label: "A solicitor is one of several routes — not the only one", desc: "Solicitor representation is the most expensive route. Family mediation (with a qualified mediator), collaborative law, arbitration, and one-off legal advice clinics are all alternatives. Many couples use a combination — for example, mediating the substance and instructing a solicitor only to draft the consent order." },
  { label: "Cost varies enormously by route", desc: "A solicitor-drafted consent order following an agreed mediated settlement may cost a few hundred to a couple of thousand pounds. A fully contested financial remedy case in court can cost tens of thousands per side. Costs are very fact-dependent and almost always proportionate to conflict, not to assets." },
  { label: "Free and low-cost help exists", desc: "Citizens Advice, MoneyHelper (Money and Pensions Service), Rights of Women, Resolution's free 'first interview' lists, and university law clinics all offer free or low-cost support. Family Mediation Voucher scheme (£500 contribution) may be available — see GOV.UK for current eligibility." },
];

const faqItems = [
  { question: "Do I legally need a solicitor for a financial settlement in the UK?", answer: "No — there is no legal requirement to use a solicitor. You can negotiate, mediate, and even draft a consent order yourself. However, the financial settlement is the area of divorce where mistakes have the biggest long-term cost — particularly with pensions and property — so most people benefit from at least some professional input." },
  { question: "What does a financial consent order cost?", answer: "The court fee for filing a consent order is currently £58 (check GOV.UK for the latest figure). Solicitor drafting fees vary widely — typically a few hundred pounds for a straightforward case to several thousand for complex ones. Many family law firms offer fixed-fee consent orders where the substance has been agreed via mediation." },
  { question: "Is mediation cheaper than using a solicitor?", answer: "Generally yes — mediation fees are usually shared between the parties and the process is faster than full solicitor-led negotiation or court proceedings. The Family Mediation Voucher scheme has provided up to £500 per family towards the cost of mediation; check GOV.UK for current eligibility. A first 'MIAM' (mediation information meeting) is required before applying to court for financial relief in most cases." },
  { question: "Can I just write our agreement down ourselves?", answer: "You can — but it will not be legally binding without a sealed consent order. A handwritten or solicitor-drafted private agreement (sometimes called a 'separation agreement') is persuasive evidence of intentions but does not bar future financial claims. Only a court-approved consent order achieves a clean break." },
  { question: "When is a solicitor genuinely essential?", answer: "Where there are significant pensions, business interests, complex assets, international elements, suspected hidden assets, or any element of coercion or domestic abuse, professional advice is strongly recommended. Where your spouse already has a solicitor, the balance of expertise becomes a real concern." },
  { question: "What's the cheapest safe route?", answer: "For amicable couples with modest, transparent assets: complete the divorce via GOV.UK; use mediation to agree the financial substance; instruct a solicitor on a fixed fee to draft and file a consent order. Total cost is typically a few hundred pounds for the divorce + mediation fees + a fixed fee for the order — far cheaper than separate solicitor representation throughout." },
];

const relatedPages = [
  { title: "DIY Divorce UK Cost", description: "Doing the divorce process yourself via GOV.UK.", href: "/diy-divorce-uk-cost", badge: "Process" },
  { title: "Mediation vs Court — Costs", description: "How mediated settlements typically compare with going to court.", href: "/mediation-vs-court-divorce-uk-costs", badge: "Costs" },
  { title: "What Is a Consent Order?", description: "Why an unapproved agreement is not legally binding.", href: "/what-is-a-consent-order-uk-divorce", badge: "Orders" },
  { title: "MIAM Mediation Information Meeting", description: "The required first step before applying to court for financial relief.", href: "/miam-mediation-information-assessment-uk", badge: "Mediation" },
];

export default function DoINeedSolicitorPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Do I Need a Solicitor for the Financial Settlement?"
      subtitle="There is no legal requirement to use a solicitor. The realistic question is which combination of mediator, solicitor, and DIY effort fits your situation and your budget."
      documentTitle="Do I Need a Solicitor for Divorce Financial Settlement UK | DivorceCalculatorUK"
      metaDescription="Do you need a solicitor for the financial settlement in a UK divorce? When DIY is realistic, when mediation is enough, and when professional advice is essential."
      relatedPages={relatedPages}
      breadcrumbs={[{ name: "Home", href: "/" }, { name: "Guides", href: "/divorce-financial-guides" }, { name: "Do I Need a Solicitor?", href: "/do-i-need-a-solicitor-for-financial-settlement-uk" }]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          The legal divorce process is now mostly online and self-service. The financial settlement is a separate matter — and where most divorcing couples ask whether they really need a solicitor. The honest answer is: not always for the substance, but almost always for the consent order.
        </p>
        <h2 className="text-2xl font-display font-bold mt-8 mb-4">Key things to weigh up</h2>
        <div className="space-y-3 mb-6">
          {factors.map((f, i) => (
            <div key={i} className="flex gap-3 p-4 rounded-lg border">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</div>
              <div>
                <p className="text-sm font-semibold mb-1">{f.label}</p>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <InlineCTA label="Model the Financial Side First" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">Three realistic routes</h2>
        <Card className="mb-6">
          <CardContent className="pt-5 space-y-3">
            <p className="text-sm font-semibold">A spectrum of options — pick the right point for your situation</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-primary" /><span><strong>Hybrid (most popular)</strong>: DIY divorce via GOV.UK + mediation for substance + fixed-fee solicitor for consent order. Total cost typically ~£1,000–£3,000 combined.</span></div>
              <div className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-primary" /><span><strong>Full solicitor representation (negotiated)</strong>: Both parties have solicitors who negotiate by correspondence. Typically £3,000–£10,000+ each side.</span></div>
              <div className="flex items-center gap-2"><Scale className="w-4 h-4 text-primary" /><span><strong>Contested financial remedy proceedings</strong>: Full court process. Typically £20,000–£100,000+ each side. Cost grows with conflict, not assets.</span></div>
            </div>
            <p className="text-xs text-muted-foreground">Indicative only. Actual costs vary widely by region, firm, and complexity.</p>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-6">When you really should take professional advice</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {["Significant pensions on either side", "Business interests, shares or self-employment income", "Property — particularly mortgaged or in negative equity", "International assets or one party living overseas", "Any disagreement about the value or extent of assets", "Suspected hidden assets or non-disclosure", "Any coercion, financial abuse, or domestic abuse", "Where your spouse already has solicitor representation"].map((fig, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border">
              <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {fig}
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">What the calculator cannot do for you</h2>
        <div className="space-y-3 mb-6">
          {["Draft or file a consent order", "Negotiate with your spouse on your behalf", "Predict what a court would order in your specific case"].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Official sources</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li><a className="underline hover:text-primary" href="https://www.gov.uk/money-property-when-relationship-ends" target="_blank" rel="noopener noreferrer">GOV.UK — Money and property when a relationship ends <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.gov.uk/looking-after-children-divorce/family-mediation" target="_blank" rel="noopener noreferrer">GOV.UK — Family mediation and the Mediation Voucher Scheme <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://solicitors.lawsociety.org.uk/" target="_blank" rel="noopener noreferrer">Law Society — Find a Solicitor <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.citizensadvice.org.uk/family/" target="_blank" rel="noopener noreferrer">Citizens Advice — Family <ExternalLink className="inline w-3 h-3" /></a></li>
        </ul>
        <p className="text-xs text-muted-foreground italic">General information only. Not legal advice. The right route depends on your individual circumstances — a one-off legal consultation is often a sensible first step.</p>
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
