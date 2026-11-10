import { useEffect, useState } from 'react';

interface IntroLoaderProps {
  onComplete: () => void;
}

const assetBase = import.meta.env.BASE_URL;
const brandName = 'SAFAR SATHI';
const tagline = 'Your Journey, Our Responsibility';

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [leaving, setLeaving] = useState(false);
  const [typedTagline, setTypedTagline] = useState('');

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      setTypedTagline(tagline);
      const finishTimer = window.setTimeout(onComplete, 700);
      return () => window.clearTimeout(finishTimer);
    }

    let index = 0;
    const typingTimer = window.setInterval(() => {
      index += 1;
      setTypedTagline(tagline.slice(0, index));
      if (index >= tagline.length) window.clearInterval(typingTimer);
    }, 55);

    const startTypingTimer = window.setTimeout(() => {
      // The tagline begins after the logo and brand name have appeared.
    }, 650);
    const leaveTimer = window.setTimeout(() => setLeaving(true), 2850);
    const finishTimer = window.setTimeout(onComplete, 3350);

    return () => {
      window.clearInterval(typingTimer);
      window.clearTimeout(startTypingTimer);
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
          0% { opacity: 0; transform: translateY(18px) scale(.82); }
          70% { opacity: 1; transform: translateY(-2px) scale(1.025); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes safarNameReveal {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes safarRuleReveal {
          from { transform: scaleX(0); opacity: 0; }
          to { transform: scaleX(1); opacity: 1; }
        }
        @keyframes safarTagReveal {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes safarCursorBlink {
          0%, 48% { opacity: 1; }
          49%, 100% { opacity: 0; }
        }
        .safar-logo-reveal { animation: safarLogoReveal .85s cubic-bezier(.2,.75,.25,1) both; }
        .safar-name-reveal { animation: safarNameReveal .65s ease-out .45s both; }
        .safar-rule-reveal { transform-origin: center; animation: safarRuleReveal .55s ease-out .75s both; }
        .safar-tag-reveal { animation: safarTagReveal .45s ease-out .85s both; }
        .safar-cursor { animation: safarCursorBlink .72s step-end infinite; }
        @media (prefers-reduced-motion: reduce) {
          .safar-logo-reveal, .safar-name-reveal, .safar-rule-reveal, .safar-tag-reveal, .safar-cursor { animation: none !important; }
        }
      `}</style>

      <div className="flex w-full max-w-2xl flex-col items-center px-5 text-center">
        <div className="safar-logo-reveal flex h-56 w-56 shrink-0 items-center justify-center sm:h-64 sm:w-64">
          <img
            src={`${assetBase}images/logo.png`}
            alt="Safar Sathi logo"
            className="h-full w-full object-contain"
            fetchPriority="high"
            loading="eager"
            decoding="sync"
            onError={(event) => {
              const image = event.currentTarget;
              if (!image.src.endsWith('/logo.svg')) {
                image.src = `${assetBase}images/logo.svg`;
              }
            }}
          />
        </div>

        <h1 className="safar-name-reveal mt-1 whitespace-nowrap font-cinzel text-[clamp(2rem,8vw,3.6rem)] font-bold leading-tight tracking-[.035em] text-[#421e29]">
          {brandName}
        </h1>

        <div className="safar-rule-reveal mt-5 h-px w-28 bg-[#b58a58] sm:mt-6 sm:w-36" />
        <p className="safar-tag-reveal mt-4 min-h-6 text-xs font-medium tracking-[.08em] text-[#7b6267] sm:text-sm" aria-label={tagline}>
          <span aria-hidden="true">{typedTagline}</span>
          <span className="safar-cursor ml-0.5 inline-block h-[1em] w-px translate-y-[2px] bg-[#b58a58]" aria-hidden="true" />
        </p>
      </div>
    </div>
  );
}
