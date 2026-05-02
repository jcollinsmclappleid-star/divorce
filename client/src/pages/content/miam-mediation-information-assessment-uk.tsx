import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertTriangle, CheckSquare, AlertCircle, Users } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const points = [
  { title: "MIAM is mandatory before applying to court", desc: "A Mediation Information and Assessment Meeting must usually be attended before issuing financial remedy or children proceedings. The applicant attends a MIAM with an FMC-accredited mediator who explains mediation and assesses suitability." },
  { title: "Exemptions exist", desc: "MIAM is not required where there is evidence of domestic abuse, urgency, child protection concerns, prior mediation within four months, or several other narrow exemptions. The court application form requires the applicant to certify either that a MIAM was attended or which exemption applies." },
  { title: "Mediator decides suitability", desc: "After the MIAM, the mediator decides whether mediation is suitable. If yes, both parties are invited to mediate. If no, the mediator signs off the MIAM form and the case can proceed to court." },
  { title: "Mediation is not mandatory — only the MIAM is", desc: "Even where the mediator considers mediation suitable, the parties cannot be forced to mediate. They retain the right to court proceedings. But many find mediation faster, cheaper and less adversarial — particularly for finances." },
  { title: "Family Mediation Voucher Scheme", desc: "The government offers up to £500 per family towards family mediation costs in eligible cases (typically those involving children). The voucher is paid directly to the FMC-accredited mediator. The scheme is funded periodically and may pause/reopen." },
  { title: "Mediation outcomes need legal documenting", desc: "Even a successful mediated agreement needs to be drafted into a consent order and approved by the court to be legally binding. Most mediators do not draft consent orders — separate solicitor input is normally needed." },
];

const figures = [
  "Contact details for an FMC-accredited mediator",
  "Outline of asset, liability and income position",
  "Children's circumstances if relevant",
  "Any safeguarding or domestic abuse concerns",
  "Court application form requiring MIAM certification",
  "Family Mediation Voucher eligibility check",
  "Mediator's fees (typically £100–£200 per hour, sometimes free first MIAM)",
  "Solicitor for converting any agreement into a consent order",
];

const faqItems = [
  { question: "What is a MIAM?", answer: "Mediation Information and Assessment Meeting. It is a one-to-one meeting with an FMC-accredited mediator who explains how mediation works, assesses whether your case is suitable for mediation, and signs off the form needed before issuing court proceedings. It is mandatory in most family cases before applying to court." },
  { question: "Do I have to mediate?", answer: "No. Only the MIAM is mandatory. Even if the mediator considers your case suitable for mediation, you retain the right to proceed to court if you prefer. However, judges increasingly expect parties to have considered mediation seriously, and unjustified refusal to mediate can attract adverse cost consequences." },
  { question: "When is a MIAM not required?", answer: "Several exemptions apply: evidence of domestic abuse, urgency (e.g. risk of asset dissipation), child protection concerns, prior mediation within four months, prior MIAM in past four months, bankruptcy of either party, or where the application is for enforcement of an existing order. The exemption must be certified on the court application form." },
  { question: "How much does a MIAM cost?", answer: "Mediator fees vary — typically £100–£200 per hour, with the MIAM itself often lasting around an hour. Many mediators offer a free initial MIAM. The Family Mediation Voucher Scheme provides up to £500 per family towards mediation costs in eligible cases (mainly those involving children)." },
  { question: "What if my ex won't attend a MIAM?", answer: "The MIAM is for the applicant only. The respondent may or may not attend. If the applicant has attended a MIAM and the mediator signs off the form, the case can proceed to court regardless of whether the respondent has been to a MIAM. The respondent may be expected to attend if mediation is considered suitable and progresses." },
  { question: "How does mediation differ from court for finances?", answer: "Mediation is private, voluntary, faster and usually cheaper. The mediator does not impose a decision but helps the parties negotiate one. Disclosure is voluntary (though typically required by the mediator). Any agreement still needs to be drafted into a consent order and approved by the court to be binding. Mediation suits cooperative cases — not those with major disclosure or trust issues." },
];

const relatedPages = [
  { title: "Financial Remedy Proceedings UK", description: "The court process if mediation is not suitable.", href: "/financial-remedy-proceedings-uk", badge: "Process" },
  { title: "First Directions Appointment FDA UK", description: "First court hearing after Form A.", href: "/first-directions-appointment-fda-uk", badge: "Process" },
  { title: "What is a Consent Order UK Divorce?", description: "How any mediated agreement becomes binding.", href: "/what-is-a-consent-order-uk-divorce", badge: "Order" },
  { title: "Preview the Full Financial Report", description: "Model your position before mediation.", href: "/unlock", badge: "Report" },
];

export default function MiamPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="MIAM — Mediation Information and Assessment Meeting UK"
      subtitle="A MIAM is mandatory before issuing most family court proceedings. It is a meeting with an accredited mediator to explain mediation and assess suitability — not mediation itself. Here is how it works."
      documentTitle="MIAM Mediation Information UK | DivorceCalculatorUK"
      metaDescription="MIAM UK explained. Mandatory Mediation Information and Assessment Meeting before family court, exemptions, Family Mediation Voucher Scheme, costs, and how mediation compares to court."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "MIAM Mediation Information UK", href: "/miam-mediation-information-assessment-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          A Mediation Information and Assessment Meeting (MIAM) is mandatory in most family cases before issuing court proceedings — including financial remedy applications and applications about children. The MIAM itself is just an information meeting with an FMC-accredited mediator who explains mediation, assesses whether the case is suitable, and signs off the form needed for court. Actual mediation remains voluntary. Where it works, mediation is faster, cheaper and less adversarial than court — but it suits cooperative cases more than contentious ones.
        </p>
        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">Even a successful mediated agreement does not become legally binding without a consent order approved by the court. Mediation should be seen as the negotiation stage; the consent order is the legal documentation. Both stages typically need professional input.</p>
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
        <InlineCTA label="Model Your Position Before Mediation" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">What You Need for a MIAM</h2>
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
            { label: "Mediation suitability assessment", desc: "Mediators decline to recommend mediation where there is evidence of domestic abuse, severe imbalance of power, or major trust issues. Where suitability is borderline, parties should think carefully whether mediation will be productive." },
            { label: "Disclosure in mediation", desc: "Mediation typically requires voluntary disclosure of finances. Without the structure of Form E and questionnaires, disclosure can be patchy. Parties suspecting non-disclosure may be better off in court proceedings where Form E is mandatory." },
            { label: "Solicitor support alongside mediation", desc: "Most successful mediated outcomes involve each party having their own solicitor in the background — for advice between sessions and for drafting the consent order at the end. Mediation alone is rarely sufficient." },
            { label: "Voucher scheme uncertainty", desc: "The Family Mediation Voucher Scheme is funded periodically by the government and may pause/reopen. Eligible families should claim while funding is available." },
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
            "Whether mediation is suitable in your specific circumstances",
            "Whether a MIAM exemption applies to your situation",
            "Whether your case will benefit from mediation or need court proceedings",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Is mediation likely to work in our circumstances?</li>
          <li>Are we eligible for the Family Mediation Voucher?</li>
          <li>Should I have a solicitor advising me alongside mediation?</li>
          <li>What disclosure will the mediator require us to provide?</li>
          <li>Who will draft the consent order if we reach agreement?</li>
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
