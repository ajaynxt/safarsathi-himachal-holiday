import { useEffect } from 'react';

interface IntroLoaderProps {
  onComplete: () => void;
}

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  useEffect(() => {
    const timer = window.setTimeout(onComplete, 2200);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#f8f7f3]"
      role="status"
      aria-label="Loading Safar Sathi"
    >
      <style>{`
        @keyframes safarLogoIn {
          0% { opacity: 0; transform: translateY(12px) scale(.94); filter: blur(5px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @keyframes safarNameIn {
          0%, 22% { opacity: 0; transform: translateY(10px); letter-spacing: .42em; }
          100% { opacity: 1; transform: translateY(0); letter-spacing: .2em; }
        }
        @keyframes safarTagIn {
          0%, 48% { opacity: 0; transform: translateY(7px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .safar-intro-logo { animation: safarLogoIn .75s cubic-bezier(.2,.75,.25,1) both; }
        .safar-intro-name { animation: safarNameIn .8s .45s ease-out both; }
        .safar-intro-tag { animation: safarTagIn .65s .95s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .safar-intro-logo, .safar-intro-name, .safar-intro-tag { animation: none; opacity: 1; transform: none; filter: none; }
        }
      `}</style>
      <div className="flex flex-col items-center px-6 text-center">
        <img
          src={`${import.meta.env.BASE_URL}images/logo.png`}
          alt="Safar Sathi"
          className="safar-intro-logo h-20 w-auto max-w-[220px] object-contain sm:h-24"
          fetchPriority="high"
        />
        <div className="safar-intro-name mt-5 font-cinzel text-xl font-bold tracking-[0.2em] text-[#762d36] sm:text-2xl">
          SAFAR SATHI
        </div>
        <p className="safar-intro-tag mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#82766b] sm:text-xs">
          Your Journey Begins Here
        </p>
        <div className="mt-8 h-px w-24 overflow-hidden bg-[#e5ded5]">
          <div className="h-full w-full origin-left animate-[safarProgress_1.7s_ease-in-out_forwards] bg-[#b68a4a]" />
        </div>
      </div>
      <style>{`@keyframes safarProgress { from { transform: scaleX(0); } to { transform: scaleX(1); } }`}</style>
    </div>
  );
}
