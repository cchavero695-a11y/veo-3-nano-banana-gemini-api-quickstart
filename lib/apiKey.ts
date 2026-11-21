// Reads the paid key first (GEMINI_PAID_API_KEY), then falls back to GEMINI_API_KEY.
export const GEMINI_API_KEY =
  process.env.GEMINI_PAID_API_KEY || process.env.GEMINI_API_KEY || "";

const IMAGE_MODELS = [
  "gemini-2.5-flash-image",
  "gemini-3.1-flash-image",
  "gemini-3-pro-image",
];
export const DEFAULT_IMAGE_MODEL = "gemini-2.5-flash-image";

export function pickImageModel(model: unknown): string {
  return typeof model === "string" && IMAGE_MODELS.includes(model)
    ? model
    : DEFAULT_IMAGE_MODEL;
}
