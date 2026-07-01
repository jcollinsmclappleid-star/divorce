import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Coins, AlertTriangle, CheckSquare, AlertCircle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const considerations = [
  { title: "Crypto is treated as property", desc: "UK courts treat cryptocurrency holdings as property — part of the matrimonial pot in the same way as shares, bank balances or other investment assets. They must be disclosed in Form E like any other asset." },
  { title: "Valuation is fluid", desc: "Crypto values move significantly day to day. A snapshot value at the disclosure date may differ markedly from the value at settlement. Settlements often specify a valuation date and approach to handle this." },
  { title: "Disclosure is challenging but enforceable", desc: "Hiding crypto is harder than it once was. Exchange records, wallet histories, bank transfers funding crypto purchases, and forensic blockchain analysis can all uncover undisclosed holdings. Non-disclosure carries the same serious consequences as for any other asset." },
  { title: "Splitting crypto in kind vs cashing out", desc: "Crypto can be transferred between wallets (split in kind) or sold and the proceeds split. Each approach has different tax and risk implications — particularly where market movement is significant." },
  { title: "Capital gains tax on disposal", desc: "Selling cryptocurrency can crystallise capital gains tax. Transfers between separating spouses may benefit from the no-gain/no-loss treatment available for divorce-related transfers — qualified tax advice is needed." },
  { title: "Self-custody vs exchange-held assets", desc: "Crypto held on an exchange is much easier to verify than self-custodied crypto in private wallets. Self-custodied holdings may require specific disclosure of wallet addresses and transaction histories." },
];

const figures = [
  "List of all cryptocurrency holdings (asset, amount, location)",
  "Exchange accounts (with addresses, login records, transaction history)",
  "Self-custody wallet addresses",
  "Acquisition cost of each holding (for CGT purposes)",
  "Current market value at the disclosure date",
  "Bank transfers to/from exchanges over the past 12+ months",
  "Records of any DeFi positions, NFTs, or staking arrangements",
  "Tax records showing any gains realised in recent years",
];

const faqItems = [
  {
    question: "Does cryptocurrency have to be disclosed in UK divorce?",
    answer: "Yes. Cryptocurrency is treated as property and must be disclosed on Form E or in voluntary financial disclosure like any other asset. Hiding crypto carries the same consequences as hiding cash or investments — the settlement can be set aside, costs orders can be made, and serious cases can result in contempt proceedings.",
  },
  {
    question: "How is crypto valued for divorce purposes?",
    answer: "Crypto is typically valued at the prevailing market rate on a specified date — often the date of disclosure or the date of the final hearing. Because values move significantly, settlements often specify the valuation methodology to avoid disputes. Some settlements split crypto in kind (transferring units between wallets) rather than valuing in cash to manage the volatility.",
  },
  {
    question: "Can my ex hide crypto from me?",
    answer: "It's harder than it used to be. Bank transfers funding crypto purchases, exchange records, blockchain analysis, and forensic accounting can all uncover undisclosed holdings. If you suspect undisclosed crypto, your solicitor can apply for specific disclosure orders or use forensic specialists. Successful concealment is becoming rarer.",
  },
  {
    question: "What if the crypto value changes between disclosure and settlement?",
    answer: "This is a real risk and a common dispute. Some settlements lock in the valuation at a specific date; others split in kind so both parties share the upside and downside; others use a moving valuation with a specified completion date. The suitable route depends on the size of the holding and the parties' attitudes to risk.",
  },
  {
    question: "Are NFTs and DeFi positions matrimonial assets too?",
    answer: "Yes — any digital asset with value forms part of the matrimonial pot. NFTs, DeFi positions (lending, staking, liquidity provision), and other crypto-related holdings all need to be disclosed. Valuation can be more complex than for plain cryptocurrencies and may require specialist input.",
  },
  {
    question: "What about capital gains tax when splitting crypto?",
    answer: "Selling crypto crystallises a CGT event. Transfers between separating spouses may qualify for the no-gain/no-loss treatment under the rules that apply to divorce — meaning the receiving spouse takes on the original acquisition cost. Qualified tax advice is normally needed because the rules are technical and the gains can be substantial.",
  },
];

