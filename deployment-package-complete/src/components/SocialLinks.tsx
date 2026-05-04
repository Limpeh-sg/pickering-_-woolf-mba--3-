import React from 'react';

type Variant = 'floating' | 'inline' | 'compact' | 'menu';

const ALL_SOCIAL_LINKS = [
  { label: 'LinkedIn',   href: import.meta.env.VITE_SOCIAL_LINKEDIN_URL,   icon: <LinkedInIcon /> },
  { label: 'Instagram',  href: import.meta.env.VITE_SOCIAL_INSTAGRAM_URL,  icon: <InstagramIcon /> },
  { label: 'Facebook',   href: import.meta.env.VITE_SOCIAL_FACEBOOK_URL,   icon: <FacebookIcon /> },
  { label: '小红书',     href: import.meta.env.VITE_SOCIAL_XIAOHONGSHU_URL, icon: <XiaohongshuIcon /> },
  { label: 'YouTube',    href: import.meta.env.VITE_SOCIAL_YOUTUBE_URL,    icon: <YouTubeIcon /> },
];

const socialLinks = ALL_SOCIAL_LINKS.filter(l => l.href && l.href !== '#');

export default function SocialLinks({ variant = 'inline', className = '' }: { variant?: Variant; className?: string }) {
  const baseLink = 'inline-flex items-center justify-center transition-colors';

  if (variant === 'floating') {
    return null;
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center justify-center gap-4 ${className}`}>
        {socialLinks.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith('http') ? '_blank' : undefined}
            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            aria-label={item.label}
            title={item.label}
            className={`${baseLink} text-primary hover:text-foreground`}
          >
            {item.icon}
          </a>
        ))}
      </div>
    );
  }

  if (variant === 'menu') {
    return (
      <div className={`flex flex-row flex-wrap gap-4 ${className}`}>
        {socialLinks.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith('http') ? '_blank' : undefined}
            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className={`${baseLink} min-w-0 flex-col gap-1 text-center text-[9px] font-black leading-tight hover:text-white`}
          >
            <span className="h-5 flex items-center justify-center scale-90">{item.icon}</span>
            <span className="max-w-full truncate">{item.label}</span>
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {socialLinks.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target={item.href.startsWith('http') ? '_blank' : undefined}
          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className={`${baseLink} gap-2 rounded-full border border-current/15 px-3 py-2 text-xs font-black hover:bg-white hover:text-primary`}
        >
          {item.icon}
          {item.label}
        </a>
      ))}
    </div>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2" />
      <path d="M8 10v7M8 7.4v.1M12 17v-4.2c0-1.7 1-2.8 2.5-2.8 1.6 0 2.5 1.1 2.5 3V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="16.8" cy="7.2" r="1" fill="currentColor" />
    </svg>
  );
}


function XiaohongshuIcon() {
  return <span className="text-[10px] font-black leading-none">红</span>;
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2" />
      <path d="M15 8h-2a1 1 0 0 0-1 1v2H9v3h3v5h3v-5h2l1-3h-3V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="4" stroke="currentColor" strokeWidth="2" />
      <path d="M10 9.5l5 2.5-5 2.5V9.5z" fill="currentColor" />
    </svg>
  );
}
