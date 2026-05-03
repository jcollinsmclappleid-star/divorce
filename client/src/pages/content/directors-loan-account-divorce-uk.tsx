import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Briefcase, AlertCircle, CheckSquare, ExternalLink, BookOpen } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const factors = [
  { label: "A director's loan account is a record, not a separate asset", desc: "The director's loan account (DLA) is a ledger entry in the company's books showing money owed by the director to the company (overdrawn DLA) or owed by the company to the director (credit balance). It is not a separate bank account — it is a balance position recorded in the company's accounts." },
  { label: "An overdrawn DLA is a debt", desc: "Where a director has taken more out of the company than is owed to them, the DLA is overdrawn — the director owes the company money. On divorce, this is a personal liability of the director and may need to be repaid (with potential s.455 corporation tax consequences for the company if not repaid within 9 months of the year-end)." },
  { label: "A credit DLA balance is an asset", desc: "Where the company owes the director money — for example, accumulated unpaid salary, expenses, or capital introduced — the DLA is in credit. This is an asset of the director (a debt due from the company) and should be disclosed in the financial settlement. Whether it can actually be drawn down in cash depends on the company's solvency and cashflow." },
  { label: "Tax consequences of repayment matter", desc: "Repaying an overdrawn DLA from personal funds is straightforward. Drawing down a credit DLA balance is normally tax-free (it's repayment of money already lent to the company). But where the DLA is settled by additional dividends or salary, those carry their own income tax and NI consequences. Take advice from an accountant." },
  { label: "Section 455 corporation tax can sit on top", desc: "If a director's loan account remains overdrawn 9 months after the company's year-end, the company is liable for s.455 corporation tax (currently 33.75%) on the overdrawn balance. This is refunded once the loan is repaid — but creates a real cashflow cost in the meantime that should be flagged in any divorce disclosure." },
];

const faqItems = [
  { question: "What is a director's loan account in a UK divorce?", answer: "It's the ledger balance in the company's accounts showing money owed between the director and their limited company. A credit balance (company owes the director) is an asset of the director and should be disclosed as part of the matrimonial pool. An overdrawn balance (director owes the company) is a personal liability of the director and is also disclosable." },
  { question: "Is a credit DLA balance shareable on divorce?", answer: "Yes — it is an asset of the director and is disclosed in the same way as any other asset. Whether it can be realised in cash depends on the company's solvency, cashflow and any other shareholder agreements. In a small owner-managed company the director can normally draw the credit balance down, but commercial reality (working capital, cashflow) may limit how quickly." },
  { question: "Does my spouse have to help me clear an overdrawn DLA?", answer: "An overdrawn DLA is the director's personal liability — the spouse is not directly liable for it. However, the family court will treat it as a personal debt of the director when assessing the matrimonial pool, which will affect the overall division of assets. The corporation tax cost (s.455 if unrepaid 9 months after year-end) is also relevant." },
  { question: "How is the DLA disclosed on Form E?", answer: "The DLA balance is disclosed in the relevant section of Form E (financial disclosure) — typically with the company accounts and corporate interests. The latest available company accounts and a recent management accounts extract showing the current DLA balance are normally provided. A forensic accountant may be instructed in higher-value or contested cases." },
  { question: "Can the director just write off an overdrawn DLA?", answer: "The company can write off a director's loan, but writing it off has tax consequences for both the director (treated as income — typically dividend or earnings depending on circumstances) and the company. This is rarely a clean route around the divorce financial settlement and should not be done without specialist accountancy advice. Family courts can also reverse transactions designed to defeat financial claims." },
  { question: "Is forensic accountancy advice needed?", answer: "Often yes, particularly where the company is the main asset. A single joint expert (SJE) forensic accountant is commonly instructed under FPR 25 to value the company, identify maintainable income, and analyse the DLA position. The accountant's report is shared between the parties and used to inform settlement negotiations." },
];

