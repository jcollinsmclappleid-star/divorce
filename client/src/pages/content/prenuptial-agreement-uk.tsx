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

const conditions = [
  { title: "Independent legal advice on both sides", desc: "Each party should take separate legal advice before signing. Without it, courts are far more likely to depart from the agreement." },
  { title: "Full and frank financial disclosure", desc: "Each party should know what the other owns, owes and earns. Hidden assets undermine the validity of the whole agreement." },
  { title: "Signed well before the wedding", desc: "Signing in haste shortly before the ceremony raises duress concerns. Most practitioners suggest at least 28 days, ideally several months." },
  { title: "No undue pressure", desc: "Neither party should feel coerced. The signing context — venue, timing, presence of family — can later be used to challenge the agreement." },
  { title: "Fair to both parties at the time of signing", desc: "An agreement that leaves one party in serious financial difficulty is more likely to be set aside, even if technically valid." },
  { title: "Provision for changing circumstances", desc: "Children, ill-health, redundancy or relocation can all change the picture. A pre-nup that ignores these is more vulnerable to challenge." },
];

const faqItems = [
  {
    question: "Are pre-nuptial agreements legally binding in the UK?",
    answer: "They are not automatically binding under English and Welsh law, but since the 2010 Supreme Court decision in Radmacher v Granatino, courts will generally give effect to a pre-nup that meets certain conditions — independent legal advice, full disclosure, signed without undue pressure, and fair at the time. Courts retain discretion to depart from the agreement if it would be manifestly unfair, particularly where it leaves either party in real need or fails to meet the welfare of any children.",
  },
  {
    question: "When should a pre-nup be signed?",
    answer: "Most family law practitioners suggest at least 28 days before the wedding to avoid suggestions of duress. Earlier is better — several months gives both parties time to take advice and reflect. A pre-nup signed days before the wedding is at much higher risk of being set aside.",
  },
  {
    question: "What does a pre-nup typically cover?",
    answer: "It usually identifies pre-marital assets, addresses how matrimonial wealth built during the marriage will be divided, and sometimes covers spousal maintenance, inheritance planning and arrangements for any children of previous relationships. Provisions affecting child arrangements are not generally enforceable and need separate legal advice.",
  },
  {
    question: "Can a pre-nup be challenged later?",
    answer: "Yes — and they often are. Common challenges include lack of disclosure, lack of independent legal advice, last-minute signing, change of circumstances, or that the agreement leaves one party in serious need. Whether the challenge succeeds depends on the specific facts. A qualified family solicitor can advise on the strength of any challenge.",
  },
  {
    question: "How much does a pre-nup typically cost?",
    answer: "Costs vary widely with complexity. A straightforward agreement covering pre-marital savings and a property might be a few thousand pounds. Complex agreements involving businesses, trusts or international assets can run to many thousands. Both parties pay their own solicitor's fees.",
  },
  {
    question: "Can a pre-nup be updated after marriage?",
    answer: "Yes — through a post-nuptial agreement, which is treated under similar principles. People sometimes update their arrangements after a major change in circumstances such as the arrival of children, a significant inheritance, or starting a business.",
  },
];

const relatedPages = [
  { title: "Postnuptial Agreement UK", description: "Updating financial arrangements after the marriage.", href: "/postnuptial-agreement-uk", badge: "Agreements" },
  { title: "Pre-marital Assets in Divorce", description: "How assets brought into marriage are treated.", href: "/pre-marital-assets-divorce-uk", badge: "Assets" },
  { title: "Section 25 Factors", description: "The legal framework courts apply to settlements.", href: "/section-25-factors-divorce-uk", badge: "Legal" },
  { title: "Preview the Full Financial Report", description: "Model how a pre-nup might play out in your situation.", href: "/unlock", badge: "Report" },
];

export default function PrenuptialAgreementPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Prenuptial Agreement UK: How They Work and When They Hold Up"
      subtitle="Pre-nups are not automatically binding under English and Welsh law, but a properly drafted agreement that meets certain conditions will usually be respected by the courts. Here's how they work."
      documentTitle="Prenuptial Agreement UK | DivorceCalculatorUK"
      metaDescription="A plain-English guide to UK prenuptial agreements — when they hold up in court, the conditions courts look for, and how they're typically used to protect pre-marital wealth."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Prenuptial Agreement UK", href: "/prenuptial-agreement-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          A prenuptial agreement is a contract entered into before marriage that sets out how finances will be divided if the marriage ends. Under English and Welsh law, courts retain discretion over financial settlements — meaning a pre-nup is not automatically binding. However, since the 2010 Supreme Court decision in Radmacher v Granatino, a pre-nup that meets certain conditions will usually be given decisive weight.
        </p>

        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">A pre-nup that is poorly drafted, signed in haste, or clearly unfair is unlikely to hold up. The conditions courts look for are now well-established — but each agreement still needs to be tailored to the parties' circumstances. Specialist family law advice is essential.</p>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">Safeguards to Check Before Relying on a Pre-Nup</h2>
        <div className="space-y-4 mb-6">
          {conditions.map((c, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-start gap-2">
                  <FileSignature className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{c.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Model How a Pre-nup Might Apply in Your Situation" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">Figures to Capture in the Calculator</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {[
            "Value of property each party brings into the marriage",
            "Pre-marital savings, ISAs, and investment values",
            "Pre-marital pension CETVs at the date of marriage",
            "Inheritance amounts each party expects or has received",
            "Each party's gross annual income at the date of marriage",
            "Any business interests with current valuations",
            "Estimated value of any joint matrimonial pot to be built during marriage",
            "Provision for any children from previous relationships",
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
            { label: "Last-minute signing", desc: "A pre-nup signed days before the wedding is much more vulnerable to a duress challenge. Sufficient time between signing and the ceremony is one of the most-cited factors in any later dispute." },
            { label: "Manifest unfairness at separation", desc: "Even a properly executed pre-nup can be set aside if enforcing it would leave one party in serious need — particularly where children are involved or where circumstances have changed substantially." },
            { label: "Children change the picture", desc: "Pre-nups cannot bind the court on issues relating to children's welfare. Where there are children, courts will give greater weight to ensuring their needs are met, even at the expense of the pre-nup terms." },
            { label: "Periodic review", desc: "A pre-nup that doesn't anticipate major life changes (children, ill-health, career changes, large inheritances) becomes less likely to hold up over time. Couples sometimes refresh their agreement via a post-nup." },
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
            "How much weight a particular pre-nup may carry in your specific circumstances",
            "How a pre-nup signed many years ago may need to be reviewed against today's circumstances",
            "Whether the conditions for a binding pre-nup have been satisfied in your case",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>How much weight might our pre-nup carry if the marriage ends?</li>
          <li>Do we need to update our pre-nup after our recent change in circumstances?</li>
          <li>How should the agreement handle assets we acquire jointly during marriage?</li>
          <li>What provision should be made for children if we have any?</li>
          <li>How should periodic reviews of the agreement be structured?</li>
        </ul>
        <InlineCTA label="Model Settlement Scenarios With Pre-nup Assumptions" />
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
