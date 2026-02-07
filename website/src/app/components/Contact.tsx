"use client";

import { useState } from "react";
import sessionQrCode from "../../../images/session-qr-code.png";
import sessionIconGreen from "../../../images/session-green.svg";
import telegramQrCode from "../../../images/telegram-qr-code.png";

const sessionId =
  "056543ff77d9a62506f5f9ec6eee7a2bd13f119d1f8a37fbd9f59d87b9ccf38c6e";
const telegramHandle = "geovansb";
const telegramLink = `https://t.me/${telegramHandle}`;

const socialLinks = [
  {
    name: "Mail",
    href: "mailto:98.stakes_saves@icloud.com",
    colorClass: "text-[color:var(--color-text-primary)]",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/geovansb/",
    colorClass: "text-[#0A66C2]",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const [isSessionOpen, setIsSessionOpen] = useState(false);
  const [isSessionHelpOpen, setIsSessionHelpOpen] = useState(false);
  const [isTelegramOpen, setIsTelegramOpen] = useState(false);

  return (
    <section id="contact" className="py-24 px-6 bg-[color:var(--color-bg-secondary)]">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Header */}
        <span className="text-sm text-[color:var(--color-matte-blue)] font-medium uppercase tracking-wider">
          Contato
        </span>
        <h2 className="text-3xl md:text-4xl font-medium text-[color:var(--color-text-primary)] mt-2 mb-6">
          Vamos conversar
        </h2>
        <p className="text-[color:var(--color-text-secondary)] mb-12 max-w-xl mx-auto">
          Estou sempre aberto a novas oportunidades, colaborações ou apenas 
          uma boa conversa sobre tecnologia. Sinta-se à vontade para entrar em contato!
        </p>

        {/* Social Links */}
        <div className="mt-8 flex items-center justify-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              title={link.href}
              className={`p-3 bg-[color:var(--color-bg-primary)] rounded-full transition-colors hover:bg-[color:var(--color-bg-tertiary)] ${link.colorClass}`}
              aria-label={link.name}
            >
              {link.icon}
            </a>
          ))}
          <button
            type="button"
            title="Mostrar QR do Session"
            aria-label="Session"
            aria-expanded={isSessionOpen}
            aria-controls="session-qr"
            onClick={() =>
              setIsSessionOpen((current) => {
                const next = !current;
                if (!next) {
                  setIsSessionHelpOpen(false);
                }
                if (next) {
                  setIsTelegramOpen(false);
                }
                return next;
              })
            }
            className="p-3 bg-[color:var(--color-bg-primary)] rounded-full transition-colors hover:bg-[color:var(--color-bg-tertiary)] text-[#00F782]"
          >
            <img src={sessionIconGreen.src} alt="Session" className="w-6 h-6" />
          </button>
          <button
            type="button"
            title="Mostrar QR do Telegram"
            aria-label="Telegram"
            aria-expanded={isTelegramOpen}
            aria-controls="telegram-qr"
            onClick={() =>
              setIsTelegramOpen((current) => {
                const next = !current;
                if (next) {
                  setIsSessionOpen(false);
                  setIsSessionHelpOpen(false);
                }
                return next;
              })
            }
            className="p-3 bg-[color:var(--color-bg-primary)] rounded-full transition-colors hover:bg-[color:var(--color-bg-tertiary)] text-[#229ED9]"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3.4 10.6l16.5-7.1c.6-.3 1.2.3.9.9l-7.1 16.5c-.3.7-1.3.7-1.6 0l-2.2-5.1-5.1-2.2c-.7-.3-.7-1.3 0-1.6z" />
            </svg>
          </button>
        </div>

        {isSessionOpen ? (
          <div id="session-qr" className="mt-10 flex flex-col items-center gap-4">
            <span className="text-sm text-[color:var(--color-text-muted)]">
              Session
            </span>
            <img
              src={sessionQrCode.src}
              alt="QR code do Session"
              className="w-40 h-40 rounded-2xl bg-white p-3 shadow-sm"
            />
            <code className="text-xs text-[color:var(--color-text-muted)] break-all select-all">
              {sessionId}
            </code>
            <div className="flex flex-col items-center gap-2 w-full">
              <button
                type="button"
                onClick={() => setIsSessionHelpOpen((current) => !current)}
                aria-expanded={isSessionHelpOpen}
                className="inline-flex items-center gap-2 text-sm text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text-secondary)] transition-colors"
              >
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isSessionHelpOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                Preciso de ajuda
              </button>
              {isSessionHelpOpen ? (
                <div className="text-sm text-[color:var(--color-text-secondary)] max-w-xl w-full text-left space-y-4">
                  <p>
                    Se você ainda não tem o aplicativo, visite{" "}
                    <a
                      href="https://getsession.org/download"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[color:var(--color-matte-blue)] hover:text-[color:var(--color-matte-blue-dark)] underline"
                    >
                      getsession.org/download
                    </a>{" "}
                    para baixar o Session.
                  </p>
                  <p>Abra o aplicativo e siga os passos abaixo:</p>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="font-medium">No celular</p>
                      <ol className="list-decimal ml-5 space-y-1">
                        <li>
                          Toque no <span className="font-medium">+</span> na tela principal.
                        </li>
                        <li>
                          Selecione <span className="font-medium">Nova mensagem</span>.
                        </li>
                        <li>Escaneie o QR ou cole o ID.</li>
                        <li>
                          Toque em <span className="font-medium">Próximo</span> e envie.
                        </li>
                      </ol>
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium">No desktop</p>
                      <ol className="list-decimal ml-5 space-y-1">
                        <li>
                          Clique no <span className="font-medium">+</span> ao lado de{" "}
                          <span className="font-medium">Mensagens</span>.
                        </li>
                        <li>
                          Selecione <span className="font-medium">Nova mensagem</span>.
                        </li>
                        <li>Cole o ID.</li>
                        <li>
                          Clique em <span className="font-medium">Próximo</span> e envie.
                        </li>
                      </ol>
                    </div>
                  </div>
                  <p>
                    ℹ️ A mensagem vira uma solicitação; depois que eu aceitar, a conversa
                    fica liberada.
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        {isTelegramOpen ? (
          <div id="telegram-qr" className="mt-10 flex flex-col items-center gap-4">
            <span className="text-sm text-[color:var(--color-text-muted)]">
              Telegram
            </span>
            <p className="text-sm text-[color:var(--color-text-secondary)]">
              <a
                href={telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[color:var(--color-matte-blue)] hover:text-[color:var(--color-matte-blue-dark)] underline"
              >
                Clique aqui para me adicionar no Telegram
              </a>{" "}
              ou escaneie o QR-code abaixo.
            </p>
            <img
              src={telegramQrCode.src}
              alt="QR code do Telegram"
              className="w-40 h-40 rounded-2xl bg-white p-3 shadow-sm"
            />
            <code className="text-xs text-[color:var(--color-text-muted)]">
              @{telegramHandle}
            </code>
          </div>
        ) : null}

      </div>
    </section>
  );
}
