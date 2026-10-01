/**
 * Links into the Monark app, where gated project resources live behind sign-in.
 * NEXT_PUBLIC_MONARK_APP_URL overrides the production URL (e.g. for staging).
 */
const MONARK_APP_URL = (process.env.NEXT_PUBLIC_MONARK_APP_URL || "https://app.monark.io").replace(/\/$/, "");

/** A project's resource list in the app; the app asks for sign-in first. */
export function getAppSignInUrl(projectId: string): string {
  return `${MONARK_APP_URL}/project/${encodeURIComponent(projectId)}/resources`;
}

export function getAppResourceUrl(projectId: string, resourceId: string): string {
  return `${getAppSignInUrl(projectId)}/${encodeURIComponent(resourceId)}`;
}