const relatedPages = [
  { title: "Self-Employed Divorce UK", description: "How sole traders and partnerships are treated in financial settlements.", href: "/self-employed-divorce-uk", badge: "Business" },
  { title: "Limited Company Shares on Divorce", description: "Valuing private company shares on divorce.", href: "/limited-company-shares-on-divorce-uk", badge: "Business" },
  { title: "Divorce and the Family Business", description: "When the company is the main matrimonial asset.", href: "/divorce-and-the-family-business-uk", badge: "Business" },
  { title: "Form E Financial Disclosure", description: "What to disclose and how to do it.", href: "/form-e-financial-disclosure-uk", badge: "Disclosure" },
];

export default function DirectorsLoanDivorcePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Director's Loan Account on Divorce in the UK"
      subtitle="A director's loan account is a balance, not a bank account. On divorce it can be either an asset (credit balance) or a liability (overdrawn) — and tax can sit on top of both."
      documentTitle="Director's Loan Account on Divorce UK | DivorceCalculatorUK"
      metaDescription="How a director's loan account is treated in a UK divorce — credit and overdrawn balances, s.455 corporation tax, Form E disclosure, and forensic accounting input."
      relatedPages={relatedPages}
      breadcrumbs={[{ name: "Home", href: "/" }, { name: "Guides", href: "/divorce-financial-guides" }, { name: "Director's Loan and Divorce", href: "/directors-loan-account-divorce-uk" }]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          For owner-managed company directors, the director's loan account (DLA) is one of the more technical elements of a divorce financial disclosure. It can be either an asset or a liability — and the tax consequences of resolving it matter as much as the headline balance.
        </p>
        <h2 className="text-2xl font-display font-bold mt-8 mb-4">How DLAs are treated</h2>
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
        <InlineCTA label="Model the Wider Settlement Picture" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">Illustrative example</h2>
        <Card className="mb-6">
          <CardContent className="pt-5 space-y-3">
            <p className="text-sm font-semibold">Fictional owner-director — the DLA cuts both ways</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-primary" /><span><strong>Credit DLA £50k:</strong> Company owes the director £50k. Disclosable asset, normally drawable as a tax-free repayment, subject to the company's cashflow.</span></div>
              <div className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-primary" /><span><strong>Overdrawn DLA £30k:</strong> Director owes the company £30k. Personal liability. If unpaid 9 months after year-end, company pays s.455 tax at 33.75% (£10.1k) — refundable when repaid but a real cashflow drag.</span></div>
            </div>
            <p className="text-xs text-muted-foreground">Illustrative only. Always involve the company's accountant in any settlement involving DLAs.</p>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-6">Documents you will need</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {["Latest filed company accounts (last 2–3 years)", "Recent management accounts showing current DLA balance", "Year-end DLA reconciliation from the accountant", "Any board minutes authorising drawings or salary", "P11D forms for benefits in kind", "Recent dividend declarations and tax position", "Company corporation tax computations", "Bank statements supporting director-company transfers"].map((fig, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border">
              <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {fig}
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">What the calculator cannot do</h2>
        <div className="space-y-3 mb-6">
          {["Value the underlying company — this needs a forensic accountant", "Calculate the tax cost of clearing or drawing down the DLA in your circumstances", "Model the corporation tax interaction with personal income tax"].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Official sources</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li><a className="underline hover:text-primary" href="https://www.gov.uk/directors-loans" target="_blank" rel="noopener noreferrer">GOV.UK — Director's loans <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm61500" target="_blank" rel="noopener noreferrer">HMRC — CTM61500: section 455 close company loans <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.gov.uk/government/publications/financial-statement-form-e" target="_blank" rel="noopener noreferrer">GOV.UK — Financial Statement (Form E) <ExternalLink className="inline w-3 h-3" /></a></li>
        </ul>
        <p className="text-xs text-muted-foreground italic">General information only. Not legal, tax or accountancy advice. DLA matters on divorce should always involve the company's accountant and a family solicitor with experience of owner-managed business cases.</p>
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
