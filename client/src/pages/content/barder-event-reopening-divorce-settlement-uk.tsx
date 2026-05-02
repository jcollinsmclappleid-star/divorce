import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertTriangle, CheckSquare, AlertCircle, Scale } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const points = [
  { title: "Barder is a narrow exception to finality", desc: "The general rule in UK divorce is that financial orders are final. The Barder principle (from Barder v Barder 1988) is a narrow exception allowing reopening where a 'new event' undermines the basis of the order." },
  { title: "Four conditions must all be met", desc: "(1) The new event invalidates the basis of the order; (2) the event happened within a relatively short time (typically months) of the order; (3) the application to set aside is made promptly; and (4) third party interests are not unfairly prejudiced." },
  { title: "Death is the classic Barder event", desc: "The death of one party shortly after a settlement based on assumed life expectancy is the textbook Barder situation. Where the order's basis (e.g. spousal maintenance for life, future earnings assumptions) is materially undermined, reopening may be possible." },
  { title: "Market crashes are usually not Barder events", desc: "Movements in property values, share prices or pension values are normally treated as 'natural processes of price fluctuation' — not Barder events. Even substantial losses don't usually justify reopening. The Myerson case (2009) confirmed this even after the 2008 crash." },
  { title: "Cohabitation or remarriage of the receiving party", desc: "Where a settlement was based on the receiving party not being in a new relationship and they immediately enter one, this can sometimes (but not always) qualify as a Barder event. The key question is whether the new relationship was foreseeable at the time of the order." },
  { title: "Time is short — months not years", desc: "Set-aside applications must be made promptly. Delay is fatal. The longer the gap between the new event and the application, the less likely set-aside will be granted." },
];

const figures = [
  "The original sealed financial order",
  "Date of the order and date of the new event",
  "Evidence of the new event (death certificate, valuation evidence, etc.)",
  "Schedule of how the order's basis is undermined",
  "Evidence of prompt application after the event",
  "Third party interests potentially affected (new spouses, lenders)",
  "Updated asset position to demonstrate the changed circumstances",
  "Counsel's opinion on Barder prospects",
];

const faqItems = [
  { question: "What is a Barder event?", answer: "A 'new event' that undermines the fundamental basis of a divorce financial order, justifying its set-aside. The principle comes from Barder v Barder (1988) where the wife killed herself and the children shortly after the order. The court held that the order's basis (providing for the wife and children) had been so fundamentally undermined that the order could be set aside." },
  { question: "Can I reopen my settlement because asset values have fallen?", answer: "Almost certainly no. Movements in property prices, share prices, pension values or business values are treated as 'natural processes of price fluctuation' — not Barder events. Even substantial losses (such as the 2008 financial crisis) have repeatedly been held not to justify reopening. The Myerson case (2009) is the leading authority." },
  { question: "Can I reopen if my ex remarried immediately?", answer: "Sometimes. If the settlement was substantially based on the receiving party's continued single status (e.g. spousal maintenance, housing provision) and they enter a new relationship that was already in prospect at the time of the order, this can qualify as a Barder event. If the new relationship was unforeseeable, set-aside is more likely." },
  { question: "How long do I have to apply to set aside?", answer: "There is no strict time limit, but applications must be made 'promptly' — typically within months of the new event, not years. Delay is one of the four Barder conditions and is regularly fatal to applications. If a Barder-type event has occurred, get specialist legal advice immediately." },
  { question: "What if the new event was foreseeable?", answer: "Foreseeable events do not qualify as Barder events. The courts have consistently held that the parties take the risk of foreseeable changes in circumstances when entering a settlement. Only genuinely unforeseeable events that undermine the order's basis can support set-aside." },
  { question: "Are Barder applications often successful?", answer: "Successful Barder applications are rare. The four conditions are stringent and the courts apply them strictly to protect finality. The vast majority of attempts to reopen financial orders fail. Specialist senior counsel input is normally essential before any application is made." },
];

const relatedPages = [
  { title: "What is a Consent Order UK Divorce?", description: "How financial orders become final.", href: "/what-is-a-consent-order-uk-divorce", badge: "Order" },
  { title: "Financial Remedy Proceedings UK", description: "The court process behind financial orders.", href: "/financial-remedy-proceedings-uk", badge: "Process" },
  { title: "Decree Absolute vs Final Order UK", description: "Why timing of the final order matters.", href: "/decree-absolute-vs-final-order-uk", badge: "Process" },
  { title: "Preview the Full Financial Report", description: "Model your settlement scenarios.", href: "/unlock", badge: "Report" },
];

export default function BarderPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Barder Event — Reopening a Divorce Settlement UK"
      subtitle="Divorce financial orders are normally final. The Barder principle allows reopening only where a new event undermines the order's basis — within a short period — and the application is made promptly. Successful applications are rare."
      documentTitle="Barder Event Reopening Divorce Settlement UK | DivorceCalculatorUK"
      metaDescription="Barder event UK explained. The narrow exception to finality of divorce financial orders, four conditions, death as classic event, why market crashes don't qualify, and how to apply."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Barder Event UK", href: "/barder-event-reopening-divorce-settlement-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          UK divorce financial orders are normally final. The courts protect finality strongly because parties need certainty to rebuild their lives. The Barder principle (from Barder v Barder, 1988) is one of the very few exceptions — allowing a sealed order to be set aside where a 'new event' has fundamentally undermined the basis on which the order was made. All four Barder conditions must be met, and successful applications are rare. Movements in asset values almost never qualify, even substantial ones.
        </p>
        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">If you believe a Barder-type event has occurred, time is critical. Specialist legal advice should be sought within weeks, not months. Delay is one of the four Barder conditions and is regularly fatal to set-aside applications.</p>
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
        <InlineCTA label="Review Your Settlement Position" />
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
            { label: "Foreseeability", desc: "If the change of circumstances was foreseeable when the order was made, it cannot be a Barder event. Parties take the risk of foreseeable changes in entering a settlement. Only genuinely unforeseeable events qualify." },
            { label: "Promptness of application", desc: "Even genuine Barder events fail if the application is delayed. Months is the typical outer limit. Where a Barder-type event has occurred, immediate legal advice is essential." },
            { label: "Third party interests", desc: "Where third parties (new spouses, lenders, beneficiaries) have rearranged their affairs in reliance on the order, set-aside is harder to justify. The court balances reopening against the disruption to others." },
            { label: "Cost and risk of failed Barder applications", desc: "Set-aside applications are expensive and often fail. The losing party typically faces a substantial costs award. Counsel's opinion on prospects should be obtained before any application is launched." },
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
            "Whether the change in your circumstances meets the Barder conditions",
            "Whether the event was foreseeable when the order was made",
            "Your prospects on a contested set-aside application",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Does this event meet the four Barder conditions?</li>
          <li>Was the change of circumstances foreseeable at the time of the order?</li>
          <li>Are we within the time window for a set-aside application?</li>
          <li>What are the cost and risk implications of applying?</li>
          <li>Are there alternative routes (variation, enforcement) more appropriate?</li>
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
