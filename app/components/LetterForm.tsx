"use client";

import { useState } from "react";

export function LetterForm({ title }: { title: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);

    // Context for the email subject
    formData.append("subject", `New Letter regarding: ${title}`);
    
    // REPLACE THIS WITH YOUR ACTUAL ACCESS KEY
    formData.append("access_key", "c8fed9b5-c20a-4b37-b0b4-babe933f6743");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="p-8 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-gray-700 text-center mt-16">
        <div className="text-3xl mb-3">✉️</div>
        <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-2">Letter Sent</h3>
        <p className="text-gray-600 dark:text-gray-400 font-sans">
          Thank you for writing. It has been delivered to my inbox.
        </p>
        <button 
          onClick={() => setStatus("idle")}
          className="mt-6 text-xs font-bold uppercase tracking-widest text-accent hover:text-gray-900 transition-colors"
        >
          Write another
        </button>
      </div>
    );
  }

  return (
    <section className="mt-20 pt-12 border-t border-gray-300 dark:border-gray-800">
      <h3 className="text-3xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-3">
        Send a Letter to the Author
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-8 font-sans leading-relaxed max-w-xl text-lg">
        Have a thought on this piece? I value thoughtful correspondence. 
        Your note remains private and is sent directly to my inbox.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
        {/* HONEYPOT */}
        <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">
            Return Address (Email)
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="your@email.com"
            required
            className="w-full px-4 py-3 rounded-md bg-white dark:bg-white/5 border border-gray-300 dark:border-gray-600 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
          />
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            rows={5}
            placeholder="Write your letter here..."
            required
            className="w-full px-4 py-3 rounded-md bg-white dark:bg-white/5 border border-gray-300 dark:border-gray-600 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors font-sans"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="
            px-8 py-4 rounded-md font-bold tracking-widest uppercase text-sm
            transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5
            disabled:opacity-50 disabled:cursor-not-allowed
            /* COLOR STYLING: Rust Background, White Text */
            bg-accent text-white hover:bg-gray-900 dark:hover:bg-gray-700
          "
        >
          {status === "submitting" ? "Sealing..." : "Send Letter"}
        </button>

        {status === "error" && (
          <p className="text-accent text-sm mt-4 font-bold">
            The carrier pigeon got lost (Error sending). Please try again.
          </p>
        )}
      </form>
    </section>
  );
}