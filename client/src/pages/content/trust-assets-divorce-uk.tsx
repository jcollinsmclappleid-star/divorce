import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Vault, AlertTriangle, CheckSquare, AlertCircle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const trustTypes = [
  { title: "Bare trust", desc: "The beneficiary is absolutely entitled to the trust assets. The court typically treats bare trust assets as belonging directly to that party — they are part of the matrimonial pot in the usual way." },
  { title: "Discretionary trust", desc: "The trustees have discretion over which beneficiaries benefit and when. The court looks at how the trust has historically been used — if a beneficiary has effectively had access to the trust, it may be treated as a 'resource' available to them." },
  { title: "Life interest / interest in possession trust", desc: "A beneficiary has a right to income (or use) for life, with capital passing to others on death. The court typically takes the income stream into account; the underlying capital is treated more cautiously." },
  { title: "Family / dynastic trusts", desc: "Long-standing family trusts created by previous generations are typically treated more cautiously by the court — the beneficiary may have no realistic control over distributions." },
  { title: "Trusts created by a spouse", desc: "Where a trust has been created by one of the spouses (particularly close to divorce), courts have powers to set it aside as a 'reviewable disposition' under s.37 Matrimonial Causes Act 1973." },
  { title: "Offshore trusts", desc: "Trusts based in jurisdictions like Jersey, Guernsey or the Channel Islands face additional enforcement and disclosure complexities — but English courts can and do take them into account where they are a resource available to a beneficiary spouse." },
];

const faqItems = [
  {
    question: "Will my spouse's interest in a family trust be split in divorce?",
    answer: "Trust assets cannot generally be 'split' directly because they are owned by the trustees, not by either spouse. The court's approach is to consider whether the trust represents a 'resource' likely to be available to the beneficiary spouse — and if so, to take that into account when deciding the wider settlement. The outcome depends heavily on the trust type and the historical pattern of distributions.",
  },
  {
    question: "What is a 'judicious encouragement' order?",
    answer: "Where a court considers a discretionary trust to be a likely source of funds for the beneficiary spouse, it can structure the financial order on the assumption that the trustees will provide funds when needed — effectively encouraging the trustees to make distributions. This is sometimes used in larger-asset cases.",
  },
  {
    question: "What if a trust was set up to keep assets out of divorce?",
    answer: "Courts have powers under s.37 of the Matrimonial Causes Act 1973 to set aside transactions made with the intention of defeating a financial claim. A trust created shortly before separation, or in suspicious circumstances, can be unwound. The closer in time and the more obvious the intent, the more likely the court will intervene.",
  },
  {
    question: "Do trustees have to disclose trust details in divorce proceedings?",
    answer: "Trustees in England and Wales can be ordered to provide disclosure if they are within the court's jurisdiction. Offshore trustees are harder to compel directly — but the beneficiary spouse can be required to provide all information they have, and adverse inferences can be drawn from non-disclosure.",
  },
  {
    question: "Are pre-existing family trusts safe from divorce claims?",
    answer: "Long-established family trusts, particularly where the beneficiary has limited control and has not had regular distributions, are typically treated more cautiously by the court. But 'safe' overstates the position — the court will still look at all the resources available to each party. Specialist advice on trust structures is essential.",
  },
  {
    question: "How are trust distributions during the marriage treated?",
    answer: "Distributions received during the marriage and used for family purposes are typically treated as part of the matrimonial wealth (or as having shaped the standard of living the family enjoyed). Where they have been kept entirely separate from the matrimonial finances, the position may differ.",
  },
];

const relatedPages = [
  { title: "Pre-marital Assets in Divorce", description: "How non-matrimonial assets are treated.", href: "/pre-marital-assets-divorce-uk", badge: "Assets" },
  { title: "Matrimonial vs Non-Matrimonial Assets", description: "What can be ring-fenced from the settlement.", href: "/matrimonial-vs-non-matrimonial-assets-uk", badge: "Assets" },
  { title: "Form E Financial Disclosure", description: "What you need to disclose about beneficial trust interests.", href: "/form-e-financial-disclosure-uk", badge: "Disclosure" },
  { title: "Preview the Full Financial Report", description: "Model settlement scenarios with trust resources.", href: "/unlock", badge: "Report" },
];

export default function TrustAssetsDivorcePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Trust Assets in UK Divorce: How They're Treated"
      subtitle="Trust assets sit awkwardly in divorce — they aren't owned outright by either spouse, but they may still be treated as a 'resource' that affects the settlement. Here's how the rules typically work."
      documentTitle="Trust Assets in UK Divorce | DivorceCalculatorUK"
      metaDescription="A clear UK guide to how trust assets are treated in divorce — bare trusts, discretionary trusts, life interest trusts, dynastic family trusts and offshore arrangements."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Trust Assets in UK Divorce", href: "/trust-assets-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Trusts complicate divorce because the legal owner of trust assets is not the spouse but the trustees. The English courts cannot generally make orders directly against trust property — but they can, and do, take trust interests into account when deciding what overall settlement is fair. The treatment depends on the trust type, the spouse's relationship to it, and the historical pattern of distributions.
        </p>

        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">Trust analysis in divorce is highly technical and rarely formulaic. Specialist family law advice — typically with input from trust counsel — is essential where any trust interest forms part of the picture.</p>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">How Different Trust Types Are Typically Treated</h2>
        <div className="space-y-4 mb-6">
          {trustTypes.map((t, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-start gap-2">
                  <Vault className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{t.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{t.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Model Settlement Scenarios With and Without Trust Resources" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">Figures to Capture in the Calculator</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {[
            "Type of each trust (bare, discretionary, life interest, dynastic)",
            "Beneficial interest each party holds (or class of beneficiaries)",
            "Approximate value of trust assets if known",
            "Pattern of distributions received over the last 5–10 years",
            "When each trust was created and by whom",
            "Jurisdiction of the trust (UK, offshore)",
            "Other resources available outside any trust",
            "Estimated matrimonial pot for context — assets minus liabilities",
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
            { label: "Trustee cooperation (or lack of it)", desc: "Trustees may be reluctant to provide information or attend court. This can slow proceedings significantly. Where trustees are based offshore, enforcement of any disclosure order is harder." },
            { label: "The 'resource' analysis", desc: "Even where the spouse has no legal entitlement to trust assets, a court may treat them as available if past distributions suggest they will continue. This analysis is highly fact-specific." },
            { label: "Pre/post nuptial agreements that address trust interests", desc: "Where a pre-nup or post-nup explicitly addresses trust interests, courts will typically give it weight provided the usual conditions are met." },
            { label: "Costs and complexity", desc: "Trust cases often require both family law and trust counsel, and may involve cross-border proceedings. The cost of litigating these issues can be significant." },
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
            "Whether a particular trust will be treated as a 'resource' in your case",
            "How trustees are likely to respond to a disclosure or distribution request",
            "Whether a trust could be set aside as a reviewable disposition",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>How is the court likely to treat my (or my spouse's) trust interest?</li>
          <li>What disclosure will trustees be expected to provide?</li>
          <li>Could a particular trust be at risk of being set aside?</li>
          <li>How should we negotiate around trust interests we don't fully understand?</li>
          <li>Do we need separate trust counsel alongside family law advice?</li>
        </ul>
        <InlineCTA label="Model Settlement Scenarios With and Without Trust Resources" />
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
