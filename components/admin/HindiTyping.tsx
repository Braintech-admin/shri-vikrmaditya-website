"use client";

import { useMemo, useState } from "react";
import Sanscript from "@indic-transliteration/sanscript";

type HindiTypingProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  rows?: number;
  multiline?: boolean;
  label?: string;
};

export default function HindiTyping({
  value,
  onChange,
  placeholder = "",
  className = "",
  rows = 5,
  multiline = false,
  label,
}: HindiTypingProps) {
  const [mode, setMode] = useState<"hindi" | "english">("hindi");
  const [romanText, setRomanText] = useState("");

  const typingLabel = useMemo(() => {
    return mode === "hindi"
      ? "हिंदी टाइपिंग सहायता ON"
      : "English Typing Mode";
  }, [mode]);

  function handleRomanChange(nextValue: string) {
    setRomanText(nextValue);

    try {
      const converted = Sanscript.t(
        nextValue,
        "itrans",
        "devanagari"
      );

      onChange(converted);
    } catch {
      onChange(nextValue);
    }
  }

  function switchMode(nextMode: "hindi" | "english") {
    setMode(nextMode);

    if (nextMode === "english") {
      setRomanText("");
    }
  }

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <label className="text-sm font-bold text-[#071d49]">
            {label}
          </label>

          <div className="flex w-fit overflow-hidden rounded-lg border border-slate-200 bg-white">
            <button
              type="button"
              onClick={() => switchMode("hindi")}
              className={`px-3 py-1.5 text-xs font-bold transition ${
                mode === "hindi"
                  ? "bg-[#071d49] text-white"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              हिंदी
            </button>

            <button
              type="button"
              onClick={() => switchMode("english")}
              className={`px-3 py-1.5 text-xs font-bold transition ${
                mode === "english"
                  ? "bg-[#071d49] text-white"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              English
            </button>
          </div>
        </div>
      )}

      {mode === "hindi" && (
        <div className="rounded-xl border border-[#f4c400]/40 bg-[#fff9df] px-3 py-2">
          <p className="text-xs leading-5 text-[#071d49]">
            💡 English में टाइप करें — जैसे{" "}
            <span className="font-bold">vidyalaya</span>,
            {" "}
            <span className="font-bold">pravesh suchna</span>
            {" "}
            और Hindi में convert करें।
          </p>
        </div>
      )}

      {mode === "hindi" ? (
        <>
          <input
            type="text"
            value={romanText}
            onChange={(e) => handleRomanChange(e.target.value)}
            placeholder="English में Hindi शब्द टाइप करें..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#123b7a] focus:ring-2 focus:ring-[#123b7a]/10"
          />

          {multiline ? (
            <textarea
              value={value}
              readOnly
              rows={rows}
              placeholder={placeholder}
              className={`w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-7 text-slate-700 outline-none ${className}`}
            />
          ) : (
            <input
              type="text"
              value={value}
              readOnly
              placeholder={placeholder}
              className={`w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none ${className}`}
            />
          )}
        </>
      ) : multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          placeholder={placeholder}
          className={`w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-7 outline-none transition focus:border-[#123b7a] focus:ring-2 focus:ring-[#123b7a]/10 ${className}`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#123b7a] focus:ring-2 focus:ring-[#123b7a]/10 ${className}`}
        />
      )}

      <div className="flex items-center justify-between">
        <p className="text-[11px] text-slate-400">
          {typingLabel}
        </p>

        {mode === "hindi" && value && (
          <button
            type="button"
            onClick={() => {
              setRomanText("");
              onChange("");
            }}
            className="text-xs font-semibold text-slate-400 transition hover:text-[#7b1720]"
          >
            साफ करें
          </button>
        )}
      </div>
    </div>
  );
}