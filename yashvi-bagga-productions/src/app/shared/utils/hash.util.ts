/**
 * Small non-cryptographic string hash (djb2 variant).
 *
 * Used ONLY by the dev/mock OTP engine so that even simulated codes are never
 * held in plain text in memory — mirroring the "never store OTP in plain text"
 * rule. Production verification happens server-side with a real keyed hash
 * (HMAC / bcrypt); this helper is never used in that path.
 */
export function simpleHash(value: string): string {
  let hash = 5381;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 33) ^ value.charCodeAt(i);
  }
  // Unsigned, base36 for compactness.
  return (hash >>> 0).toString(36);
}
