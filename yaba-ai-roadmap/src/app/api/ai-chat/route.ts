import { NextResponse } from 'next/server';
import { generateAiResponse, getAvailableProviders, type ProviderId } from '@/lib/ai/providers';
import { sanitizeHTML, LIMITS, containsDangerousCode } from '@/lib/security';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.prompt !== 'string' || !body.prompt.trim()) {
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

  const providerId = (body.provider as ProviderId) || undefined;

  try {
    const result = await generateAiResponse(sanitized, providerId);

    // Vérifier que la réponse IA ne contient pas de code dangereux
    if (containsDangerousCode(result.text)) {
      return NextResponse.json(
        { error: 'La réponse IA contient du code potentiellement dangereux.' },
        { status: 400 }
      );
    }

    return NextResponse.json(result);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ providers: getAvailableProviders() });
}