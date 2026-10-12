export type NavItem = { label: string; href: string };

/** Primary navigation, shared by the desktop header and the mobile menu. */
export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Product', href: '#product' },
  { label: 'Features', href: '#features' },
  { label: 'Marketplace', href: '#marketplace' },
  { label: 'Company', href: '#company' },
];

export const LOGIN_HREF = '#login';

/** id of the hero email field; every "Start free trial" call to action leads there. */
export const TRIAL_EMAIL_ID = 'trial-email';

export function focusTrialEmail() {
  const input = document.getElementById(TRIAL_EMAIL_ID);
  if (input instanceof HTMLInputElement) {
    input.scrollIntoView({ block: 'center', behavior: 'smooth' });
    input.focus({ preventScroll: true });
  }
}
