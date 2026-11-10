import { useEffect, useState } from 'react';

interface IntroLoaderProps {
  onComplete: () => void;
}

const assetBase = import.meta.env.BASE_URL;

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const leaveDelay = reducedMotion ? 180 : 850;
    const finishDelay = reducedMotion ? 250 : 1200;
    const leaveTimer = window.setTimeout(() => setLeaving(true), leaveDelay);
    const finishTimer = window.setTimeout(onComplete, finishDelay);
    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`safar-intro fixed inset-0 z-[100] flex min-h-[100svh] items-center justify-center overflow-hidden bg-white text-[#421e29] transition-opacity duration-400 ease-out ${leaving ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
      role="status"
      aria-label="Welcome to Safar Sathi"
    >
      <style>{`
        @keyframes safarMarkIn {
          0% { opacity: 0; transform: translateY(12px) scale(.94); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes safarLineIn {
          from { transform: scaleX(0); opacity: 0; }
          to { transform: scaleX(1); opacity: 1; }
        }
        @keyframes safarTextIn {
          from { opacity: 0; transform: translateY(9px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .safar-mark-in { animation: safarMarkIn .65s cubic-bezier(.2,.75,.25,1) both; }
        .safar-line-in { transform-origin: center; animation: safarLineIn .55s ease-out .35s both; }
        .safar-name-in { animation: safarTextIn .55s ease-out .42s both; }
        .safar-tag-in { animation: safarTextIn .5s ease-out .68s both; }
        @media (prefers-reduced-motion: reduce) {
          .safar-mark-in, .safar-line-in, .safar-name-in, .safar-tag-in { animation: none !important; }
        }
      `}</style>

      <div className="flex w-full max-w-sm flex-col items-center px-6 text-center">
        <div className="safar-mark-in flex h-32 w-32 items-center justify-center sm:h-36 sm:w-36">
          <img
            src={`${assetBase}images/logo.png`}
            alt="Safar Sathi"
            className="h-full w-full object-contain"
            fetchPriority="high"
            decoding="async"
          />
        </div>

        <div className="safar-line-in mt-6 h-px w-14 bg-[#b58a58]" />
        <h1 className="safar-name-in mt-5 font-cinzel text-xl font-bold tracking-[.16em] text-[#421e29] sm:text-2xl">
          SAFAR SATHI
        </h1>
        <p className="safar-tag-in mt-3 text-[10px] font-medium tracking-[.12em] text-[#7b6267] sm:text-[11px]">
          Your Journey, Our Responsibility
        </p>
      </div>
    </div>
  );
}
