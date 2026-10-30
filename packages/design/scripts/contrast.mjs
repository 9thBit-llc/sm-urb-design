// WCAG 2.x contrast for oklch() colors. Shared by the theme generator and the audit.
//
// Converts oklch to linear sRGB, takes relative luminance from it, and computes the
// ratio as (lighter + 0.05) / (darker + 0.05), per WCAG 2.2 section 1.4.3.

// Linear sRGB channels for an oklch color, before clamping. Values outside 0..1 are out of gamut.
export function linearRgb(l, c, hDegrees) {
  const h = (hDegrees * Math.PI) / 180;
  const a = c * Math.cos(h);
  const b = c * Math.sin(h);
  const lms1 = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const lms2 = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const lms3 = (l - 0.0894841775 * a - 1.2914855480 * b) ** 3;
  return [
    4.0767416621 * lms1 - 3.3077115913 * lms2 + 0.2309699292 * lms3,
    -1.2684380046 * lms1 + 2.6097574011 * lms2 - 0.3413193965 * lms3,
    -0.0041960863 * lms1 - 0.7034186147 * lms2 + 1.7076147010 * lms3,
  ];
}

// Largest chroma at or below c that stays inside sRGB for this lightness and hue.
// Lowering chroma keeps lightness and hue, which is how the color has to be shown anyway.
export function fitChroma(l, c, hDegrees) {
  const inGamut = (x) => linearRgb(l, x, hDegrees).every((v) => v >= -1e-6 && v <= 1 + 1e-6);
  if (inGamut(c)) return c;
  let lo = 0;
  let hi = c;
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2;
    if (inGamut(mid)) lo = mid;
    else hi = mid;
  }
  return lo;
}

export function relativeLuminance(l, c, hDegrees) {
  const h = (hDegrees * Math.PI) / 180;
  const a = c * Math.cos(h);
  const b = c * Math.sin(h);
  const lms1 = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const lms2 = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const lms3 = (l - 0.0894841775 * a - 1.2914855480 * b) ** 3;
  const clamp = (x) => Math.min(1, Math.max(0, x));
  const r = clamp(4.0767416621 * lms1 - 3.3077115913 * lms2 + 0.2309699292 * lms3);
  const g = clamp(-1.2684380046 * lms1 + 2.6097574011 * lms2 - 0.3413193965 * lms3);
  const bl = clamp(-0.0041960863 * lms1 - 0.7034186147 * lms2 + 1.7076147010 * lms3);
  return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
}

export function contrastRatio(a, b) {
  const [lighter, darker] = [a, b].sort((x, y) => y - x);
  return (lighter + 0.05) / (darker + 0.05);
}

// Verdict labels follow WCAG: 4.5:1 for normal text (AA), 7:1 for AAA, 3:1 for large text only.
export function verdict(ratio) {
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  if (ratio >= 3) return "AA large only";
  return "FAIL";
}
