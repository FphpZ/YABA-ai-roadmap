import type { NextConfig } from 'next';

// Fichier unique de configuration. Il y avait auparavant next.config.mjs ET
// next.config.ts : Next resout CONFIG_FILES dans l'ordre
// ['next.config.js', 'next.config.mjs', 'next.config.ts'] et retient le
// premier trouve, donc le .mjs gagnait et ce fichier n'etait jamais lu.
// Le .mjs portait devIndicators.appIsrStatus et devIndicators.buildActivity,
// deux cles supprimees dans Next 16 : elles sont retirees ici. Le type
// NextConfig signale desormais ce genre de cle inexistante a la compilation.
const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],

  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
