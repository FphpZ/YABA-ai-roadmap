import { NextResponse } from 'next/server';
import { generateAiResponse, getAvailableProviders, type ProviderId } from '@/lib/ai/providers';
import { sanitizeHTML, LIMITS } from '@/lib/security';

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

    // Pas de filtrage de la reponse : elle est affichee comme texte React
    // (<pre>{aiText}</pre>), donc echappee par React. Filtrer la sortie
    // rejetait toute reponse contenant du code (onClick=, eval(), etc.),
    // c'est-a-dire le cas d'usage central de la plateforme.
    return NextResponse.json(result);
  } catch (error: unknown) {
    // Le detail contient les erreurs de chaque provider : utile dans les logs
    // serveur, mais on ne le renvoie pas au client.
    const detail = error instanceof Error ? error.message : 'Erreur inconnue';
    console.error('[api/ai-chat] echec de generation :', detail);

    return NextResponse.json(
      { error: 'Aucun provider IA disponible pour le moment. Reessaie plus tard.' },
      { status: 503 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ providers: getAvailableProviders() });
}