import { Resend } from 'resend';

let resend: Resend | null = null;

function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!resend) resend = new Resend(apiKey);
  return resend;
}

// NOTE: noreply@divorcecalculatoruk.co.uk must be verified in Resend dashboard
// with SPF and DKIM DNS records before this will deliver correctly.
// Set RESEND_FROM_EMAIL env var to override the FROM address (e.g. for testing before DNS propagation).
const VERIFIED_DOMAIN = 'divorcecalculatoruk.co.uk';
const defaultFromEmail = `noreply@${VERIFIED_DOMAIN}`;
const fromEmail = process.env.RESEND_FROM_EMAIL || defaultFromEmail;
if (!fromEmail.endsWith(`@${VERIFIED_DOMAIN}`)) {
  console.warn(`[email] WARNING: FROM address (${fromEmail}) is not on the verified domain ${VERIFIED_DOMAIN}. Emails may fail to deliver.`);
}
const FROM = `DivorceCalculatorUK <${fromEmail}>`;
const REPLY_TO = 'support@divorcecalculatoruk.co.uk';

const UNLOCK_URL = 'https://divorcecalculatoruk.co.uk/unlock';
const RECOVER_URL = 'https://divorcecalculatoruk.co.uk/recover';
const PREVIEW_URL = 'https://divorcecalculatoruk.co.uk/preview';
const PRODUCT_CTA = 'Show my full answer — £79';
const PRODUCT_FOOTER = 'One-off payment · Three reports + PDF · 12 months access';

function nurtureUnsubscribeFooter(leadId: string): string {
  const unsubscribeUrl = `https://divorcecalculatoruk.co.uk/api/leads/unsubscribe?token=${htmlEscape(leadId)}`;
  return `
    <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;" />
    <p style="margin:0;color:#94a3b8;font-size:11px;line-height:1.6;">
      Illustrative modelling only — not legal, tax or financial advice. Always consult a qualified professional.
      &nbsp;&middot;&nbsp;<a href="${unsubscribeUrl}" style="color:#94a3b8;">Unsubscribe</a>
    </p>`;
}

function nurtureCtaBlock(href: string, label: string): string {
  return `
    <table cellpadding="0" cellspacing="0" width="100%" style="margin:0 0 8px;">
      <tr>
        <td align="center" style="background:#c49b2a;border-radius:8px;">
          <a href="${href}" style="display:block;padding:16px 32px;color:#ffffff;font-size:16px;font-weight:600;text-decoration:none;">${label}</a>
        </td>
      </tr>
    </table>
    <p style="margin:0 0 24px;text-align:center;color:#94a3b8;font-size:12px;">${PRODUCT_FOOTER}</p>`;
}

