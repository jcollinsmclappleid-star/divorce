import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertTriangle, CheckSquare, AlertCircle, Home } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const points = [
  { title: "Joint tenants — equal undivided ownership", desc: "Both parties own 100% of the property together. There are no defined shares. On the death of one party, the survivor automatically inherits the whole property by survivorship — bypassing any will or intestacy rules." },
  { title: "Tenants in common — defined shares", desc: "Each party owns a defined share (often 50/50, but can be any percentage). Each party's share passes under their will or intestacy on death — not automatically to the surviving co-owner. More flexible and protective on death." },
  { title: "Severing a joint tenancy on divorce", desc: "Either party can unilaterally sever a joint tenancy by serving a written notice on the other. After severance the property is held as tenants in common in equal shares (unless a different split is documented)." },
  { title: "Why severance matters in divorce", desc: "Without severance, if the in-fault party dies during the divorce process, the other automatically inherits the entire property — even if they were about to lose half of it in the settlement. Severance is usually the first step at separation, irrespective of the wider settlement." },
  { title: "Declaration of trust", desc: "Tenants in common can vary the default 50/50 by signing a declaration of trust setting out the actual beneficial shares (e.g. 70/30 to reflect different deposit contributions). On divorce the court can override this — but it's evidence of intent." },
  { title: "Form A restriction at the Land Registry", desc: "After severance, a Form A restriction is entered at the Land Registry, recording that the property is held as tenants in common. This stops a sole surviving owner from selling or charging the property without involving a personal representative or another trustee." },
];

const figures = [
  "Land Registry title showing current ownership form (joint tenants or tenants in common)",
  "Date of property purchase and proportions of original deposits",
  "Any existing declaration of trust",
  "Wills of both parties (do they leave shares appropriately?)",
  "Mortgage details and which party services payments",
  "Date of separation",
  "Any severance notice served (and date)",
  "Evidence of how the property has been treated for tax (e.g. CGT base costs)",
];

const faqItems = [
  { question: "Should I sever the joint tenancy when separating?", answer: "Almost always yes, as soon as separation looks likely. Severance protects your share if you die during the divorce process — without it, your soon-to-be-ex would automatically inherit the entire property by survivorship, even if the financial settlement was about to give them half. Severance is fast, free or very cheap, and reversible by mutual agreement." },
  { question: "How do I sever a joint tenancy?", answer: "Serve a written notice on the other party stating you wish to sever the joint tenancy. The notice can be served by post (recorded delivery is wise) or in person. The act of serving the notice itself is sufficient — no court order or registration is initially needed, although the Land Registry should be notified to enter a Form A restriction." },
  { question: "What's the practical difference for divorce settlement?", answer: "For the financial settlement itself, very little — the court has wide power to redistribute property regardless of the legal form. The difference is mainly about what happens if one party dies during the process. As joint tenants, the survivor inherits everything. As tenants in common, each party's share passes under their will." },
  { question: "Do tenants in common have to be 50/50?", answer: "No. Tenants in common can hold the property in any percentages — 60/40, 75/25, even 99/1 — typically reflecting the proportions of original contribution. The actual split should be recorded in a declaration of trust at the time of purchase or when the form changes." },
  { question: "Can the court change a declaration of trust on divorce?", answer: "Yes. Under section 24 of the Matrimonial Causes Act 1973 the court can transfer property between divorcing spouses regardless of the legal title. A declaration of trust is evidence of intent and contributions but does not bind the court. In practice, declarations of trust are influential but not decisive in most divorce settlements." },
  { question: "What happens to the property at the Land Registry on divorce?", answer: "If the form changes (joint tenancy severed) a Form A restriction is added. If ownership changes (one party transfers their share to the other), a TR1 transfer of equity is lodged with the Land Registry, the title is updated and the leaving party is removed from the deeds. Mortgage updates run alongside this with the lender." },
];

const relatedPages = [
  { title: "Transfer of Equity Divorce UK", description: "The Land Registry process for property transfers.", href: "/transfer-of-equity-divorce-uk", badge: "Property" },
  { title: "Both Names on Mortgage Divorce UK", description: "Joint mortgage handling in divorce.", href: "/both-names-on-mortgage-divorce-uk", badge: "Property" },
  { title: "Decree Absolute vs Final Order UK", description: "Why timing matters for property and pensions.", href: "/decree-absolute-vs-final-order-uk", badge: "Process" },
  { title: "Preview the Full Financial Report", description: "Model property settlement scenarios.", href: "/unlock", badge: "Report" },
];

export default function JointTenantsVsTenantsInCommonPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Joint Tenants vs Tenants in Common in Divorce UK"
      subtitle="The form of joint property ownership matters enormously when one party dies during a divorce. Joint tenancy means survivorship; tenancy in common protects each party's share. Severance is usually step one at separation."
      documentTitle="Joint Tenants vs Tenants in Common Divorce UK | DivorceCalculatorUK"
      metaDescription="Joint tenants vs tenants in common divorce UK. Severing a joint tenancy at separation, declarations of trust, Form A restriction and protecting your share if you die mid-divorce."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Joint Tenants vs Tenants in Common Divorce UK", href: "/joint-tenants-vs-tenants-in-common-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          The legal form in which a couple jointly owns a property — joint tenants vs tenants in common — usually matters very little while a marriage is intact. On separation it suddenly matters enormously. Joint tenancy means each party owns 100% of the whole property and the survivor inherits everything by 'survivorship' on the other's death. Tenancy in common means each party owns a defined share that passes under their own will. If you die mid-divorce as a joint tenant, your soon-to-be-ex automatically inherits the entire property — bypassing any will and any pending settlement. Severing the joint tenancy is usually the first protective step at separation.
        </p>
        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">If you and your spouse own your home as joint tenants and one of you dies before the financial settlement is sealed, the survivor inherits the entire property automatically — regardless of any will, agreement or pending court order. Severing the joint tenancy at separation is fast, cheap and protective.</p>
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
                  <Home className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
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
            { label: "Failure to sever early", desc: "The single most common protective omission. Couples often delay severance hoping for amicable resolution — and risk catastrophic outcomes if one party dies suddenly during the divorce." },
            { label: "Severance disputes", desc: "Severance is unilateral — but the timing and mechanism matter. Disputes occasionally arise about whether severance was effective. Always serve in writing with proof of delivery." },
            { label: "Will updates lag", desc: "After severance, your share now passes under your will. If your will still names your spouse as primary beneficiary, severance alone doesn't fix the problem. Update wills at the same time as severance." },
            { label: "Declaration of trust mismatch", desc: "If a declaration of trust records different shares to the parties' intentions or contributions, this is evidence the court will consider but not necessarily follow. Disputes about historical contributions can be evidence-heavy." },
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
            "Whether you should sever the joint tenancy in your specific circumstances",
            "What the percentage split should be after severance (court can override anyway)",
            "Whether to update your will to reflect the post-severance position",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Should we sever the joint tenancy now?</li>
          <li>Do we need a declaration of trust documenting current shares?</li>
          <li>Are our wills appropriate for the post-severance position?</li>
          <li>Is the Form A restriction in place at the Land Registry?</li>
          <li>How does the legal form interact with the proposed financial settlement?</li>
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
