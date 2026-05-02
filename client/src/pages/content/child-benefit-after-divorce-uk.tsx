import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertTriangle, CheckSquare, AlertCircle, Users } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const points = [
  { title: "Only one parent can claim Child Benefit", desc: "Child Benefit can only be paid to one person per child. Where parents separate, the parent the child lives with most of the time is normally the claimant. Disputed cases are resolved by HMRC based on residence patterns." },
  { title: "Rates for 2026/27", desc: "£26.05 per week for the eldest or only child; £17.25 per week for each additional child. Tax-free in itself but subject to the High Income Child Benefit Charge for higher earners." },
  { title: "High Income Child Benefit Charge", desc: "Where the higher-earning parent has adjusted net income above £60,000 (post-Spring 2024 threshold), Child Benefit is gradually clawed back via tax. Fully clawed back at £80,000. The charge applies even to a non-resident higher-earning parent's income." },
  { title: "NI credits — quietly important", desc: "Claiming Child Benefit (even if the High Income Child Benefit Charge claws it all back) entitles the claimant to NI credits towards the State Pension while the youngest child is under 12. These credits matter — particularly for the lower-earning parent staying home with children." },
  { title: "Transfer of NI credits between parents", desc: "Where the higher-earning parent claimed Child Benefit but the lower-earning parent provided the care, NI credits can be transferred. This protects the carer's State Pension. Many separated parents are unaware of this option and lose entitlement." },
  { title: "Claiming for separation purposes", desc: "On separation, if the parent who was claiming is no longer the resident parent, the new resident parent should claim. The change is straightforward but should be done promptly to avoid delays in payment." },
];

const figures = [
  "Children's full names and dates of birth",
  "National Insurance numbers for both parents",
  "Bank details of the resident parent for payment",
  "School / nursery details (evidence of residence)",
  "Both parents' adjusted net income (for HICBC analysis)",
  "Date of separation and date children became resident",
  "Existing Child Benefit award (if any) and current claimant",
  "NI record of the lower-earning parent (for credit transfer)",
];

const faqItems = [
  { question: "Who gets Child Benefit after divorce?", answer: "The parent the child lives with most of the time. Child Benefit can only be paid to one person per child. If the children spend roughly equal time with both parents, the parents need to agree who claims — HMRC will not split the benefit between them." },
  { question: "Does the High Income Child Benefit Charge still apply after divorce?", answer: "Yes. The charge applies to the higher-earning parent in the household where Child Benefit is claimed. After divorce, the relevant test is the income of the parent in whose household the children live, not the non-resident parent. This often means the charge stops applying after separation if the resident parent earns less than £60,000." },
  { question: "Should I claim Child Benefit even if it's clawed back?", answer: "Yes — almost always. Claiming Child Benefit triggers National Insurance credits towards your State Pension while your youngest child is under 12. Even if the High Income Child Benefit Charge claws back all the cash, the NI credits can be worth thousands in lifetime State Pension. Claim and tick the 'don't pay me' box if you want to avoid the HICBC paperwork." },
  { question: "Can I transfer NI credits from my ex to me?", answer: "Possibly. Where the higher-earning parent claimed Child Benefit (and got the NI credits) but the lower-earning parent actually provided the childcare, an application can be made to HMRC to transfer the credits. This protects the carer's State Pension. Time limits apply and the application is not always automatic." },
  { question: "What happens to Child Benefit on shared care?", answer: "Even where care is shared roughly equally, Child Benefit can only go to one parent per child. Parents need to agree, or HMRC will decide based on the 'main residence'. Some couples split it by allocating different children to different parents (where there are multiple children) — but each individual child's Benefit goes to one parent only." },
  { question: "Does Child Benefit affect Child Maintenance Service calculations?", answer: "Child Benefit itself is ignored in the CMS calculation. CMS calculates child maintenance based on the paying parent's gross income, with adjustments for shared care nights. Child Benefit is paid separately to the resident parent and does not reduce or affect the CMS amount." },
];

const relatedPages = [
  { title: "Child Maintenance vs Spousal Maintenance UK", description: "How child maintenance is calculated.", href: "/child-maintenance-vs-spousal-maintenance-uk", badge: "Income" },
  { title: "Who Pays What After Divorce With Children UK", description: "Allocating costs between parents.", href: "/who-pays-what-after-divorce-with-children-uk", badge: "Children" },
  { title: "Council Tax Single Person Discount Divorce UK", description: "Other post-separation benefits.", href: "/council-tax-single-person-discount-divorce-uk", badge: "Tax" },
  { title: "Preview the Full Financial Report", description: "Model your post-divorce budget.", href: "/unlock", badge: "Report" },
];

export default function ChildBenefitAfterDivorcePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Child Benefit After Divorce UK — Who Claims and the NI Credit Trap"
      subtitle="Only one parent can claim Child Benefit per child. The High Income Child Benefit Charge often disappears post-separation. And the NI credit attached to the claim is quietly important for the carer's State Pension."
      documentTitle="Child Benefit After Divorce UK | DivorceCalculatorUK"
      metaDescription="Child Benefit after divorce UK. Who claims, the High Income Child Benefit Charge, NI credits towards State Pension, transferring credits between parents, and shared care."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Child Benefit After Divorce UK", href: "/child-benefit-after-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Child Benefit looks like a small administrative detail in a divorce, but the National Insurance credits attached to it can be worth thousands of pounds in lifetime State Pension — particularly for parents who took time out of paid work to raise children. The High Income Child Benefit Charge often stops applying after separation (because the resident parent's income is now what matters). And where the higher-earning parent claimed Child Benefit during the marriage, the NI credits can usually be transferred to the lower-earning carer post-separation.
        </p>
        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">If during the marriage your higher-earning spouse claimed Child Benefit but you did the bulk of childcare, you may have lost State Pension NI credits worth £6,000+ per year of foregone credit at retirement. Apply to transfer credits to your record now — time limits apply.</p>
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
                  <Users className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{p.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Model Your Post-Divorce Income" />
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
            { label: "Wrong claimant after separation", desc: "Where the non-resident parent continues to claim Child Benefit after separation, the resident parent loses cash and NI credits. Switching the claim should be done promptly." },
            { label: "HICBC confusion", desc: "Many parents stop claiming Child Benefit because of the High Income Child Benefit Charge — and lose the NI credits as a side-effect. The right answer is usually to claim and tick the 'don't pay me' box, preserving the NI credits without taking the cash." },
            { label: "Lost NI credits during marriage", desc: "Where the wrong parent received the NI credits during the marriage, the carer can lose substantial State Pension entitlement. The credit transfer process is not automatic and many separated parents miss it." },
            { label: "Shared care", desc: "Equal-time shared care is increasingly common but Child Benefit cannot be split between parents. Cooperation on the allocation is needed; HMRC will not divide it." },
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
            "Whether you can transfer past NI credits from your ex's record to yours",
            "How shared care should be reflected in the Child Benefit claim",
            "Whether the High Income Child Benefit Charge applies to your post-separation income",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Should I switch the Child Benefit claim into my name?</li>
          <li>Can I apply to transfer past NI credits from my ex to me?</li>
          <li>Does the High Income Child Benefit Charge still apply to my post-separation income?</li>
          <li>If we share care, who should claim Child Benefit?</li>
          <li>Should I claim and decline payment to preserve NI credits?</li>
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
