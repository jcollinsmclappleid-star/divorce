import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileText, AlertCircle, CheckSquare, ExternalLink, ScrollText } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const factors = [
  { label: "Spouse exemption ends with the marriage", desc: "Transfers between spouses or civil partners are exempt from Inheritance Tax (IHT) without limit while the marriage subsists. Once the marriage ends — at the date of the final order — that exemption is lost. Transfers under a court-ordered divorce settlement have separate, more limited reliefs." },
  { label: "Court-ordered transfers are usually exempt", desc: "Transfers made under or in pursuance of a court order in connection with divorce are generally treated as not being transfers of value for IHT — broadly recognising that they are not gifts but legal obligations. The HMRC IHT manual covers this in detail." },
  { label: "The Nil-Rate Band and RNRB still matter", desc: "The current Nil-Rate Band is £325,000 (frozen until April 2030 per current legislation) and the Residence Nil-Rate Band can add up to £175,000 for direct descendants inheriting the family home. After divorce you only have your own NRB — you no longer have access to your former spouse's NRB or transferable RNRB." },
  { label: "Existing wills are not revoked by divorce", desc: "A divorce does not automatically revoke an English will. However, the Wills Act 1837 (as amended) treats the former spouse as if they had died on the date of the divorce — so any gift to the former spouse fails and any appointment of them as executor is invalid. The remainder of the will continues to operate. Reviewing and updating your will after divorce is essential." },
  { label: "Trusts and life policies need separate review", desc: "Life policies written in trust for a former spouse, nominations on pensions, and existing trusts may all need to be updated after divorce. Pension scheme nominations are not part of your estate but are usually paid at the trustees' discretion based on your most recent expression of wish — leaving an out-of-date one in place can produce unintended outcomes." },
];

const faqItems = [
  { question: "Is there inheritance tax on a divorce settlement in the UK?", answer: "Generally no. Transfers of capital between spouses or former spouses made under or in pursuance of a court order on divorce (or separation agreement) are usually treated as not being transfers of value for IHT purposes. This is set out in HMRC's Inheritance Tax Manual. Informal gifts after the divorce is final, however, are not protected by the spousal exemption — they are treated as ordinary lifetime transfers." },
  { question: "Does divorce revoke my will?", answer: "Not entirely. Under section 18A of the Wills Act 1837 (as amended), the divorce does not revoke the will but treats your former spouse as if they had died on the date the marriage ended. Any gift to them fails and any appointment of them as executor is invalid. The rest of the will continues to operate — which is often not what people would have intended. Review and update your will as soon as possible after the divorce." },
  { question: "Will I lose the transferable Nil-Rate Band after divorce?", answer: "Yes. The transferable Nil-Rate Band lets a surviving spouse use their late partner's unused NRB on their own death — but only if you were married or in a civil partnership at the date of death. After divorce you have only your own NRB (currently £325,000) and your own RNRB (currently up to £175,000 if leaving a residence to direct descendants)." },
  { question: "What about pensions and IHT after divorce?", answer: "Most UK pensions sit outside the estate for IHT and pay out at the trustees' discretion. The pension scheme uses your most recent 'expression of wish' nomination as a key guide. After divorce you should update nominations — failing to do so can result in death benefits being paid to a former spouse rather than to children or new partners." },
  { question: "Are gifts I make to my children after divorce subject to IHT?", answer: "Lifetime gifts to anyone other than your spouse or civil partner are generally treated as 'potentially exempt transfers' (PETs). They become fully exempt if you survive seven years from the date of the gift. This is the standard IHT regime and is unaffected by your marital status — but losing the spouse exemption after divorce makes large transfers between former spouses post-decree taxable in principle." },
  { question: "Should I take advice on IHT around the time of divorce?", answer: "Yes — particularly if your estate is approaching or above the Nil-Rate Band (£325,000), you have business or agricultural assets, you hold property abroad, or you have minor children for whom you want trust protection. A specialist STEP-qualified solicitor or chartered tax adviser is the appropriate professional. This page is general information and not advice." },
];

