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
  assetPoolSnapshot: string
): Promise<void> {
  const client = getResend();
  if (!client) {
    console.warn('[email] RESEND_API_KEY not set — skipping progress summary email');
    return;
  }

  const unlockUrl = 'https://divorcecalculatoruk.co.uk/unlock';
  const poolDisplay = htmlEscape(assetPoolSnapshot ? `£${Number(assetPoolSnapshot).toLocaleString('en-GB')}` : 'your figures');

  const html = emailWrapper(`
    <h1 style="margin:0 0 8px;color:#0f1e3c;font-size:22px;font-weight:700;">Your financial position has been modelled</h1>
    <p style="margin:0 0 24px;color:#64748b;font-size:15px;">Here's a summary of what you entered.</p>

    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:20px;margin-bottom:24px;">
      <p style="margin:0 0 4px;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Combined distributable pool</p>
      <p style="margin:0;color:#0f1e3c;font-size:24px;font-weight:700;">${poolDisplay}</p>
      <p style="margin:6px 0 0;color:#94a3b8;font-size:12px;">Property equity + liquid assets. Pensions modelled separately.</p>
    </div>

    <p style="margin:0 0 16px;color:#475569;font-size:14px;line-height:1.6;">
      Your free preview shows the shape of your settlement. The full analysis shows you whether you can live on it — including monthly surplus or deficit per option, the Financial Sustainability Index, and 5-year capital projections.
    </p>

    <table cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
      <tr>
        <td style="background:#c49b2a;border-radius:6px;">
          <a href="${unlockUrl}" style="display:inline-block;padding:14px 28px;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;border-radius:6px;">Unlock Full Analysis — £79</a>
        </td>
      </tr>
    </table>

    <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;" />

    <p style="margin:0;color:#64748b;font-size:13px;line-height:1.6;">
      Need to return to your session on a different device? Visit <a href="https://divorcecalculatoruk.co.uk/recover" style="color:#0f1e3c;">divorcecalculatoruk.co.uk/recover</a> and enter this email address.
    </p>
  `);

  try {
    await client.emails.send({
      from: FROM,
      to: email,
      replyTo: REPLY_TO,
      subject: 'Your DivorceCalculatorUK financial summary',
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
  eventType: 'purchase' | 'gdpr_delete' | 'lead_capture'
): Promise<void> {
  const client = getResend();
  if (!client) {
    console.warn('[email] RESEND_API_KEY not set — skipping admin notification');
    return;
  }

  const badgeColour = eventType === 'purchase' ? '#15803d' : eventType === 'gdpr_delete' ? '#b91c1c' : '#1d4ed8';
  const badgeLabel = eventType === 'purchase' ? 'New Purchase' : eventType === 'gdpr_delete' ? 'GDPR Delete Request' : 'New Lead Capture';

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

export async function sendFollowUpEmail(
  email: string,
  assetPoolSnapshot: string | null
): Promise<void> {
  const client = getResend();
  if (!client) {
    console.warn('[email] RESEND_API_KEY not set — skipping follow-up email');
    return;
  }

  const unlockUrl = 'https://divorcecalculatoruk.co.uk/unlock';
  const poolDisplay = assetPoolSnapshot
    ? `£${Number(assetPoolSnapshot).toLocaleString('en-GB')}`
    : null;

  const html = emailWrapper(`
    <h1 style="margin:0 0 16px;color:#0f1e3c;font-size:22px;font-weight:700;line-height:1.3;">You took a difficult first step</h1>

    <p style="margin:0 0 16px;color:#475569;font-size:15px;line-height:1.7;">
      Separation brings a lot of uncertainty — financial uncertainty often being the hardest part. Taking the time to actually sit down with your numbers, even just to see where things stand, takes courage.
    </p>

    <p style="margin:0 0 20px;color:#475569;font-size:15px;line-height:1.7;">
      Your figures are still saved. The free preview shows the shape of things — the full analysis goes further, showing you whether each settlement option is actually <em>liveable</em> on your income, month by month, over five years.
    </p>

    ${poolDisplay ? `
    <div style="background:#f8fafc;border-left:4px solid #c49b2a;padding:16px 20px;margin-bottom:24px;border-radius:0 6px 6px 0;">
      <p style="margin:0 0 4px;color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Your combined asset pool</p>
      <p style="margin:0;color:#0f1e3c;font-size:26px;font-weight:700;">${htmlEscape(poolDisplay)}</p>
      <p style="margin:6px 0 0;color:#94a3b8;font-size:12px;">Property equity + liquid assets. Pensions modelled separately.</p>
    </div>` : ''}

    <p style="margin:0 0 24px;color:#475569;font-size:14px;line-height:1.7;">
      No pressure to do anything right now. When you're ready to see the full picture, it's there for you.
    </p>

    <table cellpadding="0" cellspacing="0" width="100%" style="margin:0 0 8px;">
      <tr>
        <td align="center" style="background:#c49b2a;border-radius:8px;">
          <a href="${unlockUrl}" style="display:block;padding:16px 32px;color:#ffffff;font-size:16px;font-weight:600;text-decoration:none;">Return to my analysis</a>
        </td>
      </tr>
    </table>
    <p style="margin:0 0 24px;text-align:center;color:#94a3b8;font-size:12px;">One-off £79 · 12 months unlimited access</p>

    <p style="margin:0;color:#94a3b8;font-size:12px;line-height:1.6;">
      We will never share your details with solicitors or any third party.
    </p>
  `);

  try {
    await client.emails.send({
      from: FROM,
      to: email,
      replyTo: REPLY_TO,
      subject: 'Your figures are still saved — no rush',
      html,
    });
    console.log(`[email] Follow-up email sent to ${email}`);
  } catch (err) {
    console.error('[email] Failed to send follow-up email:', err);
  }
}

export async function sendPromoEmail(
  email: string,
  unsubscribeToken: string,
  assetPoolSnapshot: string | null
): Promise<void> {
  const client = getResend();
  if (!client) {
    console.warn('[email] RESEND_API_KEY not set — skipping promo email');
    return;
  }

  const unlockUrl = 'https://divorcecalculatoruk.co.uk/unlock';
  const unsubscribeUrl = `https://divorcecalculatoruk.co.uk/api/leads/unsubscribe?token=${htmlEscape(unsubscribeToken)}`;
  const poolDisplay = assetPoolSnapshot
    ? `£${Number(assetPoolSnapshot).toLocaleString('en-GB')}`
    : null;

  const html = emailWrapper(`
    <h1 style="margin:0 0 16px;color:#0f1e3c;font-size:22px;font-weight:700;line-height:1.3;">A small something, in case it helps</h1>

    <p style="margin:0 0 16px;color:#475569;font-size:15px;line-height:1.7;">
      We know a divorce isn't cheap — between solicitors, mediators, and everything else, the costs add up quickly.
    </p>

    <p style="margin:0 0 20px;color:#475569;font-size:15px;line-height:1.7;">
      We'd like to offer you a small discount. No deadline, no pressure — use it when and if the time feels right.
    </p>

    <div style="background:#fefce8;border:1px solid #e9c65a;border-radius:8px;padding:20px 24px;margin-bottom:24px;text-align:center;">
      <p style="margin:0 0 6px;color:#92400e;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Your discount code</p>
      <p style="margin:0 0 8px;color:#0f1e3c;font-size:30px;font-weight:800;letter-spacing:3px;">CLARITY15</p>
      <p style="margin:0;color:#64748b;font-size:13px;">15% off at checkout — £79 becomes £67.15</p>
    </div>

    ${poolDisplay ? `
    <div style="background:#f8fafc;border-left:4px solid #c49b2a;padding:16px 20px;margin-bottom:24px;border-radius:0 6px 6px 0;">
      <p style="margin:0 0 4px;color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Your combined asset pool</p>
      <p style="margin:0;color:#0f1e3c;font-size:26px;font-weight:700;">${htmlEscape(poolDisplay)}</p>
      <p style="margin:6px 0 0;color:#94a3b8;font-size:12px;">Property equity + liquid assets. Pensions modelled separately.</p>
    </div>` : ''}

    <p style="margin:0 0 24px;color:#475569;font-size:14px;line-height:1.7;">
      The full analysis shows you whether each settlement option is actually liveable on your income — month by month, over five years — so you can go into negotiations knowing your numbers, not guessing at them.
    </p>

    <table cellpadding="0" cellspacing="0" width="100%" style="margin:0 0 8px;">
      <tr>
        <td align="center" style="background:#c49b2a;border-radius:8px;">
          <a href="${unlockUrl}" style="display:block;padding:16px 32px;color:#ffffff;font-size:16px;font-weight:600;text-decoration:none;">Unlock my full analysis</a>
        </td>
      </tr>
    </table>
    <p style="margin:0 0 24px;text-align:center;color:#94a3b8;font-size:12px;">Enter <strong>CLARITY15</strong> at checkout · 12 months unlimited access</p>

    <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;" />

    <p style="margin:0;color:#94a3b8;font-size:11px;line-height:1.6;">
      Illustrative modelling only — not legal, financial or tax advice. Always consult a qualified professional.
    </p>
    <p style="margin:8px 0 0;color:#94a3b8;font-size:11px;">
      We will never share your details with solicitors or any third party. &middot;
      <a href="${unsubscribeUrl}" style="color:#94a3b8;">Unsubscribe</a>
    </p>
  `);

  try {
    await client.emails.send({
      from: FROM,
      to: email,
      replyTo: REPLY_TO,
      subject: 'A small discount, in case it helps — code CLARITY15',
      html,
    });
    console.log(`[email] Promo email sent to ${email}`);
  } catch (err) {
    console.error('[email] Failed to send promo email:', err);
  }
}

export async function sendPensionInsightEmail(
  email: string,
  unsubscribeToken: string
): Promise<void> {
  const client = getResend();
  if (!client) {
    console.warn('[email] RESEND_API_KEY not set — skipping pension insight email');
    return;
  }

  const unlockUrl = 'https://divorcecalculatoruk.co.uk/unlock';
  const unsubscribeUrl = `https://divorcecalculatoruk.co.uk/api/leads/unsubscribe?token=${htmlEscape(unsubscribeToken)}`;

  const html = emailWrapper(`
    <h1 style="margin:0 0 16px;color:#0f1e3c;font-size:22px;font-weight:700;line-height:1.3;">The one asset that surprises most people</h1>

    <p style="margin:0 0 16px;color:#475569;font-size:15px;line-height:1.7;">
      Of everything involved in a UK divorce, pensions are the most underestimated — and the most easily overlooked in negotiations.
    </p>

    <p style="margin:0 0 20px;color:#475569;font-size:15px;line-height:1.7;">
      The figure that matters isn't the monthly income you'll eventually receive. It's the <strong>Cash Equivalent Transfer Value (CETV)</strong> — the lump-sum worth of the pension right now. In many divorces, it equals or exceeds the equity in the family home.
    </p>

    <div style="background:#f8fafc;border-left:4px solid #c49b2a;padding:16px 20px;margin-bottom:24px;border-radius:0 6px 6px 0;">
      <p style="margin:0;color:#0f1e3c;font-size:14px;line-height:1.7;">
        Someone who doesn't know their CETV, or doesn't understand how pension sharing works, can walk away from a settlement significantly worse off — without ever realising it.
      </p>
    </div>

    <p style="margin:0 0 16px;color:#475569;font-size:14px;line-height:1.7;">
      Your model already includes pension figures. The full analysis shows you how different approaches to splitting or offsetting pensions change the real-terms outcome of each scenario — in plain language.
    </p>

    <p style="margin:0 0 24px;color:#475569;font-size:14px;line-height:1.7;">
      If you'd like to see how it plays out in your specific figures, your analysis is still there whenever you're ready.
    </p>

    <table cellpadding="0" cellspacing="0" width="100%" style="margin:0 0 8px;">
      <tr>
        <td align="center" style="background:#c49b2a;border-radius:8px;">
          <a href="${unlockUrl}" style="display:block;padding:16px 32px;color:#ffffff;font-size:16px;font-weight:600;text-decoration:none;">See how pensions affect my settlement</a>
        </td>
      </tr>
    </table>
    <p style="margin:0 0 24px;text-align:center;color:#94a3b8;font-size:12px;">One-off £79 · Use code <strong>CLARITY15</strong> for 15% off · 12 months access</p>

    <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;" />
    <p style="margin:0;color:#94a3b8;font-size:11px;line-height:1.6;">
      Illustrative modelling only — not legal, financial or tax advice. Always consult a qualified professional.
      &nbsp;&middot;&nbsp;<a href="${unsubscribeUrl}" style="color:#94a3b8;">Unsubscribe</a>
    </p>
  `);

  try {
    await client.emails.send({
      from: FROM,
      to: email,
      replyTo: REPLY_TO,
      subject: 'The one asset most people underestimate in a divorce',
      html,
    });
    console.log(`[email] Pension insight email sent to ${email}`);
  } catch (err) {
    console.error('[email] Failed to send pension insight email:', err);
  }
}

export async function sendSustainabilityEmail(
  email: string,
  unsubscribeToken: string
): Promise<void> {
  const client = getResend();
  if (!client) {
    console.warn('[email] RESEND_API_KEY not set — skipping sustainability email');
    return;
  }

  const unlockUrl = 'https://divorcecalculatoruk.co.uk/unlock';
  const unsubscribeUrl = `https://divorcecalculatoruk.co.uk/api/leads/unsubscribe?token=${htmlEscape(unsubscribeToken)}`;

  const html = emailWrapper(`
    <h1 style="margin:0 0 16px;color:#0f1e3c;font-size:22px;font-weight:700;line-height:1.3;">The question that keeps people up at night</h1>

    <p style="margin:0 0 16px;color:#475569;font-size:15px;line-height:1.7;">
      <em>"Will I actually be okay?"</em>
    </p>

    <p style="margin:0 0 20px;color:#475569;font-size:15px;line-height:1.7;">
      It's probably the thing people worry about most when a marriage ends. Not just in the short term — but in three years, five years. Will the settlement you agree to leave you on solid ground?
    </p>

    <div style="background:#f8fafc;border-left:4px solid #c49b2a;padding:16px 20px;margin-bottom:24px;border-radius:0 6px 6px 0;">
      <p style="margin:0;color:#0f1e3c;font-size:14px;line-height:1.7;">
        A settlement that looks fair on paper can quietly drain your reserves if your monthly outgoings exceed your income. The full analysis models this directly — showing you the monthly surplus or deficit for each scenario, and whether your capital holds up over five years.
      </p>
    </div>

    <p style="margin:0 0 16px;color:#475569;font-size:14px;line-height:1.7;">
      The <strong>Financial Sustainability Index</strong> gives each settlement option a plain score — so you can see at a glance which options are liveable, which are marginal, and which quietly run your reserves down.
    </p>

    <p style="margin:0 0 24px;color:#475569;font-size:14px;line-height:1.7;">
      You've already put your figures in. If you'd like an answer to that question — even just for your own peace of mind — the full analysis is there when you're ready.
    </p>

    <table cellpadding="0" cellspacing="0" width="100%" style="margin:0 0 8px;">
      <tr>
        <td align="center" style="background:#c49b2a;border-radius:8px;">
          <a href="${unlockUrl}" style="display:block;padding:16px 32px;color:#ffffff;font-size:16px;font-weight:600;text-decoration:none;">See my full picture</a>
        </td>
      </tr>
    </table>
    <p style="margin:0 0 24px;text-align:center;color:#94a3b8;font-size:12px;">One-off £79 · Use code <strong>CLARITY15</strong> for 15% off · 12 months access</p>

    <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;" />
    <p style="margin:0;color:#94a3b8;font-size:11px;line-height:1.6;">
      Illustrative modelling only — not legal, financial or tax advice. Always consult a qualified professional.
      &nbsp;&middot;&nbsp;<a href="${unsubscribeUrl}" style="color:#94a3b8;">Unsubscribe</a>
    </p>
  `);

  try {
    await client.emails.send({
      from: FROM,
      to: email,
      replyTo: REPLY_TO,
      subject: 'Will you actually be okay? Here\'s how to find out',
      html,
    });
    console.log(`[email] Sustainability email sent to ${email}`);
  } catch (err) {
    console.error('[email] Failed to send sustainability email:', err);
  }
}

export async function sendFinalNudgeEmail(
  email: string,
  unsubscribeToken: string
): Promise<void> {
  const client = getResend();
  if (!client) {
    console.warn('[email] RESEND_API_KEY not set — skipping final nudge email');
    return;
  }

  const unlockUrl = 'https://divorcecalculatoruk.co.uk/unlock';
  const unsubscribeUrl = `https://divorcecalculatoruk.co.uk/api/leads/unsubscribe?token=${htmlEscape(unsubscribeToken)}`;

  const html = emailWrapper(`
    <h1 style="margin:0 0 16px;color:#0f1e3c;font-size:22px;font-weight:700;line-height:1.3;">We'll leave you to it</h1>

    <p style="margin:0 0 16px;color:#475569;font-size:15px;line-height:1.7;">
      We won't email you again after this.
    </p>

    <p style="margin:0 0 16px;color:#475569;font-size:15px;line-height:1.7;">
      We know that separation doesn't follow a timetable, and that sometimes you're simply not in the right headspace to look at numbers — even important ones. That's completely understandable.
    </p>

    <p style="margin:0 0 24px;color:#475569;font-size:15px;line-height:1.7;">
      Your model is still saved. Your figures, your scenarios — they haven't gone anywhere. And if it ever helps to come back to them, the full analysis will be here. Code <strong>CLARITY15</strong> still works at checkout if you need it.
    </p>

    <table cellpadding="0" cellspacing="0" width="100%" style="margin:0 0 8px;">
      <tr>
        <td align="center" style="background:#c49b2a;border-radius:8px;">
          <a href="${unlockUrl}" style="display:block;padding:16px 32px;color:#ffffff;font-size:16px;font-weight:600;text-decoration:none;">Return to my analysis — whenever you're ready</a>
        </td>
      </tr>
    </table>
    <p style="margin:0 0 24px;text-align:center;color:#94a3b8;font-size:12px;">No rush. We're here if you need us.</p>

    <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;" />
    <p style="margin:0;color:#94a3b8;font-size:11px;line-height:1.6;">
      Illustrative modelling only — not legal, financial or tax advice. Always consult a qualified professional.
      &nbsp;&middot;&nbsp;<a href="${unsubscribeUrl}" style="color:#94a3b8;">Unsubscribe</a>
    </p>
  `);

  try {
    await client.emails.send({
      from: FROM,
      to: email,
      replyTo: REPLY_TO,
      subject: 'We\'ll leave you to it — your analysis is here whenever you\'re ready',
      html,
    });
    console.log(`[email] Final nudge email sent to ${email}`);
  } catch (err) {
    console.error('[email] Failed to send final nudge email:', err);
  }
}

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
