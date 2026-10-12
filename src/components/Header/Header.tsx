import { useCallback, useEffect, useRef, useState } from 'react';
import { Logo } from '../icons/Logo';
import { MenuIcon } from '../icons/icons';
import { Button } from '../ui/Button';
import { Link } from '../ui/Link';
import { LOGIN_HREF, NAV_ITEMS, focusTrialEmail } from '../navigation';
import { MobileMenu } from './MobileMenu';
import styles from './Header.module.css';

const MOBILE_MENU_ID = 'mobile-menu';
const DESKTOP_QUERY = '(min-width: 768px)';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Hand focus back to the toggle after the menu closes.
  useEffect(() => {
    if (wasOpenRef.current && !menuOpen) toggleRef.current?.focus();
    wasOpenRef.current = menuOpen;
  }, [menuOpen]);

  // The menu only exists on small screens: close it if the viewport grows past the breakpoint.
  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };
    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a className={styles.logo} href="/" aria-label="Home">
          <Logo className={styles.logoMark} />
        </a>

        <nav className={styles.nav} aria-label="Primary">
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Link href={LOGIN_HREF}>Log in</Link>
          <Button variant="secondary" onClick={focusTrialEmail}>
            Start free trial
          </Button>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className={styles.menuToggle}
          aria-label="Open main menu"
          aria-expanded={menuOpen}
          aria-controls={MOBILE_MENU_ID}
          onClick={() => setMenuOpen(true)}
        >
          <MenuIcon />
        </button>
      </div>

      <MobileMenu id={MOBILE_MENU_ID} open={menuOpen} onClose={closeMenu} />
    </header>
  );
}
