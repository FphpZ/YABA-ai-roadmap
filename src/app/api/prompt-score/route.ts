import { NextResponse } from 'next/server';
import { scorePrompt } from '@/lib/ai/promptScoring';
import { sanitizeHTML, LIMITS } from '@/lib/security';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.prompt !== 'string') {
    return NextResponse.json(
      { error: 'Le champ prompt est requis.' },
      { status: 400 }
    );
  }

  // Validation côté serveur
  if (body.prompt.length > LIMITS.prompt) {
    return NextResponse.json(
      { error: `Prompt trop long (max ${LIMITS.prompt} caractères)` },
      { status: 400 }
    );
  }

  const sanitized = sanitizeHTML(body.prompt);

  if (sanitized.length < 10) {
    return NextResponse.json(
      { error: 'Prompt trop court (min 10 caractères)' },
      { status: 400 }
    );
  }

  const result = scorePrompt(sanitized);
  return NextResponse.json(result);
}