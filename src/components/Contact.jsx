import { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Send, Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(''); // 'sending', 'success', 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey || serviceId === 'your_service_id') {
      console.error('EmailJS credentials are not configured in .env file');
      setStatus('error');
      setTimeout(() => setStatus(''), 5000);
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          reply_to: formData.email,
          message: formData.message,
        },
        publicKey
      );
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(''), 5000);
    } catch (err) {
      console.error('EmailJS Error:', err);
      setStatus('error');
      setTimeout(() => setStatus(''), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 relative w-full max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-heading mb-4">
          Get in <span className="gradient-text">Touch</span>
        </h2>
        <p className="text-secondary max-w-2xl mx-auto">
          Currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:w-1/3 flex flex-col gap-6"
        >
          <div className="glass p-6 rounded-2xl flex items-center gap-4 hover:border-blue-500/30 transition-colors">
            <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0 text-blue-400">
              <Mail size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-heading">Email</h3>
              <a href="mailto:ruthra1645@gmail.com" className="text-secondary hover:text-blue-400 text-sm transition-colors">
                ruthra1645@gmail.com
              </a>
            </div>
          </div>

          <a href="https://linkedin.com/in/ruthragurubaran-j-28507b330" target="_blank" rel="noopener noreferrer" className="glass p-6 rounded-2xl flex items-center gap-4 hover:border-blue-500/30 transition-colors cursor-pointer group">
            <div className="w-12 h-12 bg-[#0077b5]/10 rounded-full flex items-center justify-center flex-shrink-0 text-[#0077b5] group-hover:scale-110 transition-transform">
              {/* Using a generic Users icon or custom SVG for LinkedIn if 'Linkedin' is not imported, let's just use generic icon for now or rely on lucide */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-heading">LinkedIn</h3>
              <span className="text-secondary group-hover:text-[#0077b5] text-sm transition-colors">
                Let's connect!
              </span>
            </div>
          </a>

          <a href="https://github.com/Stark1645" target="_blank" rel="noopener noreferrer" className="glass p-6 rounded-2xl flex items-center gap-4 hover:border-blue-500/30 transition-colors cursor-pointer group">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0 text-white group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-heading">GitHub</h3>
              <span className="text-secondary group-hover:text-white text-sm transition-colors">
                Check my repos
              </span>
            </div>
          </a>

          <div className="glass p-6 rounded-2xl flex items-center gap-4 hover:border-purple-500/30 transition-colors">
            <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center flex-shrink-0 text-purple-400">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-heading">Location</h3>
              <span className="text-secondary text-sm">
                Coimbatore, India
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:w-2/3 glass p-10 rounded-2xl"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-secondary">Your Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-surface border border-white/10 text-heading rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-secondary">Your Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-surface border border-white/10 text-heading rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-secondary">Your Message</label>
              <textarea
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="bg-surface border border-white/10 text-heading rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none"
                placeholder="I have a project for you..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/30 flex justify-center items-center gap-2 transition-transform transform hover:-translate-y-1"
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'} <Send size={20} />
            </button>

            {status === 'success' && (
              <p className="text-green-400 text-center font-semibold mt-2">Message sent successfully!</p>
            )}
            {status === 'error' && (
              <p className="text-red-400 text-center font-semibold mt-2">Error sending message. Please try again or email directly.</p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
