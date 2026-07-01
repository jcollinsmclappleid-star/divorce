import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Globe, AlertTriangle, CheckSquare, AlertCircle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const issues = [
  { title: "Disclosure obligation extends worldwide", desc: "Form E requires disclosure of all assets, wherever located. Failing to disclose offshore accounts, properties or company interests carries the same consequences as failing to disclose UK assets." },
  { title: "Currency and valuation", desc: "Foreign assets need to be valued in pounds for the matrimonial pot. Exchange rates fluctuate, so valuation dates and currency assumptions should be checked carefully." },
  { title: "Foreign tax considerations", desc: "Selling or transferring offshore assets can trigger tax in the country where they are located, in addition to any UK tax. Both need to be modelled when working out net value." },
  { title: "Enforcement against foreign assets", desc: "An English court order can be made against a UK-resident party covering foreign assets — but enforcing it internationally requires recognition by the foreign court. This adds time, cost and uncertainty." },
  { title: "Common Reporting Standard (CRS) information", desc: "Information about offshore accounts is now routinely shared with HMRC under CRS. This significantly reduces the practical scope for hiding assets but doesn't replace formal disclosure in divorce." },
  { title: "Forum and jurisdiction issues", desc: "Where one party lives outside the UK, or where significant assets sit offshore, there can be complex questions about whether England is the right forum for the divorce. Specialist international family law advice is essential." },
];

const faqItems = [
  {
    question: "Do I have to disclose assets I hold offshore?",
    answer: "Yes — disclosure on Form E covers all your worldwide assets, wherever located and in whatever currency. Failure to disclose offshore assets carries the same consequences as failure to disclose UK assets: settlements being set aside, costs orders, and in serious cases contempt of court.",
  },
  {
    question: "Can English courts make orders about overseas property?",
    answer: "English courts can make orders requiring a UK-resident party to transfer or sell overseas property — but enforcing those orders may require recognition by the foreign court where the asset sits. The practical enforceability depends on the country involved and any reciprocal treaties.",
  },
  {
    question: "What is the Common Reporting Standard (CRS)?",
    answer: "CRS is an international agreement under which financial institutions automatically share information about account holders with their tax authorities — including HMRC for UK-resident individuals. It significantly reduces the practical scope for concealing offshore accounts. CRS doesn't directly help in divorce proceedings, but it does mean offshore accounts are no longer invisible to the tax authorities.",
  },
  {
    question: "What if I think my spouse has hidden offshore assets?",
    answer: "There are several investigative steps available — questionnaires under Form E, Court orders requiring third-party banks to disclose, and in some cases search orders. Specialist family law and forensic accounting advice is essential. Adverse inferences can be drawn from a partial or evasive disclosure.",
  },
  {
    question: "How are foreign retirement accounts (e.g. US 401(k)) treated?",
    answer: "Foreign pension and retirement accounts are part of the matrimonial pot in the same way as UK pensions, but the rules for valuing and dividing them are typically governed by the law of the country where the account is held. Specialist international advice is usually needed.",
  },
  {
    question: "What about cryptocurrency held on offshore exchanges?",
    answer: "Cryptocurrency is treated as property regardless of which exchange or wallet holds it. Disclosure obligations apply just as for fiat assets. Establishing the location of crypto for jurisdictional purposes is technically complex — see our cryptocurrency divorce guide for more.",
  },
];

const relatedPages = [
  { title: "Trust Assets in UK Divorce", description: "Companion guide on trust structures including offshore.", href: "/trust-assets-divorce-uk", badge: "Wealth" },
  { title: "Cryptocurrency in UK Divorce", description: "Crypto held on offshore exchanges and beyond.", href: "/cryptocurrency-divorce-uk", badge: "Assets" },
  { title: "Can I Hide Assets in Divorce?", description: "The legal position on non-disclosure in UK divorce.", href: "/can-i-hide-assets-in-divorce-uk", badge: "Disclosure" },
  { title: "Preview the Full Financial Report", description: "Model settlements including offshore assets.", href: "/unlock", badge: "Report" },
];

export default function OffshoreAssetsDivorcePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Offshore Assets in UK Divorce: Disclosure, Valuation and Enforcement"
      subtitle="Offshore assets must be disclosed in UK divorce proceedings just like UK assets — but the practical issues around valuation, tax and enforcement are more complex. Here's what to expect."
      documentTitle="Offshore Assets in UK Divorce | DivorceCalculatorUK"
      metaDescription="How offshore assets are handled in UK divorce — disclosure obligations, valuation, enforcement of English orders abroad, and the role of the Common Reporting Standard."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Offshore Assets in UK Divorce", href: "/offshore-assets-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Offshore assets — bank accounts, property, company interests, trusts and pensions held outside the UK — are part of the matrimonial pot in exactly the same way as UK-based assets. The duty of full and frank disclosure extends worldwide. The complexity arises around valuation in different currencies, foreign tax exposure on disposal, and the practical enforcement of English court orders against assets held abroad.
        </p>

        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">Cases involving significant offshore assets are technical and often involve more than one country's legal system. Specialist family law advice — often combined with international tax advice — is essential.</p>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">Issues That Come Up With Offshore Assets</h2>
        <div className="space-y-4 mb-6">
          {issues.map((isu, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-start gap-2">
                  <Globe className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{isu.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{isu.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Model Settlements Including Offshore Assets" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">Figures to Capture in the Calculator</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {[
            "Foreign currency value of each offshore asset",
            "Exchange rate to apply (often the rate at order date)",
            "GBP value of each asset converted",
            "Country where each asset is located",
            "Estimated foreign tax on disposal or transfer",
            "Estimated UK tax on disposal or transfer",
            "Liquidity — can the asset realistically be extracted to the UK?",
            "Net realisable GBP value after foreign and UK tax",
          ].map((f, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border">
              <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {f}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mb-4">Common Pressure Points</h2>
        <div className="space-y-3 mb-6">
          {[
            { label: "Currency volatility", desc: "Where assets are held in volatile currencies, the GBP value can move significantly between disclosure and settlement. Building in a margin or revaluation date avoids surprises." },
            { label: "Cross-border enforcement risk", desc: "An order made in England may not be straightforward to enforce in the country where the asset sits. The practical risk depends on the country and the bilateral arrangements in place." },
            { label: "Foreign tax cost", desc: "Selling foreign property or extracting foreign company value can trigger tax that is not visible from a UK perspective. Specialist tax advice in the relevant country is often needed." },
            { label: "Forum shopping concerns", desc: "Where one party has links to multiple countries, there can be a race to start proceedings in the most favourable jurisdiction. Specialist international family law advice on forum is critical." },
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
            "Whether England is the right forum for your divorce given international links",
            "How enforcement and recognition may work in the relevant foreign jurisdiction",
            "The exact foreign tax treatment of a particular transfer or sale",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Is England the right forum for our divorce?</li>
          <li>What disclosure can be compelled from offshore institutions?</li>
          <li>What foreign tax exposure arises on transferring particular assets?</li>
          <li>How enforceable would an English order be against assets in [country]?</li>
          <li>Should we be coordinating UK and overseas legal advice?</li>
        </ul>
        <InlineCTA label="Model Settlements Including Offshore Assets" />
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
