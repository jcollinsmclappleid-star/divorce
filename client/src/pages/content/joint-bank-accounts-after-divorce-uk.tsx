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

const immediateSteps = [
  "Contact your bank and request that the joint account requires both signatures for transactions (most banks offer this)",
  "Alternatively, agree with your spouse to freeze the balance pending settlement",
  "Take a screenshot or printout of the current balance as evidence of the balance at separation",
  "Notify the bank in writing of your separation (this may affect overdraft facilities and joint credit arrangements)",
];

const faqItems = [
  {
    question: "Can I freeze a joint account without my spouse's permission?",
    answer: "Most banks require both parties to agree to freeze an account. You can request that both signatures are required for withdrawals — contact your bank as soon as possible. If your spouse refuses and you are concerned about dissipation, seek urgent legal advice about injunctive relief.",
  },
  {
    question: "Can my spouse withdraw all the money from a joint account?",
    answer: "Legally, yes — both parties have equal rights. Practically, courts can treat this as dissipation and adjust the settlement. But prevention is better than cure: act quickly at separation to protect joint funds.",
  },
  {
    question: "What happens to joint savings in a fixed-term account?",
    answer: "Fixed-term accounts that cannot be broken early will be valued and included in the matrimonial pot. If they cannot be split until maturity, courts may offset their value against other assets, or order that they are divided when they mature.",
  },
  {
    question: "Does joint account activity during divorce affect the settlement?",
    answer: "Yes. Excessive spending, large withdrawals, or transfers to third parties from a joint account during the divorce period can all be scrutinised by a court and taken into account when deciding the overall settlement.",
  },
];

const relatedPages = [
  { title: "How Are Savings Split in Divorce UK?", description: "The full guide to dividing savings and bank accounts.", href: "/how-are-savings-split-in-divorce-uk", badge: "Assets" },
  { title: "Can I Hide Assets in Divorce UK?", description: "Why courts treat dissipation of matrimonial assets so seriously.", href: "/can-i-hide-assets-in-divorce-uk", badge: "Disclosure" },
  { title: "Financial Disclosure in UK Divorce", description: "What must be disclosed and the consequences of non-disclosure.", href: "/financial-disclosure-divorce-uk", badge: "Process" },
  { title: "Preview the Full Financial Report", description: "Include joint accounts in the full asset pool model.", href: "/unlock", badge: "Report" },
];

export default function JointBankAccountsPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="What Happens to Joint Bank Accounts After Divorce UK?"
      subtitle="Joint accounts are equally owned by both spouses — either party can access them at any time. Managing joint accounts carefully at separation is one of the most important early steps in protecting your financial position."
      documentTitle="What Happens to Joint Bank Accounts After Divorce UK? | DivorceCalculatorUK"
      metaDescription="Learn what happens to joint bank accounts in UK divorce — what to do immediately at separation, how courts treat dissipation, and how to close joint accounts as part of settlement."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Joint Bank Accounts After Divorce UK", href: "/joint-bank-accounts-after-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Both parties have equal legal rights to funds in a joint bank account. This creates a practical problem: unless both parties agree to freeze the account, either can empty it entirely — and the bank is legally obliged to honour the transaction. Courts can look back at what happened, but recovering funds unilaterally removed is time-consuming and stressful.
        </p>

        <Card className="border-red-200 bg-red-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-red-800 mb-1">Act Immediately at Separation</p>
                <ul className="space-y-1">
                  {immediateSteps.map((s, i) => (
                    <li key={i} className="text-sm text-red-700 flex items-start gap-2">
                      <span className="font-bold mt-0.5">{i + 1}.</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-display font-bold mt-8 mb-4">How Joint Accounts Are Dealt With in Proceedings</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">Joint bank account balances are matrimonial assets — subject to division in the financial settlement. Courts treat them as equally owned unless there is specific evidence to the contrary. In most cases:</p>
        <ul className="space-y-2 mb-6 text-sm text-muted-foreground list-disc list-inside ml-2">
          <li>The balance at the point of separation is the starting value</li>
          <li>Both parties' post-separation withdrawals are tracked and may be taken into account</li>
          <li>The balance is split as part of the overall settlement — usually, but not always, equally</li>
        </ul>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">If Your Ex Has Already Emptied the Account</h2>
        <p className="text-muted-foreground text-sm mb-4">Courts treat dissipation of matrimonial assets seriously — they can notionally add back the withdrawn amount and treat it as if it still exists in the settlement. The party who withdrew funds may receive a smaller share of other assets to compensate. Keep evidence of the balance before the withdrawal and of the withdrawal itself.</p>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Joint Accounts and Ongoing Bills</h2>
        <p className="text-muted-foreground text-sm mb-4">Many couples use joint accounts to pay household bills — mortgage, utilities, insurance. Until new arrangements are made, these need to continue. Options include:</p>
        <div className="space-y-3 mb-6">
          <div className="p-3 rounded-lg border bg-background text-sm text-muted-foreground flex items-start gap-2">
            <Banknote className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            Keeping a reserved amount in the joint account for bills only, with both parties contributing proportionally
          </div>
          <div className="p-3 rounded-lg border bg-background text-sm text-muted-foreground flex items-start gap-2">
            <Banknote className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            One party setting up new direct debits in their sole name and claiming reimbursement from the other
          </div>
          <div className="p-3 rounded-lg border bg-background text-sm text-muted-foreground flex items-start gap-2">
            <Banknote className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            Clearly documenting all contributions made from the joint account during the divorce period
          </div>
        </div>

        <p className="text-sm text-muted-foreground font-medium mb-2">Closing Joint Accounts</p>
        <p className="text-sm text-muted-foreground mb-4">Joint bank accounts should ideally be closed (or converted to sole accounts) as part of the divorce financial settlement. The closure should be documented and referenced in the consent order. Note: a joint overdraft remains a joint liability regardless of divorce.</p>

        <InlineCTA label="Model Your Full Financial Settlement" />
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
