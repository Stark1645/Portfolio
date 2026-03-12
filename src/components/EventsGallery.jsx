import { motion } from 'framer-motion';
import { eventsData } from '../utils/data';
import { MapPin, Users, Camera } from 'lucide-react';

const EventsGallery = () => {
  return (
    <section id="events" className="py-24 px-6 relative w-full max-w-7xl mx-auto">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-600/5 blur-[120px] pointer-events-none rounded-full" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-bold mb-6 border border-blue-500/20">
          <Camera size={16} /> Moments & Memories
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Events & <span className="gradient-text">Hackathons</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Life beyond code. Exploring my journey through competitions, collaborations, and great times with my friends.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {eventsData.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative h-[400px] rounded-3xl overflow-hidden glass border border-white/10 hover:border-blue-500/40 transition-all duration-500"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/40 to-transparent z-10" />
            </div>

            {/* Content Overly */}
            <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <div className="flex items-center gap-2 text-blue-400 text-sm font-bold mb-3">
                <MapPin size={16} /> {event.location}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                {event.title}
              </h3>
              <p className="text-gray-300 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2">
                {event.description}
              </p>
              
              <div className="flex items-center gap-2 text-gray-400 text-xs font-semibold">
                <Users size={14} /> Shared with friends
              </div>
            </div>
            
            {/* Decorative corner icon */}
            <div className="absolute top-6 right-6 z-20 w-12 h-12 rounded-2xl glass border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 rotate-12 group-hover:rotate-0">
              <Camera className="text-white" size={20} />
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <div className="glass inline-block px-8 py-4 rounded-2xl border border-blue-500/20">
          <p className="text-gray-300">
            More snapshots coming soon! 🚀
          </p>
        </div>
      </div>
    </section>
  );
};

export default EventsGallery;
