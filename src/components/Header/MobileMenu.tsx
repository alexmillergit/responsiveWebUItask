import { useEffect, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { Logo } from '../icons/Logo';
import { CloseIcon } from '../icons/icons';
import { Button } from '../ui/Button';
import { Link } from '../ui/Link';
import { LOGIN_HREF, NAV_ITEMS, focusTrialEmail } from '../navigation';
import styles from './MobileMenu.module.css';

type MobileMenuProps = {
  id: string;
  open: boolean;
  onClose: () => void;
};

const FOCUSABLE = 'a[href], button:not([disabled])';

/**
 * Small-screen navigation panel.
 * Opening slides it down while fading in (500ms ease-in-out); closing, via the close button,
 * the overlay or Escape, slides it up while fading out (300ms ease-in-out). See MobileMenu.module.css.
 */
export function MobileMenu({ id, open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Lock page scroll and move focus into the panel while it is open.
  useEffect(() => {
    if (!open) return;
    document.body.classList.add('scroll-locked');
    closeButtonRef.current?.focus();
    return () => document.body.classList.remove('scroll-locked');
  }, [open]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.stopPropagation();
      onClose();
      return;
    }
    if (event.key !== 'Tab' || !panelRef.current) return;

    // Keep keyboard focus inside the modal panel.
    const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const handleTrialClick = () => {
    onClose();
    // Deferred so it runs after the header has restored focus to the menu button.
    window.setTimeout(focusTrialEmail, 0);
  };

  return (
    <div
      className={styles.root}
      data-open={open}
      // Closed menus must be unreachable for keyboard and assistive tech.
      inert={!open}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.overlay} onClick={onClose} aria-hidden="true" />

      <div
        ref={panelRef}
        id={id}
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
      >
        <div className={styles.top}>
          <Logo className={styles.logo} />
          <button
            ref={closeButtonRef}
            type="button"
            className={styles.close}
            aria-label="Close main menu"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </div>

        <nav aria-label="Mobile">
          <ul className={styles.list}>
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link tone="dark" href={item.href} className={styles.item} onClick={onClose}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Button variant="strong" size="lg" fullWidth className={styles.cta} onClick={handleTrialClick}>
          Start free trial
        </Button>

        <p className={styles.login}>
          Existing customer?{' '}
          <a className={styles.loginLink} href={LOGIN_HREF} onClick={onClose}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
