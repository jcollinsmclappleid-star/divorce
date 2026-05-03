import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Receipt, AlertCircle, CheckSquare, ExternalLink, Calendar } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const factors = [
  { label: "Marriage Allowance is only for married couples and civil partners", desc: "Marriage Allowance lets a non-taxpaying spouse or civil partner transfer 10% of their personal allowance (£1,260 in the 2024/25 tax year) to a basic-rate-taxpaying partner. It is administered by HMRC and applied automatically once registered. Cohabiting couples cannot claim it." },
  { label: "It usually ends when the marriage ends", desc: "Marriage Allowance ceases for the tax year following the year the divorce or dissolution becomes final. You can ask HMRC to backdate the cancellation to the date of separation if needed. Keeping it running into a year you are no longer married can cause complications and tax adjustments later." },
  { label: "You should tell HMRC about the change", desc: "HMRC will not always automatically know about a divorce or separation. You can update your circumstances in your Personal Tax Account on GOV.UK. Whichever spouse made the original Marriage Allowance election can normally cancel it; the receiving spouse can also tell HMRC if they no longer want to receive the transfer." },
  { label: "Backdated claims may still be possible", desc: "Marriage Allowance can be backdated up to four tax years where you were eligible during those years. If you were married, eligible, and never claimed, you may still be able to recover Marriage Allowance for past tax years even if you are now divorced — provided you were married during those tax years." },
  { label: "Different from the Married Couple's Allowance", desc: "Marriage Allowance and Married Couple's Allowance are different. Married Couple's Allowance only applies where one spouse was born before 6 April 1935 — a small group. Most divorcing couples are dealing with the standard Marriage Allowance." },
];

const faqItems = [
  { question: "What happens to Marriage Allowance when I divorce in the UK?", answer: "Marriage Allowance ends at the end of the tax year in which the divorce becomes final, unless you ask HMRC to cancel earlier (e.g. backdated to the date of separation). You can update your circumstances in your Personal Tax Account on GOV.UK. The receiving partner's tax code will be adjusted to remove the additional allowance for the next tax year." },
  { question: "Will I owe tax if Marriage Allowance ends mid-year?", answer: "Possibly. If the receiving partner has had a higher personal allowance during a tax year and the transfer is later cancelled retrospectively, HMRC will recalculate their tax position. This may produce a small underpayment that is collected through a future tax code adjustment. Conversely, if the transferring partner started earning more, they may have paid too much tax — refundable on request." },
  { question: "Can I claim Marriage Allowance for past tax years even though I'm now divorced?", answer: "Yes — Marriage Allowance can be backdated up to four tax years where you were married and eligible during those years. The current claim window covers tax years going back four years from the current one. Apply via GOV.UK. This can produce a useful tax refund even if you have already divorced." },
  { question: "How much is Marriage Allowance worth?", answer: "It allows the transfer of £1,260 of unused personal allowance for the 2024/25 tax year (10% of the standard £12,570 personal allowance). For a basic-rate taxpayer (20%) that is worth up to £252 per tax year. Always check GOV.UK for the current figures, which can change at each Budget." },
  { question: "Does Marriage Allowance affect my divorce settlement?", answer: "No — it is a small ongoing tax benefit, not part of the matrimonial assets. The settlement deals with capital, pensions and ongoing maintenance. Marriage Allowance is simply a tax administration matter that should be tidied up around the time of the divorce." },
  { question: "Where do I update HMRC?", answer: "Through your Personal Tax Account on GOV.UK, or by phoning HMRC on 0300 200 3300. The Personal Tax Account lets you cancel Marriage Allowance, update your address and check your tax code in one place — useful housekeeping after a divorce." },
];

