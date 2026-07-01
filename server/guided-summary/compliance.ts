/** Shared compliance rules for AI-generated guided summary output. */

export const FORBIDDEN_GUIDED_SUMMARY_PHRASES = [
  "you should accept",
  "you should reject",
  "you are entitled to",
  "entitled to",
  "legal entitlement",
  "the court would",
  "the court may",
  "court is likely",
  "court will",
  "a judge would",
  "a judge may",
  "you should negotiate",
  "you should ask for",
  "you should claim",
  "you can claim",
  "you could claim",
  "claim more",
  "push for",
  "negotiate for",
  "you deserve",
  "you will get",
  "you are owed",
  "must receive",
  "guaranteed",
  "taken into account",
  "what you can get",
  "what you will get",
  "maximise",
  "maximize",
  "protect your assets",
  "hide assets",
  "conceal assets",
] as const;

export function hasForbiddenGuidedSummaryPhrase(summary: unknown): string | undefined {
  const summaryText = JSON.stringify(summary).toLowerCase();
  return FORBIDDEN_GUIDED_SUMMARY_PHRASES.find((phrase) => summaryText.includes(phrase));
}
