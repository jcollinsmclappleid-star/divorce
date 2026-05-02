import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertTriangle, CheckSquare, AlertCircle, PiggyBank } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const points = [
  { title: "New State Pension is not directly shareable", desc: "Since 6 April 2016, the new State Pension is paid based on each person's own National Insurance record. It cannot be split or shared on divorce. Each former spouse keeps their own NI-based entitlement." },
  { title: "Old basic State Pension and SERPS/S2P", desc: "For people reaching State Pension Age before 6 April 2016, the old basic State Pension and additional pension (SERPS or State Second Pension) applied. Pension sharing was technically possible but rarely used in practice." },
  { title: "NI credits during marriage matter", desc: "Years out of paid work caring for children (Child Benefit recipients) usually qualify for NI credits. These count towards the State Pension. Both parties should check their NI record on gov.uk to confirm credits have been awarded." },
  { title: "State Pension forecasts are essential disclosure", desc: "Both parties should request State Pension forecasts from gov.uk during financial disclosure. The forecast shows expected weekly amount at State Pension Age and what extra contributions could increase it." },
  { title: "Topping up NI gaps", desc: "Where one party has gaps in their NI record (typically from career breaks or self-employment), voluntary Class 3 contributions may be available. As of 2026, the deadline to fill gaps from 2006 has passed; only the most recent six tax years can normally be backdated." },
  { title: "State Pension Age is rising", desc: "State Pension Age is currently 66 (rising to 67 between 2026 and 2028, and to 68 by 2046). For divorces in your 40s and 50s, the SPA you and your ex will reach is a critical date for retirement planning." },
];

const figures = [
  "State Pension forecast for each party from gov.uk",
  "National Insurance record showing qualifying years and gaps",
  "Dates of any HRP (Home Responsibilities Protection) credits",
  "Dates of any NI credits for caring or unemployment",
  "Dates of self-employment and Class 2 NI payments",
  "Whether either party has contracted out of SERPS/S2P historically",
  "Each party's State Pension Age",
  "Current age and time to SPA for each party",
];

const faqItems = [
  { question: "Can the State Pension be split in divorce?", answer: "The new State Pension (for those reaching SPA on or after 6 April 2016) cannot be shared. It is based entirely on each individual's own NI record. Pre-2016 additional State Pension (SERPS / S2P) could technically be shared, but in practice it is rarely the right approach." },
  { question: "What if my spouse stayed home with our children?", answer: "Years receiving Child Benefit usually entitle the recipient to National Insurance credits, which count towards the State Pension. The other party should check their NI record to ensure these credits were applied. Where Child Benefit was claimed in the higher earner's name, credits may need transferring." },
  { question: "Do I need a State Pension forecast for divorce?", answer: "Yes. Both parties should request forecasts from gov.uk as part of financial disclosure. The forecast shows the expected weekly amount at State Pension Age, NI gaps that could be filled, and the maximum amount achievable. It's essential context for assessing long-term retirement needs." },
  { question: "What happens to widow's benefits after divorce?", answer: "Once the final order (or pre-2022 decree absolute) is granted, you are no longer a spouse — so widow's benefits arising from the former spouse's NI record stop being available. This contrasts with bereavement during marriage, where bereavement support payments may apply." },
  { question: "Can I top up my National Insurance contributions to fix a gap?", answer: "Possibly. The standard rule is that voluntary Class 3 contributions can fill gaps for the last six tax years. Special concessions allowing back-payment to 2006 expired in April 2025. Check your NI record on gov.uk to see what gaps exist and what payments are available." },
  { question: "Should the State Pension affect our overall settlement?", answer: "Indirectly, yes. Although it cannot be shared, the State Pension is a major part of each party's retirement income. Settlement design — particularly capital and other pension shares — should account for differences in expected State Pension entitlement so both parties have adequate retirement income." },
];

const relatedPages = [
  { title: "Silver Divorce UK", description: "Financial planning for over-50s divorces.", href: "/silver-divorce-uk", badge: "Pensions" },
  { title: "CETV Explained Divorce UK", description: "Valuing the workplace pension.", href: "/cetv-explained-divorce-uk", badge: "Pensions" },
  { title: "Pension Sharing vs Offsetting UK", description: "Workplace pension sharing options.", href: "/pension-sharing-vs-offsetting-uk", badge: "Pensions" },
  { title: "Preview the Full Financial Report", description: "Model retirement income scenarios.", href: "/unlock", badge: "Report" },
];

export default function StatePensionDivorcePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="State Pension and Divorce UK — What Happens to Your Entitlement"
      subtitle="The new State Pension cannot be shared on divorce. But National Insurance credits during marriage, gaps in records, and forecasts all matter — especially for stay-at-home parents and silver divorces."
      documentTitle="State Pension and Divorce UK | DivorceCalculatorUK"
      metaDescription="State pension and divorce UK. Why the new State Pension can't be shared, how NI credits during marriage work, State Pension forecasts, and topping up gaps."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "State Pension and Divorce UK", href: "/state-pension-and-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Unlike workplace pensions, the new State Pension introduced on 6 April 2016 cannot be split or shared on divorce. Each party keeps their own State Pension based on their own National Insurance record. But that does not mean State Pension is irrelevant in divorce planning — far from it. Differences in NI records (often caused by years out of paid work raising children) can produce very different State Pension entitlements between former spouses, and these need to be factored into the overall settlement design.
        </p>
        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">If one party has substantially lower expected State Pension because of caring responsibilities during the marriage, the settlement design should compensate for this — typically by adjusting workplace pension shares, lump sums or maintenance. Ignoring it can leave one party with a significant retirement income shortfall.</p>
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
                  <PiggyBank className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{p.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Model Retirement Income Scenarios" />
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
            { label: "Inequality from caring years", desc: "Where one party gave up paid work to raise children, their State Pension may be substantially lower than the other party's. The overall settlement should typically compensate for this gap." },
            { label: "NI gaps that could be filled", desc: "Where someone has gaps in their NI record from years not working, voluntary contributions might be available to fill them. The cost is typically small relative to the lifetime State Pension uplift achieved." },
            { label: "Contracted-out periods", desc: "Many people in occupational schemes were 'contracted out' of SERPS/S2P at various points. This affected State Pension entitlement under the old rules and can still affect transitional protection under the new rules." },
            { label: "Differences in State Pension Age", desc: "For couples with significant age differences, one party may reach State Pension Age years before the other. This affects when each party's full retirement income kicks in and how interim arrangements should work." },
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
            "Whether voluntary NI contributions are worth making in your situation",
            "How much extra workplace pension share to take to compensate for State Pension differences",
            "Whether to claim State Pension at SPA or defer for an enhanced rate",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Have we both obtained State Pension forecasts and reviewed them together?</li>
          <li>Are there NI gaps that could be filled with voluntary contributions?</li>
          <li>Should the workplace pension share compensate for State Pension inequality?</li>
          <li>Are NI credits being properly attributed during caring years?</li>
          <li>What is the impact of differing State Pension Ages on our retirement plan?</li>
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
