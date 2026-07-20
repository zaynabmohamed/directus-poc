import { createDirectus, rest } from "@directus/sdk";

const DIRECTUS_URL =
  process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055";

export const directus = createDirectus(DIRECTUS_URL).with(rest());