import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PoundSterling, AlertCircle, CheckSquare, ExternalLink, Wallet } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const factors = [
  { label: "Universal Credit replaces several legacy benefits", desc: "Universal Credit (UC) has replaced Income Support, income-based JSA, income-related ESA, Housing Benefit, Working Tax Credit and Child Tax Credit for most new claims. It is paid monthly, in arrears, by the Department for Work and Pensions (DWP) and administered through GOV.UK." },
  { label: "Separation triggers a new UC claim", desc: "If you were claiming UC as a couple, your joint claim ends when you separate. Each party then needs to make a new single claim from the date of separation. The first payment normally arrives about 5 weeks after the new claim is submitted — Advance Payments are available to bridge the gap, repayable from future UC." },
  { label: "Capital limits matter — and divorce often pushes them", desc: "UC is subject to a capital limit of £16,000 (savings, investments, second properties — excluding the home you live in and most pensions). Capital between £6,000 and £16,000 reduces UC by £4.35/month for every £250 above £6,000. A divorce settlement that pays out a lump sum can take a claimant over the limit." },
  { label: "Spousal maintenance does not count as income for UC", desc: "Maintenance payments — both spousal maintenance and child maintenance from a former partner — are disregarded as income for Universal Credit purposes. This was an important change from the legacy benefit system. See the official UC regulations and DWP guidance for confirmation in any specific case." },
  { label: "Housing element helps with rent, but limits apply", desc: "UC includes a housing element to help with rent. The amount is capped by Local Housing Allowance (LHA) rates which vary by area and household size. UC does not generally help with mortgage interest in the same way Support for Mortgage Interest (now a loan, SMI) used to — that is now a separate, repayable loan." },
];

const faqItems = [
  { question: "Can I claim Universal Credit after divorce?", answer: "Yes — divorce or separation often gives rise to a new UC entitlement, particularly where one party becomes a single parent or has reduced income after separation. You apply through GOV.UK. Eligibility depends on income, capital, residence, and whether you meet the work-related requirements that apply to your situation." },
  { question: "Does my divorce settlement affect my Universal Credit?", answer: "Yes — capital matters. UC has a £16,000 capital limit and a tariff income deduction between £6,000 and £16,000. A capital lump sum from a settlement can take you over the limit and end UC entitlement until that capital is spent down (and even then, the DWP can investigate 'deprivation of capital' if it believes capital was deliberately disposed of to claim benefits). Take advice before structuring a settlement if UC is a real concern." },
  { question: "Is the family home counted as capital for UC?", answer: "No — the home you live in is disregarded. A second property generally counts unless it is occupied by a former partner, a relative aged 60+, or in some other limited circumstances. Always check the current rules — the disregards are detailed and can change." },
  { question: "Does my ex-partner's child maintenance reduce my UC?", answer: "No. Child maintenance received from a former partner is fully disregarded as income for Universal Credit. The same applies to spousal maintenance. This is set out in the Universal Credit Regulations and confirmed by official DWP guidance." },
  { question: "Can I get help with my mortgage on UC?", answer: "Help is limited. The Support for Mortgage Interest (SMI) scheme is now a loan rather than a benefit — eligible UC claimants can apply for help with mortgage interest payable as a loan, repayable when the property is sold or transferred. There is normally a qualifying period before SMI starts. See GOV.UK for the current rules." },
  { question: "Where do I apply?", answer: "Online via GOV.UK at gov.uk/universal-credit. The Citizens Advice 'Help to Claim' service is free and supports people through their first UC claim. The Money and Pensions Service (MoneyHelper) and Turn2us provide independent benefits guidance and entitlement checkers." },
];

