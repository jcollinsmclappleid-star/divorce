/** Public site URL — used for Stripe checkout redirects and webhook setup hints. */
export function getAppBaseUrl(req?: { protocol: string; get(name: string): string | undefined }): string {
  const fromEnv = process.env.APP_URL?.trim().replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (req) return `${req.protocol}://${req.get("host")}`;
  return "http://localhost:5000";
}
