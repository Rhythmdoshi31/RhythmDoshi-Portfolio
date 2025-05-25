import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { FlipWords } from "./ui/flip-words";

interface ContactFormProps {
  cooldown: number;
  startCooldown: () => void;
}

export default function ContactForm({ cooldown, startCooldown }: ContactFormProps) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (cooldown > 0) return;

    setIsLoading(true);
    setStatus("");

    if (!formData.name || !formData.email || !formData.message) {
      setStatus("Please fill all fields");
      setIsLoading(false);
      return;
    }

    try {
      // Get CSRF token from headers
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
        {
          ...formData,
          'csrf-token': csrfToken
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string
      );
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
      startCooldown();
    } catch (error) {
      setStatus("Failed to send message. Please try again.");
      console.error("EmailJS error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[90%] md:w-[50%] mx-auto p-8 rounded-2xl bg-black/[0.96] border border-white/[0.2] shadow-2xl">
      <FlipWords words={["Get in Touch", "Contact Me"]} className="text-5xl font-bold text-white mb-8 text-center" />
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-white text-sm font-medium">Name</label>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isLoading || cooldown > 0}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all disabled:opacity-50"
            placeholder="Tyler Durden"
          />
        </div>

        <div className="space-y-2">
          <label className="text-white text-sm font-medium">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isLoading || cooldown > 0}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all disabled:opacity-50"
            placeholder="projectmayhem@fc.com"
          />
        </div>

        <div className="space-y-2">
          <label className="text-white text-sm font-medium">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            disabled={isLoading || cooldown > 0}
            rows={4}
            className="w-full h-[25vh] md:h-[20vh] px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none disabled:opacity-50"
            placeholder="The first rule of ..."
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || cooldown > 0}
          className="w-full py-3 px-6 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Sending..." : cooldown > 0 ? `Wait ${cooldown}s` : "Send Message"}
        </button>
      </form>
      {status && (
        <p className={`mt-4 text-center ${status.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
          {status}
        </p>
      )}
    </div>
  );
}
