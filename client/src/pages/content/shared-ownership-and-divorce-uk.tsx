import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Home, AlertCircle, CheckSquare, ExternalLink, Building } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const factors = [
  { label: "Shared ownership is part-buy / part-rent", desc: "Shared ownership is a Help to Buy / affordable housing scheme run by housing associations and local authorities. Buyers purchase a share of the property (typically 25% to 75%) and pay rent on the remaining share to the housing association. The buyer's share is mortgaged in the normal way; the housing association retains the other share." },
  { label: "The housing association's consent is required", desc: "Any change of ownership — including transferring one party's share to the other on divorce — generally requires the housing association's express written consent. The lease usually contains specific provisions on transfers and assignment, and the association will check whether the remaining party can afford the rent and mortgage on a sole basis." },
  { label: "Affordability is reassessed for any transfer", desc: "If the property is to be transferred into one party's sole name, the housing association will reassess affordability against their criteria and the lender will reassess the mortgage. Many couples find that a single income cannot support both the mortgage and the rent — and the property has to be sold instead." },
  { label: "Selling involves the housing association", desc: "Shared ownership leases typically give the housing association first right to find a buyer (a 'nomination period') before the property can be marketed on the open market. This can extend the sale timeline and may affect the achievable price. Always check the lease terms with a conveyancing solicitor." },
  { label: "Equity is only on the share you own", desc: "The capital value at stake in a shared ownership divorce is only the equity in the share owned — not the whole property. A 50% share of a £300k property with a £100k mortgage represents £50k equity (50% × £300k = £150k value, less £100k mortgage). The remaining 50% belongs to the housing association and is not part of the matrimonial pool." },
];

const faqItems = [
  { question: "How does shared ownership work in a UK divorce?", answer: "The share of the property owned by the couple is a matrimonial asset and is dealt with like any other property — by sale, transfer to one party, or deferred sale. The complication is that any transfer or sale needs the housing association's involvement and consent, and affordability is reassessed for any transfer to a sole name." },
  { question: "Can one of us buy the other out of a shared ownership home?", answer: "In principle yes — but only if the housing association consents and the lender accepts a sole-name mortgage on the remaining share, and the remaining party can afford the mortgage plus the rent on the unowned share. In practice, single-income affordability is the main reason these transfers fail and the property has to be sold." },
  { question: "Do we have to sell back to the housing association?", answer: "Most shared ownership leases include a nomination period during which the housing association has first right to find a buyer (typically 4–8 weeks, but the lease will specify). After that period, the property can usually be marketed on the open market subject to the lease terms. The housing association is entitled to its share of the sale proceeds." },
  { question: "What about the rent owed during the divorce?", answer: "The rent on the unowned share continues to be payable to the housing association regardless of the divorce. Both joint tenants under the lease are normally jointly liable for the rent until the lease is varied or assigned. Falling behind on rent risks possession action by the housing association." },
  { question: "Does the divorce court treat shared ownership differently?", answer: "No — the court applies the same section 25 framework. The shared ownership share is just a particular type of property interest with practical complications. The financial settlement will deal with the equity in the owned share like any other property equity." },
  { question: "Where can I get more information on shared ownership?", answer: "GOV.UK publishes guidance on shared ownership homes for buyers and existing owners. The Leasehold Advisory Service (LEASE) provides free advice on shared ownership and other leasehold matters. For divorce-specific issues, take advice from a family solicitor and a conveyancing solicitor who is familiar with shared ownership." },
];

const relatedPages = [
  { title: "How Is Property Divided in Divorce?", description: "The general framework for sharing property on divorce.", href: "/how-is-property-divided-in-divorce-uk", badge: "Property" },
  { title: "Buying Partner Out of House", description: "Affordability checks and lender consent on a buyout.", href: "/buying-partner-out-of-house-divorce-uk", badge: "Buyout" },
  { title: "Both Names on Mortgage During Divorce", description: "Joint and several liability under shared mortgages.", href: "/both-names-on-mortgage-divorce-uk", badge: "Mortgage" },
  { title: "Negative Equity and Divorce", description: "When the mortgage exceeds the property value.", href: "/negative-equity-and-divorce-uk", badge: "Property" },
];

export default function SharedOwnershipDivorcePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Shared Ownership and Divorce in the UK"
      subtitle="Shared ownership is part-buy, part-rent. On divorce the owned share is matrimonial property — but every transfer or sale runs through the housing association, and affordability is the deciding factor."
      documentTitle="Shared Ownership and Divorce UK | DivorceCalculatorUK"
      metaDescription="How shared ownership works on divorce in the UK — buyouts, housing association consent, lender affordability, the nomination period, and joint liability for rent."
      relatedPages={relatedPages}
      breadcrumbs={[{ name: "Home", href: "/" }, { name: "Guides", href: "/divorce-financial-guides" }, { name: "Shared Ownership and Divorce", href: "/shared-ownership-and-divorce-uk" }]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Shared ownership has helped hundreds of thousands of UK households into property, but it adds a layer of complication on divorce that fully owned properties do not have. Every transfer or sale runs through the housing association, and the affordability test for the remaining party is usually the make-or-break issue.
        </p>
        <h2 className="text-2xl font-display font-bold mt-8 mb-4">How it works on divorce</h2>
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
        <InlineCTA label="Model a Buyout vs Sale Scenario" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">Illustrative example</h2>
        <Card className="mb-6">
          <CardContent className="pt-5 space-y-3">
            <p className="text-sm font-semibold">Fictional 50% shared ownership flat</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Home className="w-4 h-4 text-primary" /><span>Property value £300k → 50% owned share = £150k. Mortgage on owned share £110k → equity ≈ £40k.</span></div>
              <div className="flex items-center gap-2"><Building className="w-4 h-4 text-primary" /><span>Rent payable on the housing association's 50% share, plus mortgage payments, plus service charge. A single income often cannot service all three — sale (with HA nomination period) is frequently the only realistic outcome.</span></div>
            </div>
            <p className="text-xs text-muted-foreground">Illustrative only. Take advice from a conveyancing solicitor familiar with shared ownership leases.</p>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-6">Documents you will need</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {["Shared ownership lease (full document)", "Mortgage statement showing balance and term remaining", "Recent valuation by housing-association-approved surveyor", "Service charge and rent statements for the past year", "Affordability information for any proposed sole-name transfer", "Housing association nomination period and resale terms", "Stamp Duty Land Tax position on any transfer of equity", "Both parties' net incomes and outgoings"].map((fig, i) => (
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
          {["Tell you whether the housing association will consent to a transfer", "Confirm whether you would qualify for a sole-name shared ownership mortgage", "Calculate stamp duty in your specific transfer scenario"].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Official sources</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li><a className="underline hover:text-primary" href="https://www.gov.uk/shared-ownership-scheme" target="_blank" rel="noopener noreferrer">GOV.UK — Shared Ownership homes <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.lease-advice.org/" target="_blank" rel="noopener noreferrer">LEASE — Leasehold Advisory Service (free shared ownership advice) <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.gov.uk/stamp-duty-land-tax" target="_blank" rel="noopener noreferrer">GOV.UK — Stamp Duty Land Tax <ExternalLink className="inline w-3 h-3" /></a></li>
        </ul>
        <p className="text-xs text-muted-foreground italic">General information only. Not legal or financial advice. Shared ownership leases differ — always have your specific lease reviewed by a qualified conveyancing solicitor.</p>
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
