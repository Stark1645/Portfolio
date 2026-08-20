import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Share2, Check, ExternalLink, Shield, Calendar } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

const RESUME_PATH = '/Ruthragurubaran_Resume.pdf';
const BASE_DOWNLOADS = 47;
const LAST_UPDATED = 'August 2026';
const ATS_SCORE = 92;

const ResumeModal = ({ isOpen, onClose }) => {
  const [copied, setCopied]           = useState(false);
  const [downloadCount, setDownloadCount] = useState(BASE_DOWNLOADS);

  // Load persisted count
  useEffect(() => {
    const stored = parseInt(localStorage.getItem('resumeDownloads') || '0');
    setDownloadCount(BASE_DOWNLOADS + stored);
  }, [isOpen]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else        document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const handleDownload = useCallback(() => {
    const stored = parseInt(localStorage.getItem('resumeDownloads') || '0') + 1;
    localStorage.setItem('resumeDownloads', stored.toString());
    setDownloadCount(BASE_DOWNLOADS + stored);
    // Trigger real download
    const a = document.createElement('a');
    a.href = RESUME_PATH;
    a.download = 'Ruthragurubaran_Resume.pdf';
    a.click();
  }, []);

  const handleShare = useCallback(async () => {
    const url = `${window.location.origin}/resume`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      prompt('Copy this link:', url);
    }
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-4 md:inset-8 z-[61] flex flex-col rounded-2xl overflow-hidden
              glass border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
            onClick={e => e.stopPropagation()}
          >
            {/* ── Header bar ── */}
            <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-white/8 bg-black/30 flex-shrink-0">
              
              {/* Left: title + meta */}
              <div className="flex items-center gap-4 min-w-0">
                <div className="min-w-0">
                  <h2 className="text-sm font-bold text-heading truncate">Ruthragurubaran — Resume</h2>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="flex items-center gap-1 text-[10px] text-secondary">
                      <Calendar size={10} className="text-blue-400" />
                      Updated {LAST_UPDATED}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-secondary">
                      <Download size={10} className="text-green-400" />
                      {downloadCount} downloads
                    </span>
                  </div>
                </div>

                {/* ATS Badge */}
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/25 rounded-full flex-shrink-0">
                  <Shield size={12} className="text-emerald-400" />
                  <span className="text-xs font-bold text-emerald-400">ATS {ATS_SCORE}%</span>
                </div>
              </div>

              {/* Right: action buttons */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Share */}
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10
                    hover:border-blue-500/40 hover:bg-blue-500/10 transition-all duration-200
                    text-secondary hover:text-blue-400 text-xs font-semibold"
                >
                  {copied ? <Check size={13} className="text-green-400" /> : <Share2 size={13} />}
                  {copied ? 'Copied!' : 'Share'}
                </button>

                {/* Open full page */}
                <Link
                  to="/resume"
                  onClick={onClose}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10
                    hover:border-purple-500/40 hover:bg-purple-500/10 transition-all duration-200
                    text-secondary hover:text-purple-400 text-xs font-semibold"
                >
                  <ExternalLink size={13} />
                  <span className="hidden sm:inline">Full View</span>
                </Link>

                {/* Download */}
                <button
                  onClick={handleDownload}
                  className="btn-xshack btn-xshack-green flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-black
                    px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer
                    shadow-[0_0_15px_rgba(16,185,129,0.35)]"
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    <Download size={13} />
                    Download
                  </span>
                  <div className="btn-fill bg-white" />
                </button>

                {/* Close */}
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-secondary hover:text-heading hover:bg-white/8
                    transition-all duration-200"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* ── PDF Viewer ── */}
            <div className="flex-1 bg-[#1a1a2e] relative">
              <iframe
                src={`${RESUME_PATH}#toolbar=0&navpanes=0&scrollbar=1`}
                title="Resume Preview"
                className="w-full h-full border-0"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ResumeModal;
