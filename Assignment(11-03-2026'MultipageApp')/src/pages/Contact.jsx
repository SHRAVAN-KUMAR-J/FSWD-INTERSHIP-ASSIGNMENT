import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setForm({ name: '', email: '', message: '' });
    }
  };

  return (
    <div className="py-20 px-6 max-w-2xl mx-auto">
      <h1 className="text-5xl font-bold text-center mb-12">Get In Touch</h1>

      {submitted && (
        <div className="mb-8 text-center bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 py-4 rounded-2xl text-xl">
          ✅ Message sent successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="w-full p-6 rounded-2xl border dark:border-gray-700 focus:outline-none focus:border-blue-600 text-lg"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="w-full p-6 rounded-2xl border dark:border-gray-700 focus:outline-none focus:border-blue-600 text-lg"
          required
        />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Your Message"
          rows="6"
          className="w-full p-6 rounded-2xl border dark:border-gray-700 focus:outline-none focus:border-blue-600 text-lg"
          required
        />
        <button
          type="submit"
          className="w-full py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-bold rounded-2xl hover:scale-105 transition-all active:scale-95"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}