"use client";
import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      form.reset();
      setStatus("ok");
      setMsg("Mensagem enviada. Respondo em até 24 horas.");
    } catch (err) {
      setStatus("error");
      setMsg(err instanceof Error && err.message ? err.message : "Não foi possível enviar agora. Tente de novo.");
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <input name="nome" placeholder="Seu nome" aria-label="Seu nome" required maxLength={80} />
      <input name="email" type="email" placeholder="Seu e-mail" aria-label="Seu e-mail" required maxLength={120} />
      <textarea name="mensagem" rows={4} placeholder="Descreva o que você precisa" aria-label="Mensagem" required minLength={10} maxLength={2000} />
      <input name="site" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button className="btn primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Enviando..." : "Enviar mensagem"}
      </button>
      <p role="status" className={status === "ok" ? "ok" : "err"}>{status === "ok" || status === "error" ? msg : ""}</p>
    </form>
  );
}
