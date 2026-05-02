import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FileText, AlertTriangle, CheckSquare, AlertCircle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const sections = [
  { title: "Section 1: Personal details", desc: "Names, ages, occupation, length of marriage, dependants, education and any health conditions affecting earning capacity." },
  { title: "Section 2: Capital — property, savings, investments", desc: "Every property you have an interest in (with current valuation and outstanding mortgage), all bank and savings accounts (with 12 months of statements), investments, ISAs, premium bonds, and any beneficial interests in trusts." },
  { title: "Section 2 cont: Personal belongings, vehicles, business interests", desc: "Vehicles, valuable items over a certain threshold, business interests with the latest two years of accounts and a director's loan account position, and any partnership interests." },
  { title: "Section 2: Liabilities", desc: "All debts in your name — credit cards, loans, hire purchase, car finance, tax owed, and any liability for joint debts." },
  { title: "Section 2: Pensions", desc: "Cash Equivalent Transfer Value (CETV) statements for every pension you hold, including workplace pensions, personal pensions, SIPPs, and any state pension forecast." },
  { title: "Section 3: Income", desc: "Current employment income, any self-employment income, investment income, rental income, and any state benefits. Backed up with payslips, tax returns, and P60s." },
  { title: "Section 4: Income needs", desc: "Your monthly budget — housing costs, utilities, food, transport, children's costs, insurance, leisure. This is what you say you need to live on going forward." },
  { title: "Section 5: Capital needs", desc: "What capital you say you need — typically a deposit on a new home, costs of moving, replacement furniture and any one-off costs of resettlement." },
];

const documents = [
  "Last 12 months of statements for every bank, savings and investment account",
  "Last 3 payslips and the most recent P60 for each employment",
  "Last 2 years of self-assessment tax returns (if applicable)",
  "Last 2 years of business accounts (if a business owner or director)",
  "A property valuation (estate agent appraisals or formal valuation)",
  "Mortgage redemption statement showing outstanding balance",
  "A Cash Equivalent Transfer Value (CETV) for every pension",
  "Statements for any credit cards, loans or other liabilities",
];

const faqItems = [
  {
    question: "Is Form E only used in court proceedings?",
    answer: "Form E is the standard form used in financial remedy proceedings in court. In voluntary disclosure (e.g. through mediation or solicitor-led negotiation), the same categories of information are typically exchanged — sometimes on Form E itself, sometimes via a less formal schedule. Either way, the categories of information are the same.",
  },
  {
    question: "What happens if I don't disclose something?",
    answer: "Both parties have a duty of full and frank financial disclosure. Deliberately hiding assets can result in the settlement being set aside, costs orders being made against you, and in serious cases contempt of court. It is taken extremely seriously by the courts.",
  },
  {
    question: "Do I have to disclose assets I owned before the marriage?",
    answer: "Yes — disclosure covers everything you own and owe, regardless of when you acquired it. The question of whether pre-marital or inherited assets should be ring-fenced from the settlement is a separate one decided after disclosure is complete.",
  },
  {
    question: "How long does completing Form E typically take?",
    answer: "Most people need 4–8 weeks to gather the documents required and complete the form properly. Self-employed parties, business owners, and those with multiple pensions or properties typically need longer. Starting the gathering process early avoids last-minute pressure.",
  },
  {
    question: "Can my Form E be challenged?",
    answer: "Yes. The other party (or their solicitor) can raise questionnaires asking for clarification or further evidence on any aspect of your disclosure. This is a standard part of the process and not usually a sign of suspicion — it's how disclosure is tested.",
  },
  {
    question: "What if I genuinely don't know the value of something?",
    answer: "You're expected to give your best estimate and explain how you arrived at it. For property, this typically means estate agent appraisals. For businesses, this may require a single joint expert valuation. For pensions, the CETV is provided by the scheme on request.",
  },
];

const relatedPages = [
  { title: "Financial Disclosure in UK Divorce", description: "The full disclosure process and what's required.", href: "/financial-disclosure-divorce-uk", badge: "Disclosure" },
  { title: "Spouse Refuses Financial Disclosure", description: "What to do if your ex won't disclose their finances.", href: "/spouse-refuses-financial-disclosure-uk", badge: "Disputes" },
  { title: "Financial Remedy Proceedings UK", description: "How the court process works after Form E.", href: "/financial-remedy-proceedings-uk", badge: "Court" },
  { title: "Preview the Full Financial Report", description: "Model your settlement using the same figures Form E captures.", href: "/unlock", badge: "Report" },
];

export default function FormEDisclosurePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Form E Financial Disclosure UK: What Goes Into It"
      subtitle="Form E is the standard financial disclosure form used in UK divorce proceedings. It runs to about 30 pages and captures every asset, liability, pension and income stream. Here's exactly what you'll need to provide."
      documentTitle="Form E Financial Disclosure UK | DivorceCalculatorUK"
      metaDescription="A clear breakdown of what Form E asks for in UK divorce — capital, liabilities, pensions, income, needs and required supporting documents. Plain-English guide for England & Wales."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Form E Financial Disclosure UK", href: "/form-e-financial-disclosure-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Form E is the formal financial statement used in financial remedy proceedings in England and Wales. It is signed under a statement of truth — meaning the contents must be accurate to the best of your knowledge. Both parties complete one and exchange them simultaneously, giving each side a complete picture of the matrimonial finances before negotiation or judicial decisions begin.
        </p>

        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">Form E is signed under a statement of truth. Deliberate omissions or misstatements can lead to settlements being set aside, costs orders, and in serious cases contempt of court. Take the time to complete it accurately.</p>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">The Eight Sections of Form E</h2>
        <div className="space-y-4 mb-6">
          {sections.map((s, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-start gap-2">
                  <FileText className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{s.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Capture Your Figures in the Calculator" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">Documents You Will Need to Gather</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {documents.map((d, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border">
              <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {d}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mb-4">Common Pressure Points</h2>
        <div className="space-y-3 mb-6">
          {[
            { label: "Pension CETVs taking time to arrive", desc: "Pension schemes can take 4–12 weeks to issue a CETV. Request these early — they are the single most common reason Form E completion is delayed." },
            { label: "Business owners and self-employed", desc: "Disclosure for business interests is more complex — typically two years of accounts, current management figures, director's loan account, and sometimes a joint expert valuation. Build in extra time." },
            { label: "Income needs section honesty", desc: "Padding the income needs budget is tempting but counter-productive. The other side will scrutinise it line by line, and an inflated budget can damage credibility on every other point." },
            { label: "Joint debts vs sole debts", desc: "How debts are categorised affects the net asset position significantly. Joint debts owed to the marriage are typically deducted from the pot; sole debts may be treated differently depending on what they were for." },
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
            "Whether something must be disclosed in your specific situation — a solicitor will advise on edge cases",
            "How a particular asset (e.g. an offshore trust or family business) should be valued for disclosure",
            "Whether your income needs schedule is realistic and likely to be accepted",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Are there any assets in my situation that need expert valuation before disclosure?</li>
          <li>How should I treat assets I owned before the marriage in the disclosure?</li>
          <li>What level of detail is realistic for my income needs schedule?</li>
          <li>Should I disclose voluntarily before any court proceedings start?</li>
          <li>How do I handle disclosure for any joint accounts where the other party also has access?</li>
        </ul>
        <InlineCTA label="Model Settlement Scenarios From Your Disclosure" />
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
