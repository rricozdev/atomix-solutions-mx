import { z } from "zod";

/**
 * Esquemas de validación compartidos por el sitio.
 * Se usan del lado del cliente para validar formularios y datos persistidos.
 */

const optionalEmail = z.preprocess(
  (value) =>
    typeof value === "string" && value.trim() === "" ? undefined : value,
  z
    .string()
    .trim()
    .pipe(z.email("Ingresa un correo electrónico válido."))
    .optional(),
);

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Ingresa tu nombre (mínimo 2 caracteres).")
    .max(80, "El nombre no puede superar los 80 caracteres."),
  company: z
    .string()
    .trim()
    .max(120, "El nombre de la empresa no puede superar los 120 caracteres.")
    .optional(),
  phone: z
    .string()
    .trim()
    .min(1, "Ingresa tu teléfono.")
    .max(25, "El teléfono no puede superar los 25 caracteres.")
    .refine(
      (value) =>
        /^[+\d\s().-]+$/.test(value) &&
        value.replace(/\D/g, "").length >= 8,
      "Ingresa un teléfono válido (mínimo 8 dígitos).",
    ),
  email: optionalEmail,
  details: z
    .string()
    .trim()
    .min(10, "Cuéntanos un poco más (mínimo 10 caracteres).")
    .max(1000, "El detalle no puede superar los 1000 caracteres."),
});

export const MAX_QUOTE_QUANTITY = Number.MAX_SAFE_INTEGER;

export const quoteQuantitySchema = z
  .number()
  .int("La cantidad debe ser un número entero.")
  .min(1, "La cantidad mínima es 1.")
  .max(MAX_QUOTE_QUANTITY, "La cantidad es demasiado grande.");

export const quoteCartItemSchema = z.object({
  id: z.number().int().positive(),
  quantity: quoteQuantitySchema,
});
