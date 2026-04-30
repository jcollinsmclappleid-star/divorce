import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Scale, Gavel } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const faqItems = [
  {
    question: "Is an out-of-court settlement less legally binding than a court order?",
    answer: "Not once it becomes a consent order. An informal out-of-court agreement is not legally binding on its own. But once it is drawn up as a consent order and approved by the Family Court, it has exactly the same legal force as an order made after contested proceedings.",
  },
  {
    question: "Can I negotiate directly with my spouse without solicitors?",
    answer: "Yes — you can negotiate directly and then instruct a solicitor only to draft the consent order. This 'unbundled' approach can significantly reduce costs. However, you should take at least one round of legal advice before signing anything, to ensure the settlement is fair and legally sound.",
  },
  {
    question: "Will the court approve any settlement we agree on?",
    answer: "The court reviews consent orders but generally approves them unless the terms are manifestly unfair — for example, significantly disadvantaging one party without good reason. Courts give significant weight to the parties' own agreement and rarely reject properly drafted consent orders.",
  },
  {
    question: "Is going to court always a bad outcome?",
    answer: "Not necessarily — if there are hidden assets, significant disclosure battles, or if one party has no legitimate claim to most of the assets, court proceedings may be the right route. Courts have tools that are not available outside proceedings, including third-party disclosure orders and injunctions.",
  },
];

const relatedPages = [
  { title: "Mediation vs Court Divorce UK Costs", description: "The cost difference between mediation and contested court proceedings.", href: "/mediation-vs-court-divorce-uk-costs", badge: "Costs" },
  { title: "My Ex Doesn't Agree With the Settlement UK", description: "What happens when your ex won't agree and you need court involvement.", href: "/ex-doesnt-agree-settlement-uk", badge: "Process" },
  { title: "Financial Remedy Proceedings UK", description: "How the formal court process works from start to finish.", href: "/financial-remedy-proceedings-uk", badge: "Process" },
  { title: "Preview the Full Financial Report", description: "Model your settlement position before negotiating.", href: "/unlock", badge: "Report" },
];

export default function SettlingOutOfCourtPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Settling Out of Court vs Court Divorce UK: Pros, Cons, and Costs"
      subtitle="The vast majority of divorce financial settlements are agreed out of court — and for good reason. But court proceedings have their place. This is the clear comparison to help you decide which route is right for you."
      documentTitle="Settling Out of Court vs Court Divorce UK | DivorceCalculatorUK"
      metaDescription="Compare settling your divorce financial settlement out of court vs going through contested court proceedings in England and Wales — pros, cons, costs, and timelines."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Settling Out of Court vs Court Divorce UK", href: "/settling-out-of-court-vs-court-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Over 90% of divorce financial settlements in England and Wales are agreed by consent — without a judge making the decision. Out-of-court settlement is the norm, not the exception. But for some situations, court proceedings are necessary and even advantageous. Here is a clear comparison.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <Card className="border-green-200">
            <CardContent className="pt-5 space-y-3">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-green-600" />
                <p className="font-semibold text-sm text-green-700">Settling Out of Court</p>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="font-medium text-foreground">Advantages</p>
                  <ul className="text-muted-foreground space-y-1 list-disc list-inside ml-2">
                    <li>Significantly cheaper (£1,500–£10,000 vs £10,000–£100,000)</li>
                    <li>Much faster (2–6 months vs 12–24 months)</li>
                    <li>Both parties retain control over the outcome</li>
                    <li>Preserves a working relationship (important for co-parenting)</li>
                    <li>Private — proceedings are not public record</li>
                    <li>Less stressful and emotionally damaging</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-foreground">Disadvantages</p>
                  <ul className="text-muted-foreground space-y-1 list-disc list-inside ml-2">
                    <li>Requires both parties to engage in good faith</li>
                    <li>Cannot compel disclosure without court powers</li>
                    <li>No independent judicial check on fairness during the process</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-amber-200">
            <CardContent className="pt-5 space-y-3">
              <div className="flex items-center gap-2">
                <Gavel className="w-5 h-5 text-amber-600" />
                <p className="font-semibold text-sm text-amber-700">Court Proceedings</p>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="font-medium text-foreground">Advantages</p>
                  <ul className="text-muted-foreground space-y-1 list-disc list-inside ml-2">
                    <li>Courts can compel disclosure from all sources</li>
                    <li>Emergency orders (freezing, injunctions) available</li>
                    <li>Judge's FDR indication clarifies what is realistic</li>
                    <li>Definitive resolution if parties cannot agree</li>
                    <li>Expert evidence and valuations can be ordered</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-foreground">Disadvantages</p>
                  <ul className="text-muted-foreground space-y-1 list-disc list-inside ml-2">
                    <li>Very expensive — easily £20,000–£100,000+ per party</li>
                    <li>Slow — typically 18–24 months</li>
                    <li>Highly stressful and adversarial</li>
                    <li>Outcome determined by a judge (unpredictable)</li>
                    <li>Damages ongoing co-parenting relationship</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">The Smart Approach: Hybrid</h2>
        <p className="text-muted-foreground text-sm mb-4">Many people start with out-of-court negotiations and only escalate to court if necessary. Even once proceedings have started, the FDR hearing is specifically designed to produce settlement. Cases can and do settle 'at the door of the court' on the day of a final hearing — avoiding the full cost of the trial.</p>
        <p className="text-sm text-muted-foreground mb-4">Understanding what a reasonable settlement looks like before entering any negotiation is key to making this strategy work. If you know your realistic range — and so does your ex — positions tend to converge.</p>
        <p className="text-sm text-muted-foreground mb-6">In England and Wales, filing Form A (starting proceedings) does not commit you to a fully contested trial. It opens the door to the court's structured process and, crucially, to the judge's FDR indication — a powerful catalyst for settlement.</p>
        <InlineCTA label="Model What a Reasonable Settlement Looks Like" />
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
