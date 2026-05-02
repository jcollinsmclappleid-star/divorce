import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertTriangle, CheckSquare, AlertCircle, Scale } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const points = [
  { title: "TOLATA is for cohabitees, not married couples", desc: "The Trusts of Land and Appointment of Trustees Act 1996 is the main route for unmarried co-owners of property to resolve disputes about ownership and sale. Married couples use the Matrimonial Causes Act framework instead." },
  { title: "Two main applications", desc: "(1) An order for sale of jointly-owned property under section 14, and (2) a declaration of beneficial interest where the legal title doesn't reflect the parties' agreed shares (e.g. property in one name only but the other contributed financially)." },
  { title: "Constructive and resulting trusts", desc: "Where one party owns the property but the other claims an interest, they must establish a beneficial interest through trust law — typically common intention constructive trust (based on agreement and detrimental reliance) or resulting trust (based on direct financial contribution)." },
  { title: "Evidence-heavy and uncertain", desc: "TOLATA cases are evidence-intensive. The court considers what the parties intended, what was said, what was contributed, and the relationship's history. Outcomes are less predictable than divorce financial remedy proceedings." },
  { title: "Costs follow the event", desc: "Unlike family court proceedings (where the default is no order as to costs), TOLATA proceedings in the County Court generally follow the standard 'loser pays' costs rule. This makes TOLATA litigation expensive and risky." },
  { title: "Children's claims separately under Schedule 1", desc: "Where there are children of the relationship, additional financial provision can be sought under Schedule 1 of the Children Act 1989 — for the children's benefit, not the cohabiting parent's." },
];

const figures = [
  "Land Registry title showing legal ownership",
  "Any declaration of trust or written agreement",
  "Bank evidence of deposit and mortgage contributions",
  "Receipts for major capital improvements paid for",
  "Communications evidencing common intention (texts, emails)",
  "Evidence of detrimental reliance (giving up own home, paying bills)",
  "Children's details (for any Schedule 1 claim)",
  "Asset and income disclosure for any maintenance claims",
];

const faqItems = [
  { question: "What is a TOLATA claim?", answer: "A claim under the Trusts of Land and Appointment of Trustees Act 1996. It is the main route for unmarried co-owners of property to resolve disputes about ownership and sale. The court can order sale, declare beneficial interests, regulate occupation, and resolve issues between trustees and beneficiaries of land." },
  { question: "Can I claim an interest in property held in my partner's sole name?", answer: "Possibly — through a constructive trust (based on common intention plus detrimental reliance) or resulting trust (based on direct financial contributions). These are evidence-intensive arguments. Mere cohabitation, no matter how long, does not by itself create a beneficial interest. The bar is significantly higher than in divorce proceedings." },
  { question: "How is a TOLATA claim different from divorce financial remedy?", answer: "TOLATA is far more limited. The court can determine ownership and order sale but cannot redistribute assets between the parties as it can in divorce. There is no equivalent of the matrimonial 'sharing principle' or needs-based redistribution. Outcomes depend strictly on legal ownership, contributions and intention — not on fairness more broadly." },
  { question: "What does TOLATA litigation cost?", answer: "Typically £15,000–£60,000+ per side through to a contested trial. Costs follow the event in TOLATA proceedings (unlike family court), so the loser usually pays a substantial portion of the winner's costs as well as their own. This makes TOLATA risky and concentrates minds on early settlement." },
  { question: "Can I get an order for sale if my ex won't move out?", answer: "Yes. Under section 14 TOLATA, the court can order sale of jointly-owned property. Factors the court considers include the purpose for which the property was acquired, the welfare of any minor children, and the interests of any secured creditors. Sale is often delayed where children of the relationship still live there." },
  { question: "What if there are children of the relationship?", answer: "Children's claims are separate, under Schedule 1 of the Children Act 1989. These can include lump sums, periodical payments, settlement of property and transfer of property for the children's benefit. Schedule 1 claims are made by the children (through the parent), not by the cohabiting parent in their own right." },
];

const relatedPages = [
  { title: "Common Law Marriage UK Myth", description: "Why cohabitees have very limited rights.", href: "/common-law-marriage-uk-myth", badge: "Cohabitation" },
  { title: "Schedule 1 Children Act UK", description: "Financial provision for children of unmarried parents.", href: "/schedule-1-children-act-uk", badge: "Children" },
  { title: "Unmarried Separating House UK", description: "Property rights for cohabitees overall.", href: "/unmarried-separating-house-uk", badge: "Property" },
  { title: "Preview the Full Financial Report", description: "Model your finances at separation.", href: "/unlock", badge: "Report" },
];

export default function TolataPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="TOLATA Claim Cohabitation UK — Property Disputes Between Unmarried Partners"
      subtitle="The Trusts of Land and Appointment of Trustees Act 1996 is the main route for cohabitees to resolve property ownership and sale disputes. It is evidence-heavy, uncertain, and far more limited than divorce financial remedy."
      documentTitle="TOLATA Claim Cohabitation UK | DivorceCalculatorUK"
      metaDescription="TOLATA claim cohabitation UK explained. Section 14 sale orders, constructive and resulting trusts, beneficial interests, costs follow the event, and how TOLATA differs from divorce."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "TOLATA Claim Cohabitation UK", href: "/tolata-claim-cohabitation-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          The Trusts of Land and Appointment of Trustees Act 1996 (TOLATA) is the main route for unmarried co-owners to resolve disputes about property — typically when a cohabiting relationship breaks down. TOLATA is far more limited than the divorce financial remedy framework: it determines who owns what and whether the property should be sold, but it cannot redistribute assets between parties on the basis of fairness or need. For couples without marriage, this often produces hard outcomes.
        </p>
        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">TOLATA proceedings are run in the County Court and costs follow the event — meaning the losing party usually pays a substantial portion of the winner's costs. This makes TOLATA significantly more financially risky than family court proceedings, and concentrates minds on early settlement.</p>
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
        <InlineCTA label="Model Property Settlement Scenarios" />
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
            { label: "Evidence of intention", desc: "Constructive trust claims need evidence of common intention — what was said, when, and what action was taken in reliance on it. Years later, this evidence is often patchy or contested." },
            { label: "Cost exposure", desc: "Loser-pays costs make TOLATA proceedings risky. A weak claim that fails can result in liability for the other side's costs in addition to your own — often six figures combined." },
            { label: "Limited remedies", desc: "Even a successful TOLATA claim does not produce the kind of broad redistribution available in divorce. The court can declare interests and order sale but cannot transfer property as 'fair' between the parties." },
            { label: "Children complicating sale orders", desc: "Where children of the relationship still live in the property, the court is reluctant to order immediate sale. Delayed sale orders or occupation arrangements until the youngest child reaches majority are sometimes used." },
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
            "Whether you can establish a beneficial interest through trust law",
            "What costs exposure your case carries if it fails",
            "Whether you should bring a Schedule 1 claim alongside TOLATA",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Do I have a viable beneficial interest claim under trust law?</li>
          <li>What evidence supports common intention in our case?</li>
          <li>What is my realistic cost exposure if the claim fails?</li>
          <li>Should we bring a Schedule 1 claim for the children alongside?</li>
          <li>Is mediation worth trying before issuing TOLATA proceedings?</li>
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
