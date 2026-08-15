export const LIMITS = {
  prompt: 10000,
  email: 254,
  password: 128,
  city: 60,
  detail: 300,
};

// Detecte toute balise HTML
const HAS_HTML_TAG = /<\/?[a-zA-Z!][^>]*>/;

// Liste blanche pour la ville : lettres (accents ok), chiffres, espaces, ' - .
const CITY_REGEX = /^[\p{L}\p{N}\s'’.-]+$/u;

// Motifs suspects (injection, XSS)
const SUSPICIOUS =
  /(<\/?[a-zA-Z!][^>]*>|javascript:|on\w+\s*=|alert\s*\(|confirm\s*\(|prompt\s*\(|document\.|window\.|eval\s*\()/i;

// Supprime les balises HTML (utilisé côté serveur)
export function sanitizeHTML(text: string): string {
  if (!text) return '';

  return text
    .replace(/<script\b[^]*?<\/script>/gi, ' ')
    .replace(/<style\b[^]*?<\/style>/gi, ' ')
    .replace(/<!--[^]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[<>]/g, ' ')
    .replace(/javascript:/gi, ' ')
    .replace(/\son\w+\s*=/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePrompt(prompt: string): {
  valid: boolean;
  sanitized?: string;
  error?: string;
} {
  const trimmed = prompt.trim();

  if (!trimmed) return { valid: false, error: 'Le prompt est requis.' };

  if (trimmed.length > LIMITS.prompt) {
    return {
      valid: false,
      error: `Prompt trop long (max ${LIMITS.prompt} caracteres).`,
    };
  }

  if (HAS_HTML_TAG.test(trimmed)) {
    return {
      valid: false,
      error: 'Le prompt contient des balises HTML : retire-les avant de continuer.',
    };
  }

  if (trimmed.length < 10) {
    return { valid: false, error: 'Prompt trop court (min 10 caracteres).' };
  }

  return { valid: true, sanitized: trimmed };
}

export function validateCity(city: string): {
  valid: boolean;
  sanitized?: string;
  error?: string;
} {
  const trimmed = city.trim();

  if (!trimmed) return { valid: false, error: 'La ville est requise.' };

  if (trimmed.length > LIMITS.city) {
    return {
      valid: false,
      error: `Ville trop longue (max ${LIMITS.city} caracteres).`,
    };
  }

  if (!CITY_REGEX.test(trimmed)) {
    return {
      valid: false,
      error: 'Ville invalide : lettres, chiffres, espaces et tirets uniquement.',
    };
  }

  return { valid: true, sanitized: trimmed };
}

export function validateDetail(detail: string): {
  valid: boolean;
  sanitized?: string;
  error?: string;
} {
  const trimmed = detail.trim();

  // Champ optionnel
  if (!trimmed) return { valid: true, sanitized: '' };

  if (trimmed.length > LIMITS.detail) {
    return {
      valid: false,
      error: `Activite trop longue (max ${LIMITS.detail} caracteres).`,
    };
  }

  if (SUSPICIOUS.test(trimmed)) {
    return {
      valid: false,
      error: 'Activite invalide : contenu non autorise detecte (balises HTML, script...).',
    };
  }

  return { valid: true, sanitized: sanitizeHTML(trimmed) };
}

export function containsDangerousCode(text: string): boolean {
  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /eval\s*\(/i,
    /document\.(cookie|write|location)/i,
    /window\.location/i,
  ];

  return dangerousPatterns.some((pattern) => pattern.test(text));
}