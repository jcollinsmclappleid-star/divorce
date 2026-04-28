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
    <h1 style="margin:0 0 8px;color:#0f1e3c;font-size:22px;font-weight:700;">Your access is ready</h1>
    <p style="margin:0 0 24px;color:#64748b;font-size:15px;">Thank you for your purchase. Your full financial analysis is now unlocked.</p>

    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:20px;margin-bottom:24px;">
      <p style="margin:0 0 4px;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Access expires</p>
      <p style="margin:0;color:#0f1e3c;font-size:16px;font-weight:600;">${expiryText}</p>
    </div>

    <p style="margin:0 0 16px;color:#475569;font-size:14px;line-height:1.6;">
      Click the button below to open your analysis. Save this email so you can return at any time — this link will work for 12 months on the same device, or you can use it to restore access on a new device.
    </p>

    <table cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
      <tr>
        <td style="background:#c49b2a;border-radius:6px;">
          <a href="${accessUrl}" style="display:inline-block;padding:14px 28px;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;border-radius:6px;">Open My Analysis</a>
        </td>
      </tr>
    </table>

    <p style="margin:0 0 8px;color:#94a3b8;font-size:12px;">Or copy this link into your browser:</p>
    <p style="margin:0;color:#0f1e3c;font-size:12px;word-break:break-all;background:#f1f5f9;padding:10px 12px;border-radius:4px;font-family:monospace;">${accessUrl}</p>

    <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;" />

    <p style="margin:0;color:#64748b;font-size:13px;line-height:1.6;">
      Lost access later? Visit <a href="https://divorcecalculatoruk.co.uk/recover" style="color:#0f1e3c;">divorcecalculatoruk.co.uk/recover</a> and enter this email address to have a new access link sent to you.
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
