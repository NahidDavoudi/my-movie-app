import designSystemDefault, { designSystem } from "../styles/designSystem";

/**
 * Get a token value from the design system using a dot-separated path.
 * Example: getToken("colors.primary")
 */
export function getToken(path, fallback) {
  if (!path || typeof path !== "string") return fallback;
  const segments = path.split(".");
  let current = designSystem;
  for (const segment of segments) {
    if (current && Object.prototype.hasOwnProperty.call(current, segment)) {
      current = current[segment];
    } else {
      return fallback;
    }
  }
  return current;
}

/**
 * Create a CSS variable reference from a token name (without the leading --)
 * Example: cssVar("color-primary") => "var(--color-primary)"
 */
export function cssVar(tokenName) {
  if (!tokenName) return "";
  return `var(--${tokenName})`;
}

export default designSystemDefault;


