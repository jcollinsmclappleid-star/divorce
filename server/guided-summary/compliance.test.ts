import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  FORBIDDEN_GUIDED_SUMMARY_PHRASES,
  hasForbiddenGuidedSummaryPhrase,
} from "./compliance.ts";

describe("guided summary compliance", () => {
  it("flags forbidden advisory phrases", () => {
    assert.equal(
      hasForbiddenGuidedSummaryPhrase({ overview: "The court would likely award you more." }),
      "the court would",
    );
    assert.equal(
      hasForbiddenGuidedSummaryPhrase({ overview: "You are entitled to 60% of the house." }),
      "you are entitled to",
    );
    assert.equal(
      hasForbiddenGuidedSummaryPhrase({ pressure_points: "You should accept this offer." }),
      "you should accept",
    );
  });

  it("allows neutral modelling language", () => {
    assert.equal(
      hasForbiddenGuidedSummaryPhrase({
        overview: "Party A has £120,000 liquid capital under the modelled split.",
        what_stands_out: "Pension CETV gap of £45,000 between parties.",
        scenario_interpretation: "Sell & Split leaves Party B with lower monthly surplus.",
        pressure_points: "Party B reserves deplete in year 8 under keep-home scenario.",
        questions_for_professionals: {
          solicitor_mediator: ["Are the pension CETV figures current?"],
          mortgage_broker: ["Does the mortgage balance look supportable?"],
          pension_expert: ["Is specialist pension input needed?"],
        },
        missing_information: "Replace expense estimates with actual bills when available.",
      }),
      undefined,
    );
  });

  it("keeps the forbidden phrase list non-empty and unique", () => {
    assert.ok(FORBIDDEN_GUIDED_SUMMARY_PHRASES.length >= 20);
    assert.equal(
      new Set(FORBIDDEN_GUIDED_SUMMARY_PHRASES).size,
      FORBIDDEN_GUIDED_SUMMARY_PHRASES.length,
    );
  });
});
