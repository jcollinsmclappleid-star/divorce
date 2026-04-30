import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FileText, AlertTriangle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const formEItems = [
  "Your property and its value",
  "All bank and savings accounts",
  "Investments, shares, and ISAs",
  "Pensions — current cash equivalent transfer value (CETV)",
  "Business interests and their value",
  "Income from all sources",
  "Monthly outgoings and liabilities",
  "Any significant financial changes expected in the next 12 months",
];

const consequences = [
  "Courts can draw adverse inferences against the non-disclosing party",
  "A settlement or court order may be set aside if based on materially false information",
  "Failure to comply with court disclosure orders can result in committal for contempt of court",
  "The party in breach may face adverse costs orders",
];

const faqItems = [
  {
    question: "Do I have to complete Form E even if we agree?",
    answer: "If you settle without court proceedings, you are not required to formally complete Form E. However, full financial disclosure should still take place — courts expect it, and any settlement based on incomplete information is more vulnerable to challenge.",
  },
  {
    question: "What if my spouse refuses to provide financial disclosure?",
    answer: "If you issue court proceedings, the court can compel disclosure. Failure to comply can result in contempt of court, adverse cost orders, and the court drawing inferences about what undisclosed assets might contain.",
  },
  {
    question: "How far back do bank statements need to go?",
    answer: "For court proceedings, 12 months of bank statements is the standard. In some cases, particularly where there are concerns about asset dissipation, longer periods may be requested.",
  },
  {
    question: "Does disclosure include pension details?",
    answer: "Yes — pensions must be disclosed, including the current cash equivalent transfer value (CETV) from the pension provider. This is critical because pensions are often a significant asset that is overlooked.",
  },
  {
    question: "Can I use information obtained about my spouse's finances without their knowledge?",
    answer: "This is legally complex. Evidence obtained unlawfully (such as accessing someone's email account without permission) may be inadmissible and could expose you to legal liability. Seek legal advice if you have information you obtained in this way.",
  },
];

const relatedPages = [
  { title: "Can I Hide Assets in Divorce UK?", description: "The law, the risks, and what courts can do to detect concealment.", href: "/can-i-hide-assets-in-divorce-uk", badge: "Disclosure" },
  { title: "Spouse Refuses Financial Disclosure UK", description: "Your options when your ex won't cooperate with disclosure.", href: "/spouse-refuses-financial-disclosure-uk", badge: "Process" },
  { title: "What is a Consent Order in UK Divorce?", description: "Why disclosure must be complete before your order can be approved.", href: "/what-is-a-consent-order-uk-divorce", badge: "Legal Orders" },
  { title: "Preview the Full Financial Report", description: "See the full asset picture modelled before disclosure.", href: "/unlock", badge: "Report" },
];

export default function FinancialDisclosurePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Financial Disclosure in UK Divorce"
      subtitle="Financial disclosure is a legal requirement in every UK divorce. Both parties must provide complete information about income, assets, pensions, and debts — or face serious consequences."
      documentTitle="Financial Disclosure in UK Divorce Explained | DivorceCalculatorUK"
      metaDescription="Learn what financial disclosure involves in UK divorce, what Form E covers, the duty of full disclosure, and what happens if your spouse hides assets."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Financial Disclosure in UK Divorce", href: "/financial-disclosure-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Financial disclosure in UK divorce is a legal requirement — not optional. Before any financial settlement can be reached or approved by a court in England and Wales, both parties must fully and honestly disclose their financial position. This means providing detailed information about income, assets, debts, pensions, outgoings, and any financial resources they might have access to. Incomplete or dishonest disclosure can have serious legal consequences.
        </p>

        <h2 className="text-2xl font-display font-bold mt-8 mb-4">What Financial Disclosure Involves: Form E</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">Financial disclosure typically involves completing Form E — a comprehensive document covering all aspects of your finances:</p>
        <div className="grid sm:grid-cols-2 gap-2 mb-6">
          {formEItems.map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border text-sm text-muted-foreground">
              <FileText className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mb-6">Supporting documentation is required — bank statements, mortgage statements, pension statements, payslips, P60s, and business accounts where relevant. HMRC self-assessment returns are required for the self-employed.</p>

        <Card className="bg-primary/5 border-primary/20 mb-6">
          <CardContent className="pt-5">
            <p className="text-sm font-semibold text-primary mb-2">The Duty of Full and Frank Disclosure</p>
            <p className="text-sm text-muted-foreground">Both parties have a duty of full and frank disclosure. This is not just about answering the questions asked — it is about proactively disclosing anything that could be material to a fair settlement. Hiding assets, undervaluing business interests, or failing to mention income sources are all serious breaches of this duty.</p>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">Consequences of Incomplete Disclosure</h2>
        <div className="space-y-3 mb-6">
          {consequences.map((c, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg border bg-background">
              <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">{c}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">If You Suspect Your Spouse is Hiding Assets</h2>
        <div className="space-y-2 mb-6 text-sm text-muted-foreground">
          <p>If you believe your spouse is hiding assets or undervaluing their financial position, you can:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Request specific documentation (bank statements, business accounts, valuation reports)</li>
            <li>Apply for a court order compelling disclosure (a 'questionnaire' through the court process)</li>
            <li>Apply for an order requiring third parties — such as banks or businesses — to produce documents</li>
            <li>Instruct a forensic accountant to investigate business accounts or complex financial structures</li>
          </ul>
        </div>

        <p className="text-sm text-muted-foreground mb-6">Courts take non-disclosure seriously. In cases where hidden assets are discovered, courts can, and do, reopen settlements even years later.</p>
        <InlineCTA label="Model Your Settlement With Accurate Figures" />
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
