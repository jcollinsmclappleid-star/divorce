import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ShieldCheck, AlertTriangle, CheckSquare, AlertCircle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const considerations = [
  { title: "Existing joint policies", desc: "Many couples hold a joint life policy linked to their mortgage. On divorce, the parties typically need to decide whether to keep the policy in force, split it into two single policies, or cancel it entirely." },
  { title: "Beneficiary nominations", desc: "Existing pension and life insurance nominations may still name the spouse. These do not automatically change on divorce — they need to be updated. Until they are, a death benefit could still pay out to the former spouse." },
  { title: "Securing maintenance with life cover", desc: "Where one party will be paying ongoing spousal or child maintenance, the recipient often wants the payments to be secured by a life policy on the payer. If the payer dies, the policy provides a lump sum that replaces the lost maintenance." },
  { title: "Mortgage protection on the family home", desc: "If one party is taking on the family home and the mortgage, life cover linked to that mortgage typically needs to be reviewed — often a single-life policy in their name." },
  { title: "Existing single-life policies", desc: "Single-life policies remain the property of the named life assured. They may still be relevant to the matrimonial pot if they have a surrender value (whole-of-life or investment-linked policies)." },
  { title: "Ongoing affordability", desc: "Premiums on life cover need to be affordable on a single-income basis. This often prompts a review of cover levels and policy types as part of the wider financial planning." },
];

const faqItems = [
  {
    question: "Should I cancel a joint life insurance policy when divorcing?",
    answer: "Not without thinking through the implications. A joint life policy linked to the mortgage typically protects the property if either party dies. Cancelling it leaves the surviving owner exposed. Splitting the policy into two single-life policies often makes more sense — but premiums and underwriting may differ.",
  },
  {
    question: "Do beneficiary nominations on my pension automatically change on divorce?",
    answer: "No. Death benefit nominations and 'expression of wish' forms on pensions and life policies do not change automatically when you divorce. Until you submit updated nominations, your former spouse could still receive the benefit. Reviewing and updating nominations is one of the most important post-divorce financial housekeeping tasks.",
  },
  {
    question: "How do you secure spousal maintenance with life insurance?",
    answer: "The paying party typically takes out a level-term policy with a sum assured equivalent to the future maintenance payments, naming the receiving party as the beneficiary or assigning the policy to them. The order or agreement often requires the cover to be maintained until the maintenance ends. Specialist financial advice helps size the cover correctly.",
  },
  {
    question: "Is life insurance part of the matrimonial pot?",
    answer: "Term life insurance has no cash value during life and is not typically valued as an asset in the matrimonial pot. Whole-of-life and investment-linked policies have a surrender value and are typically disclosed and included. The protection role of life insurance — and who benefits from it on death — is a separate but related issue.",
  },
  {
    question: "What about critical illness cover or income protection?",
    answer: "These policies should also be reviewed. Critical illness cover and income protection are often linked to the policyholder's employment and income, and may need restructuring as the financial picture changes post-divorce. Specialist financial advice is usually worthwhile.",
  },
  {
    question: "Can life insurance be put into trust to ringfence it from divorce?",
    answer: "Putting a life policy in trust is a common estate planning tool. In divorce, a policy in trust is treated like any other trust asset — see our trust assets guide for the principles. Setting up trusts shortly before separation can be set aside under section 37 Matrimonial Causes Act 1973.",
  },
];

const relatedPages = [
  { title: "Spousal Maintenance After Divorce", description: "How spousal maintenance is calculated and secured.", href: "/spousal-maintenance-after-divorce-uk", badge: "Maintenance" },
  { title: "Child Maintenance vs Spousal Maintenance", description: "The two types of ongoing payments — and how they differ.", href: "/child-maintenance-vs-spousal-maintenance-uk", badge: "Maintenance" },
  { title: "Steps After Final Order", description: "The financial housekeeping that follows the final order.", href: "/steps-after-final-order-finances-uk", badge: "Post-divorce" },
  { title: "Preview the Full Financial Report", description: "Model maintenance scenarios and life cover requirements.", href: "/unlock", badge: "Report" },
];

export default function DivorceAndLifeInsurancePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Divorce and Life Insurance UK: What to Review"
      subtitle="Life insurance is one of the most overlooked aspects of divorce. From beneficiary nominations to securing maintenance with cover, here's what couples typically need to address."
      documentTitle="Divorce and Life Insurance UK | DivorceCalculatorUK"
      metaDescription="A practical UK guide to life insurance and divorce — joint policies, beneficiary nominations, securing maintenance with life cover, and post-divorce protection planning."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Divorce and Life Insurance UK", href: "/divorce-and-life-insurance-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Life insurance and protection planning are routinely overlooked in divorce — partly because the focus tends to be on the immediate division of assets and income. But policies, beneficiary nominations and protection arrangements can have very significant financial consequences if they are not addressed. The good news is that the steps required are usually straightforward, provided they are tackled methodically.
        </p>

        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">Beneficiary nominations on pensions and life policies do not change automatically on divorce. Failing to update them can mean a death benefit pays out to your former spouse rather than your intended beneficiary. Take regulated financial and legal advice on the right structure for your situation.</p>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">Key Considerations on Divorce</h2>
        <div className="space-y-4 mb-6">
          {considerations.map((c, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{c.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Model Maintenance and Cover Requirements" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">Figures to Capture in the Calculator</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {[
            "Existing life cover — sum assured, term remaining, premium",
            "Whether each policy is single life or joint life",
            "Surrender value of any whole-of-life or investment-linked policies",
            "Outstanding mortgage balance to be protected",
            "Spousal maintenance amount and duration to be secured",
            "Child-related future costs that need protection",
            "Each party's monthly affordability for premiums post-divorce",
            "Estimated cost of new single-life cover at current age and health",
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
            { label: "Cancelling cover prematurely", desc: "Cancelling joint cover before replacement single cover is in place can leave both parties — and any dependent children — exposed. New cover should be underwritten and active before cancellation." },
            { label: "Underwriting risk for older or unhealthy applicants", desc: "Premiums for new policies depend on age and health at application. Someone applying for cover post-divorce in their 50s, particularly with health conditions, may face significantly higher premiums than the original joint policy." },
            { label: "Policies with built-up surrender value", desc: "Whole-of-life and endowment policies can have material surrender values that should be disclosed and considered as part of the matrimonial pot." },
            { label: "Updating wills as well as nominations", desc: "Life insurance changes need to sit alongside an updated will. The two documents should be coordinated — especially where there are dependent children or a new partner." },
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
            "The right level and type of life cover for your circumstances",
            "Whether existing policies should be retained, split or cancelled",
            "How beneficiary nominations should be structured for your specific family",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>How should we restructure existing joint life cover?</li>
          <li>What life cover should secure the maintenance arrangements?</li>
          <li>What are the implications of changing beneficiary nominations on our pensions?</li>
          <li>Should our wills be updated alongside the divorce?</li>
          <li>What happens to critical illness cover and income protection?</li>
        </ul>
        <InlineCTA label="Model Maintenance Scenarios With Life Cover Costs" />
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
