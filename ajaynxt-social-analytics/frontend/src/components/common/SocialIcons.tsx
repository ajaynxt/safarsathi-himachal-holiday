import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// 1. Instagram Official Vector Icon
export const InstagramIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <defs>
      <linearGradient id="igGradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#fdf497" />
        <stop offset="5%" stopColor="#fdf497" />
        <stop offset="45%" stopColor="#fd5949" />
        <stop offset="60%" stopColor="#d6249f" />
        <stop offset="90%" stopColor="#285AEB" />
      </linearGradient>
    </defs>
    <rect width="24" height="24" rx="6.5" fill="url(#igGradient)" />
    <circle cx="12" cy="12" r="5" stroke="#ffffff" strokeWidth="2" fill="none" />
    <circle cx="17.5" cy="6.5" r="1.3" fill="#ffffff" />
    <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="#ffffff" strokeWidth="1.8" fill="none" />
  </svg>
);

// 2. TikTok Official Vector Icon
export const TikTokIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <path
      fill="#25F4EE"
      d="M16.6 5.82s.51.5 0 0c.93 1.05 2.28 1.72 3.8 1.76V4.14c-1.35-.14-2.54-.78-3.37-1.74h-2.9v12.27c0 1.94-1.57 3.52-3.52 3.52-1.94 0-3.52-1.58-3.52-3.52s1.58-3.52 3.52-3.52c.38 0 .74.06 1.08.17v-3.54c-.35-.05-.71-.08-1.08-.08-3.87 0-7 3.13-7 7s3.13 7 7 7c3.87 0 7-3.13 7-7V8.58c1.78 1.25 3.96 1.99 6.32 2V7.14c-2.31-.22-4.25-1.52-5.33-3.32h-2z"
    />
    <path
      fill="#FE2C55"
      d="M17.4 5.02c.93 1.05 2.28 1.72 3.8 1.76V3.34c-1.35-.14-2.54-.78-3.37-1.74h-2.9v12.27c0 1.94-1.57 3.52-3.52 3.52-1.94 0-3.52-1.58-3.52-3.52s1.58-3.52 3.52-3.52c.38 0 .74.06 1.08.17V7.02c-.35-.05-.71-.08-1.08-.08-3.87 0-7 3.13-7 7s3.13 7 7 7c3.87 0 7-3.13 7-7V7.78c1.78 1.25 3.96 1.99 6.32 2V6.34c-2.31-.22-4.25-1.52-5.33-3.32h-2z"
    />
    <path
      fill="#FFFFFF"
      d="M17 5.42c.93 1.05 2.28 1.72 3.8 1.76V3.74c-1.35-.14-2.54-.78-3.37-1.74h-2.9v12.27c0 1.94-1.57 3.52-3.52 3.52-1.94 0-3.52-1.58-3.52-3.52s1.58-3.52 3.52-3.52c.38 0 .74.06 1.08.17V7.42c-.35-.05-.71-.08-1.08-.08-3.87 0-7 3.13-7 7s3.13 7 7 7c3.87 0 7-3.13 7-7V8.18c1.78 1.25 3.96 1.99 6.32 2V6.74c-2.31-.22-4.25-1.52-5.33-3.32H17z"
    />
  </svg>
);

// 3. YouTube Official Vector Icon
export const YouTubeIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <rect width="24" height="24" rx="5" fill="#FF0000" />
    <path d="M10 8L16 12L10 16V8Z" fill="#FFFFFF" />
  </svg>
);

// 4. Google Business Profile Official Vector Icon
export const GoogleBusinessIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <rect width="24" height="24" rx="5" fill="#4285F4" />
    <path d="M4 10L12 4L20 10V11H4V10Z" fill="#34A853" />
    <path d="M5 11H8V19H5V11Z" fill="#FBBC05" />
    <path d="M10.5 11H13.5V19H10.5V11Z" fill="#EA4335" />
    <path d="M16 11H19V19H16V11Z" fill="#FFFFFF" />
    <path d="M4 19H20V20.5H4V19Z" fill="#FFFFFF" opacity="0.9" />
  </svg>
);

