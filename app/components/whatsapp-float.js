import { whatsappUrl } from "../../data/site";

export default function WhatsAppFloat() {
  return (
    <a
      className="whatsapp-float"
      href={whatsappUrl()}
      target="_blank"
      rel="noreferrer"
      aria-label="Escríbenos por WhatsApp"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 3.25a12.3 12.3 0 0 0-10.56 18.6L4 28l6.3-1.4A12.3 12.3 0 1 0 16 3.25Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M12.15 10.1c-.3-.65-.63-.66-.92-.67h-.78c-.27 0-.7.1-1.06.5-.36.4-1.39 1.36-1.39 3.31 0 1.95 1.42 3.84 1.62 4.1.2.27 2.74 4.39 6.77 5.98 3.35 1.32 4.03 1.06 4.75.99.73-.07 2.34-.96 2.67-1.88.33-.93.33-1.72.23-1.88-.1-.17-.36-.27-.76-.47-.4-.2-2.34-1.16-2.7-1.29-.37-.13-.64-.2-.9.2-.27.4-1.03 1.29-1.26 1.56-.23.26-.47.3-.87.1-.4-.2-1.69-.62-3.22-1.98-1.19-1.06-1.99-2.37-2.22-2.77-.23-.4-.02-.62.18-.82.18-.18.4-.47.6-.7.2-.24.26-.4.4-.67.13-.27.06-.5-.04-.7-.1-.2-.88-2.16-1.2-2.95Z"
          fill="currentColor"
        />
      </svg>
    </a>
  );
}
