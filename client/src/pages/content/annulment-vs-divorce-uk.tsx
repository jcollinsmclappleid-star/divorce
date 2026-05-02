import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Scale, AlertTriangle, CheckSquare, AlertCircle } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const points = [
  { title: "Annulment treats the marriage as void or voidable", desc: "An annulment (nullity order) declares the marriage either was never legally valid (void) or was valid but can be set aside (voidable). A divorce ends a legally valid marriage. The financial outcome is similar — but the legal premise is different." },
  { title: "Void marriages — never legally valid", desc: "A marriage is void where, for example, one party was already married, the parties are too closely related, one was under 16, or the ceremony did not comply with formality requirements. No marriage ever existed in law." },
  { title: "Voidable marriages — set aside on application", desc: "A voidable marriage is legally valid until annulled. Grounds include non-consummation (where the marriage is not same-sex), lack of valid consent (duress, mistake, mental disorder), pregnancy by another at the time of marriage, or one party having an STI at the time." },
  { title: "Time limits matter", desc: "Most voidable grounds must be raised within three years of the marriage. Void marriages can be challenged at any time. Divorce, by contrast, has no minimum waiting period after marriage under the post-2022 rules — though you must be married for at least one year before applying." },
  { title: "Finances are still under the Matrimonial Causes Act", desc: "Whether the marriage ends by divorce or annulment, the same financial framework applies — section 25 factors, pension sharing, lump sums, property adjustment. Annulment does not 'wipe' financial obligations." },
  { title: "Religious annulment is different", desc: "An annulment from a religious authority (e.g. the Catholic Church) is a separate process and has no civil legal effect. To end a civil marriage you still need either a civil annulment or a divorce through the family court." },
];

const figures = [
  "Marriage certificate (essential for both processes)",
  "Date and place of marriage and any cohabitation",
  "Evidence of any ground for annulment (medical evidence, prior marriage records)",
  "Whether the marriage has been consummated (relevant for some voidable grounds)",
  "Children's details — annulment does not affect parenthood",
  "Asset and liability schedule for both parties",
  "Pension CETVs for both parties",
  "Income evidence (P60s, payslips, business accounts)",
];

const faqItems = [
  { question: "Is annulment quicker than divorce in the UK?", answer: "Not usually. Annulment requires the applicant to prove a specific legal ground, which often means evidence and sometimes contested hearings. The 20-week reflection period that applies to no-fault divorce does not apply to annulment, but the application is more complex and contested annulments take longer than uncontested divorces." },
  { question: "Can I get an annulment instead of a divorce to avoid splitting finances?", answer: "No. The financial framework under the Matrimonial Causes Act 1973 applies to annulment as well as divorce. Section 25 factors — needs, contributions, length of marriage and so on — still determine outcomes. Annulment does not let you escape financial obligations." },
  { question: "What are the grounds for annulment in the UK?", answer: "Void marriage grounds: bigamy, prohibited relationship, under 16, non-compliant ceremony. Voidable grounds: non-consummation (opposite-sex marriages only), lack of valid consent, pregnancy by another at the time of marriage, gender recognition certificate not disclosed, or one party having an STI." },
  { question: "How long do I have to apply for annulment?", answer: "For void marriages there is no time limit — they can be declared invalid at any time. For voidable marriages most grounds must be raised within three years of the date of marriage. Some grounds (e.g. non-consummation) have specific time considerations and exceptions." },
  { question: "Does an annulment make the marriage 'never happened'?", answer: "Legally yes for void marriages — the law treats them as if no marriage took place. For voidable marriages, the marriage is valid until the annulment is granted, then ended from that point. Either way, children of the marriage are still legitimate and parental rights are unaffected." },
  { question: "Can I get an annulment if my spouse refuses to consummate?", answer: "Possibly, for opposite-sex marriages — non-consummation due to incapacity or wilful refusal is a voidable ground. It does not apply to same-sex marriages. The application must usually be made within three years of the marriage and requires evidence." },
];

const relatedPages = [
  { title: "No-Fault Divorce UK", description: "The standard route to ending a marriage.", href: "/no-fault-divorce-uk", badge: "Process" },
  { title: "Section 25 Factors Divorce UK", description: "How finances are assessed (annulment too).", href: "/section-25-factors-divorce-uk", badge: "Law" },
  { title: "Short Marriage Divorce Settlement UK", description: "How short marriages are treated financially.", href: "/short-marriage-divorce-settlement-uk", badge: "Settlement" },
  { title: "Preview the Full Financial Report", description: "Model your settlement scenarios.", href: "/unlock", badge: "Report" },
];

export default function AnnulmentVsDivorcePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Annulment vs Divorce UK — Which Applies and How They Differ"
      subtitle="Annulment treats a marriage as never legally valid (void) or sets it aside (voidable). Divorce ends a legally valid marriage. Here is when annulment is possible, how it differs, and why finances are usually unaffected."
      documentTitle="Annulment vs Divorce UK Explained | DivorceCalculatorUK"
      metaDescription="Annulment vs divorce UK. Void and voidable marriages, grounds for annulment, time limits, and why financial settlements still apply under the Matrimonial Causes Act 1973."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Annulment vs Divorce UK", href: "/annulment-vs-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Annulment (legally a 'nullity order') and divorce both end a marriage in the eyes of UK law, but the legal premise is different. Annulment declares the marriage either never legally existed (void) or can be set aside (voidable). Divorce ends a marriage that was always legally valid. Annulment is much rarer than divorce and is generally only available where specific legal grounds apply. Critically, the financial framework under the Matrimonial Causes Act 1973 applies to both — annulment is not a route to escape financial obligations.
        </p>
        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">Annulment is only available in narrow circumstances. Most people who think they want an annulment actually want either a divorce or, in some religious contexts, a separate religious annulment process — which has no civil legal effect on its own.</p>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">Six Things to Know About Annulment vs Divorce</h2>
        <div className="space-y-4 mb-6">
          {points.map((p, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-start gap-2">
                  <Scale className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{p.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Model Settlement Scenarios" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">Information You Will Need</h2>
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
            { label: "Evidence required for voidable grounds", desc: "Voidable grounds — particularly non-consummation, lack of consent, or pregnancy by another — require evidence the court will scrutinise. Unlike no-fault divorce, you cannot simply state the ground exists." },
            { label: "Time limits", desc: "The three-year limit for most voidable grounds catches many people out. After that period, divorce is usually the only available route — even if the ground for annulment was originally there." },
            { label: "Religious vs civil annulment", desc: "A religious annulment (Catholic, Jewish, Muslim, etc.) has no civil legal effect. To end the legal marriage you still need a civil annulment or a divorce through the family court." },
            { label: "Financial entitlements still apply", desc: "Annulment does not allow either party to walk away with no financial responsibility. The Matrimonial Causes Act 1973 financial provisions apply just as they do in divorce." },
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
            "Whether your circumstances meet a void or voidable ground",
            "Whether annulment or divorce is the better legal route for you",
            "How a religious annulment will interact with civil law in your situation",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Do my circumstances meet a legal ground for annulment?</li>
          <li>Am I within the three-year time limit for voidable grounds?</li>
          <li>What evidence will the court need to grant an annulment?</li>
          <li>How will finances be treated differently (if at all) compared to divorce?</li>
          <li>Should I pursue a religious annulment alongside the civil process?</li>
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
