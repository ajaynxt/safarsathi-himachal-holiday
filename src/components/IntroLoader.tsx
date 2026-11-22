import { useEffect, useState } from 'react';

interface IntroLoaderProps {
  onComplete: () => void;
}

const assetBase = import.meta.env.BASE_URL;
const tagline = 'Your Journey, Our Responsibility';

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      const finishTimer = window.setTimeout(onComplete, 250);
      return () => window.clearTimeout(finishTimer);
    }

    const leaveTimer = window.setTimeout(() => setLeaving(true), 950);
    const finishTimer = window.setTimeout(onComplete, 1400);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`safar-intro pointer-events-none fixed inset-0 z-[100] flex min-h-[100svh] items-center justify-center overflow-hidden bg-white text-[#421e29] transition-opacity duration-[450ms] ease-out ${leaving ? 'opacity-0' : 'opacity-100'}`}
      role="status"
      aria-label="Welcome to Safar Sathi"
    >
      <style>{`
        @keyframes safarLogoReveal {
          0% { opacity: 0; transform: translateY(12px) scale(.94); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes safarRuleReveal {
          from { transform: scaleX(0); opacity: 0; }
          to { transform: scaleX(1); opacity: 1; }
        }
        @keyframes safarTagReveal {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .safar-logo-reveal { animation: safarLogoReveal .55s cubic-bezier(.2,.75,.25,1) both; }
        .safar-rule-reveal { transform-origin: center; animation: safarRuleReveal .3s ease-out .35s both; }
        .safar-tag-reveal { animation: safarTagReveal .35s ease-out .45s both; }
        @media (prefers-reduced-motion: reduce) {
          .safar-logo-reveal, .safar-rule-reveal, .safar-tag-reveal {
            animation: none !important;
          }
          .safar-intro { transition-duration: .01ms !important; }
        }
      `}</style>

      <div className="flex w-full max-w-2xl flex-col items-center px-5 text-center">
        <div className="safar-logo-reveal w-[min(88vw,380px)] shrink-0">
          <img
            src={`${assetBase}images/logo.png`}
            alt="Safar Sathi logo"
            className="block h-auto w-full object-contain"
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
        </div>

        <div className="safar-rule-reveal mt-7 h-px w-28 bg-[#b58a58] sm:mt-8 sm:w-36" />
        <p className="safar-tag-reveal mt-4 min-h-6 text-xs font-medium tracking-[.08em] text-[#7b6267] sm:text-sm" aria-label={tagline}>
          {tagline}
        </p>
      </div>
    </div>
  );
}