const relatedPages = [
  { title: "Capital Gains Tax on Divorce UK", description: "How CGT applies on property and asset transfers — and the no-gain/no-loss period.", href: "/capital-gains-tax-on-divorce-uk", badge: "Tax" },
  { title: "Inheritance Tax After Divorce UK", description: "How divorce changes your IHT position and exempt transfers.", href: "/inheritance-tax-after-divorce-uk", badge: "Tax" },
  { title: "Council Tax During Divorce", description: "Single person discount and Council Tax Reduction.", href: "/council-tax-during-divorce-uk", badge: "Tax" },
  { title: "Spousal Maintenance Tax Treatment", description: "How maintenance is taxed in the UK.", href: "/spousal-maintenance-after-divorce-uk", badge: "Maintenance" },
];

export default function MarriageAllowanceAfterDivorcePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Marriage Allowance After Divorce in the UK"
      subtitle="Marriage Allowance is a small but useful tax benefit for married couples. It does not survive divorce — but a backdated claim can still produce a refund years later."
      documentTitle="Marriage Allowance After Divorce UK | DivorceCalculatorUK"
      metaDescription="What happens to Marriage Allowance when you divorce in the UK — when it ends, how to cancel it with HMRC, and how to claim backdated allowance from previous tax years."
      relatedPages={relatedPages}
      breadcrumbs={[{ name: "Home", href: "/" }, { name: "Guides", href: "/divorce-financial-guides" }, { name: "Marriage Allowance After Divorce", href: "/marriage-allowance-after-divorce-uk" }]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Marriage Allowance is one of the small administrative tax matters that should be tidied up at the time of a divorce. It is worth up to £252 per tax year, and getting the timing of cancellation right avoids messy tax code corrections later.
        </p>
        <h2 className="text-2xl font-display font-bold mt-8 mb-4">Key points</h2>
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
        <InlineCTA label="Model the Wider Tax Picture" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">Illustrative scenario</h2>
        <Card className="mb-6">
          <CardContent className="pt-5 space-y-3">
            <p className="text-sm font-semibold">Fictional couple — Marriage Allowance claim during a divorce year</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Receipt className="w-4 h-4 text-primary" /><span>Wife (low earner) had transferred Marriage Allowance to husband (basic-rate taxpayer) for several years. Couple separates in May; divorce final the following March.</span></div>
              <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /><span>Marriage Allowance can be cancelled now (effective from the next tax year) or backdated to the date of separation if either party prefers. Either party can also claim backdated allowance for any of the previous four eligible tax years if not already done.</span></div>
            </div>
            <p className="text-xs text-muted-foreground">Illustrative only. Tax figures based on 2024/25 — always check current GOV.UK figures.</p>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-6">Quick housekeeping checklist after divorce</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {["Cancel or update Marriage Allowance via your Personal Tax Account", "Update your address with HMRC", "Update your tax code if it shows the wrong allowances", "Claim any backdated Marriage Allowance for past years where eligible", "Tell DWP about the change in relationship status", "Update child benefit details if applicable", "Update your bank, employer and pension provider", "Review your will (it is not automatically revoked by divorce, but its effect is altered)"].map((fig, i) => (
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
          {["Submit any tax change to HMRC on your behalf — that's done in your Personal Tax Account", "Tell you the exact tax effect of cancellation in your circumstances", "Decide whether a backdated claim is in your interest"].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Official sources</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li><a className="underline hover:text-primary" href="https://www.gov.uk/marriage-allowance" target="_blank" rel="noopener noreferrer">GOV.UK — Marriage Allowance <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.gov.uk/marriage-allowance/if-your-circumstances-change" target="_blank" rel="noopener noreferrer">GOV.UK — Marriage Allowance: if your circumstances change <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.gov.uk/personal-tax-account" target="_blank" rel="noopener noreferrer">GOV.UK — Personal tax account <ExternalLink className="inline w-3 h-3" /></a></li>
        </ul>
        <p className="text-xs text-muted-foreground italic">General information only. Not tax advice. Tax allowances and rates change — always check current figures on GOV.UK.</p>
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
