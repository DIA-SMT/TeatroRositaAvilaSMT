import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Afiches de los shows, servidos por Aplausos (la ticketera de entradas.smt.gob.ar).
    remotePatterns: [new URL("https://saimagesprodtickets2.blob.core.windows.net/shows/**")],
  },
};

export default nextConfig;
