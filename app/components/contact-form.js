"use client";

import { ArrowUpRight } from "lucide-react";
import { whatsappUrl } from "../../data/site";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";

export default function ContactForm() {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = [
      "Hola, me gustaría recibir información sobre sus productos.",
      "",
      `Nombre: ${formData.get("name")}`,
      `Empresa: ${formData.get("company") || "No especificada"}`,
      `Teléfono: ${formData.get("phone")}`,
      `Correo: ${formData.get("email") || "No especificado"}`,
      `Necesito: ${formData.get("details")}`,
    ].join("\n");

    window.location.assign(whatsappUrl(message));
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
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
          <Input autoComplete="name" name="name" required />
        </label>
        <label>
          <span className="field-label">Empresa</span>
          <Input autoComplete="organization" name="company" />
        </label>
      </div>
      <div className="form-row">
        <label>
          <span className="field-label">
            Teléfono <span className="required-mark" aria-hidden="true">*</span>
          </span>
          <Input autoComplete="tel" name="phone" required type="tel" />
        </label>
        <label>
          <span className="field-label">Correo electrónico</span>
          <Input autoComplete="email" name="email" type="email" />
        </label>
      </div>
      <label>
        <span className="field-label">
          ¿Qué producto estás buscando?{" "}
          <span className="required-mark" aria-hidden="true">*</span>
        </span>
        <Textarea name="details" required rows={3} />
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
