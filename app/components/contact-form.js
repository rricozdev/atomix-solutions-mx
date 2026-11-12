"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { whatsappUrl } from "../../data/site";
import { contactFormSchema } from "../../lib/validation";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";

const FIELD_ORDER = ["name", "company", "phone", "email", "details"];

function FieldError({ id, message }) {
  if (!message) return null;

  return (
    <p className="field-error" id={id}>
      {message}
    </p>
  );
}

export default function ContactForm() {
  const [errors, setErrors] = useState({});

  function clearFieldError(event) {
    const { name } = event.target;
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const result = contactFormSchema.safeParse({
      name: formData.get("name"),
      company: formData.get("company"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      details: formData.get("details"),
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      const firstInvalidField = FIELD_ORDER.find((field) => fieldErrors[field]);
      if (firstInvalidField) {
        form.elements.namedItem(firstInvalidField)?.focus();
      }
      return;
    }

    setErrors({});
    const { name, company, phone, email, details } = result.data;
    const message = [
      "Hola, me gustaría recibir información sobre sus productos.",
      "",
      `Nombre: ${name}`,
      `Empresa: ${company || "No especificada"}`,
      `Teléfono: ${phone}`,
      `Correo: ${email || "No especificado"}`,
      `Necesito: ${details}`,
    ].join("\n");

    window.location.assign(whatsappUrl(message));
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-intro">
        <p className="form-heading">Cuéntanos qué necesitas</p>
        <p className="form-required-note">
          <span aria-hidden="true">*</span> Campos obligatorios
        </p>
      </div>
      <div className="form-row">
        <label>
          <span className="field-label">
            Nombre <span className="required-mark" aria-hidden="true">*</span>
          </span>
          <Input
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            aria-invalid={errors.name ? "true" : undefined}
            autoComplete="name"
            name="name"
            onChange={clearFieldError}
            required
          />
          <FieldError id="contact-name-error" message={errors.name?.[0]} />
        </label>
        <label>
          <span className="field-label">Empresa</span>
          <Input
            aria-describedby={errors.company ? "contact-company-error" : undefined}
            aria-invalid={errors.company ? "true" : undefined}
            autoComplete="organization"
            name="company"
            onChange={clearFieldError}
          />
          <FieldError id="contact-company-error" message={errors.company?.[0]} />
        </label>
      </div>
      <div className="form-row">
        <label>
          <span className="field-label">
            Teléfono <span className="required-mark" aria-hidden="true">*</span>
          </span>
          <Input
            aria-describedby={errors.phone ? "contact-phone-error" : undefined}
            aria-invalid={errors.phone ? "true" : undefined}
            autoComplete="tel"
            name="phone"
            onChange={clearFieldError}
            required
            type="tel"
          />
          <FieldError id="contact-phone-error" message={errors.phone?.[0]} />
        </label>
        <label>
          <span className="field-label">Correo electrónico</span>
          <Input
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            aria-invalid={errors.email ? "true" : undefined}
            autoComplete="email"
            name="email"
            onChange={clearFieldError}
            type="email"
          />
          <FieldError id="contact-email-error" message={errors.email?.[0]} />
        </label>
      </div>
      <label>
        <span className="field-label">
          ¿Qué producto estás buscando?{" "}
          <span className="required-mark" aria-hidden="true">*</span>
        </span>
        <Textarea
          aria-describedby={
            errors.details ? "contact-details-error" : undefined
          }
          aria-invalid={errors.details ? "true" : undefined}
          name="details"
          onChange={clearFieldError}
          required
          rows={3}
        />
        <FieldError id="contact-details-error" message={errors.details?.[0]} />
      </label>
      <Button className="button button-dark form-submit" size="lg" type="submit">
        Continuar por WhatsApp <ArrowUpRight aria-hidden="true" size={17} />
      </Button>
      <p className="form-note">
        Tus datos se usarán únicamente para responder a esta solicitud. El
        mensaje se enviará por WhatsApp.
      </p>
    </form>
  );
}