const relatedPages = [
  { title: "Capital Gains Tax on Divorce UK", description: "The no-gain/no-loss period and the new 3-year rule.", href: "/capital-gains-tax-on-divorce-uk", badge: "Tax" },
  { title: "Steps After Final Order — Finances", description: "What to update, change and close after the divorce is finalised.", href: "/steps-after-final-order-finances-uk", badge: "Process" },
  { title: "Trust Assets in Divorce UK", description: "How trust interests are treated in financial settlements.", href: "/trust-assets-divorce-uk", badge: "Trusts" },
  { title: "Divorce and Life Insurance UK", description: "Updating beneficiaries and using policies as security.", href: "/divorce-and-life-insurance-uk", badge: "Insurance" },
];

export default function InheritanceTaxAfterDivorcePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Inheritance Tax After Divorce in the UK"
      subtitle="The spouse exemption ends with the marriage. Transfers under a court order are usually still IHT-free — but your will, your nominations and your future estate planning all need a fresh look."
      documentTitle="Inheritance Tax After Divorce UK | DivorceCalculatorUK"
      metaDescription="How divorce affects Inheritance Tax in the UK — spouse exemption, Nil-Rate Band, transferable allowances, wills under section 18A Wills Act, and updating pension nominations."
      relatedPages={relatedPages}
      breadcrumbs={[{ name: "Home", href: "/" }, { name: "Guides", href: "/divorce-financial-guides" }, { name: "Inheritance Tax After Divorce", href: "/inheritance-tax-after-divorce-uk" }]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Inheritance Tax (IHT) is rarely the headline issue in a UK divorce, but it should not be ignored. The unlimited spouse exemption ends with the marriage, the transferable Nil-Rate Band is lost, and existing wills and pension nominations almost always need updating.
        </p>
        <h2 className="text-2xl font-display font-bold mt-8 mb-4">Key IHT changes after divorce</h2>
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
        <InlineCTA label="Plan the Wider Financial Picture" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">Illustrative scenario</h2>
        <Card className="mb-6">
          <CardContent className="pt-5 space-y-3">
            <p className="text-sm font-semibold">Fictional homeowner, late 50s, divorcing after 22 years</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><FileText className="w-4 h-4 text-primary" /><span>Estate value post-settlement ≈ £600k (home £400k + pensions £150k + savings £50k). Will from 2010 leaves everything to husband as default.</span></div>
              <div className="flex items-center gap-2"><ScrollText className="w-4 h-4 text-primary" /><span>After divorce: section 18A treats husband as having died — any gift to him fails. Without an updated will, the residue may pass under intestacy rules to children. New will and updated pension nominations are essential housekeeping.</span></div>
            </div>
            <p className="text-xs text-muted-foreground">Illustrative only. Take advice from a STEP-qualified solicitor or chartered tax adviser.</p>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-6">Things to review post-divorce</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {["Make a new will reflecting your post-divorce wishes", "Update pension scheme expression of wish nominations", "Update life insurance beneficiary details", "Update ISA bare trust / nominations where applicable", "Review any joint accounts that were held with former spouse", "Consider whether trust planning is appropriate for children", "Update Lasting Power of Attorney if it appointed your former spouse", "Update digital asset access arrangements"].map((fig, i) => (
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
          {["Estimate your individual IHT exposure — that depends on your full estate and lifetime gifts history", "Replace a will, lasting power of attorney or trust deed", "Provide tax planning advice for your specific circumstances"].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Official sources</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li><a className="underline hover:text-primary" href="https://www.gov.uk/inheritance-tax" target="_blank" rel="noopener noreferrer">GOV.UK — Inheritance Tax <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual" target="_blank" rel="noopener noreferrer">HMRC — Inheritance Tax Manual <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.gov.uk/inheritance-tax/passing-on-home" target="_blank" rel="noopener noreferrer">GOV.UK — Inheritance Tax: passing on a home (RNRB) <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.gov.uk/make-will" target="_blank" rel="noopener noreferrer">GOV.UK — Making a will <ExternalLink className="inline w-3 h-3" /></a></li>
        </ul>
        <p className="text-xs text-muted-foreground italic">General information only. Not legal or tax advice. IHT planning is highly individual — take advice from a STEP-qualified solicitor or chartered tax adviser.</p>
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
