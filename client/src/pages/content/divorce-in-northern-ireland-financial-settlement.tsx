import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Scale, AlertCircle, CheckSquare, ExternalLink, MapPin } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const factors = [
  { label: "Northern Ireland has its own divorce law", desc: "Divorce in Northern Ireland is governed by the Matrimonial Causes (Northern Ireland) Order 1978 and related Family Law (Northern Ireland) Order 1993. The financial settlement principles are broadly similar to England and Wales but operate under separate legislation administered by the NI courts." },
  { label: "No-fault divorce is now available", desc: "The Domestic Abuse and Civil Proceedings Act (Northern Ireland) 2021 and subsequent legislative changes brought NI into closer alignment with England and Wales. The current framework allows divorce on the basis of irretrievable breakdown without the need to assign blame in most cases — but always check the latest position with an NI-qualified solicitor as the law has been evolving." },
  { label: "Financial principles broadly mirror England and Wales", desc: "NI courts apply factors broadly similar to the section 25 factors of the English Matrimonial Causes Act 1973 — needs, resources, contributions, length of marriage, welfare of children. Pension sharing is available under the same UK-wide Welfare Reform and Pensions Act 1999." },
  { label: "Court structure is different", desc: "Divorce in NI is dealt with by the Family Care Centre (which sits in the County Court) for most cases, and the High Court Family Division for higher-value or complex matters. Court fees and procedure are set by the Northern Ireland Courts and Tribunals Service. Information is published on nidirect.gov.uk and justice-ni.gov.uk." },
  { label: "Cross-jurisdiction issues need specialist advice", desc: "Where one spouse lives in NI and the other in England or Ireland (Republic), or assets are split across jurisdictions, the choice of where to file proceedings can have a significant financial impact. Take advice from a solicitor experienced in cross-jurisdiction family law before issuing." },
];

const faqItems = [
  { question: "Is divorce financial settlement different in Northern Ireland?", answer: "The principles are broadly similar to England and Wales — needs, contributions, length of marriage and welfare of any children all weighed by the court — but it is administered under separate NI legislation (the Matrimonial Causes (Northern Ireland) Order 1978 and related orders) by NI courts. Always take advice from a Northern Ireland-qualified solicitor." },
  { question: "What grounds for divorce apply in Northern Ireland?", answer: "Northern Ireland has been moving towards a no-fault model in line with the rest of the UK. The Domestic Abuse and Civil Proceedings Act (Northern Ireland) 2021 introduced significant reforms; subsequent changes have aligned NI more closely with England and Wales. Confirm the current position with a NI-qualified solicitor or via nidirect.gov.uk." },
  { question: "How are pensions dealt with in NI divorce?", answer: "Pension sharing applies in Northern Ireland under the Welfare Reform and Pensions Act 1999 — UK-wide legislation. Pension sharing orders, attachment orders and offsetting all work in the same way as in England and Wales. The same advice on PODE involvement and FCA-regulated financial advice applies." },
  { question: "Where do I apply for divorce in Northern Ireland?", answer: "Most divorces are dealt with at the Family Care Centre (within the County Court). High-value or complex cases may be dealt with by the High Court Family Division. Information on procedure, forms and fees is published on the Northern Ireland Courts and Tribunals Service website (justice-ni.gov.uk) and nidirect.gov.uk." },
  { question: "Can I claim Universal Credit and tax allowances after divorce in NI?", answer: "Yes — Universal Credit, Marriage Allowance and most other UK benefits and tax provisions are administered UK-wide and apply in Northern Ireland in the same way. Council Tax (rates) is administered differently in NI — see the rates system on nidirect.gov.uk and Land & Property Services." },
  { question: "Does the calculator work for Northern Ireland?", answer: "The financial engine uses UK-wide tax bands and CMS rates that apply in Northern Ireland. The principles modelled (needs analysis, sharing of matrimonial property, pension sharing, child maintenance) reflect the broad UK approach. Northern Ireland-specific procedural matters (court forms, fees, local rules) are not modelled — take NI-qualified advice for the procedural side." },
];