// 5. LinkedIn Official Vector Icon
export const LinkedInIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <rect width="24" height="24" rx="5" fill="#0A66C2" />
    <circle cx="7" cy="7" r="1.5" fill="#FFFFFF" />
    <rect x="5.5" y="10" width="3" height="9" fill="#FFFFFF" />
    <path
      d="M11 10H13.8V11.3C14.2 10.6 15.1 10 16.5 10C19 10 19.5 11.5 19.5 14V19H16.5V14.5C16.5 13.4 16.3 12.3 15 12.3C13.6 12.3 13.5 13.4 13.5 14.5V19H10.5V10H11Z"
      fill="#FFFFFF"
    />
  </svg>
);

// 6. Facebook Official Vector Icon
export const FacebookIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <rect width="24" height="24" rx="12" fill="#1877F2" />
    <path
      d="M13.5 20V12.8H15.9L16.3 10H13.5V8.2C13.5 7.4 13.7 6.8 14.9 6.8H16.4V4.3C15.6 4.2 14.8 4.1 14 4.1C11.6 4.1 10 5.6 10 8.3V10H7.5V12.8H10V20H13.5Z"
      fill="#FFFFFF"
    />
  </svg>
);

// 7. WhatsApp Official Vector Icon
export const WhatsAppIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <rect width="24" height="24" rx="6" fill="#25D366" />
    <path
      d="M12 4C7.6 4 4 7.6 4 12C4 13.5 4.4 14.9 5.2 16.1L4.2 19.8L8 18.8C9.2 19.5 10.6 19.9 12 19.9C16.4 19.9 20 16.3 20 11.9C20 7.5 16.4 4 12 4ZM15.8 14.9C15.6 15.4 14.8 15.9 14.3 15.9C14 16 13.6 16.1 12.3 15.5C10.7 14.8 9.6 13.2 9.5 13.1C9.4 13 8.5 11.8 8.5 10.6C8.5 9.4 9.1 8.8 9.3 8.6C9.5 8.4 9.8 8.3 10.1 8.3C10.2 8.3 10.3 8.3 10.4 8.3C10.7 8.3 10.8 8.4 10.9 8.7C11.1 9.1 11.5 10.1 11.6 10.2C11.7 10.3 11.7 10.5 11.6 10.7C11.5 10.9 11.4 11 11.2 11.2C11.1 11.3 11 11.4 10.8 11.6C10.7 11.8 10.5 11.9 10.7 12.2C10.9 12.5 11.6 13.6 12.6 14.5C13.9 15.7 14.9 16 15.3 16.2C15.6 16.3 15.8 16.2 16 16C16.2 15.8 16.5 15.4 16.7 15.1C16.9 14.8 17.1 14.9 17.3 15C17.6 15.1 18.9 15.8 19.2 15.9C19.4 16 19.6 16.1 19.7 16.2C19.8 16.5 19.8 17.2 19.5 17.6L15.8 14.9Z"
      fill="#FFFFFF"
    />
  </svg>
);

// 8. Google Analytics 4 Official Vector Icon
export const GoogleAnalyticsIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <rect width="24" height="24" rx="5" fill="#F9AB00" />
    <rect x="5" y="13" width="3.5" height="6" rx="1.5" fill="#FFFFFF" />
    <rect x="10.25" y="9" width="3.5" height="10" rx="1.5" fill="#FFFFFF" />
    <rect x="15.5" y="5" width="3.5" height="14" rx="1.5" fill="#FFFFFF" />
  </svg>
);

// 9. Google Ads Official Vector Icon
export const GoogleAdsIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <rect width="24" height="24" rx="5" fill="#4285F4" />
    <path d="M6 14L10 6L14 14H6Z" fill="#FBBC04" />
    <circle cx="16" cy="14" r="3" fill="#34A853" />
  </svg>
);

// 10. Meta Ads Official Vector Icon
export const MetaAdsIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <rect width="24" height="24" rx="5" fill="#0081FB" />
    <path
      d="M12 14.5C10.5 16.2 8.5 17 6.5 16C4.5 15 4 13 4.5 11.5C5.2 9.5 7.5 8 9.5 9.5L12 11.5L14.5 9.5C16.5 8 18.8 9.5 19.5 11.5C20 13 19.5 15 17.5 16C15.5 17 13.5 16.2 12 14.5Z"
      stroke="#FFFFFF"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