const relatedPages = [
  { title: "Capital Gains Tax on Divorce UK", description: "Tax implications of disposing of crypto and other assets.", href: "/capital-gains-tax-on-divorce-uk", badge: "Tax" },
  { title: "Form E Financial Disclosure UK", description: "How to disclose crypto holdings properly.", href: "/form-e-financial-disclosure-uk", badge: "Disclosure" },
  { title: "Can I Hide Assets in Divorce UK?", description: "What happens when assets are concealed.", href: "/can-i-hide-assets-in-divorce-uk", badge: "Disputes" },
  { title: "Preview the Full Financial Report", description: "Model settlements including digital assets.", href: "/unlock", badge: "Report" },
];

export default function CryptocurrencyDivorcePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Cryptocurrency in UK Divorce"
      subtitle="Bitcoin, Ethereum, NFTs and DeFi positions are all part of the matrimonial pot — to be disclosed and divided like any other asset. The challenges are valuation volatility, disclosure verification, and tax."
      documentTitle="Cryptocurrency in Divorce UK | DivorceCalculatorUK"
      metaDescription="How cryptocurrency is handled in UK divorce — disclosure requirements, valuation, splitting in kind vs cashing out, capital gains tax, and the practical pressure points around digital assets."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Cryptocurrency in Divorce UK", href: "/cryptocurrency-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Cryptocurrency holdings are now common enough to feature in many UK divorce settlements. UK courts treat crypto as property — part of the matrimonial pot in the same way as shares, bank balances or other investments. The principles of disclosure, valuation and division all apply, but the practical challenges around volatility, verification and tax make crypto cases distinctive.
        </p>

        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">Hiding cryptocurrency is harder than many think. Exchange records, bank transfers, blockchain analysis and forensic specialists can uncover undisclosed holdings. Non-disclosure of crypto carries the same serious consequences as concealing any other asset.</p>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">Six Things That Make Crypto Cases Different</h2>
        <div className="space-y-4 mb-6">
          {considerations.map((c, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-start gap-2">
                  <Coins className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{c.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Model Settlements Including Crypto Holdings" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">Figures and Records You Will Need</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {figures.map((f, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border">
              <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {f}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mb-4">Common Pressure Points</h2>
        <div className="space-y-3 mb-6">
          {[
            { label: "Volatility between disclosure and settlement", desc: "Crypto values can move 20%+ in a single week. A settlement valued on the disclosure date may not reflect reality on the completion date. Splitting in kind (transferring units rather than cash) is one way to manage this — both parties then share the future movement." },
            { label: "Self-custody verification", desc: "Crypto held in self-custodied wallets is much harder to verify than exchange-held crypto. The disclosing party should provide wallet addresses and transaction histories. Where suspicion exists, forensic blockchain analysis can be commissioned." },
            { label: "DeFi and complex positions", desc: "Liquidity provision, staking rewards, lending positions and yield farming arrangements all add complexity. These positions can be difficult to value and may require specialist input. They should not be glossed over in disclosure." },
            { label: "Capital gains tax on disposals", desc: "Selling crypto to fund the settlement can crystallise significant CGT. Transfers between separating spouses may benefit from no-gain/no-loss treatment — but the rules are technical. Qualified tax advice is usually worthwhile where holdings are material." },
          ].map((p, i) => (
            <div key={i} className="p-4 rounded-lg border">
              <p className="text-sm font-semibold mb-1">{p.label}</p>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">What the Calculator Cannot Decide</h2>
        <div className="space-y-3 mb-6">
          {[
            "The right valuation date and methodology for your crypto holdings",
            "Whether crypto should be split in kind or cashed out and divided",
            "The CGT implications — qualified tax advice is normally needed",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>What's the right valuation date and approach for our crypto holdings?</li>
          <li>Should we split in kind or cash out — what are the tax and risk trade-offs?</li>
          <li>If I suspect undisclosed crypto, what disclosure orders or forensic options exist?</li>
          <li>How does CGT apply to our specific transfer or disposal plan?</li>
          <li>How should DeFi positions, staking rewards and NFTs be addressed in disclosure?</li>
        </ul>
        <InlineCTA label="Compare Settlement Scenarios" />
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