const relatedPages = [
  { title: "Divorce in Scotland", description: "Scotland's separate legislation and equal-sharing principle.", href: "/divorce-in-scotland-financial-settlement", badge: "Jurisdiction" },
  { title: "Section 25 Factors Explained", description: "England and Wales — broadly similar principles to NI.", href: "/section-25-factors-divorce-uk", badge: "Law" },
  { title: "Pension Sharing vs Offsetting", description: "UK-wide pension sharing applies in Northern Ireland.", href: "/pension-sharing-vs-offsetting-uk", badge: "Pensions" },
  { title: "No-Fault Divorce UK", description: "How no-fault divorce has rolled out across the UK.", href: "/no-fault-divorce-uk", badge: "Process" },
];

export default function DivorceInNorthernIrelandPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Divorce in Northern Ireland: Financial Settlement"
      subtitle="Northern Ireland has its own divorce legislation, broadly similar to England and Wales but administered separately by NI courts. Pension sharing and UK-wide tax rules still apply."
      documentTitle="Divorce in Northern Ireland Financial Settlement | DivorceCalculatorUK"
      metaDescription="How divorce financial settlements work in Northern Ireland — separate legislation, similar principles to England and Wales, pension sharing, court structure, and cross-jurisdiction issues."
      relatedPages={relatedPages}
      breadcrumbs={[{ name: "Home", href: "/" }, { name: "Guides", href: "/divorce-financial-guides" }, { name: "Divorce in Northern Ireland", href: "/divorce-in-northern-ireland-financial-settlement" }]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Divorce in Northern Ireland is administered under separate legislation from the rest of the UK, but the financial principles are broadly similar to England and Wales. Pension sharing and most UK-wide tax and benefit rules still apply.
        </p>
        <h2 className="text-2xl font-display font-bold mt-8 mb-4">The NI framework at a glance</h2>
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
        <InlineCTA label="Model Your Settlement Outcome" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">Illustrative scenario</h2>
        <Card className="mb-6">
          <CardContent className="pt-5 space-y-3">
            <p className="text-sm font-semibold">Fictional NI couple — 18-year marriage</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /><span>Family home equity £180k, husband's pension CETV £220k, wife's small pension £35k. Two children at home.</span></div>
              <div className="flex items-center gap-2"><Scale className="w-4 h-4 text-primary" /><span>NI courts apply needs-based principles broadly similar to s.25. Likely outcome involves a property and pension share that prioritises housing the children with their primary carer and broadly equalises pensions over time.</span></div>
            </div>
            <p className="text-xs text-muted-foreground">Illustrative only — take Northern Ireland-qualified advice.</p>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-6">Documents and information you will need</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {["Marriage certificate", "Most recent pension CETVs", "Property valuations and mortgage statements", "Recent rates bill (NI rates rather than Council Tax)", "Both parties' P60s, payslips and self-assessment returns", "CMS calculation for any children", "Any pre-nuptial or post-nuptial agreement", "Court fee schedule from justice-ni.gov.uk"].map((fig, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border">
              <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {fig}
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">What the calculator cannot do for NI divorces</h2>
        <div className="space-y-3 mb-6">
          {["Reflect NI-specific procedural rules and court forms", "Replace advice from an NI-qualified family solicitor", "Predict the outcome of cross-jurisdiction proceedings"].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Official sources</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li><a className="underline hover:text-primary" href="https://www.nidirect.gov.uk/articles/divorce-and-dissolution" target="_blank" rel="noopener noreferrer">nidirect — Divorce and dissolution <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.justice-ni.gov.uk/topics/courts-and-tribunals" target="_blank" rel="noopener noreferrer">Department of Justice NI — Courts and tribunals <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.lawsoc-ni.org/find-a-solicitor" target="_blank" rel="noopener noreferrer">Law Society of Northern Ireland — Find a Solicitor <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.legislation.gov.uk/nisi/1978/1045" target="_blank" rel="noopener noreferrer">Matrimonial Causes (Northern Ireland) Order 1978 <ExternalLink className="inline w-3 h-3" /></a></li>
        </ul>
        <p className="text-xs text-muted-foreground italic">General information only. Not legal advice. NI divorce law has been evolving — always confirm the current position with a Northern Ireland-qualified solicitor.</p>
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
