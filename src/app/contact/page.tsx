'use client';

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send. Please try again.");
      }
    } catch {
      setStatus("An error occurred. Try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-[#02120F] text-white flex items-center justify-center p-6 bg-black">
      <form onSubmit={handleSubmit} className="w-full max-w-xl bg-green-900 p-8 rounded-lg shadow-md space-y-6">
        <h1 className="text-4xl font-bold text-center mb-4">Contact Max</h1>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="w-full p-3 rounded text-black"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="w-full p-3 rounded text-black"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows={6}
          className="w-full p-3 rounded text-black"
          value={formData.message}
          onChange={handleChange}
          required
        />

        <button type="submit" className="bg-white text-[#02120F] py-2 px-6 rounded hover:bg-gray-200 transition">
          Send Message
        </button>

        {status && <p className="text-center mt-4">{status}</p>}
      </form>
    </div>
  );
}
