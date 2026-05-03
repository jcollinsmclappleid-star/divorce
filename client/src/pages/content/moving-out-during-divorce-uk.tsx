import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Home, AlertCircle, CheckSquare, ExternalLink, DoorOpen } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const factors = [
  { label: "Moving out does not lose you a share of the home", desc: "There is a persistent myth that the spouse who leaves the family home gives up their share. This is not the case in English and Welsh law. Whoever owns the property (legally or beneficially) retains their interest until a financial settlement deals with it. Matrimonial home rights under the Family Law Act 1996 protect the non-owner spouse's right to occupy until the divorce is finalised." },
  { label: "Two households cost more than one", desc: "The biggest financial impact of moving out is the immediate doubling of housing costs. Rent or a second mortgage, utilities, council tax (subject to the single person discount), and furnishing a second home all hit at once. This is the headline number people most often underestimate." },
  { label: "It can affect the practical 'first consideration' for children", desc: "Section 25(1) of the Matrimonial Causes Act 1973 makes the welfare of any minor children the court's first consideration. Establishing a stable second home where the children spend time matters for child arrangements proceedings — but moving out does not automatically affect your role as a parent." },
  { label: "Mortgage and bills don't pause", desc: "If you move out and stop paying the mortgage on the family home, the lender can still pursue you (and harm your credit file) because both joint borrowers remain liable. Agreeing in writing who pays what during the period of separation — and maintaining that — is critical." },
  { label: "Domestic abuse situations are different", desc: "Where there is domestic abuse, immediate safety takes priority. An occupation order under the Family Law Act 1996 can require a perpetrator to leave the family home. Refuge, the National Domestic Abuse Helpline (0808 2000 247) and Women's Aid provide 24/7 support. Take specialist advice — moving out for safety reasons does not weaken your financial position." },
];

const faqItems = [
  { question: "Will I lose my share of the house if I move out during divorce?", answer: "No. Your legal or beneficial ownership of the property is unaffected by where you physically live. Until a financial settlement (consent order or court order) deals with the property, your interest is preserved. The myth that 'whoever leaves loses' is not how English law works." },
  { question: "Should I move out before the divorce is finalised?", answer: "It depends entirely on your circumstances. For some couples, separating households reduces conflict and helps everyone — including children — adjust. For others, the cost of running two households is unaffordable until the financial settlement is sorted. There is no one right answer, but the financial impact should be modelled before deciding." },
  { question: "Who pays the mortgage if one person moves out?", answer: "Both joint borrowers remain liable to the lender regardless of who lives in the property. As between the parties, you can agree (and ideally document) how the mortgage and other bills are divided during the separation period. If no agreement is reached, the spouse remaining in the home is often expected to take on more of the housing costs in exchange for sole occupation — but this is fact-specific." },
  { question: "What if my spouse refuses to move out?", answer: "Neither spouse can usually force the other out of the matrimonial home through the divorce courts in normal circumstances. Where conduct or domestic abuse is involved, an occupation order under the Family Law Act 1996 may be available. Otherwise, separation under the same roof or one party voluntarily leaving are the practical options." },
  { question: "What about council tax if I move out?", answer: "If only one adult remains in the property, they may be entitled to the 25% single person discount on council tax. Apply through the local council. The departing spouse may need to register at their new address — and if living alone there, may also qualify for the single person discount. See GOV.UK for details." },
  { question: "Does the calculator help me decide whether to move out?", answer: "Yes — you can model both scenarios (one party staying or both rehousing) and see the impact on monthly cashflow, savings runway, and 5-year financial position. This helps you understand the real cost of moving out before making the decision." },
];

const relatedPages = [
  { title: "Who Pays the Mortgage During Divorce?", description: "How joint mortgage liability works after one party moves out.", href: "/who-pays-mortgage-during-divorce-uk", badge: "Mortgage" },
  { title: "Council Tax During Divorce", description: "Single person discount, change of address, and dual liability.", href: "/council-tax-during-divorce-uk", badge: "Tax" },
  { title: "Both Names on Mortgage During Divorce", description: "Joint and several liability — what it really means.", href: "/both-names-on-mortgage-divorce-uk", badge: "Mortgage" },
  { title: "Maintenance Pending Suit", description: "Interim financial support during the divorce process.", href: "/maintenance-pending-suit-uk", badge: "Interim" },
];

export default function MovingOutDuringDivorcePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Moving Out During Divorce in the UK: Financial Impact"
      subtitle="Moving out does not mean giving up your share of the home — but it does mean running two households. Here is what to model and what to agree before you go."
      documentTitle="Moving Out During Divorce UK | DivorceCalculatorUK"
      metaDescription="The financial impact of moving out during a UK divorce — joint mortgage liability, council tax, matrimonial home rights, and the realities of running two households."
      relatedPages={relatedPages}
      breadcrumbs={[{ name: "Home", href: "/" }, { name: "Guides", href: "/divorce-financial-guides" }, { name: "Moving Out During Divorce", href: "/moving-out-during-divorce-uk" }]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          One of the most asked questions in UK divorce is whether moving out of the family home damages your financial position. The legal answer is no — your ownership and matrimonial home rights are preserved. The practical answer is that running two households is expensive, and the decision to move out should be modelled before being made.
        </p>
        <h2 className="text-2xl font-display font-bold mt-8 mb-4">Key things to know</h2>
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
        <InlineCTA label="Model the Cost of Two Households" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">Illustrative cost comparison</h2>
        <Card className="mb-6">
          <CardContent className="pt-5 space-y-3">
            <p className="text-sm font-semibold">Fictional family — same household budget, before vs after one party moves out</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Home className="w-4 h-4 text-primary" /><span><strong>Together</strong>: One mortgage £950, council tax £180, utilities £200, food £600 — total ≈ £1,930/month for housing and basics.</span></div>
              <div className="flex items-center gap-2"><DoorOpen className="w-4 h-4 text-primary" /><span><strong>Apart</strong>: Mortgage £950 + rent £900, two council tax bills (with single-person discounts), two utility bills, two food shops — typically £3,000–£3,500/month combined.</span></div>
            </div>
            <p className="text-xs text-muted-foreground">Illustrative only. Actual figures vary widely by region and household.</p>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-6">Things to agree (in writing) before moving out</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {["Who pays the mortgage and in what share", "Who pays each utility and council tax bill", "How joint bank accounts will be handled", "Arrangements for children — overnight stays, transport, school runs", "Whether contents are split or shared", "How long the arrangement is intended to last", "Any interim spousal maintenance arrangement", "Whether either party will speak to the lender about forbearance"].map((fig, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border">
              <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {fig}
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">When to take advice before moving</h2>
        <div className="space-y-3 mb-6">
          {["If your name is not on the deeds — register matrimonial home rights at HM Land Registry first", "If there is any history of domestic abuse — contact a specialist advisor or the National Domestic Abuse Helpline", "If you have minor children — take advice on child arrangements before establishing a new home", "If you cannot afford to maintain payments to both homes"].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Official sources</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li><a className="underline hover:text-primary" href="https://www.legislation.gov.uk/ukpga/1996/27/contents" target="_blank" rel="noopener noreferrer">Family Law Act 1996 — Home rights and occupation orders <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.gov.uk/council-tax/who-has-to-pay" target="_blank" rel="noopener noreferrer">GOV.UK — Council Tax discounts <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.gov.uk/government/publications/registering-matrimonial-home-rights-pg20" target="_blank" rel="noopener noreferrer">HM Land Registry — Registering matrimonial home rights (PG20) <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.nationaldahelpline.org.uk/" target="_blank" rel="noopener noreferrer">National Domestic Abuse Helpline — 0808 2000 247 <ExternalLink className="inline w-3 h-3" /></a></li>
        </ul>
        <p className="text-xs text-muted-foreground italic">General information only. Not legal advice. Take advice from a qualified family solicitor before moving out, especially where there is dispute or any history of abuse.</p>
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
