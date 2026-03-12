import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full border-t border-white/5 bg-background py-8 text-center mt-24">
      <div className="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex flex-col md:flex-row items-center gap-4 text-gray-400 font-medium justify-center md:justify-start">
          <img 
            src="/profile.jpg" 
            alt="Ruthragurubaran" 
            className="w-12 h-12 rounded-full border border-gray-700 object-cover"
            onError={(e) => {
              e.target.src = "https://ui-avatars.com/api/?name=Ruthragurubaran&size=100&background=0D8ABC&color=fff";
            }}
          />
          <p>
            © {new Date().getFullYear()} Ruthragurubaran. All rights reserved.
          </p>
        </div>

        <div className="flex gap-4">
          <a
            href="https://github.com/Stark1645"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-surface border border-white/5 flex items-center justify-center text-secondary hover:text-heading hover:border-primary hover:shadow-[0_0_15px_rgba(88,166,255,0.4)] transition-all"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/ruthragurubaran-j-28507b330/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-surface border border-white/5 flex items-center justify-center text-secondary hover:text-heading hover:border-primary hover:shadow-[0_0_15px_rgba(88,166,255,0.4)] transition-all"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="mailto:ruthra1645@gmail.com"
            className="w-10 h-10 rounded-full bg-surface border border-white/5 flex items-center justify-center text-secondary hover:text-heading hover:border-primary hover:shadow-[0_0_15px_rgba(88,166,255,0.4)] transition-all"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>
        
        <p className="text-sm text-gray-500">
          Built with React & Vite
        </p>
      </div>
    </footer>
  );
};

export default Footer;
