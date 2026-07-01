import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FileText, AlertTriangle, CheckSquare, AlertCircle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const contents = [
  { title: "Living arrangements", desc: "Who stays in the family home, who moves out, and any interim agreement for how the property is used while parties live separately." },
  { title: "Mortgage and household bills", desc: "Who pays the mortgage, council tax, utilities and other ongoing bills during the separation period — and how those payments are accounted for in any future settlement." },
  { title: "Children — finances", desc: "Interim arrangements for child maintenance, school fees, childcare and any other recurring costs for the children. Living arrangements remain with the parents (or court) under welfare principles." },
  { title: "Spousal maintenance during separation", desc: "Whether one party pays the other an amount each month to support living costs while separated, and the proposed duration." },
  { title: "Joint debts and bank accounts", desc: "How joint debts will be serviced and what happens to joint accounts — typically frozen or split with agreed access rules." },
  { title: "Snapshot of assets and liabilities", desc: "An agreed schedule of what assets and debts exist as at the date of separation. This often becomes the reference point for any later financial settlement." },
];

const faqItems = [
  {
    question: "Is a separation agreement legally binding?",
    answer: "A separation agreement is a contract between the parties. While it is not the same as a court order, properly drafted agreements (with disclosure and independent legal advice) are usually given significant weight in any later financial settlement. Some elements are directly enforceable as a contract; others provide a framework that can be converted into a consent order on divorce.",
  },
  {
    question: "Do we need a separation agreement if we plan to divorce later?",
    answer: "It depends. If divorce is imminent, the priority is usually agreeing the financial settlement that will be sealed in a consent order. If divorce is not yet on the cards (or you want to live separately for a period first), a separation agreement provides interim certainty about who pays what and how children are supported.",
  },
  {
    question: "How is a separation agreement different from a divorce financial order?",
    answer: "A separation agreement is a private contract while the marriage is still in place. A financial order (e.g. a consent order or clean break order) is made by the court as part of the divorce. The financial order is the only thing that fully ends each party's ability to make future financial claims.",
  },
  {
    question: "Should both parties have separate solicitors?",
    answer: "Yes. Each party taking independent legal advice from their own solicitor is one of the strongest safeguards if an agreement is reviewed later. Sharing a solicitor creates a conflict of interest and undermines the agreement.",
  },
  {
    question: "What if circumstances change after we sign?",
    answer: "A separation agreement is typically drafted to be reviewable in the event of a significant change in circumstances — job loss, ill-health, a new partner moving in, or the eventual decision to divorce. Periodic review (e.g. annually) helps keep the agreement current.",
  },
  {
    question: "Does a separation agreement affect inheritance and pensions?",
    answer: "Until you're divorced you're still each other's spouse — meaning rights to inheritance and pension benefits typically continue. A separation agreement can address how these are intended to be handled but doesn't replace formal steps such as making a new will or updating pension nominations.",
  },
];

const relatedPages = [
  { title: "What is a Consent Order?", description: "The legal document that ends financial claims on divorce.", href: "/what-is-a-consent-order-uk-divorce", badge: "Orders" },
  { title: "Postnuptial Agreement UK", description: "Sister document — for couples who continue to live together.", href: "/postnuptial-agreement-uk", badge: "Agreements" },
  { title: "Can I Divorce Without a Financial Settlement?", description: "Why ending the marriage without a financial order is risky.", href: "/can-i-divorce-without-financial-settlement-uk", badge: "Settlement" },
  { title: "Preview the Full Financial Report", description: "Model interim and post-divorce scenarios.", href: "/unlock", badge: "Report" },
];

export default function SeparationAgreementPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Separation Agreement UK: What It Covers and How It Works"
      subtitle="A separation agreement is a contract that sets out how finances and arrangements will be handled while a couple lives apart but is not yet divorced. Here's what's typically inside one."
      documentTitle="Separation Agreement UK | DivorceCalculatorUK"
      metaDescription="A clear UK guide to separation agreements — what they cover, how legally binding they are, and how they sit alongside divorce financial orders."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Separation Agreement UK", href: "/separation-agreement-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          A separation agreement (also called a deed of separation) is used by couples who have decided to live apart but are not yet divorcing. It records what they have agreed about money, the home, the children, and any maintenance — providing a structured framework for the period of separation. While it is not the same as a divorce financial order, a properly drafted separation agreement usually carries significant weight if either party later applies for a court order.
        </p>

        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">A separation agreement does not formally end financial claims between spouses. Until a divorce financial order is made, either party retains the right to make a financial claim in the future. Specialist family law advice is essential.</p>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">What a Separation Agreement Typically Covers</h2>
        <div className="space-y-4 mb-6">
          {contents.map((c, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-start gap-2">
                  <FileText className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{c.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Model Interim and Final Settlement Scenarios" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">Figures to Capture in the Calculator</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {[
            "Each party's gross monthly income at the date of separation",
            "Family home value and outstanding mortgage balance",
            "Combined liquid savings and investments as at separation",
            "All joint and sole debts at the date of separation",
            "Combined pension CETVs across all schemes",
            "Number and ages of dependent children",
            "Estimated monthly running cost of two separate households",
            "Proposed interim spousal and child maintenance amounts",
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
            { label: "It doesn't end financial claims", desc: "A separation agreement is contractual — it does not bring matrimonial financial claims to an end. Only a clean break order (made on divorce) does that. Either party retains the right to apply to court even years after the agreement was signed." },
            { label: "Disclosure quality matters", desc: "If full and frank disclosure was not exchanged when the agreement was signed, the protection it offers is significantly weaker. Patchy disclosure is the most common reason such agreements are challenged later." },
            { label: "Standard of living during separation", desc: "Interim arrangements that materially change the standard of living for either party often need adjustment over time. Locking in arrangements without a review mechanism creates problems." },
            { label: "Cohabitation by either party", desc: "If one party starts living with a new partner during separation, the financial picture changes. The agreement should anticipate this with a clear review trigger." },
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
            "Whether a separation agreement is suitable for your situation versus proceeding directly to divorce",
            "How much weight the agreement may carry if it were challenged later",
            "Whether your proposed interim maintenance is realistic and sustainable",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Do we need a separation agreement, or should we go straight to a divorce financial order?</li>
          <li>How should we handle interim spousal and child maintenance?</li>
          <li>What disclosure do we need to exchange before signing?</li>
          <li>How should the agreement handle the family home during separation?</li>
          <li>What review triggers should we build into the agreement?</li>
        </ul>
        <InlineCTA label="Model Settlement Scenarios From Your Separation Snapshot" />
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
