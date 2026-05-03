import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Scale, AlertCircle, CheckSquare, ExternalLink, MapPin } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const factors = [
  { label: "Different statute, different principles", desc: "Divorce in Scotland is governed by the Family Law (Scotland) Act 1985, not the English Matrimonial Causes Act 1973. The starting point is fair sharing of matrimonial property, with a strong presumption of equal division — quite different from the broad section 25 discretion in England and Wales." },
  { label: "Only matrimonial property is shared", desc: "Scottish law shares only matrimonial property — broadly, assets acquired between the date of marriage and the relevant date (usually the date of separation), excluding inheritances and gifts received from third parties. Property owned before the marriage and inheritances are generally retained by the spouse who brought them in or received them." },
  { label: "Equal sharing is the presumption", desc: "Section 9 of the 1985 Act sets out five principles, the first of which is that net matrimonial property should be shared equally unless there are 'special circumstances' justifying departure. This is a much stronger presumption of equality than in England and Wales." },
  { label: "Periodical allowance is generally short-term", desc: "Spousal maintenance ('periodical allowance') in Scotland is normally limited to three years post-divorce under section 9(1)(d) of the 1985 Act, intended to allow the recipient time to adjust to the loss of financial support — not to maintain them indefinitely. Capital lump sums tend to be the primary mechanism for fair sharing." },
  { label: "Court fees and process are different", desc: "Scottish divorce is administered by the Sheriff Court or, in some cases, the Court of Session. Fees, procedure and timescales differ from England and Wales. The Scottish Courts and Tribunals Service (scotcourts.gov.uk) publishes the current fees. Many simpler divorces use the simplified procedure available in Sheriff Court." },
];

const faqItems = [
  { question: "How is divorce financial settlement different in Scotland?", answer: "The legal framework is entirely separate. Scotland operates under the Family Law (Scotland) Act 1985, which focuses on matrimonial property accumulated between marriage and the date of separation, with a strong presumption of equal sharing. England and Wales operate under the Matrimonial Causes Act 1973, which gives courts much wider discretion under section 25 factors and recognises long-term spousal maintenance more readily." },
  { question: "What counts as matrimonial property in Scotland?", answer: "Broadly, all assets and pensions acquired by either spouse between the date of marriage and the 'relevant date' (usually separation) — except gifts and inheritances received from third parties. The matrimonial home and its contents are matrimonial property even if bought by one party before the marriage, provided they were acquired for use as a family home." },
  { question: "Is everything split 50/50 in Scottish divorce?", answer: "The presumption is fair sharing, which usually means equal sharing of net matrimonial property — but the Family Law (Scotland) Act 1985 lets the court depart from equal sharing where there are 'special circumstances' (for example, sources of funds outside the marriage, agreements between the parties, the use of property after separation). In practice the 50/50 baseline is much stronger than in England." },
  { question: "Is there spousal maintenance in Scotland?", answer: "Periodical allowance under section 9(1)(d) of the 1985 Act exists, but it is normally limited to three years post-divorce — designed to allow the lower-earning spouse to adjust to the loss of support. Open-ended maintenance is rare. The presumption is for fair sharing of capital and a clean break, with periodical allowance only as a transitional measure." },
  { question: "Where do I apply for divorce in Scotland?", answer: "Most divorces are dealt with by the Sheriff Court for the area you live in. The Court of Session in Edinburgh handles more complex cases. The Scottish Courts and Tribunals Service publishes information on procedure and fees on scotcourts.gov.uk. There is a 'simplified procedure' for straightforward divorces with no children under 16 and no financial issues." },
  { question: "What about pensions in Scottish divorce?", answer: "Pension sharing applies in Scotland in the same way as in England and Wales — under the Welfare Reform and Pensions Act 1999 (UK-wide). What differs is that only the proportion of pension accrued during the marriage forms part of matrimonial property. A pension valuation is normally apportioned between marriage and pre-marriage periods, and only the marriage portion is shared." },
];

