import { useEffect, useState } from 'react';

interface IntroLoaderProps {
  onComplete: () => void;
}

const assetBase = import.meta.env.BASE_URL;
const brandName = 'SAFAR SATHI';

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [leaving, setLeaving] = useState(false);
  const [typedName, setTypedName] = useState('');

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      setTypedName(brandName);
      const finishTimer = window.setTimeout(onComplete, 450);
      return () => window.clearTimeout(finishTimer);
    }

    let index = 0;
    const typingTimer = window.setInterval(() => {
      index += 1;
      setTypedName(brandName.slice(0, index));
      if (index >= brandName.length) window.clearInterval(typingTimer);
    }, 68);

    const leaveTimer = window.setTimeout(() => setLeaving(true), 1580);
    const finishTimer = window.setTimeout(onComplete, 1980);

    return () => {
      window.clearInterval(typingTimer);
      window.clearTimeout(leaveTimer);
      window.clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`safar-intro fixed inset-0 z-[100] flex min-h-[100svh] items-center justify-center overflow-hidden bg-white text-[#421e29] transition-[opacity,transform] duration-500 ease-out ${leaving ? 'pointer-events-none translate-y-[-6px] opacity-0' : 'opacity-100'}`}
      role="status"
      aria-label="Welcome to Safar Sathi"
    >
      <style>{`
        @keyframes safarLogoReveal {
          0% { opacity: 0; transform: translateY(16px) scale(.9); }
          70% { opacity: 1; transform: translateY(-2px) scale(1.015); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes safarRuleReveal {
          from { transform: scaleX(0); opacity: 0; }
          to { transform: scaleX(1); opacity: 1; }
        }
        @keyframes safarTagReveal {
          from { opacity: 0; transform: translateY(7px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes safarCursorBlink {
          0%, 48% { opacity: 1; }
          49%, 100% { opacity: 0; }
        }
        .safar-logo-reveal { animation: safarLogoReveal .72s cubic-bezier(.2,.75,.25,1) both; }
        .safar-rule-reveal { transform-origin: center; animation: safarRuleReveal .5s ease-out .3s both; }
        .safar-tag-reveal { animation: safarTagReveal .45s ease-out 1.05s both; }
        .safar-cursor { animation: safarCursorBlink .72s step-end infinite; }
        @media (prefers-reduced-motion: reduce) {
          .safar-logo-reveal, .safar-rule-reveal, .safar-tag-reveal, .safar-cursor { animation: none !important; }
        }
      `}</style>

      <div className="flex w-full max-w-sm flex-col items-center px-6 text-center">
        <div className="safar-logo-reveal flex h-32 w-32 items-center justify-center sm:h-36 sm:w-36">
          <img
            src={`${assetBase}images/logo.png`}
            alt="Safar Sathi"
            className="h-full w-full object-contain"
            fetchPriority="high"
            decoding="async"
          />
        </div>

        <div className="safar-rule-reveal mt-6 h-px w-14 bg-[#b58a58]" />
        <h1 className="mt-5 min-h-[1.8em] font-cinzel text-xl font-bold tracking-[.16em] text-[#421e29] sm:text-2xl" aria-label={brandName}>
          <span aria-hidden="true">{typedName}</span>
          <span className="safar-cursor ml-0.5 inline-block h-[1em] w-px translate-y-[2px] bg-[#b58a58]" aria-hidden="true" />
        </h1>
        <p className="safar-tag-reveal mt-3 text-[10px] font-medium tracking-[.12em] text-[#7b6267] sm:text-[11px]">
          Your Journey, Our Responsibility
        </p>
      </div>
    </div>
  );
}
