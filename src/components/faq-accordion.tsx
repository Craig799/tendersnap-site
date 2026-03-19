"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FAQ = {
  question: string;
  answer: string;
};

export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={faq.question}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <button
              className="flex w-full items-center justify-between text-left text-white"
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span className="text-lg font-semibold">{faq.question}</span>
              <ChevronDown
                className={`h-5 w-5 transition ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isOpen && (
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                {faq.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
