import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Globe, AlertCircle, CheckSquare, ExternalLink, PoundSterling } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const factors = [
  { label: "'Online divorce' usually means a paid service on top of the GOV.UK fee", desc: "Private 'online divorce' providers do not replace the official process — they sit alongside it. You are still applying through HM Courts & Tribunals Service via the GOV.UK portal. The provider's fee is for handling the paperwork, not for granting the divorce." },
  { label: "The £593 court fee is unavoidable", desc: "Whatever provider you use, the £593 court fee is payable separately to HMCTS (current at the time of writing — check GOV.UK). Some providers bundle this into their headline price; others quote excluding it. Always check what is included." },
  { label: "Most online services do not handle finances", desc: "The vast majority of online divorce providers handle the legal divorce paperwork only. Drafting and submitting a financial consent order is usually a separate, more expensive service — or not offered at all. This is the same risk as a fully DIY divorce." },
  { label: "Quality varies — check regulation", desc: "Some online providers are run by SRA-regulated solicitors; others are unregulated form-filling services. Regulation matters because regulated firms must hold professional indemnity insurance and follow Solicitors Regulation Authority rules. Check before you pay." },
  { label: "MoneyHelper and Citizens Advice are free", desc: "Before paying for a private online service, the Money and Pensions Service (MoneyHelper) and Citizens Advice both provide free online guidance on the divorce process. For most amicable divorces, these resources combined with the GOV.UK portal are sufficient to complete the legal divorce yourself." },
];

const faqItems = [
  { question: "How much does an online divorce cost in the UK?", answer: "Private 'online divorce' services typically charge between £150 and £600 for handling the paperwork, on top of the £593 court fee paid to HM Courts & Tribunals Service. Adding a financial consent order drafting service usually costs several hundred pounds more. Always check whether the £593 court fee is included in the headline price." },
  { question: "Is online divorce different from DIY divorce?", answer: "Slightly. A DIY divorce uses the GOV.UK portal directly with no third party involved. An 'online divorce' usually involves a private provider who completes the GOV.UK forms on your behalf for a fee. The underlying legal process and court fee are identical." },
  { question: "Are online divorce services regulated?", answer: "Some are; some are not. Look for providers run by Solicitors Regulation Authority (SRA) regulated firms — they must hold professional indemnity insurance and are subject to SRA conduct rules. Unregulated 'form-filling' services may be cheaper but offer less protection if something goes wrong." },
  { question: "Will an online divorce service deal with my finances?", answer: "Most do not, or only as a separate paid add-on. The legal divorce and the financial settlement are different processes — the divorce ends the marriage, the financial consent order makes any money agreement legally binding. Without a consent order, financial claims remain open even after the divorce is finalised." },
  { question: "Can I just use the GOV.UK portal directly?", answer: "Yes — and for most amicable divorces this is the cheapest route. The official 'Get a divorce' service on GOV.UK guides you through each step. You only need additional help if there are complications, contested issues, or you want assistance with the financial side." },
  { question: "Do I still need a solicitor if I use an online service?", answer: "Possibly — particularly for the financial side. The legal divorce can usually be completed without solicitor input, but the financial settlement is where most people benefit from at least a one-off consultation. Many family solicitors offer fixed-fee initial meetings." },
];

const relatedPages = [
  { title: "DIY Divorce UK Cost", description: "Doing the divorce yourself directly through GOV.UK.", href: "/diy-divorce-uk-cost", badge: "Process" },
  { title: "Mediation vs Court — Costs", description: "How professional support compares with self-represented routes.", href: "/mediation-vs-court-divorce-uk-costs", badge: "Costs" },
  { title: "What Is a Consent Order?", description: "Why a financial agreement isn't binding without one.", href: "/what-is-a-consent-order-uk-divorce", badge: "Orders" },
  { title: "Do I Need a Solicitor for the Financial Settlement?", description: "Where professional input is genuinely worth it.", href: "/do-i-need-a-solicitor-for-financial-settlement-uk", badge: "Decisions" },
];

export default function OnlineDivorceCostPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Online Divorce UK: What It Costs and What's Included"
      subtitle="Online divorce providers handle the paperwork on top of the official GOV.UK process. Understand what you're paying for, what's not included, and whether you need it."
      documentTitle="Online Divorce UK Cost | DivorceCalculatorUK"
      metaDescription="What an online divorce really costs in the UK — provider fees vs the £593 court fee, what's included, financial consent orders, and how to compare with DIY."
      relatedPages={relatedPages}
      breadcrumbs={[{ name: "Home", href: "/" }, { name: "Guides", href: "/divorce-financial-guides" }, { name: "Online Divorce Cost", href: "/online-divorce-uk-cost" }]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          'Online divorce' is marketing language. It usually means a private service that helps you complete the official divorce process on GOV.UK in exchange for a fee — it does not replace the court process or the £593 court fee. Whether it is worth paying depends on how comfortable you are with paperwork and what is included.
        </p>
        <h2 className="text-2xl font-display font-bold mt-8 mb-4">What you are actually paying for</h2>
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
        <InlineCTA label="See What Your Settlement Could Look Like" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">Indicative price comparison</h2>
        <Card className="mb-6">
          <CardContent className="pt-5 space-y-3">
            <p className="text-sm font-semibold">Three routes — what you typically pay</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Globe className="w-4 h-4 text-primary" /><span><strong>Direct via GOV.UK</strong>: £593 court fee only. Free guidance available from MoneyHelper and Citizens Advice.</span></div>
              <div className="flex items-center gap-2"><PoundSterling className="w-4 h-4 text-primary" /><span><strong>Online provider (paperwork only)</strong>: ~£150–£600 service fee + £593 court fee.</span></div>
              <div className="flex items-center gap-2"><PoundSterling className="w-4 h-4 text-primary" /><span><strong>High-street solicitor (uncontested)</strong>: typically £500–£1,500 in fees + £593 court fee, plus separate fees if a financial consent order is needed.</span></div>
            </div>
            <p className="text-xs text-muted-foreground">Indicative ranges — actual prices vary significantly by provider and complexity.</p>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-6">What to check before paying</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {["Is the £593 court fee included in the price or extra?", "Is the provider regulated by the SRA?", "Does it cover financial consent orders, or just the divorce?", "What happens if my spouse disputes anything?", "Are there hidden fees (e.g. for amendments or chasing)?", "Is professional indemnity insurance in place?", "Are reviews from independent sources (e.g. Trustpilot) credible?", "Is there a fixed price or hourly billing?"].map((fig, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border">
              <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {fig}
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">Where online divorce is genuinely risky</h2>
        <div className="space-y-3 mb-6">
          {["Significant assets, pensions, or businesses that need professional valuation", "Any disagreement about children, money, or property", "International elements (one party abroad, foreign property)", "If you do not also obtain a financial consent order — claims remain open"].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Official sources</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li><a className="underline hover:text-primary" href="https://www.gov.uk/divorce" target="_blank" rel="noopener noreferrer">GOV.UK — Get a divorce <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.sra.org.uk/" target="_blank" rel="noopener noreferrer">Solicitors Regulation Authority (SRA) <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.moneyhelper.org.uk/en/family-and-care/divorce-and-separation" target="_blank" rel="noopener noreferrer">MoneyHelper — Divorce and separation <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.citizensadvice.org.uk/family/ending-a-relationship/" target="_blank" rel="noopener noreferrer">Citizens Advice — Ending a relationship <ExternalLink className="inline w-3 h-3" /></a></li>
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
