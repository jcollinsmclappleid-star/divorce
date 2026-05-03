import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PoundSterling, AlertCircle, CheckSquare, ExternalLink } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const factors = [
  { label: "The court fee is the largest fixed cost", desc: "The court fee for applying for a divorce in England and Wales is £593 (current at the time of writing; check GOV.UK for the latest). This is paid to HM Courts & Tribunals Service when the divorce application is submitted online via the GOV.UK divorce service." },
  { label: "DIY does not mean free", desc: "Even a DIY divorce involves the £593 court fee, the cost of any updated wills, and — crucially — the cost of obtaining a financial consent order to make any financial agreement legally binding (court fee currently £58, plus solicitor drafting fees if used)." },
  { label: "DIY is realistic for the divorce process itself", desc: "Where both parties agree to the divorce and there are no contested issues, the application can be completed online via the GOV.UK divorce service without legal representation. The portal guides applicants through each step." },
  { label: "DIY is rarely advisable for the financial settlement", desc: "The legal divorce and the financial settlement are separate processes. Without a court-approved consent order, financial claims remain open indefinitely — even decades later. This is the most common and most expensive mistake DIY divorcers make." },
  { label: "Help with court fees may be available", desc: "Help with Fees (formerly fee remission) is available through the GOV.UK 'Get help paying court and tribunal fees' service. It depends on income, savings, and benefits — and can reduce or remove the £593 application fee for those who qualify." },
];

const faqItems = [
  { question: "How much does a DIY divorce cost in the UK?", answer: "At minimum, the £593 court fee paid to HM Courts & Tribunals Service when you apply online via GOV.UK. To make any financial agreement legally binding, you also need a court-sealed consent order — the court fee for that is £58, with solicitor drafting fees on top if you use one. Without a consent order, financial claims remain open even after the divorce is finalised." },
  { question: "Can I really do my own divorce in England and Wales?", answer: "Yes — the legal divorce process can be completed entirely online through the GOV.UK divorce service if both parties agree and there are no contested issues. The court walks you through each step. What is far less straightforward — and where most people benefit from advice — is the financial settlement." },
  { question: "Is the divorce really separate from the money?", answer: "Yes. The 'final order' (formerly the decree absolute) ends the marriage. It does not deal with money. Without a separately approved financial consent order, your ex can in principle bring financial claims against you years later — including against assets you acquire after the divorce. This is the single biggest risk of doing a DIY divorce without dealing with the finances." },
  { question: "Can I get help paying the £593 court fee?", answer: "Possibly. GOV.UK runs a 'Help with Fees' scheme for people on low incomes or certain benefits. You can apply online before submitting the divorce application. The scheme assesses income, savings and household circumstances and can reduce the fee in part or in full." },
  { question: "When is DIY a bad idea?", answer: "Where there are contested issues — property, pensions, businesses, complex assets, children's arrangements — DIY is rarely the right approach. Mistakes in financial settlements can cost far more than the price of a solicitor. Mediation (with a qualified family mediator) is often a much better middle ground than fully DIY." },
  { question: "Does the calculator help with a DIY divorce?", answer: "It is designed for exactly that situation — to help you understand the financial landscape before you sit down with your spouse, a mediator, or a solicitor. Use it to model the impact of different splits on both households' finances. It does not draft consent orders or replace legal advice." },
];

const relatedPages = [
  { title: "Online Divorce UK — Cost", description: "What 'online divorce' services include and what they don't.", href: "/online-divorce-uk-cost", badge: "Process" },
  { title: "Mediation vs Court — Costs", description: "How a mediated settlement typically compares with going to court.", href: "/mediation-vs-court-divorce-uk-costs", badge: "Costs" },
  { title: "What Is a Consent Order?", description: "Why an unapproved financial agreement is not legally binding.", href: "/what-is-a-consent-order-uk-divorce", badge: "Orders" },
  { title: "Do I Need a Solicitor for the Financial Settlement?", description: "When DIY is realistic and when it is risky.", href: "/do-i-need-a-solicitor-for-financial-settlement-uk", badge: "Decisions" },
];

