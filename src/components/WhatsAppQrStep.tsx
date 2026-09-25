"use client";

import { useState } from "react";
import { CTAButton } from "@/components/CTAButton";
import { openMikeWhatsApp } from "@/lib/build-access";
import {
  MIKE_WHATSAPP,
  mikeWhatsAppChatUrl,
  mikeWhatsAppQrImageUrl,
} from "@/lib/whatsapp";

type WhatsAppQrStepProps = {
  onStartOver: () => void;
  onClose?: () => void;
};

export function WhatsAppQrStep({ onStartOver, onClose }: WhatsAppQrStepProps) {
  const [copied, setCopied] = useState(false);
  const chatUrl = mikeWhatsAppChatUrl();
  const qrSrc = mikeWhatsAppQrImageUrl(280);

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(MIKE_WHATSAPP.e164);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center text-center">
      <h3 className="display text-[clamp(1.85rem,4vw,2.4rem)] leading-[1.1]">
        Start texting Mike
      </h3>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--muted)] md:text-base">
        Scan with your phone&apos;s camera, or open WhatsApp. The chat opens with{" "}
        <span className="text-[var(--foreground)]">{MIKE_WHATSAPP.greeting}</span> ready to
        send.
      </p>

      <div className="mt-8 rounded-[1.35rem] border border-[var(--border)] bg-[#F5F5F2] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={qrSrc}
          alt="QR code to message Mike on WhatsApp"
          width={280}
          height={280}
          className="h-[min(64vw,220px)] w-[min(64vw,220px)] rounded-xl"
        />
      </div>

      <button
        type="button"
        onClick={copyNumber}
        className="mt-6 inline-flex min-h-11 items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--background)] px-5 text-sm text-[var(--foreground)] transition-colors hover:border-[rgba(245,245,242,0.35)]"
        aria-label={`Copy ${MIKE_WHATSAPP.display}`}
      >
        <span className="font-medium tracking-wide">{MIKE_WHATSAPP.display}</span>
        <span className="text-[var(--muted-dim)]" aria-hidden="true">
          {copied ? "Copied" : "Copy"}
        </span>
      </button>

      <div className="mt-6 flex w-full flex-col gap-3">
        <CTAButton
          type="button"
          className="w-full"
          onClick={() => openMikeWhatsApp(chatUrl)}
        >
          Open WhatsApp →
        </CTAButton>
        <div className="flex w-full flex-col gap-3 sm:flex-row">
          {onClose ? (
            <CTAButton
              type="button"
              variant="secondary"
              className="w-full sm:flex-1"
              onClick={onClose}
            >
              Done
            </CTAButton>
          ) : null}
          <CTAButton
            type="button"
            variant="ghost"
            className="w-full sm:flex-1"
            onClick={onStartOver}
          >
            Start over
          </CTAButton>
        </div>
      </div>
    </div>
  );
}