const relatedPages = [
  { title: "Divorce Settlement With No Assets", description: "When the financial settlement is more about cashflow and benefits than capital.", href: "/divorce-settlement-no-assets-uk", badge: "Low Asset" },
  { title: "Stay-at-Home Parent Divorce Settlement", description: "How housing, benefits and term maintenance fit together post-separation.", href: "/stay-at-home-parent-divorce-settlement-uk", badge: "Carer" },
  { title: "Council Tax During Divorce", description: "Single person discount and Council Tax Reduction after separation.", href: "/council-tax-during-divorce-uk", badge: "Tax" },
  { title: "Spousal Maintenance After Divorce", description: "How maintenance interacts (or doesn't) with means-tested benefits.", href: "/spousal-maintenance-after-divorce-uk", badge: "Maintenance" },
];

export default function UniversalCreditAfterDivorcePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Universal Credit After Divorce in the UK"
      subtitle="A divorce often triggers a new Universal Credit claim — but a capital settlement can also take you over the limit. Here is how UC interacts with the financial settlement."
      documentTitle="Universal Credit After Divorce UK | DivorceCalculatorUK"
      metaDescription="How Universal Credit works after divorce in the UK — capital limits, housing element, treatment of spousal and child maintenance, and what changes when a couple separates."
      relatedPages={relatedPages}
      breadcrumbs={[{ name: "Home", href: "/" }, { name: "Guides", href: "/divorce-financial-guides" }, { name: "Universal Credit After Divorce", href: "/universal-credit-after-divorce-uk" }]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Universal Credit (UC) is the main means-tested working-age benefit in the UK. Divorce or separation almost always triggers a new claim — and the structure of the financial settlement can have a significant impact on UC entitlement, particularly through the £16,000 capital limit.
        </p>
        <h2 className="text-2xl font-display font-bold mt-8 mb-4">How UC interacts with separation</h2>
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
        <InlineCTA label="Model Your Post-Settlement Cashflow" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">Illustrative scenario</h2>
        <Card className="mb-6">
          <CardContent className="pt-5 space-y-3">
            <p className="text-sm font-semibold">Fictional single parent post-divorce</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Wallet className="w-4 h-4 text-primary" /><span>Receives a £45,000 capital settlement to put towards a deposit, child maintenance from ex (disregarded for UC), and works 20 hours/week.</span></div>
              <div className="flex items-center gap-2"><PoundSterling className="w-4 h-4 text-primary" /><span>If the £45,000 is held as cash, it exceeds the £16,000 UC capital limit and entitlement is lost. If used promptly to buy a home (capital becomes the disregarded property), UC entitlement may be preserved subject to the other rules.</span></div>
            </div>
            <p className="text-xs text-muted-foreground">Illustrative only. Always confirm with a benefits specialist or use a Turn2us / Citizens Advice entitlement check.</p>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-6">Information you will need to claim</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {["Bank, savings and investment details", "Information on any property other than your home", "National Insurance number", "Tenancy or mortgage details", "Childcare costs (if any)", "Income from employment or self-employment", "Spousal / child maintenance figures (disregarded but declared)", "Date of separation (for ending the joint claim)"].map((fig, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border">
              <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {fig}
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">Things the calculator cannot decide</h2>
        <div className="space-y-3 mb-6">
          {["Your exact UC entitlement — use a Turn2us or entitledto checker", "Whether 'deprivation of capital' rules might apply to your situation", "Whether help with mortgage interest (SMI loan) would benefit you"].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Official sources</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li><a className="underline hover:text-primary" href="https://www.gov.uk/universal-credit" target="_blank" rel="noopener noreferrer">GOV.UK — Universal Credit <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.gov.uk/support-for-mortgage-interest" target="_blank" rel="noopener noreferrer">GOV.UK — Support for Mortgage Interest (SMI loan) <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.citizensadvice.org.uk/helptoclaim/" target="_blank" rel="noopener noreferrer">Citizens Advice — Help to Claim Universal Credit <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://benefits-calculator.turn2us.org.uk/" target="_blank" rel="noopener noreferrer">Turn2us — Free benefits calculator <ExternalLink className="inline w-3 h-3" /></a></li>
        </ul>
        <p className="text-xs text-muted-foreground italic">General information only. Not legal, tax, financial or benefits advice. UC rules change — always check the current rules on GOV.UK or with a benefits adviser.</p>
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