const relatedPages = [
  { title: "Divorce in Northern Ireland", description: "How financial settlements work under NI's separate legislation.", href: "/divorce-in-northern-ireland-financial-settlement", badge: "Jurisdiction" },
  { title: "Section 25 Factors Explained (E&W)", description: "The English/Welsh framework — for comparison.", href: "/section-25-factors-divorce-uk", badge: "Law" },
  { title: "Pension Sharing vs Offsetting", description: "How pensions are dealt with on divorce across the UK.", href: "/pension-sharing-vs-offsetting-uk", badge: "Pensions" },
  { title: "Pre-Marital Assets in Divorce", description: "How pre-marital property is treated — different in Scotland.", href: "/pre-marital-assets-divorce-uk", badge: "Assets" },
];

export default function DivorceInScotlandPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Divorce in Scotland: Financial Settlement Differences"
      subtitle="Scotland operates under the Family Law (Scotland) Act 1985 — a different statute, with stronger equal sharing, a tighter definition of matrimonial property, and time-limited periodical allowance."
      documentTitle="Divorce in Scotland Financial Settlement | DivorceCalculatorUK"
      metaDescription="How divorce financial settlements work in Scotland under the Family Law (Scotland) Act 1985 — matrimonial property, equal sharing, short-term periodical allowance, Sheriff Court."
      relatedPages={relatedPages}
      breadcrumbs={[{ name: "Home", href: "/" }, { name: "Guides", href: "/divorce-financial-guides" }, { name: "Divorce in Scotland", href: "/divorce-in-scotland-financial-settlement" }]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Scottish divorce law is genuinely different from English law — not a regional variation but a separate framework. If you live in Scotland, English guides can be misleading. The 1985 Act gives Scottish courts a tighter, more prescriptive set of principles than the broad discretion exercised by English courts.
        </p>
        <h2 className="text-2xl font-display font-bold mt-8 mb-4">How Scottish divorce differs</h2>
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
        <InlineCTA label="Model an Equal-Sharing Outcome" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">Illustrative scenario</h2>
        <Card className="mb-6">
          <CardContent className="pt-5 space-y-3">
            <p className="text-sm font-semibold">Fictional Scottish couple — 15-year marriage</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /><span>Wife inherited £80k during the marriage (kept in a separate account); husband owned the flat before the marriage. Both contributed during the marriage to a new family home, joint savings and pensions.</span></div>
              <div className="flex items-center gap-2"><Scale className="w-4 h-4 text-primary" /><span>Scottish approach: inheritance excluded from matrimonial property; pre-marital flat excluded; matrimonial property (new home equity, savings, pensions accrued during marriage) shared broadly equally — section 9(1)(a) presumption.</span></div>
            </div>
            <p className="text-xs text-muted-foreground">Illustrative only — take Scottish-qualified advice for your specific case.</p>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-6">Documents and information you will need</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {["Date of marriage and date of separation (the 'relevant date')", "Asset values at the relevant date (not at the date of court order)", "Pension CETVs apportioned for the marriage period", "Inheritance and gift documentation (excluded property)", "Pre-marital ownership records for the home", "Any pre-nuptial or post-nuptial agreement", "Both parties' incomes and outgoings", "Sheriff Court fee schedule from scotcourts.gov.uk"].map((fig, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border">
              <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {fig}
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">Things the calculator cannot do for Scottish divorces</h2>
        <div className="space-y-3 mb-6">
          {["Apportion pensions between marriage and pre-marriage periods — needs a PODE familiar with Scots law", "Predict whether 'special circumstances' would justify a departure from equal sharing", "Replace advice from a Scottish-qualified family solicitor"].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Official sources</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li><a className="underline hover:text-primary" href="https://www.legislation.gov.uk/ukpga/1985/37/contents" target="_blank" rel="noopener noreferrer">Family Law (Scotland) Act 1985 <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.scotcourts.gov.uk/" target="_blank" rel="noopener noreferrer">Scottish Courts and Tribunals Service <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.mygov.scot/divorce-dissolution" target="_blank" rel="noopener noreferrer">mygov.scot — Divorce and dissolution of civil partnership <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.lawscot.org.uk/find-a-solicitor/" target="_blank" rel="noopener noreferrer">Law Society of Scotland — Find a solicitor <ExternalLink className="inline w-3 h-3" /></a></li>
        </ul>
        <p className="text-xs text-muted-foreground italic">General information only. Not legal advice. The Divorce Calculator UK financial engine reflects general principles and does not specifically replicate the Scottish 'matrimonial property' apportionment — Scottish-qualified advice is essential.</p>
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
