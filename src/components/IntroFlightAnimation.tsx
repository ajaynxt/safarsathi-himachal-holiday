import React, { useState, useEffect } from 'react';
import { Plane, Sparkles, ArrowRight } from 'lucide-react';

interface IntroFlightAnimationProps {
  onComplete?: () => void;
}

export const IntroFlightAnimation: React.FC<IntroFlightAnimationProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'animating' | 'fading' | 'done'>('animating');

  useEffect(() => {
    // Stage 1: Animation runs for 2.4 seconds
    const timer1 = setTimeout(() => {
      setStage('fading');
    }, 2400);

    // Stage 2: Fade out for 600ms then remove
    const timer2 = setTimeout(() => {
      setStage('done');
      if (onComplete) onComplete();
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setStage('fading');
    setTimeout(() => {
      setStage('done');
      if (onComplete) onComplete();
    }, 300);
  };

  if (stage === 'done') return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-b from-slate-950 via-[#081E3B] to-slate-950 text-white overflow-hidden transition-opacity duration-700 select-none ${
        stage === 'fading' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Star / Mountain Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-orange/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-black via-slate-950/80 to-transparent" />
      </div>

      {/* SVG Flight Trail & Swooping Airplane */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <svg className="w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="none">
          {/* Flight Path Curve */}
          <path
            d="M -50,550 Q 250,500 450,320 T 950,80"
            fill="none"
            stroke="url(#flightGrad)"
            strokeWidth="3.5"
            strokeDasharray="8 8"
            className="animate-pulse"
          />
          <defs>
            <linearGradient id="flightGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF7D00" stopOpacity="0.1" />
              <stop offset="40%" stopColor="#FF7D00" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
            </linearGradient>
          </defs>
        </svg>

        {/* Flying Airplane Element with Keyframe Motion */}
        <div className="absolute flight-jet-takeoff flex items-center justify-center">
          <div className="relative transform -rotate-12">
            {/* Plane Glow & Contrail Jet */}
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-16 h-2 bg-gradient-to-l from-amber-400 via-orange-500 to-transparent rounded-full blur-[2px] opacity-90 animate-pulse" />
            <Plane className="w-9 h-9 sm:w-12 sm:h-12 text-white fill-white drop-shadow-[0_0_15px_rgba(255,125,0,0.9)] transform rotate-45" />
          </div>
        </div>
      </div>

      {/* Center Logo & Branding Reveal */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-lg mx-auto">
        {/* Mountain Icon / Glow */}
        <div className="relative mb-5 animate-scale-up">
          <div className="absolute -inset-4 bg-gradient-to-r from-brand-orange to-amber-400 rounded-3xl blur-2xl opacity-40 animate-pulse" />
          
          <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl p-4 sm:p-5 shadow-2xl border border-white/20">
            <img
              src={`${import.meta.env.BASE_URL}images/logo.svg`}
              alt="SafarSathi Logo"
              className="h-16 sm:h-20 w-auto object-contain filter drop-shadow"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (target.src.endsWith('.svg')) {
                  target.src = `${import.meta.env.BASE_URL}images/logo.png`;
                }
              }}
            />
          </div>
        </div>

        {/* Main Brand Title & Tagline with Staggered Fade */}
        <div className="space-y-2 animate-fade-in-up">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs font-bold text-amber-300 uppercase tracking-widest">
            <Sparkles className="w-3 h-3 text-brand-orange" />
            <span>All-India Travel Platform</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Safar<span className="text-brand-orange">Sathi</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 font-medium tracking-wide">
            "Your Journey, Our Responsibility"
          </p>
        </div>

        {/* Loading / Progress indicator */}
        <div className="mt-8 w-44 sm:w-56 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-brand-orange via-amber-400 to-white rounded-full flight-progress-bar" />
        </div>

        <p className="mt-2.5 text-[11px] text-slate-400 font-mono tracking-wider">
          Connecting to 24x7 Online Desk...
        </p>
      </div>

      {/* Skip Button (Top Right) */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 z-30 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-xs font-bold text-slate-300 hover:text-white transition-all flex items-center gap-1.5 border border-white/10"
      >
        <span>Skip</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>

      {/* Embedded CSS for Flight Keyframes */}
      <style>{`
        @keyframes flightTakeoff {
          0% {
            left: -10%;
            top: 85%;
            transform: scale(0.6) rotate(15deg);
            opacity: 0;
          }
          15% {
            opacity: 1;
            transform: scale(0.8) rotate(22deg);
          }
          50% {
            left: 45%;
            top: 45%;
            transform: scale(1.05) rotate(32deg);
          }
          85% {
            opacity: 1;
            transform: scale(1.2) rotate(38deg);
          }
          100% {
            left: 110%;
            top: -5%;
            transform: scale(1.4) rotate(42deg);
            opacity: 0;
          }
        }

        .flight-jet-takeoff {
          position: absolute;
          animation: flightTakeoff 2.3s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        @keyframes progressFill {
          0% { width: 0%; }
          100% { width: 100%; }
        }

        .flight-progress-bar {
          animation: progressFill 2.2s ease-out forwards;
        }

        @keyframes scaleUp {
          0% { transform: scale(0.85); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .animate-scale-up {
          animation: scaleUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes fadeInUp {
          0% { transform: translateY(12px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s 0.2s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>
    </div>
  );
};
