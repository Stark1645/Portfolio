import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { eventsData } from '../utils/data';
import { MapPin, Users, User, Camera, X, Sparkles, Calendar, Layers, ExternalLink } from 'lucide-react';
import Events3DCanvas from './Events3DCanvas';
import EventsCamera3D from './EventsCamera3D';
import EventCard3D from './EventCard3D';

const categories = [
  'All Moments',
  'Seminars & Talks',
  'Hackathons & Workshops',
  'Team & Labs',
];

const EventsGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Moments');
  const [activeModalEvent, setActiveModalEvent] = useState(null);

  // Close modal with Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveModalEvent(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredEvents =
    selectedCategory === 'All Moments'
      ? eventsData
      : eventsData.filter((e) => e.category === selectedCategory);

  return (
    <div className="relative w-full min-h-screen py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* ── 1. WebGL Three.js Interactive 3D Background Canvas ── */}
      <Events3DCanvas className="opacity-75" />

      {/* Ambient background glow layers */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-[-100px] w-[500px] h-[500px] bg-purple-600/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── 2. Header with 3D Holographic Camera & Staggered Typography ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 flex flex-col items-center"
        >
          {/* Top Pill with 3D Camera Widget */}
          <div className="flex items-center gap-3 mb-4">
            <EventsCamera3D className="w-14 h-14 sm:w-16 sm:h-16" />
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass bg-blue-500/10 text-cyan-400 text-xs sm:text-sm font-bold border border-cyan-400/30 shadow-[0_0_20px_rgba(56,189,248,0.25)]"
            >
              <Sparkles size={14} className="text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
              Moments & Memories
            </motion.span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
            Events & <span className="gradient-text">Hackathons</span>
          </h1>

          <p className="text-gray-300 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed">
            Life beyond code. Exploring my journey through technical presentations, intense hackathons,
            collaborative lab sessions, and memorable times with friends.
          </p>

          {/* Quick Highlight Metrics Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <div className="glass px-3.5 py-1.5 rounded-full border border-white/10 text-xs font-semibold text-gray-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>6+ Featured Milestones</span>
            </div>
            <div className="glass px-3.5 py-1.5 rounded-full border border-white/10 text-xs font-semibold text-gray-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span>Solo & Team Showcases</span>
            </div>
            <div className="glass px-3.5 py-1.5 rounded-full border border-white/10 text-xs font-semibold text-gray-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span>Coimbatore & Beyond</span>
            </div>
          </div>
        </motion.div>

        {/* ── 3. Interactive Category Filter Tabs with Framer Motion LayoutId ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex items-center justify-center gap-2 flex-wrap mb-12"
        >
          <div className="glass p-1.5 rounded-2xl border border-white/10 flex flex-wrap justify-center gap-1.5 backdrop-blur-xl shadow-lg">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                    isActive ? 'text-white shadow-md' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeEventCategory"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 shadow-[0_0_18px_rgba(56,189,248,0.4)]"
                      transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {cat === 'All Moments' && <Layers size={13} />}
                    {cat}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── 4. 3D Event Cards Grid with Framer Motion Orchestration ── */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event, index) => (
              <EventCard3D
                key={event.id || event.title}
                event={event}
                index={index}
                onSelect={(evt) => setActiveModalEvent(evt)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── 5. Bottom Snapshot Callout ── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="glass inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl border border-cyan-500/30 shadow-[0_0_25px_rgba(56,189,248,0.15)]"
          >
            <span className="text-xl">🚀</span>
            <p className="text-gray-200 text-sm sm:text-base font-medium">
              More exciting hackathons & snapshots coming soon!
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* ── 6. Full-Screen Interactive 3D Lightbox Modal ── */}
      <AnimatePresence>
        {activeModalEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalEvent(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-xl z-0 cursor-pointer"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              className="relative z-10 max-w-3xl w-full rounded-3xl overflow-hidden glass border border-white/20 shadow-2xl bg-[#0a0f1d]/90 flex flex-col my-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalEvent(null)}
                className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full glass border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors shadow-lg cursor-pointer"
                title="Close"
              >
                <X size={20} />
              </button>

              {/* Image Preview */}
              <div className="relative w-full h-[260px] sm:h-[360px] overflow-hidden bg-black">
                <img
                  src={activeModalEvent.image}
                  alt={activeModalEvent.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] via-[#0a0f1d]/30 to-transparent" />

                {/* Category & Date badge on image */}
                <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider glass border border-cyan-400/40 text-cyan-300">
                    {activeModalEvent.category}
                  </span>
                  {activeModalEvent.date && (
                    <span className="flex items-center gap-1.5 text-xs text-gray-200 glass px-3 py-1 rounded-full border border-white/20">
                      <Calendar size={13} className="text-cyan-400" />
                      {activeModalEvent.date}
                    </span>
                  )}
                </div>
              </div>

              {/* Modal Body Info */}
              <div className="p-6 sm:p-8 flex flex-col gap-4">
                <div className="flex items-center gap-2 text-cyan-400 text-xs sm:text-sm font-semibold">
                  <MapPin size={15} />
                  <span>{activeModalEvent.location}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {activeModalEvent.title}
                </h2>

                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  {activeModalEvent.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs sm:text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    {activeModalEvent.tag ? (
                      <>
                        <User size={15} className="text-cyan-400" />
                        <span className="text-gray-200 font-semibold">{activeModalEvent.tag}</span>
                      </>
                    ) : (
                      <>
                        <Users size={15} className="text-indigo-400" />
                        <span className="text-gray-300 font-semibold">Shared with friends & collaborators</span>
                      </>
                    )}
                  </div>

                  <button
                    onClick={() => setActiveModalEvent(null)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold text-xs hover:shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all cursor-pointer"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventsGallery;
