import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertTriangle, CheckSquare, AlertCircle, Users } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const points = [
  { title: "Common law marriage does not exist in England and Wales", desc: "The phrase 'common law husband' or 'common law wife' has no legal meaning. No matter how long you have lived together, you do not acquire the rights of a married couple. This catches many people out at separation or bereavement." },
  { title: "No automatic right to your partner's property or pension", desc: "Unlike a divorcing spouse, a separating cohabitee has no automatic claim on the other's property, pension or savings. Property rights depend solely on whose name is on the legal title and what was contributed." },
  { title: "Bereavement creates harsher gaps still", desc: "If a cohabiting partner dies without a will, their surviving partner inherits nothing under intestacy rules. They may need to bring a claim under the Inheritance (Provision for Family and Dependants) Act 1975 — which is uncertain, slow and adversarial." },
  { title: "Children's claims are different to adults", desc: "While the cohabiting partner has no claim of their own, the children of the relationship can apply for financial provision under Schedule 1 of the Children Act 1989. This can include lump sums, periodical payments and occupation of a property until the child reaches majority." },
  { title: "Trusts and TOLATA are the main routes", desc: "When cohabitees split and there is a dispute over property, the law of trusts and the Trusts of Land and Appointment of Trustees Act 1996 (TOLATA) apply. Outcomes depend on legal title, contributions and any common intention — they are evidence-based and uncertain." },
  { title: "A cohabitation agreement avoids the trap", desc: "A written cohabitation agreement, kept up to date, can record what each party owns, what happens to property on separation, and how household contributions work. It is enforceable as a contract and far cheaper than a TOLATA dispute later." },
];

const figures = [
  "Whose name is on the property's legal title (Land Registry)",
  "Any declaration of trust executed at purchase",
  "Original deposit contributions from each party",
  "Mortgage payments made by each party (with bank evidence)",
  "Major capital improvements paid for by each party",
  "Wills (if any) of both partners",
  "Any cohabitation agreement",
  "Children's details (age, residence, school) for Schedule 1 claims",
];

const faqItems = [
  { question: "Is there such a thing as common law marriage in the UK?", answer: "No. Common law marriage does not exist in English law and has not done so since the 18th century. The phrase has cultural currency but no legal effect. Cohabiting couples — no matter how long they have lived together — do not acquire the rights or obligations of married couples." },
  { question: "Do I have any rights after living with my partner for 10+ years?", answer: "Length of cohabitation alone gives you no rights to your partner's property, pension, savings or income. Any claim must be based on legal title, written agreements, contributions to property, the law of trusts (TOLATA), or — for parents — provision for children under Schedule 1 of the Children Act 1989." },
  { question: "What happens to the house if we split up?", answer: "If the property is in joint names, each party usually has rights as a co-owner — but the precise share depends on what (if anything) was declared at purchase. If only one party is on the title, the other party generally has no right to it unless they can establish a beneficial interest through trust law (constructive or resulting trust)." },
  { question: "What about children — can I claim against my ex?", answer: "Yes, but the claim is for the children, not for you. Schedule 1 of the Children Act 1989 allows applications for lump sums, periodical payments, settlement of property, and transfer of property for the benefit of children. These rights end when the child reaches independence — usually 18 or end of full-time education." },
  { question: "What is a TOLATA claim?", answer: "A TOLATA claim is a court application under the Trusts of Land and Appointment of Trustees Act 1996. It is the main route for a cohabitee to argue about ownership and sale of jointly owned (or beneficially owned) property. It is evidence-heavy, costly and uncertain compared to divorce financial remedy proceedings." },
  { question: "Can I just get married to fix the legal position?", answer: "Marriage immediately changes the legal landscape — you become subject to the Matrimonial Causes Act 1973 and acquire the full range of marital rights and obligations. For couples who have lived together for many years and where the relative wealth of each is very different, the legal effects of marrying should be considered carefully (often with a prenup)." },
];

const relatedPages = [
  { title: "Unmarried Separating House UK", description: "Property rights for cohabitees in detail.", href: "/unmarried-separating-house-uk", badge: "Cohabitation" },
  { title: "Schedule 1 Children Act UK", description: "Financial provision for children of unmarried parents.", href: "/schedule-1-children-act-uk", badge: "Children" },
  { title: "TOLATA Claim Cohabitation UK", description: "How property disputes are resolved out of marriage.", href: "/tolata-claim-cohabitation-uk", badge: "Property" },
  { title: "Preview the Full Financial Report", description: "Model your finances at separation.", href: "/unlock", badge: "Report" },
];

export default function CommonLawMarriageMythPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Common Law Marriage UK — The Myth That Costs Couples Dearly"
      subtitle="There is no such thing as a common law marriage in England and Wales. Cohabiting couples — even after decades together — have very limited rights at separation or bereavement. Here is what actually applies."
      documentTitle="Common Law Marriage UK Myth Explained | DivorceCalculatorUK"
      metaDescription="Common law marriage does not exist in UK law. Cohabiting couples have very limited rights at separation. TOLATA, Schedule 1 Children Act, cohabitation agreements explained."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Common Law Marriage UK Myth", href: "/common-law-marriage-uk-myth" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          The 'common law husband' or 'common law wife' is one of the most persistent legal myths in the UK. Surveys consistently find that nearly half of cohabiting adults believe they have some form of marital status after a few years of living together. They do not. The concept of common law marriage was abolished in England and Wales in 1753 and never replaced. Cohabitees, no matter how long they have been together or whether they have children, do not acquire the legal rights of a married couple. The financial consequences at separation or on bereavement can be severe.
        </p>
        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">If you are cohabiting and your relative wealth is very unequal, the financially weaker party can be left with almost nothing on separation. A cohabitation agreement, a will, and proper joint property documentation are the only way to fix this — and all should be done before, not after, problems arise.</p>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">Six Things You Need to Know</h2>
        <div className="space-y-4 mb-6">
          {points.map((p, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{p.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Model Your Position at Separation" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">Information You Should Have to Hand</h2>
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
            { label: "Property held in one name only", desc: "Where the family home is in only one party's name and the other has not made provable contributions, the non-owner can be left with no claim. Constructive trust arguments are possible but evidence-intensive and uncertain." },
            { label: "Pension and inheritance gaps", desc: "Cohabitees do not inherit pensions automatically. Death-in-service nominations may not name them. Without a will, a cohabitee inherits nothing under intestacy and must claim under the Inheritance Act 1975." },
            { label: "Indirect financial contributions ignored", desc: "Years of childcare, housekeeping or supporting a partner's career do not, by themselves, create property rights between cohabitees the way they can between spouses under section 25." },
            { label: "TOLATA disputes are expensive", desc: "Property disputes between unmarried partners are litigated under TOLATA in the County Court — typically more expensive and adversarial than family court financial remedy proceedings." },
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
            "Whether you have established a beneficial interest in property held in your partner's name",
            "Whether marriage is the right legal protection for your circumstances",
            "Whether your children have claims under Schedule 1 of the Children Act 1989",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Should we put a cohabitation agreement in place — and if so what should it cover?</li>
          <li>Is a declaration of trust needed for our property?</li>
          <li>Do we both have wills that reflect our cohabiting status?</li>
          <li>What pension and life insurance nominations should be updated?</li>
          <li>Would marriage or civil partnership offer the protection we actually want?</li>
        </ul>
        <InlineCTA label="Compare Financial Scenarios" />
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