export default function DiyDivorceCostPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="DIY Divorce UK: What It Really Costs"
      subtitle="The legal divorce can be done online for the £593 court fee. The financial settlement is a separate matter — and skipping it is the costliest mistake DIY divorcers make."
      documentTitle="DIY Divorce UK Cost | DivorceCalculatorUK"
      metaDescription="What a DIY divorce in England and Wales actually costs — the £593 court fee, the £58 consent order fee, Help with Fees, and where DIY is and isn't realistic."
      relatedPages={relatedPages}
      breadcrumbs={[{ name: "Home", href: "/" }, { name: "Guides", href: "/divorce-financial-guides" }, { name: "DIY Divorce Cost", href: "/diy-divorce-uk-cost" }]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          A DIY divorce in England and Wales is realistic for many couples — provided you understand what 'DIY' really means. The application process itself can be completed online via the GOV.UK divorce service. The financial settlement is an entirely separate matter, and one most people should not attempt without professional input.
        </p>
        <h2 className="text-2xl font-display font-bold mt-8 mb-4">The real cost picture</h2>
        <div className="space-y-3 mb-6">
          {factors.map((f, i) => (
            <div key={i} className="flex gap-3 p-4 rounded-lg border">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</div>
              <div>
                <p className="text-sm font-semibold mb-1">{f.label}</p>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <InlineCTA label="Model the Financial Settlement First" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">Typical fee picture</h2>
        <Card className="mb-6">
          <CardContent className="pt-5 space-y-3">
            <p className="text-sm font-semibold">Indicative DIY divorce cost (England and Wales)</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><PoundSterling className="w-4 h-4 text-primary" /><span><strong>Court fee for divorce application</strong>: £593 (HMCTS — confirm current figure on GOV.UK)</span></div>
              <div className="flex items-center gap-2"><PoundSterling className="w-4 h-4 text-primary" /><span><strong>Court fee for consent order</strong>: £58 (HMCTS — applies if you submit a financial consent order)</span></div>
              <div className="flex items-center gap-2"><PoundSterling className="w-4 h-4 text-primary" /><span><strong>Optional</strong>: Solicitor drafting of consent order — typically several hundred to a few thousand pounds depending on complexity</span></div>
              <div className="flex items-center gap-2"><PoundSterling className="w-4 h-4 text-primary" /><span><strong>Optional</strong>: Family mediation — fees vary; means-tested legal aid may be available for mediation</span></div>
            </div>
            <p className="text-xs text-muted-foreground">Fees current at time of writing. Always check the latest figures on GOV.UK.</p>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-6">Information you will need to start</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {["Marriage certificate (or certified copy if original missing)", "Both parties' full names and current addresses", "Date and place of marriage", "Any children of the family and their dates of birth", "Online account on GOV.UK to start the application", "Bank card to pay the £593 court fee", "Help with Fees reference number (if applying for fee help)", "A clear plan for dealing with the finances separately"].map((fig, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border">
              <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {fig}
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">Where DIY is genuinely risky</h2>
        <div className="space-y-3 mb-6">
          {["Significant pensions on either side — pension sharing nearly always benefits from professional advice", "Property, especially with mortgages or in negative equity", "Business interests, shares, or self-employment income", "Any disagreement about children's arrangements or money"].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Official sources</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li><a className="underline hover:text-primary" href="https://www.gov.uk/divorce" target="_blank" rel="noopener noreferrer">GOV.UK — Get a divorce <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.gov.uk/get-help-with-court-fees" target="_blank" rel="noopener noreferrer">GOV.UK — Get help paying court and tribunal fees <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.gov.uk/money-property-when-relationship-ends/apply-for-a-financial-order" target="_blank" rel="noopener noreferrer">GOV.UK — Apply for a financial order <ExternalLink className="inline w-3 h-3" /></a></li>
        </ul>
        <p className="text-xs text-muted-foreground italic">General information only. Not legal advice. Court fees can change — always check the current figures on GOV.UK.</p>
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
