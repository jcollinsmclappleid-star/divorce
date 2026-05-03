import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Receipt, AlertCircle, CheckSquare, ExternalLink, Home } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const factors = [
  { label: "Both spouses are jointly liable while still living together", desc: "If you and your spouse both live in the same property, you are normally jointly and severally liable for the full council tax — meaning the council can pursue either of you for the full amount, not just your half. Joint liability ends when one party permanently moves out and the council is notified." },
  { label: "Single Person Discount may apply when one party leaves", desc: "When only one adult remains in the property, that person can apply for the 25% Single Person Discount on council tax. The departing spouse may also apply at their new address if they are the only adult there. Apply through the local council — backdated claims are usually possible to the date of separation." },
  { label: "Tell the council promptly", desc: "Councils need to know who is liable for council tax at any point in time. Notify the council of the change in occupancy as soon as one party moves out. Late notification can lead to disputes about who owes what during the gap period — and can affect any application for the Single Person Discount." },
  { label: "Council Tax Reduction is means-tested", desc: "Council Tax Reduction (CTR) — sometimes called Council Tax Support — is a separate means-tested scheme. Each council runs its own CTR scheme so rules vary. After divorce, lower-earning spouses (especially single parents) may be eligible for significant reductions on top of any single person discount. Apply through your local council." },
  { label: "Some properties may be temporarily exempt", desc: "Empty properties, properties undergoing major repairs, and properties left empty after a sole occupier moves into care or hospital may attract temporary exemptions or reductions. The rules vary by council but are particularly relevant where the matrimonial home is empty mid-sale during a divorce. Always check with the local council." },
];

const faqItems = [
  { question: "Who pays council tax during a divorce in the UK?", answer: "If both spouses still live in the property, both are jointly and severally liable. Once one moves out and notifies the council, the remaining occupier becomes solely liable from the date of departure. Where the moving spouse is the only adult at their new address, they can apply for the Single Person Discount there. Joint liability does not survive the date one party permanently leaves — but only if the council is told." },
  { question: "Can I claim the 25% single person discount when my spouse moves out?", answer: "Yes — you can apply to your local council once you become the only adult in the property. The discount can usually be backdated to the date your spouse permanently moved out. Provide evidence of the date of separation if asked. The discount continues for as long as you remain the only adult resident." },
  { question: "What if both names are on the council tax bill but only one of us still lives there?", answer: "Liability for council tax follows occupation, not the name on the historic bill. The council will update the account once told, and the person no longer living there ceases to be liable from the date they moved out. The new sole occupier becomes solely liable from that date — and may qualify for the Single Person Discount." },
  { question: "Do I get any help with council tax if I'm on a low income after separation?", answer: "Yes — Council Tax Reduction (CTR) is available to people on low incomes. The scheme is means-tested and varies by local authority — each English council designs its own CTR scheme (Scotland and Wales have national arrangements). Single parents post-separation often qualify for substantial reductions. Apply through your local council's website." },
  { question: "What about an empty matrimonial home awaiting sale?", answer: "An empty property is normally still chargeable to council tax. Some councils offer temporary discounts (e.g. for unfurnished empty properties) and some apply premiums where properties are empty for long periods. Always check with the local council — leaving an empty property without registering can lead to unexpected bills." },
  { question: "What about Scotland and Wales?", answer: "The general principles are similar across Great Britain, but the detailed rules and amounts differ. Scotland operates the Council Tax Reduction Scheme nationally; Wales has its own national scheme. Northern Ireland has rates rather than council tax — see nidirect.gov.uk for the parallel arrangements." },
];

const relatedPages = [
  { title: "Council Tax Single Person Discount After Divorce", description: "Applying for and keeping the 25% discount once you live alone.", href: "/council-tax-single-person-discount-divorce-uk", badge: "Discounts" },
  { title: "Moving Out During Divorce — Financial Impact", description: "The full picture of running two households.", href: "/moving-out-during-divorce-uk", badge: "Process" },
  { title: "Universal Credit After Divorce", description: "How separation triggers a new UC claim and changes housing support.", href: "/universal-credit-after-divorce-uk", badge: "Benefits" },
  { title: "Who Pays the Mortgage During Divorce", description: "Joint mortgage liability after separation.", href: "/who-pays-mortgage-during-divorce-uk", badge: "Mortgage" },
];

export default function CouncilTaxDuringDivorcePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Council Tax During Divorce in the UK"
      subtitle="Council tax liability follows occupation. When one spouse moves out, the discounts and reductions available change quickly — provided the council is told."
      documentTitle="Council Tax During Divorce UK | DivorceCalculatorUK"
      metaDescription="How council tax works during a UK divorce — joint liability, the 25% single person discount, Council Tax Reduction, empty property rules, and Scotland/Wales differences."
      relatedPages={relatedPages}
      breadcrumbs={[{ name: "Home", href: "/" }, { name: "Guides", href: "/divorce-financial-guides" }, { name: "Council Tax During Divorce", href: "/council-tax-during-divorce-uk" }]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Council tax is one of the easiest 'wins' to capture in the immediate post-separation period. The 25% Single Person Discount, Council Tax Reduction, and the change of occupier all reduce the bill — but they only apply once the council has been told who lives where.
        </p>
        <h2 className="text-2xl font-display font-bold mt-8 mb-4">How liability and discounts work</h2>
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
        <InlineCTA label="Model Your New Monthly Outgoings" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">Illustrative example</h2>
        <Card className="mb-6">
          <CardContent className="pt-5 space-y-3">
            <p className="text-sm font-semibold">Band D council tax £180/month — what changes when one party moves out</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Home className="w-4 h-4 text-primary" /><span><strong>Together</strong>: £180/month, jointly liable.</span></div>
              <div className="flex items-center gap-2"><Receipt className="w-4 h-4 text-primary" /><span><strong>One party moves out, applies for SPD</strong>: Remaining spouse pays £135/month (25% discount). Departing spouse pays at their new address — also potentially with SPD if living alone there.</span></div>
            </div>
            <p className="text-xs text-muted-foreground">Illustrative figures only — actual bills depend on band and local authority.</p>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-6">Things to do quickly</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {["Tell the local council the date of permanent separation", "Apply for Single Person Discount at the property where one adult remains", "Apply for Council Tax Reduction if on low income", "Open a council tax account at the new address (departing party)", "Ask about backdated discounts if separation predates the application", "Check whether the property is now an 'empty' chargeable property", "Cancel direct debits in joint names where appropriate", "Keep written records of when each party moved"].map((fig, i) => (
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
          {["Tell you the exact council tax band or bill in your area — check on your council's website", "Decide whether Council Tax Reduction applies in your specific circumstances", "Settle a dispute over historic joint liability with the council"].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Official sources</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li><a className="underline hover:text-primary" href="https://www.gov.uk/council-tax" target="_blank" rel="noopener noreferrer">GOV.UK — Council Tax overview <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.gov.uk/council-tax/discounts-for-disabled-people" target="_blank" rel="noopener noreferrer">GOV.UK — Council Tax discounts and disregards <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.gov.uk/apply-council-tax-reduction" target="_blank" rel="noopener noreferrer">GOV.UK — Apply for Council Tax Reduction <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.mygov.scot/council-tax-reduction" target="_blank" rel="noopener noreferrer">mygov.scot — Council Tax Reduction (Scotland) <ExternalLink className="inline w-3 h-3" /></a></li>
        </ul>
        <p className="text-xs text-muted-foreground italic">General information only. Not legal or financial advice. Council tax rules differ by local authority — always check directly with your council.</p>
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
