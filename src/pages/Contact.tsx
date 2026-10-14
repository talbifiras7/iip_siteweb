import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PageWrapper, Eyebrow, Reveal } from "../components/Motion";

const FIELD =
  "w-full rounded-xl border border-[#155A56]/20 bg-[#F2EFEA] px-4 py-3 text-sm text-[#155A56] outline-none transition-colors focus:border-[#155A56]";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire this to your backend, Formspree, or EmailJS.
    console.log("Contact form submitted:", form);
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <PageWrapper>
      <section className="bg-[#F2EFEA] px-6 py-16 md:px-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          {/* Info */}
          <div>
            <Eyebrow>Contact</Eyebrow>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 text-5xl font-bold uppercase leading-[0.95] text-[#155A56] md:text-6xl"
            >
              Let's Talk
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-6 max-w-sm text-base leading-relaxed text-[#155A56]/80"
            >
              Want to join the chapter, partner with us, or propose a workshop?
              Send a message — we read every one.
            </motion.p>

            <Reveal delay={0.2} className="mt-10 space-y-3 text-sm text-[#155A56]/80">
              <p><span className="font-bold text-[#155A56]">Email —</span> ieee.iasfst@gmail.com</p>
              <p><span className="font-bold text-[#155A56]">Campus —</span> Faculty of Sciences of Tunis</p>
              <p><span className="font-bold text-[#155A56]">Location —</span> Tunis, Tunisia</p>
            </Reveal>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-5 rounded-2xl border border-[#155A56]/15 bg-[#FBF9F5] p-8"
            >
              <div>
                <label htmlFor="name" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#155A56]">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={FIELD}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#155A56]">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={FIELD}
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#155A56]">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={FIELD}
                  placeholder="What would you like to tell us?"
                />
              </div>

              <motion.button
                type="submit"
                whileTap={{ scale: 0.97 }}
                className="w-full rounded-full bg-[#E8A33D] px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-[#0D3E3B] shadow-[0_4px_0_0_#c17f22] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_#c17f22]"
              >
                Send message
              </motion.button>

              <AnimatePresence>
                {sent && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-center text-sm font-semibold text-[#155A56]"
                  >
                    Thanks — we'll get back to you soon.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
