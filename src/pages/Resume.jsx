import { motion } from 'framer-motion';
import { Download, Share2, Check, Shield, Calendar, ArrowLeft, ExternalLink } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const RESUME_PATH = '/Ruthragurubaran_Resume.pdf';
const BASE_DOWNLOADS = 47;
const LAST_UPDATED = 'July 2026';
const ATS_SCORE = 92;

const Resume = () => {
  const [copied, setCopied]           = useState(false);
  const [downloadCount, setDownloadCount] = useState(BASE_DOWNLOADS);

  useEffect(() => {
    const stored = parseInt(localStorage.getItem('resumeDownloads') || '0');
    setDownloadCount(BASE_DOWNLOADS + stored);
    document.title = 'Resume — Ruthragurubaran';
    return () => { document.title = 'Ruthragurubaran | Full Stack Developer'; };
  }, []);

  const handleDownload = useCallback(() => {
    const stored = parseInt(localStorage.getItem('resumeDownloads') || '0') + 1;
    localStorage.setItem('resumeDownloads', stored.toString());
    setDownloadCount(BASE_DOWNLOADS + stored);
    const a = document.createElement('a');
    a.href = RESUME_PATH;
    a.download = 'Ruthragurubaran_Resume.pdf';
    a.click();
  }, []);

  const handleShare = useCallback(async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      prompt('Copy this link:', url);
    }
  }, []);

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 80px)' }}>

      {/* ── Top bar ── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between gap-4 px-6 py-4 glass border-b border-white/8 flex-shrink-0"
      >
        {/* Left: back + title */}
        <div className="flex items-center gap-4 min-w-0">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-secondary hover:text-heading text-sm font-medium
              transition-colors hover:bg-white/5 px-3 py-1.5 rounded-lg flex-shrink-0"
          >
            <ArrowLeft size={15} />
            Back
          </Link>

          <div className="w-px h-5 bg-white/10 flex-shrink-0" />

          <div className="min-w-0">
            <h1 className="text-sm font-bold text-heading truncate">Ruthragurubaran — Resume</h1>
            <div className="flex flex-wrap items-center gap-3 mt-0.5">
              <span className="flex items-center gap-1 text-[11px] text-secondary">
                <Calendar size={10} className="text-blue-400" />
                Updated {LAST_UPDATED}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-secondary">
                <Download size={10} className="text-green-400" />
                {downloadCount} downloads
              </span>
            </div>
          </div>

          {/* ATS Score badge */}
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/25 rounded-full">
            <Shield size={14} className="text-emerald-400" />
            <span className="text-xs font-bold text-emerald-400">ATS Score: {ATS_SCORE}%</span>
            <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${ATS_SCORE}%` }}
                transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-400"
              />
            </div>
          </div>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Open in new tab */}
          <a
            href={RESUME_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/10
              hover:border-purple-500/40 hover:bg-purple-500/10 transition-all duration-200
              text-secondary hover:text-purple-400 text-xs font-semibold"
          >
            <ExternalLink size={14} />
            <span className="hidden sm:inline">Open in Tab</span>
          </a>

          {/* Share */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/10
              hover:border-blue-500/40 hover:bg-blue-500/10 transition-all duration-200
              text-secondary hover:text-blue-400 text-xs font-semibold"
          >
            {copied ? <Check size={14} className="text-green-400" /> : <Share2 size={14} />}
            {copied ? 'Copied!' : 'Share'}
          </button>

          {/* Download */}
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white
              px-5 py-2 rounded-lg text-sm font-bold transition-all duration-300
              shadow-[0_4px_20px_rgba(88,166,255,0.4)] hover:shadow-[0_6px_28px_rgba(88,166,255,0.55)]
              hover:-translate-y-0.5"
          >
            <Download size={15} />
            Download PDF
          </button>
        </div>
      </motion.div>

      {/* ── PDF Viewer fills remaining height ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-1 relative bg-[#1a1a2e]"
      >
        <iframe
          src={`${RESUME_PATH}#toolbar=0&navpanes=0&scrollbar=1`}
          title="Resume — Ruthragurubaran"
          className="w-full h-full border-0"
        />
      </motion.div>
    </div>
  );
};

export default Resume;
