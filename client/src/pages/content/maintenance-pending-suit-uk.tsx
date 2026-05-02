import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Wallet, AlertTriangle, CheckSquare, AlertCircle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const aspects = [
  { title: "Interim by nature", desc: "MPS is a temporary order designed to bridge the period between separation and the final settlement. It is replaced by the final spousal maintenance position once the financial settlement is concluded." },
  { title: "Need-based assessment", desc: "The court looks at the applicant's reasonable income needs against their own resources, and the paying party's ability to pay. The standard of living during the marriage is part of the picture." },
  { title: "Application made within divorce proceedings", desc: "MPS is applied for as part of the financial remedy proceedings. It can be sought at any point after the initial divorce application has been issued." },
  { title: "Quick to obtain compared with final orders", desc: "An interim hearing can typically be listed within a few weeks. Where there is genuine need and the paying party has clear ability to pay, agreed orders can sometimes be sealed even faster." },
  { title: "Includes legal services payment orders (LSPO)", desc: "In some cases, the court can also make an order requiring one party to fund the other's legal costs — known as a Legal Services Payment Order. This is separate from MPS but often discussed in the same hearing." },
  { title: "Reviewable", desc: "If circumstances change materially before the final settlement, either party can apply to vary the MPS amount." },
];

const faqItems = [
  {
    question: "What is maintenance pending suit?",
    answer: "Maintenance pending suit (MPS) is an interim spousal maintenance order made by the court while divorce proceedings are ongoing. It is designed to ensure that a financially weaker spouse can meet their reasonable living costs in the period between separation and the final financial settlement.",
  },
  {
    question: "How is MPS calculated?",
    answer: "There is no fixed formula. The court looks at the applicant's reasonable interim income needs (typically presented as a monthly budget), what resources they have to meet those needs themselves, and what the paying party can reasonably afford. The standard of living during the marriage is part of the analysis.",
  },
  {
    question: "How quickly can I get MPS?",
    answer: "Once an application is issued, an interim hearing can typically be listed within a few weeks. Where the paying party agrees an interim figure, an order can be sealed without a contested hearing — often within a matter of weeks. Genuinely urgent cases can be expedited.",
  },
  {
    question: "Is child maintenance included?",
    answer: "MPS is for spousal maintenance only. Child maintenance is normally handled separately through the Child Maintenance Service (CMS). However, MPS budgets are typically built on the basis that CMS payments are also being made, and the two are often discussed together in interim arrangements.",
  },
  {
    question: "Does MPS get repaid out of the final settlement?",
    answer: "MPS is interim income support, not a loan. It is not normally credited back against any capital settlement. However, the level of MPS paid is usually reflected in the final maintenance position once the substantive settlement is decided.",
  },
  {
    question: "What is a Legal Services Payment Order?",
    answer: "An LSPO is a separate court order under which one party can be required to fund the other's legal costs in the divorce proceedings. It is typically used where one party controls the assets and the other has no means of funding representation. It is technically separate from MPS but often dealt with in the same interim application.",
  },
];

const relatedPages = [
  { title: "Spousal Maintenance After Divorce", description: "How final spousal maintenance is calculated.", href: "/spousal-maintenance-after-divorce-uk", badge: "Maintenance" },
  { title: "How Much Maintenance After Divorce?", description: "Understanding the range of spousal maintenance outcomes.", href: "/how-much-maintenance-after-divorce-uk", badge: "Maintenance" },
  { title: "Financial Remedy Proceedings UK", description: "The court process within which MPS sits.", href: "/financial-remedy-proceedings-uk", badge: "Court" },
  { title: "Preview the Full Financial Report", description: "Model interim and final maintenance scenarios.", href: "/unlock", badge: "Report" },
];

export default function MaintenancePendingSuitPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Maintenance Pending Suit UK: Interim Income During Divorce"
      subtitle="Maintenance pending suit (MPS) is an interim spousal maintenance order that bridges the gap between separation and the final financial settlement. Here's how it works."
      documentTitle="Maintenance Pending Suit UK | DivorceCalculatorUK"
      metaDescription="A clear UK guide to maintenance pending suit (MPS) — what it is, how it's calculated, how quickly you can get one, and how it interacts with the final settlement."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Maintenance Pending Suit UK", href: "/maintenance-pending-suit-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          When a couple separates and one party has limited income of their own, there is often a long gap before the final financial settlement is reached. Maintenance pending suit (MPS) is the court's interim mechanism for ensuring that the financially weaker spouse can meet their reasonable living costs in the meantime. The order is intended to be temporary — typically replaced by the final spousal maintenance position when the financial settlement concludes.
        </p>

        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">MPS is need-based and varies enormously between cases. There is no formula. Specialist family law advice is essential when applying for or responding to an MPS application.</p>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">Key Features of MPS</h2>
        <div className="space-y-4 mb-6">
          {aspects.map((a, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-start gap-2">
                  <Wallet className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{a.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{a.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Model Interim and Final Maintenance Scenarios" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">Figures to Capture in the Calculator</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {[
            "Applicant's reasonable monthly income need (interim budget)",
            "Applicant's own income and resources available",
            "Paying party's gross monthly income (employment, self-employment, dividends)",
            "Paying party's reasonable own outgoings",
            "Paying party's surplus available after own outgoings",
            "Number and ages of dependent children (and CMS payments)",
            "Standard of living the family enjoyed during the marriage",
            "Estimated time to final financial settlement",
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
            { label: "Budget realism", desc: "Padding the interim budget to maximise the MPS award is common — and almost always counter-productive. The paying party's solicitors will scrutinise it line by line, and an inflated budget damages credibility on every other point." },
            { label: "Variable or unpredictable income", desc: "Where the paying party is self-employed, has variable bonus income, or controls a private company, the 'ability to pay' analysis becomes much harder. Disputes over historical drawings and lifestyle are common." },
            { label: "Length of separation before MPS", desc: "MPS is most powerful when applied for promptly. Long delays (e.g. months of struggling on inadequate income) make it harder to evidence the immediate need and can affect the level awarded." },
            { label: "Knock-on to final settlement", desc: "The MPS amount often influences the final spousal maintenance position. Setting MPS too high or too low can shape the substantive negotiation in unhelpful ways." },
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
            "The level of MPS a court would order in your specific circumstances",
            "Whether your particular income needs schedule will be accepted",
            "Whether you should also apply for a Legal Services Payment Order",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Should I apply for MPS in my situation, and how quickly?</li>
          <li>What's a realistic interim budget for my circumstances?</li>
          <li>Could I also seek a Legal Services Payment Order?</li>
          <li>How is MPS likely to interact with the final spousal maintenance position?</li>
          <li>What evidence should I gather before the interim hearing?</li>
        </ul>
        <InlineCTA label="Model Interim and Final Maintenance Scenarios" />
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
