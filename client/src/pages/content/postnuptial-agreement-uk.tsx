import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FileSignature, AlertTriangle, CheckSquare, AlertCircle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const triggers = [
  { title: "Arrival of children", desc: "Many couples revisit their financial arrangements after children arrive — particularly where one partner steps back from work and the income/asset balance changes." },
  { title: "Significant inheritance or windfall", desc: "An inheritance received during the marriage often prompts a post-nup, particularly to document how the inheritance should be treated if the marriage ends." },
  { title: "Starting or selling a business", desc: "A new business venture brings risk and value that one party often wants to address explicitly. A sale of a business creates wealth that may need allocating." },
  { title: "Reconciliation after a difficult period", desc: "Some couples enter a post-nup as part of rebuilding their relationship — providing certainty about financial outcomes if things don't recover." },
  { title: "Move to or from the UK", desc: "Where the family relocates, a post-nup can address how assets in different jurisdictions will be treated." },
  { title: "Replacing or updating an existing pre-nup", desc: "A post-nup can be used to refresh or replace a pre-nup that no longer reflects the parties' circumstances." },
];

const faqItems = [
  {
    question: "Is a postnuptial agreement legally binding in the UK?",
    answer: "Like pre-nups, post-nups are not automatically binding under English and Welsh law, but properly drafted post-nups will usually be given decisive weight by the court. The same conditions apply: independent legal advice on both sides, full disclosure, no undue pressure, and fair at the time of signing.",
  },
  {
    question: "How does a post-nup differ from a pre-nup?",
    answer: "The fundamental principles are very similar. A post-nup is signed during the marriage rather than before it. Some practitioners take the view that post-nups can carry slightly more weight because the duress concerns associated with pre-nuptial signing don't typically apply.",
  },
  {
    question: "Do we both need separate solicitors?",
    answer: "Yes. Each party taking independent legal advice from their own solicitor is one of the strongest factors in upholding a post-nup. Sharing a solicitor undermines the agreement at a fundamental level.",
  },
  {
    question: "Can a post-nup help if we are considering separating?",
    answer: "Yes, in some cases. Couples who are considering separation but want to give the marriage another try sometimes use a post-nup to set out what would happen financially if separation does follow. This is sometimes called a 'reconciliation agreement.' If the parties have already separated, what they typically need is a separation agreement, not a post-nup.",
  },
  {
    question: "How much does a post-nup typically cost?",
    answer: "Costs vary with complexity. A straightforward post-nup might be a few thousand pounds per party. More complex agreements involving businesses, trusts or international elements can cost considerably more. Both parties pay their own solicitor's fees.",
  },
  {
    question: "Can a post-nup deal with how we'd handle children?",
    answer: "It can record agreed parenting intentions, but provisions affecting child arrangements (where they live, how decisions are made about them) are not generally binding on a court. Those decisions remain with the court if they end up in dispute, applying the welfare principle.",
  },
];

const relatedPages = [
  { title: "Prenuptial Agreement UK", description: "Pre-nups — when they hold up and the conditions courts look for.", href: "/prenuptial-agreement-uk", badge: "Agreements" },
  { title: "Separation Agreement UK", description: "For couples who are separating but not yet divorcing.", href: "/separation-agreement-uk", badge: "Agreements" },
  { title: "Pre-marital Assets in Divorce", description: "How assets brought into marriage are treated.", href: "/pre-marital-assets-divorce-uk", badge: "Assets" },
  { title: "Preview the Full Financial Report", description: "Model how a post-nup might apply to your situation.", href: "/unlock", badge: "Report" },
];

export default function PostnuptialAgreementPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Postnuptial Agreement UK: When and Why Couples Use Them"
      subtitle="Post-nups are signed during marriage and address how finances would be divided in the event of divorce. Like pre-nups, they are not automatically binding, but they can carry weight when properly drafted."
      documentTitle="Postnuptial Agreement UK | DivorceCalculatorUK"
      metaDescription="A clear guide to UK postnuptial agreements — when couples use them, the conditions courts look for, and how they sit alongside pre-nups and separation agreements."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Postnuptial Agreement UK", href: "/postnuptial-agreement-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          A postnuptial agreement is a contract entered into during the marriage that sets out how finances would be divided if the marriage ended. Like pre-nups, post-nups are not automatically binding under English and Welsh law — but courts will usually give them decisive weight where they meet the same conditions: independent legal advice on both sides, full and frank disclosure, no undue pressure, and fairness at the time of signing.
        </p>

        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">A post-nup is a serious legal document. The strongest agreements are tailored to the parties' specific circumstances and properly negotiated between separately advised solicitors. Specialist family law advice is essential.</p>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">Common Triggers for a Post-nup</h2>
        <div className="space-y-4 mb-6">
          {triggers.map((t, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-start gap-2">
                  <FileSignature className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{t.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{t.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Model How a Post-nup Might Apply in Your Situation" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">Figures to Capture in the Calculator</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {[
            "Current value of all assets — property, savings, investments, pensions",
            "Outstanding liabilities — mortgage, loans, credit cards, business debt",
            "Each party's gross annual income",
            "Pre-marital assets each party brought into the marriage",
            "Any inheritance received during the marriage and current value",
            "Business interests with current valuations",
            "Pension CETVs across all schemes",
            "Number and ages of any dependent children",
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
            { label: "Pressure or coercion concerns", desc: "If one party signs because they feel the relationship depends on it, the agreement is more vulnerable to a later challenge. Genuine free will at signing is essential." },
            { label: "Inadequate disclosure", desc: "Post-nups based on incomplete financial information are often the first thing challenged on separation. Full and frank disclosure protects the agreement." },
            { label: "Failure to update for changed circumstances", desc: "An old post-nup that no longer reflects today's circumstances may carry less weight. Periodic review keeps the agreement current." },
            { label: "Children's needs override the agreement", desc: "Where children are involved, courts will prioritise their welfare even if the post-nup terms suggest a different outcome." },
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
            "How much weight a particular post-nup may carry in your specific circumstances",
            "How changed circumstances since signing may affect the agreement",
            "Whether you have grounds to set aside or vary an existing post-nup",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>What's the right scope for our post-nup given our current circumstances?</li>
          <li>How should the agreement handle future children, inheritance or business growth?</li>
          <li>How often should we review or update the agreement?</li>
          <li>What disclosure should we exchange before signing?</li>
          <li>What safeguards should be checked so the agreement is properly prepared?</li>
        </ul>
        <InlineCTA label="Model Settlement Scenarios With Post-nup Assumptions" />
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
