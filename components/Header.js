import Link from 'next/link';
import { useRouter } from 'next/router';

const navIcons = {
  Home: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 3 3 10.5V21h6v-6h6v6h6V10.5L12 3z" fill="currentColor" />
    </svg>
  ),
  Team: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm-7 9v-1.5A4.5 4.5 0 0 1 9.5 15h5A4.5 4.5 0 0 1 19 19.5V21z" fill="currentColor" />
    </svg>
  ),
  Gallery: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4 5h16v14H4zm2 2v10h12V7zm2 8 2.5-3 2 2.4L14.5 12l3.5 3zM9 9.5a1.5 1.5 0 1 0-1.5 1.5A1.5 1.5 0 0 0 9 9.5z" fill="currentColor" />
    </svg>
  ),
  'Wall of Fame': (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="m12 3 2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 15.9 7.2 18l.9-5.5L4.2 8.7l5.4-.8z" fill="currentColor" />
    </svg>
  ),
  Contact: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4 6h16v12H4zm2 2v.4l6 4 6-4V8l-6 4z" fill="currentColor" />
    </svg>
  ),
  Achievements: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M17 4h3v3a5 5 0 0 1-5 5h-1a4 4 0 0 1-4 2.8A4 4 0 0 1 6 12H5a5 5 0 0 1-5-5V4h3V2h14zm-8 11h6v2H9zm-1 3h8v2H8z" fill="currentColor" />
    </svg>
  ),
};

const baseNavItems = [
  { href: '/', label: 'Home' },
  { href: '/team', label: 'Team' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/walloffame', label: 'Wall of Fame' },
  { href: '/contact', label: 'Contact' },
];

const extraNavItems = {
  achievements: { href: '/achievements', label: 'Achievements' },
};

export default function Header({ showAchievements = false }) {
  const router = useRouter();
  const pathname = router.pathname;

  const navItems = showAchievements
    ? [
        ...baseNavItems.slice(0, 3),
        extraNavItems.achievements,
        ...baseNavItems.slice(3),
      ]
    : baseNavItems;

  return (
    <div id="header">
      <div>
        <div id="logo">
          <Link href="/">
            <img src="/images/wcc_logo.png" alt="LOGO" />
          </Link>
        </div>
        <ul id="navigation">
          {navItems.map((item) => {
            const isSelected = pathname === item.href;
            return (
              <li key={item.href} className={isSelected ? 'selected' : ''}>
                <Link href={item.href}>
                  <span className="nav-link-content">
                    <span className="nav-icon">{navIcons[item.label]}</span>
                    <span>{item.label}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}