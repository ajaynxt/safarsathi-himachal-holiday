import { useEffect, useState } from 'react';

interface IntroLoaderProps {
  onComplete: () => void;
}

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const leaveTimer = window.setTimeout(() => setLeaving(true), 2050);
    const finishTimer = window.setTimeout(onComplete, 2500);
    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`safar-intro fixed inset-0 z-[100] isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#211a1b] text-white transition-all duration-700 ease-[cubic-bezier(.22,.75,.25,1)] ${leaving ? 'pointer-events-none opacity-0 scale-[1.025]' : 'opacity-100'}`}
      role="status"
      aria-label="Welcome to Safar Sathi"
    >
      <style>{`
        @keyframes introBackdrop { from { transform: scale(1.12); opacity: .25; } to { transform: scale(1); opacity: .72; } }
        @keyframes introVeil { from { opacity: 0; } to { opacity: 1; } }
        @keyframes introLogo { 0% { opacity: 0; transform: translateY(18px) scale(.88); filter: blur(8px); } 70% { opacity: 1; } 100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); } }
        @keyframes introRule { from { transform: scaleX(0); opacity: .2; } to { transform: scaleX(1); opacity: 1; } }
        @keyframes introWord { 0%, 24% { opacity: 0; transform: translateY(16px); letter-spacing: .48em; } 100% { opacity: 1; transform: translateY(0); letter-spacing: .24em; } }
        @keyframes introTag { 0%, 55% { opacity: 0; transform: translateY(8px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes introFoot { 0%, 68% { opacity: 0; } 100% { opacity: .8; } }
        .intro-backdrop { animation: introBackdrop 2.8s ease-out both; }
        .intro-veil { animation: introVeil .7s ease-out both; }
        .intro-logo { animation: introLogo .9s cubic-bezier(.2,.8,.2,1) .12s both; }
        .intro-rule { animation: introRule .75s ease-out .72s both; transform-origin: center; }
        .intro-word { animation: introWord .8s ease-out .65s both; }
        .intro-tag { animation: introTag .65s ease-out 1.15s both; }
        .intro-foot { animation: introFoot .6s ease-out 1.45s both; }
        @media (prefers-reduced-motion: reduce) {
          .intro-backdrop, .intro-veil, .intro-logo, .intro-rule, .intro-word, .intro-tag, .intro-foot { animation: none !important; }
        }
      `}</style>

      <div className="absolute inset-0 -z-20 overflow-hidden">
        <img
          src={`${import.meta.env.BASE_URL}images/destinations/manali.jpg`}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          className="intro-backdrop h-full w-full object-cover object-center"
        />
      </div>
      <div className="intro-veil absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(29,20,22,.48)_0%,rgba(37,20,25,.62)_48%,rgba(20,17,19,.88)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(154,103,69,.16)_0%,transparent_58%)]" />

      <div className="relative flex w-full max-w-xl flex-col items-center px-6 text-center">
        <div className="intro-logo relative flex h-40 w-40 items-center justify-center rounded-full bg-[#fbf7ef] shadow-[0_18px_55px_rgba(0,0,0,.42)] ring-1 ring-[#d7b77e]/70 sm:h-48 sm:w-48">
          <span className="absolute inset-[-7px] rounded-full border border-[#e3c995]/80" />
          <span className="absolute inset-[-15px] rounded-full border border-white/20" />
          <img
            src={`${import.meta.env.BASE_URL}images/logo.png`}
            alt="Safar Sathi emblem"
            className="relative z-10 h-[88%] w-[88%] rounded-full object-contain p-2.5 sm:p-3"
            fetchPriority="high"
          />
        </div>

        <div className="intro-rule mt-9 h-px w-16 bg-gradient-to-r from-transparent via-[#d8b77d] to-transparent" />
        <h1 className="intro-word mt-5 whitespace-nowrap font-cinzel text-[1.55rem] font-semibold text-[#f5e8d2] drop-shadow sm:text-3xl">
          SAFAR SATHI
        </h1>
        <p className="intro-tag mt-3 text-[9px] font-semibold uppercase tracking-[.3em] text-[#e6c99b] sm:text-[10px]">
          Your Journey, Our Responsibility
        </p>
        <div className="intro-foot mt-12 flex items-center gap-3 text-[9px] uppercase tracking-[.24em] text-white/75">
          <span className="h-px w-7 bg-[#d7b77e]/70" />
          Discover • Explore • Experience
          <span className="h-px w-7 bg-[#d7b77e]/70" />
        </div>
      </div>
    </div>
  );
}