function htmlEscape(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatDate(date: Date | string | null): string {
  if (!date) return 'unknown';
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
}

function emailWrapper(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>DivorceCalculatorUK</title>
</head>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:Inter,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e2e8f0;">
          <tr>
            <td style="background:#0f1e3c;padding:24px 32px;">
              <p style="margin:0;color:#c49b2a;font-size:13px;letter-spacing:2px;text-transform:uppercase;font-weight:600;">DivorceCalculatorUK</p>
              <p style="margin:4px 0 0;color:#e2e8f0;font-size:11px;">divorcecalculatoruk.co.uk</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              ${content}
            </td>
          </tr>
          <tr>
            <td style="background:#f8fafc;padding:20px 32px;border-top:1px solid #e2e8f0;">
              <p style="margin:0;color:#94a3b8;font-size:11px;line-height:1.6;">
                This email was sent by DivorceCalculatorUK. This tool provides illustrative financial modelling only and does not constitute legal, tax, or financial advice. Always consult a qualified professional for your specific circumstances.
              </p>
              <p style="margin:8px 0 0;color:#94a3b8;font-size:11px;">
                DivorceCalculatorUK &middot; <a href="https://divorcecalculatoruk.co.uk/privacy" style="color:#94a3b8;">Privacy Policy</a> &middot; <a href="https://divorcecalculatoruk.co.uk/contact" style="color:#94a3b8;">Contact Support</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function sendPurchaseConfirmationEmail(
  email: string,
  sessionToken: string,
  expiresAt: Date | string | null
): Promise<void> {
  const client = getResend();
  if (!client) {
    console.warn('[email] RESEND_API_KEY not set — skipping purchase confirmation email');
    return;
  }

  const accessUrl = `https://divorcecalculatoruk.co.uk/access?token=${htmlEscape(sessionToken)}`;
  const expiryText = htmlEscape(formatDate(expiresAt));

  const html = emailWrapper(`
    <h1 style="margin:0 0 8px;color:#0f1e3c;font-size:24px;font-weight:700;">Your access is ready</h1>
    <p style="margin:0 0 28px;color:#475569;font-size:15px;line-height:1.6;">Thank you for your purchase. Your full divorce financial analysis is unlocked and ready to view.</p>

    <table cellpadding="0" cellspacing="0" width="100%" style="margin:0 0 28px;">
      <tr>
        <td align="center" style="background:#c49b2a;border-radius:8px;">
          <a href="${accessUrl}" style="display:block;padding:18px 32px;color:#ffffff;font-size:17px;font-weight:700;text-decoration:none;letter-spacing:0.3px;">Open My Analysis →</a>
        </td>
      </tr>
    </table>

    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:16px 20px;margin-bottom:24px;">
      <p style="margin:0 0 4px;color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Access expires</p>
      <p style="margin:0;color:#0f1e3c;font-size:16px;font-weight:600;">${expiryText}</p>
    </div>

    <p style="margin:0 0 8px;color:#94a3b8;font-size:12px;">Button not working? Copy this link:</p>
    <p style="margin:0 0 24px;color:#0f1e3c;font-size:12px;word-break:break-all;background:#f1f5f9;padding:10px 12px;border-radius:4px;font-family:monospace;">${accessUrl}</p>

    <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;" />

    <p style="margin:0 0 12px;color:#0f1e3c;font-size:14px;font-weight:600;">Using a different device or browser?</p>
    <p style="margin:0 0 20px;color:#64748b;font-size:13px;line-height:1.6;">
      Visit <a href="https://divorcecalculatoruk.co.uk/recover" style="color:#c49b2a;font-weight:600;">divorcecalculatoruk.co.uk/recover</a> and sign in with this email address (${htmlEscape(email)}) — we'll send you a fresh sign-in link.
    </p>

    <p style="margin:0;color:#94a3b8;font-size:12px;line-height:1.6;">
      Save this email — your access works for 12 months and can be restored at any time using the address you paid with.
    </p>
  `);

  try {
    await client.emails.send({
      from: FROM,
      to: email,
      replyTo: REPLY_TO,
      subject: 'Your DivorceCalculatorUK access is ready',
      html,
    });
    console.log('[email] Purchase confirmation sent');
  } catch (err) {
    console.error('[email] Failed to send purchase confirmation:', err);
  }
}

export async function sendExpertReviewConfirmationEmail(
  email: string,
): Promise<void> {
  const client = getResend();
  if (!client) {
    console.warn('[email] RESEND_API_KEY not set — skipping expert review confirmation');
    return;
  }

  const intakeUrl = "https://divorcecalculatoruk.co.uk/expert-review/intake";

  const html = emailWrapper(`
    <h1 style="margin:0 0 8px;color:#0f1e3c;font-size:24px;font-weight:700;">Position Review confirmed</h1>
    <p style="margin:0 0 20px;color:#475569;font-size:15px;line-height:1.6;">Thank you for purchasing Position Review. Complete the short intake form so we can begin your written briefing — delivered within 5 working days.</p>
    <table cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
      <tr>
        <td style="background:#c49b2a;border-radius:6px;">
          <a href="${intakeUrl}" style="display:inline-block;padding:14px 28px;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;border-radius:6px;">Complete intake form</a>
        </td>
      </tr>
    </table>
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:16px 20px;margin-bottom:20px;">
      <p style="margin:0 0 8px;color:#0f1e3c;font-size:14px;font-weight:600;">What you will receive</p>
      <ul style="margin:0;padding-left:18px;color:#64748b;font-size:13px;line-height:1.7;">
        <li>Input and assumption check against your modelled figures</li>
        <li>Scenario commentary and pressure points for your case</li>
        <li>Focused questions for your solicitor, mediator, broker or pension adviser</li>
        <li>Written PDF memo by email</li>
      </ul>
    </div>
    <p style="margin:0;color:#64748b;font-size:13px;line-height:1.6;">Modelling support only — not legal, financial, mortgage or tax advice. Questions? Email <a href="mailto:support@divorcecalculatoruk.co.uk" style="color:#c49b2a;font-weight:600;">support@divorcecalculatoruk.co.uk</a> from the same address you used at checkout.</p>
  `);

  try {
    await client.emails.send({
      from: FROM,
      to: email,
      replyTo: REPLY_TO,
      subject: 'Position Review — payment confirmed',
      html,
    });
    console.log('[email] Expert review confirmation sent');
  } catch (err) {
    console.error('[email] Failed to send expert review confirmation:', err);
  }
}

/** @deprecated Use sendExpertReviewConfirmationEmail */
export const sendReportSupportConfirmationEmail = sendExpertReviewConfirmationEmail;

export async function sendAccessRecoveryEmail(
  email: string,
  sessionToken: string,
  expiresAt: Date | string | null
): Promise<void> {
  const client = getResend();
  if (!client) {
    console.warn('[email] RESEND_API_KEY not set — skipping recovery email');
    return;
  }

  const accessUrl = `https://divorcecalculatoruk.co.uk/access?token=${htmlEscape(sessionToken)}`;
  const expiryText = htmlEscape(formatDate(expiresAt));

  const html = emailWrapper(`
    <h1 style="margin:0 0 8px;color:#0f1e3c;font-size:22px;font-weight:700;">Here's your access link</h1>
    <p style="margin:0 0 24px;color:#64748b;font-size:15px;">You requested access recovery for your DivorceCalculatorUK analysis.</p>

    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:20px;margin-bottom:24px;">
      <p style="margin:0 0 4px;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Access expires</p>
      <p style="margin:0;color:#0f1e3c;font-size:16px;font-weight:600;">${expiryText}</p>
    </div>

    <p style="margin:0 0 16px;color:#475569;font-size:14px;line-height:1.6;">
      Click the button below to restore access to your analysis on this device.
    </p>

    <table cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
      <tr>
        <td style="background:#c49b2a;border-radius:6px;">
          <a href="${accessUrl}" style="display:inline-block;padding:14px 28px;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;border-radius:6px;">Restore My Access</a>
        </td>
      </tr>
    </table>

    <p style="margin:0 0 8px;color:#94a3b8;font-size:12px;">Or copy this link into your browser:</p>
    <p style="margin:0;color:#0f1e3c;font-size:12px;word-break:break-all;background:#f1f5f9;padding:10px 12px;border-radius:4px;font-family:monospace;">${accessUrl}</p>

    <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;" />

    <p style="margin:0;color:#64748b;font-size:13px;line-height:1.6;">
      If you didn't request this, you can safely ignore this email. Your access has not changed.
    </p>
  `);

  try {
    await client.emails.send({
      from: FROM,
      to: email,
      replyTo: REPLY_TO,
      subject: 'Your DivorceCalculatorUK access link',
      html,
    });
    console.log('[email] Recovery email sent');
  } catch (err) {
    console.error('[email] Failed to send recovery email:', err);
  }
}

export async function sendProgressSummaryEmail(
  email: string,
  assetPoolSnapshot: string,
  leadId?: string,
): Promise<void> {
  const client = getResend();
  if (!client) {
    console.warn('[email] RESEND_API_KEY not set — skipping progress summary email');
    return;
  }

  const unlockUrl = UNLOCK_URL;
  const poolDisplay = htmlEscape(assetPoolSnapshot ? `£${Number(assetPoolSnapshot).toLocaleString('en-GB')}` : 'your figures');


  const html = emailWrapper(`
    <h1 style="margin:0 0 16px;color:#0f1e3c;font-size:22px;font-weight:700;line-height:1.3;">Your settlement snapshot is ready</h1>

    <p style="margin:0 0 20px;color:#475569;font-size:15px;line-height:1.7;">
      You've just done something most people going through a divorce never do — you sat down with the actual numbers. That matters.
    </p>

    <div style="background:#f8fafc;border-left:4px solid #c49b2a;padding:16px 20px;margin-bottom:24px;border-radius:0 6px 6px 0;">
      <p style="margin:0 0 4px;color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Your combined asset pool</p>
      <p style="margin:0;color:#0f1e3c;font-size:28px;font-weight:700;">${poolDisplay}</p>
      <p style="margin:6px 0 0;color:#94a3b8;font-size:12px;">Property equity + liquid assets. Pensions modelled separately.</p>
    </div>

    <p style="margin:0 0 12px;color:#475569;font-size:15px;line-height:1.7;">
      Your free snapshot shows the pool. <strong>Your Full Divorce Position</strong> (£79) goes further — three dedicated reports from your figures:
    </p>

    <ul style="margin:0 0 20px;padding-left:20px;color:#475569;font-size:14px;line-height:1.8;">
      <li><strong>What each option leaves you with</strong> — capital, pension and monthly headroom under each settlement path</li>
      <li><strong>What stands out in your case</strong> — the figures and trade-offs worth noticing before you reply</li>
      <li><strong>What to check before you agree</strong> — questions to raise with a solicitor or adviser</li>
    </ul>

    <p style="margin:0 0 24px;color:#64748b;font-size:13px;line-height:1.6;">
      Illustrative modelling only — not legal, tax or financial advice.
    </p>

    <table cellpadding="0" cellspacing="0" width="100%" style="margin:0 0 8px;">
      <tr>
        <td align="center" style="background:#c49b2a;border-radius:8px;">
          <a href="${unlockUrl}" style="display:block;padding:18px 32px;color:#ffffff;font-size:17px;font-weight:700;text-decoration:none;">Show my full answer — £79</a>
        </td>
      </tr>
    </table>
    <p style="margin:0 0 28px;text-align:center;color:#94a3b8;font-size:12px;">One-off payment · Three reports + PDF · 12 months access</p>

    <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;" />

    <p style="margin:0;color:#64748b;font-size:13px;line-height:1.6;">
      Using a different device? Visit <a href="${RECOVER_URL}" style="color:#c49b2a;">divorcecalculatoruk.co.uk/recover</a> and enter this email address to pick up where you left off.
    </p>
    <p style="margin:8px 0 0;color:#94a3b8;font-size:12px;">We will never share your details with solicitors or any third party.</p>
    ${leadId ? nurtureUnsubscribeFooter(leadId) : ''}
  `);

  try {
    await client.emails.send({
      from: FROM,
      to: email,
      replyTo: REPLY_TO,
      subject: 'Your settlement snapshot is ready — see what each path leaves you with',
      html,
    });
    console.log('[email] Progress summary email sent');
  } catch (err) {
    console.error('[email] Failed to send progress summary email:', err);
  }
}

export async function sendMagicLinkEmail(
  email: string,
  magicToken: string,
  baseUrl: string
): Promise<void> {
  const client = getResend();
  if (!client) {
    console.warn('[email] RESEND_API_KEY not set — skipping magic link email');
    return;
  }

  const signInUrl = `${baseUrl}/api/auth/verify?token=${encodeURIComponent(magicToken)}`;

  const html = emailWrapper(`
    <h1 style="margin:0 0 8px;color:#0f1e3c;font-size:22px;font-weight:700;">Your sign-in link</h1>
    <p style="margin:0 0 24px;color:#64748b;font-size:15px;">Click the button below to sign in and access your financial analysis. No password needed — this link works on any device.</p>

    <table cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
      <tr>
        <td style="background:#c49b2a;border-radius:6px;">
          <a href="${htmlEscape(signInUrl)}" style="display:inline-block;padding:14px 28px;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;border-radius:6px;">Sign In to My Analysis</a>
        </td>
      </tr>
    </table>

    <div style="background:#fefce8;border:1px solid #fde68a;border-radius:6px;padding:14px 18px;margin-bottom:20px;">
      <p style="margin:0;color:#92400e;font-size:13px;line-height:1.6;">
        <strong>This link expires in 1 hour</strong> and can only be used once. If you didn't request this, no action is needed — your account is secure.
      </p>
    </div>

    <p style="margin:0 0 8px;color:#94a3b8;font-size:12px;">Or copy this link into your browser:</p>
    <p style="margin:0;color:#0f1e3c;font-size:12px;word-break:break-all;background:#f1f5f9;padding:10px 12px;border-radius:4px;font-family:monospace;">${htmlEscape(signInUrl)}</p>

    <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;" />

    <p style="margin:0;color:#64748b;font-size:13px;line-height:1.6;">
      After clicking the link you'll be signed in automatically and taken straight to your analysis. The link is single-use — if it expires, visit <a href="${baseUrl}/recover" style="color:#0f1e3c;">${baseUrl.replace(/^https?:\/\//, '')}/recover</a> to request a new one.
    </p>
  `);

  try {
    await client.emails.send({
      from: FROM,
      to: email,
      replyTo: REPLY_TO,
      subject: 'Sign in to DivorceCalculatorUK — your one-click link',
      html,
    });
    console.log('[email] Magic link email sent');
  } catch (err) {
    console.error('[email] Failed to send magic link email:', err);
  }
}

const ADMIN_EMAIL = 'support@divorcecalculatoruk.co.uk';

export async function sendAdminNotification(
  subject: string,
  bodyLines: { label: string; value: string }[],
  eventType: 'purchase' | 'gdpr_delete' | 'lead_capture' | 'report_support' | 'expert_review' | 'expert_review_intake'
): Promise<void> {
  const client = getResend();
  if (!client) {
    console.warn('[email] RESEND_API_KEY not set — skipping admin notification');
    return;
  }

  const badgeColour =
    eventType === 'purchase' ? '#15803d'
    : eventType === 'expert_review' || eventType === 'expert_review_intake' ? '#7c3aed'
    : eventType === 'report_support' ? '#7c3aed'
    : eventType === 'gdpr_delete' ? '#b91c1c'
    : '#1d4ed8';
  const badgeLabel =
    eventType === 'purchase' ? 'New Purchase'
    : eventType === 'expert_review' ? 'Expert Review'
    : eventType === 'expert_review_intake' ? 'Expert Review Intake'
    : eventType === 'report_support' ? 'Report Support'
    : eventType === 'gdpr_delete' ? 'GDPR Delete Request'
    : 'New Lead Capture';

  const rows = bodyLines.map(({ label, value }) => `
    <tr>
      <td style="padding:6px 12px;color:#64748b;font-size:13px;border-bottom:1px solid #f1f5f9;">${htmlEscape(label)}</td>
      <td style="padding:6px 12px;color:#0f1e3c;font-size:13px;font-weight:500;border-bottom:1px solid #f1f5f9;">${htmlEscape(value)}</td>
    </tr>`).join('');

  const html = emailWrapper(`
    <div style="display:inline-block;padding:4px 10px;background:${badgeColour};color:#fff;border-radius:4px;font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;margin-bottom:16px;">${badgeLabel}</div>
    <h1 style="margin:0 0 16px;color:#0f1e3c;font-size:20px;font-weight:700;">${htmlEscape(subject)}</h1>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:6px;overflow:hidden;margin-bottom:16px;">
      ${rows}
    </table>
    <p style="margin:0;color:#94a3b8;font-size:11px;">Sent automatically by DivorceCalculatorUK · ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}</p>
  `);

  try {
    await client.emails.send({
      from: FROM,
      to: ADMIN_EMAIL,
      subject: `[DivorceCalcUK] ${subject}`,
      html,
    });
    console.log(`[email] Admin notification sent: ${subject}`);
  } catch (err) {
    console.error('[email] Failed to send admin notification:', err);
  }
}

export async function sendNurtureReengageEmail(
  email: string,
  leadId: string,
  assetPoolSnapshot: string | null,
): Promise<void> {
  const client = getResend();
  if (!client) {
    console.warn('[email] RESEND_API_KEY not set — skipping nurture re-engage email');
    return;
  }

  const poolDisplay = assetPoolSnapshot
    ? `£${Number(assetPoolSnapshot).toLocaleString('en-GB')}`
    : null;

  const html = emailWrapper(`
    <h1 style="margin:0 0 16px;color:#0f1e3c;font-size:22px;font-weight:700;line-height:1.3;">You took a difficult first step</h1>

    <p style="margin:0 0 16px;color:#475569;font-size:15px;line-height:1.7;">
      Separation brings a lot of uncertainty — financial uncertainty often being the hardest part. Taking the time to sit down with your numbers, even just to see where things stand, takes courage.
    </p>

    <p style="margin:0 0 20px;color:#475569;font-size:15px;line-height:1.7;">
      Your figures are still saved. Your free snapshot shows the pool — <strong>Your Full Divorce Position</strong> shows what each settlement path actually leaves you with, month by month.
    </p>

    ${poolDisplay ? `
    <div style="background:#f8fafc;border-left:4px solid #c49b2a;padding:16px 20px;margin-bottom:24px;border-radius:0 6px 6px 0;">
      <p style="margin:0 0 4px;color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Your combined asset pool</p>
      <p style="margin:0;color:#0f1e3c;font-size:26px;font-weight:700;">${htmlEscape(poolDisplay)}</p>
      <p style="margin:6px 0 0;color:#94a3b8;font-size:12px;">Property equity + liquid assets. Pensions modelled separately.</p>
    </div>` : ''}

    <p style="margin:0 0 24px;color:#475569;font-size:14px;line-height:1.7;">
      No pressure to do anything right now. When you're ready, your three full reports are one step away.
    </p>

    ${nurtureCtaBlock(UNLOCK_URL, PRODUCT_CTA)}
    ${nurtureUnsubscribeFooter(leadId)}
  `);

  try {
    await client.emails.send({
      from: FROM,
      to: email,
      replyTo: REPLY_TO,
      subject: 'Your figures are still saved — no rush',
      html,
    });
    console.log(`[email] Nurture re-engage email sent to ${email}`);
  } catch (err) {
    console.error('[email] Failed to send nurture re-engage email:', err);
  }
}

export async function sendNurtureShareEmail(email: string, leadId: string): Promise<void> {
  const client = getResend();
  if (!client) {
    console.warn('[email] RESEND_API_KEY not set — skipping nurture share email');
    return;
  }

  const html = emailWrapper(`
    <h1 style="margin:0 0 16px;color:#0f1e3c;font-size:22px;font-weight:700;line-height:1.3;">Splitting the pool isn't the same as knowing your share</h1>

    <p style="margin:0 0 16px;color:#475569;font-size:15px;line-height:1.7;">
      A 50/50 split of assets doesn't always mean the same monthly outcome once housing, pensions and debt are applied. That's the gap most people only see after they've agreed.
    </p>

    <div style="background:#f8fafc;border-left:4px solid #c49b2a;padding:16px 20px;margin-bottom:24px;border-radius:0 6px 6px 0;">
      <p style="margin:0;color:#0f1e3c;font-size:14px;line-height:1.7;">
        Pensions are often the surprise. The Cash Equivalent Transfer Value (CETV) — the lump-sum worth today — can equal or exceed the equity in the family home. Without it in the picture, a split can look fair when it isn't.
      </p>
    </div>

    <p style="margin:0 0 24px;color:#475569;font-size:14px;line-height:1.7;">
      <strong>What Each Option Leaves You With</strong> shows your capital, pension and monthly position under each of the four settlement paths — built from the figures you already entered.
    </p>

    ${nurtureCtaBlock(UNLOCK_URL, 'See what each path leaves me with — £79')}
    ${nurtureUnsubscribeFooter(leadId)}
  `);

  try {
    await client.emails.send({
      from: FROM,
      to: email,
      replyTo: REPLY_TO,
      subject: 'What your share looks like under each path',
      html,
    });
    console.log(`[email] Nurture share email sent to ${email}`);
  } catch (err) {
    console.error('[email] Failed to send nurture share email:', err);
  }
}

export async function sendNurtureHeadroomEmail(email: string, leadId: string): Promise<void> {
  const client = getResend();
  if (!client) {
    console.warn('[email] RESEND_API_KEY not set — skipping nurture headroom email');
    return;
  }

  const html = emailWrapper(`
    <h1 style="margin:0 0 16px;color:#0f1e3c;font-size:22px;font-weight:700;line-height:1.3;">The question behind every settlement split</h1>

    <p style="margin:0 0 16px;color:#475569;font-size:15px;line-height:1.7;">
      <em>"Will the money last?"</em>
    </p>

    <p style="margin:0 0 20px;color:#475569;font-size:15px;line-height:1.7;">
      It's probably what people worry about most — not just this month, but in a year or three. Will the settlement you agree to leave you on solid ground?
    </p>

    <div style="background:#f8fafc;border-left:4px solid #c49b2a;padding:16px 20px;margin-bottom:24px;border-radius:0 6px 6px 0;">
      <p style="margin:0;color:#0f1e3c;font-size:14px;line-height:1.7;">
        A split that looks fair on paper can still leave you short each month if outgoings exceed income. Your full reports model monthly headroom directly — so you can see which paths are liveable and which quietly run reserves down.
      </p>
    </div>

    <p style="margin:0 0 24px;color:#475569;font-size:14px;line-height:1.7;">
      You've already put your figures in. If you want that answer for your own peace of mind, it's there when you're ready.
    </p>

    ${nurtureCtaBlock(UNLOCK_URL, 'See my monthly picture — £79')}
    ${nurtureUnsubscribeFooter(leadId)}
  `);

  try {
    await client.emails.send({
      from: FROM,
      to: email,
      replyTo: REPLY_TO,
      subject: 'Will the money last? Here\'s how to find out',
      html,
    });
    console.log(`[email] Nurture headroom email sent to ${email}`);
  } catch (err) {
    console.error('[email] Failed to send nurture headroom email:', err);
  }
}

/** Admin manual send — maps to nurture headroom email. */
export async function sendPromoEmail(
  email: string,
  unsubscribeToken: string,
  _assetPoolSnapshot: string | null,
): Promise<void> {
  await sendNurtureHeadroomEmail(email, unsubscribeToken);
}

export async function sendNurtureQuestionsEmail(email: string, leadId: string): Promise<void> {
  const client = getResend();
  if (!client) {
    console.warn('[email] RESEND_API_KEY not set — skipping nurture questions email');
    return;
  }

  const html = emailWrapper(`
    <h1 style="margin:0 0 16px;color:#0f1e3c;font-size:22px;font-weight:700;line-height:1.3;">Before you reply to their offer</h1>

    <p style="margin:0 0 16px;color:#475569;font-size:15px;line-height:1.7;">
      Most people want three things before they agree: to know their share, to know whether they'll be okay month to month, and to know what to ask a professional.
    </p>

    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:16px 20px;margin-bottom:24px;">
      <p style="margin:0 0 8px;color:#0f1e3c;font-size:14px;font-weight:600;">Your full reports cover:</p>
      <ul style="margin:0;padding-left:18px;color:#64748b;font-size:13px;line-height:1.8;">
        <li>What stands out in your case — figures and trade-offs worth noticing</li>
        <li>What's missing or assumed in the current split</li>
        <li>Questions to raise with a solicitor or adviser before you agree</li>
      </ul>
    </div>

    <p style="margin:0 0 24px;color:#475569;font-size:14px;line-height:1.7;">
      Your snapshot is still saved. The three full reports turn your figures into a checklist you can actually use in conversation.
    </p>

    ${nurtureCtaBlock(UNLOCK_URL, 'Get my questions list — £79')}
    ${nurtureUnsubscribeFooter(leadId)}
  `);

  try {
    await client.emails.send({
      from: FROM,
      to: email,
      replyTo: REPLY_TO,
      subject: 'Three things worth checking before you reply',
      html,
    });
    console.log(`[email] Nurture questions email sent to ${email}`);
  } catch (err) {
    console.error('[email] Failed to send nurture questions email:', err);
  }
}

export async function sendNurtureFinalEmail(email: string, leadId: string): Promise<void> {
  const client = getResend();
  if (!client) {
    console.warn('[email] RESEND_API_KEY not set — skipping nurture final email');
    return;
  }

  const html = emailWrapper(`
    <h1 style="margin:0 0 16px;color:#0f1e3c;font-size:22px;font-weight:700;line-height:1.3;">Wishing you well, whatever you decide</h1>

    <p style="margin:0 0 16px;color:#475569;font-size:15px;line-height:1.7;">
      This will be our last email — we just wanted to check in one final time.
    </p>

    <p style="margin:0 0 16px;color:#475569;font-size:15px;line-height:1.7;">
      Going through a separation is hard, and the financial side can feel overwhelming. We built this tool so people could see clear, honest numbers — without paying a solicitor just to understand where they stand.
    </p>

    <p style="margin:0 0 24px;color:#475569;font-size:15px;line-height:1.7;">
      Whether or not the full reports are right for you, we hope the time you spent on your figures gave you something useful. Your snapshot is still saved whenever you need it.
    </p>

    <table cellpadding="0" cellspacing="0" width="100%" style="margin:0 0 8px;">
      <tr>
        <td align="center" style="background:#c49b2a;border-radius:8px;">
          <a href="${PREVIEW_URL}" style="display:block;padding:16px 32px;color:#ffffff;font-size:16px;font-weight:600;text-decoration:none;">Return to my snapshot</a>
        </td>
      </tr>
    </table>
    <p style="margin:0 0 24px;text-align:center;color:#94a3b8;font-size:12px;">Take care of yourself. We're here if you need us.</p>

    ${nurtureUnsubscribeFooter(leadId)}
  `);

  try {
    await client.emails.send({
      from: FROM,
      to: email,
      replyTo: REPLY_TO,
      subject: 'Wishing you well — your snapshot is here if you need it',
      html,
    });
    console.log(`[email] Nurture final email sent to ${email}`);
  } catch (err) {
    console.error('[email] Failed to send nurture final email:', err);
  }
}

/** @deprecated Legacy exports — use sendNurture* helpers. */
export const sendFollowUpEmail = sendNurtureReengageEmail;
export const sendPensionInsightEmail = sendNurtureShareEmail;
export const sendSustainabilityEmail = sendNurtureHeadroomEmail;
export const sendFinalNudgeEmail = sendNurtureFinalEmail;

export async function sendEmailVerificationEmail(
  email: string,
  verificationToken: string
): Promise<void> {
  const client = getResend();
  if (!client) {
    console.warn('[email] RESEND_API_KEY not set — skipping verification email');
    return;
  }

  const verifyUrl = `https://divorcecalculatoruk.co.uk/api/leads/verify?token=${htmlEscape(verificationToken)}`;

  const html = emailWrapper(`
    <h1 style="margin:0 0 8px;color:#0f1e3c;font-size:22px;font-weight:700;">Confirm your email address</h1>
    <p style="margin:0 0 24px;color:#64748b;font-size:15px;">You signed up to receive our free UK Divorce Finances Guide. Please confirm your email address to receive it.</p>

    <table cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
      <tr>
        <td style="background:#c49b2a;border-radius:6px;">
          <a href="${verifyUrl}" style="display:inline-block;padding:14px 28px;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;border-radius:6px;">Confirm my email</a>
        </td>
      </tr>
    </table>

    <p style="margin:0 0 8px;color:#94a3b8;font-size:12px;">Or copy this link into your browser:</p>
    <p style="margin:0;color:#0f1e3c;font-size:12px;word-break:break-all;background:#f1f5f9;padding:10px 12px;border-radius:4px;font-family:monospace;">${verifyUrl}</p>

    <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;" />

    <p style="margin:0;color:#64748b;font-size:13px;line-height:1.6;">
      If you did not sign up for this, you can safely ignore this email. No further action is required.
    </p>
  `);

  try {
    await client.emails.send({
      from: FROM,
      to: email,
      replyTo: REPLY_TO,
      subject: 'Please confirm your email — DivorceCalculatorUK',
      html,
    });
    console.log('[email] Verification email sent');
  } catch (err) {
    console.error('[email] Failed to send verification email:', err);
  }
}
