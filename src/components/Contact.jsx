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
          className="lg:w-1/3 space-y-8"
        >
          <div className="glass p-8 rounded-2xl flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 text-primary">
              <Mail size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-heading mb-2">Email</h3>
              <p className="text-secondary">ruthra1645@gmail.com</p>
              <a href="mailto:ruthra1645@gmail.com" className="text-primary hover:text-blue-500 text-sm font-semibold mt-2 inline-block">
                Send a message 
              </a>
            </div>
          </div>

          <div className="glass p-8 rounded-2xl flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 text-purple-400">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-heading mb-2">Location</h3>
              <p className="text-secondary">Coimbatore, India</p>
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
