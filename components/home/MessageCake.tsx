"use client";
import Form from "next/form";
import Link from "next/link";
import { useState } from "react";

// Sample lines per occasion. The visitor's own words replace them as soon as they type.
const occasions: [string, string][] = [
  ["Birthday", "Happy Birthday Aanya"],
  ["Anniversary", "Happy Anniversary"],
  ["Wedding", "Just married"],
  ["Baby Shower", "Welcome, little one"],
  ["Corporate", "Well done, team"],
  ["Festive", "Happy Diwali"],
];
const MAX = 40;

/** Greedy word wrap for the cake top: about 13 characters a line, long words kept whole. */
function wrap(text: string) {
  const lines: string[] = [];
  for (const word of text.trim().split(/\s+/).filter(Boolean)) {
    const last = lines[lines.length - 1];
    if (last && (last + " " + word).length <= 13) lines[lines.length - 1] = last + " " + word;
    else lines.push(word);
  }
  return lines.length ? lines : [""];
}

/** The cake seen from above, drawn the way the logo is drawn: light monoline strokes and a cherry. */
function CakeTop({ message, occasion }: { message: string; occasion: string }) {
  const lines = wrap(message);
  const longest = Math.max(...lines.map((l) => l.length), 1);
  const size = Math.min(44, 240 / (longest * 0.56), 140 / (lines.length * 1.15));
  const lead = size * 1.12;
  const top = 228 - ((lines.length - 1) * lead) / 2;
  const piping = Array.from({ length: 30 }, (_, i) => (i / 30) * Math.PI * 2);
  return (
    <svg viewBox="0 0 400 400" className="h-auto w-full" role="img" aria-label={message.trim() ? `A cake top that reads “${message.trim()}”` : "A plain cake top"}>
      <circle cx="200" cy="200" r="194" fill="none" stroke="rgb(var(--rgb-cream) / 0.28)" strokeWidth="1.5" />
      <circle cx="200" cy="200" r="168" fill="rgb(var(--rgb-cream))" />
      {piping.map((a) => (
        // Rounded so server and browser print the same number (float formatting differs in the last digit).
        <circle key={a} cx={(200 + Math.cos(a) * 152).toFixed(2)} cy={(200 + Math.sin(a) * 152).toFixed(2)} r="7.5" fill="none" stroke="rgb(var(--rgb-blush))" strokeWidth="2" />
      ))}
      {/* The cherry from the logo, sitting at twelve o'clock */}
      <path d="M200 98 C 203 84, 210 76, 222 70" fill="none" stroke="rgb(var(--rgb-cocoa))" strokeWidth="2" strokeLinecap="round" />
      <path d="M214 74 C 222 68, 232 70, 236 76 C 228 80, 220 79, 214 74 Z" fill="none" stroke="rgb(var(--rgb-cocoa))" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="200" cy="108" r="13" fill="rgb(var(--rgb-blush))" />
      <path d="M194 103 a 6 6 0 0 1 6 -3" fill="none" stroke="rgb(var(--rgb-cream) / 0.8)" strokeWidth="2" strokeLinecap="round" />
      <g key={occasion} className="cake-message" style={{ fontFamily: "var(--font-display)" }} fill="rgb(var(--rgb-cocoa))" textAnchor="middle" fontSize={size}>
        {lines.map((l, i) => <text key={i} x="200" y={top + i * lead}>{l}</text>)}
      </g>
      <path d="M150 304 C 175 314, 225 314, 250 304" fill="none" stroke="rgb(var(--rgb-blush))" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** The custom cake, started here: pick the occasion, write the message, carry both into the custom cake form. */
export default function MessageCake() {
  const [occasion, setOccasion] = useState(occasions[0][0]);
  const [message, setMessage] = useState(occasions[0][1]);
  const [edited, setEdited] = useState(false);

  const pick = (o: string, sample: string) => {
    setOccasion(o);
    if (!edited) setMessage(sample);
  };

  return (
    <section aria-labelledby="custom-head" className="on-dark section-l bg-cocoa text-cream">
      {/* Phone order: heading, the cake, then the form, so the drawing stays in view while you type. */}
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-0">
        <div className="lg:col-span-6 lg:row-start-1">
          <h2 id="custom-head" className="h-section text-cream">Tell us about your cake</h2>
          <p className="lead mt-6 !text-cream/85">
            Send us a photo, a theme or a few words. We agree the design, flavour and price with you on WhatsApp, then bake and decorate the cake by hand and deliver it on your date.
          </p>
        </div>

        <div className="mx-auto w-full max-w-[340px] sm:max-w-[420px] lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:max-w-[520px] lg:self-center">
          <CakeTop message={message} occasion={occasion} />
        </div>

        <div className="lg:col-span-6 lg:row-start-2">
          <Form action="/custom-cake" className="max-w-xl lg:mt-10">
            <fieldset>
              <legend className="text-sm font-semibold text-cream">What’s the occasion?</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {occasions.map(([o, sample]) => (
                  <label key={o} className={`relative inline-flex min-h-[44px] cursor-pointer items-center rounded-full px-4 text-sm font-semibold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-blush-200 ${occasion === o ? "bg-cream text-cocoa" : "bg-cocoa-700 text-cream hover:bg-cocoa-600"}`}>
                    <input type="radio" name="occasion" value={o} checked={occasion === o} onChange={() => pick(o, sample)} className="sr-only" />
                    {o}
                  </label>
                ))}
              </div>
            </fieldset>

            <label htmlFor="cake-msg" className="mt-8 block text-sm font-semibold text-cream">What should the cake say?</label>
            <input
              id="cake-msg" name="message" value={message} maxLength={MAX} autoComplete="off" aria-describedby="cake-msg-count"
              onChange={(e) => { setMessage(e.target.value); setEdited(true); }}
              className="mt-2 w-full rounded-field border-2 border-transparent bg-cream px-4 py-3 text-lg text-cocoa placeholder:text-cocoa-500 focus-visible:border-blush-200 focus-visible:outline-none"
            />
            <p id="cake-msg-count" className="mt-2 text-sm text-cream/75"><span className="tabular-nums">{message.length}</span> of {MAX} characters</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button type="submit" className="btn-light">Start a custom cake</button>
              <Link href="/menu" className="btn-outline-light">Order from the menu</Link>
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
}