// 11. X (formerly Twitter) Official Vector Icon
export const XTwitterIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <rect width="24" height="24" rx="5" fill="#000000" />
    <path
      d="M16.99 5H19.5L13.9 11.4L20.5 20H15.4L11.4 14.7L6.8 20H4.3L10.2 13.2L3.9 5H9.1L12.7 9.8L16.99 5ZM16.1 18.5H17.5L8.4 6.4H6.9L16.1 18.5Z"
      fill="#FFFFFF"
    />
  </svg>
);

// 12. Pinterest Official Vector Icon
export const PinterestIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <rect width="24" height="24" rx="12" fill="#E60023" />
    <path
      d="M12 4C7.6 4 4 7.6 4 12C4 15.4 6.2 18.3 9.3 19.4C9.2 18.8 9.2 17.8 9.3 17.2L10.4 12.6C10.4 12.6 10.1 12 10.1 11.2C10.1 9.9 10.8 9 11.7 9C12.5 9 12.9 9.6 12.9 10.3C12.9 11.1 12.4 12.3 12.1 13.3C11.9 14.2 12.6 14.9 13.5 14.9C15.1 14.9 16.3 13.2 16.3 10.8C16.3 8.7 14.8 7.2 12.5 7.2C9.8 7.2 8.2 9.2 8.2 11.4C8.2 12.2 8.5 13.1 8.9 13.6C9 13.7 9 13.8 9 13.9L8.7 15.1C8.7 15.3 8.5 15.4 8.3 15.3C7.1 14.7 6.4 13.1 6.4 11.4C6.4 8.4 8.6 5.6 12.7 5.6C16 5.6 18.6 7.9 18.6 10.9C18.6 14.1 16.6 16.7 13.8 16.7C12.9 16.7 12 16.2 11.7 15.6L11.1 18C10.9 18.8 10.3 19.8 9.9 20.4C10.6 20.6 11.3 20.7 12 20.7C16.4 20.7 20 17.1 20 12.7C20 7.9 16.4 4 12 4Z"
      fill="#FFFFFF"
    />
  </svg>
);

// 13. Universal Platform SVG Resolver
export const getPlatformSvg = (channelTypeOrId: string, className = 'w-4 h-4', size?: number) => {
  const norm = channelTypeOrId.toUpperCase().replace(/_/g, '');

  if (norm.includes('INSTAGRAM') || norm === 'IG') {
    return <InstagramIcon className={className} size={size} />;
  }
  if (norm.includes('TIKTOK') || norm === 'TT') {
    return <TikTokIcon className={className} size={size} />;
  }
  if (norm.includes('YOUTUBE') || norm === 'YT') {
    return <YouTubeIcon className={className} size={size} />;
  }
  if (norm.includes('GBP') || norm.includes('GOOGLEBUSINESS') || norm.includes('MAPS')) {
    return <GoogleBusinessIcon className={className} size={size} />;
  }
  if (norm.includes('LINKEDIN')) {
    return <LinkedInIcon className={className} size={size} />;
  }
  if (norm.includes('FACEBOOK') || norm === 'FB') {
    return <FacebookIcon className={className} size={size} />;
  }
  if (norm.includes('WHATSAPP') || norm === 'WA') {
    return <WhatsAppIcon className={className} size={size} />;
  }
  if (norm.includes('ANALYTICS') || norm.includes('GA4')) {
    return <GoogleAnalyticsIcon className={className} size={size} />;
  }
  if (norm.includes('GOOGLEADS')) {
    return <GoogleAdsIcon className={className} size={size} />;
  }
  if (norm.includes('META') || norm.includes('METAADS')) {
    return <MetaAdsIcon className={className} size={size} />;
  }
  if (norm.includes('TWITTER') || norm.includes('XTWITTER') || norm === 'X') {
    return <XTwitterIcon className={className} size={size} />;
  }
  if (norm.includes('PINTEREST')) {
    return <PinterestIcon className={className} size={size} />;
  }

  return <InstagramIcon className={className} size={size} />;
};
