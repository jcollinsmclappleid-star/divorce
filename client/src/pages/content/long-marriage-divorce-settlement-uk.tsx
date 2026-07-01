import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Clock, AlertTriangle, CheckSquare, AlertCircle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const principles = [
  { title: "Equal sharing as the starting point", desc: "In long marriages, equal sharing of matrimonial assets is the established starting point — established by the House of Lords in White v White (2000) and reinforced in subsequent cases. Departures from equality require a good reason." },
  { title: "All matrimonial assets are in the pot", desc: "Wealth built during a long marriage — whether in one party's name or another's — is treated as the joint product of the partnership. This includes pensions, businesses, savings, and the home." },
  { title: "Pre-marital wealth often blurs into the pot", desc: "The longer the marriage, the harder it can be to treat pre-marital assets separately. Inherited assets used for the family, or pre-marital homes that became the family home, need careful evidence and advice after long periods." },
  { title: "Pension equalisation is central", desc: "Long marriages often involve substantial pension build-up, sometimes unevenly distributed between the parties. Pension sharing or offsetting may be one of the largest issues to review." },
  { title: "Spousal maintenance may need review", desc: "Where one party has reduced earning capacity after a long career break — often the parent who took on caring responsibilities — maintenance assumptions need case-specific advice." },
  { title: "Compensation principle may apply", desc: "Where one party gave up a clear career path to support the family, compensation principles can come into play — recognising that the future earnings sacrifice was made for the partnership." },
];

const figures = [
  "Date of marriage and date of separation",
  "Total value of property, including the family home",
  "Cash Equivalent Transfer Value (CETV) of every pension, both parties",
  "Savings, ISAs and investment accounts",
  "Business interests and shareholdings",
  "Total joint and individual liabilities (mortgage, loans, cards)",
  "Each party's current and recent earnings",
  "Each party's earning capacity going forward",
];

const faqItems = [
  {
    question: "How long is a 'long' marriage in UK divorce?",
    answer: "Marriages of 15 years or more are typically treated as long, with cases of 10–15 years often falling somewhere in between. The longer the marriage, the more strongly the equal sharing principle applies and the more difficult it becomes to keep pre-marital wealth separate from the matrimonial pot.",
  },
  {
    question: "Is the asset split always 50/50 in a long marriage?",
    answer: "No. Equal sharing can be an important reference point, not a rule. Needs, housing, non-matrimonial wealth, pensions and future earning capacity all need case-specific review. The actual split varies case by case.",
  },
  {
    question: "What about my pension built up before the marriage?",
    answer: "Pre-marital pension accrual may need separate evidence, but the longer the marriage, the more complex that distinction becomes. In a 25-year marriage, pension contributions from before the marriage should be reviewed with a pension expert or solicitor before assumptions are made.",
  },
  {
    question: "Will I have to pay spousal maintenance for life?",
    answer: "'Joint lives' maintenance (until death or remarriage) is now less common than it once was. The trend is toward fixed-term maintenance designed to allow the receiving party to gradually return to financial independence. However, in long marriages with very limited earning capacity for the receiving party, longer-term or joint-lives maintenance remains possible.",
  },
  {
    question: "What about inherited wealth received during the marriage?",
    answer: "Inheritance received during a long marriage and used for the family — for example, paying off the mortgage or funding a home extension — may be harder to treat separately. Inheritance kept separate and not used for joint purposes still needs evidence and legal review because long marriages can blur the distinction.",
  },
  {
    question: "Does my contribution as the higher earner give me more?",
    answer: "Generally not. UK courts have repeatedly confirmed that financial and non-financial contributions to a long marriage are treated equally. Being the higher earner does not entitle you to a larger share. Only 'special contribution' (e.g. genuinely exceptional wealth-generating skill) can shift this — and the bar is set very high.",
  },
];

const relatedPages = [
  { title: "Short Marriage Divorce Settlement UK", description: "How outcomes differ in marriages under 5 years.", href: "/short-marriage-divorce-settlement-uk", badge: "Comparison" },
  { title: "What Financial Checks Matter in Divorce UK?", description: "The framework behind these issues.", href: "/what-am-i-entitled-to-in-divorce-uk", badge: "Checks" },
  { title: "Pension Sharing vs Pension Offsetting", description: "Two common ways to handle pension equalisation.", href: "/pension-sharing-vs-offsetting-uk", badge: "Pensions" },
  { title: "Preview the Full Financial Report", description: "Model long-marriage settlement scenarios with your figures.", href: "/unlock", badge: "Report" },
];

export default function LongMarriageSettlementPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Long Marriage Divorce Settlement UK"
      subtitle="In long marriages, the equal sharing of matrimonial wealth is the established starting point. Pre-marital protection erodes over time, pension equalisation becomes central, and the analysis often turns on needs and earning capacity differences."
      documentTitle="Long Marriage Divorce Settlement UK | DivorceCalculatorUK"
      metaDescription="How UK divorce settlements treat long marriages (15+ years) — equal sharing principle, pension equalisation, treatment of pre-marital wealth, spousal maintenance and compensation."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Long Marriage Divorce Settlement UK", href: "/long-marriage-divorce-settlement-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          The length of a marriage is a statutory factor in UK divorce settlements. In long marriages — typically 15 years or more — the equal sharing of matrimonial wealth is the established starting point. The longer the marriage, the more strongly this principle applies, the more difficult it becomes to keep pre-marital wealth separate, and the more likely it is that pension equalisation will be central to the outcome.
        </p>

        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">Equal sharing is a starting point, not a finishing line. Long-marriage outcomes routinely depart from 50/50 because of housing needs, pension equalisation, or future earning capacity differences. Use modelling to understand what equality actually means in pounds for your situation.</p>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">How Long Marriages Are Typically Approached</h2>
        <div className="space-y-4 mb-6">
          {principles.map((p, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{p.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Model Your Long-Marriage Settlement" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">Figures You Will Need</h2>
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
            { label: "Pension equalisation done badly", desc: "Long-marriage cases settled without proper pension equalisation can leave one party — typically the lower-earning spouse — with a substantially worse retirement position. CETVs should be obtained for every pension and the equalisation modelled carefully." },
            { label: "Housing on a single income", desc: "What looked affordable on two incomes may not work post-divorce. Both parties typically need to model housing affordability honestly before agreeing the property division." },
            { label: "Spousal maintenance disputes", desc: "The term and amount of spousal maintenance is one of the most contested aspects of long-marriage settlements. Both parties have a strong interest in modelling the impact across various term lengths." },
            { label: "Pre-marital wealth disputes", desc: "Wealth one party brought into a long marriage may be challenged on multiple grounds — that it has been mingled, used for the family, or that the partnership-built wealth on top of it justifies sharing of the whole. These disputes often need expert input." },
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
            "How qualified legal advice might assess sharing vs needs in your specific case",
            "Whether any pre-marital wealth needs separate evidence and review",
            "What maintenance assumptions should be checked with a solicitor",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>What's the realistic split range for our situation given housing and income needs?</li>
          <li>How should we approach pension equalisation given the disparity in our pension values?</li>
          <li>Is spousal maintenance likely, and on what term?</li>
          <li>Are any of our pre-marital assets defensible as non-matrimonial?</li>
          <li>Would a clean break be achievable, or is ongoing maintenance more realistic?</li>
        </ul>
        <InlineCTA label="Compare Long-Marriage Settlement Scenarios" />
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
