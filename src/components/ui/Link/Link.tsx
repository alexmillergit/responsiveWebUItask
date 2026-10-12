import type { AnchorHTMLAttributes } from 'react';
import styles from './Link.module.css';

export type LinkTone = 'light' | 'dark';

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** light = white on dark surfaces, dark = grey-700 on the white menu panel. */
  tone?: LinkTone;
};

/** Plain text link used for navigation entries. */
export function Link({ tone = 'light', className, children, ...rest }: LinkProps) {
  return (
    <a className={[styles.link, styles[tone], className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </a>
  );
}
