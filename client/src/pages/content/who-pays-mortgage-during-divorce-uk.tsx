import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AlertTriangle, Banknote } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const faqItems = [
  {
    question: "Can I stop paying the mortgage during divorce?",
    answer: "Stopping mortgage payments damages both credit records and risks repossession. Courts can take mortgage arrears into account in the settlement. The mortgage must continue to be serviced regardless of how the divorce is progressing — contact the lender if there are genuine financial difficulties.",
  },
  {
    question: "Can I claim back mortgage payments I made alone during the divorce?",
    answer: "Potentially. If you paid the entire mortgage while your ex lived rent-free, you may be able to argue for an adjustment in your favour when equity is divided. This is not automatic — keep detailed records of all payments made and who made them.",
  },
  {
    question: "What if we can't agree on who pays?",
    answer: "You can apply to the court for a maintenance pending suit order, which can include provision for mortgage payments. Your solicitor can also apply for interim financial provision. Courts can order one party to make mortgage contributions.",
  },
  {
    question: "Does paying the mortgage increase my share of the property?",
    answer: "Not automatically — it depends on the circumstances. Post-separation mortgage contributions may be relevant, but courts look at the overall picture. Contributions made post-separation may be offset against occupying the property rent-free. Seek legal advice if you are in this situation.",
  },
  {
    question: "What if my ex has left but their name is still on the mortgage?",
    answer: "Both remain equally liable. Your ex's credit rating is affected by missed payments even if they no longer live there. The mortgage obligation is separate from the ownership and occupation questions until a formal transfer or sale is completed.",
  },
];

const relatedPages = [
  { title: "Both Names on Mortgage in Divorce UK", description: "Your full options when both names remain on the mortgage.", href: "/both-names-on-mortgage-divorce-uk", badge: "Mortgage" },
  { title: "Can I Force Sale of House After Divorce UK?", description: "Your options when your ex won't agree to sell.", href: "/can-i-force-sale-of-house-after-divorce-uk", badge: "Property" },
  { title: "Buying Partner Out of House in Divorce UK", description: "How to buy out your partner's share and take on the mortgage solo.", href: "/buying-partner-out-of-house-divorce-uk", badge: "Property" },
];

export default function MortgageDuringDivorcePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Who Pays the Mortgage During Divorce UK?"
      subtitle="Divorce proceedings can take 12–24 months. In the meantime, the mortgage must still be paid. Here's how courts and couples typically manage mortgage payments during the divorce process."
      documentTitle="Who Pays the Mortgage During Divorce UK? | DivorceCalculatorUK"
      metaDescription="Find out who is responsible for mortgage payments during UK divorce proceedings, what happens if your ex stops paying, and how courts handle interim mortgage arrangements."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Who Pays the Mortgage During Divorce UK?", href: "/who-pays-mortgage-during-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          During divorce, there is often an extended period where you are legally still married, living separately or together, and negotiating your financial settlement — but the mortgage must still be paid. The starting position is that both parties remain legally liable for the mortgage. The lender does not care about your divorce proceedings.
        </p>

        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-amber-800 mb-1">Critical Point</p>
                <p className="text-sm text-amber-700">Mortgage arrears during the divorce process affect both parties' credit records and increase the risk of repossession. The mortgage servicer must be kept informed if there are difficulties, and payment arrangements should be agreed between spouses as early as possible.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">Common Arrangements During Proceedings</h2>
        <div className="space-y-4 mb-6">
          <Card>
            <CardContent className="pt-5 space-y-2">
              <div className="flex items-center gap-2">
                <Banknote className="w-4 h-4 text-primary" />
                <p className="text-sm font-semibold">Both parties continue to pay their share</p>
              </div>
              <p className="text-sm text-muted-foreground">Where both parties are working and can afford to, they may each pay half the mortgage. This is straightforward but requires ongoing cooperation during what is often a difficult period.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 space-y-2">
              <div className="flex items-center gap-2">
                <Banknote className="w-4 h-4 text-primary" />
                <p className="text-sm font-semibold">The occupying party pays the mortgage</p>
              </div>
              <p className="text-sm text-muted-foreground">Where one party has left and the other remains in the property, it is common for the occupying party to service the mortgage in exchange for housing. This may be taken into account in the final settlement — particularly regarding occupancy offset — or treated as a credit in the equity division.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 space-y-2">
              <div className="flex items-center gap-2">
                <Banknote className="w-4 h-4 text-primary" />
                <p className="text-sm font-semibold">Higher earner pays the mortgage pending settlement</p>
              </div>
              <p className="text-sm text-muted-foreground">Where there is a significant income gap, courts can order the higher earner to make interim mortgage contributions through a 'maintenance pending suit' order. This is temporary, pending the final settlement.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 space-y-2">
              <div className="flex items-center gap-2">
                <Banknote className="w-4 h-4 text-primary" />
                <p className="text-sm font-semibold">Interest-only arrangement with lender</p>
              </div>
              <p className="text-sm text-muted-foreground">Lenders are sometimes willing to agree a temporary switch to interest-only payments during divorce proceedings to reduce the monthly burden. This must be arranged directly with the lender and will not reduce the outstanding capital.</p>
            </CardContent>
          </Card>
        </div>
        <InlineCTA label="Model Your Post-Settlement Finances" />
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
