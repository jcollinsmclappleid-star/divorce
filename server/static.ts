import express, { type Express } from "express";
import fs from "fs";
import path from "path";

const SEO_CONTENT = `
  <div id="seo-content" style="position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden;">
    <h1>UK Divorce Financial Settlement Calculator</h1>
    <p>
      Divorce Calculator UK is a free financial modelling tool for people going through divorce or separation in England and Wales.
      Enter your assets, property, pensions, savings and debts to model how your finances would be divided under the Matrimonial Causes Act 1973.
      Compare multiple settlement scenarios, understand your long-term financial position, and generate a structured financial brief — all without paying solicitor fees upfront.
    </p>

    <h2>What does this calculator cover?</h2>
    <ul>
      <li>Property and house division — sell and split, one party retaining the home, deferred sale</li>
      <li>Pension sharing — pension splitting, pension offsetting, and pension attachment</li>
      <li>Savings and investments — liquid assets, ISAs, shares and portfolios</li>
      <li>Debts and mortgages — joint and sole liabilities, negative equity scenarios</li>
      <li>Income and maintenance — spousal maintenance, child maintenance interaction, monthly surplus/deficit</li>
      <li>Clean break orders and ongoing financial ties</li>
      <li>UK 2025/26 income tax and National Insurance applied to post-settlement incomes</li>
      <li>5-year capital sustainability projections per settlement scenario</li>
    </ul>

    <h2>How does it work?</h2>
    <ol>
      <li>Enter your financial details — assets, property value, outstanding mortgage, pensions, savings, debts, incomes and living costs — privately in your browser. No account required.</li>
      <li>The model calculates your net financial position across four settlement structures: Sell &amp; Split, one party retaining the home, the other retaining the home, and a deferred sale arrangement.</li>
      <li>Review your personalised analysis — including a Financial Sustainability Indicator score (0–100), 5-year capital projections, and a downloadable Structured Financial Brief you can take to a solicitor or mediator.</li>
    </ol>

    <h2>Is it free?</h2>
    <p>
      Yes — entering your financial details and viewing your asset pool is completely free. There is no account required and no subscription.
      A one-time payment of £79 unlocks the full structured analysis including all scenario comparisons, Financial Sustainability Indicator scores, 5-year projections, interest rate stress testing, and a downloadable PDF report.
      Access lasts 12 months with unlimited re-runs. Average UK divorce legal fees are £12,000–£15,000; this tool helps you prepare before those conversations begin.
    </p>

    <h2>Is this legal advice?</h2>
    <p>
      No. Divorce Calculator UK provides illustrative financial modelling only. It is not regulated by the FCA or the SRA and does not constitute legal, financial or tax advice.
      It does not predict what a court would order, assess legal entitlement, or replace the need for independent professional advice.
      All outputs are based solely on the financial assumptions you enter.
      Results are illustrative and should be used to inform — not replace — professional legal and financial guidance.
    </p>

    <h2>Who is this for?</h2>
    <p>
      This tool is designed for people going through divorce or separation in England and Wales who want to understand their financial position before consulting a solicitor,
      who are considering mediation and want to arrive with quantified figures,
      or who have received a settlement proposal and want to model what it means for their long-term finances.
      It is not applicable to Scottish law.
    </p>

    <h2>Key articles and guides</h2>
    <ul>
      <li><a href="/how-much-does-divorce-cost-uk">How much does divorce cost in the UK?</a></li>
      <li><a href="/can-i-keep-the-house-after-divorce-uk">Can I keep the house after divorce?</a></li>
      <li><a href="/how-are-pensions-divided-in-divorce-uk">How are pensions divided in divorce?</a></li>
      <li><a href="/divorce-settlement-examples-uk">UK divorce settlement examples</a></li>
      <li><a href="/what-is-a-consent-order-uk-divorce">What is a consent order?</a></li>
      <li><a href="/what-is-a-clean-break-order-uk">What is a clean break order?</a></li>
      <li><a href="/divorce-financial-settlement-calculator-uk">How are assets divided in divorce UK?</a></li>
      <li><a href="/mediation-vs-court-divorce-uk-costs">Mediation vs court — costs and timelines</a></li>
      <li><a href="/divorce-financial-guides">All divorce financial guides</a></li>
    </ul>
  </div>
`;

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  const indexPath = path.resolve(distPath, "index.html");

  app.use("/{*path}", (_req, res) => {
    try {
      const html = fs.readFileSync(indexPath, "utf-8");
      const injected = html.replace("</body>", `${SEO_CONTENT}\n  </body>`);
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.send(injected);
    } catch {
      res.sendFile(indexPath);
    }
  });
}
