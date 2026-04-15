"use client";

export default function LoaderOverlay({ show }) {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm"
      style={{ backgroundColor: "rgba(17,24,39,0.85)" }}
    >
      <div className="atomix-loader">
        <div className="sq" />
        <div className="sq" />
        <div className="sq" />
        <div className="sq" />
      </div>
    </div>
  );
}
