"use client";
import { useEffect, useRef } from "react";
import ContactForm from "./contact-form";
import { Icon } from "./icons";

// Qualquer link para "#contato" (menu, botão "Contratar", "Fale comigo") abre o formulário nesta janela.
export default function ContactDialog() {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const open = () => { if (!ref.current?.open) ref.current?.showModal(); };
    const onClick = (e: MouseEvent) => {
      if (!(e.target instanceof Element) || !e.target.closest('a[href$="#contato"]')) return;
      e.preventDefault();
      open();
    };
    document.addEventListener("click", onClick);
    if (location.hash === "#contato") open();
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <dialog ref={ref} className="modal" aria-labelledby="contato-titulo" onClick={(e) => { if (e.target === e.currentTarget) e.currentTarget.close(); }}>
      <div className="modal-box">
        <button className="modal-x" type="button" aria-label="Fechar" onClick={() => ref.current?.close()}><Icon name="x" /></button>
        <h2 id="contato-titulo">Vamos conversar</h2>
        <p className="lead">Conte o que você precisa. Respondo em até 24 horas.</p>
        <ContactForm />
      </div>
    </dialog>
  );
}
