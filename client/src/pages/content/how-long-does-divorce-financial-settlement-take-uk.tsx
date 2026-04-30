import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Clock, AlertTriangle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const timelines = [
  { route: "Agreed by consent (mediation/negotiation)", min: "2–3 months", max: "6 months", desc: "Fastest route. Both parties agree, solicitor drafts consent order, court approves." },
  { route: "Court proceedings — settling at FDR", min: "8 months", max: "14 months", desc: "File Form A, attend FDA and FDR hearings, settle at or after FDR." },
  { route: "Court proceedings — full final hearing", min: "18 months", max: "30+ months", desc: "All three hearings completed. Complex cases and court backlogs can extend this." },
];

const faqItems = [
  {
    question: "What causes delays in the financial settlement process?",
    answer: "Common causes of delay: court backlogs (particularly post-COVID), one party failing to provide disclosure documents, disputed property or business valuations requiring expert reports, complex pension matters, and deliberate delay tactics by one party. Delays in court proceedings can sometimes be sanctioned with cost orders.",
  },
  {
    question: "Can financial settlement be agreed before the divorce is finalised?",
    answer: "Yes — the financial settlement and the divorce itself are separate processes. Financial matters can be agreed and a consent order can be submitted while the divorce is still in progress. Many couples resolve finances before or at the same time as the conditional order (formerly Decree Nisi) stage.",
  },
  {
    question: "Does living together during the divorce affect the timeline?",
    answer: "Living together does not affect the legal timeline, but it can complicate negotiations and increase stress. If you are planning a court application, check whether property values, income, and circumstances need to be documented from the point of separation rather than from when you physically separated households.",
  },
  {
    question: "Can I make financial arrangements temporary while waiting for the full settlement?",
    answer: "Yes — you can apply for 'maintenance pending suit' (temporary maintenance) before the full settlement is agreed. You can also agree interim arrangements informally, such as who pays the mortgage and bills during proceedings. These do not prejudice the final outcome.",
  },
];

const relatedPages = [
  { title: "Timeline of Divorce and Financial Settlement UK", description: "The full timeline from separation to final order.", href: "/timeline-of-divorce-and-financial-settlement-uk", badge: "Process" },
  { title: "Financial Remedy Proceedings UK", description: "How the three-stage court process works in detail.", href: "/financial-remedy-proceedings-uk", badge: "Process" },
  { title: "Settling Out of Court vs Court Divorce UK", description: "The pros and cons of each route including timelines.", href: "/settling-out-of-court-vs-court-divorce-uk", badge: "Process" },
  { title: "Preview the Full Financial Report", description: "Understand your financial position at every stage.", href: "/unlock", badge: "Report" },
];

export default function HowLongFinancialSettlementPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="How Long Does a Divorce Financial Settlement Take UK?"
      subtitle="The timeline varies enormously — from 3 months for a simple agreed settlement to 2+ years for a fully contested case. The route you choose has the biggest impact on how long it takes and how much it costs."
      documentTitle="How Long Does Divorce Financial Settlement Take UK? | DivorceCalculatorUK"
      metaDescription="Understand how long a divorce financial settlement takes in England and Wales — typical timelines for agreed, FDR, and contested cases with court backlogs."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "How Long Does Divorce Financial Settlement Take UK?", href: "/how-long-does-divorce-financial-settlement-take-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          The time it takes to reach a final divorce financial settlement in England and Wales depends on three main factors: whether both parties can agree (and how quickly), the complexity of the assets, and the route taken. A straightforward agreed settlement can be finalised in 3–6 months. A fully contested case going to a final hearing can take over two years.
        </p>

        <h2 className="text-2xl font-display font-bold mt-8 mb-4">Typical Timelines by Route</h2>
        <div className="space-y-4 mb-6">
          {timelines.map((t, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <p className="text-sm font-semibold">{t.route}</p>
                </div>
                <div className="flex gap-4">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Minimum</p>
                    <p className="text-sm font-medium text-green-700">{t.min}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Maximum</p>
                    <p className="text-sm font-medium text-amber-700">{t.max}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{t.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">The Impact of Court Backlogs</h2>
        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">Family courts in England and Wales have significant backlogs following the COVID-19 pandemic and ongoing resource pressures. First hearings that would previously have been listed within 12–16 weeks may now take 6 months or more. Final hearings in complex cases are similarly delayed. This makes agreed settlement — without court proceedings — even more attractive from a timeline perspective.</p>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">How to Speed Up the Process</h2>
        <div className="space-y-3 mb-6">
          {[
            "Prepare full financial disclosure before opening negotiations — having everything ready reduces back-and-forth",
            "Use a divorce financial modeller to understand your realistic range before negotiations — this reduces the number of proposals and counter-proposals",
            "Attend mediation rather than solicitor-based negotiations where possible",
            "Respond promptly to all requests for information and documents",
            "Agree a valuation method for the property early — disputed valuations are a major source of delay",
            "If one party is being deliberately obstructive, apply to court quickly rather than allowing months of informal delay",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</div>
              {item}
            </div>
          ))}
        </div>
        <InlineCTA label="Prepare Your Figures to Speed Up Negotiations" />
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
